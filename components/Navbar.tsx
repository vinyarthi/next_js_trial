import Link from 'next/link';
import { Search, ShoppingCart, User, PawPrint } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <PawPrint className="h-6 w-6 text-zinc-900" />
            <Link href="/" className="font-serif font-bold text-xl tracking-tight text-zinc-900">
              PawPrix
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              Home
            </Link>
            <Link href="/" className="text-sm font-medium text-zinc-900 border-b-2 border-zinc-900 py-1">
              Styles
            </Link>
            <Link href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              Store
            </Link>
            <Link href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              Blog
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
