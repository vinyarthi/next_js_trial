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
  const [status, setStatus] = useState(job.status)
  const [previews, setPreviews] = useState<string[]>(job.previews)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)

  useEffect(() => {
    const savedPreviews = localStorage.getItem(`job-previews-${job.id}`)
    const savedStatus = localStorage.getItem(`job-status-${job.id}`)

    if (savedPreviews) {
      setPreviews(JSON.parse(savedPreviews))
    }

    if (savedStatus) {
      setStatus(savedStatus)
    }
  }, [job.id])

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

      const watermarkResponse = await fetch("/api/watermark", {
        method: "POST",
        body: formData,
      })

      if (!watermarkResponse.ok) {
        throw new Error("Failed to create preview")
      }

      const watermarkedBlob = await watermarkResponse.blob()
      const previewUrl = URL.createObjectURL(watermarkedBlob)

      const newPreviews = [previewUrl, previewUrl, previewUrl, previewUrl]

      setPreviews(newPreviews)
      setStatus("Previews generated!")

      localStorage.setItem(`job-previews-${job.id}`, JSON.stringify(newPreviews))
      localStorage.setItem(`job-status-${job.id}`, "Previews generated!")
    } catch (error) {
      console.error(error)
      setStatus("Failed to generate previews.")
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Job {job.id}</h1>

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
        Select styles
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

{isLoggedIn ? (
  <div className="flex gap-4">
    {isPaid ? (
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
    )}

    <Link
      href={`/job/${job.id}`}
      className="bg-red-500 text-white px-4 py-2 rounded inline-block"
    >
      Dummy Sign Out
    </Link>
  </div>
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