// Platform exports from the generated two-color master. Uses Expo's existing
// transitive image utility; no dependency is added to the mobile application.
const fs = require('node:fs/promises');
const path = require('node:path');
const Jimp = require('jimp-compact');

const root = path.resolve(__dirname, '../..');
const forest = [30, 81, 40];
const lime = [216, 233, 168];
const rgba = (rgb, alpha = 255) => Jimp.rgbaToInt(...rgb, alpha);

async function main() {
  const master = await Jimp.read(path.join(__dirname, 'masters/do-cheers-v03.png'));
  // Separate the generated flat ink from its background for adaptive/monochrome
  // exports, snapping the two inks to the sampled palette and retaining edge alpha.
  const mark = master.clone();
  const direction = lime.map((value, i) => value - forest[i]);
  const denominator = direction.reduce((sum, value) => sum + value * value, 0);
  mark.scan(0, 0, mark.bitmap.width, mark.bitmap.height, function (x, y, index) {
    const projection = direction.reduce(
      (sum, value, i) => sum + (this.bitmap.data[index + i] - forest[i]) * value, 0
    ) / denominator;
    const alpha = Math.round(Math.max(0, Math.min(1, (projection - 0.08) / 0.84)) * 255);
    this.bitmap.data[index] = lime[0];
    this.bitmap.data[index + 1] = lime[1];
    this.bitmap.data[index + 2] = lime[2];
    this.bitmap.data[index + 3] = alpha;
  });

  let x0 = mark.bitmap.width, y0 = mark.bitmap.height, x1 = 0, y1 = 0;
  mark.scan(0, 0, mark.bitmap.width, mark.bitmap.height, function (x, y, index) {
    if (this.bitmap.data[index + 3] > 0) {
      x0 = Math.min(x0, x); y0 = Math.min(y0, y);
      x1 = Math.max(x1, x); y1 = Math.max(y1, y);
    }
  });
  const tight = mark.clone().crop(x0, y0, x1 - x0 + 1, y1 - y0 + 1);
  const output = path.join(root, 'assets/images');
  const report = [];
  async function write(name, width, height, fraction, background, ink = lime) {
    const canvas = new Jimp(width, height, background ? rgba(background) : 0);
    if (fraction) {
      const shape = tight.clone();
      shape.scan(0, 0, shape.bitmap.width, shape.bitmap.height, function (x, y, i) {
        for (let c = 0; c < 3; c++) this.bitmap.data[i + c] = ink[c];
      });
      shape.scaleToFit(Math.round(width * fraction), Math.round(height * fraction));
      canvas.composite(shape, Math.round((width - shape.bitmap.width) / 2), Math.round((height - shape.bitmap.height) / 2));
    }
    const destination = path.join(output, name);
    await canvas.writeAsync(destination);
    report.push({ file: name, width, height, bytes: (await fs.stat(destination)).size, transparent: !background });
    return canvas;
  }
  const icon = await write('icon.png', 1024, 1024, 0.70, forest);
  const foreground = await write('android-icon-foreground.png', 512, 512, 0.44, null);
  await write('android-icon-background.png', 512, 512, 0, forest);
  await write('android-icon-monochrome.png', 432, 432, 0.44, null, [25, 26, 25]);
  const splash = await write('splash-icon.png', 1024, 1024, 0.86, null);
  await write('favicon.png', 48, 48, 0.78, forest);
  await write('do-cheers-v01.png', 1024, 1024, 0.86, null, forest);
  for (const [name, size] of [['react-logo.png', 100], ['react-logo@2x.png', 200], ['react-logo@3x.png', 300]]) {
    await write(name, size, size, 0.86, null, forest);
  }
  await write('partial-react-logo.png', 518, 316, 0.85, null, forest);

  const sheet = await Jimp.read(path.join(__dirname, 'masters/design-system-v01.png'));
  sheet.resize(1536, 1024);
  await sheet.writeAsync(path.join(root, 'assets/01-design-system.png'));
  await sheet.writeAsync(path.join(root, 'prompt_material/01-design-system.png'));
  await fs.writeFile(path.join(__dirname, 'export-report.json'), JSON.stringify(report, null, 2) + '\n');

  // Actual exported pixels at small sizes, transparency on light/dark, adaptive
  // circle mask, and monochrome. QA only; never imported by the app.
  const preview = new Jimp(960, 600, 0xF4F8E9FF);
  preview.composite(icon.clone().resize(240, 240), 30, 30);
  const light = new Jimp(240, 240, 0xFFFFFFFF);
  light.composite((await Jimp.read(path.join(output, 'do-cheers-v01.png'))).resize(190, 190), 25, 25);
  preview.composite(light, 300, 30);
  const dark = new Jimp(240, 240, 0x191A19FF);
  dark.composite(splash.clone().resize(190, 190), 25, 25);
  preview.composite(dark, 570, 30);
  for (const [i, size] of [24, 32, 48, 64].entries()) {
    preview.composite(icon.clone().resize(size, size), 30 + i * 90, 325);
  }
  const adaptive = new Jimp(512, 512, rgba(forest));
  adaptive.composite(foreground, 0, 0);
  // Android masks the central 72/108 viewport; the central 66/108 circle is safe.
  adaptive.crop(85, 85, 342, 342).resize(160, 160).circle();
  preview.composite(adaptive, 450, 320);
  const monochrome = new Jimp(160, 160, rgba(lime));
  monochrome.composite((await Jimp.read(path.join(output, 'android-icon-monochrome.png'))).crop(72, 72, 288, 288).resize(160, 160), 0, 0).circle();
  preview.composite(monochrome, 660, 320);
  await preview.writeAsync(path.join(__dirname, 'asset-preview.png'));
  console.log(JSON.stringify(report, null, 2));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
