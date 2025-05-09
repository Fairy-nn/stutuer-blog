import type { Metadata } from 'next';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center gap-6 mt-12'>
      <div className='text-4xl font-bold text-zinc-900 dark:text-zinc-100'>404 Not Found</div>
      <div className='text-lg'>Page not found</div>
    </div>
  );
};

export default NotFound;

export const metadata: Metadata = {
  title: '404',
  description: 'Page not found',
};
