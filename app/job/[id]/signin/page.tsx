"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowRight, Lock, Sparkles, User } from "lucide-react"

export default function DummySignInPage() {
  const router = useRouter()
  const params = useParams()
  const jobId = params.id as string

  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    if (!userId.trim()) {
      setError("Please enter a user ID.")
      return
    }

    if (!password.trim()) {
      setError("Please enter a password.")
      return
    }

    router.push(`/job/${jobId}?login=true&userId=${encodeURIComponent(userId)}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-200 mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Unlock your portrait
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-zinc-900 mb-5">
              Sign in to save and unlock HD artwork
            </h1>

            <p className="text-lg text-zinc-600 max-w-xl mb-8">
              Your previews are ready. Sign in to continue to your library,
              unlock high-resolution downloads, and manage your portrait order.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm border border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">Unlock HD</h3>
                <p className="text-sm text-zinc-600">
                  Access premium downloads after sign-in and payment.
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm border border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mb-3">
                  <User className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">Save to Library</h3>
                <p className="text-sm text-zinc-600">
                  Keep your selected portraits tied to your account.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-6 w-28 h-28 bg-pink-200 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-8 -right-6 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-60" />

            <div className="relative rounded-[2rem] bg-white/90 backdrop-blur p-8 md:p-10 shadow-xl border border-zinc-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
                  Prototype Sign In
                </h2>
                <p className="text-zinc-600">
                  Prototype mode. Any non-empty password will be accepted.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="userId"
                    className="block text-sm font-medium text-zinc-800 mb-2"
                  >
                    User ID
                  </label>
                  <div className="rounded-[1.25rem] border border-zinc-200 bg-zinc-50 px-4 py-3 focus-within:border-zinc-400 transition-colors">
                    <input
                      id="userId"
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400"
                      placeholder="Enter user ID"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-800 mb-2"
                  >
                    Password
                  </label>
                  <div className="rounded-[1.25rem] border border-zinc-200 bg-zinc-50 px-4 py-3 focus-within:border-zinc-400 transition-colors">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400"
                      placeholder="Enter password"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-zinc-900 text-white px-6 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                >
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-zinc-500">
                This is a prototype authentication screen for the current job flow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}