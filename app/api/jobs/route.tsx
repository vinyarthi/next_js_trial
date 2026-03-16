import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"

export async function POST(req: Request) {
  const data = await req.formData()
  const file = data.get("file") as File
  
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const jobId = randomUUID()

  const filePath = path.join(process.cwd(), "public/uploads", `${jobId}.jpg`)

  await writeFile(filePath, buffer)

  return NextResponse.json({
    jobId: jobId
  })
}