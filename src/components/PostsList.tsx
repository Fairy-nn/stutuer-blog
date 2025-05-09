import type { Posts } from '@/libs/source';
import Link from 'next/link';
import { IconCalendar, IconTag, IconFolder, IconEye } from '@tabler/icons-react';
import ViewCounter from './ViewCounter';

export const PostsList = ({ posts }: { posts: Posts }) => {
  let year = 0;
  let month = 0;
  return (
    <div className='space-y-8'>
      {posts.map((post) => {
        let change = false;
        if (
          month !== post.data.date.getMonth() + 1 ||
          year !== post.data.date.getFullYear()
        ) {
          year = post.data.date.getFullYear();
          month = post.data.date.getMonth() + 1;
          change = true;
        }
        return (
          <div key={post.url}>
            {change && (
              <h2 className='text-2xl  font-bold text-zinc-900 dark:text-zinc-100 mt-10 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-900'>
                {year} {new Date(0, month - 1).toLocaleString('en-US', { month: 'long' })}
              </h2>
            )}
            <article className="blog-card mb-4">
              <Link href={post.url}>
                <div className="p-5">
                  <h3 className="blog-card-title mb-2">{post.data.title}</h3>
                  
                  {post.data.description && (
                    <p className="blog-card-description mb-4">{post.data.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <IconCalendar size={14} className="mr-1" />
                      <time dateTime={post.data.date.toISOString()}>
                        {post.data.date.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        <IconEye size={14} className="mr-1" />
                        <ViewCounter slug={post.slugs[0]} type="posts" trackView={false} />
                      </div>
                      
                      {post.data.tags && post.data.tags.length > 0 && (
                        <div className="flex items-center">
                          <IconTag size={14} className="mr-1" />
                          <span>{post.data.tags[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Categories and tags */}
              {((post.data.categories && post.data.categories.length > 0) || 
                (post.data.tags && post.data.tags.length > 0)) && (
                <div className="px-5 pb-5 pt-0 flex flex-wrap gap-2">
                  {post.data.categories?.map((category) => (
                    <Link 
                      key={category} 
                      href={`/categories/${category}`}
                      className="tag"
                    >
                      <IconFolder size={12} className="mr-1" />
                      {category}
                    </Link>
                  ))}
                  
                  {post.data.tags?.slice(0, 3).map((tag) => (
                    <Link 
                      key={tag} 
                      href={`/tags/${tag}`}
                      className="tag"
                    >
                      <IconTag size={12} className="mr-1" />
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          </div>
        );
      })}
    </div>
  );
};

export const DraftPostList = ({ posts }: { posts: Posts }) => {
  return (
    <div className='space-y-4'>
      <h2 className='text-2xl  font-bold text-zinc-900 dark:text-zinc-100 mt-8 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-900'>Drafts</h2>
      {posts.map((post) => (
        <article key={post.url} className="blog-card mb-4 border-dashed">
          <Link href={post.url}>
            <div className="p-5">
              <h3 className="blog-card-title mb-2">
                <span className="text-gray-500 dark:text-gray-400">[Draft]</span> {post.data.title}
              </h3>
              
              {post.data.description && (
                <p className="blog-card-description mb-4">{post.data.description}</p>
              )}
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};
