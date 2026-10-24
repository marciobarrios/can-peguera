# Verificación de la ampliación

## Enlaces salientes (24 de octubre de 2026)

Revisión de los **89 destinos HTTPS distintos** enlazados desde la web: 76 fichas bibliográficas, fuentes de fotografías y puntos del mapa, ortofotos y licencias. Incluye los destinos que aparecen al seleccionar los diez lugares del mapa. Los archivos originales de medios y los servicios WMS del manifiesto de derechos no son enlaces de navegación de la interfaz y no forman parte de este recuento.

Se realizaron peticiones GET con seguimiento de redirecciones, revisión del tipo de contenido y del título de las páginas HTML, buscando también errores servidos con estado 200. La primera pasada obtuvo 75 respuestas 200, cinco 404, tres conexiones rechazadas y seis accesos con restricciones técnicas (cuatro 403 y dos errores de validación TLS del cliente de comprobación). Los HTML y los registros completos se guardan únicamente en `research/link-audit-2026-10-24/`, fuera de Git.

### Correcciones

| Referencias | Problema comprobado | Destino aplicado |
| --- | --- | --- |
| S04 | PDF municipal con 404 | Página oficial de la misma nota de prensa del 28/01/2015; contiene también el enlace actual al PDF. |
| S10 y COM-001 | El servidor HTTPS de canpeguera.com rechaza la conexión; su portada HTTP muestra un dominio registrado | Copia de La Peguera 20 en Internet Archive, captura del 19/06/2025. |
| S29 | Mismo dominio fuera de servicio | Copia de La Peguera 9, captura del 17/05/2024. |
| COM-003 | Mismo dominio fuera de servicio | Copia de La Peguera 8, captura del 02/06/2024. |
| S37 | PDF y ficha del repositorio de Justicia con 404; error confirmado también en navegador | Presentación oficial de la misma edición en Llibres gencat. Se avisa en CA/ES de que se trata de la presentación y de que el PDF original no está disponible. No se ha recuperado el texto íntegro. |
| S47 | Ruta antigua de DSpace UB con 404 | Identificador persistente `https://hdl.handle.net/2445/42615`, que abre la ficha de la tesis con sus cinco archivos, incluido `02.FRR_2de5.pdf`. |
| COM-055 | PDF del Pla de Barris 2025–2028 con 404 | Archivo del mismo nombre en `2025-12`, enlazado desde la página municipal actual del plan. |
| POI01 | Ficha de La Cosa Nostra en Ciutat de la Literatura con 404 | Ficha vigente de Guia Barcelona, con el mismo identificador de equipamiento `99400143979`. |

Son **ocho destinos corregidos en nueve fichas**. Las tres copias de revistas responden con 200; se ha comprobado además que su recurso archivado contiene un PDF real (`application/pdf` y cabecera `%PDF`). Las notas de acceso a Internet Archive se muestran tanto en las citas como en la bibliografía, traducidas a CA/ES. Los documentos completos no se incorporan al repositorio ni a la web.

### Limitaciones de acceso

Se conservan seis enlaces sin declararlos rotos ni darlos por plenamente validados:

| Referencia | Resultado y contraste |
| --- | --- |
| S18 y S43, BCNROC | El cliente Python no valida la cadena TLS. En navegador, las rutas antiguas resuelven mediante DSpace a dos recursos de `api-bcnroc.ajuntament.barcelona.cat`; no se ha verificado la descarga íntegra de los PDFs. |
| S25, CORE | 403 con protección Cloudflare. El índice de búsqueda identifica el PDF y la ficha de Sant Francesc Xavier, pero no confirma su acceso directo actual. |
| S27, MDPI | 403 a la petición directa; el buscador identifica el artículo correcto. |
| S31, Iberley | 403 con protección Cloudflare; el lector web recupera la sentencia correcta. |
| S52, Arxiu Diocesà | 403 con protección Cloudflare; el lector web recupera la página de archivos parroquiales. |

Las cuatro fichas fotográficas del Arxiu Municipal se comprobaron en navegador hasta cargar el título y los datos del documento, para descartar que el 200 correspondiera solo a una página vacía.

### Resultado y validación local

La segunda pasada comprueba **88 destinos distintos** (POI01 ahora comparte URL con COM-040): 82 respuestas 200 y las seis limitaciones anteriores; ningún 404 entre las respuestas obtenidas. Se recorrieron los diez lugares del mapa en CA y ES y se extrajeron los enlaces del DOM: ambos idiomas contienen exactamente los mismos 88 destinos. Comprobadas las cinco notas de acceso traducidas.

