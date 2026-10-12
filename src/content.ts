export type Lang = "ca" | "es";
export type Bilingual = Record<Lang, string>;
export const bi = (ca: string, es: string): Bilingual => ({ ca, es });
export const copy = {
  tagline: bi("Memòria viva", "Memoria viva"),
  skip: bi("Salta al contingut", "Saltar al contenido"),
  menu: bi("Obre el menú", "Abrir menú"),
  closeMenu: bi("Tanca el menú", "Cerrar menú"),
  nav: [
    bi("Història", "Historia"),
    bi("Cronologia", "Cronología"),
    bi("El barri", "El barrio"),
    bi("Abans i ara", "Antes y ahora"),
    bi("Arxiu", "Archivo"),
    bi("Veïnat", "Vecindario"),
    bi("Fonts", "Fuentes"),
  ],
  heroIntro: bi(
    "Les cases, la vida quotidiana i la història compartida d’un barri de Barcelona.",
    "Las casas, la vida cotidiana y la historia compartida de un barrio de Barcelona.",
  ),
  heroBody: bi(
    "Un recorregut per les fotografies i els documents de Can Peguera. Dels orígens de les cases barates a l’organització veïnal i als debats sobre el seu futur.",
    "Un recorrido por las fotografías y los documentos de Can Peguera. De los orígenes de las casas baratas a la organización vecinal y a los debates sobre su futuro.",
  ),
  begin: bi("Recorre la història", "Recorre la historia"),
  explore: bi("Mira les fotografies", "Mira las fotografías"),
  preview: bi(
    "Previsualització en revisió. Algunes imatges tenen autorització de reproducció pendent.",
    "Previsualización en revisión. Algunas imágenes tienen autorización de reproducción pendiente.",
  ),
  place: bi("Nou Barris, Barcelona", "Nou Barris, Barcelona"),
  introTitle: bi("Un lloc on quedar-se.", "Un lugar donde quedarse."),
  intro: bi(
    "A Can Peguera, la història de les cases és també la de les persones que han defensat poder-hi viure. Aquest projecte neix del vincle d’en Marcio amb el barri on va créixer i busca acostar aquesta memòria a qui hi viu, a qui en va marxar i a qui tot just el descobreix.",
    "En Can Peguera, la historia de las casas es también la de las personas que han defendido poder vivir en ellas. Este proyecto nace del vínculo de Marcio con el barrio donde creció y busca acercar esa memoria a quienes viven aquí, a quienes se marcharon y a quienes lo descubren ahora.",
  ),
  historyTitle: bi("Una història que continua", "Una historia que continúa"),
  historyIntro: bi(
    "Sis etapes per llegir les transformacions del barri. Les dates no sempre expliquen el mateix: construir, habitar, aprovar i recordar són processos diferents.",
    "Seis etapas para leer las transformaciones del barrio. Las fechas no siempre explican lo mismo: construir, habitar, aprobar y recordar son procesos diferentes.",
  ),
  allChapters: bi("Llegeix totes les etapes", "Leer todas las etapas"),
  oneChapter: bi(
    "Torna a la lectura per etapes",
    "Volver a la lectura por etapas",
  ),
  sources: bi("Fonts", "Fuentes"),
  readSource: bi("Consulta la font", "Consultar la fuente"),
  timelineTitle: bi(
    "Les dates, amb els seus matisos",
    "Las fechas, con sus matices",
  ),
  timelineIntro: bi(
    "31 fites documentades. Obre cada entrada per llegir-ne les fonts i els límits. També es poden llegir totes en ordre, sense moure cap línia de temps.",
    "31 hitos documentados. Abre cada entrada para leer sus fuentes y límites. También se pueden leer todos en orden, sin mover ninguna línea de tiempo.",
  ),
  all: bi("Totes", "Todas"),
  allEvents: bi("Totes les èpoques", "Todas las épocas"),
  eras: {
    origins: bi("Abans de 1931", "Antes de 1931"),
    republic: bi("1931–1939", "1931–1939"),
    postwar: bi("1939–1972", "1939–1972"),
    neighbors: bi("1973–2014", "1973–2014"),
    present: bi("2015–2026", "2015–2026"),
  },
  events: bi("fites", "hitos"),
  scheduled: bi("Activitat prevista", "Actividad prevista"),
  uncertain: bi(
    "Amb aspectes pendents de contrast",
    "Con aspectos pendientes de contraste",
  ),
  mapTitle: bi("El barri, a peu de mapa", "El barrio, a pie de mapa"),
  mapIntro: bi(
    "Deu llocs per llegir el barri: cases, escola, refugi i espais de trobada. Quatre tenen una posició cartogràfica; els altres s’expliquen a la llista amb la seva localització documental.",
    "Diez lugares para leer el barrio: casas, escuela, refugio y espacios de encuentro. Cuatro tienen una posición cartográfica; los demás se explican en la lista con su localización documental.",
  ),
  mapAlt: bi(
    "Ortofotografia de Can Peguera de la cobertura ICGC 2025, amb el límit del barri 47.",
    "Ortofotografía de Can Peguera de la cobertura ICGC 2025, con el límite del barrio 47.",
  ),
  mapLegend: bi(
    "Límit municipal del barri 47 (arxiu de 2025)",
    "Límite municipal del barrio 47 (archivo de 2025)",
  ),
  mapHint: bi(
    "Punts orientatius, no accessos topogràficament verificats. El límit actual no és el perímetre de 1929.",
    "Puntos orientativos, no accesos topográficamente verificados. El límite actual no es el perímetro de 1929.",
  ),
  zoomIn: bi("Amplia el mapa", "Ampliar mapa"),
  zoomOut: bi("Redueix el mapa", "Reducir mapa"),
  resetMap: bi("Vista completa", "Vista completa"),
  mapList: bi("Llocs del barri", "Lugares del barrio"),
  mapScroll: bi(
    "Amb el mapa ampliat, desplaça la vista amb les barres de desplaçament o les fletxes del teclat.",
    "Con el mapa ampliado, desplaza la vista con las barras de desplazamiento o las flechas del teclado.",
  ),
  precision: bi(
    "Posició representativa d’OpenStreetMap via Mapcarta. No garanteix la porta d’accés.",
    "Posición representativa de OpenStreetMap vía Mapcarta. No garantiza la puerta de acceso.",
  ),
  compareTitle: bi(
    "El mateix tros de ciutat. Un altre temps.",
    "El mismo trozo de ciudad. Otro tiempo.",
  ),
  compareIntro: bi(
    "Mou el separador per comparar el barri i el seu entorn. Les sis cobertures comparteixen enquadrament i coordenades; la fotografia antiga conserva els límits del seu detall original.",
    "Mueve el separador para comparar el barrio y su entorno. Las seis coberturas comparten encuadre y coordenadas; la fotografía antigua conserva los límites de su detalle original.",
  ),
  before: bi("Cobertura anterior", "Cobertura anterior"),
  after: bi("Cobertura recent", "Cobertura reciente"),
  slider: bi(
    "Percentatge visible de la cobertura anterior",
    "Porcentaje visible de la cobertura anterior",
  ),
  sideBySide: bi(
    "Veure una al costat de l’altra",
    "Ver una al lado de la otra",
  ),
  overlay: bi("Torna al comparador", "Volver al comparador"),
  sampleDate: bi(
    "Data de vol al punt mostrejat",
    "Fecha de vuelo en el punto muestreado",
  ),
  compareNote: bi(
    "La data local correspon a un punt mostrejat al centre del conjunt, no a tots els píxels. Enquadrament de 800 × 800 m, EPSG:25831. «2025» és la cobertura més recent d’aquest arxiu, no una imatge en directe.",
    "La fecha local corresponde a un punto muestreado en el centro del conjunto, no a todos los píxeles. Encuadre de 800 × 800 m, EPSG:25831. «2025» es la cobertura más reciente de este archivo, no una imagen en directo.",
  ),
  aerialAlt: bi(
    "Vista aèria de Can Peguera i el seu entorn. Cobertura",
    "Vista aérea de Can Peguera y su entorno. Cobertura",
  ),
  aerialCredit: bi(
    "Institut Cartogràfic i Geològic de Catalunya (ICGC). Retall, reducció i compressió WebP. Cobertures 1945–1946 i 1956–1957: Army Map Service / Ministeri de Defensa CECAF–CEGET; ortorectificació ICGC.",
    "Institut Cartogràfic i Geològic de Catalunya (ICGC). Recorte, reducción y compresión WebP. Coberturas 1945–1946 y 1956–1957: Army Map Service / Ministerio de Defensa CECAF–CEGET; ortorrectificación ICGC.",
  ),
  archiveTitle: bi("Mirades que es queden", "Miradas que se quedan"),
  archiveIntro: bi(
    "Vint imatges per mirar el barri: construcció, escola, vida al carrer i refugi antiaeri. Fotografies i plànols amb procedència individual; quan només coneixem la data de publicació, la presa consta com a no datada.",
    "Veinte imágenes para mirar el barrio: construcción, escuela, vida en la calle y refugio antiaéreo. Fotografías y planos con procedencia individual; cuando solo conocemos la fecha de publicación, la toma consta como no fechada.",
  ),
  search: bi("Cerca a l’arxiu", "Buscar en el archivo"),
  searchPlaceholder: bi(
    "Un lloc, un autor, una data…",
    "Un lugar, un autor, una fecha…",
  ),
  topic: bi("Tema", "Tema"),
  period: bi("Època", "Época"),
  rights: bi("Drets", "Derechos"),
  allTopics: bi("Tots els temes", "Todos los temas"),
  allPeriods: bi("Totes les èpoques", "Todas las épocas"),
  allRights: bi("Tots els estats", "Todos los estados"),
  licensed: bi("Llicència comprovada", "Licencia comprobada"),
  pendingShort: bi("Autorització pendent", "Autorización pendiente"),
  topics: {
    houses: bi("Cases i paisatge", "Casas y paisaje"),
    life: bi("Vida veïnal", "Vida vecinal"),
    places: bi("Llocs i detalls", "Lugares y detalles"),
  },
  found: bi("imatges", "imágenes"),
  emptyTitle: bi(
    "No hi ha imatges amb aquests filtres",
    "No hay imágenes con estos filtros",
  ),
  emptyBody: bi(
    "Prova una altra paraula o restableix els filtres per veure tota la selecció.",
    "Prueba otra palabra o restablece los filtros para ver toda la selección.",
  ),
  reset: bi("Restableix els filtres", "Restablecer filtros"),
  openImage: bi("Amplia la imatge", "Ampliar imagen"),
  close: bi("Tanca la imatge", "Cerrar imagen"),
  previous: bi("Imatge anterior", "Imagen anterior"),
  next: bi("Imatge següent", "Imagen siguiente"),
  unknownAuthor: bi(
    "Autoria desconeguda segons la fitxa",
    "Autoría desconocida según la ficha",
  ),
  pending: bi(
    "Autorització de reproducció pendent. Abans de publicar aquesta imatge, cal confirmar el permís de la font o del titular dels drets.",
    "Autorización de reproducción pendiente. Antes de publicar esta imagen, debe confirmarse el permiso de la fuente o del titular de los derechos.",
  ),
  resized: bi(
    "Derivat reduït i comprimit en WebP.",
    "Derivado reducido y comprimido en WebP.",
  ),
  shareAlike: bi(
    "Les adaptacions mantenen la mateixa llicència o una de compatible.",
    "Las adaptaciones mantienen la misma licencia o una compatible.",
  ),
  neighborsTitle: bi(
    "La memòria també es fa avui",
    "La memoria también se hace hoy",
  ),
  neighborsIntro: bi(
    "Un barri habitat no es conserva només amb façanes. Els espais compartits, les cures i les decisions del veïnat formen part de la seva història.",
    "Un barrio habitado no se conserva solo con fachadas. Los espacios compartidos, los cuidados y las decisiones del vecindario forman parte de su historia.",
  ),
  todayTitle: bi("Conservar i poder-hi viure", "Conservar y poder vivir aquí"),
  todayBody: bi(
    "La modificació urbanística de 2015 va obrir una etapa de preservació, però el debat sobre l’habitabilitat continua. L’acta de juny de 2025 recull propostes de reconstrucció de tipologies; no acredita un projecte complet aprovat. El 28 de juliol de 2026, 23:45 Arquitectes va anunciar acabada la prova pilot de vuit cases. És l’anunci del seu equip, no la rehabilitació del conjunt ni una prova del retorn de les famílies.",
    "La modificación urbanística de 2015 abrió una etapa de preservación, pero el debate sobre la habitabilidad continúa. El acta de junio de 2025 recoge propuestas de reconstrucción de tipologías; no acredita un proyecto completo aprobado. El 28 de julio de 2026, 23:45 Arquitectes anunció terminada la prueba piloto de ocho casas. Es el anuncio de su equipo, no la rehabilitación del conjunto ni una prueba del retorno de las familias.",
  ),
  voicesTitle: bi(
    "Escoltar les veus existents",
    "Escuchar las voces existentes",
  ),
  voicesBody: bi(
    "Aquesta edició enllaça treballs publicats pels seus autors. No conté entrevistes pròpies ni testimonis reconstruïts.",
    "Esta edición enlaza trabajos publicados por sus autores. No contiene entrevistas propias ni testimonios reconstruidos.",
  ),
  methodsTitle: bi("D’on surt aquest relat", "De dónde sale este relato"),
  methodsIntro: bi(
    "Un arxiu útil també explica el que encara no sap. La recerca combina documents públics, estudis, premsa, imatges i memòria veïnal, amb una font per a cada afirmació.",
    "Un archivo útil también explica lo que todavía no sabe. La investigación combina documentos públicos, estudios, prensa, imágenes y memoria vecinal, con una fuente para cada afirmación.",
  ),
  method1Title: bi("Dates amb context", "Fechas con contexto"),
  method1: bi(
    "Distingim fets, anuncis, propostes i testimonis. Mantenim els intervals i les discrepàncies: la substitució de la masia, per exemple, no té aquí una data única resolta.",
    "Distinguimos hechos, anuncios, propuestas y testimonios. Mantenemos los intervalos y las discrepancias: la sustitución de la masía, por ejemplo, no tiene aquí una fecha única resuelta.",
  ),
  method2Title: bi("Drets per peça", "Derechos por pieza"),
  method2: bi(
    "L’accés a una imatge no és permís de reproducció. Aquesta preview privada inclou setze peces amb autorització pendent, amb avís individual. Cal revisar-les abans d’obrir la web al públic. No hi ha una llicència global sobre les imatges.",
    "El acceso a una imagen no es permiso de reproducción. Esta preview privada incluye dieciséis piezas con autorización pendiente, con aviso individual. Deben revisarse antes de abrir la web al público. No hay una licencia global sobre las imágenes.",
  ),
  method3Title: bi("Una recerca oberta", "Una investigación abierta"),
  method3: bi(
    "No s’han esgotat els arxius físics, familiars ni els fons no digitalitzats. BCNROC queda pendent per un límit d’accés. Els dossiers extensos i els originals es conserven en l’arxiu local, fora del repositori de la web.",
    "No se han agotado los archivos físicos, familiares ni los fondos no digitalizados. BCNROC queda pendiente por un límite de acceso. Los dossiers extensos y los originales se conservan en el archivo local, fuera del repositorio de la web.",
  ),
  bibliography: bi(
    "Bibliografia i fonts d’aquesta edició",
    "Bibliografía y fuentes de esta edición",
  ),
  correctionsTitle: bi(
    "Un lloc per a les correccions",
    "Un lugar para las correcciones",
  ),
  corrections: bi(
    "Si hi detectes un error, conserva el títol de la peça, l’enllaç de la font i la correcció proposada per compartir-los amb l’impulsor del projecte. Encara no hi ha un canal públic d’aportacions; aquesta web no recull dades personals.",
    "Si detectas un error, conserva el título de la pieza, el enlace de la fuente y la corrección propuesta para compartirlos con el impulsor del proyecto. Todavía no hay un canal público de aportaciones; esta web no recoge datos personales.",
  ),
  credits: bi(
    "Impulsat per Marcio. Recerca documental assistida i selecció editorial en revisió. Fotografies i cartografia acreditades al costat de cada peça.",
    "Impulsado por Marcio. Investigación documental asistida y selección editorial en revisión. Fotografías y cartografía acreditadas junto a cada pieza.",
  ),
  date: bi(
    "Edició del 12 d’octubre de 2026",
    "Edición del 12 de octubre de 2026",
  ),
  top: bi("Torna a l’inici", "Volver al inicio"),
  nojs: bi(
    "Aquesta edició interactiva necessita JavaScript. Les fonts originals continuen accessibles als seus llocs web.",
    "Esta edición interactiva necesita JavaScript. Las fuentes originales siguen accesibles en sus sitios web.",
  ),
};

