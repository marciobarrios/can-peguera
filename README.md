# Can Peguera, memòria viva

Primera web editorial estática en catalán y castellano. El repositorio es público y los despliegues públicos están autorizados según `AGENTS.md`. El archivo íntegro de investigación se conserva en `research/`, excluido de Git. [Llegiu-me en català](LLEGEIX-ME.md).

## Desarrollo

Requiere Node.js 22.12 o superior (verificado con Node 26.8) y npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run check:content
npm run build
npm run check:images
npm run preview -- --port 4173
```

El build genera `dist/`, con entradas `/ca/` y `/es/`. No necesita backend, claves, analítica ni peticiones externas de datos. Las imágenes y tipografías se sirven localmente. Los enlaces a fuentes abren los sitios originales solo cuando el visitante los sigue.

## Pruebas

Tras generar el build, Playwright inicia y detiene su propia preview en `http://127.0.0.1:4173` si no hay una ya activa:

```sh
npx playwright install chromium --only-shell
npm test
```

Playwright usa un navegador aislado, con proyectos de escritorio y móvil. Los resultados y capturas quedan fuera de Git. Las comprobaciones incluyen ambos idiomas, filtros combinados y vacíos, cronología, mapa/lista, comparador, visor, Escape, historial, foco, reducción de movimiento, enlaces locales y axe WCAG A/AA. Ver `docs/VERIFICACION.md` para las pruebas realmente ejecutadas y sus límites.

## Contenido

- Relato original seleccionado en seis etapas; 31 hitos con fuentes y cautelas.
- Mapa local con el límite municipal del barrio 47 y diez fichas de lugares. Cuatro tienen puntos representativos; seis ofrecen localización documental sin inventar coordenadas, incluido el refugio 647.
- Seis coberturas ICGC comparables. Se conserva la diferencia entre rango de cobertura y fecha de vuelo del punto mostreado.
- 53 fotografías y planos seleccionados, búsqueda y filtros, visor accesible y derechos por pieza. Las 34 fotografías de Marcio cuentan con WebP de hasta 2560 px de lado largo y miniaturas de 720 px; el visor ajusta la foto al espacio disponible en la ventana, con proporciones y descripción visibles. Las imágenes pequeñas también se amplían, sin añadir detalle a la fuente.
- Memoria comunitaria, barrio actual, bibliografía seleccionada, método y criterios de corrección.

Las traducciones editoriales están en `src/content.ts` y en los campos ca/es de los JSON seleccionados. Los títulos bibliográficos y los nombres propios permanecen en su idioma original. No se importa ni se sirve el corpus completo.

## Imágenes y consumo de Vercel

`npm run build` y `npm run dev` preparan los archivos estáticos con `scripts/prepare-images.mjs`; `typecheck` también prepara el manifiesto si es necesario. La galería elige miniaturas o vistas previas de hasta 1280 px de ancho. La portada también dispone de los 2560 px: su `sizes` se calcula con el ancho real pintado por `object-fit: cover`, incluyendo la parte recortada, y el navegador elige según la densidad de pantalla. Se mide antes de asignar las fuentes para evitar una primera descarga de menor resolución y se actualiza al cambiar de tamaño. Las demás ampliaciones del autor se solicitan al abrir su modal, sin precargar las siguientes. Las fotos pequeñas conservan su resolución real.

El build publica las imágenes en `dist/media/` con un hash de contenido en cada nombre. `vercel.json` aplica `Cache-Control: public, max-age=31536000, immutable` solo a esas URLs. Cambiar una imagen cambia su URL; una nueva versión de la web puede reutilizar imágenes sin cambios desde el navegador. Las versiones generadas y su manifiesto se ignoran en Git; los derivados seleccionados de `public/assets/` siguen siendo las entradas auditadas. El manifiesto de derechos publicado se adapta a las URLs finales e incluye las vistas previas. `npm run check:images` valida hashes, tamaños, resolución, atribuciones y la política de caché después del build.

