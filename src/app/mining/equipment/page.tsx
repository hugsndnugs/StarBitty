import React from 'react';
import Link from 'next/link';
import MiningEquipment from '@/components/mining/MiningEquipment';
import MiningNav from '@/components/mining/MiningNav';

export const metadata = {
  title: 'Mining Equipment | Star Bitty',
  description: 'Compare mining equipment including mining heads and modules to find the best tools for your mining operations.',
};

export default function MiningEquipmentPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mining Equipment Comparison</h1>
          <p className="text-xl text-gray-400">Compare mining heads and modules to optimize your mining operations</p>
        </header>

        <div className="mb-6">
          <MiningNav />
        </div>

        <div className="grid grid-cols-1 gap-8">
          <MiningEquipment />
          
          <div className="bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Mining Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Mining Head Selection</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>For high-value but unstable materials like Quantanium, prioritize stability over power</li>
                  <li>Lancet mining heads offer the best stability and resistance values</li>
                  <li>Helix mining heads provide maximum extraction power but at the cost of stability</li>
                  <li>Consider matching mining head size with your ship's capabilities</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Module Combinations</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Combine Surge and Optimizer modules for difficult extractions</li>
                  <li>Use Filter modules to increase the yield of valuable materials</li>
                  <li>Keep a Throttle module ready for when you need precise control</li>
                  <li>Optimal sequence: Surge → Extract → Throttle (for cooling) → Filter</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 