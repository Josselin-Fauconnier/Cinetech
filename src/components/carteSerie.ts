import { Serie } from '../types/serie.js'
import { TMDB_IMG_URL } from '../services/config.js'

export function creerCarteSerie(serie: Serie): string {
    const imgHtml = serie.poster_path
        ? `<img src="${TMDB_IMG_URL}${serie.poster_path}" alt="${serie.name}" loading="lazy">`
        : `<div class="carte__placeholder">Pas d'affiche</div>`

    return `
        <article class="carte">
            <a href="./serie.html?id=${serie.id}">
                ${imgHtml}
                <div class="carte__infos">
                    <h3 class="carte__titre">${serie.name}</h3>
                    <p class="carte__note">
                        <img src="./assets/notation.svg" alt="" width="16" height="16"> ${serie.vote_average.toFixed(1)}
                    </p>
                    <p class="carte__date">${serie.first_air_date.slice(0, 4)}</p>
                </div>
            </a>
        </article>
    `
}
