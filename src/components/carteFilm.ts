import { Film } from '../types/movie.js'
import { TMDB_IMG_URL } from '../services/config.js'

export function creerCarteFilm(film: Film): string {
    const imgHtml = film.poster_path
        ? `<img src="${TMDB_IMG_URL}${film.poster_path}" alt="${film.title}" loading="lazy">`
        : `<div class="carte_placeholder">Pas d'affiche</div>`

    return `
        <article class="carte">
            <a href="./film.html?id=${film.id}">
                ${imgHtml}
                <div class="carte_infos">
                    <h3 class="carte_titre">${film.title}</h3>
                    <p class="carte_note">
                        <img src="./assets/notation.svg" alt="" width="16" height="16"> ${film.vote_average.toFixed(1)}
                    </p>
                    <p class="carte_date">${film.release_date.slice(0, 4)}</p>
                </div>
            </a>
        </article>
    `
}

