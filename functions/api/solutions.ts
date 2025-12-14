import type { EventContext } from "@cloudflare/workers-types";

type Env = {
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_TO?: string;
  EMAIL_TO_SOLUTIONS?: string;
};

export const onRequestPost = async (
  { request, env }: EventContext<Env, any, Record<string, unknown>>
): Promise<Response> => {

  try {
    const origin = request.headers.get("Origin") || "*";
    type Body = Partial<{
      plan: string;
      fullName: string;
      email: string;
      phone: string;
      preferredContact: string;
      page: string;
      submittedAt: string;
    }>;

const json = (await request.json().catch(() => ({}))) as Body;


    const plan = String(json?.plan || "").trim();
    const fullName = String(json?.fullName || "").trim();
    const email = String(json?.email || "").trim();
    const phone = String(json?.phone || "").trim();
    const preferredContact = String(json?.preferredContact || "").trim();
    const page = String(json?.page || "SolutionsQo").trim();
    const submittedAt = String(json?.submittedAt || "").trim();

    // Minimum validation: name + (email OR phone)
    if (!fullName || (!email && !phone)) {
      return new Response(
        JSON.stringify({ error: "Please provide your name and either an email or phone number." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin,
          },
        }
      );
    }

    const to =
      (env.EMAIL_TO_SOLUTIONS && env.EMAIL_TO_SOLUTIONS.trim()) ||
      (env.EMAIL_TO && env.EMAIL_TO.trim()) ||
      "support@infraqo.com";

    const from = env.EMAIL_FROM || "support@infraqo.com";

    const subject = `SolutionsQo handraise: ${plan || "Support Plan"} — ${fullName}`;

    const text = [
      `New SolutionsQo handraise`,
      ``,
      `Plan: ${plan || "(not provided)"}`,
      `Name: ${fullName}`,
      `Email: ${email || "(not provided)"}`,
      `Phone: ${phone || "(not provided)"}`,
      `Preferred contact: ${preferredContact || "(not provided)"}`,
      `Page: ${page}`,
      `Submitted: ${submittedAt || new Date().toISOString()}`,
    ].join("\n");

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text().catch(() => "");
      return new Response(JSON.stringify({ error: "Email send failed.", details: errText.slice(0, 500) }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin,
        },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
      },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: "Server error.", details: String(e?.message || e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const onRequestOptions = async (
  { request }: EventContext<Env, any, Record<string, unknown>>
): Promise<Response> => {

  const origin = request.headers.get("Origin") || "*";
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
