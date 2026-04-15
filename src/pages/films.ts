import { affichageHeader } from '../components/header.js'
import { affichageFooter } from '../components/footer.js'
import { getFilmsPage } from '../services/tmdb.js'
import { creerCarteFilm } from '../components/carteFilm.js'
import { Film } from '../types/movie.js'

affichageHeader()
affichageFooter()

let pageCourante = 1
let totalPages = 1

async function afficherFilms(page: number): Promise<void> {
    const data = await getFilmsPage(page)
    const films: Film[] = data.results
    totalPages = data.total_pages

    const main = document.getElementById('main')
    if (!main) return

    main.innerHTML = `
        <section class="section-films">
            <h2 class="section-films_titre">Tous les films</h2>
            <div class="grille">
                ${films.map(film => creerCarteFilm(film)).join('')}
            </div>
            <div class="pagination">
                <button class="pagination_btn" id="btn-precedent" ${page === 1 ? 'disabled' : ''}>Précédent</button>
                <span class="pagination_info">Page ${page} / ${totalPages}</span>
                <button class="pagination_btn" id="btn-suivant" ${page >= totalPages ? 'disabled' : ''}>Suivant</button>
            </div>
        </section>
    `

    document.getElementById('btn-precedent')?.addEventListener('click', () => {
        if (pageCourante > 1) {
            pageCourante--
            afficherFilms(pageCourante)
            window.scrollTo(0, 0)
        }
    })

    document.getElementById('btn-suivant')?.addEventListener('click', () => {
        if (pageCourante < totalPages) {
            pageCourante++
            afficherFilms(pageCourante)
            window.scrollTo(0, 0)
        }
    })

}

afficherFilms(pageCourante)
