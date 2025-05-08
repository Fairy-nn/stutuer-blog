import { mdxComponents } from '@/libs/mdx-config';
import { getPage, getProdPages } from '@/libs/source';
import { serializeDate } from '@/libs/serializeData';
import { DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IconCalendar, IconTag } from '@tabler/icons-react';
import { HomePage } from './HomePage';
import type { PostPageData } from './posts/[...slug]/PostContent';

// Type predicate to ensure posts are not null
function isSerializedPost(post: PostPageData | null): post is PostPageData {
  return post !== null;
}

// 序列化文章数据
function serializePost(post: any): PostPageData | null {
  try {
    return {
      url: post.url,
      slugs: post.slugs,
      data: {
        title: post.data.title,
        description: post.data.description,
        date: post.data.date instanceof Date ? serializeDate(post.data.date) : String(post.data.date),
        lastModified: post.data.lastModified instanceof Date 
          ? serializeDate(post.data.lastModified) 
          : (post.data.lastModified ? String(post.data.lastModified) : undefined),
        tags: post.data.tags,
        categories: post.data.categories,
        keywords: post.data.keywords,
        draft: post.data.draft,
        toc: post.data.toc,
      },
    };
  } catch (error) {
    console.error('Failed to serialize post:', error);
    return null;
  }
}

export default function IndexPage() {
  const about = getPage([]);

  if (about === undefined) {
    notFound();
  }

  // 获取最新博客文章
  const postsData = getProdPages()
    .filter((post) => post.slugs.length !== 0)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 6);

  const serializedAbout = serializePost(about);
  // Filter posts after serialization and ensure they are not null
  const posts = postsData.map(post => serializePost(post)).filter(isSerializedPost);

  if (!serializedAbout) {
    notFound(); // Or handle the case where 'about' page data is missing
  }

  return <HomePage about={serializedAbout} posts={posts} />;
}
