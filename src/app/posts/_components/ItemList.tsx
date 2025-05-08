import type { IconProps } from '@tabler/icons-react';
import Link from 'next/link';

export const ItemList = ({
  name,
  basePath,
  Icon,
}: {
  name: string;
  basePath: string;
  Icon: React.ComponentType<IconProps>;
}) => {
  return (
    <Link
      href={`${basePath}/${name}`}
      className="tag"
    >
      <Icon size={16} className='mr-1.5' />
      <span>{name}</span>
    </Link>
  );
};
