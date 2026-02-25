export const animeIsFinishedOptions = {
  finished: 'Finished',
  notFinished: 'To be animated'
}

export const APIstring = process.env.APISTRING

const rateOptions = {
  S_PLUS: 'S+',
  S: 'S',
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
}

export const animeRateOptions = {
  ...rateOptions,
  DONT_WATCH: 'DONT WATCH'
}

export const bookRateOptions = {
  ...rateOptions,
  DONT_READ: "DONT READ"
}

export const sortOptions = {
  dateOldToNew: 'Date (Oldest to Newest)',
  dateNewToOld: 'Date (Newest to Oldest)',
  rateHighToLow: 'Rate Score (High to Low)',
  rateLowToHigh: 'Rate Score (Low to High)',
  seasonsHighToLow: 'Amount of seasons (High to Low)',
  seasonsLowToHigh: 'Amount of seasons (Low to High)'
}

export const animeIsFinishedOptionsFilter = {
  default: 'Default',
  finished: 'Finished',
  notFinished: 'To be animated'
}

export const FILTERPARAMSOPTIONS = {
  search: 'search',
  minSeasons: 'minseasons',
  maxSeasons: 'maxseasons',
  rate: 'rate',
  isFinished: 'isfinished',
  sort: 'sortedby'
}

export const EXCLUSION_KEYWORDS = [
  // English
  'to watch:', 'watched:', 'to finish:',
  // Spanish
  'por ver:', 'visto:', 'por terminar:', 'viendo:',
  // Japanese
  '見る予定:', '見た:', '完了:', '視聴中:'
]

export const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4'
export const FETCH_DELAY_MS = 500
