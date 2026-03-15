import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

export async function POST() {

  const jobId = randomUUID()

  return NextResponse.json({
    jobId: jobId
  })
}