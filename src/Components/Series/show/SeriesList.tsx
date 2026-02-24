import { SeriesListType } from '@/lib/definitions'
import AddCard from '@/Components/show/AddCard'
import { MediaCard } from '@/Components/show/MediaCard'

interface Props {
    series: SeriesListType
}

export const SeriesList: React.FC<Props> = ({ series }) => {
    return (
        <div
            className="grid grid-cols-responsive gap-8"
            data-testid='series-list'
        >
            {
                series.map(serie => (
                    <MediaCard
                        key={serie.id}
                        href={`/series/edit-serie/${serie.id}`}
                        title={serie.title}
                        poster={serie.poster}
                        rate={serie.rate}
                        createdAt={serie.createdAt}
                    />
                ))
            }
            <AddCard link='/series/add-serie' />
        </div>
    )
}
