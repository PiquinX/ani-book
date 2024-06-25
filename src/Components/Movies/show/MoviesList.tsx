import { MoviesListType } from '@/lib/definitions'
import { rateColor } from '@/lib/utlis'
import Link from 'next/link'
import AddCard from '@/Components/show/AddCard'

interface Props {
    movies: MoviesListType
}

export const MoviesList: React.FC<Props> = ({ movies }) => {
  return (
        <div
            className="grid grid-cols-responsive gap-8"
            data-testid='movies-list'
        >
            {
                movies.map(movie => (
                    <Link
                        href={`/movies/edit-movie/${movie.id}`}
                        scroll={false}
                        key={movie.id}
                        className="justify-self-center rounded animate-appear-fast border w-72 p-5 flex flex-col gap-5 hover:scale-105 duration-150"
                    >
                        <h4 className='truncate h-8 font-bold'>{movie.title}</h4>
                        <img
                            className="w-full h-full rounded"
                            src={movie.poster}
                            alt={movie.title} />
                        <div className='font-bold'>
                            <span className={rateColor(movie.rate)}>{movie.rate}</span>/100
                        </div>
                        <div>
                            Created at: {movie.createdAt.split('T')[0]}
                        </div>
                    </Link>
                ))
            }
            <AddCard link='/movies/add-movie' />
        </div>
  )
}
