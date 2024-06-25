import { getMovies } from '@/lib/actions/moviesActions'
import List from '@/Components/show/List'

const MoviesController = async () => {
  const movies = await getMovies()

  if (movies) {
    return (
      <List
        addLink='/movies/add-movie'
        addText='+ Add Movie'
        list={movies}
        listDataTestId='movies-list'
        editLink='/movies/edit-movie'
      />
    )
  } else return <div>Something happened...</div>
}

export default MoviesController
