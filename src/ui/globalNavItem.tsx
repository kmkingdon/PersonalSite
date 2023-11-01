'use client'
import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

import { type Item } from '../common/navItems';

export function GlobalNavItem({
    item,
  }: {
    item: Item;
  }) {
    const segment = useSelectedLayoutSegment();
    const isActive = item.slug === segment;
  
    return (
      <Link
        onClick={close}
        href={`/${item.slug}`}
        className={clsx(
          'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
          {
            'text-gray-400 hover:bg-gray-800': !isActive,
            'text-white': isActive,
          },
        )}
      >
        {item.name}
      </Link>
    );
  }