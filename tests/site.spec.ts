import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("bilingual navigation, metadata, no overflow and no runtime errors", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/ca/");
  await expect(page).toHaveTitle("Can Peguera, memòria viva");
  await expect(page.locator("html")).toHaveAttribute("lang", "ca");
  await page
    .locator(".hero-image img")
    .evaluate((img: HTMLImageElement) => img.decode());
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `test-results/${info.project.name}-ca-home.png`,
    fullPage: false,
  });
  await page.locator("#arxiu").scrollIntoViewIfNeeded();
  for (const lang of ["es", "ca", "es", "ca"]) {
    await page.locator(`.header-tools [data-lang="${lang}"]`).click();
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page).toHaveURL(new RegExp(`/${lang}/`));
  }
  await page.locator('.header-tools [data-lang="es"]').click();
  await expect(page.locator("#archive-search")).toHaveAttribute(
    "placeholder",
    "Un lugar, un autor, una fecha…",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Las casas/,
  );
  await page.goto("/es/");
  await page
    .locator(".hero-image img")
    .evaluate((img: HTMLImageElement) => img.decode());
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `test-results/${info.project.name}-es-home.png`,
    fullPage: false,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("31 events, meaningful era filters, all chapter reading and scheduled future", async ({
  page,
}) => {
  await page.goto("/ca/#cronologia");
  await expect(page.locator("#timeline-list>li")).toHaveCount(31);
  await page.locator('[data-action="era"][data-era="postwar"]').click();
  await expect(page.locator("#timeline-list>li")).toHaveCount(7);
  await page.locator('[data-action="era"][data-era="present"]').click();
  await expect(page.locator("#timeline-list>li")).toHaveCount(10);
  const future = page.locator("#timeline-list details").last();
  await future.locator("summary").click();
  await expect(future).toContainText("Activitat prevista");
  await expect(future).toContainText(/no s’afirma/i);
  await page.locator('[data-action="era"][data-era="all"]').click();
  await expect(page.locator("#timeline-list>li")).toHaveCount(31);
  await page.locator('[data-action="all-chapters"]').click();
  await expect(page.locator(".chapter:visible")).toHaveCount(6);
  await page.locator('[data-action="chapter"][data-index="4"]').click();
  await expect(page.locator(".chapter:visible")).toHaveCount(1);
  await expect(page.locator(".chapter:visible")).toContainText("1999");
});

test("combined gallery filters, translated empty states and repeated language changes", async ({
  page,
}) => {
  await page.goto("/ca/#arxiu");
  await expect(page.locator(".gallery-card")).toHaveCount(54);
  await page.selectOption("#archive-topic", "life");
  await page.selectOption("#archive-period", "old");
  await page.selectOption("#archive-rights", "pending");
  await expect(page.locator(".gallery-card")).toHaveCount(1);
  await expect(page.locator(".gallery-card")).toContainText(
    "Josep Domínguez Martí",
  );
  await expect(page.locator(".gallery-card .rights-warning")).toContainText(
    "Autorització de reproducció pendent",
  );
  await page.fill("#archive-search", "inexistent");
  await expect(page.locator(".empty-state")).toBeVisible();
  await page.locator('.header-tools [data-lang="es"]').click();
  await expect(page.locator(".empty-state")).toContainText("No hay imágenes");
  await expect(page.locator("#archive-search")).toHaveValue("inexistent");
  await page.locator(".empty-state button").click();
  await expect(page.locator(".gallery-card")).toHaveCount(54);
  await page.selectOption("#archive-period", "undated");
  await expect(page.locator(".gallery-card")).toHaveCount(9);
  await page.fill("#archive-search", "refugio");
  await expect(page.locator(".gallery-card")).toHaveCount(6);
  await page.locator('[data-action="reset-filters"]').click();
  await page.fill("#archive-search", "masia");
  await expect(page.locator(".gallery-card")).toHaveCount(1);
  await expect(page.locator(".gallery-card .rights-warning")).toContainText(
    "Autorización de reproducción pendiente",
  );
});

