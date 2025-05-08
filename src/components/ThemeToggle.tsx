'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 在客户端渲染后再挂载组件，避免水合不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-pink-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <IconSun size={20} />
      ) : (
        <IconMoon size={20} />
      )}
    </button>
  );
} 