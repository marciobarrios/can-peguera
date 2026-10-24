import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import sharp from "sharp";
const read = async (path) => JSON.parse(await fs.readFile(path, "utf8"));
const { files } = await read("src/generated/images.json");
const rights = await read("dist/asset-rights.json");
const sourceRights = await read("public/asset-rights.json");
const expected = [];
for (const [name, full] of Object.entries(files)) {
  const source = await fs.readFile(`public/assets/${name}`);
  assert.equal(source.length, full.bytes);
  assert.ok(
    full.url.includes(
      createHash("sha256").update(source).digest("hex").slice(0, 16),
    ),
  );
  for (const image of [full, ...(full.preview ? [full.preview] : [])]) {
    const buffer = await fs.readFile(`dist${image.url}`);
    const digest = createHash("sha256")
      .update(buffer)
      .digest("hex")
      .slice(0, 16);
    assert.ok(
      image.url.endsWith(`.${digest}.webp`),
      "Cache URL must change with content",
    );
    const metadata = await sharp(buffer).metadata();
    assert.equal(metadata.width, image.width);
    assert.equal(metadata.height, image.height);
    assert.ok(image.width <= full.width && image.height <= full.height);
    const attribution = rights.find(
      (record) => record.file === image.url.slice(1),
    );
    const original = sourceRights.find(
      (record) => record.file === `assets/${name}`,
    );
    assert.equal(attribution.author, original.author);
    assert.equal(attribution.pending, original.pending);
    assert.equal(attribution.source, original.source);
    assert.equal(attribution.bytes, buffer.length);
    expected.push(image.url.split("/").at(-1));
  }
  if (full.preview) assert.ok(full.preview.width <= 1280);
}
assert.deepEqual((await fs.readdir("dist/media")).sort(), expected.sort());
assert.equal(rights.length, expected.length);
assert.ok(
  !(await fs.readdir("dist/assets")).some((name) => name.endsWith(".webp")),
);
const config = await read("vercel.json");
assert.deepEqual(config.headers, [
  {
    source: "/media/:path*",
    headers: [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ],
  },
]);
console.log(
  `Static image output passed: ${expected.length} hash-verified files, bounded previews, attribution and cache policy.`,
);
