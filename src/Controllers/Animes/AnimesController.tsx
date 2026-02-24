'use client'

import { AnimesList } from '@/Components/Animes/show/AnimesList'
import AnimesHeader from '@/Components/Animes/show/AnimesHeader'
import { AnimeFilters, AnimeToShowType } from '@/lib/definitions'
import { useSearchParams } from 'next/navigation'
import { animeIsFinishedOptionsFilter, FILTERPARAMSOPTIONS, sortOptions } from '@/lib/consts'
import { filterAnimes, sortAnimes } from '@/lib/utlis'

const AnimesController = ({ animes }: { animes: AnimeToShowType[] | null }) => {
  const searchParams = useSearchParams()

  const filters: AnimeFilters = {
    search: searchParams.get(FILTERPARAMSOPTIONS.search) || null,
    minSeasons: parseInt(searchParams.get(FILTERPARAMSOPTIONS.minSeasons) || '') || null,
    maxSeasons: parseInt(searchParams.get(FILTERPARAMSOPTIONS.maxSeasons) || '') || null,
    rate: searchParams.get(FILTERPARAMSOPTIONS.rate) || null,
    isFinished: searchParams.get(FILTERPARAMSOPTIONS.isFinished) || animeIsFinishedOptionsFilter.default,
  }

  if (animes) {
    const filteredAnimes: AnimeToShowType[] = filterAnimes(animes, filters)

    if (filteredAnimes && filteredAnimes.length != 0) {
      const sortOption = searchParams.get(FILTERPARAMSOPTIONS.sort) || sortOptions.dateNewToOld
      const sortedAnimes = sortAnimes(filteredAnimes, sortOption)
      return (
        <>
          <AnimesList animes={sortedAnimes} />
        </>
      )
    } else {
      return <div>Try with fewer filters.</div>
    }

  } else return <div>Something happened...</div>
}

export default AnimesController
