export function affichageHeader(): void {
    const header = document.getElementById('header')
    if (!header) return

    header.innerHTML = `
        <nav class="nav">
            <a href="./" class="nav__logo" aria-label="Accueil">
                <img src="./assets/logo.svg" alt="" width="40" height="40">
                <span class="nav__logo-texte">Cinetech</span>
            </a>

            <ul class="nav__liens" id="nav-liens">
                <li><a href="./">Accueil</a></li>
                <li><a href="./films.html">Films</a></li>
                <li><a href="./series.html">Séries</a></li>
                <li><a href="./favoris.html">Favoris</a></li>
            </ul>

            <form class="nav__recherche" role="search" id="form-recherche">
                <input
                    type="search"
                    id="recherche"
                    class="nav__recherche-input"
                    placeholder="Rechercher un film ou une série..."
                    autocomplete="on"
                    aria-label="Rechercher un film ou une série"
                >
                <button type="submit" classe="nav_recherche_btn" aria-label="faire une recherche">
                <img src="./assets/loupe.svg" width="20" height="20">
                </button>
                <ul class="nav__autocomplete" id="autocomplete" role="listbox" aria-label="Suggestions"></ul>
            </form>

            <button class="nav__burger" id="burger" aria-expanded="false" aria-controls="nav-liens" aria-label="Ouvrir le menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    `

    const burger = document.getElementById('burger')
    const navLiens = header.querySelector('.nav__liens')

    burger?.addEventListener('click', () => {
        const ouvert = navLiens?.classList.toggle('nav__liens--ouvert')
        burger.setAttribute('aria-expanded', ouvert ? 'true' : 'false')
    })
}
