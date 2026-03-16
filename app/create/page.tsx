"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateArt() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)

  async function handleUpload() {
    if (!file){
       alert("Please select a file")
       return
    }

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/jobs", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    router.push(`/job/${data.jobId}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="m-4 text-2xl font-bold">
        Upload your pet photo
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 rounded mb-4border border-gray-300 p-2 rounded mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Portrait
      </button>
    </div>
  )
}