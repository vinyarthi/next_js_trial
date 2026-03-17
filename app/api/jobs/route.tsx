import { NextResponse } from "next/server"
import { mkdir, writeFile } from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

function getExtension(mimeType: string) {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg"
    case "image/png":
      return "png"
    case "image/webp":
      return "webp"
    default:
      return "jpg"
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const file = data.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, and WEBP images are allowed." },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const jobId = randomUUID()
    const extension = getExtension(file.type)

    const uploadsDir = path.join(process.cwd(), "public/uploads")
    await mkdir(uploadsDir, { recursive: true })

    const filePath = path.join(uploadsDir, `${jobId}.${extension}`)
    await writeFile(filePath, buffer)

    return NextResponse.json({
      jobId,
      imageUrl: `/uploads/${jobId}.${extension}`,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to create job." },
      { status: 500 }
    )
  }
}