'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ShipNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  const navLinks = [
    { name: 'Ships List', href: '/ships' },
    { name: 'Compare Ships', href: '/ships/compare' },
    { name: 'Components', href: '/ships/components' },
    { name: 'Loadout Builder', href: '/ships/loadout' },
  ];
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
      <div className="flex flex-wrap">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`px-4 py-3 text-sm font-medium ${
              isActive(link.href)
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
} 