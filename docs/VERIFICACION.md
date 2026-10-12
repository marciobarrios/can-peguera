# Verificación de la ampliación

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
