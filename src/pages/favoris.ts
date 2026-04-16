import { affichageHeader } from '../components/header.js'
import { affichageFooter } from '../components/footer.js'
import { getFavoris, supprimerFavori } from '../utils/favoris.js'
import { TMDB_IMG_URL } from '../services/config.js'

affichageHeader()
affichageFooter()

function creerCartesFavoris(items: ReturnType<typeof getFavoris>): string {
    return items.map(item => `
        <article class="carte">
            <a href="./${item.type === 'film' ? 'film' : 'serie'}.html?id=${item.id}">
                ${item.poster_path
                    ? `<img src="${TMDB_IMG_URL}${item.poster_path}" alt="${item.title}" loading="lazy">`
                    : `<div class="carte_placeholder">Pas d'affiche</div>`
                }
                <div class="carte_infos">
                    <h3 class="carte_titre">${item.title}</h3>
                    <p class="carte_note">
                        <img src="./assets/notation.svg" alt="" width="16" height="16"> ${item.vote_average.toFixed(1)}
                    </p>
                </div>
            </a>
            <button class="btn-favori btn-favori--retirer btn-suppr-favori" data-id="${item.id}">
                − Retirer
            </button>
        </article>
    `).join('')
}

function afficherFavoris(): void {
    const favoris = getFavoris()
    const main = document.getElementById('main')
    if (!main) return

    if (favoris.length === 0) {
        main.innerHTML = `
            <section class="section-films">
                <h2 class="section-films_titre">Mes Favoris</h2>
                <p class="favoris-vide">Aucun favori pour le moment.</p>
            </section>
        `
        return
    }

    const films = favoris.filter(f => f.type === 'film')
    const documentaires = favoris.filter(f => f.type === 'serie')

    main.innerHTML = `
        ${films.length > 0 ? `
        <section class="section-films">
            <h2 class="section-films_titre">Films favoris</h2>
            <div class="grille">
                ${creerCartesFavoris(films)}
            </div>
        </section>
        ` : ''}

        ${documentaires.length > 0 ? `
        <section class="section-films">
            <h2 class="section-films_titre">Documentaires favoris</h2>
            <div class="grille">
                ${creerCartesFavoris(documentaires)}
            </div>
        </section>
        ` : ''}
    `

    document.querySelectorAll('.btn-suppr-favori').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number((e.currentTarget as HTMLElement).dataset.id)
            supprimerFavori(id)
            afficherFavoris()
        })
    })
}

afficherFavoris()
