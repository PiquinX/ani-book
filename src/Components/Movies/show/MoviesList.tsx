import { MoviesListType } from '@/lib/definitions'
import AddCard from '@/Components/show/AddCard'
import { MediaCard } from '@/Components/show/MediaCard'

interface Props {
    movies: MoviesListType
}

export const MoviesList: React.FC<Props> = ({ movies }) => {
    const style = movies.length > 3 ? 'grid grid-cols-responsive' : 'flex flex-wrap justify-center shrink md:justify-start'

    return (
        <div
            className={`${style} gap-8`}
            data-testid='movies-list'
        >
            {
                movies.map(movie => (
                    <MediaCard
                        key={movie.id}
                        href={`/movies/edit-movie/${movie.id}`}
                        title={movie.title}
                        poster={movie.poster}
                        rate={movie.rate}
                        createdAt={movie.createdAt}
                    />
                ))
            }
            <AddCard link='/movies/add-movie' />
        </div>
    )
}
