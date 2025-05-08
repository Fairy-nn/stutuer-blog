'use client';

import { mdxComponents } from '@/libs/mdx-config';
import { PostPageData } from './posts/[...slug]/PostContent';
import Image from 'next/image';
import Link from 'next/link';
import { IconCalendar, IconTag } from '@tabler/icons-react';

interface HomePageProps {
  about: PostPageData;
  posts: PostPageData[];
}

export function HomePage({ about, posts }: HomePageProps) {
  // 不再尝试直接使用 about.data.body
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero 部分 */}
      <section className="mb-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8 border border-pink-100 dark:border-gray-800">
          <div className="md:flex items-start gap-8">
            <div className="md:w-3/4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-pink-600 dark:text-pink-400 mb-6">
                欢迎来到 stutuer
              </h1>
              
              <div className="blog-content">
                {/* 不再直接渲染 MDX 组件 */}
                <div className="prose dark:prose-invert">
                  {about.data.description && (
                    <p>{about.data.description}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0 md:w-1/4 flex-shrink-0">
              <div className="">
                <Image 
                  src="/GOPHER_ROCKS.png" 
                  alt="Avatar" 
                  width={300} 
                  height={300}
                  className="rounded-lg mx-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 最新文章部分 */}
      <section>
        <h2 className="text-3xl font-serif font-bold text-pink-600 dark:text-pink-400 mb-6">
          最新文章
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.url} className="blog-card">
              <Link href={post.url}>
                <div className="p-5">
                  <h3 className="blog-card-title mb-2">{post.data.title}</h3>
                  
                  {post.data.description && (
                    <p className="blog-card-description mb-4">{post.data.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <IconCalendar size={14} className="mr-1" />
                      <time dateTime={post.data.date}>
                        {new Date(post.data.date).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    
                    {post.data.tags && post.data.tags.length > 0 && (
                      <div className="flex items-center">
                        <IconTag size={14} className="mr-1" />
                        <span>{post.data.tags[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
              
              {/* 分类和标签 */}
              {((post.data.categories && post.data.categories.length > 0) || 
                (post.data.tags && post.data.tags.length > 0)) && (
                <div className="px-5 pb-5 pt-0 flex flex-wrap gap-2">
                  {post.data.categories?.map((category) => (
                    <Link 
                      key={category} 
                      href={`/categories/${category}`}
                      className="tag"
                    >
                      {category}
                    </Link>
                  ))}
                  
                  {post.data.tags?.slice(0, 3).map((tag) => (
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
            </article>
          ))}
        </div>
        
        {/* 查看全部按钮 */}
        <div className="mt-8 text-center">
          <Link 
            href="/posts"
            className="inline-block bg-pink-100 hover:bg-pink-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-pink-700 dark:text-pink-400 font-medium px-6 py-3 rounded-lg transition-colors"
          >
            查看全部文章
          </Link>
        </div>
      </section>
    </div>
  );
} 