export interface Acteur {
    id: number
    name: string
    character: string
    profile_path: string | null
}

export interface MembreEquipe {
    id: number
    name: string
    job: string
}

export interface Distribution {
    cast: Acteur[]
    crew: MembreEquipe[]
}
