"use client"

import Link from "next/link"
import { use } from "react"

export default function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Payment Page</h1>
      <p>Pay $5 to unlock HD images.</p>

      <Link
        href={`/job/${id}?login=true&paid=true`}
        className="bg-green-500 text-white px-4 py-2 rounded inline-block"
      >
        Pay $5
      </Link>
    </div>
  )
}