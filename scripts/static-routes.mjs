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
