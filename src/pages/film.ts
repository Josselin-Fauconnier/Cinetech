import { affichageHeader } from '../components/header.js'
import { affichageFooter } from '../components/footer.js'
import { getFilmDetail, getFilmCredits, getFilmsSimilaires, getCommentairesFilm } from '../services/tmdb.js'
import { ajouterFavori, supprimerFavori, estFavori } from '../utils/favoris.js'
import { getCommentaires, ajouterCommentaire } from '../utils/commentaires.js'
import { TMDB_IMG_URL } from '../services/config.js'

affichageHeader()
affichageFooter()

async function afficherDetailFilm(): Promise<void> {
    const params = new URLSearchParams(window.location.search)
    const id= params.get('id')

    if(!id) return

    const [film, credits, similaires, commentairesTMDB] = await Promise.all([
        getFilmDetail(Number(id)),
        getFilmCredits(Number(id)),
        getFilmsSimilaires(Number(id)),
        getCommentairesFilm(Number(id))
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
                    <button class="btn-favori ${estFavori(film.id) ? 'btn-favori--retirer' : 'btn-favori--ajouter'}" id="btn-favori">
                      ${estFavori(film.id) ? '− Retirer des favoris' : '+ Ajouter aux favoris'}
                      </button>
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

            <div class="commentaires">
                <h2 class="detail_acteurs-titre">Commentaires</h2>

                <form class="commentaires_form" id="form-commentaire">
                    <input type="text" class="commentaires_input" id="input-auteur" placeholder="Votre nom" required>
                    <textarea class="commentaires_textarea" id="input-contenu" placeholder="Votre commentaire..." required></textarea>
                    <button type="submit" class="pagination_btn">Publier</button>
                </form>

                <div class="commentaires_liste">
                    ${getCommentaires(film.id).map(c => `
                        <div class="commentaire">
                            <div class="commentaire_entete">
                                <strong class="commentaire_auteur">${c.auteur}</strong>
                                <span class="commentaire_date">${c.date}</span>
                            </div>
                            <p class="commentaire_contenu">${c.contenu}</p>
                        </div>
                    `).join('')}

                    ${commentairesTMDB.results.slice(0, 5).map((c: any) => `
                        <div class="commentaire commentaire--tmdb">
                            <div class="commentaire_entete">
                                <strong class="commentaire_auteur">${c.author}</strong>
                                <span class="commentaire_date">${new Date(c.created_at).toLocaleDateString('fr-FR')}</span>
                                <span class="commentaire_badge">TMDB</span>
                            </div>
                            <p class="commentaire_contenu">${c.content.slice(0, 500)}${c.content.length > 500 ? '...' : ''}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `
    document.getElementById('form-commentaire')?.addEventListener('submit', (e) => {
        e.preventDefault()
        const auteur = (document.getElementById('input-auteur') as HTMLInputElement).value.trim()
        const contenu = (document.getElementById('input-contenu') as HTMLTextAreaElement).value.trim()
        if (auteur && contenu) {
            ajouterCommentaire(film.id, auteur, contenu)
            afficherDetailFilm()
        }
    })

    document.getElementById('btn-favori')?.addEventListener('click', () => {
        if (estFavori(film.id)) {
            supprimerFavori(film.id)
        } else {
            ajouterFavori({
                id: film.id,
                type: 'film',
                title: film.title,
                poster_path: film.poster_path,
                vote_average: film.vote_average
            })
        }
        afficherDetailFilm()
    })
}

afficherDetailFilm()
