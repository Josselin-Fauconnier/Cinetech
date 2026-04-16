import { affichageHeader } from '../components/header.js'
import { affichageFooter } from '../components/footer.js'
import { getFilmDetail, getFilmCredits, getFilmsSimilaires } from '../services/tmdb.js'
import { TMDB_IMG_URL } from '../services/config.js'

affichageHeader()
affichageFooter()

async function afficherDetailFilm(): Promise<void> {
    const params = new URLSearchParams(window.location.search)
    const id= params.get('id')

    if(!id) return

    const [film, credits,similaires] = await Promise.all([
        getFilmDetail(Number(id)),
        getFilmCredits(Number(id)),
        getFilmsSimilaires(Number(id))
    ])

    const realisateur = credits.crew.find((p: any)=> p.job === 'Director')
    const acteurs = credits.cast.slice(0,10)

    const poster = film.poster_path
    ? `${TMDB_IMG_URL}${film.poster_path}`
        : ''

    const genres = film.genres.map((g: any)=> g.name).join('')
    const pays = film.production_countries.map((p: any) => p.name).join(', ')
    const duree = film.runtime ? `${film.runtime} min` : 'N/A'

    const main = document.getElementById('main')
    if(!main) return

     main.innerHTML = `
        <div class="detail">
            <div class="detail_haut">
                <img class="detail_poster" src="${poster}" alt="${film.title}">
                <div class="detail_infos">
                    <h1 class="detail_titre">${film.title}</h1>
                    <div class="detail_meta">
                        <span><img src="./assets/notation.svg" alt="" width="16" height="16"> ${film.vote_average.toFixed(1)}</span>
                        <span>${film.release_date.slice(0, 4)}</span>
                        <span>${duree}</span>
                    </div>
                    <p class="detail_genres">${genres}</p>
                    <p class="detail_pays">Pays : ${pays}</p>
                    ${realisateur ? `<p class="detail_realisateur">Réalisateur : <strong>${realisateur.name}</strong></p>` : ''}
                    <p class="detail_resume">${film.overview || 'Aucun résumé disponible.'}</p>
                </div>
            </div>

            ${acteurs.length > 0 ? `
            <div class="detail_acteurs">
                <h2 class="detail_acteurs-titre">Acteurs</h2>
                <div class="detail_acteurs-grille">
                    ${acteurs.map((a: any) => `
                        <div class="acteur">
                            ${a.profile_path 
                             ? `<img class="acteur_photo" src="${TMDB_IMG_URL}${a.profile_path}" alt="${a.name}">`
                           : `<div class="acteur_photo carte_placeholder">Pas de photo</div>`
                            }
                            <p class="acteur_nom">${a.name}</p>
                            <p class="acteur_role">${a.character}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            ${similaires.results.length > 0 ? `
            <div class="detail_similaires">
                <h2 class="detail_acteurs-titre">Films similaires</h2>
                <div class="grille">
                    ${similaires.results.slice(0, 5).map((f: any) => `
                        <article class="carte">
                            <a href="./film.html?id=${f.id}">
                                ${f.poster_path
                                    ? `<img src="${TMDB_IMG_URL}${f.poster_path}" alt="${f.title}" loading="lazy">`
                                    : `<div class="carte_placeholder">Pas d'affiche</div>`
                                }
                                <div class="carte_infos">
                                    <h3 class="carte_titre">${f.title}</h3>
                                    <p class="carte_date">${f.release_date?.slice(0, 4) || 'N/A'}</p>
                                </div>
                            </a>
                        </article>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `

}

afficherDetailFilm()
