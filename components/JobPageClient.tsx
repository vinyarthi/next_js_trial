"use client"

import Link from "next/link"
import { useState } from "react"
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
  const [previews, setPreviews] = useState(job.previews)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)

  async function previewImagesHandler() {
    if (!selectedStyle) {
      alert("Please select a style first.")
      return
    }

    try {
      setStatus("Generating previews...")

      // 1. Read the already-uploaded image from its URL
      const imageResponse = await fetch(job.imageUrl)
      if (!imageResponse.ok) {
        throw new Error("Failed to fetch uploaded image")
      }

      const imageBlob = await imageResponse.blob()

      // 2. Send it to watermark API
      const formData = new FormData()
      formData.append("file", imageBlob, `${job.id}.jpg`)

      const watermarkResponse = await fetch("/api/watermark", {
        method: "POST",
        body: formData,
      })

      if (!watermarkResponse.ok) {
        throw new Error("Failed to create watermarked preview")
      }

      // 3. Convert returned image into a temporary browser URL
      const watermarkedBlob = await watermarkResponse.blob()
      const previewUrl = URL.createObjectURL(watermarkedBlob)

      // 4. Show preview(s)
      setPreviews([
        previewUrl,
        previewUrl,
        previewUrl,
        previewUrl,
      ])

      setStatus("Previews generated!")
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
      <div>Preview results grid</div>

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