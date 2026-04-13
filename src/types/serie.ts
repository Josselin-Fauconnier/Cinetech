export interface Serie {
    id: number
    name: string
    overview: string
    poster_path: string | null
    first_air_date: string
    vote_average: number
    genre_ids: number[]
    origin_country?: string[]
}

