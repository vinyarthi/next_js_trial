"use client"

import Link from "next/link"
import { useState } from "react"

type Job = {
  id: string
  imageUrl: string
  status: string
  previews: string[]
}

type JobPageClientProps = {
  job: Job
  isLoggedIn: boolean
  isPaid: boolean
}

const styles = [
  "Renaissance",
  "Modern Pop Art",
  "Watercolor",
  "Royal Portrait",
]

export default function JobPageClient({
  job,
  isLoggedIn,
  isPaid,
}: JobPageClientProps) {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])


  function toggleStyle(style: string) {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    )
  }

  const canGenerate = selectedStyles.length > 0


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Job {job.id}</h1>

      <div>Uploaded image</div>
      <div>Select styles</div>
      <div>Generate previews button</div>
      <div>Status: {job.status}</div>
      <div>Preview results grid</div>

      {isLoggedIn ? (
        isPaid ? (
          <a
            href="/downloaded_dog_image.jpg"
            download="pet-portrait-hd.jpg"
            className="bg-green-500 text-white px-4 py-2 rounded inline-block"
          >
            Download images
          </a>
        ) : (
          <Link
            href={`/job/${job.id}/payment?login=true`}
            className="bg-green-500 text-white px-4 py-2 rounded inline-block"
          >
            Unlock HD for $5
          </Link>
        )
      ) : (
        <Link
          href={`/job/${job.id}?login=true`}
          className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
        >
          Dummy Sign In
        </Link>
      )}
    </div>
  )
}