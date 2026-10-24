import fs from "node:fs/promises";
const html = await fs.readFile("dist/index.html", "utf8");
for (const lang of ["ca", "es"]) {
  await fs.mkdir(`dist/${lang}`, { recursive: true });
  let content = html.replace('lang="ca"', `lang="${lang}"`);
  if (lang === "es")
    content = content
      .replaceAll("memòria viva", "memoria viva")
      .replace(
        "Les cases, la vida quotidiana i la història compartida de Can Peguera, Barcelona.",
        "Las casas, la vida cotidiana y la historia compartida de Can Peguera, Barcelona.",
      )
      .replace(
        "Un arxiu del barri, en català i castellà.",
        "Un archivo del barrio, en catalán y castellano.",
      );
  await fs.writeFile(`dist/${lang}/index.html`, content);
}

const images = JSON.parse(
  await fs.readFile("src/generated/images.json", "utf8"),
).files;
const rights = JSON.parse(
  await fs.readFile("public/asset-rights.json", "utf8"),
);
const published = rights.flatMap((record) => {
  const image = images[record.file.replace("assets/", "")];
  const original = {
    ...record,
    sourceDerivative: record.file,
    file: image.url.slice(1),
  };
  return image.preview
    ? [
        original,
        {
          ...original,
          file: image.preview.url.slice(1),
          bytes: image.preview.bytes,
          transformations: `${record.transformations}; static 1280px gallery preview`,
        },
      ]
    : [original];
});
await fs.writeFile(
  "dist/asset-rights.json",
  `${JSON.stringify(published, null, 2)}\n`,
);
for (const name of await fs.readdir("dist/assets")) {
  if (name.endsWith(".webp")) await fs.unlink(`dist/assets/${name}`);
}
