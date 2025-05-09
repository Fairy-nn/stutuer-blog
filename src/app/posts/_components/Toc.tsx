'use client';

import type { TOCItemType, TableOfContents } from 'fumadocs-core/server';
import { IconChevronDown, IconList } from '@tabler/icons-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Monitor scrolling to highlight the currently visible heading
export function useActiveHeading(toc: TableOfContents) {
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    if (toc.length === 0) return;

    const headingElements = toc.map((item) => ({
      id: item.url.slice(1),
      top: 0,
    }));

    const updateHeadingTops = () => {
      headingElements.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          heading.top = element.getBoundingClientRect().top;
        }
      });
    };

    const onScroll = () => {
      updateHeadingTops();
      const visibleHeadings = headingElements
        .filter((heading) => heading.top < 200)
        .sort((a, b) => b.top - a.top);
      
      if (visibleHeadings.length > 0) {
        setActiveHeading(visibleHeadings[0].id);
      }
    };

    updateHeadingTops();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [toc]);

  return activeHeading;
}

const TocItem = ({ 
  item, 
  activeHeading 
}: { 
  item: TOCItemType,
  activeHeading: string
}) => {
  const isActive = activeHeading === item.url.slice(1);
  
  // 根据深度计算缩进
  let paddingClass = '';
  if (item.depth === 1) {
    paddingClass = 'pl-2';
  } else if (item.depth === 2) {
    paddingClass = 'pl-6';
  } else if (item.depth === 3) {
    paddingClass = 'pl-10';
  } else if (item.depth === 4) {
    paddingClass = 'pl-14';
  } else if (item.depth >= 5) {
    paddingClass = 'pl-18';
  }
  
  return (
    <Link
      href={item.url}
      className={`toc-link ${paddingClass} ${isActive ? 'active' : ''}`}
    >
      {item.title}
    </Link>
  );
};

export function Toc({
  toc,
  className,
}: { 
  toc: TableOfContents; 
  className?: string 
}) {
  const [open, setOpen] = useState(true);
  const activeHeading = useActiveHeading(toc);

  return (
    <div className={`toc ${className || ''}`}>
      <button 
        type='button' 
        className='flex items-center text-zinc-900 dark:text-zinc-100 w-full justify-between mb-2'
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center">
          <span className='toc-title my-0'>Table of Contents</span>
        </div>
        <IconChevronDown 
          size={18} 
          className={`transition-transform duration-300 ${open ? 'transform rotate-180' : ''}`} 
        />
      </button>
      
      {open && toc.length > 0 && (
        <div className='mt-2 space-y-1'>
          {toc.map((item) => (
            <TocItem 
              key={item.url} 
              item={item} 
              activeHeading={activeHeading} 
            />
          ))}
        </div>
      )}
      
      {toc.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          This article has no table of contents
        </p>
      )}
    </div>
  );
}
