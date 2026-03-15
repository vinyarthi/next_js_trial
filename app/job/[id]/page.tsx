export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div>
      <h1>Job {id}</h1>

      <div>Uploaded image</div>

      <div>Select styles</div>

      <div>Generate 4 previews button</div>

      <div>Status</div>

      <div>Preview results grid</div>

      <div>Pay to unlock watermark-free button</div>
    </div>
  )
}