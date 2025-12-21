// functions/api/contact.ts
import type { PagesFunction, Response as CFResponse } from "@cloudflare/workers-types";

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
    const payload = (await request.json()) as any;

    // ----- Map nested ContactForm payload to flat fields -----
    const firstName: string = (payload.customer?.firstName ?? "").toString().trim();
    const lastName: string = (payload.customer?.lastName ?? "").toString().trim();
    const name: string = [firstName, lastName].filter(Boolean).join(" ");

    const email: string = (payload.contact?.email ?? "").toString().trim();
    const phone: string = (payload.contact?.phone ?? "").toString().trim();
    const preferredContactMethod: string = (payload.contact?.preferredMethod ?? "").toString().trim();

    const business: string = (payload.company?.businessName ?? "").toString().trim();

    const cityState: string = (payload.location?.cityState ?? "").toString().trim();
    const zip: string = (payload.location?.zip ?? "").toString().trim();
    const numLocations: string = (payload.location?.numLocations ?? "").toString().trim();
    const serviceLocation: string =
      cityState && zip ? `${cityState} (${zip})` : cityState || zip || "";

    const servicesRequested = payload.services?.requested;
    let services: string;
    if (Array.isArray(servicesRequested)) {
      services = servicesRequested.join(", ");
    } else if (typeof servicesRequested === "string") {
      services = servicesRequested;
    } else {
      services = "";
    }

    const projectDetails: string = (payload.project?.details ?? "").toString();
    const timeline: string = (payload.project?.timeline ?? "").toString().trim();
    const heardFrom: string = (payload.project?.heardFrom ?? "").toString().trim();

    const sendUpdates: boolean = !!payload.meta?.sendUpdates;
    const agreeToTerms: boolean = !!payload.meta?.agreeToTerms;

    const recaptchaToken: string = (payload.captchaToken ?? "").toString().trim();

    // ----- Basic validation -----
    if (!email || !projectDetails) {
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

    // ----- Verify reCAPTCHA -----
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: env.RECAPTCHA_SECRET,
          response: recaptchaToken,
        }),
      }
    );

    const verifyData = (await verifyRes.json()) as { success: boolean };

    if (!verifyData.success) {
      return json(
        { ok: false, error: "recaptcha_failed" },
        400
      );
    }

    // ----- Build InfraQo-branded email -----
    const safe = (value: any): string => {
      const s =
        typeof value === "string"
          ? value.trim()
          : value?.toString?.().trim?.() ?? "";
      return s.length > 0 ? s : "—";
    };

    const safeBool = (value: boolean): string => (value ? "Yes" : "No");

    const subjectName = safe(name);
    const subject = `New Request from ${subjectName}`;

    const textBody =
      `New Inquiry from ${subjectName}\n\n` +
      `Name: ${safe(name)}\n` +
      `Email: ${safe(email)}\n` +
      `Phone: ${safe(phone)}\n` +
      `Business: ${safe(business)}\n` +
      `Service Location: ${safe(serviceLocation)}\n` +
      `Number of Locations: ${safe(numLocations)}\n` +
      `Preferred Contact Method: ${safe(preferredContactMethod)}\n` +
      `Project Type: ${safe(payload.customer?.projectType)}\n` +
      `Services Needed: ${safe(services)}\n` +
      `Project Timeline: ${safe(timeline)}\n` +
      `How did you hear about us?: ${safe(heardFrom)}\n` +
      `Send Updates: ${safeBool(sendUpdates)}\n` +
      `Agreed to Terms: ${safeBool(agreeToTerms)}\n\n` +
      `Message:\n${safe(projectDetails)}\n`;

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
              <td style="padding:6px 0; font-weight:600; width:170px;">Name:</td>
              <td style="padding:6px 0;">${safe(name)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600; width:170px;">Email:</td>
              <td style="padding:6px 0;">
                <a href="mailto:${safe(email)}" style="color:#2563eb; text-decoration:none;">
                  ${safe(email)}
                </a>
              </td>
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
              <td style="padding:6px 0; font-weight:600;">Service Location:</td>
              <td style="padding:6px 0;">${safe(serviceLocation)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Number of Locations:</td>
              <td style="padding:6px 0;">${safe(numLocations)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Preferred Contact Method:</td>
              <td style="padding:6px 0;">${safe(preferredContactMethod)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Project Type:</td>
              <td style="padding:6px 0;">${safe(payload.customer?.projectType)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Services Needed:</td>
              <td style="padding:6px 0;">${safe(services)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Project Timeline:</td>
              <td style="padding:6px 0;">${safe(timeline)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">How did you hear about us?</td>
              <td style="padding:6px 0;">${safe(heardFrom)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Send Updates:</td>
              <td style="padding:6px 0;">${safeBool(sendUpdates)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Agreed to Terms:</td>
              <td style="padding:6px 0;">${safeBool(agreeToTerms)}</td>
            </tr>
          </table>

          <hr style="margin:20px 0; border:none; border-top:1px solid #e5e7eb;" />

          <p style="margin:0 0 6px; font-size:14px; font-weight:600; color:#111827;">
            Message:
          </p>
          <p style="margin:0; font-size:14px; color:#374151; white-space:pre-wrap; line-height:1.5;">
            ${safe(projectDetails)}
          </p>

          <hr style="margin:24px 0 18px; border:none; border-top:1px solid #e5e7eb;" />

          <p style="margin:0; font-size:12px; color:#6b7280;">
            InfraQo • Your Partner In Operational Excellence
          </p>
        </div>
      </div>
    `;

    // ----- Send email via Resend -----
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
