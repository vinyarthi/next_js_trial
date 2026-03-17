"use client"

import Link from "next/link"
import { use } from "react"
import { ArrowRight, CreditCard, Sparkles, ShieldCheck } from "lucide-react"

export default function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* LEFT SIDE */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-200 mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Almost there
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-zinc-900 mb-5">
              Unlock your pet’s masterpiece
            </h1>

            <p className="text-lg text-zinc-600 max-w-xl mb-8">
              Your preview is ready. Complete payment to download your
              high-resolution portrait and keep it forever.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm border border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">
                  One-time payment
                </h3>
                <p className="text-sm text-zinc-600">
                  Pay once and download your portrait instantly.
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm border border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">
                  Secure checkout
                </h3>
                <p className="text-sm text-zinc-600">
                  Your payment is safe and protected.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (CARD) */}
          <div className="relative">
            {/* glow effects */}
            <div className="absolute -top-8 -left-6 w-28 h-28 bg-pink-200 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-8 -right-6 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-60" />

            <div className="relative rounded-[2rem] bg-white/90 backdrop-blur p-8 md:p-10 shadow-xl border border-zinc-100 text-center">
              
              <h2 className="text-3xl font-bold text-zinc-900 mb-3">
                Unlock HD Download
              </h2>

              <p className="text-zinc-600 mb-8">
                Get your final high-resolution artwork without watermark.
              </p>

              {/* PRICE */}
              <div className="mb-8">
                <p className="text-sm text-zinc-500 mb-1">Total</p>
                <p className="text-5xl font-bold text-zinc-900">$5</p>
              </div>

              {/* CTA BUTTON */}
              <Link
                href={`/job/${id}?login=true&paid=true`}
                className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-4 rounded-full font-medium hover:bg-zinc-800 transition-colors shadow-lg"
              >
                Pay & Download
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="mt-5 text-xs text-zinc-500">
                Prototype payment flow. No real transaction is processed.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}