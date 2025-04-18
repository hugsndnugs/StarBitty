import React from 'react';
import Link from 'next/link';
import ComponentCompare from '../../../components/ships/ComponentCompare';

export const metadata = {
  title: 'Component Comparison | Star Bitty',
  description: 'Compare specifications and performance of ship components in Star Citizen',
};

export default function ComponentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-500">Ship Component Comparison</h1>
        <p className="text-center text-gray-400 mt-2">Compare performance metrics for different components</p>
      </header>

      <div className="mb-6 flex justify-center space-x-4">
        <Link href="/ships" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          Ship Database
        </Link>
        <Link href="/ships/loadout" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          Loadout Builder
        </Link>
      </div>

      <div className="mt-8">
        <ComponentCompare />
      </div>
    </div>
  );
} 