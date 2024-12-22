import { animeIsFinishedOptions } from '@/lib/consts'
import { AnimeType } from '@/lib/definitions'
import Link from 'next/link'
import React from 'react'
import AddCard from '@/Components/show/AddCard'
import { Date } from '@/Components/show/Date'
import { AnimesTier } from './AnimeTier'

type AnimeWithoutRate = Omit<AnimeType, 'rate'>

interface Props {
    animes: AnimeWithoutRate[]
}

export const AnimesList: React.FC<Props> = ({ animes }) => {

    const style = animes.length > 2 ? 'grid grid-cols-responsive' : 'flex flex-wrap justify-center flex-shrink md:justify-start'

    return (
            <div
                className={`${style} gap-8`}
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
                <p className='font-bold text-lg'>
                    <AnimesTier averageRate={anime.averageRate} />
                </p>
                <div>
                    {anime.isFinished ? animeIsFinishedOptions.finished : animeIsFinishedOptions.notFinished}
                </div>
            </div>
            <div className='flex gap-11'>
                Created at: <Date date={anime.createdAt} />
            </div>
        </Link>
    )
}