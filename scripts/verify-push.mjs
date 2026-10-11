import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Fail closed. This control permits only the selected website, never the archive.
const repository = "marciobarrios/can-peguera";
const allowedRoots = new Set([
  ".gitignore",
  "AGENTS.md",
  "README.md",
  "LLEGEIX-ME.md",
  "index.html",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "eslint.config.js",
  "playwright.config.ts",
  ".githooks/pre-push",
  "docs/DISENO.md",
  "docs/DERECHOS.md",
  "docs/VERIFICACION.md",
  "docs/licenses/Bitter-OFL.txt",
  "docs/licenses/DM-Sans-OFL.txt",
  "scripts/check-content.mjs",
  "scripts/static-routes.mjs",
  "scripts/verify-push.mjs",
  "tests/site.spec.ts",
  "src/main.ts",
  "src/content.ts",
  "src/style.css",
  "src/vite-env.d.ts",
  "src/timeline.json",
  "src/gallery.json",
  "src/sources.json",
  "src/map-data.json",
  "public/asset-rights.json",
  "public/favicon.svg",
  "public/robots.txt",
]);
const asset =
  /^public\/assets\/(?:(?:street|church|sundial|edge|masia|school|neighbors|panorama)-(?:small|large)|aerial-[0-5])\.webp$/;
const git = (...args) =>
  execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  }).trim();
const fail = (message) => {
  throw new Error(message);
};

function inspect(revision) {
  if (!/^[0-9a-f]{40}$/.test(revision)) fail("Revisión Git no válida.");
  const entries = git("ls-tree", "-rlz", revision).split("\0").filter(Boolean);
  let total = 0;
  for (const entry of entries) {
    const match = entry.match(/^(\d+) (\w+) ([0-9a-f]+)\s+(\d+)\t([\s\S]+)$/);
    if (!match) fail("Entrada Git no admitida.");
    const [, mode, type, , sizeText, path] = match;
    const size = Number(sizeText);
    if (type !== "blob" || !["100644", "100755"].includes(mode))
      fail(`No se admiten enlaces ni submódulos: ${path}`);
    if (!allowedRoots.has(path) && !asset.test(path))
      fail(`Ruta ajena a la web seleccionada: ${path}`);
    if (size > 600_000) fail(`Archivo demasiado grande: ${path}`);
    total += size;
  }
  if (entries.length > 80 || total > 8_000_000)
    fail("El árbol excede el presupuesto de la web.");
  return { files: entries.length, bytes: total };
}

try {
  if (process.argv[2] === "--inspect") {
    console.log(JSON.stringify(inspect(process.argv[3])));
  } else {
    const [remote, url] = process.argv.slice(2);
    if (remote !== "origin" || url !== `https://github.com/${repository}.git`)
      fail("Solo se permite el repositorio personal autorizado.");
    const metadata = JSON.parse(
      execFileSync(
        "gh",
        [
          "api",
          `repos/${repository}`,
          "--jq",
          "{full_name,private,owner:.owner.login}",
        ],
        { encoding: "utf8" },
      ),
    );
    if (
      metadata.full_name !== repository ||
      metadata.owner !== "marciobarrios" ||
      metadata.private !== true
    )
      fail("No se confirma el destino privado autorizado.");
    const updates = readFileSync(0, "utf8").trim().split("\n").filter(Boolean);
    if (!updates.length)
      fail("No hay una actualización concreta para verificar.");
    const checked = new Set();
    for (const update of updates) {
      const [localRef, localSha, remoteRef, remoteSha] = update.split(" ");
      if (
        localRef !== "refs/heads/main" ||
        remoteRef !== "refs/heads/main" ||
        /^0+$/.test(localSha)
      )
        fail("Solo se permite actualizar main sin borrarla.");
      if (!/^0+$/.test(remoteSha))
        git("merge-base", "--is-ancestor", remoteSha, localSha);
      for (const revision of git("rev-list", localSha).split("\n")) {
        if (!checked.has(revision)) {
          inspect(revision);
          checked.add(revision);
        }
      }
    }
    console.log(
      `Control de subida: ${checked.size} revisiones verificadas; solo web seleccionada, destino privado. Corpus bloqueado.`,
    );
  }
} catch (error) {
  console.error(`Subida bloqueada: ${error.message}`);
  process.exit(1);
}
