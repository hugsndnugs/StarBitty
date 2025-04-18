import React from 'react';
import Link from 'next/link';
import ShipList from '@/components/ships/ShipList';

export const metadata = {
  title: 'Ships Database | Star Bitty',
  description: 'Browse and filter ships in the Star Citizen universe',
};

export default function ShipsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-500">Star Citizen Ships Database</h1>
        <p className="text-center text-gray-400 mt-2">Browse ships from the Star Citizen universe</p>
      </header>

      <div className="mb-6 flex justify-center space-x-4">
        <Link href="/ships/components" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          Component Database
        </Link>
        <Link href="/ships/loadout" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          Loadout Builder
        </Link>
      </div>

      <div className="mt-8">
        <ShipList />
      </div>
    </div>
  );
} 