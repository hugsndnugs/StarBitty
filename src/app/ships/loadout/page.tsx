import React from 'react';
import Link from 'next/link';
import ShipNav from '@/components/ships/ShipNav';
import LoadoutBuilder from '@/components/ships/LoadoutBuilder';

export const metadata = {
  title: 'Ship Loadout Builder | Star Bitty',
  description: 'Build and optimize ship loadouts for Star Citizen',
};

export default function LoadoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-500">Ship Loadout Builder</h1>
        <p className="text-center text-gray-400 mt-2">Customize and optimize your ship loadouts</p>
      </header>

      <ShipNav />

      <div className="mt-8">
        <LoadoutBuilder shipId={null} />
      </div>
    </div>
  );
} 