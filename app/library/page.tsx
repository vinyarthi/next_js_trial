"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  ArrowRight,
  Download,
  ImageIcon,
  Lock,
  Sparkles,
  User,
} from "lucide-react"

type LibraryItem = {
  id: string
  userId: string
  jobId: string
  title: string
  style: string
  imageUrl: string
  paid: boolean
  createdAt: string
}

export default function LibraryPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId") ?? ""

  const [items, setItems] = useState<LibraryItem[]>([])
  const [allItems, setAllItems] = useState<LibraryItem[]>([])

  useEffect(() => {
    const raw = localStorage.getItem("petart-library")

    if (!raw) {
      setAllItems([])
      setItems([])
      return
    }

    try {
      const parsed: LibraryItem[] = JSON.parse(raw)
      setAllItems(parsed)
      setItems(parsed.filter((item) => item.userId === userId))
    } catch (error) {
      console.error("Failed to read library:", error)
      setAllItems([])
      setItems([])
    }
  }, [userId])

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-200 mb-5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Your saved portraits
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-3">
              My Library
            </h1>

            <p className="text-lg text-zinc-600 max-w-2xl">
              Revisit your portraits, unlock premium downloads, and continue your art journey.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-full bg-white px-4 py-2 border border-zinc-200 shadow-sm text-sm text-zinc-700 inline-flex items-center gap-2">
              <User className="w-4 h-4 text-zinc-500" />
              <span className="font-medium">{userId || "Unknown User"}</span>
            </div>

            <div className="rounded-full bg-white px-4 py-2 border border-zinc-200 shadow-sm text-sm text-zinc-700">
              Total saved: <span className="font-semibold">{allItems.length}</span>
            </div>

            <div className="rounded-full bg-white px-4 py-2 border border-zinc-200 shadow-sm text-sm text-zinc-700">
              For this user: <span className="font-semibold">{items.length}</span>
            </div>
          </div>
        </div>

        {!userId ? (
          <div className="rounded-[2rem] bg-white/90 backdrop-blur p-10 border border-zinc-100 shadow-xl text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-zinc-900 text-white flex items-center justify-center mb-5">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">
              No user ID provided
            </h2>
            <p className="text-zinc-600 max-w-lg mx-auto">
              Please sign in first so we can load the correct portrait library for your account.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-[2rem] bg-white/90 backdrop-blur p-10 border border-zinc-100 shadow-xl text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">
              No portraits found yet
            </h2>
            <p className="text-zinc-600 max-w-lg mx-auto mb-6">
              You haven’t saved any portraits for this account yet. Create a portrait and unlock it to see it here.
            </p>

            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3.5 rounded-full font-medium hover:bg-zinc-800 transition-colors shadow-lg"
            >
              Create My Portrait
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="mt-8 text-left">
              <details className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-4">
                <summary className="cursor-pointer font-medium text-zinc-800">
                  Debug saved items
                </summary>
                <pre className="mt-4 text-xs bg-white p-3 rounded-xl overflow-auto border border-zinc-200">
                  {JSON.stringify(allItems, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item, index) => {
              const accentClasses = [
                "from-amber-50 to-orange-100 border-amber-200",
                "from-pink-50 to-rose-100 border-rose-200",
                "from-blue-50 to-cyan-100 border-cyan-200",
                "from-emerald-50 to-green-100 border-emerald-200",
              ]

              const accent = accentClasses[index % accentClasses.length]

              return (
                <div
                  key={item.id}
                  className="rounded-[2rem] bg-white/90 backdrop-blur border border-zinc-100 shadow-xl overflow-hidden"
                >
                  <div className={`p-4 bg-gradient-to-br ${accent} border-b`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white/60">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />

                      <div className="absolute top-4 left-4 rounded-full bg-black/75 text-white px-3 py-1 text-xs font-medium backdrop-blur">
                        {item.style}
                      </div>

                      <div
                        className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium backdrop-blur inline-flex items-center gap-1 ${
                          item.paid
                            ? "bg-emerald-100/90 text-emerald-800"
                            : "bg-white/90 text-zinc-900"
                        }`}
                      >
                        {item.paid ? (
                          <>Unlocked</>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            Preview only
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900">
                        {item.title}
                      </h2>
                      <p className="text-sm text-zinc-600 mt-1">
                        Job ID: {item.jobId}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-3">
                        <p className="text-zinc-500 mb-1">Style</p>
                        <p className="font-medium text-zinc-900">{item.style}</p>
                      </div>

                      <div className="rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-3">
                        <p className="text-zinc-500 mb-1">Access</p>
                        <p className="font-medium text-zinc-900">
                          {item.paid ? "Paid" : "Preview"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link
                        href={`/job/${item.jobId}?login=true&userId=${encodeURIComponent(
                          userId
                        )}&paid=${item.paid}&imageUrl=${encodeURIComponent(item.imageUrl)}`}
                        className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors shadow-lg"
                      >
                        Open Job
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      {item.paid ? (
                        <a
                          href={item.imageUrl}
                          download
                          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors shadow-lg"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      ) : (
                        <Link
                          href={`/job/${item.jobId}?login=true&userId=${encodeURIComponent(
                            userId
                          )}&paid=false&imageUrl=${encodeURIComponent(item.imageUrl)}`}
                          className="inline-flex items-center gap-2 bg-white text-zinc-900 px-4 py-3 rounded-full font-medium border border-zinc-200 hover:border-zinc-400 transition-colors"
                        >
                          Unlock HD
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}