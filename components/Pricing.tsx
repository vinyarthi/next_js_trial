import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Choose Your Package
          </h2>
          <p className="text-zinc-600">
            Simple, transparent pricing for every need.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              name: "Digital Mini",
              price: "$19",
              desc: "Perfect for social media and phones.",
              features: [
                "1 Style",
                "4K Download",
                "Wallpaper Version",
                "Free Previews",
              ],
            },
            {
              name: "Home Decor",
              price: "$59",
              desc: "Ready to hang on your wall.",
              features: [
                "3 Styles",
                "8K Resolution",
                "Print Ratios",
                "Room Mockups",
              ],
              highlight: true,
            },
            {
              name: "Memorial Pack",
              price: "$39",
              desc: "A beautiful tribute to your pet.",
              features: [
                "Portrait",
                "Quote Card",
                "Frame-ready",
                "Rainbow Bridge BG",
              ],
            },
            {
              name: "Creator Pack",
              price: "$15",
              desc: "For the DIY crafters.",
              features: [
                "SVG Files",
                "Coloring Pages",
                "Paint-by-numbers",
                "Cross-stitch",
              ],
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`p-8 rounded-[2rem] ${plan.highlight ? "bg-zinc-900 text-white shadow-xl md:scale-105 z-10" : "bg-zinc-50 text-zinc-900 border border-zinc-100"}`}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p
                className={`text-sm mb-6 ${plan.highlight ? "text-zinc-400" : "text-zinc-500"}`}
              >
                {plan.desc}
              </p>
              <div className="text-4xl font-bold tracking-tight mb-8">
                {plan.price}{" "}
                <span
                  className={`text-lg font-normal ${plan.highlight ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  /start
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <Check
                      className={`w-4 h-4 ${plan.highlight ? "text-emerald-400" : "text-zinc-900"}`}
                    />
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-full font-medium transition-colors ${plan.highlight ? "bg-white text-zinc-900 hover:bg-zinc-100" : "bg-zinc-900 text-white hover:bg-zinc-800"}`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
