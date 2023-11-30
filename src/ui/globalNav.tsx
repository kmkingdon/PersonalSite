'use client'
import { Button, Navbar, Tooltip } from 'flowbite-react';
import Image from 'next/image'
import Link from 'next/link';
import { AiOutlineReload } from "react-icons/ai";
import { navItems} from '../common/navItems';
import { GlobalNavItem } from './globalNavItem';
import { useDispatch, useSelector } from 'react-redux';
import { resetState, selectAboutLoading, selectHomeLoading } from '../redux/generatedSlice';
import { AppDispatch } from '../redux/store';
import { useRouter } from "next/navigation";

export function GlobalNav() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  const homeLoading = useSelector(selectHomeLoading)
  const aboutLoading = useSelector(selectAboutLoading)

  const disableNav = homeLoading || aboutLoading;

  const handleReset = () => {
    dispatch(resetState());
    router.push('/about');
    router.push('/');
  }

  return (
    <Navbar fluid className="h-20 z-o">
      <Navbar.Brand as={Link} href="/">
        <Image
            src="/kingdonlogo.png"
            alt="Kevin Kingdon Logo"
            width={60}
            height={28}
            priority
          />
          <span className="font-sans self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kevin Kingdon</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <div className="flex flex-row space-around">
        <Navbar.Collapse className='z-10'>
          {navItems.map((item) => (
            <GlobalNavItem key={item.slug} item={item} disabled={disableNav}/>
          ))}
        </Navbar.Collapse>
        <Tooltip content="Reset Site">
          <Button disabled={disableNav} color="light" pill onClick={() => handleReset()} className="!bg-transparent ml-4 !h-[20px] !w-[20px] !border-none">
            <AiOutlineReload style={{color: "grey", fontSize: "1.5em"}}/>
          </Button>
        </Tooltip>
      </div>

    </Navbar>
  );
}
