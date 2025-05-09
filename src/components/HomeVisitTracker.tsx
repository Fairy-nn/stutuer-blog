'use client';

import { useEffect } from 'react';

export default function HomeVisitTracker() {
  useEffect(() => {
    const trackHomeVisit = async () => {
      try {
        await fetch('/api/incr/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug: 'home', type: 'total' }),
        });
      } catch (error) {
        console.error('记录主页访问失败:', error);
      }
    };

    trackHomeVisit();
  }, []);

  // 不显示任何内容，仅用于追踪访问
  return null;
} 