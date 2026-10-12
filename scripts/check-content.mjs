import fs from "node:fs/promises";
import assert from "node:assert/strict";
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
assert.equal(photos.length, 20);
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
  assert.ok(p.source.startsWith("https://"));
  assert.ok(p.holder);
  assert.ok(p.year === null || Number.isInteger(p.year));
  if (!p.pending) {
    assert.ok(p.license);
    assert.ok(p.licenseUrl);
  }
  for (const size of ["small", "large"])
    await fs.access(`public/assets/${p.id}-${size}.webp`);
}
assert.equal(photos.filter((p) => p.pending).length, 16);
for (const a of assets) {
  assert.ok(a.bytes < 600_000, `${a.file} too large`);
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
assert.ok(total < 7_500_000);
console.log(
  `Content passed: ${events.length} events, ${photos.length} curated images, ${sources.length} source records, ${map.points.length} places, ${map.points.filter((p) => p.xy).length} map points, 6 aerials. ${assets.length} assets / ${total} bytes.`,
);