export const chapters = [
  {
    period: "Abans de 1929",
    date: bi("Abans de 1929", "Antes de 1929"),
    title: bi("Abans de les cases, la terra", "Antes de las casas, la tierra"),
    sources: ["S08", "S09", "S01", "S45", "S05"],
    body: [
      bi(
        "El nom de Can Peguera remet a una finca i una masia anteriors al conjunt de cases barates. Les fotografies i els documents permeten seguir aquest passat rural, però no fixar sense dubtes la fundació de la masia ni tots els usos que va tenir.",
        "El nombre de Can Peguera remite a una finca y una masía anteriores al conjunto de casas baratas. Las fotografías y los documentos permiten seguir ese pasado rural, pero no fijar sin dudas la fundación de la masía ni todos sus usos.",
      ),
      bi(
        "La llei de cases barates de 1911 i la creació del Patronato de la Habitación el 1927 formen el marc de l’operació. La compra dels terrenys es data el 26 de març de 1928 en la recerca consultada. Sòl, projecte i construcció són moments diferents.",
        "La ley de casas baratas de 1911 y la creación del Patronato de la Habitación en 1927 forman el marco de la operación. La compra de los terrenos se fecha el 26 de marzo de 1928 en la investigación consultada. Suelo, proyecto y construcción son momentos diferentes.",
      ),
    ],
  },
  {
    period: "1929–1932",
    date: bi("1929–1932", "1929–1932"),
    title: bi(
      "Un barri que es va omplint de vida",
      "Un barrio que se va llenando de vida",
    ),
    sources: ["S04", "S05", "S10", "S43", "S44"],
    body: [
      bi(
        "El grup Ramon Albó es construeix i s’ocupa per fases, des de 1929 fins a 1931/1932. L’Exposició Internacional és part del context, però no explica una trajectòria única per a totes les famílies. Tampoc hi ha una sola data que resumeixi les obres, els lliuraments i l’arribada del veïnat.",
        "El grupo Ramon Albó se construye y se ocupa por fases, desde 1929 hasta 1931/1932. La Exposición Internacional es parte del contexto, pero no explica una trayectoria única para todas las familias. Tampoco hay una sola fecha que resuma las obras, las entregas y la llegada del vecindario.",
      ),
      bi(
        "Les cases baixes donen forma a una vida pròxima al carrer. L’escola incorpora un altre espai compartit: el Grup Escolar Hermenegildo Giner de los Ríos s’inaugura el 28 de febrer de 1932. La premsa ho recull després; la cerimònia no acredita per si sola el primer dia lectiu.",
        "Las casas bajas dan forma a una vida próxima a la calle. La escuela incorpora otro espacio compartido: el Grupo Escolar Hermenegildo Giner de los Ríos se inaugura el 28 de febrero de 1932. La prensa lo recoge después; la ceremonia no acredita por sí sola el primer día lectivo.",
      ),
    ],
  },
  {
    period: "1931–1939",
    date: bi("1931–1939", "1931–1939"),
    title: bi("Lloguers, escola i guerra", "Alquileres, escuela y guerra"),
    sources: ["S14", "S15", "S39", "S21", "S22", "S23"],
    body: [
      bi(
        "L’habitatge també és un terreny de conflicte. Les cases barates participen en les lluites pel lloguer dels anys trenta; la història de Can Peguera s’inscriu en aquell moviment, sense poder-li atribuir totes les xifres de Barcelona.",
        "La vivienda también es un terreno de conflicto. Las casas baratas participan en las luchas por el alquiler de los años treinta; la historia de Can Peguera se inscribe en aquel movimiento, sin poder atribuirle todas las cifras de Barcelona.",
      ),
      bi(
        "Durant la Guerra Civil es construeix un refugi antiaeri. La seva existència està documentada, però la data exacta i el registre d’impactes demanen més contrast. Els accessos localitzats el 2022 no converteixen el refugi en un lloc obert a visites.",
        "Durante la Guerra Civil se construye un refugio antiaéreo. Su existencia está documentada, pero la fecha exacta y el registro de impactos necesitan más contraste. Los accesos localizados en 2022 no convierten el refugio en un lugar abierto a visitas.",
      ),
    ],
  },
  {
    period: "1939–1972",
    date: bi("1939–1972", "1939–1972"),
    title: bi(
      "Sobreviure i transformar el barri",
      "Sobrevivir y transformar el barrio",
    ),
    sources: ["S16", "S21", "S34", "S35", "S11", "S12", "S25", "S26"],
    body: [
      bi(
        "La postguerra travessa el barri amb repressió, depuració i exili. Les biografies requereixen documentació individual: la mort de Josep Fort Maluenda a Hartheim, el 29 de setembre de 1941, figura en fitxes concordants. Els records i els expedients no s’han de confondre amb una sola veu col·lectiva.",
        "La posguerra atraviesa el barrio con represión, depuración y exilio. Las biografías requieren documentación individual: la muerte de Josep Fort Maluenda en Hartheim, el 29 de septiembre de 1941, figura en fichas concordantes. Los recuerdos y los expedientes no deben confundirse con una sola voz colectiva.",
      ),
      bi(
        "Des de 1947 hi ha ampliacions del conjunt. La masia acaba substituïda per un bloc d’habitatges: les fonts ofereixen 1949 i 1954, possiblement per a fases diferents. Aquí es manté oberta la discrepància en lloc d’escollir una data sense prova.",
        "Desde 1947 hay ampliaciones del conjunto. La masía termina sustituida por un bloque de viviendas: las fuentes ofrecen 1949 y 1954, posiblemente para fases distintas. Aquí se mantiene abierta la discrepancia en lugar de escoger una fecha sin prueba.",
      ),
    ],
  },
  {
    period: "1973–2014",
    date: bi("1973–2014", "1973–2014"),
    title: bi("Organitzar-se per quedar-se", "Organizarse para quedarse"),
    sources: ["S21", "S28", "S29", "S30", "S05"],
    body: [
      bi(
        "La història dels anys setanta és també la de l’organització veïnal. Centre Social, associacions i treball comunitari tenen ritmes i àmbits diferents. La resistència davant el planejament metropolità forma part de la defensa de poder continuar vivint al barri.",
        "La historia de los años setenta es también la de la organización vecinal. Centro Social, asociaciones y trabajo comunitario tienen ritmos y ámbitos diferentes. La resistencia ante el planeamiento metropolitano forma parte de la defensa de poder seguir viviendo en el barrio.",
      ),
      bi(
        "El 1998 el veïnat tria el nom de Can Peguera en una consulta. L’acord del districte és d’aquell any i la publicació municipal, de 1999. El nom recuperat conviu als arxius amb Ramon Albó i altres denominacions històriques: cal cercar-les totes sense descontextualitzar-les.",
        "En 1998 el vecindario elige el nombre de Can Peguera en una consulta. El acuerdo del distrito es de ese año y la publicación municipal, de 1999. El nombre recuperado convive en los archivos con Ramon Albó y otras denominaciones históricas: hay que buscarlas todas sin descontextualizarlas.",
      ),
    ],
  },
  {
    period: "2015–2026",
    date: bi("2015–2026", "2015–2026"),
    title: bi("Preservar un barri habitat", "Preservar un barrio habitado"),
    sources: ["S18", "S19", "S31", "S20", "S49", "S50"],
    body: [
      bi(
        "La modificació del planejament de 2015 és una fita en la preservació del conjunt. Cal distingir-ne l’aprovació inicial del 22 de gener, la provisional del 27 de març i la definitiva del 10 de juliol. No és una declaració patrimonial uniforme de totes les cases ni una desafectació absoluta.",
        "La modificación del planeamiento de 2015 es un hito en la preservación del conjunto. Hay que distinguir la aprobación inicial del 22 de enero, la provisional del 27 de marzo y la definitiva del 10 de julio. No es una declaración patrimonial uniforme de todas las casas ni una desafectación absoluta.",
      ),
      bi(
        "Conservar el barri implica fer compatibles la memòria, el manteniment i l’habitabilitat. Els debats de 2025 i els anuncis de 2026 segueixen oberts a contrast. Una proposta, una obra pilot i la rehabilitació de tot el barri no són el mateix.",
        "Conservar el barrio implica hacer compatibles la memoria, el mantenimiento y la habitabilidad. Los debates de 2025 y los anuncios de 2026 siguen abiertos al contraste. Una propuesta, una obra piloto y la rehabilitación de todo el barrio no son lo mismo.",
      ),
    ],
  },
];
export const community = [
  {
    title: bi("La Cosa Nostra", "La Cosa Nostra"),
    text: bi(
      "El casal comunitari del carrer de Biure, 1, és un lloc de trobada d’entitats i activitats. La Peguera ja explicava el 2003 l’esforç quotidià del voluntariat i els reptes de continuïtat.",
      "El casal comunitario de la calle Biure, 1, es un lugar de encuentro de entidades y actividades. La Peguera ya explicaba en 2003 el esfuerzo cotidiano del voluntariado y los retos de continuidad.",
    ),
    sources: ["COM-040", "COM-003"],
  },
  {
    title: bi("La Peguera", "La Peguera"),
    text: bi(
      "El butlletí veïnal guarda reivindicacions, records i vida associativa. Llegir-ne números de diferents anys permet seguir allò que canvia i allò que persisteix, amb les paraules dels seus autors.",
      "El boletín vecinal guarda reivindicaciones, recuerdos y vida asociativa. Leer números de distintos años permite seguir lo que cambia y lo que persiste, con las palabras de sus autores.",
    ),
    sources: ["COM-001"],
  },
  {
    title: bi("Quiosc de la Memòria", "Quiosc de la Memòria"),
    text: bi(
      "El projecte de LATAULA treballa amb records, documents i una hemeroteca participativa. El 2024 va documentar tallers amb el Grup de Dones i Tronada per tornar als llocs de fotografies antigues i parlar dels canvis.",
      "El proyecto de LATAULA trabaja con recuerdos, documentos y una hemeroteca participativa. En 2024 documentó talleres con el Grup de Dones y Tronada para volver a los lugares de fotografías antiguas y hablar de los cambios.",
    ),
    sources: ["COM-007", "COM-011"],
  },
];
export const voices = [
  {
    title: "El refugi antiaeri de Can Peguera",
    date: "2016",
    text: bi(
      "Nou Barris Televisió presenta el refugi dins de Relligant Nou Barris. Document de divulgació de 2016; l’estat de visita s’ha de llegir amb les actualitzacions de 2023.",
      "Nou Barris Televisió presenta el refugio dentro de Relligant Nou Barris. Documento divulgativo de 2016; el estado de visita debe leerse con las actualizaciones de 2023.",
    ),
    sources: ["S22"],
  },
  {
    title: "Can Peguera, el barri roig",
    date: "2021",
    text: bi(
      "Josep Maria Clariana explica a Va passar aquí la memòria llibertària i els espais del barri. Relat atribuït a la persona entrevistada.",
      "Josep Maria Clariana explica en Va passar aquí la memoria libertaria y los espacios del barrio. Relato atribuido a la persona entrevistada.",
    ),
    sources: ["AMP03"],
  },
  {
    title: "Baños visita Can Peguera",
    date: "2020",
    text: bi(
      "Joan Zambrana recorre amb Antonio Baños espais de la història obrera. La bodega Munich és una de les localitzacions identificades al reportatge.",
      "Joan Zambrana recorre con Antonio Baños espacios de la historia obrera. La bodega Munich es una de las localizaciones identificadas en el reportaje.",
    ),
    sources: ["AMP09"],
  },
  {
    title: "L’accés escolar del refugi",
    date: "2022",
    text: bi(
      "Reportatge del descobriment durant les obres. La interpretació de les obertures es revisa amb els estudis de 2023.",
      "Reportaje del descubrimiento durante las obras. La interpretación de las aberturas se revisa con los estudios de 2023.",
    ),
    sources: ["S24"],
  },

  {
    title: "Més veïnes",
    date: "2022",
    text: bi(
      "Projecte intergeneracional sobre dones, cures i resistència quotidiana. Lisa Marrani i Vera Livia García; enregistrament, so i edició d’Alessandro Olla. Consulta el projecte als webs dels autors.",
      "Proyecto intergeneracional sobre mujeres, cuidados y resistencia cotidiana. Lisa Marrani y Vera Livia García; grabación, sonido y edición de Alessandro Olla. Consulta el proyecto en las webs de sus autores.",
    ),
    sources: ["COM-022", "COM-023", "COM-025"],
  },
  {
    title: "La família Barris: Can Peguera",
    date: "2020",
    text: bi(
      "Un programa de betevé sobre les veus i les preocupacions del barri. Enllaç al programa original, sense incrustar-ne ni reproduir-ne fragments en aquest arxiu.",
      "Un programa de betevé sobre las voces y preocupaciones del barrio. Enlace al programa original, sin incrustar ni reproducir fragmentos en este archivo.",
    ),
    sources: ["COM-026"],
  },
];
export const poiText: Record<string, Bilingual> = {
  "refugi-647": bi(
    "Excavat sota el Turó, el refugi recorda la defensa veïnal durant la Guerra Civil. L’estudi de l’accés escolar va identificar una mina d’aigua anterior. El setembre de 2023, betevé documentava les obertures protegides amb planxes i problemes estructurals. Una tercera obertura pertanyia a una font del segle XIX. No hi ha una obertura al públic posterior confirmada.",
    "Excavado bajo el Turó, el refugio recuerda la defensa vecinal durante la Guerra Civil. El estudio del acceso escolar identificó una mina de agua anterior. En septiembre de 2023, betevé documentaba las aberturas protegidas con planchas y problemas estructurales. Una tercera abertura pertenecía a una fuente del siglo XIX. No hay una apertura al público posterior confirmada.",
  ),
  "escola-giner": bi(
    "El grup escolar Hermenegildo Giner de los Ríos, inaugurat el 1932, explica l’educació republicana al barri. Durant el franquisme es va anomenar Ramiro de Maeztu. Les obres de 2022 van descobrir obertures del refugi al seu antic pati.",
    "El grupo escolar Hermenegildo Giner de los Ríos, inaugurado en 1932, explica la educación republicana en el barrio. Durante el franquismo pasó a llamarse Ramiro de Maeztu. Las obras de 2022 descubrieron aberturas del refugio en su antiguo patio.",
  ),
  "bodega-munich": bi(
    "La bodega Munich era un lloc de trobada llibertària. A l’entrevista de betevé de 2020, Joan Zambrana hi vincula la preparació de premsa obrera. És un emplaçament de memòria: no se n’afirma la continuïtat com a negoci, museu o impremta.",
    "La bodega Munich era un lugar de encuentro libertario. En la entrevista de betevé de 2020, Joan Zambrana la vincula con la preparación de prensa obrera. Es un emplazamiento de memoria: no se afirma su continuidad como negocio, museo o imprenta.",
  ),
  "balco-equipaments": bi(
    "La primera fase es va estrenar el març de 2024. Les escales, ascensors i espais de relació milloren la connexió amb el Turó de la Peira. Aquesta fita no significa que totes les fases previstes estiguin acabades.",
    "La primera fase se estrenó en marzo de 2024. Las escaleras, ascensores y espacios de encuentro mejoran la conexión con el Turó de la Peira. Este hito no significa que todas las fases previstas estén terminadas.",
  ),
  "antiga-masia": bi(
    "La masia que va donar nom al barri formava part del paisatge rural anterior a les cases barates. Les fotografies ajuden a reconstruir aquest entorn. Les fonts discrepen sobre la data de l’enderroc; no s’assigna un portal exacte ni s’identifica la seva capella amb l’església actual.",
    "La masía que dio nombre al barrio formaba parte del paisaje rural anterior a las casas baratas. Las fotografías ayudan a reconstruir ese entorno. Las fuentes discrepan sobre la fecha del derribo; no se asigna un portal exacto ni se identifica su capilla con la iglesia actual.",
  ),
  "rellotge-sol": bi(
    "Un detall del paisatge quotidià: el rellotge de sol metàl·lic documentat al carrer de Vilalba dels Arcs per Pere López Brosa el 2016. La fotografia acredita el lloc; no s’atribueixen una data d’instal·lació ni una autoria de l’obra sense documentació.",
    "Un detalle del paisaje cotidiano: el reloj de sol metálico documentado en la calle Vilalba dels Arcs por Pere López Brosa en 2016. La fotografía acredita el lugar; no se atribuyen una fecha de instalación ni una autoría de la obra sin documentación.",
  ),

  "plaza-sant-francesc": bi(
    "Un espai de referència al voltant de Sant Francesc Xavier. El marcador assenyala la plaça, no la porta del temple.",
    "Un espacio de referencia alrededor de Sant Francesc Xavier. El marcador señala la plaza, no la puerta del templo.",
  ),
  "cosa-nostra": bi(
    "Casal de barri comunitari, carrer de Biure, 1. Equipament confirmat al directori municipal; coordenada orientativa.",
    "Casal de barrio comunitario, calle Biure, 1. Equipamiento confirmado en el directorio municipal; coordenada orientativa.",
  ),
  "gent-gran": bi(
    "A Camós, 3, l’antiga caserna de la Guàrdia Civil acull el Casal de Gent Gran. El testimoni de Josep Maria Clariana recollit per betevé hi situa episodis de repressió de postguerra. Avui és un espai de vida comunitària.",
    "En Camós, 3, el antiguo cuartel de la Guardia Civil acoge el Casal de Gent Gran. El testimonio de Josep Maria Clariana recogido por betevé sitúa aquí episodios de represión de posguerra. Hoy es un espacio de vida comunitaria.",
  ),
  "josep-fort": bi(
    "Referència cartogràfica del memorial a Josep Fort Maluenda. La biografia s’acredita amb fonts pròpies, separades de la coordenada.",
    "Referencia cartográfica del memorial a Josep Fort Maluenda. La biografía se acredita con fuentes propias, separadas de la coordenada.",
  ),
};