ESLint, comprobación de contenido y build con TypeScript correctos. Cuatro pruebas Playwright existentes aprobadas: navegación bilingüe y teclado/accesibilidad/anclas locales, en escritorio y móvil. Los identificadores bibliográficos, el contenido histórico y los créditos y avisos de permisos de las imágenes se conservan. Esta validación corresponde al entorno local; el despliegue de estas correcciones debe comprobarse por separado.

## Nitidez de la portada Retina (24 de octubre de 2026)

- Causa reproducida: la portada estaba limitada a 1280 × 720 y `sizes` solo estimaba el ancho de la caja. El recorte con `object-fit: cover` necesita 1851 px de ancho a 1440 × 1000/2× y 2313 px a 1920 × 1080/2×; la imagen se ampliaba y perdía detalle. El modal ya usaba los 2560 px.
- La portada ofrece ahora 720, 1280 y 2560 px. Se mide el ancho pintado completo (máximo del ancho de caja y alto por proporción de imagen) antes de asignar `srcset`; `ResizeObserver` conserva esa medida al redimensionar o cambiar de idioma. El navegador aplica la densidad. No se generan imágenes mayores ni se amplía la resolución de las fuentes.
- Comprobado: escritorio a 1440 y 1920 px/2×, y móvil 390 px/3× eligen 2560 × 1439; escritorio 1440 px/1× elige 1280 × 720. Una sola petición de portada en cada carga inicial; la galería conserva sus vistas previas. Comparación visual de la misma portada antes/después a 2×.
- Validación: build con TypeScript, ESLint, comprobación de las 158 variantes y 32 pruebas Playwright aprobadas. La nueva prueba cubre píxeles suficientes tras el recorte, una sola petición inicial, redimensionado, cambio de idioma y apertura del visor.
- Coste medido: la foto de portada pasa de 142.424 a 525.094 bytes en Retina (+382.670). Carga inicial de imágenes: 753.832 bytes; recorrido completo: 9.834.268 bytes y 57 peticiones (61,90 % menos que los 25.814.204 iniciales). La portada es la única ampliación del autor antes del modal. Caché y entrega estática no cambian.

## Selección final de portada (24 de octubre de 2026)

- Se utiliza «Les cases i l’horitzó de turons» (`marcio-drone-e2643a21`, 2018), a petición del autor. Título, año, crédito y apertura del visor proceden de la misma ficha bilingüe.
- Build, ESLint y comprobación de las 158 imágenes correctos; seis pruebas específicas de portada, idiomas, colección y descarga de ampliaciones aprobadas en escritorio y móvil después del cambio. Revisión visual de ambos tamaños.
- La nueva portada descarga 371.162 bytes de imágenes en las mediciones 2× y 3×. El recorrido completo sigue en 9.309.174 bytes y 56 peticiones, sin ampliaciones del autor antes de abrir el visor.
- Verificada en Vercel la respuesta 200 de una imagen del despliegue `b972932`: `Content-Type: image/webp` y `Cache-Control: public, max-age=31536000, immutable`.

## Entrega estática y transferencia (24 de octubre de 2026)

- Se detectó que `srcset` podía seleccionar las 35 ampliaciones de 2560 px al recorrer la galería en Retina, antes de abrir el modal. Ahora portada y tarjetas usan vistas previas de hasta 1280 px, con las miniaturas de 720 px como opción menor. La ampliación se carga al abrir su foto; no se precargan las adyacentes.
- 114 archivos de entrada auditados → 158 imágenes estáticas publicadas (44 vistas previas adicionales), 38.274.224 bytes en el artefacto completo. Ese tamaño no se descarga por visita. Generación durante el build, sin funciones, Blob ni Image Optimization de Vercel en ejecución. Los generados se ignoran en Git.
- URLs con hash SHA-256 de contenido y caché de navegador de un año solo para `/media/`. El manifiesto de derechos publicado enlaza todas las variantes finales; se eliminan las copias sin versión del artefacto de producción. HTML conserva su política de actualización independiente.
- Medición en Chromium nuevo, escritorio de 1440 × 1000 a 2× y móvil de 390 × 844 a 3×: portada 972.130 → 408.628 bytes de imágenes; recorrido completo de la galería 25.814.204 → 9.309.174 bytes (63,94 % menos), con 56 peticiones. No incluye los otros recursos ni aperturas posteriores de fotos. No se obtuvo consumo acumulado del equipo desde la API de facturación (`costs_not_found`); no se interpreta como consumo cero.
- Build, TypeScript, ESLint, contenido y comprobación del artefacto correctos. 30 pruebas Playwright aprobadas (15 escritorio y 15 móvil Chromium), incluidas carga de todas las variantes, acceso a 2560 px solo al abrir, avisos y créditos, dos idiomas, tamaños Retina, verticales sin scroll, teclado, historial y axe. La comprobación estática valida los hashes contra los archivos servidos, la resolución sin ampliación artificial, las 158 atribuciones y la regla de caché. Safari/iOS real y Firefox no probados.

