export function affichageFooter(): void {
    const footer = document.getElementById('footer')
    if (!footer) return

    footer.innerHTML = `
        <div class="footer">
            <ul class="footer_liens">
                <li><a href="./">Accueil</a></li>
                <li><a href="./films.html">Films</a></li>
                <li><a href="./series.html">Séries</a></li>
                <li><a href="./favoris.html">Favoris</a></li>
            </ul>
        </div>
    `
}
