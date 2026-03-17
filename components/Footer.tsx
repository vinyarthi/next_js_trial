import Link from "next/link";

export function Footer() {
  return (
    <>
      {/* FAQ */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "What is a custom pet portrait?",
                a: "It's a digital or physical artwork created from a photo of your pet, styled in various artistic themes like Renaissance, Watercolor, or Modern.",
              },
              {
                q: "How do I turn my pet photo into a painting?",
                a: "Simply upload your photo, choose a style, and our AI-powered platform will generate a high-quality portrait for you to preview instantly.",
              },
              {
                q: "What size framed pet portraits do you offer?",
                a: "We offer multiple sizes ranging from 8x10 to 24x36 inches, with various frame colors to match your decor.",
              },
              {
                q: "Do you ship internationally?",
                a: "Yes, we offer worldwide shipping for all our framed prints and canvas products.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-zinc-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-zinc-900 text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Your Pet Deserves <br /> More Than a Photo.
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Turn them into timeless art.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-zinc-900 px-8 py-4 rounded-full font-bold hover:bg-zinc-100 transition-colors">
              Create My Portrait
            </button>
            <button className="bg-zinc-800 text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-700 transition-colors">
              Browse Styles
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold tracking-tighter">🐾 PawPrix</div>
          <div className="flex gap-6 text-sm font-medium text-zinc-500">
            <Link href="/styles" className="hover:text-zinc-900">
              Styles
            </Link>
            <Link href="/store" className="hover:text-zinc-900">
              Store
            </Link>
            <Link href="/blog" className="hover:text-zinc-900">
              Blog
            </Link>
            <Link href="/signin" className="hover:text-zinc-900">
              Sign In
            </Link>
          </div>
          <div className="text-sm text-zinc-400">
            © 2026 PawPrix. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
