import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Trading | Star Bitty',
  description: 'Calculate profitable trading routes in Star Citizen',
};

const tradingRoutes = [
  { id: 1, from: 'Port Olisar', to: 'Area18', commodity: 'Medical Supplies', profit: 24500, investment: 105000, roi: 23.3 },
  { id: 2, from: 'Arial - Lathan', to: 'Lorville', commodity: 'Titanium', profit: 18200, investment: 76000, roi: 23.9 },
  { id: 3, from: 'Daymar - Kudre Ore', to: 'Grim HEX', commodity: 'Agricium', profit: 31400, investment: 136000, roi: 23.1 },
  { id: 4, from: 'HDMS-Lathan', to: 'New Babbage', commodity: 'Diamonds', profit: 19800, investment: 92000, roi: 21.5 },
  { id: 5, from: 'CRU-L1', to: 'Port Olisar', commodity: 'Agricultural Supplies', profit: 16500, investment: 84000, roi: 19.6 },
];

export default function TradingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-500">Trading Routes</h1>
        <p className="text-center text-gray-400 mt-2">Find the most profitable trade routes in the Star Citizen universe</p>
      </header>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Route Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Starting Location</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>All Locations</option>
              <option>Port Olisar</option>
              <option>Area18</option>
              <option>Lorville</option>
              <option>New Babbage</option>
              <option>Grim HEX</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Destination</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>All Locations</option>
              <option>Port Olisar</option>
              <option>Area18</option>
              <option>Lorville</option>
              <option>New Babbage</option>
              <option>Grim HEX</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Available Capital (aUEC)</label>
            <input
              type="number"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="100000"
              defaultValue="100000"
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Calculate Routes
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Buy From
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Sell To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Commodity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Investment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Profit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  ROI %
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {tradingRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {route.from}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {route.to}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {route.commodity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {route.investment.toLocaleString()} aUEC
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                    +{route.profit.toLocaleString()} aUEC
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                    {route.roi.toFixed(1)}%
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