No hay transformaciones de imágenes, funciones ni Blob por visita: Sharp se ejecuta durante la preparación del build. Sí cuentan la transferencia al visitante y las peticiones al CDN, incluso cuando Vercel sirve desde su caché. La caché del navegador evita parte de las visitas repetidas mientras conserve el archivo. Hobby incluye actualmente 100 GB de Fast Data Transfer y un millón de peticiones CDN al mes; hay que considerar el uso conjunto de los proyectos del equipo. Fuentes consultadas el 24/10/2026: [Hobby](https://vercel.com/docs/plans/hobby), [consumo CDN](https://vercel.com/docs/manage-cdn-usage) y [Cache-Control](https://vercel.com/docs/caching/cache-control-headers).

En una prueba local con navegador nuevo, cargar la portada y recorrer todas las fotos de la galería pasó de 25.814.204 a 9.834.268 bytes de imágenes (61,90 % menos), tanto en escritorio Retina 2× como en móvil 3×. Son 57 peticiones; la única ampliación del autor solicitada antes del visor es la portada. Esta carga 525.094 bytes en Retina (382.670 más que su vista previa de 1280 px), con una sola petición de esa imagen; la carga inicial total de imágenes es de 753.832 bytes. En el escritorio de 1440 px a 1× se elige la variante de 1280 px. Son mediciones del recorrido, sin HTML, JS, CSS ni fuentes; no representan el consumo mensual real del equipo. La API de facturación no devolvió datos de consumo en esta revisión: el saldo disponible debe comprobarse en Usage del equipo.

## Derechos y lanzamiento público

Dieciséis imágenes requieren confirmación de reproducción: cuatro municipales de la primera edición y doce incorporaciones de esta ampliación. Marcio autoriza el repositorio y los despliegues públicos de la web, sin requisito de preview privada. Se mantienen los avisos individuales ca/es, autor o depositario y fuente. La autorización de despliegue y los avisos **no** acreditan el permiso de los titulares ni cambian el estado pendiente de estas piezas. Consultar [DERECHOS.md](docs/DERECHOS.md) y `public/asset-rights.json`.

No se aplica una licencia global al corpus ni a las imágenes. `UNLICENSED` en package.json solo declara que este proyecto no concede una licencia global del código. Las licencias CC, ODbL y OFL conservan sus propios términos.

## Separación de investigación y web

`research/` agrupa dossiers, originales, ZIP, catálogos masivos, notas y scripts de investigación. Su índice anterior está en `research/README.md`; la reubicación se explica en `research/REUBICACION_WEB.md`. Los originales se mantienen intactos. Git solo contiene código, contenido y datos seleccionados, derivados usados, atribuciones y documentación técnica.

El proyecto está conectado a Vercel para generar previews de las PR; la política de `AGENTS.md` también permite despliegues públicos. No hay workflow de CI propio. El hook de subida debe comprobar exclusivamente la web y rechazar cualquier corpus o archivo masivo. Nunca usar `--no-verify`.

## Ampliación del 12 de octubre de 2026

Se revisaron las 13 referencias solicitadas y enlaces relacionados. El archivo local `research/ampliacion-2026-10-12/index.html` permite explorar fotografías, planos y vídeos; los CSV/JSON conservan procedencia, descarga, comprobación de archivo y estado de derechos. El contraste editorial está en `research/09_entregas/ampliacion-2026-10-12-contraste.md`. Todo el corpus y los vídeos completos continúan fuera de Git. En la web solo hay selección editorial, 12 nuevos derivados gráficos y enlaces a los reportajes originales.

La revisión distingue las interpretaciones iniciales del refugio en 2022 de las inspecciones y cierres documentados en 2023. Los planos no se presentan como prueba de galerías completamente ejecutadas. Fechas de publicación sin captura identificada se filtran como «Toma sin fecha confirmada».

El estado actual de publicación se rige por `AGENTS.md`. El pre-push admite el repositorio público y las ramas enumeradas en `scripts/verify-push.mjs`, manteniendo el bloqueo del corpus y los controles de rutas, tamaños e historial.