## Ampliaciones de 2560 px y descripción visible (24 de octubre de 2026)

- Se regeneran las 35 ampliaciones de la colección de Marcio desde sus originales con orientación EXIF, sRGB, `-resize '2560x2560>'`, calidad WebP 80 y método 6, sin EXIF/XMP incrustados. 34 alcanzan 2560 px de lado largo; `Drone view/IMG_0415.JPG` conserva sus 2280 × 2280 px originales, sin ampliación artificial. Los 37 originales mantienen sus SHA-256 anteriores; las miniaturas de 720 px y la selección aprobada se conservan.
- Los 70 WebP utilizados de Marcio ocupan 23.825.876 bytes; las 114 imágenes de la web suman 30.718.782 bytes. La ampliación mayor ocupa 1.252.110 bytes. El límite individual de 1,3 MB se aplica únicamente a las ampliaciones de Marcio ya incluidas en la lista permitida; el resto conserva 600 kB. Presupuesto de contenido: 31,5 MB; árbol Git: 150 archivos / 32 MB. Se actualizan las anchuras de `srcset` y los tamaños del manifiesto.
- La descripción completa se muestra al abrir, junto al año, título, créditos y avisos de derechos. El visor mide el alto real del texto antes de ajustar la imagen al espacio restante. En ventanas de al menos 700 px de ancho y hasta 600 px de alto, el texto pasa al lado para conservar una altura útil para la foto. El cálculo se repite al redimensionar, cambiar la densidad, navegar, cambiar de idioma y terminar de cargar las fuentes.
- El tamaño sigue limitado a los píxeles reales del archivo, incluida la densidad de pantalla. Con 2560 px se admiten hasta 1280 px CSS en Retina 2×, si caben en la ventana. En una prueba de 1440 × 1000, la imagen horizontal pasa de 800 a unos 1240 px CSS con la descripción visible; las verticales se limitan por el alto disponible.
- TypeScript, ESLint, contenido y build aprobados. 28 pruebas Playwright aprobadas (14 escritorio y 14 móvil emulado en Chromium): idiomas, navegación, foco, derechos, axe, dimensiones en densidades 1×/2×/3×, descripción visible, ausencia de scroll en las vistas comprobadas y redimensionado de Sant Joan a 320 × 568 y 900 × 420, además de carga lenta y fallida.
- Revisión visual local de paisaje y vertical en Retina 2×, móvil 3× y ventana de 900 × 420. Capturas comparativas en `test-results/`, ignoradas por Git. Safari/iOS real y Firefox no probados.
- El control de subida admite un derivado seleccionado de 1.252.110 bytes y rechaza ampliaciones sobre 1,3 MB, miniaturas y otras fotos sobre 600 kB, derivados desconocidos, originales JPEG, corpus, enlaces simbólicos y un árbol superior a 32 MB. El hook sigue activo.

Los registros siguientes describen la incorporación inicial y sus presupuestos anteriores a la ampliación a 2560 px.

## Colección de Marcio Barrios Lesmes (24 de octubre de 2026)

