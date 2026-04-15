import {affichageHeader} from '../components/header.js'
import { affichageFooter } from '../components/footer.js'
import { getFilmsPopulaires } from '../services/tmdb.js'
import { creerCarteFilm } from '../components/carteFilm.js'
import { Film } from '../types/movie.js'

affichageHeader()
affichageFooter()

async function afficherfilms(): Promise<void> {
    const data = await getFilmsPopulaires()
    const films: Film[] = data.results.slice(0,10)

    const main = document.getElementById('main')
    if(!main) return 

    main.innerHTML = `
    <section class="section-films">
    <h2 class="section-films__titre">Les films populaires</h2>
    <div class="grille">
    ${films.map(film => creerCarteFilm(film)).join('')}
    </div>
    </section>
    `
}  

afficherfilms()
