'use client';

import { useEffect, useState } from 'react';

export default function SiteCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalViews = async () => {
      try {
        const res = await fetch('/api/views?slug=home&type=total', {
          method: 'GET',
        });
        if (res.ok) {
          const data = await res.json();
          setViews(data.count);
        }
      } catch (error) {
        console.error('获取总访问量失败:', error);
      }
    };

    fetchTotalViews();
  }, []);

  return (
    <span className="text-xs">
      {views !== null ? `${views.toLocaleString()} Views` : '-- Views'}
    </span>
  );
} 