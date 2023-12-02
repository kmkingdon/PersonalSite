'use client'
import { Button, Navbar, Tooltip } from 'flowbite-react';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { Saira_Extra_Condensed} from "next/font/google";
import { AiOutlineReload } from "react-icons/ai";
import { navItems} from '../common/navItems';
import { GlobalNavItem } from './globalNavItem';
import { useDispatch, useSelector } from 'react-redux';
import { resetState, selectAboutLoading, selectHomeLoading } from '../redux/generatedSlice';
import { AppDispatch } from '../redux/store';

const sierra = Saira_Extra_Condensed({weight:"100", subsets: ['latin']});

export function GlobalNav() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();

  const homeLoading = useSelector(selectHomeLoading);
  const aboutLoading = useSelector(selectAboutLoading);

  const disableNav = homeLoading || aboutLoading;

  const handleReset = () => {
    dispatch(resetState());
    console.log({pathname, check: pathname !== '/'})
    if(pathname !== '/'){
      router.push('/');
    } else {
      location.reload();
    }
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
          <span className={`${sierra.className} self-center text-2xl sm:text-5xl tracking-normal sm:tracking-wide font-semibold whitespace-nowrap dark:text-white`}>Kevin Kingdon</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <div className="flex flex-row justify-end w-[50%] no-wrap">
        <Navbar.Collapse className='z-10 bg-slate-800 mt-4 sm:bg-transparent sm:mt-0'>
          {navItems.map((item) => (
            <GlobalNavItem key={item.slug} item={item} disabled={disableNav}/>
          ))}
        </Navbar.Collapse>
        <Tooltip content="Reset Site">
          <Button disabled={disableNav} color="light" pill onClick={() => handleReset()} className="absolute right-16 top-8 sm:sticky !bg-transparent ml-8 !h-[20px] !w-[20px] !border-none">
            <AiOutlineReload style={{color: "grey", fontSize: "1.5em"}}/>
          </Button>
        </Tooltip>
      </div>

    </Navbar>
  );
}
