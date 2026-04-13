import { PaysOrigine } from './pays'

export interface Film {
    id: number
    title: string
    overview: string
    poster_path: string | null
    release_date: string
    vote_average: number
    genre_ids: number[]
    production_countries?: PaysOrigine[]
}

