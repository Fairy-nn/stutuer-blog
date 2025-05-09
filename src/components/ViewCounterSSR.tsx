import { Redis } from "@upstash/redis";

interface ViewCounterProps {
  slug: string;
  type?: string;
  className?: string;
}

export default async function ViewCounterSSR({
  slug,
  type = 'posts',
  className = '',
}: ViewCounterProps) {
  const redis = Redis.fromEnv();
  
  let views = 0;
  try {
    // 获取特定页面的访问量
    views = Number(await redis.get(["pageviews", type, slug].join(":")) || 0);
  } catch (error) {
    console.error('获取浏览量失败:', error);
  }

  // 增加浏览量
  await redis.incr(["pageviews", type, slug].join(":"));
  console.log('增加浏览量成功', ["pageviews", type, slug].join(":"));

  return (
    <span className={className}>
      {views.toLocaleString()} Views
    </span>
  );
} 