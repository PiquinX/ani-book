import { animeIsFinishedOptions } from '@/lib/consts'
import { AnimeType, AnimeWithoutRate, AnimesListProps } from '@/lib/definitions'
import Link from 'next/link'
import React from 'react'
import AddCard from '@/Components/show/AddCard'
import { Date } from '@/Components/show/Date'
import { AnimesTier } from './AnimeTier'
import { MediaCard } from '@/Components/show/MediaCard'

export const AnimesList: React.FC<AnimesListProps> = ({ animes }) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const style = animes.length > 2 ? 'grid grid-cols-responsive' : 'flex flex-wrap justify-center shrink md:justify-start'

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
            <AddCard link={`animes/add-anime?${params.toString()}`} />
        </div>
    )
}

import { useSearchParams } from 'next/navigation';

const Anime = ({ anime }: { anime: AnimeWithoutRate }) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    return (
        <MediaCard
            href={`animes/edit-anime/${anime.id}?${params.toString()}`}
            title={anime.title}
            poster={anime.poster}
            rate={anime.averageRate}
            createdAt={anime.createdAt}
            extraInfo={anime.isFinished ? animeIsFinishedOptions.finished : animeIsFinishedOptions.notFinished}
            key={anime.id}
        />
    )
}
