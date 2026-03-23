"use client"

import Image from "next/image"
import { useState } from "react"

type StudioJob = {
  id: string
  imageUrl: string
  status: string
  previews: string[]
}

const styles = [
  "Renaissance",
  "Modern Pop Art",
  "Watercolor",
  "Royal Portrait",
]

export default function CreateArt() {
  const [file, setFile] = useState<File | null>(null)
  const [job, setJob] = useState<StudioJob | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [status, setStatus] = useState("Upload an image to begin.")
  const [previews, setPreviews] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleUpload() {
    if (!file) {
      alert("Please select a file")
      return
    }

    try {
      setIsUploading(true)
      setStatus("Uploading image...")

      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/jobs", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Failed to create job")
      }

      const data = await res.json()

      const createdJob: StudioJob = {
        id: data.jobId,
        imageUrl: data.imageUrl ?? `/uploads/${data.jobId}.jpg`,
        status: "Image uploaded. Select a style.",
        previews: [],
      }

      setJob(createdJob)
      setPreviews([])
      setStatus("Image uploaded. Select a style.")
    } catch (error) {
      console.error(error)
      setStatus("Upload failed.")
    } finally {
      setIsUploading(false)
    }
  }

  async function handleGeneratePreview() {
    if (!job) {
      alert("Please upload an image first.")
      return
    }

    if (!selectedStyle) {
      alert("Please select a style first.")
      return
    }

    try {
      setIsGenerating(true)
      setStatus(`Generating ${selectedStyle} preview...`)

      const imageResponse = await fetch(job.imageUrl)
      if (!imageResponse.ok) {
        throw new Error("Failed to fetch uploaded image")
      }

      const imageBlob = await imageResponse.blob()

      const formData = new FormData()
      formData.append("file", imageBlob, `${job.id}.jpg`)
      formData.append("jobId", job.id)
      formData.append("style", selectedStyle)

      const res = await fetch("/api/watermark", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Failed to generate previews")
      }

      const data = await res.json()
      const previewUrl = data.previewUrl as string

      const newPreviews = [previewUrl, previewUrl, previewUrl, previewUrl]

      setPreviews(newPreviews)
      setStatus(`${selectedStyle} previews generated.`)
      setJob((prev) =>
        prev
          ? {
              ...prev,
              status: `${selectedStyle} previews generated.`,
              previews: newPreviews,
            }
          : prev
      )
    } catch (error) {
      console.error(error)
      setStatus("Preview generation failed.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create Your Pet Portrait</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Upload your pet photo, choose a style, and generate a preview.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left panel */}
          <section className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="mb-4 text-lg font-semibold">Your Pet Photo</h2>

            {!job ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-white p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="mb-4 block w-full max-w-sm rounded-lg border border-neutral-300 p-3"
                />

                <button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Upload Photo"}
                </button>

                <p className="mt-4 text-sm text-neutral-500">{status}</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="overflow-hidden rounded-2xl border bg-white">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={job.imageUrl}
                      alt="Uploaded pet"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <label className="cursor-pointer rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Replace Uploaded Photo
                  </button>
                </div>

                <div>
                  <p className="text-sm text-neutral-600">Status</p>
                  <p className="font-medium">{status}</p>
                </div>

                {previews.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Generated Previews</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {previews.map((preview, index) => (
                        <div
                          key={`preview-${index}`}
                          className="overflow-hidden rounded-2xl border bg-white"
                        >
                          <div className="relative aspect-square w-full">
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Right panel */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6">
            <h2 className="mb-2 text-lg font-semibold">Choose a Style</h2>
            <p className="mb-6 text-sm text-neutral-600">
              Pick a style for your portrait. Then generate your preview.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selectedStyle === style
                      ? "border-zinc-900 bg-zinc-100"
                      : "border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <div className="text-base font-semibold">{style}</div>
                  <div className="mt-1 text-sm text-neutral-600">
                    Preview your pet in the {style} look.
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-neutral-50 p-5">
              <h3 className="text-base font-semibold">
                {selectedStyle ?? "No style selected"}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                {selectedStyle
                  ? `You selected ${selectedStyle}. Generate a preview to see how your pet looks in this style.`
                  : "Select a style to see more details here."}
              </p>

              <button
                onClick={handleGeneratePreview}
                disabled={!job || !selectedStyle || isGenerating}
                className="mt-5 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isGenerating ? "Generating..." : "Generate Preview"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}