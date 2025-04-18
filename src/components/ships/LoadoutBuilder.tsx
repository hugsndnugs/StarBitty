'use client';

import React, { useState, useEffect } from 'react';

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
  price: number;
}

interface StarShip {
  id: string;
  name: string;
  manufacturer: string;
  type: string;
  size: string;
  crew: { min: number; max: number };
  cargoCapacity: number;
  price: number;
}

interface LoadoutBuilderProps {
  shipId: string | null;
}

export default function LoadoutBuilder({ shipId }: LoadoutBuilderProps) {
  const [ship, setShip] = useState<StarShip | null>(null);
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<{[key: string]: Component}>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    power: { usage: 0, capacity: 0 },
    cooling: { usage: 0, capacity: 0 },
    shields: { hp: 0 },
    weapons: { dps: 0 },
    quantum: { speed: 0, range: 0, fuel: 0 },
  });

  // Mock ship data - would come from API
  const mockShip: StarShip = {
    id: 'avenger_titan',
    name: 'Avenger Titan',
    manufacturer: 'Aegis Dynamics',
    type: 'Light Freight',
    size: 'Small',
    crew: { min: 1, max: 1 },
    cargoCapacity: 8,
    price: 785600
  };

  // Mock component data - would come from an API
  const mockComponents: Component[] = [
    {
      id: 'pp_1',
      name: 'JS-300',
      type: 'power_plant',
      grade: 'Military',
      size: 2,
      manufacturer: 'Juno Starwerk',
      power: 2800,
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
      price: 15400
    },
    {
      id: 'shield_1',
      name: 'FR-76',
      type: 'shield',
      grade: 'Military',
      size: 2,
      manufacturer: 'Seal Corp.',
      capacity: 7500,
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
      price: 18900
    },
    {
      id: 'cooler_1',
      name: 'Bracer',
      type: 'cooler',
      grade: 'Industrial',
      size: 2,
      manufacturer: 'J-Span',
      cooling: 325,
      price: 12400
    },
    {
      id: 'qd_1',
      name: 'Voyage',
      type: 'quantum_drive',
      grade: 'Civilian',
      size: 2,
      manufacturer: 'Kel-To',
      speed: 144000,
      range: 45000000,
      price: 25000
    },
    {
      id: 'weapon_1',
      name: 'CF-227 Badger',
      type: 'weapon',
      grade: 'Military',
      size: 2,
      manufacturer: 'Klaus & Werner',
      damage: 220,
      price: 10500
    },
    {
      id: 'weapon_2',
      name: 'M4A Laser Cannon',
      type: 'weapon',
      grade: 'Military',
      size: 2,
      manufacturer: 'Behring',
      damage: 240,
      price: 12600
    }
  ];

  useEffect(() => {
    async function loadShipAndComponents() {
      try {
        setLoading(true);
        
        // In a real app, would load from API
        // For now, using mock data
        setShip(mockShip);
        
        // Set mock components
        setComponents(mockComponents);
        
        // Initialize with default loadout
        const defaultLoadout: {[key: string]: Component} = {
          power_plant: mockComponents.find(c => c.type === 'power_plant') as Component,
          shield: mockComponents.find(c => c.type === 'shield') as Component,
          cooler: mockComponents.find(c => c.type === 'cooler') as Component,
          quantum_drive: mockComponents.find(c => c.type === 'quantum_drive') as Component,
          weapon_1: mockComponents.find(c => c.type === 'weapon') as Component,
        };
        
        setSelectedComponents(defaultLoadout);
        setError(null);
      } catch (err) {
        console.error('Error loading ship or components:', err);
        setError('Failed to load ship or components');
      } finally {
        setLoading(false);
      }
    }

    loadShipAndComponents();
  }, [shipId]);

  useEffect(() => {
    // Calculate loadout stats
    if (Object.keys(selectedComponents).length > 0) {
      const powerUsage = Object.values(selectedComponents)
        .filter(c => c.type !== 'power_plant')
        .reduce((sum, component) => sum + (component.power || 0) / 10, 0);
      
      const powerCapacity = selectedComponents.power_plant?.power || 0;
      
      const coolingCapacity = selectedComponents.cooler?.cooling || 0;
      
      const shieldHp = selectedComponents.shield?.capacity || 0;
      
      const weaponsDps = Object.values(selectedComponents)
        .filter(c => c.type === 'weapon')
        .reduce((sum, weapon) => sum + (weapon.damage || 0), 0);
      
      const quantumSpeed = selectedComponents.quantum_drive?.speed || 0;
      const quantumRange = selectedComponents.quantum_drive?.range || 0;
      
      setStats({
        power: { 
          usage: powerUsage, 
          capacity: powerCapacity 
        },
        cooling: { 
          usage: powerUsage * 0.8, 
          capacity: coolingCapacity 
        },
        shields: { 
          hp: shieldHp 
        },
        weapons: { 
          dps: weaponsDps 
        },
        quantum: { 
          speed: quantumSpeed, 
          range: quantumRange, 
          fuel: 100 
        }
      });
    }
  }, [selectedComponents]);

  const handleComponentSelect = (type: string, slotIndex: number, component: Component) => {
    const slotName = slotIndex > 0 ? `${type}_${slotIndex}` : type;
    setSelectedComponents({
      ...selectedComponents,
      [slotName]: component
    });
  };

  const getTotalCost = () => {
    return Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0);
  };

  const getComponentsForType = (type: string) => {
    return components.filter(component => component.type === type);
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-300">
        <p>Loading loadout builder...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Ship Loadout Builder</h2>
          {ship && (
            <div className="mb-4">
              <p className="text-lg text-blue-400">{ship.name}</p>
              <p className="text-sm text-gray-400">{ship.manufacturer} | {ship.type} | {ship.size}</p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Component selection column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Power Plant</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getComponentsForType('power_plant').map(component => (
                  <div 
                    key={component.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedComponents.power_plant?.id === component.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => handleComponentSelect('power_plant', 0, component)}
                  >
                    <div className="font-medium">{component.name}</div>
                    <div className="text-sm mb-1">{component.manufacturer}</div>
                    <div className="text-sm mb-1">Power: {component.power}</div>
                    <div className="text-sm">{component.price.toLocaleString()} aUEC</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Shields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getComponentsForType('shield').map(component => (
                  <div 
                    key={component.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedComponents.shield?.id === component.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => handleComponentSelect('shield', 0, component)}
                  >
                    <div className="font-medium">{component.name}</div>
                    <div className="text-sm mb-1">{component.manufacturer}</div>
                    <div className="text-sm mb-1">HP: {component.capacity}</div>
                    <div className="text-sm">{component.price.toLocaleString()} aUEC</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Coolers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getComponentsForType('cooler').map(component => (
                  <div 
                    key={component.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedComponents.cooler?.id === component.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => handleComponentSelect('cooler', 0, component)}
                  >
                    <div className="font-medium">{component.name}</div>
                    <div className="text-sm mb-1">{component.manufacturer}</div>
                    <div className="text-sm mb-1">Cooling: {component.cooling}</div>
                    <div className="text-sm">{component.price.toLocaleString()} aUEC</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Quantum Drive</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getComponentsForType('quantum_drive').map(component => (
                  <div 
                    key={component.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedComponents.quantum_drive?.id === component.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => handleComponentSelect('quantum_drive', 0, component)}
                  >
                    <div className="font-medium">{component.name}</div>
                    <div className="text-sm mb-1">{component.manufacturer}</div>
                    <div className="text-sm mb-1">Speed: {(component.speed || 0).toLocaleString()} m/s</div>
                    <div className="text-sm mb-1">Range: {component.range ? (component.range / 1000000).toFixed(1) + 'M km' : 'N/A'}</div>
                    <div className="text-sm">{component.price.toLocaleString()} aUEC</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Weapons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getComponentsForType('weapon').map(component => (
                  <div 
                    key={component.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedComponents.weapon_1?.id === component.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => handleComponentSelect('weapon', 1, component)}
                  >
                    <div className="font-medium">{component.name}</div>
                    <div className="text-sm mb-1">{component.manufacturer}</div>
                    <div className="text-sm mb-1">Damage: {component.damage}</div>
                    <div className="text-sm">{component.price.toLocaleString()} aUEC</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Loadout summary column */}
          <div>
            <div className="bg-gray-700 rounded-lg p-6 sticky top-6">
              <h3 className="text-lg font-medium text-white mb-4">Loadout Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-md font-medium text-white mb-2">Components</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-400">Power Plant:</span>
                      <span className="text-white">{selectedComponents.power_plant?.name || 'None'}</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-400">Shield:</span>
                      <span className="text-white">{selectedComponents.shield?.name || 'None'}</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-400">Cooler:</span>
                      <span className="text-white">{selectedComponents.cooler?.name || 'None'}</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-400">Quantum Drive:</span>
                      <span className="text-white">{selectedComponents.quantum_drive?.name || 'None'}</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-400">Weapon:</span>
                      <span className="text-white">{selectedComponents.weapon_1?.name || 'None'}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-t border-gray-600 pt-2">
                  <h4 className="text-md font-medium text-white mb-2">System Status</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Power:</span>
                        <span className={`${stats.power.usage < stats.power.capacity ? 'text-green-400' : 'text-red-400'}`}>
                          {stats.power.usage.toFixed(1)} / {stats.power.capacity} units
                        </span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${stats.power.usage < stats.power.capacity ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, (stats.power.usage / stats.power.capacity) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Cooling:</span>
                        <span className={`${stats.cooling.usage < stats.cooling.capacity ? 'text-green-400' : 'text-red-400'}`}>
                          {stats.cooling.usage.toFixed(1)} / {stats.cooling.capacity} units
                        </span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${stats.cooling.usage < stats.cooling.capacity ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, (stats.cooling.usage / stats.cooling.capacity) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-md font-medium text-white mb-2">Performance</h4>
                  <ul className="space-y-1">
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-400">Shield HP:</span>
                      <span className="text-white">{stats.shields.hp.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-400">Weapon DPS:</span>
                      <span className="text-white">{stats.weapons.dps.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-400">Quantum Speed:</span>
                      <span className="text-white">{stats.quantum.speed.toLocaleString()} m/s</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-400">Quantum Range:</span>
                      <span className="text-white">{(stats.quantum.range / 1000000).toFixed(1)} million km</span>
                    </li>
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-gray-600">
                  <h4 className="text-md font-medium text-white mb-2">Cost</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-white font-medium">{getTotalCost().toLocaleString()} aUEC</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors">
                  Save Loadout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 