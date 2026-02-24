import EditAnimeController from '@/Controllers/Animes/EditAnimeController'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <EditAnimeController id={id} />
  )
}
