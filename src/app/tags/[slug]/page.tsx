import { tagsList, tagsWithPosts } from '@/libs/source';
import { IconCalendar, IconTag } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 定义 Promise 类型的 params
type ParamsType = Promise<{ slug: string }>;

export default async function Page({ 
  params 
}: { 
  params: ParamsType 
}) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  const posts = tagsWithPosts.find((t) => t.name === tag)?.posts ?? [];

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
            href="/tags" 
            className="text-gray-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Tags
          </Link>
          <span className="text-gray-400">/</span>
          <h1 className="text-3xl md:text-4xl  font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
            <IconTag size={28} className="mr-2" />
            {tag}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Found {posts.length} related posts
        </p>
      </header>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-zinc-200 dark:border-gray-800 p-6">
        {sortedPosts.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No related posts
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-gray-800">
            {sortedPosts.map((post) => (
              <li key={post.url} className="py-5 first:pt-0 last:pb-0">
                <article>
                  <h2 className="text-xl  font-bold text-gray-800 dark:text-gray-200 mb-2">
                    <Link 
                      href={post.url}
                      className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
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
                        {post.data.date.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    
                    {post.data.categories && post.data.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.data.categories.map((category) => (
                          <Link
                            key={category}
                            href={`/categories/${category}`}
                            className="tag"
                          >
                            {category}
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
}

export const generateStaticParams = () => {
  return tagsList.map((tag) => ({
    slug: tag,
  }));
};

export async function generateMetadata({
  params
}: {
  params: ParamsType
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  const title = `${tag} - stutuer`;
  const description = `${tag} tag page of stutuer`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/tags/${tag}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `/tags/${tag}`,
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    },
  } satisfies Metadata;
}
