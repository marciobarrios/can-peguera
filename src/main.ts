import "@fontsource/bitter/latin-400.css";
import "@fontsource-variable/dm-sans";
import "./style.css";
import {
  bi,
  chapters,
  community,
  copy,
  poiText,
  voices,
  type Bilingual,
  type Lang,
} from "./content";
import timeline from "./timeline.json";
import gallery from "./gallery.json";
import sources from "./sources.json";
import map from "./map-data.json";

type Photo = (typeof gallery)[number];
const app = document.querySelector<HTMLDivElement>("#app")!;
const ids = [
  "historia",
  "cronologia",
  "barri",
  "abans-ara",
  "arxiu",
  "veinat",
  "fonts",
];
const langFromURL = (): Lang =>
  location.pathname.startsWith("/es") ? "es" : "ca";
let lang = langFromURL();
const state = {
  chapter: 0,
  allChapters: false,
  era: "all",
  query: "",
  topic: "all",
  period: "all",
  rights: "all",
  poi: "plaza-sant-francesc",
  zoom: 1,
  before: "1",
  after: "5",
  ratio: 50,
  side: false,
};
let lastPhotoTrigger = "";
let menuOpen = false;
const t = (value: Bilingual) => value[lang];
const esc = (value: string | number) =>
  String(value).replace(
    /[&<>"']/g,
    (x) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        x
      ]!,
  );