- Se inventariaron 37 originales (14 de dron y 23 restantes), todos con `DateTimeOriginal`. Los 37 SHA-256 coinciden después de la conversión; no hay duplicados binarios.
- Conversión local con ImageMagick: orientación EXIF, sRGB, miniaturas de 720 px de ancho a calidad 77 y ampliaciones de hasta 1600 × 1600 px a calidad 80, método WebP 6, sin metadatos incrustados ni edición generativa. 118.733.425 bytes de originales → 13.149.390 bytes entre los 74 WebP (88,93 % menos).
- Selección aprobada por el autor: se excluyen `IMG_5032.jpg` e `IMG_5116.jpg` de la web, conservando sus derivados localmente; se incluyen las 14 de dron. Las 35 fotos seleccionadas ocupan 12.034.672 bytes entre miniaturas y ampliaciones. Se retiran los dos derivados de `street`.
- La galería suma 54 piezas; 35 con permiso del autor, tres con licencia y dieciséis pendientes. 114 derivados totales / 18.927.578 bytes; ninguno supera 600 kB. Presupuesto de contenido: 19,5 MB. Pre-push: 150 archivos / 20 MB, con únicamente los 35 nombres nuevos y la rama de esta PR añadidos a las listas permitidas.
- TypeScript, ESLint, contenido y build Vite aprobados. La comprobación de contenido valida fechas, procedencia, créditos, correspondencia exacta entre galería, manifiesto y archivos, orientación, anchuras reales de `srcset` y ausencia de EXIF/XMP en los nuevos WebP.
- 18 pruebas Playwright aprobadas (9 escritorio y 9 móvil emulado en Chromium), incluidos ambos idiomas, autor/fecha, 14 resultados de dron, filtros de permisos separados, descripción de Sant Joan, visor vertical, todas las ampliaciones, recursos sin errores, navegación, foco, historial y axe WCAG A/AA. Tras actualizar la fecha editorial y mejorar la espera de carga de las capturas, se repitieron con éxito el build y las dos pruebas de la colección de autor.
- Revisión visual local de portada, galería de dron y visor de Sant Joan en escritorio y móvil. Capturas `*-drone.png` y `*-sant-joan-es.png` en `test-results/`, fuera de Git. No se afirma validación en Safari/iOS real ni Firefox.
- El control de subida admite la instantánea seleccionada de 145 archivos y rechaza, en un repositorio temporal, corpus, JPEG original, ZIP, un derivado descartado, un archivo de más de 600 kB y un enlace simbólico. El hook permanece activo; no se omiten controles ni se suben originales.
- Trabajo aislado desde `origin/main` (`10d4f6c`); los cambios previos del checkout principal se preservan. Los registros siguientes son históricos.

Nota de política vigente (23 de octubre de 2026): `AGENTS.md` autoriza el repositorio público y los despliegues públicos, sin requisito de preview privada. El hook conserva los controles de corpus, rutas, tamaños e historial. Los registros fechados que siguen describen las condiciones de las verificaciones del 11 y 12 de octubre; sus referencias a un destino privado o a requisitos previos al lanzamiento son históricas y no sustituyen la política actual. El estado pendiente de los permisos de las imágenes se mantiene.

Fecha: 12 de octubre de 2026. Comprobaciones locales de la ampliación; preview protegida de Vercel autorizada para revisión.

- TypeScript, lint, comprobación de contenido y build correctos.
- 14 pruebas de navegador aprobadas: siete en escritorio y siete en móvil emulado, ambos Chromium. Axe sin infracciones automáticas en ca/es.
- 31 hitos, 20 imágenes, 76 fuentes bibliográficas, diez fichas de lugares (cuatro marcadores y seis localizaciones documentales) y seis coberturas aéreas.
- Se comprobó la selección y traducción del refugio, ausencia de coordenadas inventadas, aviso de derechos en su imagen, búsqueda por «refugio», nueve piezas sin fecha de captura y conservación de los filtros.
- Recorridos de visor, foco, teclado, historial, comparador y carga de imágenes aprobados. No se detectaron solicitudes externas durante el recorrido.
- 46 derivados WebP: 7.086.190 bytes. Cada archivo sigue por debajo de 600 kB. El presupuesto de derivados se ajusta a 7,5 MB; el control pre-push mantiene 8 MB y 80 archivos por árbol y añade únicamente doce nombres de derivados seleccionados a su lista exacta. Corpus y vídeos no son rutas autorizadas.
- Control de subida probado en un repositorio temporal: admite el árbol candidato de 77 archivos, por debajo del límite de 8 MB y rechaza una incorporación de `research/corpus.txt`. Sin modificar el índice del repositorio de trabajo.
- Revisión visual de imágenes, galería y fichas; preview local abierta en el navegador integrado. No se afirma cobertura Safari/iOS real ni Firefox.

Las capturas actuales sustituyen las capturas de pruebas de la edición inicial; los informes de investigación permanecen en `research/`, ignorado por Git. Los 18 vídeos descargados tienen comprobación de contenedor/pistas y SHA-256; no se afirma su visionado íntegro. Dos reproductores antiguos de Blogger no pudieron extraerse y figuran como incidencias.

## Preparación de la PR

La PR se prepara desde `origin/main` en un worktree independiente. El hook sigue activo y admite únicamente `main` y `codex/can-peguera-research-expansion`, con el mismo nombre de rama en ambos lados, sin borrados ni force-push. Conserva todos los controles de destino privado, rutas, corpus, tamaño y revisión del historial. Se retira el bloqueo de despliegues automáticos para generar la preview de la PR. El proyecto Vercel `can-peguera` tiene autenticación activa (`all_except_custom_domains`), que protege las URLs de preview de `vercel.app`. No se fusiona la PR ni se despliega a producción. La lista de rutas del hook conserva `vercel.json` porque sigue presente en un commit anterior que también debe inspeccionarse.

