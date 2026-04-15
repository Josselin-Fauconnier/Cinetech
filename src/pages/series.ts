import { affichageHeader } from '../components/header.js'
import { affichageFooter } from '../components/footer.js'
import { getSerieDocumentairePage } from '../services/tmdb.js'
import { creerCarteSerie } from '../components/carteSerie.js'
import { Serie } from '../types/serie.js'

affichageHeader()
affichageFooter()

let pageCourante = 1
let totalPages = 1

async function afficherSeries(page: number): Promise<void> {
    const data = await getSerieDocumentairePage(page)
    const series: Serie[] = data.results
    totalPages = data.total_pages

    const main = document.getElementById('main')
    if (!main) return

    main.innerHTML = `
        <section class="section-films">
            <h2 class="section-films_titre">Toutes les séries documentaires </h2>
            <div class="grille">
                ${series.map(serie => creerCarteSerie(serie)).join('')}
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
            afficherSeries(pageCourante)
            window.scrollTo(0, 0)
        }
    })

    document.getElementById('btn-suivant')?.addEventListener('click', () => {
        if (pageCourante < totalPages) {
            pageCourante++
            afficherSeries(pageCourante)
            window.scrollTo(0, 0)
        }
    })
}

afficherSeries(pageCourante)



