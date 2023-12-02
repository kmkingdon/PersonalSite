'use client'
import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Navbar } from 'flowbite-react';

import { type Item } from '../common/navItems';


export function GlobalNavItem({
    item,
    disabled
  }: {
    item: Item;
    disabled: boolean;
  }) {
    const segment = useSelectedLayoutSegment();
    const isActive = item.slug === segment;
    return (
        <Navbar.Link 
            disabled={disabled}
            href={`/${item.slug}`}
            className={clsx(
            'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
            {
                'text-gray-400 hover:bg-gray-800': !isActive,
                '!text-white': isActive,
            },
            )}
        >
            {item.name}
        </Navbar.Link >

    );
  }