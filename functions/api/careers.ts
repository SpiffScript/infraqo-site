import type { KVNamespace, R2Bucket } from "@cloudflare/workers-types";

export interface Env {
  CAREERS_KV: KVNamespace;
  CAREERS_BUCKET: R2Bucket;

  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_TO: string;
}

type CandidateRecord = {
  id: string;
  timestamp: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  howHeard: string;
  portfolioUrl: string;
  message: string;
  location: string;
  currentEmployer: string;
  availability: string;
  employmentStatus: string;
  workAuthorization: string;
  resumeKey: string | null;
};

export const onRequestPost = async (
  context: { request: Request; env: Env }
): Promise<Response> => {
  const { request, env } = context;

  try {
    const formData = await request.formData();

    const firstName = String(formData.get("firstName") ?? "");
    const lastName = String(formData.get("lastName") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const role = String(formData.get("role") ?? "");
    const howHeard = String(formData.get("howHeard") ?? "");
    const portfolioUrl = String(formData.get("portfolioUrl") ?? "");
    const message = String(formData.get("message") ?? "");
    const location = String(formData.get("location") ?? "");
    const currentEmployer = String(formData.get("currentEmployer") ?? "");
    const availability = String(formData.get("availability") ?? "");
    const employmentStatus = String(formData.get("employmentStatus") ?? "");
    const workAuthorization = String(formData.get("workAuthorization") ?? "");

    const resume = formData.get("resume") as File | null;

    if (!firstName || !lastName || !email || !role) {
      return jsonResponse(
        { ok: false, error: "Missing required fields" },
        400
      );
    }

    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    const resumeKey = resume ? `careers/${id}/${resume.name}` : null;

    const record: CandidateRecord = {
      id,
      timestamp,
      firstName,
      lastName,
      email,
      phone,
      role,
      howHeard,
      portfolioUrl,
      message,
      location,
      currentEmployer,
      availability,
      employmentStatus,
      workAuthorization,
      resumeKey,
    };

    await env.CAREERS_KV.put(`candidate:${id}`, JSON.stringify(record));

if (resume && resumeKey) {
  const contents = await resume.arrayBuffer();

  await env.CAREERS_BUCKET.put(resumeKey, contents, {
    httpMetadata: {
      contentType: resume.type || "application/octet-stream",
    },
  });
}

    const origin = new URL(request.url).origin;
    const downloadUrl =
      resumeKey != null
        ? `${origin}/api/careers-download?id=${id}`
        : null;

    sendNotificationEmail(env, record, downloadUrl).catch((err) =>
      console.error("Email send failed:", err)
    );

    return jsonResponse({ ok: true, id }, 200);
  } catch (err) {
    console.error("Careers handler error:", err);
    return jsonResponse({ ok: false, error: "Server error" }, 500);
  }
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function sendNotificationEmail(
  env: Env,
  record: CandidateRecord,
  downloadUrl: string | null
) {
  const {
    firstName,
    lastName,
    email,
    role,
    location,
    currentEmployer,
    employmentStatus,
    workAuthorization,
    availability,
  } = record;

  const subject = `New InfraQo careers interest: ${firstName} ${lastName}`;

  const lines = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    record.phone ? `Phone: ${record.phone}` : null,
    `Role: ${role}`,
    location ? `Location: ${location}` : null,
    currentEmployer ? `Current/most recent employer: ${currentEmployer}` : null,
    employmentStatus ? `Currently employed: ${employmentStatus}` : null,
    workAuthorization ? `Work authorization: ${workAuthorization}` : null,
    availability ? `Availability: ${availability}` : null,
    record.howHeard ? `How they heard about InfraQo: ${record.howHeard}` : null,
    record.portfolioUrl ? `Portfolio/LinkedIn: ${record.portfolioUrl}` : null,
    "",
    record.message ? `Summary:\n${record.message}` : null,
    "",
    downloadUrl ? `Download resume: ${downloadUrl}` : "No resume uploaded.",
  ].filter(Boolean) as string[];

  const text = lines.join("\n");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: env.EMAIL_TO,
      subject,
      text,
    }),
  });
}
