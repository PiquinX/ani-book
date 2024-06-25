export interface GeneralType {
    id: string
    title: string
    poster: string
    createdAt: string
    rate: number
    description: string
}
// Books
export interface BookType extends GeneralType {
}
export interface BookResponseType extends Omit<BookType, 'id'>{
    _id: string
}

export type BookUpdateType = Omit<BookType, 'createdAt'>
export type BookFormType = Omit<BookType, 'id' | 'createdAt'>

// Series
export interface SerieType extends GeneralType {
}
export interface SerieResponseType extends Omit<SerieType, 'id'>{
    _id: string
}

export type SerieUpdateType = Omit<SerieType, 'createdAt'>
export type SerieFormType = Omit<SerieType, 'id' | 'createdAt'>

// Movies
export interface MovieType extends GeneralType {
}
export interface MovieResponseType extends Omit<SerieType, 'id'>{
    _id: string
}

export type MovieUpdateType = Omit<MovieType, 'createdAt'>
export type MovieFormType = Omit<MovieType, 'id' | 'createdAt'>

// Games
export interface GameType extends GeneralType {
}
export interface GameResponseType extends Omit<GameType, 'id'>{
    _id: string
}

export type GameUpdateType = Omit<GameType, 'createdAt'>
export type GameFormType = Omit<GameType, 'id' | 'createdAt'>

// Animes
export type AnimeRate = {
    value: string
    rate: number | null
}
export interface AnimeType extends Omit<GeneralType, 'rate'> {
    rate: AnimeRate[]
    isFinished: boolean
    averageRate: number
}
export interface AnimeResponseType extends Omit<AnimeType, 'id'>{
    _id: string
}

export type AnimeUpdateType = Omit<AnimeType, 'createdAt'>
export type AnimeFormType = Omit<AnimeType, 'id' | 'createdAt'>

// Lists
export type BooksListType = BookType[]
export type MoviesListType = MovieType[]
export type GamesListType = GameType[]
export type SeriesListType = SerieType[]
export type AnimesListType = AnimeType[]

// URLs
export type WhichPage = 'movies' | 'books' | 'series' | 'animes'

// Errors
export interface ErrorType {
    errorMessage: string
}

export type State = {
    errors: {
      title?: string[]
      poster?: string[]
      rate?: string[]
      external?: string[]
    }
    message: string | null
}

export interface animeState {
    errors: {
        title?: string[]
        poster?: string[]
        rate?: string[]
        isFinished?: string[]
        external?: string[]
    }
    message: string | null
}

export interface ClickEvent extends MouseEvent {
    target: HTMLElement;
}
