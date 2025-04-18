'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Ship, Manufacturer } from '@/lib/models/ships';

interface ShipListProps {
  initialShips?: Ship[];
  initialManufacturers?: Manufacturer[];
}

export default function ShipList({ initialShips, initialManufacturers }: ShipListProps) {
  const [ships, setShips] = useState<Ship[]>(initialShips || []);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>(initialManufacturers || []);
  const [loading, setLoading] = useState(!initialShips || !initialManufacturers);
  const [error, setError] = useState<string | null>(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    async function fetchData() {
      if (!initialShips || !initialManufacturers) {
        try {
          setLoading(true);
          setError(null);
          
          // Fetch ships and manufacturers in parallel
          const [shipsRes, manufacturersRes] = await Promise.all([
            fetch('/api/ships'),
            fetch('/api/manufacturers')
          ]);
          
          if (!shipsRes.ok) {
            throw new Error(`Failed to fetch ships: ${shipsRes.status}`);
          }
          
          if (!manufacturersRes.ok) {
            throw new Error(`Failed to fetch manufacturers: ${manufacturersRes.status}`);
          }
          
          const shipsData = await shipsRes.json();
          const manufacturersData = await manufacturersRes.json();
          
          setShips(shipsData);
          setManufacturers(manufacturersData);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load ship data. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    }
    
    fetchData();
  }, [initialShips, initialManufacturers]);

  // Extract unique values for filters
  const sizes = [...new Set(ships.map(ship => ship.size))].sort();
  const focuses = [...new Set(ships.map(ship => ship.focus))].sort();

  // Apply filters to ships
  const filteredShips = ships.filter(ship => {
    const matchesManufacturer = selectedManufacturer ? ship.manufacturer_id === selectedManufacturer : true;
    const matchesSearch = searchTerm 
      ? ship.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      : true;
    const matchesSize = selectedSize ? ship.size === selectedSize : true;
    const matchesFocus = selectedFocus ? ship.focus === selectedFocus : true;
    
    return matchesManufacturer && matchesSearch && matchesSize && matchesFocus;
  });

  // Group ships by manufacturer for display
  const shipsByManufacturer = filteredShips.reduce((groups, ship) => {
    const manufacturerId = ship.manufacturer_id;
    if (!groups[manufacturerId]) {
      groups[manufacturerId] = [];
    }
    groups[manufacturerId].push(ship);
    return groups;
  }, {} as Record<number, Ship[]>);

  // Reset all filters
  const resetFilters = () => {
    setSelectedManufacturer(null);
    setSearchTerm('');
    setSelectedSize(null);
    setSelectedFocus(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-6 max-w-md">
          <h3 className="text-xl font-bold text-red-400 mb-2">Error Loading Data</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Ship Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Search</label>
            <input
              type="text"
              placeholder="Ship name..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Manufacturer filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Manufacturer</label>
            <select
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedManufacturer || ''}
              onChange={(e) => setSelectedManufacturer(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">All Manufacturers</option>
              {manufacturers.map(manufacturer => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Size filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Ship Size</label>
            <select
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSize || ''}
              onChange={(e) => setSelectedSize(e.target.value || null)}
            >
              <option value="">All Sizes</option>
              {sizes.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          
          {/* Focus filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Ship Focus</label>
            <select
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedFocus || ''}
              onChange={(e) => setSelectedFocus(e.target.value || null)}
            >
              <option value="">All Focuses</option>
              {focuses.map(focus => (
                <option key={focus} value={focus}>
                  {focus}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Filter reset button */}
        {(selectedManufacturer || searchTerm || selectedSize || selectedFocus) && (
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors text-sm"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-400">
          Showing {filteredShips.length} of {ships.length} ships
        </p>
      </div>
      
      {filteredShips.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <h3 className="text-xl text-gray-400 mb-2">No ships found matching your criteria</h3>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors mt-2"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div>
          {manufacturers
            .filter(manufacturer => shipsByManufacturer[manufacturer.id] && shipsByManufacturer[manufacturer.id].length > 0)
            .map(manufacturer => (
              <div key={manufacturer.id} id={`manufacturer-${manufacturer.id}`} className="mb-12">
                <div className="flex items-center mb-4">
                  {manufacturer.logo_url && (
                    <img 
                      src={manufacturer.logo_url} 
                      alt={manufacturer.name} 
                      className="h-8 mr-3"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 flex-grow">
                    {manufacturer.name}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shipsByManufacturer[manufacturer.id].map(ship => (
                    <Link
                      key={ship.id}
                      href={`/ships/${ship.id}`}
                      className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 border border-gray-700 hover:border-gray-600"
                    >
                      <div className="p-5">
                        <h3 className="text-xl font-bold mb-2 text-blue-400">{ship.name}</h3>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{ship.description || 'No description available.'}</p>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                          <div>
                            <span className="text-gray-400">Size:</span> 
                            <span className="ml-1 text-white">{ship.size || 'Unknown'}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Crew:</span> 
                            <span className="ml-1 text-white">
                              {ship.crew_min === ship.crew_max 
                                ? ship.crew_min 
                                : `${ship.crew_min || '?'}-${ship.crew_max || '?'}`}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Focus:</span> 
                            <span className="ml-1 text-white">{ship.focus || 'Varied'}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Type:</span> 
                            <span className="ml-1 text-white">{ship.type || 'Unknown'}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Cargo:</span> 
                            <span className="ml-1 text-white">{ship.cargo_capacity || 'N/A'} SCU</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Status:</span> 
                            <span className={`ml-1 ${
                              ship.production_status === 'flight_ready' 
                                ? 'text-green-400' 
                                : 'text-yellow-400'
                            }`}>
                              {ship.production_status === 'flight_ready' 
                                ? 'Flight Ready' 
                                : 'In Development'}
                            </span>
                          </div>
                        </div>
                        
                        {ship.price && (
                          <div className="mt-4 flex justify-between items-center border-t border-gray-700 pt-3">
                            <div>
                              <span className="text-gray-400 text-sm">Pledge:</span>
                              <span className="text-white ml-1">${ship.price}</span>
                            </div>
                            {ship.in_game_price && (
                              <div>
                                <span className="text-gray-400 text-sm">In-game:</span>
                                <span className="text-white ml-1">{ship.in_game_price.toLocaleString()} aUEC</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
} 