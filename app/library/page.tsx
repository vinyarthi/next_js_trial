"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

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
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Library</h1>
        <p className="text-neutral-600">
          Signed in as <span className="font-medium">{userId || "Unknown User"}</span>
        </p>
      </div>

      <div className="text-sm text-neutral-500">
        Total saved items: {allItems.length} | Matching this user: {items.length}
      </div>

      {!userId ? (
        <p>No user ID provided.</p>
      ) : items.length === 0 ? (
        <div className="space-y-2">
          <p>No portraits found for this user.</p>
          <pre className="text-xs bg-neutral-100 p-3 rounded overflow-auto">
            {JSON.stringify(allItems, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="border rounded-xl p-4 space-y-3 bg-white">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={300}
                height={300}
                className="rounded-lg border object-cover"
              />

              <div className="space-y-1">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-neutral-600">Job ID: {item.jobId}</p>
                <p className="text-sm text-neutral-600">Style: {item.style}</p>
                <p className="text-sm text-neutral-600">
                  Status: {item.paid ? "Paid" : "Preview only"}
                </p>
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link
                  href={`/job/${item.jobId}?login=true&userId=${encodeURIComponent(userId)}&paid=${item.paid}`}
                  className="bg-blue-500 text-white px-3 py-2 rounded inline-block"
                >
                  Open Job
                </Link>

                {item.paid && (
                  <a
                    href={item.imageUrl}
                    download
                    className="bg-green-500 text-white px-3 py-2 rounded inline-block"
                  >
                    Download
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}