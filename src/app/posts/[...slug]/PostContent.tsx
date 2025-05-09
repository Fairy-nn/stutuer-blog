'use client';

import { mdxComponents } from '@/libs/mdx-config';
import { IconCalendar, IconPencil, IconFolder, IconTag } from '@tabler/icons-react';
import { ItemList } from '../_components/ItemList';
import { Toc } from '../_components/Toc';
import { useEffect, type ReactNode } from 'react';

// 更新类型定义
export type PostMeta = {
  title: string;
  description?: string;
  date: string; // Expected to be ISO string
  lastModified?: string; // Expected to be ISO string
  tags?: string[];
  categories?: string[];
  keywords?: string[];
  draft?: boolean;
  toc?: any[]; // Assuming toc is serializable, adjust if needed
  body?: any; // MDX content component
};

export type PostPageData = {
  url: string;
  slugs: string[];
  data: PostMeta;
};

export const PostContent = ({ 
  post,
  children
}: { 
  post: PostPageData;
  children: ReactNode;
}) => {
  // 反序列化日期
  const date = new Date(post.data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const lastModified = post.data.lastModified;
  let lastUpdateDate: string | undefined = undefined;
  
  if (lastModified !== undefined) {
    lastUpdateDate = new Date(lastModified).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const categories = (post.data.categories ?? []).map((category) => ({
    name: category,
    basePath: '/categories',
    Icon: IconFolder,
  }));
  
  const tags = (post.data.tags ?? []).map((tag) => ({
    name: tag,
    basePath: '/tags',
    Icon: IconTag,
  }));
  
  const items = [...categories, ...tags];
  const toc = post.data.toc;
  

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8">
        <div className={`sm:col-span-8`}>
          <article className="w-full p-6 md:p-8">
            {/* Article title and metadata */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl  font-bold text-gray-900 dark:text-gray-100 mb-4">
                {post.data.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <IconCalendar size={16} className="mr-1" />
                  <time dateTime={post.data.date}>{date}</time>
                </div>
                
                {lastUpdateDate !== undefined && lastUpdateDate !== date && (
                  <div className="flex items-center">
                    <IconPencil size={16} className="mr-1" />
                    <time dateTime={lastModified}>
                      Last updated: {lastUpdateDate}
                    </time>
                  </div>
                )}
              </div>
              
              {/* Categories and tags */}
              {items.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <ItemList key={item.basePath + item.name} {...item} />
                  ))}
                </div>
              )}
              
              {/* Article description */}
              {post.data.description && (
                <div className="mt-4 p-4 bg-zinc-50 dark:bg-gray-800 rounded-lg border-l-4 border-zinc-300 dark:border-zinc-700 italic text-gray-700 dark:text-gray-300">
                  {post.data.description}
                </div>
              )}
              
              {/* Mobile table of contents button */}
              {toc && toc.length > 0 && (
                <div className="lg:hidden mt-6">
                  <Toc toc={toc} />
                </div>
              )}
            </header>
            
            {/* Article content */}
            <div className="blog-content w-full">
              {children}
            </div>
          </article>
        </div>

        {toc && toc.length > 0 && (
          <div className="hidden lg:block sm:col-span-4 !mr-5 sm:mr-0">
            <Toc toc={toc} className="hidden lg:block" />
          </div>
        )}
      </div>
    </div>
  );
}; 