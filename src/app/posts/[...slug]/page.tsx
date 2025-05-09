import { getPage, getProdPages } from '@/libs/source';
import { notFound } from 'next/navigation';
import { PostContent, type PostPageData } from '@/app/posts/[...slug]/PostContent';
import { mdxComponents } from '@/libs/mdx-config';
import { serializeDate } from '@/libs/serializeData';
import ViewCounterSSR from '@/components/ViewCounterSSR';
import { PostContentSSR } from '@/components/PostContentSSR';
import HomeVisitTracker from '@/components/HomeVisitTracker';

// 定义 Promise 类型的 params
type ParamsType = Promise<{ slug: string[] }>;

export default async function PageWrapper({
  params
}: {
  params: ParamsType
}) {
  const resolvedParams = await params;
  const postFromSource = await getPage(resolvedParams.slug);

  if (postFromSource === undefined) {
    notFound();
  }

  if (!postFromSource.data || typeof postFromSource.data.body === 'undefined') {
    console.error('Post data or body is missing:', postFromSource);
    notFound();
  }
  
  const { body: MdxSourceComponent, ...metaData } = postFromSource.data;
  const { toc, ...otherMetaData } = metaData;

  const postForContent: PostPageData = {
    url: postFromSource.url,
    slugs: postFromSource.slugs,
    data: {
      title: otherMetaData.title,
      description: otherMetaData.description,
      date: otherMetaData.date instanceof Date ? serializeDate(otherMetaData.date) : String(otherMetaData.date),
      lastModified: otherMetaData.lastModified instanceof Date 
        ? serializeDate(otherMetaData.lastModified) 
        : (otherMetaData.lastModified ? String(otherMetaData.lastModified) : undefined),
      tags: otherMetaData.tags,
      categories: otherMetaData.categories,
      keywords: otherMetaData.keywords,
      draft: otherMetaData.draft,
      toc: toc,
    },
  };
  
  if (!postForContent.data.title || !postForContent.data.date) {
    console.error('Essential post data for PostContent is missing:', postForContent);
    notFound();
  }

  const renderedMdxContent = <MdxSourceComponent components={mdxComponents} />;

  // 使用服务端组件替换客户端组件
  return (
    <>
      {/* 访问追踪器组件 */}
      <HomeVisitTracker />
      
      {/* 使用服务端组件显示文章 */}
      <PostContentSSR post={postForContent}>{renderedMdxContent}</PostContentSSR>
      <ViewCounterSSR slug={postForContent.slugs[0]} type="posts" />
    </>
  );
}

export const generateStaticParams = () => {
  return getProdPages()
    .map((page) => {
      if (page.slugs.length === 0) {
        return undefined;
      }
      if (!page.data) { 
        console.warn('Page missing data in generateStaticParams:', page);
        return undefined;
      }
      return {
        slug: page.slugs,
      };
    })
    .filter((params): params is { slug: string[] } => params !== undefined);
};
