import { categoriesList, categoriesWithPosts } from '@/libs/source';
import { IconCalendar, IconFolder } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const category = decodeURIComponent(params.slug);
  const posts =
    categoriesWithPosts.find((t) => t.name === category)?.posts ?? [];

  if (posts.length === 0) {
    notFound();
  }

  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Link 
            href="/categories" 
            className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
          >
            分类
          </Link>
          <span className="text-gray-400">/</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-pink-600 dark:text-pink-400 flex items-center">
            <IconFolder size={28} className="mr-2" />
            {category}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          找到 {posts.length} 篇相关文章
        </p>
      </header>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-pink-100 dark:border-gray-800 p-6">
        {sortedPosts.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            暂无相关文章
          </div>
        ) : (
          <ul className="divide-y divide-pink-100 dark:divide-gray-800">
            {sortedPosts.map((post) => (
              <li key={post.url} className="py-5 first:pt-0 last:pb-0">
                <article>
                  <h2 className="text-xl font-serif font-bold text-gray-800 dark:text-gray-200 mb-2">
                    <Link 
                      href={post.url}
                      className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                    >
                      {post.data.title}
                    </Link>
                  </h2>
                  
                  {post.data.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {post.data.description}
                    </p>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center mr-4">
                      <IconCalendar size={14} className="mr-1" />
                      <time dateTime={post.data.date.toISOString()}>
                        {post.data.date.toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    
                    {post.data.tags && post.data.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.data.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/tags/${tag}`}
                            className="tag"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;

export const generateStaticParams = () => {
  return categoriesList.map((category) => ({
    slug: category,
  }));
};

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const category = decodeURIComponent(params.slug);
  const title = `${category} - stutuer`;
  const description = `${category} tag page of stutuer`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/categories/${category}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `/categories/${category}`,
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    },
  } satisfies Metadata;
};
