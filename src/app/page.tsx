import React from 'react';
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full object-cover bg-gray-800">
            {/* Gradient overlay */}
            <div className="h-full w-full bg-gradient-to-b from-gray-800/60 to-gray-900 absolute"></div>
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Star Bitty
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Star Bitty is your comprehensive platform for Star Citizen trading, ship management, mining tools, and game information.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link 
              href="/ships" 
              className="rounded-md bg-blue-600 px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Ships Database
            </Link>
            <Link 
              href="/trading" 
              className="rounded-md bg-green-600 px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Trade Calculator
            </Link>
            <Link 
              href="/mining" 
              className="rounded-md bg-yellow-600 px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Mining Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
        <h2 className="text-center text-3xl font-bold leading-8 text-white">
          Everything You Need for the 'Verse
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 */}
          <div className="pt-6">
            <div className="flow-root rounded-lg bg-gray-800 px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center rounded-md bg-blue-500 p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-white">Ship Database</h3>
                <p className="mt-5 text-base text-gray-400">
                  Browse comprehensive information about all ships in Star Citizen, including specifications, components, and performance metrics.
                </p>
                <div className="mt-5">
                  <Link href="/ships" className="text-blue-400 hover:text-blue-300">
                    Explore ships →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="pt-6">
            <div className="flow-root rounded-lg bg-gray-800 px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center rounded-md bg-green-500 p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-white">Trading Tools</h3>
                <p className="mt-5 text-base text-gray-400">
                  Find the most profitable trade routes, track commodity prices, and maximize your trading profits across the Star Citizen universe.
                </p>
                <div className="mt-5">
                  <Link href="/trading" className="text-green-400 hover:text-green-300">
                    Calculate routes →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="pt-6">
            <div className="flow-root rounded-lg bg-gray-800 px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center rounded-md bg-purple-500 p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-white">Loadout Builder</h3>
                <p className="mt-5 text-base text-gray-400">
                  Create, save, and share optimal ship loadouts. Compare components and optimize your ship's performance for any scenario.
                </p>
                <div className="mt-5">
                  <Link href="/ships/loadout" className="text-purple-400 hover:text-purple-300">
                    Build a loadout →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 4 - Mining */}
          <div className="pt-6">
            <div className="flow-root rounded-lg bg-gray-800 px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center rounded-md bg-yellow-500 p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-white">Mining Equipment</h3>
                <p className="mt-5 text-base text-gray-400">
                  Compare mining equipment, find the best tools for extracting resources, and maximize your mining efficiency.
                </p>
                <div className="mt-5">
                  <Link href="/mining/equipment" className="text-yellow-400 hover:text-yellow-300">
                    Compare equipment →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="mx-auto max-w-7xl py-12 px-6 sm:py-16 lg:px-8 lg:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to explore the Star Citizen universe?
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/ships"
              className="inline-flex items-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-blue-600 shadow-sm hover:bg-gray-100"
            >
              Get Started
            </Link>
            <Link
              href="/ships/components"
              className="inline-flex items-center rounded-md border border-white px-5 py-3 text-base font-medium text-white hover:bg-blue-500"
            >
              Compare Components
            </Link>
            <Link
              href="/mining/equipment"
              className="inline-flex items-center rounded-md border border-white px-5 py-3 text-base font-medium text-white hover:bg-blue-500"
            >
              Mining Equipment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
