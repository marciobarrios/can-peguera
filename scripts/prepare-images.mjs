import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

// Generated static files only: no transformation service runs during a visit.
const directory = "public/media";
const manifestPath = "src/generated/images.json";
const version = 1; // Bump when changing the preview recipe.
const previous = await fs
  .readFile(manifestPath, "utf8")
  .then(JSON.parse)
  .catch(() => ({}));
const files = {};
const active = new Set();
await fs.mkdir(directory, { recursive: true });
await fs.mkdir("src/generated", { recursive: true });
const exists = async (url) =>
  fs
    .access(`public${url}`)
    .then(() => true)
    .catch(() => false);
const hash = (buffer) =>
  createHash("sha256").update(buffer).digest("hex").slice(0, 16);
async function save(name, buffer) {
  const url = `/media/${name.replace(/\.webp$/, "")}.${hash(buffer)}.webp`;
  if (!(await exists(url))) await fs.writeFile(`public${url}`, buffer);
  const { width, height } = await sharp(buffer).metadata();
  return { url, width, height, bytes: buffer.length };
}
for (const name of (await fs.readdir("public/assets"))
  .filter((name) => name.endsWith(".webp"))
  .sort()) {
  const buffer = await fs.readFile(`public/assets/${name}`);
  const old = previous.version === version ? previous.files?.[name] : null;
  let entry;
  if (
    old?.url.endsWith(`.${hash(buffer)}.webp`) &&
    (await exists(old.url)) &&
    (!old.preview || (await exists(old.preview.url)))
  ) {
    entry = old;
  } else {
    entry = await save(name, buffer);
    if (name.endsWith("-large.webp") && entry.width > 1280) {
      const preview = await sharp(buffer)
        .resize({ width: 1280, withoutEnlargement: true })
        .webp({ quality: 77, effort: 6 })
        .toBuffer();
      entry.preview = await save(
        name.replace("-large.webp", "-preview.webp"),
        preview,
      );
    }
  }
  files[name] = entry;
  active.add(entry.url.split("/").at(-1));
  if (entry.preview) active.add(entry.preview.url.split("/").at(-1));
}
// Remove stale generated versions, never source derivatives.
for (const name of await fs.readdir(directory)) {
  if (/^[\w-]+\.[a-f0-9]{16}\.webp$/.test(name) && !active.has(name))
    await fs.unlink(`${directory}/${name}`);
}
await fs.writeFile(
  manifestPath,
  `${JSON.stringify({ version, files }, null, 2)}\n`,
);
console.log(
  `Static images: ${active.size} versioned files; gallery previews at most 1280px wide.`,
);
