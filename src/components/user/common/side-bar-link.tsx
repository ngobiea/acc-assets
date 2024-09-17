'use client';

import { ListItem, ListItemPrefix } from '@/components/materialTailwind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function SideBarLink({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: ReactNode;
}) {
  const path = usePathname();
      const activeStyle =
        'flex w-full h-full p-3 items-center gap-4 px-4 capitalize bg-blue-400 text-white rounded-xl shadow-md hover:shadow-lg';
      const inActiveStyle =
        'flex w-full h-full p-3 items-center gap-4 px-4 capitalize';
  return (
    <ListItem className='p-0'>
      <Link
        href={href}
        className={path ===href ? activeStyle : inActiveStyle}
      >
        <ListItemPrefix>{icon}</ListItemPrefix>
        {title}
      </Link>
    </ListItem>
  );
}
