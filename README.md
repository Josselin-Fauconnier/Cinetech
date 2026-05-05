# Cinetech

 Exercice dont le but est de faire un  site  web de catalogue de films et documentaires , avec système de favoris et de commentaires.

## Technologies

- TypeScript (compilé vers `dist/`)
- API TMDB (via proxy PHP)
- HTML / CSS vanilla

## Structure du projet

```
src/
├── pages/        # home, films, series, film, serie, favoris
├── components/   # header, footer, carteFilm, carteSerie
├── services/     # tmdb.ts (appels API), config.ts
├── utils/        # favoris.ts, commentaires.ts
└── types/        # movie, serie, pays, avis, distribution
proxy.php          # proxy TMDB pour cacher le token API
```


## Installation

1. Cloner le repo et le mettre dans un serveur local PHP (ex : Laragon `www/``…)

2. Créer un fichier `.env` à la racine du projet :
   ```
   TMDB_TOKEN=votre_clé_api_tmdb
   ```

3. Créer `src/services/config.ts` :
   ```ts
   export const TMDB_PROXY_URL = './proxy.php'
   export const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500'
   ```

4. Installer les dépendances et compiler le TypeScript :
   ```bash
   npm install
   npm run build
   ```
   > Ca va  génèrer le dossier `dist/` contenant les fichiers JavaScript utilisés par les pages HTML.
  

5. Accéder au projet via le serveur local (ex : `http://localhost/Cinetech/`)

```

## Fonctionnalités

- Catalogue films et séries (données TMDB)
- Pages détail avec casting, notes et description
- Système de favoris (localStorage)
- Commentaires par film / documentaire

## Crédits

### Logo
- Source : [SVG Silh - Image #159581](https://svgsilh.com/fr/000000/image/159581.html)
- Licence : [CC0 1.0 Universal (Domaine public)](https://creativecommons.org/publicdomain/zero/1.0/)

### Icône loupe
- Source : [SVG Silh - Image #189254](https://svgsilh.com/fr/image/189254.html)
- Licence : [CC0 1.0 Universal (Domaine public)](https://creativecommons.org/publicdomain/zero/1.0/)

### Icône notation
- Source : [SVG Silh - Image #2451996](https://svgsilh.com/fr/ffeb3b/image/2451996.html)
- Licence : [CC0 1.0 Universal (Domaine public)](https://creativecommons.org/publicdomain/zero/1.0/)
