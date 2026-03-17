"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { ArrowRight, ImagePlus, Sparkles, UploadCloud } from "lucide-react"

export default function CreateArt() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const previewUrl = useMemo(() => {
    if (!file) return null
    return URL.createObjectURL(file)
  }, [file])

  async function handleUpload() {
    if (!file) {
      alert("Please select a file")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/jobs", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      const data = await res.json()
      router.push(`/job/${data.jobId}`)
    } catch (error) {
      console.error(error)
      alert("Upload failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-200 mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Museum Luxe Creator
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-zinc-900 mb-5">
              Turn your pet photo into a colorful masterpiece
            </h1>

            <p className="text-lg text-zinc-600 max-w-xl mb-8">
              Upload one clear image, choose a style, and generate premium pet
              portrait previews inspired by gallery art, modern color, and gift-ready design.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm border border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                  <UploadCloud className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">Upload</h3>
                <p className="text-sm text-zinc-600">
                  Add your pet’s photo in seconds.
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm border border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">Stylize</h3>
                <p className="text-sm text-zinc-600">
                  Generate elegant artistic previews.
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm border border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                  <ImagePlus className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">Collect</h3>
                <p className="text-sm text-zinc-600">
                  Unlock beautiful HD portraits later.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="rounded-full bg-amber-100 text-amber-800 px-4 py-2 text-sm font-medium">
                Renaissance
              </div>
              <div className="rounded-full bg-pink-100 text-pink-800 px-4 py-2 text-sm font-medium">
                Watercolor
              </div>
              <div className="rounded-full bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium">
                Royal Portrait
              </div>
              <div className="rounded-full bg-emerald-100 text-emerald-800 px-4 py-2 text-sm font-medium">
                Modern Pop Art
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-6 w-28 h-28 bg-pink-200 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-8 -right-6 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-60" />

            <div className="relative rounded-[2rem] bg-white/90 backdrop-blur p-6 md:p-8 shadow-xl border border-zinc-100">
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="relative h-28 rounded-[1.25rem] overflow-hidden bg-orange-100">
                  <Image
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop"
                    alt="Dog inspiration"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="relative h-28 rounded-[1.25rem] overflow-hidden bg-rose-100">
                  <Image
                    src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400&h=400&fit=crop"
                    alt="Cat inspiration"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="relative h-28 rounded-[1.25rem] overflow-hidden bg-amber-100">
                  <Image
                    src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop"
                    alt="Pet inspiration"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              <label className="block">
                <div className="rounded-[1.75rem] border-2 border-dashed border-zinc-300 bg-gradient-to-br from-zinc-50 to-amber-50 p-8 text-center hover:border-zinc-400 transition cursor-pointer">
                  {previewUrl ? (
                    <div className="space-y-4">
                      <div className="relative mx-auto w-full max-w-sm h-64 rounded-[1.5rem] overflow-hidden shadow-md">
                        <Image
                          src={previewUrl}
                          alt="Selected pet preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <p className="text-sm text-zinc-600">
                        Selected: <span className="font-semibold">{file?.name}</span>
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto w-16 h-16 rounded-full bg-zinc-900 text-white flex items-center justify-center mb-4 shadow-lg">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">
                        Upload your pet photo
                      </h2>
                      <p className="text-zinc-600 mb-3">
                        Drag and drop or click to browse
                      </p>
                      <p className="text-sm text-zinc-500">
                        PNG, JPG, WEBP • best with a clear face and good lighting
                      </p>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>
              </label>

              <button
                onClick={handleUpload}
                disabled={loading}
                className="mt-6 w-full bg-zinc-900 text-white px-6 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading..." : "Create My Portrait"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="mt-4 text-center text-sm text-zinc-500">
                Free previews first. Unlock HD only when you love the result.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}