'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { ThemeToggle } from '@/components/ThemeToggle';

const NAV_LINKS = [
  { label: 'work', href: '/work' },
  { label: 'projects', href: '/projects' },
  { label: 'writing', href: '/writing' },
  { label: 'outside', href: '/outside' },
];

// /links has been retired — social links live on the homepage

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="mb-16 flex items-center justify-between">
      <Link
        href="/"
        className="font-mono text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        rkl
      </Link>
      <div className="flex items-center gap-3 sm:gap-6">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-text-primary ${
                active ? 'text-text-primary' : 'text-text-secondary'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        {/* <ThemeToggle /> */}
      </div>
    </nav>
  );
}
