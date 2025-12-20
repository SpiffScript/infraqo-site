export interface Env {
  RECAPTCHA_SECRET: string;

  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_TO: string;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

async function verifyRecaptchaV2(opts: { token: string; secret: string; remoteip?: string }) {
  const body = new URLSearchParams();
  body.set("secret", opts.secret);
  body.set("response", opts.token);
  if (opts.remoteip) body.set("remoteip", opts.remoteip);

  const resp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = (await resp.json()) as {
    success: boolean;
    challenge_ts?: string;
    hostname?: string;
    "error-codes"?: string[];
  };

  return data;
}

function safe(v: unknown) {
  return String(v ?? "").trim();
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

  const verify = await verifyRecaptchaV2({
    token: captchaToken,
    secret: env.RECAPTCHA_SECRET,
    remoteip: ip,
  });

  if (!verify.success) {
    return json(
      {
        ok: false,
        error: "Captcha verification failed",
        details: verify["error-codes"] ?? [],
      },
      400
    );
  }

  // ---- Lead fields (support both shapes: your old "fullName/email/phone" and your newer structured form)
  const fullName = safe(payload?.fullName) || `${safe(payload?.firstName)} ${safe(payload?.lastName)}`.trim();
  const email = safe(payload?.email);
  const phone = safe(payload?.phone);
  const company = safe(payload?.company || payload?.businessName);
  const message = safe(payload?.message || payload?.projectDetails);

  const preferredContact = safe(payload?.preferredContact || payload?.preferredContactMethod);
  const topic = safe(payload?.topic || payload?.serviceArea || payload?.serviceAreasNeeded);

  const location =
    safe(payload?.serviceLocation) ||
    [safe(payload?.city), safe(payload?.state), safe(payload?.zip)]
      .filter(Boolean)
      .join(" ")
      .trim();

  const numberOfLocations = safe(payload?.numberOfLocations);

  const subject = `InfraQo Contact Request${fullName ? ` — ${fullName}` : ""}${company ? ` (${company})` : ""}`;

  const text = [
    "New Contact Request (InfraQo)",
    "",
    `Name: ${fullName || "(not provided)"}`,
    `Email: ${email || "(not provided)"}`,
    `Phone: ${phone || "(not provided)"}`,
    `Company: ${company || "(not provided)"}`,
    `Preferred Contact: ${preferredContact || "(not provided)"}`,
    `Topic/Service: ${topic || "(not provided)"}`,
    `Location: ${location || "(not provided)"}`,
    `# Locations: ${numberOfLocations || "(not provided)"}`,
    "",
    "Message:",
    message || "(not provided)",
    "",
    `IP: ${ip || "(unknown)"}`,
  ].join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;">
      <h2 style="margin:0 0 12px 0;">New Contact Request (InfraQo)</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><b>Name</b></td><td>${escapeHtml(fullName) || "(not provided)"}</td></tr>
        <tr><td><b>Email</b></td><td>${escapeHtml(email) || "(not provided)"}</td></tr>
        <tr><td><b>Phone</b></td><td>${escapeHtml(phone) || "(not provided)"}</td></tr>
        <tr><td><b>Company</b></td><td>${escapeHtml(company) || "(not provided)"}</td></tr>
        <tr><td><b>Preferred Contact</b></td><td>${escapeHtml(preferredContact) || "(not provided)"}</td></tr>
        <tr><td><b>Topic/Service</b></td><td>${escapeHtml(topic) || "(not provided)"}</td></tr>
        <tr><td><b>Location</b></td><td>${escapeHtml(location) || "(not provided)"}</td></tr>
        <tr><td><b># Locations</b></td><td>${escapeHtml(numberOfLocations) || "(not provided)"}</td></tr>
        <tr><td><b>IP</b></td><td>${escapeHtml(ip) || "(unknown)"}</td></tr>
      </table>
      <h3 style="margin:16px 0 8px 0;">Message</h3>
      <div style="white-space: pre-wrap; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
        ${escapeHtml(message) || "(not provided)"}
      </div>
    </div>
  `;

  try {
    await sendViaResend({
      apiKey: env.RESEND_API_KEY,
      from: env.EMAIL_FROM,
      to: env.EMAIL_TO,
      subject,
      text,
      html,
    });
  } catch (err) {
    return json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Resend error",
      },
      500
    );
  }

  return json({ ok: true });
};

function escapeHtml(input?: string) {
  const s = String(input ?? "");
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
