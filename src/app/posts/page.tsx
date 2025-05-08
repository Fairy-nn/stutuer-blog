import { DraftPostList, PostsList } from '@/components/PostsList';
import { getDraftPages, getProdPages } from '@/libs/source';
import { IconCalendar, IconTag } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';

const Page = () => {
  const posts = getProdPages()
    // remove index page
    .filter((post) => post.slugs.length !== 0)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  
  // 非生产环境显示草稿文章
  const isDev = process.env.NODE_ENV !== 'production';
  const draftPosts = isDev ? getDraftPages() : [];

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-pink-600 dark:text-pink-400 mb-3">
          全部文章
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          共有 {posts.length} 篇文章
          {isDev && draftPosts.length > 0 && `, 另有 ${draftPosts.length} 篇草稿`}
        </p>
      </header>

      {/* 草稿文章区域 */}
      {isDev && draftPosts.length > 0 && (
        <section className="mb-12">
          <DraftPostList posts={draftPosts} />
        </section>
      )}

      {/* 正式文章区域 */}
      <section>
        {posts.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            暂无文章
          </div>
        ) : (
          <PostsList posts={posts} />
        )}
      </section>
    </div>
  );
};

export default Page;

export const generateMetadata = () => {
  const title = '全部文章 - stutuer';
  const description = 'stutuer的博客文章列表';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: '/posts',
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: '/posts',
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    },
  } satisfies Metadata;
};
