'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function FloatingCTA() {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, type: 'spring', bounce: 0.4 }}
      className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <div className="pointer-events-auto bg-zinc-900 text-white rounded-full shadow-2xl p-2 flex items-center gap-4 border border-zinc-800/50 backdrop-blur-xl">
        <div className="hidden sm:flex flex-col pl-6 pr-2 py-2">
          <span className="text-sm font-semibold">Ready to see your pet?</span>
          <span className="text-xs text-zinc-400">Upload a photo to try styles instantly.</span>
        </div>
        <Link 
          href="/create"
          className="flex items-center gap-2 bg-white text-zinc-900 px-6 py-3.5 rounded-full font-semibold hover:bg-zinc-100 transition-colors shadow-inner"
        >
          <Sparkles className="w-4 h-4" />
          <span>Create Portrait</span>
        </Link>
      </div>
    </motion.div>
  );
}
