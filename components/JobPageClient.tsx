"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

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
  userId: string
}

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
  userId,
}: JobPageClientProps) {
  const [status, setStatus] = useState(job.status)
  const [previews, setPreviews] = useState<string[]>(job.previews)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)

  useEffect(() => {
    const savedPreviews = localStorage.getItem(`job-previews-${job.id}`)
    const savedStatus = localStorage.getItem(`job-status-${job.id}`)
    const savedStyle = localStorage.getItem(`job-selected-style-${job.id}`)

    if (savedPreviews) {
      setPreviews(JSON.parse(savedPreviews))
    }

    if (savedStatus) {
      setStatus(savedStatus)
    }

    if (savedStyle) {
      setSelectedStyle(savedStyle)
    }
  }, [job.id])

  useEffect(() => {
    if (!isLoggedIn || !userId.trim() || previews.length === 0 || !selectedStyle) {
      return
    }

    const libraryItem: LibraryItem = {
      id: `${job.id}-${selectedStyle}`,
      userId: userId.trim(),
      jobId: job.id,
      title: `${selectedStyle} Portrait`,
      style: selectedStyle,
      imageUrl: previews[0],
      paid: isPaid,
      createdAt: new Date().toISOString(),
    }

    const existingLibraryRaw = localStorage.getItem("petart-library")
    const existingLibrary: LibraryItem[] = existingLibraryRaw
      ? JSON.parse(existingLibraryRaw)
      : []

    const withoutCurrentItem = existingLibrary.filter(
      (item) => item.id !== libraryItem.id
    )

    const updatedLibrary = [libraryItem, ...withoutCurrentItem]

    localStorage.setItem("petart-library", JSON.stringify(updatedLibrary))
  }, [isLoggedIn, userId, previews, selectedStyle, job.id, isPaid])

  async function previewImagesHandler() {
    if (!selectedStyle) {
      alert("Please select a style first.")
      return
    }

    try {
      setStatus("Generating previews...")

      const imageResponse = await fetch(job.imageUrl)
      if (!imageResponse.ok) {
        throw new Error("Failed to fetch uploaded image")
      }

      const imageBlob = await imageResponse.blob()

      const formData = new FormData()
      formData.append("file", imageBlob, `${job.id}.jpg`)
      formData.append("jobId", job.id)

      const watermarkResponse = await fetch("/api/watermark", {
        method: "POST",
        body: formData,
      })

      if (!watermarkResponse.ok) {
        throw new Error("Failed to create preview")
      }

      const data = await watermarkResponse.json()
      const previewUrl = data.previewUrl as string

      const newPreviews = [previewUrl, previewUrl, previewUrl, previewUrl]

      setPreviews(newPreviews)
      setStatus("Previews generated!")

      localStorage.setItem(`job-previews-${job.id}`, JSON.stringify(newPreviews))
      localStorage.setItem(`job-status-${job.id}`, "Previews generated!")
      localStorage.setItem(`job-selected-style-${job.id}`, selectedStyle)
    } catch (error) {
      console.error(error)
      setStatus("Failed to generate previews.")
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job {job.id}</h1>
        {isLoggedIn && (
          <div className="text-sm text-neutral-600">
            Signed in as <span className="font-medium">{userId || "No user id"}</span>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-semibold">Uploaded image</h2>
        <Image
          src={job.imageUrl}
          alt="Uploaded pet"
          width={256}
          height={256}
          className="rounded border"
        />
      </div>

      <div>
        <h2 className="font-semibold">Select styles</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`border rounded-xl p-4 text-left transition ${
                selectedStyle === style
                  ? "border-black bg-neutral-100"
                  : "border-neutral-300 hover:bg-neutral-100"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={previewImagesHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
        >
          Generate Previews
        </button>
      </div>

      <div>Status: {status}</div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {previews.map((preview, index) => (
          <Image
            key={`preview_${index}`}
            src={preview}
            alt={`preview image ${index + 1}`}
            width={256}
            height={256}
            className="rounded border"
            unoptimized
          />
        ))}
      </div>

      <div className="flex gap-4 flex-wrap">
        {!isLoggedIn ? (
          <Link
            href={`/job/${job.id}/signin`}
            className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
          >
            Sign In to Unlock HD
          </Link>
        ) : isPaid ? (
          <>
            <a
              href="/downloaded_dog_image.jpg"
              download="pet-portrait-hd.jpg"
              className="bg-green-500 text-white px-4 py-2 rounded inline-block"
            >
              Download images
            </a>

            <Link
              href={`/library?userId=${encodeURIComponent(userId)}`}
              className="bg-neutral-800 text-white px-4 py-2 rounded inline-block"
            >
              My Library
            </Link>

            <Link
              href={`/job/${job.id}`}
              className="bg-red-500 text-white px-4 py-2 rounded inline-block"
            >
              Dummy Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link
              href={`/job/${job.id}/payment?login=true&userId=${encodeURIComponent(userId)}`}
              className="bg-green-500 text-white px-4 py-2 rounded inline-block"
            >
              Unlock HD for $5
            </Link>

            <Link
              href={`/library?userId=${encodeURIComponent(userId)}`}
              className="bg-neutral-800 text-white px-4 py-2 rounded inline-block"
            >
              My Library
            </Link>

            <Link
              href={`/job/${job.id}`}
              className="bg-red-500 text-white px-4 py-2 rounded inline-block"
            >
              Dummy Sign Out
            </Link>
          </>
        )}
      </div>
    </div>
  )
}