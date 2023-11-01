import Image from 'next/image'
import Link from 'next/link';
import { navItems} from '../common/navItems';
import { GlobalNavItem } from './globalNavItem';

export function GlobalNav() {

  return (
    <div className="flex row justify-between items-center h-20 bg-black">
      <div className="w-96">
        <Link
          href="/"
          className="flex row justify-start items-center"
        >
          <div className="px-8">
            <Image
              src="/kingdonlogo.png"
              alt="Kevin Kingdon Logo"
              className="dark:invert"
              width={60}
              height={28}
              priority
            />
          </div>
          <span className="text-4xl align-middle font-semibold text-gray-400 group-hover:text-gray-50">
            Kevin Kingdon
          </span>
        </Link>
      </div>
      <nav className="pr-8">
        <div className="flex row">
          {navItems.map((item) => (
            <GlobalNavItem key={item.slug} item={item}/>
          ))}
        </div>
      </nav>
    </div>
  );
}
