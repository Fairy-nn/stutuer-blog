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
  const date = new Date(post.data.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const lastModified = post.data.lastModified;
  let lastUpdateDate: string | undefined = undefined;
  
  if (lastModified !== undefined) {
    lastUpdateDate = new Date(lastModified).toLocaleDateString('zh-CN', {
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
      <div className="grid grid-cols-12 gap-8">
        {/* 目录 - 在大屏幕上显示在左侧 */}
        {toc && toc.length > 0 && (
          <div className="hidden lg:block col-span-3 !mr-5 md:mr-0">
            <Toc toc={toc} className="hidden lg:block" />
          </div>
        )}
        
        {/* 文章内容 */}
        <div className={`col-span-9`}>
          <article className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 md:p-8 border border-pink-100 dark:border-gray-800">
            {/* 文章标题和元数据 */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
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
                      最后更新: {lastUpdateDate}
                    </time>
                  </div>
                )}
              </div>
              
              {/* 分类和标签 */}
              {items.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <ItemList key={item.basePath + item.name} {...item} />
                  ))}
                </div>
              )}
              
              {/* 文章描述 */}
              {post.data.description && (
                <div className="mt-4 p-4 bg-pink-50 dark:bg-gray-800 rounded-lg border-l-4 border-pink-300 dark:border-pink-700 italic text-gray-700 dark:text-gray-300">
                  {post.data.description}
                </div>
              )}
              
              {/* 移动端的目录按钮 */}
              {toc && toc.length > 0 && (
                <div className="lg:hidden mt-6">
                  <Toc toc={toc} />
                </div>
              )}
            </header>
            
            {/* 文章内容 */}
            <div className="blog-content w-full">
              {children}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}; 