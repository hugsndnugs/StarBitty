import React from 'react';
import Link from 'next/link';
import LoadoutBuilder from '../../../components/ships/LoadoutBuilder';

export const metadata = {
  title: 'Ship Loadout Builder | Star Bitty',
  description: 'Customize and optimize your ship loadout for Star Citizen',
};

export default function LoadoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-500">Ship Loadout Builder</h1>
        <p className="text-center text-gray-400 mt-2">Customize your ship with components to optimize performance</p>
      </header>

      <div className="mb-6 flex justify-center space-x-4">
        <Link href="/ships" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          Ship Database
        </Link>
        <Link href="/ships/components" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          Component Database
        </Link>
      </div>

      <div className="mt-8">
        <LoadoutBuilder />
      </div>
    </div>
  );
} 