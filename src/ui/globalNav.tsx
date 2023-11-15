'use client'
import { Navbar } from 'flowbite-react';
import Image from 'next/image'
import Link from 'next/link';
import { navItems} from '../common/navItems';
import { GlobalNavItem } from './globalNavItem';


export function GlobalNav() {

  return (
    <Navbar fluid className="h-20">
      <Navbar.Brand as={Link} href="/">
        <Image
            src="/kingdonlogo.png"
            alt="Kevin Kingdon Logo"
            width={60}
            height={28}
            priority
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kevin Kingdon</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className='z-10'>
        {navItems.map((item) => (
          <GlobalNavItem key={item.slug} item={item}/>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
