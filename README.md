# Can Peguera, memòria viva

Primera web editorial estática en catalán y castellano. Preview privada: no está autorizada su publicación abierta. El archivo íntegro de investigación se conserva en `research/`, excluido de Git. [Llegiu-me en català](LLEGEIX-ME.md).

## Desarrollo

Requiere Node.js 22.12 o superior (verificado con Node 26.8) y npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run check:content
npm run build
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

- Relato original seleccionado en seis etapas; 27 hitos con fuentes y cautelas.
- Mapa local con el límite municipal del barrio 47 y cuatro puntos representativos; no son puertas de acceso verificadas. No se inventa una ubicación del refugio.
- Seis coberturas ICGC comparables. Se conserva la diferencia entre rango de cobertura y fecha de vuelo del punto mostreado.
- Ocho fotografías seleccionadas, búsqueda y filtros, visor accesible y derechos por pieza.
- Memoria comunitaria, barrio actual, bibliografía seleccionada, método y criterios de corrección.

Las traducciones editoriales están en `src/content.ts` y en los campos ca/es de los JSON seleccionados. Los títulos bibliográficos y los nombres propios permanecen en su idioma original. No se importa ni se sirve el corpus completo.

## Derechos y lanzamiento público

Cuatro imágenes municipales requieren confirmación de reproducción. Marcio ha autorizado su uso en esta preview privada y su inclusión en la web dentro del repositorio privado, con aviso individual. El aviso **no** es un permiso del titular. No desplegar esta edición públicamente sin revisar y autorizar o retirar esas piezas. Consultar [DERECHOS.md](docs/DERECHOS.md) y `public/asset-rights.json`.

No se aplica una licencia global al corpus ni a las imágenes. `UNLICENSED` en package.json solo declara que este proyecto no concede una licencia global del código. Las licencias CC, ODbL y OFL conservan sus propios términos.

## Separación de investigación y web

`research/` agrupa dossiers, originales, ZIP, catálogos masivos, notas y scripts de investigación. Su índice anterior está en `research/README.md`; la reubicación se explica en `research/REUBICACION_WEB.md`. Los originales se mantienen intactos. Git solo contiene código, contenido y datos seleccionados, derivados usados, atribuciones y documentación técnica.

No hay despliegue automático ni workflow de CI en esta primera edición. El hook de subida debe comprobar exclusivamente la web y rechazar cualquier corpus o archivo masivo. Nunca usar `--no-verify`.
