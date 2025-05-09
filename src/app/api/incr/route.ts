import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();
export const config = {
  runtime: "edge",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  const body = await req.json();
  let slug: string | undefined = undefined;
  let type: string | undefined = "projects"; // Default to projects
  if ("slug" in body) {
    slug = body.slug;
  }
  // Check for type in body, default to "projects" if not present
  if ("type" in body && typeof body.type === "string") {
    type = body.type;
  }

  if (!slug) {
    return NextResponse.json({ error: "Slug not found" }, { status: 400 });
  }
  // @ts-ignore
  const ip = req.ip;
  if (ip) {
    // Hash the IP in order to not store it directly in your db.
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip),
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // deduplicate the ip for each slug
    const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });
    if (!isNew) {
      return NextResponse.json(null, { status: 202 });
    }
  }
  console.log('增加浏览量成功', ["pageviews", type, slug].join(":"));
  // Use the type variable in the Redis key
  await redis.incr(["pageviews", type, slug].join(":"));
  return NextResponse.json(null, { status: 202 });
} 