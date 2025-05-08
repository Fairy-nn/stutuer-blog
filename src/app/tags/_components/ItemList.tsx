import { Tag } from 'lucide-react';
import Link from 'next/link';

export const ItemList = ({
  name,
  numOfPosts,
}: {
  name: string;
  numOfPosts: number;
}) => {
  return (
    <Link
      href={`tags/${name}`}
      className='bg-gray-100 rounded-lg flex px-2 sm:px-3 sm:py-1 no-underline hover:underline text-lg sm:text-xl'
    >
      <Tag size={18} className='my-auto mr-1' />
      <span className='mr-1'>{name}</span>(
      {numOfPosts.toString()})
    </Link>
  );
};
