import { getPage } from '@/libs/source';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateMetadata = async (props: {
  params: { slug: string[] };
}): Promise<Metadata> => {
  const post = getPage(props.params.slug);
  if (post === undefined) notFound();

  const title = post.data.title;
  const description = post.data.description;
  const imageParams = new URLSearchParams();
  imageParams.set('title', title);
  imageParams.set('description', description ?? '');
  
  return {
    title,
    description,
    keywords: post.data.keywords,
    openGraph: {
      title,
      description,
      images: `/api/og?${imageParams}`,
      url: post.url,
    },
    twitter: {
      title,
      description,
      images: `/api/og?${imageParams}`,
    },
    alternates: {
      canonical: post.url,
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    },
  };
}; 