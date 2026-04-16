import { affichageHeader } from '../components/header.js'
import { affichageFooter } from '../components/footer.js'
import { getSerieDetail, getSerieCredits } from '../services/tmdb.js'
import { TMDB_IMG_URL } from '../services/config.js'

affichageHeader()
affichageFooter()

async function afficherDetailSerie(): Promise<void> {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')

    if (!id) return

    const [serie, credits] = await Promise.all([
        getSerieDetail(Number(id)),
        getSerieCredits(Number(id))
    ])

    const acteurs = credits.cast.slice(0, 10)

    const poster = serie.poster_path
        ? `${TMDB_IMG_URL}${serie.poster_path}`
        : ''

    const genres = serie.genres.map((g: any) => g.name).join(', ')
    const pays = serie.origin_country?.join(', ') || 'N/A'
    const saisons = serie.number_of_seasons ? `${serie.number_of_seasons} saison(s)` : 'N/A'

    const main = document.getElementById('main')
    if (!main) return

    main.innerHTML = `
        <div class="detail">
            <div class="detail_haut">
                <img class="detail_poster" src="${poster}" alt="${serie.name}">
                <div class="detail_infos">
                    <h1 class="detail_titre">${serie.name}</h1>
                    <div class="detail_meta">
                        <span><img src="./assets/notation.svg" alt="" width="16" height="16"> ${serie.vote_average.toFixed(1)}</span>
                        <span>${serie.first_air_date?.slice(0, 4) || 'N/A'}</span>
                        <span>${saisons}</span>
                    </div>
                    <p class="detail_genres">${genres}</p>
                    <p class="detail_pays">Pays : ${pays}</p>
                    <p class="detail_resume">${serie.overview || 'Aucun résumé disponible.'}</p>
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
        </div>
    `
}

afficherDetailSerie()
