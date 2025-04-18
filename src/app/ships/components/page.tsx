import React from 'react';
import Link from 'next/link';
import ShipNav from '@/components/ships/ShipNav';
import ComponentCompare from '@/components/ships/ComponentCompare';

export const metadata = {
  title: 'Component Comparison | Star Bitty',
  description: 'Compare ship components specifications and performance in Star Citizen',
};

export default function ComponentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-500">Component Comparison</h1>
        <p className="text-center text-gray-400 mt-2">Compare specifications and performance of different ship components</p>
      </header>

      <ShipNav />

      <div className="mt-8">
        <ComponentCompare />
      </div>
    </div>
  );
} 