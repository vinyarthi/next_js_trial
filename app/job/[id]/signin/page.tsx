// app/job/[id]/signin/page.tsx
"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"

export default function DummySignInPage() {
  const router = useRouter()
  const params = useParams()
  const jobId = params.id as string

  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!userId.trim()) {
      setError("Please enter a user ID.")
      return
    }

    if (!password.trim()) {
      setError("Please enter a password.")
      return
    }

    // Dummy auth: accepts any non-empty password
    router.push(
      `/job/${jobId}?login=true&userId=${encodeURIComponent(userId)}`
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Dummy Sign In</h1>
        <p className="text-sm text-neutral-600 mb-6">
          Prototype mode. Any non-empty password will be accepted.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium mb-1">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user ID"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 text-white py-2 font-medium"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  )
}