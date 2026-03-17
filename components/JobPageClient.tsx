"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ImagePlus,
  Loader2,
  Lock,
  LogOut,
  Palette,
  Sparkles,
  User,
} from "lucide-react"

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
  const [isGenerating, setIsGenerating] = useState(false)

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
      setIsGenerating(true)
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
    } finally {
      setIsGenerating(false)
    }
  }

  const isError = status.toLowerCase().includes("failed")
  const isSuccess = status.toLowerCase().includes("generated")
  const isIdle = status === "Not generated yet"

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-200 mb-5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Portrait Studio
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-3">
              Your pet portrait job
            </h1>

            <p className="text-lg text-zinc-600 max-w-2xl">
              Choose a style, generate preview art, and unlock your favorite version in HD.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-full bg-white px-4 py-2 border border-zinc-200 shadow-sm text-sm text-zinc-700">
              Job ID: <span className="font-semibold">{job.id}</span>
            </div>

            {isLoggedIn && (
              <div className="rounded-full bg-white px-4 py-2 border border-zinc-200 shadow-sm text-sm text-zinc-700 inline-flex items-center gap-2">
                <User className="w-4 h-4 text-zinc-500" />
                <span className="font-medium">{userId || "No user id"}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-8">
            <div className="rounded-[2rem] bg-white/90 backdrop-blur p-6 md:p-8 border border-zinc-100 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                    Uploaded image
                  </h2>
                  <p className="text-zinc-600 text-sm mt-1">
                    This is the source photo for your generated artwork.
                  </p>
                </div>
                <div className="hidden md:inline-flex rounded-full bg-amber-100 text-amber-800 px-4 py-2 text-sm font-medium">
                  Original photo
                </div>
              </div>

              <div className="relative w-full h-[350px] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-amber-100 via-orange-50 to-pink-100">
                <Image
                  src={job.imageUrl}
                  alt="Uploaded pet"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/90 backdrop-blur p-6 md:p-8 border border-zinc-100 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                    Choose your style
                  </h2>
                  <p className="text-zinc-600 text-sm">
                    Pick the artistic direction for this portrait.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {styles.map((style, index) => {
                  const colorClasses = [
                    "from-amber-50 to-orange-100 border-amber-200",
                    "from-pink-50 to-rose-100 border-rose-200",
                    "from-blue-50 to-cyan-100 border-cyan-200",
                    "from-emerald-50 to-green-100 border-emerald-200",
                  ]

                  const activeClasses = [
                    "ring-2 ring-amber-400 border-amber-300",
                    "ring-2 ring-rose-400 border-rose-300",
                    "ring-2 ring-cyan-400 border-cyan-300",
                    "ring-2 ring-emerald-400 border-emerald-300",
                  ]

                  const isActive = selectedStyle === style

                  return (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`rounded-[1.5rem] p-5 text-left border bg-gradient-to-br transition-all hover:scale-[1.01] ${
                        isActive
                          ? activeClasses[index]
                          : colorClasses[index]
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-lg font-bold text-zinc-900">
                            {style}
                          </div>
                          <div className="text-sm text-zinc-600 mt-1">
                            {style === "Renaissance" &&
                              "Gallery-like, timeless, regal composition."}
                            {style === "Modern Pop Art" &&
                              "Bold color, modern energy, playful impact."}
                            {style === "Watercolor" &&
                              "Soft, elegant, painterly charm."}
                            {style === "Royal Portrait" &&
                              "Luxe, dramatic, aristocratic styling."}
                          </div>
                        </div>

                        {isActive && (
                          <CheckCircle2 className="w-5 h-5 text-zinc-900 shrink-0" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              <button
                onClick={previewImagesHandler}
                disabled={isGenerating}
                className="mt-8 w-full bg-zinc-900 text-white px-6 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating previews...
                  </>
                ) : (
                  <>
                    Generate Previews
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] bg-white/90 backdrop-blur p-6 md:p-8 border border-zinc-100 shadow-xl">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-5">
                Generation status
              </h2>

              <div
                className={`rounded-[1.5rem] p-5 border ${
                  isError
                    ? "bg-red-50 border-red-200"
                    : isSuccess
                    ? "bg-emerald-50 border-emerald-200"
                    : isGenerating
                    ? "bg-amber-50 border-amber-200"
                    : "bg-zinc-50 border-zinc-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isError ? (
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 text-lg font-bold">!</span>
                    </div>
                  ) : isSuccess ? (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                  ) : isGenerating ? (
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center">
                      <ImagePlus className="w-5 h-5 text-zinc-600" />
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-zinc-900">{status}</p>
                    <p className="text-sm text-zinc-600 mt-1">
                      {isIdle && "Select a style and generate previews to continue."}
                      {isGenerating && "We are preparing watermarked preview variants for you."}
                      {isSuccess && "Your previews are ready. Choose how you want to unlock them."}
                      {isError && "Something went wrong. Try generating again."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/90 backdrop-blur p-6 md:p-8 border border-zinc-100 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                    Preview gallery
                  </h2>
                  <p className="text-zinc-600 text-sm mt-1">
                    Watermarked previews appear here after generation.
                  </p>
                </div>
                {selectedStyle && (
                  <div className="rounded-full bg-zinc-900 text-white px-4 py-2 text-sm font-medium">
                    {selectedStyle}
                  </div>
                )}
              </div>

              {previews.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-zinc-300 bg-gradient-to-br from-zinc-50 to-amber-50 p-10 text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center mb-4">
                    <ImagePlus className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">
                    No previews yet
                  </h3>
                  <p className="text-zinc-600 max-w-md mx-auto">
                    Pick a style and click generate. Your preview portraits will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {previews.map((preview, index) => (
                    <div
                      key={`preview_${index}`}
                      className="group rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-50 border border-zinc-200 shadow-sm"
                    >
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={preview}
                          alt={`preview image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform"
                          unoptimized
                        />
                        <div className="absolute top-4 left-4 rounded-full bg-black/70 text-white px-3 py-1 text-xs font-medium backdrop-blur">
                          Preview {index + 1}
                        </div>
                        {!isPaid && (
                          <div className="absolute top-4 right-4 rounded-full bg-white/90 text-zinc-900 px-3 py-1 text-xs font-medium inline-flex items-center gap-1 backdrop-blur">
                            <Lock className="w-3 h-3" />
                            Locked HD
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[2rem] bg-white/90 backdrop-blur p-6 md:p-8 border border-zinc-100 shadow-xl">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-3">
                Next step
              </h2>
              <p className="text-zinc-600 mb-6">
                {previews.length === 0
                  ? "Generate your previews first."
                  : !isLoggedIn
                  ? "Sign in to unlock HD downloads and save your portrait."
                  : isPaid
                  ? "Your portrait is unlocked. Download it or visit your library."
                  : "Unlock your HD portrait and save it to your library."}
              </p>

              <div className="flex flex-wrap gap-4">
                {!isLoggedIn ? (
                  <Link
                    href={`/job/${job.id}/signin`}
                    className="bg-zinc-900 text-white px-6 py-3.5 rounded-full font-medium inline-flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                  >
                    Sign In to Unlock HD
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : isPaid ? (
                  <>
                    <a
                      href="/downloaded_dog_image.jpg"
                      download="pet-portrait-hd.jpg"
                      className="bg-emerald-600 text-white px-6 py-3.5 rounded-full font-medium inline-flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      Download Images
                    </a>

                    <Link
                      href={`/library?userId=${encodeURIComponent(userId)}`}
                      className="bg-zinc-900 text-white px-6 py-3.5 rounded-full font-medium inline-flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                    >
                      My Library
                    </Link>

                    <Link
                      href={`/job/${job.id}`}
                      className="bg-white text-zinc-900 px-6 py-3.5 rounded-full font-medium inline-flex items-center gap-2 border border-zinc-200 hover:border-zinc-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Dummy Sign Out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/job/${job.id}/payment?login=true&userId=${encodeURIComponent(userId)}`}
                      className="bg-zinc-900 text-white px-6 py-3.5 rounded-full font-medium inline-flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                    >
                      Unlock HD for $5
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href={`/library?userId=${encodeURIComponent(userId)}`}
                      className="bg-white text-zinc-900 px-6 py-3.5 rounded-full font-medium inline-flex items-center gap-2 border border-zinc-200 hover:border-zinc-400 transition-colors"
                    >
                      My Library
                    </Link>

                    <Link
                      href={`/job/${job.id}`}
                      className="bg-white text-zinc-900 px-6 py-3.5 rounded-full font-medium inline-flex items-center gap-2 border border-zinc-200 hover:border-zinc-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Dummy Sign Out
                    </Link>
                  </>
                )}
              </div>

              {previews.length > 0 && !isPaid && (
                <div className="mt-6 rounded-[1.5rem] bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 border border-amber-200 p-5">
                  <h3 className="font-bold text-zinc-900 mb-2">
                    What happens after payment?
                  </h3>
                  <p className="text-sm text-zinc-700 leading-6">
                    You unlock HD downloads, save the portrait in your library,
                    and continue to your premium art experience.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}