test("lightbox repetition, language, keyboard focus, Escape and browser history", async ({
  page,
}) => {
  await page.goto("/ca/#arxiu");
  const trigger = page.locator("#open-gallery-masia");
  for (let i = 0; i < 3; i++) {
    await trigger.click();
    await expect(page.locator("dialog")).toBeVisible();
    await expect(page.locator("dialog .rights-warning")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog")).not.toBeVisible();
    await expect(trigger).toBeFocused();
  }
  await trigger.click();
  await page.locator('.lightbox-languages [data-lang="es"]').click();
  await expect(page.locator("dialog .rights-warning")).toContainText(
    "Autorización",
  );
  await page.locator('dialog [data-action="next-photo"]').click();
  await expect(page.locator("#lightbox-title")).toHaveText(
    "Un patio lleno de vida",
  );
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("#lightbox-title")).toHaveText(
    "La masía, entre pinos",
  );
  await page.goBack();
  await expect(page.locator("dialog")).not.toBeVisible();
  await page.goForward();
  await expect(page.locator("dialog")).toBeVisible();
  await page.locator('dialog [data-action="close-photo"]').click();
  await expect(page.locator("dialog")).not.toBeVisible();
});

test("map/list parity, zoom, comparison values, flight dates and accessible alternative", async ({
  page,
}, info) => {
  await page.goto("/ca/#barri");
  await expect(page.locator(".map-pin")).toHaveCount(4);
  await expect(page.locator(".poi-list button")).toHaveCount(10);
  await page.locator('.poi-list [data-poi="refugi-647"]').click();
  await expect(page.locator("#poi-detail")).toContainText("Cornudella, 40");
  await expect(page.locator("#poi-detail")).toContainText("2023");
  await expect(page.locator("#poi-detail .coordinates")).toHaveCount(0);
  await expect(page.locator("#poi-detail .rights-warning")).toBeVisible();
  await page.locator('.header-tools [data-lang="es"]').click();
  await expect(page.locator("#poi-detail h3")).toHaveText(
    "Refugio antiaéreo 647",
  );
  await expect(page.locator("#poi-detail")).toContainText(
    "fuente del siglo XIX",
  );
  await page.locator('.header-tools [data-lang="ca"]').click();
  await page.locator('.poi-list [data-poi="cosa-nostra"]').click();
  await expect(page.locator("#poi-detail")).toContainText("Biure, 1");
  await expect(
    page.locator('.map-pin[data-poi="cosa-nostra"]'),
  ).toHaveAttribute("aria-pressed", "true");
  await page.locator('[data-action="zoom-in"]').click();
  await expect(page.locator(".map-canvas")).toHaveAttribute("style", /150%/);
  await page.locator('[data-action="zoom-reset"]').click();
  await page.locator('.map-pin[data-poi="gent-gran"]').click();
  await expect(page.locator("#poi-detail")).toContainText("Camós, 3");
  await page.selectOption("#compare-before", "0");
  await page.selectOption("#compare-after", "4");
  await expect(page.locator(".flight-dates")).toContainText(
    "23/02/1946–07/09/1946",
  );
  const range = page.locator("#compare-range");
  const frame = page.locator("#compare-frame");
  await frame.scrollIntoViewIfNeeded();
  const rect = (await frame.boundingBox())!;
  await page.mouse.move(rect.x + rect.width * 0.5, rect.y + rect.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(rect.x + rect.width * 0.75, rect.y + rect.height * 0.5);
  await page.mouse.up();
  await expect(range).toHaveValue("75");
  await range.focus();
  await page.keyboard.press("Home");
  await expect(range).toHaveValue("0");
  await page.keyboard.press("End");
  await expect(range).toHaveValue("100");
  await page.locator('[data-action="compare-view"]').click();
  await expect(page.locator("#compare-frame")).toHaveClass(/side-by-side/);
  await expect(range).not.toBeVisible();
  await page.locator('[data-action="compare-view"]').click();
  await expect(page.locator("#compare-range")).toBeVisible();
  await page
    .locator("#barri")
    .screenshot({ path: `test-results/${info.project.name}-map.png` });
  await page
    .locator("#abans-ara")
    .screenshot({ path: `test-results/${info.project.name}-comparison.png` });
});

test("keyboard, reduced motion, accessibility and valid local links", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ca/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip")).toBeFocused();
  await page.keyboard.press("Enter");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  if (info.project.name === "mobile") {
    await page.locator('[data-action="menu"]').click();
    await expect(page.locator("#site-nav")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#site-nav")).not.toBeVisible();
  }
  for (const lang of ["ca", "es"]) {
    await page.goto(`/${lang}/`);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  const bad = await page
    .locator('a[href^="#"]')
    .evaluateAll((anchors) =>
      anchors
        .map((a) => a.getAttribute("href")!)
        .filter(
          (h) =>
            h.length > 1 &&
            !document.getElementById(decodeURIComponent(h.slice(1))),
        ),
    );
  expect(bad).toEqual([]);
  await page.locator("#fonts .bibliography summary").click();
  await expect(page.locator(".bibliography li")).toHaveCount(76);
  await page
    .locator("#arxiu")
    .screenshot({ path: `test-results/${info.project.name}-gallery.png` });
});

test("all selected images load, private local resources and visual review captures", async ({
  page,
}, info) => {
  const failures: string[] = [];
  const external: string[] = [];
  page.on("requestfailed", (r) => failures.push(r.url()));
  page.on("response", (r) => {
    if (r.status() >= 400) failures.push(`${r.status()} ${r.url()}`);
  });
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:4173/")) external.push(r.url());
  });
  await page.goto("/ca/");
  await page.evaluate(() => document.fonts.ready);
  for (const id of [
    "historia",
    "barri",
    "abans-ara",
    "arxiu",
    "veinat",
    "fonts",
  ]) {
    const section = page.locator(`#${id}`);
    await section.evaluate((el) => {
      el.scrollIntoView({ behavior: "instant", block: "start" });
    });
    for (const picture of await section.locator("img").all()) {
      await picture.scrollIntoViewIfNeeded();
      await picture.evaluate((img: HTMLImageElement) => img.decode());
    }
    await section.evaluate((el) => {
      el.scrollIntoView({ behavior: "instant", block: "start" });
    });
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    await page.screenshot({
      path: `test-results/${info.project.name}-review-${id}.png`,
    });
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: `test-results/${info.project.name}-full.png`,
    fullPage: true,
  });
  await page.locator("#open-gallery-masia").click();
  await page
    .locator("dialog img")
    .evaluate((i: HTMLImageElement) => i.decode());
  await page.screenshot({
    path: `test-results/${info.project.name}-lightbox.png`,
  });
  expect(failures).toEqual([]);
  expect(external).toEqual([]);
});

