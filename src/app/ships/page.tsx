import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Ships | Star Bitty',
  description: 'Browse and compare ships from Star Citizen',
};

const ships = [
  { id: 'aurora', name: 'Aurora MR', manufacturer: 'Roberts Space Industries', role: 'Starter', price: '100,000 aUEC' },
  { id: 'mustang', name: 'Mustang Alpha', manufacturer: 'Consolidated Outland', role: 'Starter', price: '115,000 aUEC' },
  { id: 'avenger', name: 'Avenger Titan', manufacturer: 'Aegis Dynamics', role: 'Light Freight', price: '785,600 aUEC' },
  { id: 'cutlass', name: 'Cutlass Black', manufacturer: 'Drake Interplanetary', role: 'Medium Freight', price: '1,385,300 aUEC' },
  { id: 'prospector', name: 'Prospector', manufacturer: 'MISC', role: 'Mining', price: '2,061,000 aUEC' },
  { id: 'constellation', name: 'Constellation Andromeda', manufacturer: 'Roberts Space Industries', role: 'Multi-crew', price: '3,548,000 aUEC' },
  { id: 'carrack', name: 'Carrack', manufacturer: 'Anvil Aerospace', role: 'Expedition', price: '26,657,500 aUEC' },
];

export default function ShipsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-500">Ship Database</h1>
        <p className="text-center text-gray-400 mt-2">Browse and compare ships in the Star Citizen universe</p>
      </header>

      <div className="mb-6 flex justify-center space-x-4">
        <Link href="/ships/compare" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Compare Ships
        </Link>
        <Link href="/ships/components" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          Component Database
        </Link>
        <Link href="/ships/loadout" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          Loadout Builder
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Ship Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Manufacturer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {ships.map((ship) => (
                <tr key={ship.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {ship.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {ship.manufacturer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {ship.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {ship.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/ships/${ship.id}`} className="text-blue-400 hover:text-blue-300">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 