'use server'

import { redirect } from 'next/navigation'
import { getMovieByID } from '@/lib/actions/moviesActions'
import EditMovie from '@/Components/Movies/edit/EditMovie'

interface Props {
    id: string
}

const EditMoviesController: React.FC<Props> = async ({ id }) => {
  const movie = await getMovieByID({ id })

  if (movie) return <EditMovie movie={movie} />
  else {
    redirect('/movies')
  }
}

export default EditMoviesController
