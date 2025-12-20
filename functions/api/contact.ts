// functions/api/contact.ts

import type {
  PagesFunction,
  Response as CFResponse,
} from "@cloudflare/workers-types";

export interface Env {
  RECAPTCHA_SECRET: string;

  RESEND_API_KEY: string;

  // Set this to: support@infraqo.com
  // Must be a verified sender/domain in Resend.
  EMAIL_FROM: string;

  // Where you want contact leads delivered (can be support@infraqo.com or your personal inbox)
  EMAIL_TO: string;
}

function json(data: unknown, status = 200): CFResponse {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  }) as unknown as CFResponse;
}

function safe(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v.trim();
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return "";
}

function safeArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => safe(x)).filter(Boolean);
}

function escapeHtml(input: string): string {
  const s = safe(input);
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function verifyRecaptchaV2(opts: {
  token: string;
  secret: string;
  remoteip?: string;
}): Promise<{ ok: boolean; score?: number; hostname?: string; errorCodes?: string[] }> {
  const body = new URLSearchParams();
  body.set("secret", opts.secret);
  body.set("response", opts.token);
  if (opts.remoteip) body.set("remoteip", opts.remoteip);

  const resp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = (await resp.json()) as any;

  return {
    ok: Boolean(data?.success),
    score: typeof data?.score === "number" ? data.score : undefined,
    hostname: safe(data?.hostname),
    errorCodes: Array.isArray(data?.["error-codes"]) ? data["error-codes"] : undefined,
  };
}

async function sendViaResend(opts: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<any> {
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: opts.from,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text().catch(() => "");
    throw new Error(`Resend failed (${resp.status}): ${errText || "Unknown error"}`);
  }

  return resp.json();
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "Expected application/json" }, 400);
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  // Must match ContactForm.tsx (you’re posting captchaToken)
  const captchaToken = safe(payload?.captchaToken);
  if (!captchaToken) {
    return json({ ok: false, error: "Missing captcha token" }, 400);
  }

  const ip =
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("x-forwarded-for") ??
    undefined;

  const captcha = await verifyRecaptchaV2({
    token: captchaToken,
    secret: env.RECAPTCHA_SECRET,
    remoteip: ip,
  });

  if (!captcha.ok) {
    return json(
      {
        ok: false,
        error: "Captcha verification failed",
        details: captcha.errorCodes ?? [],
      },
      403
    );
  }

  // --------- Match ContactForm.tsx payload shape (nested objects) ----------
  const firstName = safe(payload?.customer?.firstName);
  const lastName = safe(payload?.customer?.lastName);
  const fullName = safe(`${firstName} ${lastName}`.trim());

  const email = safe(payload?.contact?.email);
  const phone = safe(payload?.contact?.phone);

  const preferredContact = safe(payload?.contact?.preferredContact);

  const projectType = safe(payload?.project?.projectType); // "Business" | "Residential"
  const businessName = safe(payload?.company?.businessName);

  const city = safe(payload?.location?.city);
  const state = safe(payload?.location?.state);
  const zip = safe(payload?.location?.zip);

  const numLocations = safe(payload?.location?.numLocations);

  // services: { serviceAreas: string[] }
  const servicesRequested = safeArray(payload?.services?.serviceAreas);

  const details = safe(payload?.project?.details);
  const timeline = safe(payload?.project?.timeline);
  const heardFrom = safe(payload?.project?.heardFrom);

  const agreeToTerms = payload?.meta?.agreeToTerms ? "Yes" : "No";
  const sendUpdates = payload?.meta?.sendUpdates ? "Yes" : "No";

  // Subject: keep it human + never allow [object Object]
  const subjectParts = [
    "InfraQo Contact Request",
    fullName || email || phone ? `(${[fullName, email, phone].filter(Boolean).join(" | ")})` : "",
  ].filter(Boolean);

  const subject = subjectParts.join(" ");

  const text = [
    "New Contact Request (InfraQo)",
    "",
    `Name: ${fullName || "(not provided)"}`,
    `Email: ${email || "(not provided)"}`,
    `Phone: ${phone || "(not provided)"}`,
    `Preferred Contact: ${preferredContact || "(not provided)"}`,
    `Project Type: ${projectType || "(not provided)"}`,
    `Business Name: ${businessName || "(not provided)"}`,
    `Location: ${[city, state, zip].filter(Boolean).join(", ") || "(not provided)"}`,
    `# Locations: ${numLocations || "(not provided)"}`,
    `Services: ${servicesRequested.length ? servicesRequested.join(", ") : "(not provided)"}`,
    `Timeline: ${timeline || "(not provided)"}`,
    `Heard From: ${heardFrom || "(not provided)"}`,
    `Agree to be contacted: ${agreeToTerms}`,
    `Send updates: ${sendUpdates}`,
    `IP: ${ip || "(unknown)"}`,
    "",
    "Project Details:",
    details || "(not provided)",
  ].join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color:#111827;">
      <h2 style="margin:0 0 10px 0;">New Contact Request (InfraQo)</h2>

      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Name</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(fullName) || "(not provided)"}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Email</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(email) || "(not provided)"}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Phone</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(phone) || "(not provided)"}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Preferred Contact</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(preferredContact) || "(not provided)"}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Project Type</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(projectType) || "(not provided)"}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Business Name</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(businessName) || "(not provided)"}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Location</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml([city, state, zip].filter(Boolean).join(", ")) || "(not provided)"}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b># Locations</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(numLocations) || "(not provided)"}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Services</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(servicesRequested.join(", ")) || "(not provided)"}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Timeline</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(timeline) || "(not provided)"}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Heard From</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(heardFrom) || "(not provided)"}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Agree to be contacted</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(agreeToTerms)}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>Send updates</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(sendUpdates)}</td></tr>
        <tr><td style="padding:6px 10px; border:1px solid #e5e7eb;"><b>IP</b></td><td style="padding:6px 10px; border:1px solid #e5e7eb;">${escapeHtml(ip || "") || "(unknown)"}</td></tr>
      </table>

      <h3 style="margin:16px 0 8px 0;">Project Details</h3>
      <div style="white-space: pre-wrap; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; max-width: 720px;">
        ${escapeHtml(details) || "(not provided)"}
      </div>
    </div>
  `;

  // IMPORTANT: this is the “from support@infraqo.com” behavior
  // You set EMAIL_FROM to support@infraqo.com in CF env vars
  await sendViaResend({
    apiKey: env.RESEND_API_KEY,
    from: env.EMAIL_FROM,
    to: env.EMAIL_TO,
    subject,
    text,
    html,
  });

  return json({ ok: true });
};
