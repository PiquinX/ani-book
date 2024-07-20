import { animeIsFinishedOptions } from '@/lib/consts'
import { AnimeType } from '@/lib/definitions'
import { rateColor } from '@/lib/utlis'
import Link from 'next/link'
import React from 'react'
import AddCard from '@/Components/show/AddCard'
import { Date } from '@/Components/show/Date'

type AnimeWithoutRate = Omit<AnimeType, 'rate'>

interface Props {
    animes: AnimeWithoutRate[]
}

export const AnimesList: React.FC<Props> = ({ animes }) => {

  return (
        <div
            className="grid grid-cols-responsive gap-8"
            data-testid='animes-list'
        >
            {
                animes.map(anime => (
                    <Anime anime={anime} key={anime.id} />
                ))
            }
            <AddCard link='/animes/add-anime' />
        </div>
  )
}

const Anime = ({ anime }: { anime: AnimeWithoutRate }) => {
    const rateStyle = rateColor(anime.averageRate)

    return (
        <Link
            href={`/animes/edit-anime/${anime.id}`}
            scroll={false}
            key={anime.id}
            className="justify-self-center rounded hover:scale-105 duration-150 animate-appear-fast border w-72 p-5 flex flex-col gap-5"
        >
            <h4 className='truncate h-8 font-bold'>{anime.title}</h4>
            <img
                className="w-full h-full rounded"
                src={anime.poster}
                alt={anime.title} />
            <div className='flex font-bold justify-between'>
                <p>
                    <span className={rateStyle}>
                        {Math.round(anime.averageRate * 10) / 10}
                    </span>/100
                </p>
                <div>
                    {anime.isFinished ? animeIsFinishedOptions.finished : animeIsFinishedOptions.notFinished}
                </div>
            </div>
            <div>
                Created at: <Date date={anime.createdAt} />
            </div>
        </Link>
    )
}