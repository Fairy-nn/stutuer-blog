import { tagsWithPosts } from '@/libs/source';
import { IconHash, IconTag } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';

const Page = () => {
  // 按文章数量排序
  const sortedTags = tagsWithPosts
    .sort((a, b) => b.posts.length - a.posts.length);
  
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center">
          Tags
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {sortedTags.length} tags in total
        </p>
      </header>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-zinc-200 dark:border-gray-800">
        {sortedTags.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No tags yet
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {sortedTags.map((tag) => {
              // 根据文章数量设置字体大小
              const minSize = 0.9;
              const maxSize = 1.8;
              const minCount = 1;
              const maxCount = Math.max(...sortedTags.map(t => t.posts.length));
              const range = maxCount - minCount;
              const fontSize = range > 0 
                ? minSize + ((tag.posts.length - minCount) / range) * (maxSize - minSize)
                : 1;
              
              return (
                <Link
                  key={tag.name}
                  href={`/tags/${tag.name}`}
                  className="flex items-center px-3 py-2 rounded-full bg-zinc-50 dark:bg-gray-800 hover:bg-zinc-100 dark:hover:bg-gray-700 text-zinc-700 dark:text-zinc-100 transition-colors"
                  style={{ fontSize: `${fontSize}rem` }}
                >
                  <IconHash size={16} className="mr-1" />
                  <span>{tag.name}</span>
                  <span className="ml-2 text-xs bg-zinc-200 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">
                    {tag.posts.length}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

export const generateMetadata = () => {
  const title = 'Tags - stutuer';
  const description = 'Tags of stutuer';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: '/tags',
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: '/tags',
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    },
  } satisfies Metadata;
};
