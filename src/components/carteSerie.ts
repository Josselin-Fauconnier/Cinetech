import { Serie } from '../types/serie.js'
import { TMDB_IMG_URL } from '../services/config.js'
import { escapeHTML } from '../utils/escapeHTML.js'

export function creerCarteSerie(serie: Serie): string {
    const imgHtml = serie.poster_path
        ? `<img src="${TMDB_IMG_URL}${serie.poster_path}" alt="${escapeHTML(serie.name)}" loading="lazy">`
        : `<div class="carte_placeholder">Pas d'affiche</div>`

    return `
        <article class="carte">
            <a href="./serie.html?id=${serie.id}">
                ${imgHtml}
                <div class="carte_infos">
                    <h3 class="carte_titre">${escapeHTML(serie.name)}</h3>
                    <p class="carte_note">
                        <img src="./assets/notation.svg" alt="" width="16" height="16"> ${serie.vote_average.toFixed(1)}
                    </p>
                    <p class="carte_date">${escapeHTML(serie.first_air_date.slice(0, 4))}</p>
                </div>
            </a>
        </article>
    `
}
