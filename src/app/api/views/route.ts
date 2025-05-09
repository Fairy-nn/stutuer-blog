import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();
export const config = {
  runtime: "edge",
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type") || "posts";

  if (!slug) {
    return NextResponse.json({ error: "缺少slug参数" }, { status: 400 });
  }

  try {
    let count;
    if (slug === "home") {
      // 获取主页的访问量统计
      count = await redis.get("pageviews:total:home") || 0;
    } else if (slug === "all") {
      // 保留all的查询，但现在直接获取主页统计量
      count = await redis.get("pageviews:total:home") || 0;
    } else {
      // 获取特定页面的访问量
      count = await redis.get(["pageviews", type, slug].join(":")) || 0;
    }

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("获取浏览量失败:", error);
    return NextResponse.json({ error: "获取浏览量失败" }, { status: 500 });
  }
} 