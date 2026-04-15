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
// affichage page d'acceuil
export async function getFilmsPopulaires(): Promise<any> {
    return fetchTMDB('/movie/popular?language=fr-FR&page=1')
}


export async function getSeriesDocumentairePopulaires(): Promise<any> {
    return fetchTMDB('/discover/tv?language=fr-FR&page=1&with_genres=99&sort_by=popularity.desc')
}



export async function getFilmsPage(page: number): Promise <any>{
    return fetchTMDB(`/movie/popular?language=fr-FR&page=${page}`)
}

export async function getSerieDocumentairePage(page: number): Promise<any> {
    return fetchTMDB(`/discover/tv?language=fr-FR&page=${page}&with_genres=99&sort_by=popularity.desc`)
}

