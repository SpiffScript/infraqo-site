// functions/api/contact.ts

import type { PagesFunction, Response as CFResponse } from "@cloudflare/workers-types";

export interface Env {
  RECAPTCHA_SECRET: string;

  // Resend API key
  RESEND_API_KEY: string;

  // Contact form sender (you want support@infraqo.com)
  // Must be an allowed "From" in Resend (verified domain / sender).
  EMAIL_FROM_CONTACT: string;

  // Where to deliver contact leads
  EMAIL_TO_CONTACT: string;
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

function safe(v: unknown) {
  return String(v ?? "").trim();
}

function safeArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => safe(x)).filter(Boolean);
}

function escapeHtml(input: string) {
  const s = String(input ?? "");
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
}): Promise<{ ok: boolean; hostname?: string; errorCodes?: string[] }> {
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
    hostname: data?.hostname,
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
}) {
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

/**
 * Matches ContactForm.tsx payload shape:
 * {
 *   captchaToken,
 *   customer: { firstName, lastName, businessName, email, phone },
 *   contact: { preferredMethod, bestTime, howDidYouHear, message },
 *   project: { projectType, timeline, helpWith },
 *   services: { requested: string[], other: string },
 *   company: { businessName },
 *   location: { cityState, zip, numLocations },
 *   meta: { agreedToTerms, subscribe },
 *   submittedAt
 * }
 */
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

  // ---- Read fields EXACTLY how ContactForm.tsx sends them ----
  const firstName = safe(payload?.customer?.firstName);
  const lastName = safe(payload?.customer?.lastName);
  const fullName = safe(`${firstName} ${lastName}`.trim());

  const email = safe(payload?.customer?.email);
  const phone = safe(payload?.customer?.phone);

  const businessName =
    safe(payload?.company?.businessName) || safe(payload?.customer?.businessName);

  const preferredContact = safe(payload?.contact?.preferredMethod);
  const bestTimeToReach = safe(payload?.contact?.bestTime);
  const howDidYouHear = safe(payload?.contact?.howDidYouHear);
  const message = safe(payload?.contact?.message);

  const cityState = safe(payload?.location?.cityState);
  const zip = safe(payload?.location?.zip);
  const numLocations = safe(payload?.location?.numLocations);

  const projectType = safe(payload?.project?.projectType);
  const timeline = safe(payload?.project?.timeline);
  const helpWith = safe(payload?.project?.helpWith);

  const servicesRequested = safeArray(payload?.services?.requested);
  const servicesOther = safe(payload?.services?.other);

  const agreedToTerms = payload?.meta?.agreedToTerms ? "Yes" : "No";
  const subscribe = payload?.meta?.subscribe ? "Yes" : "No";

  // ---- Subject (no leaking [object Object]) ----
  const subjectParts = [
    "InfraQo Contact Request",
    businessName ? `— ${businessName}` : "",
    fullName ? `(${fullName})` : "",
    email ? email : "",
    phone ? phone : "",
  ]
    .filter(Boolean)
    .join(" ");

  // ---- Email body ----
  const rows = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 10px; font-weight:600; white-space:nowrap; vertical-align:top;">${escapeHtml(
        label
      )}</td>
      <td style="padding:6px 10px; vertical-align:top;">${escapeHtml(value || "(not provided)")}</td>
    </tr>
  `;

  const servicesBlock =
    servicesRequested.length || servicesOther
      ? `
        <ul style="margin:8px 0 0 18px; padding:0;">
          ${servicesRequested.map((s: string) => `<li>${escapeHtml(s)}</li>`).join("")}
          ${servicesOther ? `<li><strong>Other:</strong> ${escapeHtml(servicesOther)}</li>` : ""}
        </ul>
      `
      : `<div style="color:#666; margin-top:6px;">(not provided)</div>`;

  const html = `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.35;">
    <h2 style="margin:0 0 10px;">New Contact Request (InfraQo)</h2>

    <table style="border-collapse:collapse; width:100%; max-width:820px;">
      ${rows("Name", fullName)}
      ${rows("Email", email)}
      ${rows("Phone", phone)}
      ${rows("Company", businessName)}
      ${rows("Preferred Contact", preferredContact)}
      ${rows("Best Time", bestTimeToReach)}
      ${rows("How They Heard", howDidYouHear)}
      ${rows("Project Type", projectType)}
      ${rows("Timeline", timeline)}
      ${rows("Help With", helpWith)}
      ${rows("Location", cityState)}
      ${rows("ZIP", zip)}
      ${rows("# Locations", numLocations)}
      ${rows("Agreed To Terms", agreedToTerms)}
      ${rows("Subscribe", subscribe)}
    </table>

    <div style="margin:14px 0 6px; font-weight:700;">Services Requested</div>
    ${servicesBlock}

    <div style="margin:14px 0 6px; font-weight:700;">Message</div>
    <div style="border:1px solid #e5e7eb; padding:10px; border-radius:8px; background:#fafafa;">
      ${escapeHtml(message || "(not provided)")}
    </div>

    <div style="margin-top:14px; color:#666; font-size:12px;">
      IP: ${escapeHtml(ip || "(unknown)")}
    </div>
  </div>
  `.trim();

  const text = [
    "New Contact Request (InfraQo)",
    "",
    `Name: ${fullName || "(not provided)"}`,
    `Email: ${email || "(not provided)"}`,
    `Phone: ${phone || "(not provided)"}`,
    `Company: ${businessName || "(not provided)"}`,
    `Preferred Contact: ${preferredContact || "(not provided)"}`,
    `Best Time: ${bestTimeToReach || "(not provided)"}`,
    `How They Heard: ${howDidYouHear || "(not provided)"}`,
    `Project Type: ${projectType || "(not provided)"}`,
    `Timeline: ${timeline || "(not provided)"}`,
    `Help With: ${helpWith || "(not provided)"}`,
    `Location: ${cityState || "(not provided)"}`,
    `ZIP: ${zip || "(not provided)"}`,
    `# Locations: ${numLocations || "(not provided)"}`,
    `Agreed To Terms: ${agreedToTerms}`,
    `Subscribe: ${subscribe}`,
    "",
    "Services Requested:",
    ...(servicesRequested.length ? servicesRequested.map((s) => `- ${s}`) : ["(not provided)"]),
    ...(servicesOther ? [`- Other: ${servicesOther}`] : []),
    "",
    "Message:",
    message || "(not provided)",
    "",
    `IP: ${ip || "(unknown)"}`,
  ].join("\n");

  await sendViaResend({
    apiKey: env.RESEND_API_KEY,
    from: env.EMAIL_FROM_CONTACT,
    to: env.EMAIL_TO_CONTACT,
    subject: subjectParts,
    text,
    html,
  });

  return json({ ok: true });
};
