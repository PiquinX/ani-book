'use server'

import { redirect } from 'next/navigation'
import { getAnimeByID } from '@/lib/actions/animeActions'
import EditAnime from '@/Components/Animes/edit/EditAnime'

interface Props {
    id: string
}

const EditAnimeController: React.FC<Props> = async ({ id }) => {
  const anime = await getAnimeByID({ id })

  if (anime) return <EditAnime anime={anime} />
  else {
    redirect('/animes')
  }
}

export default EditAnimeController
