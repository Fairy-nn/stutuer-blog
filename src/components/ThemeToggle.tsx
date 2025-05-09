'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Only mount component after client-side rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg cursor-pointer bg-zinc-100 dark:bg-gray-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <div className="flex items-center gap-2">
          <IconSun size={20} />
          <span>Light</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <IconMoon size={20} />
          <span>Dark</span>
        </div>
      )}
    </button>
  );
} 