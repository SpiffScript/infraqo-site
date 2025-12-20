// functions/api/contact.ts
import type { PagesFunction, Response as CFResponse } from "@cloudflare/workers-types";

export interface Env {
  RECAPTCHA_SECRET: string;
  RESEND_API_KEY: string;
  EMAIL_FROM_CONTACT: string;
  EMAIL_TO_CONTACT: string;
}

function json(data: unknown, status = 200): CFResponse {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  }) as unknown as CFResponse;
}

function safe(v: unknown) { return String(v ?? "").trim(); }

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  // NESTED MAPPINGS: Matching your handleSubmit structure exactly
  const firstName = safe(payload?.customer?.firstName);
  const lastName = safe(payload?.customer?.lastName);
  const fullName = `${firstName} ${lastName}`.trim();
  const projectType = safe(payload?.customer?.projectType);

  const businessName = safe(payload?.company?.businessName);

  const email = safe(payload?.contact?.email);
  const phone = safe(payload?.contact?.phone);
  const contactMethod = safe(payload?.contact?.preferredMethod);

  const cityState = safe(payload?.location?.cityState);
  const zip = safe(payload?.location?.zip);
  const numLocations = safe(payload?.location?.numLocations);

  const services = Array.isArray(payload?.services?.requested) ? payload.services.requested : [];

  const helpWith = safe(payload?.project?.details);
  const timeline = safe(payload?.project?.timeline);
  const howDidYouHear = safe(payload?.project?.heardFrom);

  const agreeToTerms = payload?.meta?.agreeToTerms ? "Yes" : "No";
  const sendUpdates = payload?.meta?.sendUpdates ? "Yes" : "No";
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";

  const subject = `InfraQo Lead: ${fullName} (${businessName || 'Residential'})`;

  const html = `
    <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
      <h2 style="color: #1e293b;">New Website Inquiry</h2>
      <hr />
      <p><b>Name:</b> ${fullName}</p>
      <p><b>Business:</b> ${businessName || "N/A"}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Location:</b> ${cityState} (${zip})</p>
      <p><b>Project Type:</b> ${projectType}</p>
      <p><b>Services:</b> ${services.join(", ")}</p>
      <p><b>Timeline:</b> ${timeline}</p>
      <p><b>How they heard:</b> ${howDidYouHear}</p>
      <p><b>Preferred Contact:</b> ${contactMethod}</p>
      <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-left: 4px solid #334155;">
        <b>Message / Help Needed:</b><br />
        ${helpWith}
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM_CONTACT,
        to: env.EMAIL_TO_CONTACT,
        subject,
        html,
        text: `New Lead: ${fullName}\nEmail: ${email}\nMessage: ${helpWith}`
      })
    });

    if (!res.ok) throw new Error(await res.text());
    return json({ ok: true });
  } catch (err: any) {
    return json({ ok: false, error: err.message }, 500);
  }
};
