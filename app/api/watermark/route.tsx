import { NextResponse } from "next/server";
import sharp from "sharp";
import {promises as fs} from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const inputBuffer = Buffer.from(bytes);

  const watermarkPath = path.join(process.cwd(), "public", "watermarks", "logo.png");

  const watermarkBuffer = await fs.readFile(watermarkPath);

  const outputBuffer  = await sharp(inputBuffer)
    .resize({width: 800})
    .composite([
        { 
        input: watermarkBuffer, 
        gravity: "southeast",
    },])
    .jpeg({quality: 80})
    .toBuffer();

return new NextResponse(new Uint8Array(outputBuffer), {
    headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="watermarked_preview.jpg"`,
    },
})

}