## Registro de la primera edición (11 de octubre)

Fecha: 11 de octubre de 2026. Web estática de revisión privada; no se ha desplegado públicamente.

## Resultado

- `npm ci --ignore-scripts`: instalación reproducible desde el lockfile; auditoría npm sin vulnerabilidades reportadas.
- `npm run build`: TypeScript estricto y build Vite correctos; entradas `/ca/` y `/es/` generadas.
- `npm run lint` y `npm run check:content`: correctos.
- `npm test`: 14 pruebas aprobadas, siete en escritorio y siete en móvil emulado, en Chromium aislado.
- Inspección visual de las portadas, historia, mapa, comparador, archivo, vecindario y visor. Fotografías seleccionadas cotejadas visualmente; texto alternativo del reloj de sol corregido para describir su pedestal.

## Recorridos comprobados

Cambio repetido CA/ES, URL, metadatos, traducción de estados vacíos y conservación de filtros; los seis capítulos y sus controles; 27 hitos, filtros por etapa y actividad futura rotulada como prevista; búsqueda y filtros combinados; cuatro puntos con paridad mapa/listado; ampliación del mapa; coberturas aéreas, fechas de vuelo y vista paralela; arrastre del comparador y rango operable por teclado; apertura y cierre repetido del visor, cambio de idioma, anterior/siguiente, Escape, retorno del foco y navegación atrás/adelante.

Se verificaron navegación por teclado, menú móvil, reducción de movimiento, anclas internas, carga de imágenes, ausencia de errores de ejecución y recursos HTTP fallidos y ausencia de solicitudes a dominios externos durante el recorrido. Las fuentes externas son enlaces de consulta; no se ha revalidado la disponibilidad de los 58 destinos ni se han reintentado accesos a BCNROC.

Axe no detectó infracciones de las reglas automáticas WCAG 2 A/AA y 2.1 AA evaluadas en las dos versiones lingüísticas. Esto no constituye una certificación ni sustituye pruebas con lectores de pantalla y personas reales. El proyecto móvil usa las dimensiones y entrada móvil de iPhone 13 sobre Chromium; Safari/iOS y Firefox no se han probado.

## Tamaño y recursos

22 derivados WebP: 5.014.490 bytes en total; cada archivo queda por debajo de 600 kB. Ocho fotografías con dos tamaños y seis imágenes aéreas. JS generado: aproximadamente 82,5 kB, 27,9 kB gzip. CSS: aproximadamente 25,6 kB, 6,5 kB gzip. Tipografías locales; carga diferida de imágenes fuera de portada. No se declara una puntuación Lighthouse ni rendimiento medido en un móvil físico.

Las capturas y trazas se conservan localmente en `test-results/` y el informe navegable en `playwright-report/`, ambos ignorados por Git. Archivos útiles: `desktop-ca-home.png`, `mobile-ca-home.png`, `desktop-full.png`, `mobile-full.png`, las series `*-review-*.png` y `*-lightbox.png`.

## Preservación y subida

Los 204 archivos anteriores del proyecto conservan el SHA-256 registrado en `research/PRESERVACION_WEB.json`. La investigación, los originales, PDFs y ZIP permanecen fuera del árbol de Git. No se ha modificado otro proyecto.

El hook `.githooks/pre-push` permanece activo mediante `core.hooksPath=.githooks`. Valida el repositorio personal privado `marciobarrios/can-peguera`, permite únicamente actualizar `main`, rechaza borrados y cambios sin avance de historial, inspecciona todos los árboles de los commits y solo admite las rutas seleccionadas de esta web. Rechaza enlaces simbólicos, submódulos, archivos mayores de 600 kB, árboles de más de 80 archivos o de 8 MB. Se probaron en un repositorio temporal una web admitida y rechazos de corpus, ZIP, enlace simbólico y archivo grande. No se usó `--no-verify` ni se retiró el control.

No había CI existente ni se ha configurado despliegue automático. El estado del commit y del remoto se comprueba después de la subida y se comunica en la entrega, sin afirmar que haya un pipeline aprobado cuando no existe.

## Pendiente para publicación abierta

Confirmar o retirar las cuatro fotografías municipales con autorización de reproducción pendiente; sus avisos bilingües no son permisos. Completar revisión editorial humana y de traducción, verificación presencial de accesos del mapa si se necesitan y pruebas de accesibilidad asistida. La actividad del 25 de octubre de 2026 sigue presentada como programada.
