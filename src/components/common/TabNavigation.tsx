'use client';

import { Icons } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  {
    name: 'ホーム',
    href: '/dashboard',
    icon: Icons.home,
  },
  {
    name: 'お相手候補',
    href: '/matches',
    icon: Icons.heart,
  },
  {
    name: 'メッセージ',
    href: '/messages',
    icon: Icons.message,
  },
  {
    name: 'コミュニティ',
    href: '/communities',
    icon: Icons.users,
  },
  {
    name: 'プロフィール',
    href: '/profile',
    icon: Icons.user,
  },
];

export function TabNavigation() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden bg-white border-t border-gray-200 px-2 py-1">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors duration-200',
                'touch-manipulation select-none',
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Icon
                className={cn(
                  'h-6 w-6 mb-1',
                  isActive ? 'text-primary-600' : 'text-gray-500'
                )}
              />
              <span
                className={cn(
                  'text-xs font-medium truncate',
                  isActive ? 'text-primary-600' : 'text-gray-500'
                )}
              >
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
