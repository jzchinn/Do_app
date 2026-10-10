// Builds assets/images/login/login-do-photo-v01.png: the toast photo cropped to the
// Do silhouette with a white outline, on a transparent background.
// The silhouette is a geometric model fitted to design/assets/drafts/login-do-v11-refreshed.png
// (coordinates below are that mockup's 853 x 1844 pixel space). Run: node design/scripts/export-login-assets.cjs
const fs = require("node:fs/promises");
const path = require("node:path");
const Jimp = require("jimp-compact");

const root = path.resolve(__dirname, "../..");
const SCALE = 1.5; // mockup px -> export px (about 3x density at the mockup's ~2.19 px/pt)
const OUTLINE = 7; // white outline width in mockup px
const PAD = 2;

// Photo-edge silhouette (inside the outline): a "D" with a square left edge joined to an "o".
const shape = { left: 203, top: 446, right: 530, bottom: 862, dRadius: 170, ox: 549, oy: 726, oRadius: 131 };

function roundedRect(x, y, l, t, r, b, radius) {
  const hx = (r - l) / 2 - radius;
  const hy = (b - t) / 2 - radius;
  const dx = Math.abs(x - (l + r) / 2) - hx;
  const dy = Math.abs(y - (t + b) / 2) - hy;
  return Math.hypot(Math.max(dx, 0), Math.max(dy, 0)) + Math.min(Math.max(dx, dy), 0) - radius;
}

// Signed distance to the silhouette edge in mockup px: negative inside, positive outside.
function distance(x, y) {
  const s = shape;
  const d = Math.min(
    roundedRect(x, y, s.left, s.top, s.right, s.bottom, s.dRadius),
    // sharp left corners: the D's left edge is straight
    roundedRect(x, y, s.left, s.top, s.left + s.dRadius, s.bottom, 0),
  );
  return Math.min(d, Math.hypot(x - s.ox, y - s.oy) - s.oRadius);
}

const clamp01 = (v) => Math.max(0, Math.min(1, v));

async function main() {
  const photo = await Jimp.read(path.join(root, "design/assets/masters/quan-nguyen-toast-cleaned-v01.png"));
  const x0 = shape.left - OUTLINE - PAD;
  const y0 = shape.top - OUTLINE - PAD;
  const x1 = Math.max(shape.right, shape.ox + shape.oRadius) + OUTLINE + PAD;
  const y1 = shape.bottom + OUTLINE + PAD;
  const width = Math.round((x1 - x0) * SCALE);
  const height = Math.round((y1 - y0) * SCALE);

  // Cover-fit the photo to the silhouette box, centered.
  const boxW = (x1 - x0) * SCALE;
  const boxH = (y1 - y0) * SCALE;
  const cover = Math.max(boxW / photo.bitmap.width, boxH / photo.bitmap.height);
  const scaled = photo.clone().resize(Math.ceil(photo.bitmap.width * cover), Math.ceil(photo.bitmap.height * cover), Jimp.RESIZE_BICUBIC);
  const offX = Math.round((scaled.bitmap.width - width) / 2);
  const offY = Math.round((scaled.bitmap.height - height) / 2);

  const out = new Jimp(width, height, 0x00000000);
  out.scan(0, 0, width, height, function (px, py, i) {
    const d = distance(x0 + (px + 0.5) / SCALE, y0 + (py + 0.5) / SCALE) * SCALE; // export px
    const outer = clamp01(0.5 - (d - OUTLINE * SCALE)); // outline + photo coverage
    if (outer === 0) return;
    const inner = clamp01(0.5 - d); // photo coverage
    const src = scaled.bitmap.data;
    const si = ((py + offY) * scaled.bitmap.width + (px + offX)) * 4;
    for (let c = 0; c < 3; c++) {
      this.bitmap.data[i + c] = Math.round(255 * (1 - inner) + src[si + c] * inner);
    }
    this.bitmap.data[i + 3] = Math.round(outer * 255);
  });

  const file = "assets/images/login/login-do-photo-v01.png";
  await out.writeAsync(path.join(root, file));
  const bytes = (await fs.stat(path.join(root, file))).size;
  const report = { file, width, height, bytes, mockupBox: { x0, y0, x1, y1 }, scale: SCALE };
  await fs.writeFile(path.join(root, "design/assets/exports/login-do-photo-report-v01.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(report);
}

main();
