import React from 'react';
import Link from 'next/link';
import MiningNav from '@/components/mining/MiningNav';

export const metadata = {
  title: 'Mining | Star Bitty',
  description: 'Mining guides, tools and equipment comparison for Star Citizen miners.',
};

export default function MiningPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mining in Star Citizen</h1>
          <p className="text-xl text-gray-400">Essential tools and information for successful mining operations</p>
        </header>

        <div className="mb-6">
          <MiningNav />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4">Mining Equipment Comparison</h2>
            <p className="text-gray-300 mb-6">
              Compare mining heads and modules to find the optimal equipment for your mining operations. Analyze each component's stats and find the best combinations for different scenarios.
            </p>
            <div className="mt-auto">
              <Link 
                href="/mining/equipment" 
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition"
              >
                Compare Equipment
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4">Mining Locations</h2>
            <p className="text-gray-300 mb-6">
              Discover the best mining locations across the Star Citizen universe. Find deposits of rare minerals and maximize your mining profits with our interactive maps.
            </p>
            <div className="mt-auto text-gray-500">
              <span className="inline-block px-6 py-3 bg-gray-800 rounded-md font-semibold">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Mining Guide for Beginners</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Getting Started</h3>
              <p className="text-gray-300">
                Mining in Star Citizen involves finding mineral deposits, extracting them with specialized equipment, and then transporting and selling them for profit. Whether you're using a hand tool or a dedicated mining ship, the basic principles remain the same.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Mining Process</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                <li><strong>Scanning:</strong> Use your scanner to detect potential mineral deposits in your vicinity.</li>
                <li><strong>Analysis:</strong> Scan the rock to determine its mineral composition and value.</li>
                <li><strong>Extraction:</strong> Use your mining laser to carefully heat the rock until it fractures.</li>
                <li><strong>Collection:</strong> Extract the valuable minerals using your mining tool or ship's collection system.</li>
                <li><strong>Refinement:</strong> Refine raw materials for increased value (optional).</li>
                <li><strong>Selling:</strong> Transport and sell your minerals at trading terminals for profit.</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Recommended Ships</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-white">MISC Prospector</h4>
                  <p className="text-gray-400">Single-pilot mining ship, perfect for beginners</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-white">ARGO MOLE</h4>
                  <p className="text-gray-400">Multi-crew mining vessel with greater capacity</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-white">ROC</h4>
                  <p className="text-gray-400">Surface vehicle for planetary gem mining</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 