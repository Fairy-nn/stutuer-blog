import {
  categoriesWithPosts,
  myCategoriesWithPosts,
  withoutMyCategoriesWithPosts,
} from '@/libs/source';
import { IconFolder, IconChevronRight } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';

const Page = () => {
  // 合并所有分类并按文章数量排序
  const allCategories = categoriesWithPosts.sort(
    (a, b) => b.posts.length - a.posts.length,
  );
  
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center">
          Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {allCategories.length} categories in total
        </p>
      </header>
      
      {allCategories.length === 0 ? (
        <div className="text-center py-10 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-zinc-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">
          No categories yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {allCategories.map((category) => (
            <div 
              key={category.name}
              className="bg-white dark:bg-gray-900 rounded-lg border border-zinc-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="p-5 border-b border-zinc-100 dark:border-gray-800">
                <Link 
                  href={`/categories/${category.name}`}
                  className="group flex items-center justify-between"
                >
                  <h2 className="text-xl  font-bold text-gray-800 dark:text-gray-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                    <IconFolder size={20} className="inline-block mr-2" />
                    {category.name}
                  </h2>
                  <span className="bg-zinc-100 dark:bg-gray-800 text-zinc-700 dark:text-zinc-100 px-2 py-1 rounded-full text-sm font-medium">
                    {category.posts.length} posts
                  </span>
                </Link>
              </div>
              
              <ul className="divide-y divide-zinc-100 dark:divide-gray-800">
                {category.posts
                  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
                  .slice(0, 3)
                  .map((post) => (
                    <li key={post.url} className="p-3 pl-5">
                      <Link 
                        href={post.url}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                      >
                        <IconChevronRight size={16} className="mr-2 text-zinc-300 dark:text-zinc-200" />
                        <span className="flex-1 truncate">{post.data.title}</span>
                        <time 
                          dateTime={post.data.date.toISOString()}
                          className="text-xs text-gray-500 dark:text-gray-400"
                        >
                          {post.data.date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                          })}
                        </time>
                      </Link>
                    </li>
                  ))}
              </ul>
              
              {category.posts.length > 3 && (
                <div className="p-3 text-center">
                  <Link 
                    href={`/categories/${category.name}`}
                    className="text-sm text-zinc-900 dark:text-zinc-100 hover:underline"
                  >
                    View all {category.posts.length} posts →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;

export const generateMetadata = () => {
  const title = 'Categories - stutuer';
  const description = 'Categories of stutuer';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: '/categories',
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: '/categories',
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    },
  } satisfies Metadata;
};
