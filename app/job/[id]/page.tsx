export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div>
      Generating previews for job {id}
    </div>
  )
}