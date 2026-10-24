import fs from "node:fs/promises";
import assert from "node:assert/strict";
import sharp from "sharp";
const read = async (p) => JSON.parse(await fs.readFile(p, "utf8"));
const [events, photos, sources, map, assets] = await Promise.all(
  [
    "src/timeline.json",
    "src/gallery.json",
    "src/sources.json",
    "src/map-data.json",
    "public/asset-rights.json",
  ].map(read),
);
assert.equal(events.length, 31);
assert.equal(photos.length, 54);
assert.equal(new Set(photos.map((p) => p.id)).size, photos.length);
assert.ok(!photos.some((p) => p.id === "street"));
assert.equal(map.points.length, 10);
assert.equal(map.aerial.length, 6);
const sourceIds = new Set(sources.map((s) => s.id));
assert.equal(sourceIds.size, sources.length);
for (const e of events) {
  for (const field of ["date", "title", "note"]) {
    assert.ok(e[field].ca);
    assert.ok(e[field].es);
  }
  for (const id of e.sources) assert.ok(sourceIds.has(id), id);
}
assert.equal(events.filter((e) => e.scheduled).length, 1);
assert.equal(events.find((e) => e.scheduled).id, "paisatges-perduts-actividad");
for (const p of photos) {
  for (const field of ["title", "alt", "date"]) {
    assert.ok(p[field].ca);
    assert.ok(p[field].es);
  }
  if (p.permission === "author") {
    assert.equal(p.author, "Marcio Barrios Lesmes");
    assert.equal(p.holder, p.author);
    assert.equal(p.pending, false);
    assert.equal(p.license, "");
    assert.equal(p.licenseUrl, "");
    assert.equal(p.source, "");
    assert.ok(p.note.ca && p.note.es);
    assert.ok(p.sourceFile && !p.sourceFile.startsWith("/"));
    assert.equal(p.dateSource, "EXIF DateTimeOriginal");
    assert.match(p.capturedAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
    assert.ok(Number.isFinite(Date.parse(p.capturedAt)));
    assert.equal(p.year, Number(p.capturedAt.slice(0, 4)));
    assert.equal(p.date.ca, String(p.year));
    assert.equal(p.date.es, String(p.year));
    assert.equal(p.topic === "drone", p.sourceFile.startsWith("Drone view/"));
    for (const size of ["small", "large"]) {
      const file = `assets/${p.id}-${size}.webp`;
      const record = assets.find((a) => a.file === file);
      assert.equal(record?.author, p.author);
      assert.equal(record?.permission, "author");
      assert.equal(record?.source, p.sourceFile);
      assert.equal(record?.capturedAt, p.capturedAt);
      const meta = await sharp(`public/${file}`).metadata();
      assert.equal(meta.format, "webp");
      assert.equal(meta.width, p[`${size}Width`]);
      assert.ok(meta.width <= p.width && meta.height <= p.height);
      if (size === "large")
        assert.equal(
          Math.max(meta.width, meta.height),
          Math.min(2560, Math.max(p.width, p.height)),
        );
      assert.ok(
        Math.abs(meta.width / meta.height - p.width / p.height) < 0.002,
      );
      assert.ok(!meta.exif && !meta.xmp);
    }
  } else {
    assert.ok(p.source.startsWith("https://"));
  }
  assert.ok(p.holder);
  assert.ok(p.year === null || Number.isInteger(p.year));
  if (!p.pending && p.permission !== "author") {
    assert.ok(p.license);
    assert.ok(p.licenseUrl);
  }
  for (const size of ["small", "large"])
    await fs.access(`public/assets/${p.id}-${size}.webp`);
}
assert.equal(photos.filter((p) => p.pending).length, 16);
assert.equal(photos.filter((p) => p.permission === "author").length, 35);
assert.equal(photos.filter((p) => p.topic === "drone").length, 14);
assert.ok(
  !photos.some((p) =>
    ["IMG_5032.jpg", "IMG_5116.jpg"].includes(p.originalTitle),
  ),
);
const expectedAssets = [
  ...photos.flatMap((p) =>
    ["small", "large"].map((size) => `assets/${p.id}-${size}.webp`),
  ),
  ...map.aerial.map((a) => `assets/${a.file}`),
].sort();
assert.deepEqual(assets.map((a) => a.file).sort(), expectedAssets);
assert.deepEqual(
  (await fs.readdir("public/assets")).map((name) => `assets/${name}`).sort(),
  expectedAssets,
);
for (const a of assets) {
  const limit =
    a.permission === "author" && a.file.endsWith("-large.webp")
      ? 1_300_000
      : 600_000;
  assert.ok(a.bytes < limit, `${a.file} too large`);
  assert.equal((await fs.stat(`public/${a.file}`)).size, a.bytes);
}
assert.ok(map.boundary.length > 20);
for (const p of map.points) {
  assert.ok(p.name.ca && p.name.es);
  assert.equal(Boolean(p.xy), Boolean(p.coordinates));
  if (p.xy) assert.ok(p.xy.every((v) => v >= 0 && v <= 1000));
  else assert.ok(p.location.ca && p.location.es);
  for (const id of p.sources) assert.ok(sourceIds.has(id), id);
  if (p.photo) assert.ok(photos.some((photo) => photo.id === p.photo));
}
const total = assets.reduce((n, a) => n + a.bytes, 0);
assert.ok(total < 31_500_000);
console.log(
  `Content passed: ${events.length} events, ${photos.length} curated images, ${sources.length} source records, ${map.points.length} places, ${map.points.filter((p) => p.xy).length} map points, 6 aerials. ${assets.length} assets / ${total} bytes.`,
);