test("author collection, drone topic, real dates and Sant Joan in both languages", async ({
  page,
}, info) => {
  await page.goto("/ca/");
  await expect(page.locator(".hero-photo")).toContainText(
    "Marcio Barrios Lesmes",
  );
  await expect(page.locator(".hero-photo")).toContainText("2023");
  await expect(page.locator(".hero-photo")).not.toContainText(
    "Pere López Brosa",
  );
  await expect(page.locator(".hero-image img")).toHaveAttribute(
    "src",
    "/assets/marcio-img-5115-large.webp",
  );
  await page.selectOption("#archive-rights", "author");
  await expect(page.locator(".gallery-card")).toHaveCount(35);
  await page.selectOption("#archive-period", "recent");
  await expect(page.locator(".gallery-card")).toHaveCount(35);
  await expect(page.locator(".gallery-card .rights-warning")).toHaveCount(0);
  await expect(page.locator(".gallery-card .photo-rights a")).toHaveCount(0);
  await page.selectOption("#archive-topic", "drone");
  await expect(page.locator("#archive-topic option:checked")).toHaveText(
    "Vista de dron",
  );
  await expect(page.locator(".gallery-card")).toHaveCount(14);
  for (const card of await page.locator(".gallery-card").all()) {
    await expect(card).toContainText("2018");
    await expect(card).toContainText("Marcio Barrios Lesmes");
  }
  for (const image of await page.locator(".gallery-card img").all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((img: HTMLImageElement) => img.decode());
  }
  await page.locator(".archive-controls").evaluate((el) => {
    el.scrollIntoView({ behavior: "instant", block: "start" });
    window.scrollBy({ top: -100, behavior: "instant" });
  });
  await page.screenshot({
    path: `test-results/${info.project.name}-drone.png`,
  });
  await page.locator('.header-tools [data-lang="es"]').click();
  await expect(page.locator("#archive-topic")).toHaveValue("drone");
  await expect(page.locator(".gallery-card")).toHaveCount(14);
  await expect(page.locator(".gallery-card").first()).toContainText(
    "Publicada con permiso del autor",
  );
  await page.selectOption("#archive-topic", "all");
  await page.fill("#archive-search", "familias");
  await expect(page.locator(".gallery-card")).toHaveCount(1);
  await expect(page.locator(".gallery-card")).toContainText("2019");
  await page.locator("#open-gallery-marcio-img-3714").click();
  await expect(page.locator("dialog")).toContainText("La noche de Sant Joan");
  await expect(page.locator("dialog")).toContainText("cenar fuera");
  await expect(page.locator("dialog")).toContainText("24 de junio");
  await page
    .locator("dialog img")
    .evaluate((img: HTMLImageElement) => img.decode());
  expect(
    await page
      .locator("dialog img")
      .evaluate(
        (img: HTMLImageElement) => img.naturalWidth < img.naturalHeight,
      ),
  ).toBe(true);
  await page.screenshot({
    path: `test-results/${info.project.name}-sant-joan-es.png`,
  });
  await page.locator('.lightbox-languages [data-lang="ca"]').click();
  await expect(page.locator("dialog")).toContainText("La nit de Sant Joan");
  await expect(page.locator("dialog")).toContainText("sopar a fora");
  await expect(page.locator("dialog")).toContainText("24 de juny");
  await expect(page.locator("dialog")).toContainText(
    "Tots els drets reservats",
  );
  await page.keyboard.press("Escape");
  await page.locator('[data-action="reset-filters"]').click();
  await page.selectOption("#archive-rights", "licensed");
  await expect(page.locator(".gallery-card")).toHaveCount(3);
  await page.selectOption("#archive-rights", "pending");
  await expect(page.locator(".gallery-card")).toHaveCount(16);
  await expect(page.locator(".gallery-card .rights-warning")).toHaveCount(16);
});

