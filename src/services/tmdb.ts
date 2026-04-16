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


//  Affichage page de recherche  films/documentire
export async function getFilmsPage(page: number): Promise <any>{
    return fetchTMDB(`/movie/popular?language=fr-FR&page=${page}`)
}

export async function getSerieDocumentairePage(page: number): Promise<any> {
    return fetchTMDB(`/discover/tv?language=fr-FR&page=${page}&with_genres=99&sort_by=popularity.desc`)
}



export async function getFilmDetail(id: number): Promise<any>{
    return fetchTMDB(`/movie/${id}?language=fr-FR`)
}

export async function getFilmCredits(id: number): Promise <any>{
    return fetchTMDB(`/movie/${id}/credits?language=fr-FR`)
}

export async function getSerieDetail(id: number): Promise<any> {
    return fetchTMDB(`/tv/${id}?language=fr-FR`)
}

export async function getSerieCredits(id: number): Promise<any> {
    return fetchTMDB(`/tv/${id}/credits?language=fr-FR`)
}


export async function getFilmsSimilaires(id: number): Promise<any> {
    return fetchTMDB(`/movie/${id}/similar?language=fr-FR&page=1`)
}

export async function getSeriesSimilaires(id: number): Promise<any> {
    return fetchTMDB(`/tv/${id}/similar?language=fr-FR&page=1`)
}