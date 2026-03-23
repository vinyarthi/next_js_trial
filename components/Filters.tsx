'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface FiltersProps {
  onFilterChange: (category: string, useCase: string, searchQuery: string) => void;
}

const CATEGORIES = ['All', 'Renaissance', 'Modern', 'Minimal', 'Fun', 'Craft'];
const USE_CASES = ['All', 'Wall Decor', 'Gift', 'Memorial', 'Social', 'Craft'];

export function Filters({ onFilterChange }: FiltersProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeUseCase, setActiveUseCase] = useState('All');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange(activeCategory, activeUseCase, e.target.value);
  };

  const handleCategory = (category: string) => {
    setActiveCategory(category);
    onFilterChange(category, activeUseCase, search);
  };

  const handleUseCase = (useCase: string) => {
    setActiveUseCase(useCase);
    onFilterChange(activeCategory, useCase, search);
  };

  return (
    <div className="sticky top-16 z-40 bg-zinc-50/90 backdrop-blur-xl py-4 border-b border-zinc-200/50 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-zinc-200 rounded-full leading-5 bg-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm transition-all shadow-sm"
              placeholder="Search styles..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex items-center gap-2 mr-4">
              <SlidersHorizontal className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-medium text-zinc-700">Category:</span>
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-zinc-900 text-white shadow-md'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
