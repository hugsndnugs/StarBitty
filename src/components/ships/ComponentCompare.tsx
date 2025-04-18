'use client';

import React, { useState } from 'react';

interface Component {
  id: string;
  name: string;
  type: 'power_plant' | 'shield' | 'cooler' | 'quantum_drive' | 'weapon' | 'missile';
  grade: string;
  size: number;
  manufacturer: string;
  power?: number;
  cooling?: number;
  damage?: number;
  range?: number;
  speed?: number;
  capacity?: number;
  emSignature?: number;
  heatSignature?: number;
  price: number;
}

const mockComponents: Component[] = [
  // Power Plants
  {
    id: 'pp_1',
    name: 'JS-300',
    type: 'power_plant',
    grade: 'Military',
    size: 2,
    manufacturer: 'Juno Starwerk',
    power: 2800,
    emSignature: 2.1,
    heatSignature: 1.8,
    price: 25200
  },
  {
    id: 'pp_2',
    name: 'Regulus',
    type: 'power_plant',
    grade: 'Industrial',
    size: 2,
    manufacturer: 'Yorm',
    power: 2600,
    emSignature: 1.9,
    heatSignature: 1.7,
    price: 15400
  },
  
  // Shields
  {
    id: 'shield_1',
    name: 'FR-76',
    type: 'shield',
    grade: 'Military',
    size: 2,
    manufacturer: 'Seal Corp.',
    capacity: 7500,
    power: 420,
    emSignature: 2.8,
    price: 35600
  },
  {
    id: 'shield_2',
    name: 'Shimmer',
    type: 'shield',
    grade: 'Civilian',
    size: 2,
    manufacturer: 'Ascension',
    capacity: 6800,
    power: 380,
    emSignature: 2.3,
    price: 18900
  },
  
  // Coolers
  {
    id: 'cooler_1',
    name: 'Bracer',
    type: 'cooler',
    grade: 'Industrial',
    size: 2,
    manufacturer: 'J-Span',
    cooling: 325,
    power: 180,
    price: 12400
  },
  {
    id: 'cooler_2',
    name: 'Polar',
    type: 'cooler',
    grade: 'Military',
    size: 2,
    manufacturer: 'Arctic',
    cooling: 360,
    power: 210,
    price: 18600
  },
  
  // Quantum Drives
  {
    id: 'qd_1',
    name: 'Voyage',
    type: 'quantum_drive',
    grade: 'Civilian',
    size: 2,
    manufacturer: 'Kel-To',
    speed: 144000,
    range: 45000000,
    power: 315,
    price: 25000
  },
  {
    id: 'qd_2',
    name: 'Atlas',
    type: 'quantum_drive',
    grade: 'Military',
    size: 2,
    manufacturer: 'Behring',
    speed: 110000,
    range: 75000000,
    power: 290,
    price: 32000
  },
  {
    id: 'qd_3',
    name: 'Eos',
    type: 'quantum_drive',
    grade: 'Competition',
    size: 2,
    manufacturer: 'Amon & Reese Co.',
    speed: 283000,
    range: 18000000,
    power: 420,
    price: 43500
  }
];