const icon = (type: "arrow" | "close" | "plus" | "minus" | "menu") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${{ arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>', close: '<path d="m6 6 12 12M6 18 18 6"/>', plus: '<path d="M5 12h14M12 5v14"/>', minus: '<path d="M5 12h14"/>', menu: '<path d="M3 7h18M3 12h18M3 17h18"/>' }[type]}</svg>`;
const source = (id: string) => sources.find((s) => s.id === id);
const refs = (list: string[]) =>
  `<p class="references">${t(copy.sources)}: ${list
    .map((id) => {
      const s = source(id);
      return s
        ? `<a href="${esc(s.url)}" title="${esc(s.title)}">${esc(id)}</a>`
        : "";
    })
    .join(" / ")}</p>`;
const photoById = (id: string) => gallery.find((p) => p.id === id)!;
const author = (p: Photo) => p.author || t(copy.unknownAuthor);
const rights = (p: Photo, full = true) =>
  `<div class="photo-rights ${p.pending ? "pending" : ""}">${p.pending ? `<p class="rights-warning">${t(copy.pending)}</p>` : ""}<p>${esc(author(p))}. ${esc(p.holder)}. <a href="${esc(p.source)}">${t(copy.readSource)}</a>${p.license ? ` · <a href="${esc(p.licenseUrl)}">${esc(p.license)}</a>` : ""}${full ? `<br>${t(copy.resized)} ${p.license.includes("BY-SA") ? t(copy.shareAlike) : ""}` : ""}</p></div>`;
const img = (p: Photo, large = false, eager = false) =>
  `<img src="/assets/${p.id}-${large ? "large" : "small"}.webp" ${large ? "" : `srcset="/assets/${p.id}-small.webp 720w, /assets/${p.id}-large.webp 1600w" sizes="(max-width: 650px) 92vw, (max-width: 1000px) 45vw, 30vw"`} width="${p.width}" height="${p.height}" alt="${esc(t(p.alt))}" loading="${eager ? "eager" : "lazy"}" ${eager ? 'fetchpriority="high"' : ""} decoding="async">`;
const imageButton = (p: Photo, cls = "", eager = false) =>
  `<button class="photo-button ${cls}" data-action="photo" data-photo="${p.id}" id="open-${cls || "gallery"}-${p.id}" aria-label="${t(copy.openImage)}: ${esc(t(p.title))}">${img(p, eager, eager)}<span class="image-expand" aria-hidden="true">${icon("plus")}</span></button>`;
const figure = (id: string, cls = "") => {
  const p = photoById(id);
  return `<figure class="editorial-figure ${cls}">${imageButton(p, cls)}<figcaption><span>${esc(t(p.title))}</span><span>${esc(t(p.date))}</span></figcaption>${rights(p)}</figure>`;
};
const header = () =>
  `<a class="skip" href="#main">${t(copy.skip)}</a><header class="site-header"><a class="brand" href="/${lang}/#inici" aria-label="Can Peguera — ${t(copy.top)}"><svg viewBox="0 0 68 30" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m2 13 10-8 10 8v14H2Zm20 0L33 5l11 8v14H22Zm22 0 11-8 11 8v14H44ZM9 27V16h6v11m15 0V16h6v11m16 0V16h6v11"/></svg><span>Can Peguera<small>${t(copy.tagline)}</small></span></a><nav id="site-nav" aria-label="${t(bi("Navegació principal", "Navegación principal"))}">${ids.map((id, i) => `<a href="#${id}">${t(copy.nav[i])}</a>`).join("")}</nav><div class="header-tools"><div class="language" aria-label="${t(bi("Idioma", "Idioma"))}"><a data-action="language" data-lang="ca" href="/ca/${location.search}${location.hash}" lang="ca" ${lang === "ca" ? 'aria-current="true"' : ""}>CA</a><span aria-hidden="true">/</span><a data-action="language" data-lang="es" href="/es/${location.search}${location.hash}" lang="es" ${lang === "es" ? 'aria-current="true"' : ""}>ES</a></div><button class="menu-button icon-button" data-action="menu" aria-controls="site-nav" aria-expanded="false" aria-label="${t(copy.menu)}">${icon("menu")}</button></div></header>`;
const hero = () => {
  const p = photoById("street");
  return `<section class="hero" id="inici"><div class="hero-copy"><p class="location">${t(copy.place)}</p><h1>Can Peguera,<br>${t(copy.tagline).toLocaleLowerCase(lang)}.</h1><p class="hero-intro">${t(copy.heroIntro)}</p><a class="primary-link" href="#historia">${t(copy.begin)}${icon("arrow")}</a><a class="plain-link" href="#arxiu">${t(copy.explore)}</a><span class="hero-footnote">${t(copy.date)}</span></div><figure class="hero-photo">${imageButton(p, "hero-image", true)}<figcaption><span>${t(p.title)}, 2016</span><span>Pere López Brosa / <a href="${p.source}">Commons</a> / <a href="${p.licenseUrl}">CC BY-SA 3.0</a></span><span class="hero-adaptation">${t(copy.resized)} ${t(copy.shareAlike)}</span></figcaption></figure></section><div class="preview-note"><span aria-hidden="true">◌</span><p>${t(copy.preview)}</p><a href="#fonts">${t(copy.nav[6])}</a></div><section class="introduction section-wrap"><h2>${t(copy.introTitle)}</h2><div><p class="lead">${t(copy.intro)}</p><p>${t(copy.heroBody)}</p></div></section>`;
};
const historyContent = () =>
  chapters
    .map(
      (c, i) =>
        `<article class="chapter" ${!state.allChapters && i !== state.chapter ? "hidden" : ""}><p class="chapter-date">${t(c.date)}</p><h3>${t(c.title)}</h3>${c.body.map((p) => `<p>${t(p)}</p>`).join("")}${refs(c.sources)}</article>`,
    )
    .join("");
const historySection = () =>
  `<section id="historia" class="section-wrap history"><div class="section-heading"><div><p class="section-kicker">${t(copy.nav[0])}</p><h2>${t(copy.historyTitle)}</h2></div><p>${t(copy.historyIntro)}</p></div><div class="history-layout"><div><div class="chapter-controls" aria-label="${t(bi("Etapes històriques", "Etapas históricas"))}">${chapters.map((c, i) => `<button data-action="chapter" data-index="${i}" aria-pressed="${!state.allChapters && state.chapter === i}">${t(c.date)}</button>`).join("")}</div><button class="text-button all-chapters" data-action="all-chapters">${t(state.allChapters ? copy.oneChapter : copy.allChapters)}</button><div id="chapters">${historyContent()}</div></div>${figure("school", "history-photo")}</div></section>`;
const timelineRows = () =>
  timeline
    .filter((e) => state.era === "all" || e.era === state.era)
    .map(
      (e) =>
        `<li><details><summary><span class="event-date">${esc(t(e.date))}</span><span class="event-title">${esc(t(e.title))}${e.scheduled ? `<small class="scheduled">${t(copy.scheduled)}</small>` : ""}</span><span class="detail-sign" aria-hidden="true">+</span></summary><div class="event-detail">${e.uncertain ? `<p class="uncertain">${t(copy.uncertain)}</p>` : ""}<p>${esc(t(e.note))}</p>${refs(e.sources)}</div></details></li>`,
    )
    .join("");
const timelineSection = () =>
  `<section id="cronologia" class="timeline-section"><div class="section-wrap"><div class="section-heading"><div><p class="section-kicker">${t(copy.nav[1])}</p><h2>${t(copy.timelineTitle)}</h2></div><p>${t(copy.timelineIntro)}</p></div><div class="timeline-controls"><div class="filter-pills" aria-label="${t(copy.period)}"><button data-action="era" data-era="all" aria-pressed="${state.era === "all"}">${t(copy.allEvents)}</button>${Object.entries(
    copy.eras,
  )
    .map(
      ([key, value]) =>
        `<button data-action="era" data-era="${key}" aria-pressed="${state.era === key}">${t(value)}</button>`,
    )
    .join(
      "",
    )}</div><span id="timeline-count" role="status">${timeline.filter((e) => state.era === "all" || e.era === state.era).length} ${t(copy.events)}</span></div><ol id="timeline-list" class="timeline-list">${timelineRows()}</ol></div></section>`;
const poiDetail = () => {
  const p = map.points.find((p) => p.id === state.poi)!;
  return `<h3>${esc(p.name)}</h3><p>${t(poiText[p.id])}</p><p class="precision">${t(copy.precision)}</p><p class="coordinates">${p.coordinates[1]}° N, ${p.coordinates[0]}° E</p><a href="${esc(p.source)}">${t(copy.readSource)} (OSM / Mapcarta)</a>${p.id === "cosa-nostra" ? refs(["POI01"]) : p.id === "gent-gran" ? refs(["POI02"]) : p.id === "josep-fort" ? refs(["S34", "S35"]) : ""}`;
};
const mapSection = () =>
  `<section id="barri" class="section-wrap map-section"><div class="section-heading"><div><p class="section-kicker">${t(copy.nav[2])}</p><h2>${t(copy.mapTitle)}</h2></div><p>${t(copy.mapIntro)}</p></div><div class="map-layout"><div class="map-frame"><div class="map-toolbar"><span>Can Peguera <b>47</b></span><div><button class="icon-button" data-action="zoom-out" aria-label="${t(copy.zoomOut)}">${icon("minus")}</button><button class="icon-button" data-action="zoom-in" aria-label="${t(copy.zoomIn)}">${icon("plus")}</button><button data-action="zoom-reset">${t(copy.resetMap)}</button></div></div><div class="map-viewport" tabindex="0" role="region" aria-label="${t(copy.mapAlt)}"><div class="map-canvas" style="width:${state.zoom * 100}%"><img src="/assets/aerial-5.webp" width="1400" height="1400" loading="lazy" alt="${t(copy.mapAlt)}"><svg class="boundary" viewBox="0 0 1000 1000" aria-hidden="true"><polygon points="${map.boundary.map((p) => p.join(",")).join(" ")}"/><path class="scale" d="M55 920v10h125v-10"/><text x="55" y="960">100 m</text><path class="north" d="m920 100 12-35 12 35-12-9Z"/><text x="932" y="52" text-anchor="middle">N</text></svg>${map.points.map((p, i) => `<button class="map-pin ${p.id === state.poi ? "active" : ""}" style="left:${p.xy[0] / 10}%;top:${p.xy[1] / 10}%" data-action="poi" data-poi="${p.id}" aria-label="${esc(p.name)}" aria-pressed="${p.id === state.poi}">${i + 1}</button>`).join("")}</div></div><p class="map-legend"><i aria-hidden="true"></i>${t(copy.mapLegend)}</p><p class="map-hint">${t(copy.mapScroll)}</p></div><aside class="map-sidebar"><h3 class="list-title">${t(copy.mapList)}</h3><ol class="poi-list">${map.points.map((p, i) => `<li><button data-action="poi" data-poi="${p.id}" aria-pressed="${p.id === state.poi}"><span>${i + 1}</span>${esc(p.name)}</button></li>`).join("")}</ol><div id="poi-detail" class="poi-detail" aria-live="polite">${poiDetail()}</div></aside></div><div class="map-bottom"><p>${t(copy.mapHint)} ${t(bi("Refugi antiaeri: existència documentada, entrada i visitabilitat no verificades; no s’ha situat un marcador.", "Refugio antiaéreo: existencia documentada, entrada y visitabilidad no verificadas; no se ha situado un marcador."))}</p><div class="map-credits">© ICGC, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. ${t(bi("Límit", "Límite"))}: Ajuntament de Barcelona, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. ${t(bi("Punts", "Puntos"))}: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap, ODbL</a>. ${t(copy.resized)} ${refs(["MAP01", "MAP02", "POI03"])}</div></div></section>`;
const aerialCredit = () =>
  `<p class="aerial-credit">${t(copy.aerialCredit)} <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> · <a href="${map.aerial[0].source}">${t(copy.readSource)}</a></p>`;
const compareImage = (id: string, cls: string) => {
  const a = map.aerial.find((a) => a.id === id)!;
  return `<div class="aerial-layer ${cls}"><img src="/assets/${a.file}" width="1400" height="1400" loading="lazy" alt="${t(copy.aerialAlt)} ${a.label}"><span class="aerial-label">${a.label}</span></div>`;
};
const compareSection = () =>
  `<section id="abans-ara" class="compare-section"><div class="section-wrap"><div class="section-heading"><div><p class="section-kicker">${t(copy.nav[3])}</p><h2>${t(copy.compareTitle)}</h2></div><p>${t(copy.compareIntro)}</p></div><div class="compare-selects">${(["before", "after"] as const).map((key) => `<label>${t(copy[key])}<select id="compare-${key}">${map.aerial.map((a) => `<option value="${a.id}" ${state[key] === a.id ? "selected" : ""}>${a.label}</option>`).join("")}</select></label>`).join("")}<button class="outline-button" data-action="compare-view">${t(state.side ? copy.overlay : copy.sideBySide)}</button></div><div id="compare-frame" class="compare-frame ${state.side ? "side-by-side" : ""}" style="--split:${state.ratio}%">${compareImage(state.after, "aerial-after")}${compareImage(state.before, "aerial-before")}<div class="compare-handle" aria-hidden="true"><span>↔</span></div></div><div class="range-control" ${state.side ? "hidden" : ""}><label for="compare-range">${t(copy.slider)}</label><input id="compare-range" type="range" min="0" max="100" value="${state.ratio}" aria-valuetext="${state.ratio}%"><output for="compare-range">${state.ratio}%</output></div><div class="flight-dates">${(
    ["before", "after"] as const
  )
    .map((key) => {
      const a = map.aerial.find((a) => a.id === state[key])!;
      return `<p><strong>${a.label}</strong><br>${t(copy.sampleDate)}: ${a.localDate}</p>`;
    })
    .join(
      "",
    )}</div><p class="compare-note">${t(copy.compareNote)}</p>${aerialCredit()}</div></section>`;
const normalize = (s: string) =>
  s
    .toLocaleLowerCase(lang)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
const filteredPhotos = () =>
  gallery.filter(
    (p) =>
      (state.topic === "all" || state.topic === p.topic) &&
      (state.period === "all" ||
        (state.period === "old"
          ? p.year < 1950
          : state.period === "middle"
            ? p.year >= 1950 && p.year < 2000
            : p.year >= 2000)) &&
      (state.rights === "all" ||
        (state.rights === "pending" ? p.pending : !p.pending)) &&
      normalize(
        `${p.title.ca} ${p.title.es} ${p.originalTitle} ${p.alt.ca} ${p.alt.es} ${p.author} ${p.year}`,
      ).includes(normalize(state.query)),
  );
const galleryCards = () =>
  filteredPhotos()
    .map(
      (p) =>
        `<figure class="gallery-card">${imageButton(p)}<figcaption><span>${esc(t(p.date))}</span><h3>${esc(t(p.title))}</h3>${p.note[lang] ? `<p>${esc(t(p.note))}</p>` : ""}</figcaption>${rights(p)}</figure>`,
    )
    .join("");
const empty = () =>
  `<div class="empty-state"><h3>${t(copy.emptyTitle)}</h3><p>${t(copy.emptyBody)}</p><button class="outline-button" data-action="reset-filters">${t(copy.reset)}</button></div>`;
const selectOptions = (list: Record<string, Bilingual>, selected: string) =>
  Object.entries(list)
    .map(
      ([key, label]) =>
        `<option value="${key}" ${key === selected ? "selected" : ""}>${t(label)}</option>`,
    )
    .join("");
const archiveSection = () =>
  `<section id="arxiu" class="section-wrap archive"><div class="section-heading"><div><p class="section-kicker">${t(copy.nav[4])}</p><h2>${t(copy.archiveTitle)}</h2></div><p>${t(copy.archiveIntro)}</p></div><div class="archive-controls"><label class="search-label">${t(copy.search)}<input id="archive-search" type="search" value="${esc(state.query)}" placeholder="${t(copy.searchPlaceholder)}"></label><label>${t(copy.topic)}<select id="archive-topic">${selectOptions({ all: copy.allTopics, ...copy.topics }, state.topic)}</select></label><label>${t(copy.period)}<select id="archive-period">${selectOptions({ all: copy.allPeriods, old: bi("Abans de 1950", "Antes de 1950"), middle: bi("1950–1999", "1950–1999"), recent: bi("Des de 2000", "Desde 2000") }, state.period)}</select></label><label>${t(copy.rights)}<select id="archive-rights">${selectOptions({ all: copy.allRights, licensed: copy.licensed, pending: copy.pendingShort }, state.rights)}</select></label></div><div class="archive-status"><span id="archive-count" role="status">${filteredPhotos().length} ${t(copy.found)}</span><button class="text-button" data-action="reset-filters">${t(copy.reset)}</button></div><div id="gallery-grid" class="gallery-grid">${filteredPhotos().length ? galleryCards() : empty()}</div></section>`;
const neighborsSection = () =>
  `<section id="veinat" class="neighbors-section section-wrap"><div class="section-heading"><div><p class="section-kicker">${t(copy.nav[5])}</p><h2>${t(copy.neighborsTitle)}</h2></div><p>${t(copy.neighborsIntro)}</p></div><div class="neighbors-layout">${figure("neighbors", "neighbors-photo")}<div class="community-notes">${community.map((c) => `<article><h3>${t(c.title)}</h3><p>${t(c.text)}</p>${refs(c.sources)}</article>`).join("")}</div></div><div class="today"><h3>${t(copy.todayTitle)}</h3><div><p>${t(copy.todayBody)}</p>${refs(["S20", "COM-057", "S50"])}</div></div><div class="voices"><div><h3>${t(copy.voicesTitle)}</h3><p>${t(copy.voicesBody)}</p></div>${voices.map((v) => `<article><span>${v.date}</span><h4>${v.title}</h4><p>${t(v.text)}</p>${refs(v.sources)}</article>`).join("")}</div></section>`;
const methodsSection = () =>
  `<section id="fonts" class="methods"><div class="section-wrap"><div class="section-heading"><div><p class="section-kicker">${t(copy.nav[6])}</p><h2>${t(copy.methodsTitle)}</h2></div><p>${t(copy.methodsIntro)}</p></div><div class="method-columns">${[
    [copy.method1Title, copy.method1],
    [copy.method2Title, copy.method2],
    [copy.method3Title, copy.method3],
  ]
    .map(
      ([title, body]) =>
        `<article><h3>${t(title)}</h3><p>${t(body)}</p></article>`,
    )
    .join(
      "",
    )}</div><details class="bibliography"><summary>${t(copy.bibliography)} <span>${sources.length}</span></summary><ol>${sources.map((s) => `<li id="source-${s.id}"><span>${s.id}</span><a href="${esc(s.url)}">${esc(s.title)}</a></li>`).join("")}</ol></details><div class="corrections"><h3>${t(copy.correctionsTitle)}</h3><p>${t(copy.corrections)}</p></div><p class="credits">${t(copy.credits)}</p></div></section>`;
const footer = () =>
  `<footer class="footer section-wrap"><a class="footer-title" href="#inici">Can Peguera,<br>${t(copy.tagline).toLowerCase()}.</a><div><p>${t(copy.date)}</p><p>${t(copy.preview)}</p><a href="#inici">${t(copy.top)} ↑</a></div></footer>`;
function render() {
  document.documentElement.lang = lang;
  document.title = `Can Peguera, ${t(copy.tagline).toLowerCase()}`;
  document
    .querySelector('meta[name="description"]')!
    .setAttribute("content", t(copy.heroIntro));
  document
    .querySelector('meta[property="og:title"]')!
    .setAttribute("content", document.title);
  document
    .querySelector('meta[property="og:description"]')!
    .setAttribute("content", t(copy.heroIntro));
  app.innerHTML = `${header()}<main id="main">${hero()}${historySection()}${timelineSection()}${mapSection()}${compareSection()}${archiveSection()}${neighborsSection()}${methodsSection()}</main>${footer()}<dialog id="lightbox" aria-labelledby="lightbox-title"></dialog>`;
  app.querySelector("dialog")!.addEventListener("cancel", (e) => {
    e.preventDefault();
    closePhoto();
  });
  app.querySelector("dialog")!.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closePhoto();
  });
  menuOpen = false;
  syncPhoto();
}
function updateArchive() {
  document.querySelector("#gallery-grid")!.innerHTML = filteredPhotos().length
    ? galleryCards()
    : empty();
  document.querySelector("#archive-count")!.textContent =
    `${filteredPhotos().length} ${t(copy.found)}`;
}
function updateTimeline() {
  document.querySelector("#timeline-list")!.innerHTML = timelineRows();
  document.querySelector("#timeline-count")!.textContent =
    `${timeline.filter((e) => state.era === "all" || e.era === state.era).length} ${t(copy.events)}`;
  document
    .querySelectorAll<HTMLElement>('[data-action="era"]')
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.era === state.era)),
    );
}
function updateHistory() {
  document.querySelector("#chapters")!.innerHTML = historyContent();
  document
    .querySelectorAll<HTMLElement>('[data-action="chapter"]')
    .forEach((b) =>
      b.setAttribute(
        "aria-pressed",
        String(!state.allChapters && Number(b.dataset.index) === state.chapter),
      ),
    );
  document.querySelector('[data-action="all-chapters"]')!.textContent = t(
    state.allChapters ? copy.oneChapter : copy.allChapters,
  );
}
function updateCompare() {
  const el = document.querySelector<HTMLElement>("#abans-ara")!;
  const top = el.getBoundingClientRect().top;
  el.outerHTML = compareSection();
  window.scrollBy(
    0,
    document.querySelector("#abans-ara")!.getBoundingClientRect().top - top,
  );
}
function updatePoi() {
  document.querySelector("#poi-detail")!.innerHTML = poiDetail();
  document.querySelectorAll<HTMLElement>('[data-action="poi"]').forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.poi === state.poi));
    b.classList.toggle("active", b.dataset.poi === state.poi);
  });
}
function setZoom(zoom: number) {
  state.zoom = Math.min(3, Math.max(1, zoom));
  document.querySelector<HTMLElement>(".map-canvas")!.style.width =
    `${state.zoom * 100}%`;
}
function changeLang(next: Lang) {
  if (lang === next) return;
  const section = [
    ...document.querySelectorAll<HTMLElement>(
      "main > section, #cronologia, #abans-ara",
    ),
  ]
    .filter(
      (el) => el.id && el.getBoundingClientRect().top < window.innerHeight / 2,
    )
    .at(-1);
  const offset = section?.getBoundingClientRect().top ?? 0;
  const u = new URL(location.href);
  u.pathname = `/${next}/`;
  if (section) u.hash = section.id;
  if (u.searchParams.has("photo")) history.replaceState(history.state, "", u);
  else history.pushState({ language: true }, "", u);
  lang = next;
  render();
  if (section) {
    const current = document.getElementById(section.id)!;
    window.scrollBy(0, current.getBoundingClientRect().top - offset);
  }
  document
    .querySelector<HTMLElement>(`[data-action="language"][data-lang="${next}"]`)
    ?.focus({ preventScroll: true });
}
function openPhoto(id: string, trigger?: string) {
  lastPhotoTrigger = trigger || lastPhotoTrigger;
  const u = new URL(location.href);
  u.searchParams.set("photo", id);
  history.pushState({ photo: true }, "", u);
  syncPhoto();
}
function closePhoto() {
  const dialog = document.querySelector<HTMLDialogElement>("#lightbox")!;
  dialog.close();
  document.body.classList.remove("modal-open");
  if (history.state?.photo) history.back();
  else {
    const u = new URL(location.href);
    u.searchParams.delete("photo");
    history.replaceState({}, "", u);
    returnFocus();
  }
}
function returnFocus() {
  document.getElementById(lastPhotoTrigger)?.focus({ preventScroll: true });
}
function syncPhoto() {
  const dialog = document.querySelector<HTMLDialogElement>("#lightbox")!;
  const id = new URL(location.href).searchParams.get("photo");
  const p = gallery.find((p) => p.id === id);
  if (!p) {
    if (dialog.open) dialog.close();
    document.body.classList.remove("modal-open");
    /* History restores focus after popstate; return it after that restoration. */ window.setTimeout(
      returnFocus,
      0,
    );
    return;
  }
  const i = gallery.indexOf(p);
  dialog.innerHTML = `<div class="lightbox-top"><span>${i + 1} / ${gallery.length}</span><div class="lightbox-languages"><button data-action="language" data-lang="ca" lang="ca" aria-pressed="${lang === "ca"}">CA</button><button data-action="language" data-lang="es" lang="es" aria-pressed="${lang === "es"}">ES</button><button class="icon-button" data-action="close-photo" aria-label="${t(copy.close)}">${icon("close")}</button></div></div><div class="lightbox-body">${img(p, true)}<div class="lightbox-caption"><p>${esc(t(p.date))}</p><h2 id="lightbox-title">${esc(t(p.title))}</h2>${p.note[lang] ? `<p>${esc(t(p.note))}</p>` : ""}${rights(p)}<div class="lightbox-nav"><button data-action="previous-photo">← ${t(copy.previous)}</button><button data-action="next-photo">${t(copy.next)} →</button></div></div></div>`;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("modal-open");
  dialog
    .querySelector<HTMLElement>('[data-action="close-photo"]')!
    .focus({ preventScroll: true });
}
function nextPhoto(step: number) {
  const id = new URL(location.href).searchParams.get("photo");
  const i = gallery.findIndex((p) => p.id === id);
  const u = new URL(location.href);
  u.searchParams.set(
    "photo",
    gallery[(i + step + gallery.length) % gallery.length].id,
  );
  history.replaceState(history.state, "", u);
  syncPhoto();
}
function setMenu(open: boolean) {
  menuOpen = open;
  document.querySelector(".site-header")!.classList.toggle("menu-open", open);
  const b = document.querySelector('[data-action="menu"]')!;
  b.setAttribute("aria-expanded", String(open));
  b.setAttribute("aria-label", t(open ? copy.closeMenu : copy.menu));
}
app.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const b = target.closest<HTMLElement>("[data-action]");
  if (!b) {
    if (target.closest("nav a")) setMenu(false);
    return;
  }
  const action = b.dataset.action;
  if (action === "language") {
    e.preventDefault();
    changeLang(b.dataset.lang as Lang);
  } else if (action === "menu") setMenu(!menuOpen);
  else if (action === "chapter") {
    state.chapter = Number(b.dataset.index);
    state.allChapters = false;
    updateHistory();
  } else if (action === "all-chapters") {
    state.allChapters = !state.allChapters;
    updateHistory();
  } else if (action === "era") {
    state.era = b.dataset.era!;
    updateTimeline();
  } else if (action === "poi") {
    state.poi = b.dataset.poi!;
    updatePoi();
  } else if (action === "zoom-in") setZoom(state.zoom + 0.5);
  else if (action === "zoom-out") setZoom(state.zoom - 0.5);
  else if (action === "zoom-reset") setZoom(1);
  else if (action === "compare-view") {
    state.side = !state.side;
    updateCompare();
    document
      .querySelector<HTMLElement>('[data-action="compare-view"]')
      ?.focus({ preventScroll: true });
  } else if (action === "photo") openPhoto(b.dataset.photo!, b.id);
  else if (action === "close-photo") closePhoto();
  else if (action === "previous-photo") nextPhoto(-1);
  else if (action === "next-photo") nextPhoto(1);
  else if (action === "reset-filters") {
    state.query = "";
    state.topic = state.period = state.rights = "all";
    (document.querySelector("#archive-search") as HTMLInputElement).value = "";
    ["topic", "period", "rights"].forEach(
      (key) =>
        ((
          document.querySelector(`#archive-${key}`) as HTMLSelectElement
        ).value = "all"),
    );
    updateArchive();
    document
      .querySelector<HTMLInputElement>("#archive-search")!
      .focus({ preventScroll: true });
  }
});
function setCompareRatio(value: number) {
  state.ratio = Math.round(Math.max(0, Math.min(100, value)));
  document
    .querySelector<HTMLElement>("#compare-frame")!
    .style.setProperty("--split", `${state.ratio}%`);
  const input = document.querySelector<HTMLInputElement>("#compare-range")!;
  input.value = String(state.ratio);
  input.setAttribute("aria-valuetext", `${state.ratio}%`);
  document.querySelector('output[for="compare-range"]')!.textContent =
    `${state.ratio}%`;
}
let comparePointer: number | null = null;
function moveComparison(event: PointerEvent) {
  const frame = document.querySelector<HTMLElement>("#compare-frame")!;
  const rect = frame.getBoundingClientRect();
  setCompareRatio(((event.clientX - rect.left) / rect.width) * 100);
}
app.addEventListener("pointerdown", (event) => {
  const frame = (event.target as Element).closest<HTMLElement>(
    "#compare-frame",
  );
  if (!frame || state.side || !event.isPrimary || event.button !== 0) return;
  comparePointer = event.pointerId;
  frame.setPointerCapture(event.pointerId);
  moveComparison(event);
});
app.addEventListener("pointermove", (event) => {
  if (event.pointerId === comparePointer) moveComparison(event);
});
for (const event of ["pointerup", "pointercancel", "lostpointercapture"]) {
  app.addEventListener(event, () => {
    comparePointer = null;
  });
}
app.addEventListener("dragstart", (event) => {
  if ((event.target as Element).closest("#compare-frame"))
    event.preventDefault();
});
app.addEventListener("input", (e) => {
  const el = e.target as HTMLInputElement;
  if (el.id === "archive-search") {
    state.query = el.value;
    updateArchive();
  }
  if (el.id === "compare-range") {
    setCompareRatio(Number(el.value));
  }
});
app.addEventListener("change", (e) => {
  const el = e.target as HTMLSelectElement;
  if (el.id.startsWith("archive-") && el.id !== "archive-search") {
    state[el.id.replace("archive-", "") as "topic" | "period" | "rights"] =
      el.value;
    updateArchive();
  }
  if (el.id.startsWith("compare-") && el.id !== "compare-range") {
    state[el.id.replace("compare-", "") as "before" | "after"] = el.value;
    updateCompare();
    document.getElementById(el.id)?.focus({ preventScroll: true });
  }
});
window.addEventListener("popstate", () => {
  const next = langFromURL();
  if (lang !== next) {
    lang = next;
    render();
  } else syncPhoto();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuOpen) {
    setMenu(false);
    document.querySelector<HTMLElement>('[data-action="menu"]')?.focus();
  }
  if (document.querySelector<HTMLDialogElement>("#lightbox")?.open) {
    if (e.key === "ArrowRight") nextPhoto(1);
    if (e.key === "ArrowLeft") nextPhoto(-1);
  }
});
if (location.pathname === "/")
  history.replaceState({}, "", `/ca/${location.search}${location.hash}`);
render();
if (location.hash)
  requestAnimationFrame(() =>
    document.getElementById(location.hash.slice(1))?.scrollIntoView(),
  );
