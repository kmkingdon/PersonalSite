'use client'
import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';

import { type Item } from '../common/navItems';
import { Navbar } from 'flowbite-react';

export function GlobalNavItem({
    item,
  }: {
    item: Item;
  }) {
    const segment = useSelectedLayoutSegment();
    const isActive = item.slug === segment;
  
    return (
        <Navbar.Link 
            href={`/${item.slug}`}
            className={clsx(
            'block rounded-md px-3 py-2 text-sm font-medium bg-gray-600 hover:text-gray-300',
            {
                'text-gray-400 hover:bg-gray-800': !isActive,
                'text-white': isActive,
            },
            )}
        >
            {item.name}
        </Navbar.Link >

    );
  }