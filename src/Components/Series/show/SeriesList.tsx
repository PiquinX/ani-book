import { SeriesListType } from '@/lib/definitions'
import { rateColor } from '@/lib/utlis'
import Link from 'next/link'
import AddCard from '@/Components/show/AddCard'

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
                    <Link
                        key={serie.id}
                        href={`/series/edit-serie/${serie.id}`}
                        scroll={false}
                        className="justify-self-center rounded hover:scale-105 duration-150 border w-72 animate-appear-fast p-5 flex flex-col gap-5"
                    >
                        <h4 className='truncate h-8 font-bold'>{serie.title}</h4>
                        <img
                            className="w-full rounded"
                            src={serie.poster}
                            alt={serie.title} />
                        <div className='font-bold'>
                            <span className={rateColor(serie.rate)}>{serie.rate}</span>/100
                        </div>
                        <div>
                            Created at: {serie.createdAt.split('T')[0]}
                        </div>
                    </Link>
                ))
            }
             <AddCard link='/series/add-serie' />
        </div>
  )
}
