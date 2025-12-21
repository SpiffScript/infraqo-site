// functions/api/solutions.ts

import type { PagesFunction, Response as CFResponse } from "@cloudflare/workers-types";

export interface Env {
  RESEND_API_KEY: string;
  EMAIL_FROM_SOLUTIONS: string;
  EMAIL_TO_SOLUTIONS: string;
}

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  }) as unknown as CFResponse;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const payload = (await request.json()) as any;

    // ----- Map incoming payload -----
    const plan: string = (payload.plan ?? "").toString().trim(); // "TotalQo" or "PriorityQo"
    const fullName: string = (payload.fullName ?? "").toString().trim();
    const email: string = (payload.email ?? "").toString().trim();
    const phone: string = (payload.phone ?? "").toString().trim();
    const preferredContact: string = (payload.preferredContact ?? "").toString().trim();
    const page: string = (payload.page ?? "").toString().trim();
    const submittedAt: string = (payload.submittedAt ?? "").toString().trim();

    // ----- Validation -----
    if (!fullName || (!email && !phone)) {
      return json(
        { ok: false, error: "Please include your name and at least an email or phone number." },
        400
      );
    }

    // ----- Helpers -----
    const safe = (value: any): string => {
      const s =
        typeof value === "string"
          ? value.trim()
          : value?.toString?.().trim?.() ?? "";
      return s.length > 0 ? s : "—";
    };

    const subjectName = safe(fullName);

    // ⭐ NEW subject line format:
    const subject = `${safe(plan)} Interest from ${subjectName}`;

    // ----- Plain-text body -----
    const textBody =
      `New ${safe(plan)} Interest from ${subjectName}\n\n` +
      `Name: ${safe(fullName)}\n` +
      `Email: ${safe(email)}\n` +
      `Phone: ${safe(phone)}\n` +
      `Preferred Contact: ${safe(preferredContact)}\n` +
      `Selected Plan: ${safe(plan)}\n` +
      `Source Page: ${safe(page)}\n` +
      `Submitted At: ${safe(submittedAt)}\n`;

    // ----- HTML body -----
    const htmlBody = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#0b1020; padding:24px;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; padding:24px 24px 28px; box-shadow:0 10px 30px rgba(15,23,42,0.25);">

          <h1 style="margin:0 0 12px; font-size:20px; color:#111827;">
            New ${safe(plan)} Interest from ${subjectName}
          </h1>

          <p style="margin:0 0 18px; font-size:14px; color:#4b5563;">
            A new SolutionsQo plan interest was submitted on the InfraQo website.
          </p>

          <table style="width:100%; border-collapse:collapse; font-size:14px; color:#111827;">
            <tr>
              <td style="padding:6px 0; font-weight:600; width:170px;">Name:</td>
              <td style="padding:6px 0;">${safe(fullName)}</td>
            </tr>

            <tr>
              <td style="padding:6px 0; font-weight:600;">Email:</td>
              <td style="padding:6px 0;">
                ${email
                  ? `<a href="mailto:${safe(email)}" style="color:#2563eb; text-decoration:none;">${safe(email)}</a>`
                  : "—"}
              </td>
            </tr>

            <tr>
              <td style="padding:6px 0; font-weight:600;">Phone:</td>
              <td style="padding:6px 0;">${safe(phone)}</td>
            </tr>

            <tr>
              <td style="padding:6px 0; font-weight:600;">Preferred Contact:</td>
              <td style="padding:6px 0;">${safe(preferredContact)}</td>
            </tr>

            <tr>
              <td style="padding:6px 0; font-weight:600;">Selected Plan:</td>
              <td style="padding:6px 0;">${safe(plan)}</td>
            </tr>

            <tr>
              <td style="padding:6px 0; font-weight:600;">Source Page:</td>
              <td style="padding:6px 0;">${safe(page)}</td>
            </tr>

            <tr>
              <td style="padding:6px 0; font-weight:600;">Submitted At:</td>
              <td style="padding:6px 0;">${safe(submittedAt)}</td>
            </tr>
          </table>

          <hr style="margin:24px 0 18px; border:none; border-top:1px solid #e5e7eb;" />

          <p style="margin:0; font-size:12px; color:#6b7280;">
            InfraQo • Your Partner In Operational Excellence
          </p>
        </div>
      </div>
    `;

    // ----- Send email via Resend -----
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM_SOLUTIONS,
        to: env.EMAIL_TO_SOLUTIONS,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return json({ ok: false, error: `Resend Error: ${errText}` }, 500);
    }

    return json({ ok: true });
  } catch (err: any) {
    return json(
      { ok: false, error: `Worker Crash: ${err?.message ?? String(err)}` },
      500
    );
  }
};
