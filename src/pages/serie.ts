import { affichageHeader } from '../components/header.js'
import { affichageFooter } from '../components/footer.js'
import { getSerieDetail, getSerieCredits, getSeriesSimilaires, getCommentairesSerie } from '../services/tmdb.js'
import { ajouterFavori, supprimerFavori, estFavori } from '../utils/favoris.js'
import { getCommentaires, ajouterCommentaire, ajouterReponse } from '../utils/commentaires.js'
import { TMDB_IMG_URL } from '../services/config.js'

affichageHeader()
affichageFooter()

async function afficherDetailSerie(): Promise<void> {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')

    if (!id) return

    const [serie, credits, similaires, commentairesTMDB] = await Promise.all([
        getSerieDetail(Number(id)),
        getSerieCredits(Number(id)),
        getSeriesSimilaires(Number(id)),
        getCommentairesSerie(Number(id))
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
                    <button class="btn-favori ${estFavori(serie.id) ? 'btn-favori--retirer' : 'btn-favori--ajouter'}" id="btn-favori">
                        ${estFavori(serie.id) ? '− Retirer des favoris' : '+ Ajouter aux favoris'}
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
                <h2 class="detail_acteurs-titre">Séries similaires</h2>
                <div class="grille">
                    ${similaires.results.slice(0, 5).map((s: any) => `
                        <article class="carte">
                            <a href="./serie.html?id=${s.id}">
                                ${s.poster_path
                                    ? `<img src="${TMDB_IMG_URL}${s.poster_path}" alt="${s.name}" loading="lazy">`
                                    : `<div class="carte_placeholder">Pas d'affiche</div>`
                                }
                                <div class="carte_infos">
                                    <h3 class="carte_titre">${s.name}</h3>
                                    <p class="carte_date">${s.first_air_date?.slice(0, 4) || 'N/A'}</p>
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
                    ${getCommentaires(serie.id).map(c => `
                        <div class="commentaire">
                            <div class="commentaire_entete">
                                <strong class="commentaire_auteur">${c.auteur}</strong>
                                <span class="commentaire_date">${c.date}</span>
                            </div>
                            <p class="commentaire_contenu">${c.contenu}</p>

                            ${(c.reponses || []).map(r => `
                                <div class="commentaire commentaire--reponse">
                                    <div class="commentaire_entete">
                                        <strong class="commentaire_auteur">${r.auteur}</strong>
                                        <span class="commentaire_date">${r.date}</span>
                                    </div>
                                    <p class="commentaire_contenu">${r.contenu}</p>
                                </div>
                            `).join('')}

                            <form class="reponse_form" data-id="${c.id}">
                                <input type="text" class="commentaires_input reponse_auteur" placeholder="Votre nom" required>
                                <input type="text" class="commentaires_input reponse_contenu" placeholder="Répondre..." required>
                                <button type="submit" class="btn-favori btn-favori--ajouter">Répondre</button>
                            </form>
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

    document.querySelectorAll('.reponse_form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const id = (form as HTMLElement).dataset.id!
            const auteur = (form.querySelector('.reponse_auteur') as HTMLInputElement).value.trim()
            const contenu = (form.querySelector('.reponse_contenu') as HTMLInputElement).value.trim()
            if (auteur && contenu) {
                ajouterReponse(id, auteur, contenu)
                afficherDetailSerie()
            }
        })
    })

    document.getElementById('form-commentaire')?.addEventListener('submit', (e) => {
        e.preventDefault()
        const auteur = (document.getElementById('input-auteur') as HTMLInputElement).value.trim()
        const contenu = (document.getElementById('input-contenu') as HTMLTextAreaElement).value.trim()
        if (auteur && contenu) {
            ajouterCommentaire(serie.id, auteur, contenu)
            afficherDetailSerie()
        }
    })

    document.getElementById('btn-favori')?.addEventListener('click', () => {
        if (estFavori(serie.id)) {
            supprimerFavori(serie.id)
        } else {
            ajouterFavori({
                id: serie.id,
                type: 'serie',
                title: serie.name,
                poster_path: serie.poster_path,
                vote_average: serie.vote_average
            })
        }
        afficherDetailSerie()
    })
}

afficherDetailSerie()
