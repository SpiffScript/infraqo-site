export interface Env {
  RECAPTCHA_SECRET: string;
  // If you email from backend, add your vars here too:
  // RESEND_API_KEY: string;
  // EMAIL_FROM: string;
  // EMAIL_TO: string;
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

  const captchaToken = String(payload?.captchaToken ?? "").trim();
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

  // Passed captcha. Continue your normal handling here:
  // - send email (Resend)
  // - store lead
  // - forward to CRM
  // For now, just return ok.
  return json({ ok: true });
};
