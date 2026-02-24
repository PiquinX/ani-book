import EditBookController from '@/Controllers/Books/EditBookController'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <EditBookController id={id} />
  )
}
