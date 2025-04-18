'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MiningNav() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Mining Overview', href: '/mining' },
    { name: 'Equipment Comparison', href: '/mining/equipment' },
  ];
  
  return (
    <div className="bg-gray-800 rounded-lg mb-6">
      <div className="px-2 py-3">
        <nav className="flex flex-wrap">
          {navItems.map((item) => {
            const isActive = 
              item.href === '/mining' 
                ? pathname === '/mining' || pathname === '/mining/'
                : pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium mr-2 ${
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 