import { affichageHeader } from '../components/header.js'
import { affichageFooter } from '../components/footer.js'
import { getFilmsPopulaires, getSeriesDocumentairePopulaires } from '../services/tmdb.js'
import { creerCarteFilm } from '../components/carteFilm.js'
import { creerCarteSerie } from '../components/carteSerie.js'
import { Film } from '../types/movie.js'
import { Serie } from '../types/serie.js'

affichageHeader()
affichageFooter()

async function afficherAccueil(): Promise<void> {
    const [dataFilms, dataSeries] = await Promise.all([
        getFilmsPopulaires(),
        getSeriesDocumentairePopulaires()
    ])

    const films: Film[] = dataFilms.results.slice(0, 10)
    const series: Serie[] = dataSeries.results.slice(0, 10)

    const main = document.getElementById('main')
    if (!main) return

    main.innerHTML = `
        <section class="section-films">
            <h2 class="section-films_titre">Les films populaires</h2>
            <div class="grille">
                ${films.map(film => creerCarteFilm(film)).join('')}
            </div>
        </section>

        <section class="section-films">
            <h2 class="section-films_titre">Les séries documentaires populaires</h2>
            <div class="grille">
                ${series.map(serie => creerCarteSerie(serie)).join('')}
            </div>
        </section>
    `
}

afficherAccueil()
