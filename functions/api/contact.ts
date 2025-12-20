// functions/api/contact.ts
import type {
  PagesFunction,
  Response as CFResponse,
} from "@cloudflare/workers-types";

export interface Env {
  RECAPTCHA_SECRET: string;
  RESEND_API_KEY: string;
  EMAIL_FROM_CONTACT: string; // e.g. "InfraQo Support <support@infraqo.com>"
  EMAIL_TO_CONTACT: string;   // e.g. "support@infraqo.com"
}

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  }) as unknown as CFResponse;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      business,
      location,
      services,
      timeline,
      message,
      recaptchaToken, // IMPORTANT: make sure your frontend sends this
    } = body as {
      name?: string;
      email?: string;
      phone?: string;
      business?: string;
      location?: string;
      services?: string;
      timeline?: string;
      message?: string;
      recaptchaToken?: string;
    };

    // ---- Basic validation (lightweight, not user-facing copy) ----
    if (!email || !message) {
      return json(
        { ok: false, error: "Missing required fields: email and message" },
        400
      );
    }

    if (!recaptchaToken) {
      return json(
        { ok: false, error: "missing_recaptcha_token" },
        400
      );
    }

    // ---- Verify reCAPTCHA with Google ----
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: env.RECAPTCHA_SECRET,
          response: recaptchaToken,
          // optional: include client IP if you want stricter checks
          // remoteip: request.headers.get("CF-Connecting-IP") ?? "",
        }),
      }
    );

    const verifyData = (await verifyRes.json()) as {
      success: boolean;
      // score?: number; // v3
      // action?: string;
      // "error-codes"?: string[];
    };

    if (!verifyData.success) {
      // If Google says "nope", do NOT send the email.
      return json(
        { ok: false, error: "recaptcha_failed" },
        400
      );
    }

    // ---- Build InfraQo-branded email content ----
    const safe = (v?: string) => (v && String(v).trim().length > 0 ? v : "—");

    const subjectName = safe(name);
    const subject = `InfraQo Lead: ${subjectName}`;

    const textBody =
      `New Inquiry from ${subjectName}\n\n` +
      `Email: ${safe(email)}\n` +
      `Phone: ${safe(phone)}\n` +
      `Business: ${safe(business)}\n` +
      `Location: ${safe(location)}\n` +
      `Services: ${safe(services)}\n` +
      `Timeline: ${safe(timeline)}\n\n` +
      `Message:\n${safe(message)}\n`;

    const htmlBody = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#0b1020; padding:24px;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; padding:24px 24px 28px; box-shadow:0 10px 30px rgba(15,23,42,0.25);">
          <h1 style="margin:0 0 12px; font-size:20px; color:#111827;">
            New Inquiry from ${subjectName}
          </h1>
          <p style="margin:0 0 18px; font-size:14px; color:#4b5563;">
            A new project request was submitted through the InfraQo website contact form.
          </p>

          <table style="width:100%; border-collapse:collapse; font-size:14px; color:#111827;">
            <tr>
              <td style="padding:6px 0; font-weight:600; width:120px;">Name:</td>
              <td style="padding:6px 0;">${safe(name)}</td>
            </tr>
              <td style="padding:6px 0; font-weight:600; width:120px;">Email:</td>
              <td style="padding:6px 0;"><a href="mailto:${safe(
                email
              )}" style="color:#2563eb; text-decoration:none;">${safe(email)}</a></td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Phone:</td>
              <td style="padding:6px 0;">${safe(phone)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Business:</td>
              <td style="padding:6px 0;">${safe(business)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Location:</td>
              <td style="padding:6px 0;">${safe(location)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Services:</td>
              <td style="padding:6px 0;">${safe(services)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Timeline:</td>
              <td style="padding:6px 0;">${safe(timeline)}</td>
            </tr>
          </table>

          <hr style="margin:20px 0; border:none; border-top:1px solid #e5e7eb;" />

          <p style="margin:0 0 6px; font-size:14px; font-weight:600; color:#111827;">
            Message:
          </p>
          <p style="margin:0; font-size:14px; color:#374151; white-space:pre-wrap; line-height:1.5;">
            ${safe(message)}
          </p>

          <hr style="margin:24px 0 18px; border:none; border-top:1px solid #e5e7eb;" />

          <p style="margin:0; font-size:12px; color:#6b7280;">
            InfraQo • Your Partner In Operational Excellence
          </p>
        </div>
      </div>
    `;

    // ---- Send email via Resend ----
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM_CONTACT,
        to: env.EMAIL_TO_CONTACT,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorMsg = await resendResponse.text();
      return json({ ok: false, error: `Resend Error: ${errorMsg}` }, 500);
    }

    return json({ ok: true });
  } catch (err: any) {
    return json(
      { ok: false, error: `Worker Crash: ${err?.message ?? String(err)}` },
      500
    );
  }
};
