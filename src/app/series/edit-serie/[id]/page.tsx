import EditSeriesController from '@/Controllers/Series/EditSeriesController'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <EditSeriesController id={id} />
  )
}
