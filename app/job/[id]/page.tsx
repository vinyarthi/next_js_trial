import JobPageClient from "@/components/JobPageClient"

export default async function JobPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ login?: string; paid?: string; userId?: string }>
}) {
  const { id } = await params
  const { login, paid, userId: queryUserId } = await searchParams

  const isLoggedIn = login === "true"
  const isPaid = paid === "true"

  const userId = queryUserId ?? ""
  // dummy job data for now
  const job = {
    id,
    imageUrl: `/uploads/${id}.jpg`,
    status: "Not generated yet",
    previews: [],
  }

  return (
    <JobPageClient
      job={job}
      isLoggedIn={isLoggedIn}
      isPaid={isPaid}
      userId={userId}
    />
  )
}