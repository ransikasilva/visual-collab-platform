'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubTab {
  name: string;
  href: string;
}

interface SubNavigationProps {
  tabs: SubTab[];
}

export default function SubNavigation({ tabs }: SubNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="bg-gray-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                  ${
                    isActive
                      ? 'bg-white text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
