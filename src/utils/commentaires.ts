export interface Commentaire {
    id: string
    itemId: number
    auteur: string
    contenu: string
    date: string
}

const CLE = 'cinetech_commentaires'

export function getCommentaires(itemId: number): Commentaire[] {
    const data = localStorage.getItem(CLE)
    const tous: Commentaire[] = data ? JSON.parse(data) : []
    return tous.filter(c => c.itemId === itemId)
}

export function ajouterCommentaire(itemId: number, auteur: string, contenu: string): void {
    const data = localStorage.getItem(CLE)
    const tous: Commentaire[] = data ? JSON.parse(data) : []
    tous.push({
        id: Date.now().toString(),
        itemId,
        auteur,
        contenu,
        date: new Date().toLocaleDateString('fr-FR')
    })
    localStorage.setItem(CLE, JSON.stringify(tous))
}
