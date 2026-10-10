// Downsize masters; concert uses the established cheers two-ink export method.
const fs = require("node:fs/promises");
const path = require("node:path");
const Jimp = require("jimp-compact");

async function main() {
  const root = path.resolve(__dirname, "../..");
  const designAssets = path.join(__dirname, "../assets");
  const ids = ["do-hiking", "do-concert", "do-board-game", "do-picnic"];
  const revisions = { "do-concert": "v05", "do-board-game": "v02" };
  const filename = id => id + "-" + (revisions[id] || "v01") + ".png";
  const report = [];
  for (const id of ids) {
    const master = await Jimp.read(path.join(designAssets, "masters", filename(id)));
    const shape = master.clone();
    if (id === "do-concert") {
      const forest = [30, 81, 40];
      const lime = [216, 233, 168];
      const direction = forest.map((value, i) => value - lime[i]);
      const denominator = direction.reduce((sum, value) => sum + value * value, 0);
      shape.scan(0, 0, shape.bitmap.width, shape.bitmap.height, function (x, y, index) {
        const coverage = direction.reduce(
          (sum, value, i) => sum + (this.bitmap.data[index + i] - lime[i]) * value, 0
        ) / denominator;
        for (let c = 0; c < 3; c++) this.bitmap.data[index + c] = forest[c];
        this.bitmap.data[index + 3] = Math.round(Math.max(0, Math.min(1, (coverage - 0.08) / 0.84)) * 255);
      });
    }
    const exported = shape.resize(192, 192, Jimp.RESIZE_BICUBIC);
    const file = "assets/images/illustrations/" + filename(id);
    await exported.writeAsync(path.join(root, file));
    let transparent = 0;
    let nonzero = 0;
    let minimumAlpha = 255;
    let maximumAlpha = 0;
    exported.scan(0, 0, 192, 192, function (x, y, i) {
      const alpha = this.bitmap.data[i + 3];
      if (alpha === 0) transparent++;
      else nonzero++;
      minimumAlpha = Math.min(minimumAlpha, alpha);
      maximumAlpha = Math.max(maximumAlpha, alpha);
    });
    report.push({
      file, width: 192, height: 192,
      masterWidth: master.bitmap.width, masterHeight: master.bitmap.height,
      bytes: (await fs.stat(path.join(root, file))).size,
      transparentPixels: transparent, nonzeroAlphaPixels: nonzero,
      minimumAlpha, maximumAlpha,
    });
  }
  await fs.writeFile(path.join(designAssets, "exports/onboarding-icons-report-v02.json"), JSON.stringify(report, null, 2) + "\n");

  // Columns: cheers reference, hiking, concert, board game, picnic.
  // Rows: enlarged; 32/48/48 px on white; same sizes on charcoal.
  const preview = new Jimp(1000, 520, 0xF4F8E9FF);
  for (const [column, id] of ["do-cheers", ...ids].entries()) {
    const icon = await Jimp.read(path.join(root, "assets/images/illustrations", filename(id)));
    const x = column * 200;
    preview.composite(icon.clone().resize(164, 164), x + 18, 48);
    const light = new Jimp(184, 90, 0xFFFFFFFF);
    const dark = new Jimp(184, 90, 0x191A19FF);
    for (const [offset, size] of [[16, 32], [70, 48], [124, 48]]) {
      light.composite(icon.clone().resize(size, size), offset, (90 - size) / 2);
      dark.composite(icon.clone().resize(size, size), offset, (90 - size) / 2);
    }
    preview.composite(light, x + 8, 284);
    preview.composite(dark, x + 8, 400);
  }
  await preview.writeAsync(path.join(designAssets, "exports/onboarding-icons-preview-v02.png"));
  console.log(JSON.stringify(report, null, 2));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
