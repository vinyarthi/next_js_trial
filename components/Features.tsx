import Image from "next/image";
import {
  Star,
  Upload,
  Palette,
  Eye,
  Download,
  Heart,
  Gift,
  Home,
  Scissors,
} from "lucide-react";

export function Features() {
  return (
    <div className="bg-zinc-50 py-24">
      {/* Social Proof */}
      <section className="max-w-7xl mx-auto px-6 mb-32 text-center">
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          Over 10,000 Pet Lovers Have <br /> Turned Their Pets Into Art
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-medium text-zinc-600">
          <span className="bg-white px-4 py-2 rounded-full shadow-sm">
            🏆 Dog Mom Gift of the Year
          </span>
          <span className="bg-white px-4 py-2 rounded-full shadow-sm">
            🕊️ Best Pet Memorial Portrait
          </span>
          <span className="bg-white px-4 py-2 rounded-full shadow-sm">
            🖼️ Premium Framed Pet Canvas
          </span>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            How PawPrix Works
          </h2>
          <p className="text-zinc-600">
            Four simple steps to your masterpiece.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: Upload,
              title: "1. Upload Photo",
              desc: "Upload a clear photo of your dog, cat, or any pet.",
            },
            {
              icon: Palette,
              title: "2. Choose Style",
              desc: "Select from Renaissance, royal, watercolor, pop art, and more.",
            },
            {
              icon: Eye,
              title: "3. Free Preview",
              desc: "Get watermarked previews instantly before you buy.",
            },
            {
              icon: Download,
              title: "4. Unlock & Print",
              desc: "Download 4K/8K files or order framed canvas prints.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2rem] shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-zinc-900" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-zinc-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Styles Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Explore Our Styles
            </h2>
            <p className="text-zinc-600">
              Find the perfect aesthetic for your furry friend.
            </p>
          </div>
          <button className="hidden md:block font-medium hover:underline">
            View All Styles →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              name: "Renaissance",
              tag: "Best for wall decor",
              img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=500&fit=crop",
            },
            {
              name: "Royal",
              tag: "Popular gift",
              img: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=500&fit=crop",
            },
            {
              name: "Watercolor",
              tag: "Soft & elegant",
              img: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=500&fit=crop",
            },
            {
              name: "Modern Line Art",
              tag: "Minimalist",
              img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=500&fit=crop",
            },
          ].map((style, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative mb-4 bg-zinc-200">
                <Image
                  src={style.img}
                  alt={style.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-bold text-lg">{style.name}</h3>
              <p className="text-sm text-zinc-500">{style.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Split Sections: Memorial & Gifting */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 text-white p-10 md:p-16 rounded-[2rem] relative overflow-hidden">
            <Heart className="w-12 h-12 text-zinc-700 mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Honor Their Memory
            </h2>
            <p className="text-zinc-400 mb-8 max-w-sm">
              Create a beautiful pet memorial portrait. Our Memorial Pack
              includes the portrait, a printable poem card, and optional Rainbow
              Bridge backgrounds.
            </p>
            <button className="bg-white text-zinc-900 px-6 py-3 rounded-full font-medium hover:bg-zinc-100 transition-colors">
              Create Memorial Portrait
            </button>
          </div>
          <div className="bg-orange-100 p-10 md:p-16 rounded-[2rem]">
            <Gift className="w-12 h-12 text-orange-300 mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The Perfect Gift
            </h2>
            <p className="text-zinc-700 mb-8 max-w-sm">
              For dog moms, cat dads, and pet lovers. Perfect for Birthdays,
              Christmas, Mother&apos;s Day, or Gotcha Day.
            </p>
            <button className="bg-zinc-900 text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors">
              Design a Gift
            </button>
          </div>
        </div>
      </section>

      {/* Split Sections: Decor & Craft */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-10 md:p-16 rounded-[2rem]">
            <Home className="w-12 h-12 text-blue-300 mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Home Decor
            </h2>
            <p className="text-zinc-700 mb-8 max-w-sm">
              Museum-quality framed pet portraits and canvas prints. Archival
              inks, multiple sizes, and worldwide shipping.
            </p>
            <button className="bg-zinc-900 text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors">
              Shop Prints
            </button>
          </div>
          <div className="bg-emerald-50 p-10 md:p-16 rounded-[2rem]">
            <Scissors className="w-12 h-12 text-emerald-300 mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Craft Templates
            </h2>
            <p className="text-zinc-700 mb-8 max-w-sm">
              Turn your pet photo into cross-stitch patterns, embroidery files,
              paint-by-numbers kits, or SVG cut files for Cricut.
            </p>
            <button className="bg-zinc-900 text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors">
              Explore Craft Packs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
