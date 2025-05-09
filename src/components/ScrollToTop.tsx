'use client';

import { IconArrowUp } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Listen for scroll events
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-zinc-500 dark:bg-zinc-600 text-white rounded-full shadow-lg hover:bg-zinc-600 dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-110 transform z-50 animate-fadeIn"
          aria-label="Back to top"
        >
          <IconArrowUp size={20} />
        </button>
      )}
    </>
  );
} 