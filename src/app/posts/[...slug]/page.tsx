import { getPage, getProdPages } from '@/libs/source';
import { notFound } from 'next/navigation';
import { PostContent, type PostPageData } from '@/app/posts/[...slug]/PostContent';
import { mdxComponents } from '@/libs/mdx-config';
import { serializeDate } from '@/libs/serializeData';

const PageWrapper = async (props: {
  params: { slug: string[] };
}) => {
  const postFromSource = await getPage(props.params.slug);

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

  return <PostContent post={postForContent}>{renderedMdxContent}</PostContent>;
};

export default PageWrapper;

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
