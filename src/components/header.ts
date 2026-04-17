export function affichageHeader(): void {
    const header = document.getElementById('header')
    if (!header) return

    header.innerHTML = `
        <nav class="nav">
            <a href="./" class="nav_logo" aria-label="Accueil">
                <img src="./assets/logo.svg" alt="" width="40" height="40">
                <span class="nav_logo-texte">Cinetech</span>
            </a>

            <ul class="nav_liens" id="nav-liens">
                <li><a href="./">Accueil</a></li>
                <li><a href="./films.html">Films</a></li>
                <li><a href="./series.html">Séries</a></li>
                <li><a href="./favoris.html">Favoris</a></li>
            </ul>

            <form class="nav_recherche" role="search" id="form-recherche">
                <input
                    type="search"
                    id="recherche"
                    class="nav_recherche-input"
                    placeholder="Rechercher un film ou une série..."
                    autocomplete="on"
                    aria-label="Rechercher un film ou une série"
                >
                <button type="submit" class="nav_recherche-btn" aria-label="faire une recherche">
                    <img src="./assets/loupe.svg" width="20" height="20">
                </button>
                <ul class="nav_autocomplete" id="autocomplete" role="listbox" aria-label="Suggestions"></ul>
            </form>

            <button class="nav_theme" id="theme-toggle" aria-label="Changer le thème">
                <span id="theme-icon">🎬</span>
            </button>

            <button class="nav_burger" id="burger" aria-expanded="false" aria-controls="nav-liens" aria-label="Ouvrir le menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    `

   
    const burger = document.getElementById('burger')
    const navLiens = header.querySelector('.nav_liens')

    burger?.addEventListener('click', () => {
        const ouvert = navLiens?.classList.toggle('nav_liens--ouvert')
        burger.setAttribute('aria-expanded', ouvert ? 'true' : 'false')
    })

    
    const boutonTheme = document.getElementById('theme-toggle') as HTMLButtonElement | null
    const iconeTheme = document.getElementById('theme-icon') as HTMLElement | null
    if (!boutonTheme || !iconeTheme) return

    const preferenceModeSombre = window.matchMedia('(prefers-color-scheme: dark)')

    const themeSauvegarde = localStorage.getItem('theme')
    if (themeSauvegarde === 'sombre' || (!themeSauvegarde && preferenceModeSombre.matches)) {
        document.body.classList.add('sombre')
        iconeTheme.textContent = '🌑'
    }

    boutonTheme.addEventListener('click', () => {
        document.body.classList.toggle('sombre')
        const estSombre = document.body.classList.contains('sombre')
        iconeTheme.textContent = estSombre ? '🌑' : '🎬'
        localStorage.setItem('theme', estSombre ? 'sombre' : 'clair')
    })

    preferenceModeSombre.addEventListener('change', (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('sombre', e.matches)
            iconeTheme.textContent = e.matches ? '🌑' : '🎬'
        }
    })
}
