export interface ItemFavori {
    id: number
    type: 'film'|'serie'
    title: string
    poster_path: string | null
    vote_average: number
}

const CLE = 'cinectech_favoris'

export function getFavoris(): ItemFavori[]{
    const data = localStorage.getItem(CLE)
    return data ? JSON.parse(data) : []
}

export function estFavori(id: number): boolean {
    return getFavoris().some(f => f.id === id)
}


export function ajouterFavori(item: ItemFavori) : void {
    const favoris = getFavoris()
    favoris.push(item)
    localStorage.setItem(CLE, JSON.stringify(favoris))
}

export function supprimerFavori(id: number) : void {
    const favoris = getFavoris().filter(f => f.id !== id)
    localStorage.setItem(CLE, JSON.stringify(favoris))
}