test("all new full-size images and responsive portraits load without the removed photo", async ({
  page,
  request,
}) => {
  await page.goto("/es/#arxiu");
  await page.selectOption("#archive-rights", "author");
  const ids = await page
    .locator(".gallery-card [data-photo]")
    .evaluateAll((buttons) =>
      buttons.map((button) => button.getAttribute("data-photo")!),
    );
  expect(ids).not.toContain("marcio-img-5032");
  expect(ids).not.toContain("marcio-img-5116");
  for (const id of ids) {
    const response = await request.get(`/assets/${id}-large.webp`);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/webp");
  }
  await expect(
    page.locator("#open-gallery-marcio-img-3057 img"),
  ).toHaveAttribute("srcset", /small.webp 720w, .*large.webp 1200w/);
  await expect(page.locator('img[src*="/street-"]')).toHaveCount(0);
  await expect(page.locator('a[href=""]')).toHaveCount(0);
  await page.goto("/es/?photo=marcio-img-7604");
  await expect(page.locator("dialog")).toBeVisible();
  await expect(page.locator("dialog")).toContainText("2026");
  await page
    .locator("dialog img")
    .evaluate((img: HTMLImageElement) => img.decode());
  await expect(page.locator("dialog img")).toHaveAttribute("width", "4284");
  await expect(page.locator("dialog img")).toHaveAttribute("height", "5712");
});
