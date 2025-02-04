'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { collections } from '../data/collections';

const seasons = ['ALL', 'FALL 2024', 'WINTER 2024', 'SPRING 2024', 'SPRING SUMMER 2024'];

export default function Home() {
  const [selectedSeason, setSelectedSeason] = useState('ALL');

  const filteredCollections = selectedSeason === 'ALL' 
    ? collections 
    : collections.filter(collection => collection.season === selectedSeason);

  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6  lg:px-8 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl mt-10 font-bold">COLLECTIONS</h1>
        <button className="flex items-center gap-2 hover:opacity-75 transition-opacity mt-10">
          VISIT SHOP
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {seasons.map((season) => (
          <button
            key={season}
            onClick={() => setSelectedSeason(season)}
            className={`px-4 py-2 text-sm border border-black transition-colors
              ${selectedSeason === season 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
          >
            {season}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCollections.map((collection) => (
          <div key={collection.id} className="space-y-3">
            <div className="relative aspect-[3/4] bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              {collection.title} - {collection.season}
            </div>
            <div className="space-y-1">
              <p className="text-lg">₹ {collection.price.toLocaleString()}</p>
              <p className="font-light">{collection.title}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}