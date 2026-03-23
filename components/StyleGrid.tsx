'use client';

import { Style } from '@/data/styles';
import { StyleCard } from './StyleCard';
import { motion } from 'motion/react';

interface StyleGridProps {
  styles: Style[];
}

export function StyleGrid({ styles }: StyleGridProps) {
  if (styles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🎨</span>
        </div>
        <h3 className="font-serif text-2xl text-zinc-900 mb-2">No styles found</h3>
        <p className="text-zinc-500 max-w-md">
          We couldn&apos;t find any styles matching your current filters. Try adjusting your search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {styles.map((style) => (
          <div key={style.id} className="break-inside-avoid">
            <StyleCard style={style} />
          </div>
        ))}
      </div>
    </div>
  );
}
