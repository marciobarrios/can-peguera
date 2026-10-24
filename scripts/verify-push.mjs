import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Fail closed. This control permits only the selected website, never the archive.
const repository = "marciobarrios/can-peguera";
const allowedRefs = new Set([
  "refs/heads/codex/gallery-order-cleanup",
  "refs/heads/codex/fix-outbound-links",
  "refs/heads/codex/remove-roba-finestra",
  "refs/heads/codex/hero-photo-corner",
  "refs/heads/codex/can-peguera-own-photos",
  "refs/heads/codex/fix-mobile-history-overlap",
  "refs/heads/main",
  "refs/heads/codex/can-peguera-research-expansion",
]);
const allowedRoots = new Set([
  ".gitignore",
  "AGENTS.md",
  "README.md",
  "LLEGEIX-ME.md",
  "index.html",
  "vercel.json",
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
  "scripts/prepare-images.mjs",
  "scripts/check-static-images.mjs",
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
  /^public\/assets\/(?:(?:street|church|sundial|edge|masia|school|neighbors|panorama|construction|housing-plan|school-building|casa-poble|shelter-entrance|shelter-sealed|street-life|shelter-vault|shelter-plan|school-access|balco|shelter-survey|marcio-img-5115|marcio-drone-c618a5a5|marcio-dji-0020|marcio-dji-0022|marcio-dji-0023|marcio-dji-0025|marcio-dji-0028|marcio-dji-0142|marcio-dji-0143|marcio-dji-0146|marcio-dji-0147|marcio-dji-0152|marcio-dji-0154|marcio-drone-e2643a21|marcio-img-0415|marcio-img-0008|marcio-img-3057|marcio-img-3714|marcio-img-4328|marcio-img-4341|marcio-img-4357|marcio-img-4365|marcio-img-4607|marcio-img-4608|marcio-img-4609|marcio-img-4610|marcio-img-4611|marcio-img-4915|marcio-img-5030|marcio-img-5031|marcio-img-5062|marcio-img-5113|marcio-img-5114|marcio-img-5244|marcio-img-7604)-(?:small|large)|aerial-[0-5])\.webp$/;
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
    const limit = /^public\/assets\/marcio-.+-large\.webp$/.test(path)
      ? 1_300_000
      : 600_000;
    if (size > limit) fail(`Archivo demasiado grande: ${path}`);
    total += size;
  }
  if (entries.length > 150 || total > 32_000_000)
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
      typeof metadata.private !== "boolean"
    )
      fail("No se confirma el repositorio personal autorizado.");
    const updates = readFileSync(0, "utf8").trim().split("\n").filter(Boolean);
    if (!updates.length)
      fail("No hay una actualización concreta para verificar.");
    const checked = new Set();
    for (const update of updates) {
      const [localRef, localSha, remoteRef, remoteSha] = update.split(" ");
      if (
        !allowedRefs.has(localRef) ||
        remoteRef !== localRef ||
        /^0+$/.test(localSha)
      )
        fail(
          "Solo se permiten las ramas autorizadas, sin borrados ni cambios de destino.",
        );
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
      `Control de subida: ${checked.size} revisiones verificadas; solo web seleccionada, destino ${metadata.private ? "privado" : "público"}. Corpus bloqueado.`,
    );
  }
} catch (error) {
  console.error(`Subida bloqueada: ${error.message}`);
  process.exit(1);
}