export default function ComponentCompare() {
  const [componentType, setComponentType] = useState<string>('power_plant');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  
  const filteredComponents = mockComponents.filter(
    component => component.type === componentType
  );
  
  const selectedComponentsData = mockComponents.filter(
    component => selectedComponents.includes(component.id)
  );
  
  const handleComponentSelect = (componentId: string) => {
    if (selectedComponents.includes(componentId)) {
      setSelectedComponents(selectedComponents.filter(id => id !== componentId));
    } else if (selectedComponents.length < 3) {
      setSelectedComponents([...selectedComponents, componentId]);
    }
  };
  
  const handleComponentTypeChange = (type: string) => {
    setComponentType(type);
    setSelectedComponents([]);
  };
  
  const getComparisonFields = () => {
    switch (componentType) {
      case 'power_plant':
        return [
          { label: 'Power Output', field: 'power', unit: 'units' },
          { label: 'EM Signature', field: 'emSignature', unit: '' },
          { label: 'Heat Signature', field: 'heatSignature', unit: '' },
          { label: 'Price', field: 'price', unit: 'aUEC' }
        ];
      case 'shield':
        return [
          { label: 'Shield HP', field: 'capacity', unit: 'HP' },
          { label: 'Power Draw', field: 'power', unit: 'units' },
          { label: 'EM Signature', field: 'emSignature', unit: '' },
          { label: 'Price', field: 'price', unit: 'aUEC' }
        ];
      case 'cooler':
        return [
          { label: 'Cooling Rate', field: 'cooling', unit: 'units/s' },
          { label: 'Power Draw', field: 'power', unit: 'units' },
          { label: 'Price', field: 'price', unit: 'aUEC' }
        ];
      case 'quantum_drive':
        return [
          { label: 'QT Speed', field: 'speed', unit: 'm/s' },
          { label: 'Range', field: 'range', unit: 'km' },
          { label: 'Power Draw', field: 'power', unit: 'units' },
          { label: 'Price', field: 'price', unit: 'aUEC' }
        ];
      default:
        return [
          { label: 'Price', field: 'price', unit: 'aUEC' }
        ];
    }
  };
  
  const formatValue = (value: any, field: string) => {
    if (value === undefined) return 'N/A';
    
    switch (field) {
      case 'price':
        return value.toLocaleString();
      case 'range':
        return (value / 1000000).toFixed(1) + ' million';
      case 'emSignature':
      case 'heatSignature':
        return value.toFixed(2);
      default:
        return value.toLocaleString();
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Component Comparison Tool</h2>
          <p className="text-gray-400 mb-4">Select a component type and up to 3 items to compare their specifications.</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              className={`px-4 py-2 rounded-md ${componentType === 'power_plant' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={() => handleComponentTypeChange('power_plant')}
            >
              Power Plants
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${componentType === 'shield' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={() => handleComponentTypeChange('shield')}
            >
              Shields
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${componentType === 'cooler' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={() => handleComponentTypeChange('cooler')}
            >
              Coolers
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${componentType === 'quantum_drive' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={() => handleComponentTypeChange('quantum_drive')}
            >
              Quantum Drives
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.map(component => (
              <div 
                key={component.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedComponents.includes(component.id) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => handleComponentSelect(component.id)}
              >
                <div className="font-medium text-lg">{component.name}</div>
                <div className="text-sm mb-1">{component.manufacturer}</div>
                <div className="text-sm mb-1">Grade: {component.grade}</div>
                <div className="text-sm mb-1">Size: {component.size}</div>
                <div className="text-sm">{component.price.toLocaleString()} aUEC</div>
              </div>
            ))}
          </div>
        </div>
        
        {selectedComponents.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-white mb-4">Component Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Specification
                    </th>
                    {selectedComponentsData.map(component => (
                      <th key={component.id} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        {component.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      Manufacturer
                    </td>
                    {selectedComponentsData.map(component => (
                      <td key={component.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {component.manufacturer}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      Grade
                    </td>
                    {selectedComponentsData.map(component => (
                      <td key={component.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {component.grade}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      Size
                    </td>
                    {selectedComponentsData.map(component => (
                      <td key={component.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {component.size}
                      </td>
                    ))}
                  </tr>
                  
                  {getComparisonFields().map(field => (
                    <tr key={field.field}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                        {field.label}
                      </td>
                      {selectedComponentsData.map(component => {
                        const value = component[field.field as keyof Component];
                        const formattedValue = formatValue(value, field.field);
                        
                        // Determine if this is the best value
                        const isBest = selectedComponentsData.length > 1 && (() => {
                          if (field.field === 'emSignature' || field.field === 'heatSignature' || field.field === 'price') {
                            // Lower is better
                            const values = selectedComponentsData.map(c => {
                              const val = c[field.field as keyof Component];
                              return typeof val === 'number' ? val : Infinity;
                            });
                            return value === Math.min(...values);
                          } else {
                            // Higher is better
                            const values = selectedComponentsData.map(c => {
                              const val = c[field.field as keyof Component];
                              return typeof val === 'number' ? val : -Infinity;
                            });
                            return value === Math.max(...values);
                          }
                        })();
                        
                        return (
                          <td key={component.id} className={`px-6 py-4 whitespace-nowrap text-sm ${isBest ? 'text-green-400 font-semibold' : 'text-gray-400'}`}>
                            {formattedValue} {field.unit}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 