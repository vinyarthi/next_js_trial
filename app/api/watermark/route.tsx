import { NextResponse } from "next/server"
import sharp from "sharp"
import { promises as fs } from "fs"
import path from "path"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const jobId = formData.get("jobId") as string | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    if (!jobId) {
      return NextResponse.json({ error: "No jobId provided" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const inputBuffer = Buffer.from(bytes)

    const watermarkPath = path.join(
      process.cwd(),
      "public",
      "watermarks",
      "logo.png"
    )
    const watermarkBuffer = await fs.readFile(watermarkPath)

    const outputBuffer = await sharp(inputBuffer)
      .resize({ width: 800 })
      .composite([
        {
          input: watermarkBuffer,
          gravity: "southeast",
        },
      ])
      .jpeg({ quality: 80 })
      .toBuffer()

    const previewsDir = path.join(process.cwd(), "public", "previews")
    await fs.mkdir(previewsDir, { recursive: true })

    const fileName = `${jobId}-preview.jpg`
    const outputPath = path.join(previewsDir, fileName)

    await fs.writeFile(outputPath, outputBuffer)

    return NextResponse.json({
      previewUrl: `/previews/${fileName}`,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to create watermarked preview" },
      { status: 500 }
    )
  }
}