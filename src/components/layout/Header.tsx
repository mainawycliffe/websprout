'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Modules', href: '/#modules' },
  { label: 'Playground', href: '/playground' },
];

interface HeaderProps {
  title?: string;
  backHref?: string;
  rightContent?: React.ReactNode;
  showNav?: boolean;
}

export default function Header({ title, backHref, rightContent, showNav = true }: HeaderProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className='sticky top-0 z-40 bg-card/70 backdrop-blur-md border-b border-border/50'>
      <div className='max-w-7xl mx-auto px-4 h-14 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {backHref && (
            <Link
              href={backHref}
              className='text-text-muted hover:text-text transition-colors text-lg'
              aria-label='Go back'>
              &#8592;
            </Link>
          )}
          <Link href='/' className='flex items-center gap-2'>
            <Image src='/logo.svg' alt='WebSprout logo' width={32} height={32} />
            <span className='font-bold text-lg bg-linear-to-r from-(--color-gradient-start) to-(--color-gradient-end) bg-clip-text text-transparent'>
              {title ?? 'WebSprout'}
            </span>
          </Link>
        </div>

        {showNav && (
          <nav className='hidden lg:flex items-center gap-1'>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-text bg-white/10'
                    : 'text-text-muted hover:text-text hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className='flex items-center gap-2'>
          {rightContent && <div>{rightContent}</div>}
          {showNav && <MobileNav links={NAV_LINKS} isActive={isActive} />}
        </div>
      </div>
    </header>
  );
}
