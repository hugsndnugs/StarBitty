'use client';

import React, { useState } from 'react';

interface MiningHead {
  id: number;
  name: string;
  manufacturer: string;
  size: string;
  power: number;
  stability: number;
  resistance: number;
  optimalChargeRate: number;
  optimalChargeWindow: number;
  price: number;
}

interface MiningModule {
  id: number;
  name: string;
  manufacturer: string;
  type: 'Surge' | 'Throttle' | 'Optimizer' | 'Filter';
  effect: string;
  duration: number;
  cooldown: number;
  price: number;
}

const miningHeads: MiningHead[] = [
  {
    id: 1,
    name: 'Arbor MH1',
    manufacturer: 'Greycat',
    size: 'S1',
    power: 1600,
    stability: 2,
    resistance: 3,
    optimalChargeRate: 0.5,
    optimalChargeWindow: 6,
    price: 4350
  },
  {
    id: 2,
    name: 'Hofstede S1',
    manufacturer: 'MISC',
    size: 'S1',
    power: 1850,
    stability: 3,
    resistance: 4,
    optimalChargeRate: 0.75,
    optimalChargeWindow: 5,
    price: 6750
  },
  {
    id: 3,
    name: 'Lancet MH1',
    manufacturer: 'Greycat',
    size: 'S1',
    power: 1400,
    stability: 5,
    resistance: 6,
    optimalChargeRate: 0.45,
    optimalChargeWindow: 8,
    price: 12200
  },
  {
    id: 4,
    name: 'Helix I',
    manufacturer: 'Greycat',
    size: 'S1',
    power: 2200,
    stability: 1,
    resistance: 2,
    optimalChargeRate: 1.2,
    optimalChargeWindow: 4,
    price: 24600
  },
  {
    id: 5,
    name: 'Impact I',
    manufacturer: 'MISC',
    size: 'S1',
    power: 2000,
    stability: 2,
    resistance: 2,
    optimalChargeRate: 0.9,
    optimalChargeWindow: 4,
    price: 13800
  }
];

const miningModules: MiningModule[] = [
  {
    id: 1,
    name: 'Surge',
    manufacturer: 'Greycat',
    type: 'Surge',
    effect: '+150% Laser Power',
    duration: 25,
    cooldown: 60,
    price: 9800
  },
  {
    id: 2,
    name: 'Stampede',
    manufacturer: 'Greycat',
    type: 'Throttle',
    effect: '+35% Optimal Charge Rate',
    duration: 35,
    cooldown: 55,
    price: 11200
  },
  {
    id: 3,
    name: 'Optimum',
    manufacturer: 'MISC',
    type: 'Optimizer',
    effect: '+70% Optimal Charge Window',
    duration: 45,
    cooldown: 60,
    price: 12500
  },
  {
    id: 4,
    name: 'FLTR-XL',
    manufacturer: 'MISC',
    type: 'Filter',
    effect: '-30% Inert Material',
    duration: 90,
    cooldown: 120,
    price: 18400
  },
  {
    id: 5,
    name: 'Brandt',
    manufacturer: 'Greycat',
    type: 'Surge',
    effect: '+85% Laser Power, +20% Stability',
    duration: 30,
    cooldown: 75,
    price: 15600
  }
];

export default function MiningEquipment() {
  const [selectedCategory, setSelectedCategory] = useState<'heads' | 'modules'>('heads');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleItemSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      // Limit comparison to 3 items
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, id]);
      }
    }
  };

  const getBestValue = (property: keyof MiningHead, higher: boolean = true) => {
    if (selectedCategory !== 'heads' || selectedItems.length === 0) return null;
    
    const selectedHeads = miningHeads.filter(head => selectedItems.includes(head.id));
    const values = selectedHeads.map(head => head[property] as number);
    
    return higher ? Math.max(...values) : Math.min(...values);
  };

  const renderHeadsTable = () => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Select
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Manufacturer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Size
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Power
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Stability
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Resistance
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Charge Rate
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Window
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {miningHeads.map((head) => {
              const isSelected = selectedItems.includes(head.id);
              return (
                <tr key={head.id} className={`hover:bg-gray-700 cursor-pointer ${isSelected ? 'bg-blue-900 bg-opacity-40' : ''}`} onClick={() => toggleItemSelection(head.id)}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => toggleItemSelection(head.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {head.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {head.manufacturer}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {head.size}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${head.power === getBestValue('power') && isSelected ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                    {head.power}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${head.stability === getBestValue('stability') && isSelected ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                    {head.stability}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${head.resistance === getBestValue('resistance') && isSelected ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                    {head.resistance}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${head.optimalChargeRate === getBestValue('optimalChargeRate') && isSelected ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                    {head.optimalChargeRate}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${head.optimalChargeWindow === getBestValue('optimalChargeWindow') && isSelected ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                    {head.optimalChargeWindow}s
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${head.price === getBestValue('price', false) && isSelected ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                    {head.price.toLocaleString()} aUEC
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderModulesTable = () => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Select
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Manufacturer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Effect
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Cooldown
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {miningModules.map((module) => {
              const isSelected = selectedItems.includes(module.id);
              return (
                <tr key={module.id} className={`hover:bg-gray-700 cursor-pointer ${isSelected ? 'bg-blue-900 bg-opacity-40' : ''}`} onClick={() => toggleItemSelection(module.id)}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => toggleItemSelection(module.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {module.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {module.manufacturer}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${module.type === 'Surge' ? 'bg-red-900 text-red-200' : 
                        module.type === 'Throttle' ? 'bg-blue-900 text-blue-200' :
                        module.type === 'Optimizer' ? 'bg-yellow-900 text-yellow-200' : 
                        'bg-green-900 text-green-200'}`}>
                      {module.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {module.effect}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {module.duration}s
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {module.cooldown}s
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {module.price.toLocaleString()} aUEC
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Mining Equipment Comparison</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setSelectedCategory('heads');
              setSelectedItems([]);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedCategory === 'heads' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Mining Heads
          </button>
          <button
            onClick={() => {
              setSelectedCategory('modules');
              setSelectedItems([]);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedCategory === 'modules' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Mining Modules
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {selectedCategory === 'heads' ? renderHeadsTable() : renderModulesTable()}
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>* Select up to 3 items to compare. Best values are highlighted in green.</p>
        <p>* Click on any row to select/deselect an item for comparison.</p>
      </div>
    </div>
  );
} 