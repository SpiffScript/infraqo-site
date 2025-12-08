import type { KVNamespace, R2Bucket } from "@cloudflare/workers-types";

export interface Env {
  CAREERS_KV: KVNamespace;
  CAREERS_BUCKET: R2Bucket;
}

type CandidateRecord = {
  id: string;
  timestamp: string;
  resumeKey: string | null;
  // other fields may exist, but we only care about resumeKey here
};

export const onRequestGet = async (
  context: { request: Request; env: Env }
): Promise<Response> => {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response("Missing id", { status: 400 });
    }

    const stored = await env.CAREERS_KV.get(`candidate:${id}`, "json");

    if (!stored) {
      return new Response("Candidate not found", { status: 404 });
    }

    const record = stored as CandidateRecord;

    if (!record.resumeKey) {
      return new Response("No resume for this candidate", { status: 404 });
    }

    const object = await env.CAREERS_BUCKET.get(record.resumeKey);
    if (!object) {
      return new Response("Resume object not found", { status: 404 });
    }

    // Read the object into an ArrayBuffer so TS is happy about the body type
    const body = await object.arrayBuffer();

    const filename =
      record.resumeKey.split("/").pop() ?? "infraqo-resume.pdf";

    const contentType =
      object.httpMetadata?.contentType || "application/octet-stream";

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Resume download error:", err);
    return new Response("Server error", { status: 500 });
  }
};
