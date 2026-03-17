import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Search,
  ShoppingBag,
} from "lucide-react";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-6 max-w-[1400px] mx-auto">
      <Link
        href="/"
        className="text-2xl font-bold tracking-tighter flex items-center gap-2"
      >
        🐾 PawPrix
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
        <Link href="/" className="text-zinc-900">
          Home
        </Link>
        <Link href="/styles" className="hover:text-zinc-900 transition-colors">
          Styles
        </Link>
        <Link href="/store" className="hover:text-zinc-900 transition-colors">
          Store
        </Link>
        <Link href="/blog" className="hover:text-zinc-900 transition-colors">
          Blog
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-zinc-600 hover:text-zinc-900">
          <Search className="w-5 h-5" />
        </button>
        <button className="text-zinc-600 hover:text-zinc-900">
          <ShoppingBag className="w-5 h-5" />
        </button>
        <Link
          href="/signin"
          className="hidden md:inline-flex items-center justify-center px-6 py-2.5 border border-zinc-200 rounded-full text-sm font-medium hover:border-zinc-900 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export function Hero() {

  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-12 pb-24 px-6 max-w-[1400px] mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 relative">
          {/* Left circular badge */}
          <div className="hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-zinc-200 relative">
            <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />
                <text
                  className="text-[10px] uppercase tracking-widest font-medium"
                  fill="currentColor"
                >
                  <textPath href="#circlePath">
                    Learn about us through this video •{" "}
                  </textPath>
                </text>
              </svg>
            </div>
            <Play className="w-5 h-5 fill-zinc-900" />
          </div>

          {/* Center Headline */}
          <div className="text-center max-w-4xl mx-auto z-10 mt-8 md:mt-0">
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tighter leading-[1.05] mb-6">
              Museum-Quality <br /> Pet Portraits
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-8 font-medium">
              Turn your dog or cat into a timeless masterpiece. Renaissance.
              Royal. Watercolor. Modern. Delivered as high-resolution downloads
              or framed canvas prints.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm font-semibold text-zinc-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-400" /> Free previews
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-400" /> Secure
                checkout
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-400" /> Worldwide
                shipping
              </span>
            </div>
          </div>

          {/* Right Avatars */}
          <div className="hidden md:flex items-center -space-x-3">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
              alt="User"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
              referrerPolicy="no-referrer"
            />
            <Image
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
              alt="User"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="w-12 h-12 rounded-full border-2 border-white bg-zinc-900 text-white flex items-center justify-center text-sm font-medium z-10">
              +
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="relative flex justify-center items-center gap-4 md:gap-6 h-[400px] md:h-[600px] mt-16">
          {/* Column 1 */}
          <div className="hidden md:flex flex-col gap-6 h-full justify-center mt-12">
            <div className="w-48 h-64 rounded-[2rem] overflow-hidden relative bg-orange-100">
              <Image
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=600&fit=crop"
                alt="Dog"
                fill
                className="object-cover mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-48 h-40 rounded-[2rem] overflow-hidden relative bg-teal-100">
              <Image
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop"
                alt="Cat"
                fill
                className="object-cover mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="hidden sm:block w-40 md:w-56 h-72 md:h-[26rem] rounded-[2rem] overflow-hidden relative -mt-12 bg-green-100">
            <Image
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=800&fit=crop"
              alt="Dog"
              fill
              className="object-cover mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Column 3 (Center) */}
          <div className="w-64 md:w-80 h-80 md:h-[30rem] rounded-[2rem] overflow-hidden relative z-10 shadow-2xl bg-yellow-100">
            <Image
              src="https://images.unsplash.com/photo-1543466835011-5a25e4d1a1e4?w=600&h=800&fit=crop"
              alt="Golden Retriever"
              fill
              className="object-cover mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            <div  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-max">
              <Link
  href="/create"
  className="bg-zinc-900 text-white px-6 py-3.5 rounded-full font-medium flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
>
  Create My Portrait <ArrowRight className="w-4 h-4" />
</Link>
            </div>
          </div>

          {/* Column 4 */}
          <div className="hidden sm:block w-40 md:w-56 h-72 md:h-[26rem] rounded-[2rem] overflow-hidden relative mt-24 bg-blue-100">
            <Image
              src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=800&fit=crop"
              alt="Cat"
              fill
              className="object-cover mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Column 5 */}
          <div className="hidden lg:flex flex-col gap-6 h-full justify-center -mt-20">
            <div className="w-48 h-56 rounded-[2rem] overflow-hidden relative bg-red-100">
              <Image
                src="https://images.unsplash.com/photo-1537151608804-ea6f11cc3389?w=400&h=500&fit=crop"
                alt="Dog"
                fill
                className="object-cover mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-48 h-40 rounded-[2rem] overflow-hidden relative bg-emerald-100">
              <Image
                src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=400&fit=crop"
                alt="Cat"
                fill
                className="object-cover mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Bottom section of Hero (Testimonial & Number) */}
        <div className="mt-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-md">
            <div className="text-6xl text-zinc-300 font-serif leading-none mb-4">
              “
            </div>
            <p className="text-sm font-medium text-zinc-600 mb-4">
              PawPrix&apos;s styles are fresh, bold, and exactly what I needed
              to upgrade my wall decor. Loved the quality and vibe!
            </p>
            <div className="font-serif italic text-xl text-zinc-800">
              Sarah M.
            </div>
          </div>
          <div className="flex items-end gap-4 text-right">
            <div className="text-6xl font-light tracking-tighter leading-none">
              01
            </div>
            <div className="pb-1">
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 flex items-center justify-end gap-2">
                Portraits <ArrowRight className="w-4 h-4" />
              </div>
              <div className="font-medium text-lg max-w-[200px]">
                Set Up Your Home With The Latest Styles
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
