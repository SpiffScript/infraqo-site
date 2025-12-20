// functions/api/contact.ts
import type { PagesFunction, Response as CFResponse } from "@cloudflare/workers-types";

export interface Env {
  RECAPTCHA_SECRET: string;
  RESEND_API_KEY: string;
  EMAIL_FROM_CONTACT: string;
  EMAIL_TO_CONTACT: string;
}

const json = (data: any, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json" }
}) as unknown as CFResponse;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const payload = await request.json() as any;

    // VERIFIED MAPPINGS FROM YOUR ContactForm.tsx
    const firstName = payload?.customer?.firstName || "";
    const lastName = payload?.customer?.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();

    const businessName = payload?.company?.businessName || "N/A";

    const email = payload?.contact?.email || "";
    const phone = payload?.contact?.phone || "";
    const preferredMethod = payload?.contact?.preferredMethod || "";

    const cityState = payload?.location?.cityState || "";
    const zip = payload?.location?.zip || "";

    const services = payload?.services?.requested || [];
    const details = payload?.project?.details || "";
    const timeline = payload?.project?.timeline || "";
    const heardFrom = payload?.project?.heardFrom || "";

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";

    // Resend API Call
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM_CONTACT,
        to: env.EMAIL_TO_CONTACT,
        subject: `InfraQo Lead: ${fullName}`,
        html: `
          <div style="font-family:sans-serif;">
            <h2>New Inquiry from ${fullName}</h2>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Business:</b> ${businessName}</p>
            <p><b>Location:</b> ${cityState} (${zip})</p>
            <p><b>Services:</b> ${Array.isArray(services) ? services.join(", ") : services}</p>
            <p><b>Timeline:</b> ${timeline}</p>
            <hr/>
            <p><b>Message:</b></p>
            <div style="background:#f4f4f4;padding:10px;">${details}</div>
          </div>
        `,
        text: `Lead: ${fullName}\nEmail: ${email}\nMessage: ${details}`
      })
    });

    if (!resendResponse.ok) {
      const errorMsg = await resendResponse.text();
      return json({ ok: false, error: `Resend Error: ${errorMsg}` }, 500);
    }

    return json({ ok: true });

  } catch (err: any) {
    return json({ ok: false, error: `Worker Crash: ${err.message}` }, 500);
  }
};
