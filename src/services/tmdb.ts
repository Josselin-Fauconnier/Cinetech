import { TMDB_TOKEN, TMDB_BASE_URL } from './config.js'

async function fetchTMDB(endpoint: string): Promise<any> {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(`Erreur TMDB : ${response.status}`)
    }

    return response.json()
}

export async function getFilmsPopulaires(): Promise<any> {
    return fetchTMDB('/movie/popular?language=fr-FR&page=1')
}

export async function getSeriesPopulaires(): Promise<any> {
    return fetchTMDB('/tv/popular?language=fr-FR&page=1')
}
