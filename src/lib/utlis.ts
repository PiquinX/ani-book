// export async function isValidImageUrl (url: string): Promise<boolean> {
//   return true
//   // try {
//   //   const response = await fetch(url)
//   //   console.log(response)
//   //   return response.ok
//   // } catch (err) {
//   //   console.log(err)
//   //   return false
//   // }
// }

import { animeIsFinishedOptions, animeIsFinishedOptionsFilter, sortOptions } from "./consts"
import { AnimeFilters, AnimesListType, AnimeToShowType } from "./definitions"

export const getRate = (rate: string): number => {
  if (rate === 'S+') return 100
  if (rate === 'S') return 93
  if (rate === 'A') return 88
  if (rate === 'B') return 83
  if (rate === 'C') return 78
  if (rate === 'D') return 70
  if (rate === 'E') return 50
  if (rate === 'F') return 45
  if (rate === 'DONT WATCH') return 10
  return 0
}

export const getTier = (rate: number): string => {
  if (rate >= 95) return 'S+'
  if (rate >= 90) return 'S'
  if (rate >= 85) return 'A'
  if (rate >= 80) return 'B'
  if (rate >= 75) return 'C'
  if (rate >= 65) return 'D'
  if (rate >= 55) return 'E'
  if (rate >= 45) return 'F'
  if (rate < 45) return 'DONT WATCH'
  return ''
}

export const rateColor = (rate: number): string => {
  if (rate === 100) return 'green-100 text-[#40ff00]'
  if (rate >= 95) return 'green-95 text-[#40ff00]'
  if (rate >= 90) return 'text-[#40ff00]'
  if (rate >= 85) return 'text-[#7fed09]'
  if (rate >= 80) return 'text-[#9dde10]'
  if (rate >= 75) return 'text-[#cdde10]'
  if (rate >= 65) return 'text-[#e0b909]'
  if (rate >= 55) return 'text-[#e09109]'
  if (rate >= 45) return 'text-[#e05809]'
  if (rate < 45) return 'text-[#e01e09]'
  return ''
}

export const filterAnimes = (animes: AnimeToShowType[], filters : AnimeFilters) => {

  if(filters.search){
    animes = animes.filter(anime => anime.title.toUpperCase().includes(filters.search.toUpperCase()))
  }

  if((filters.maxSeasons!= null && filters.minSeasons != null) && filters.minSeasons < filters.maxSeasons ){
    animes = animes.filter(anime => anime.seasons <= filters.maxSeasons && anime.seasons >= filters.minSeasons)
  }

  if(filters.rate){
    animes = animes.filter(anime => getTier(anime.averageRate) === filters.rate)
  }

  if(filters.isFinished != animeIsFinishedOptionsFilter.default){

    if(filters.isFinished === animeIsFinishedOptions.finished){
      animes = animes.filter(anime => anime.isFinished)
    }else{
      animes = animes.filter(anime => !anime.isFinished)
    }

  }

  return animes
}

export const sortAnimes = (animes: AnimeToShowType[], sortBy: string | null) => {
  if (sortBy === sortOptions.dateNewToOld) {
    animes = animes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === sortOptions.dateOldToNew) {
    animes = animes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else if (sortBy === sortOptions.rateHighToLow) {
    animes = animes.sort((a, b) => b.averageRate - a.averageRate);
  } else if (sortBy === sortOptions.rateLowToHigh) {
    animes = animes.sort((a, b) => a.averageRate - b.averageRate);
  } else if (sortBy === sortOptions.seasonsHighToLow) {
    animes = animes.sort((a, b) => b.seasons - a.seasons);
  } else if (sortBy === sortOptions.seasonsLowToHigh) {
    animes = animes.sort((a, b) => a.seasons - b.seasons);
  }

  return animes;
};
