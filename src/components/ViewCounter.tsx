'use client';

import { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
  type?: 'posts' | 'projects' | 'total';
  className?: string;
  trackView?: boolean;
}

export default function ViewCounter({
  slug,
  type = 'posts',
  className = '',
  trackView = true,
}: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/views?slug=${slug}&type=${type}`, {
          method: 'GET',
        });
        if (res.ok) {
          const data = await res.json();
          setViews(data.count);
        }
      } catch (error) {
        console.error('获取浏览量失败:', error);
      }
    };

    const incrementViews = async () => {
        console.log('增加浏览量', ["pageviews", type, slug].join(":")); 
      try {
        await fetch('/api/incr/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug, type }),
        });
        console.log('增加浏览量成功');
        fetchViews();
      } catch (error) {
        console.error('增加浏览量失败:', error);
      }
    };

    fetchViews();
    if (trackView) {
      incrementViews();
    }
  }, [slug, trackView, type]);

  return (
    <span className={className}>
      {views !== null ? `${views.toLocaleString()} Views` : '-- Views'}
    </span>
  );
} 