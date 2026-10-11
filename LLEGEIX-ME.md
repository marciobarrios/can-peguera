# Can Peguera, memòria viva

Web editorial estàtica en català i castellà. Previsualització privada, sense desplegament públic. [Documentació tècnica completa en castellà](README.md).

Inclou sis etapes històriques, 27 fites documentades, mapa del barri 47 amb quatre punts orientatius, comparador de sis cobertures aèries de l’ICGC, vuit fotografies seleccionades, memòria comunitària i fonts. Els controls, avisos, peus, textos alternatius i metadades tenen versió ca/es.

```sh
npm ci
npm run build
npm run preview -- --port 4173
```

Entrades `/ca/` i `/es/`. No necessita servidor de dades, credencials ni analítica. La recerca íntegra és a `research/`, ignorada per Git. Els originals no s’han modificat.

Quatre fotografies municipals tenen l’autorització de reproducció pendent. L’avís individual no substitueix el permís. Cal autoritzar-les o retirar-les abans d’un llançament públic. No s’aplica cap llicència global a les imatges. Consulteu `docs/DERECHOS.md`.
