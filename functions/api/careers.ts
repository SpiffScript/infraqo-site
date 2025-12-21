import type { KVNamespace, R2Bucket } from "@cloudflare/workers-types";

export interface Env {
  CAREERS_KV: KVNamespace;
  CAREERS_BUCKET: R2Bucket;

  RESEND_API_KEY: string;
  EMAIL_FROM_CAREERS: string;
  EMAIL_TO_CAREERS: string;
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

  const fullName = `${firstName} ${lastName}`.trim() || "Unknown candidate";

  // ---- Helpers ----
  const safe = (value: any): string => {
    if (value === null || value === undefined) return "";
    const str = typeof value === "string" ? value : String(value);
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const safeBool = (value: string | null | undefined): string | null => {
    if (!value) return null;
    return value;
  };

  // ---- Subject ----
  const subject = `Candidate Submission – ${fullName}`;

  // ---- Plain text version ----
  const lines = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    record.phone ? `Phone: ${record.phone}` : null,
    `Role: ${role}`,
    location ? `Location: ${location}` : null,
    currentEmployer
      ? `Current/most recent employer: ${currentEmployer}`
      : null,
    employmentStatus
      ? `Currently employed: ${employmentStatus}`
      : null,
    workAuthorization
      ? `Work authorization: ${workAuthorization}`
      : null,
    availability ? `Availability: ${availability}` : null,
    record.howHeard
      ? `How they heard about InfraQo: ${record.howHeard}`
      : null,
    record.portfolioUrl
      ? `Portfolio/LinkedIn: ${record.portfolioUrl}`
      : null,
    "",
    record.message ? `Summary:\n${record.message}` : null,
    "",
    downloadUrl ? `Download resume: ${downloadUrl}` : "No resume uploaded.",
  ].filter(Boolean) as string[];

  const text = lines.join("\n");

  // ---- HTML version ----
  const htmlBody = `
  <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#0b1020; padding:24px;">
    <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; padding:24px 24px 28px; box-shadow:0 10px 30px rgba(15,23,42,0.25);">
      <h1 style="margin:0 0 12px; font-size:20px; color:#111827;">
        New InfraQo Careers interest from ${safe(fullName)}
      </h1>
      <p style="margin:0 0 16px; font-size:14px; color:#4b5563;">
        A new careers interest was submitted through the InfraQo website.
      </p>

      <table style="width:100%; border-collapse:collapse; font-size:14px; color:#111827;">
        <tr>
          <td style="padding:6px 0; font-weight:600; width:160px;">Name:</td>
          <td style="padding:6px 0;">${safe(fullName)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0; font-weight:600;">Email:</td>
          <td style="padding:6px 0;">
            <a href="mailto:${safe(email)}" style="color:#2563eb; text-decoration:none;">
              ${safe(email)}
            </a>
          </td>
        </tr>
        ${
          record.phone
            ? `<tr>
                 <td style="padding:6px 0; font-weight:600;">Phone:</td>
                 <td style="padding:6px 0;">${safe(record.phone)}</td>
               </tr>`
            : ""
        }
        <tr>
          <td style="padding:6px 0; font-weight:600;">Role:</td>
          <td style="padding:6px 0;">${safe(role)}</td>
        </tr>
        ${
          location
            ? `<tr>
                 <td style="padding:6px 0; font-weight:600;">Location:</td>
                 <td style="padding:6px 0;">${safe(location)}</td>
               </tr>`
            : ""
        }
        ${
          currentEmployer
            ? `<tr>
                 <td style="padding:6px 0; font-weight:600;">Current employer:</td>
                 <td style="padding:6px 0;">${safe(currentEmployer)}</td>
               </tr>`
            : ""
        }
        ${
          safeBool(employmentStatus)
            ? `<tr>
                 <td style="padding:6px 0; font-weight:600;">Employment status:</td>
                 <td style="padding:6px 0;">${safe(employmentStatus)}</td>
               </tr>`
            : ""
        }
        ${
          safeBool(workAuthorization)
            ? `<tr>
                 <td style="padding:6px 0; font-weight:600;">Work authorization:</td>
                 <td style="padding:6px 0;">${safe(workAuthorization)}</td>
               </tr>`
            : ""
        }
        ${
          availability
            ? `<tr>
                 <td style="padding:6px 0; font-weight:600;">Availability:</td>
                 <td style="padding:6px 0;">${safe(availability)}</td>
               </tr>`
            : ""
        }
        ${
          record.howHeard
            ? `<tr>
                 <td style="padding:6px 0; font-weight:600;">How they heard about InfraQo:</td>
                 <td style="padding:6px 0;">${safe(record.howHeard)}</td>
               </tr>`
            : ""
        }
        ${
          record.portfolioUrl
            ? `<tr>
                 <td style="padding:6px 0; font-weight:600;">Portfolio / LinkedIn:</td>
                 <td style="padding:6px 0;">
                   <a href="${safe(record.portfolioUrl)}" style="color:#2563eb; text-decoration:none;">
                     ${safe(record.portfolioUrl)}
                   </a>
                 </td>
               </tr>`
            : ""
        }
      </table>

      <p style="margin:18px 0 4px; font-size:14px; color:#4b5563;"><strong>Summary</strong></p>
      <div style="padding:10px; background:#f3f4f6; border-radius:8px; font-size:14px; color:#111827; white-space:pre-wrap;">
        ${safe(record.message || "No summary provided.")}
      </div>

      <p style="margin:16px 0 0; font-size:14px; color:#111827;">
        <strong>Resume:</strong>
        ${
          downloadUrl
            ? `<a href="${safe(downloadUrl)}" style="color:#2563eb; text-decoration:none;">Download resume</a>`
            : "No resume uploaded."
        }
      </p>

      <hr style="margin:20px 0; border:none; border-top:1px solid #e5e7eb;" />
      <p style="margin:0; font-size:12px; color:#9ca3af;">
        InfraQo • Your Partner in Operational Excellence
      </p>
    </div>
  </div>
  `;

  // ---- Send via Resend ----
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM_CAREERS,
      to: env.EMAIL_TO_CAREERS,
      subject,
      text,
      html: htmlBody,
    }),
  });
}
