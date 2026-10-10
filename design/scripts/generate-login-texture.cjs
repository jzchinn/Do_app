// Procedurally paints the login screen's brushed green texture, fading to white at the bottom.
// Output: assets/images/login/login-bg-texture-v01.jpg (opaque; white fade baked in, so it sits on the white screen).
// Deterministic (fixed seed). Colors are sampled from design/assets/drafts/login-do-v11-refreshed.png.
// Run: node design/scripts/generate-login-texture.cjs
const fs = require("node:fs/promises");
const path = require("node:path");
const Jimp = require("jimp-compact");

const root = path.resolve(__dirname, "../..");
const WIDTH = 1170; // 390 pt at 3x
const HEIGHT = 1100; // ~366 pt: solid green to ~293 pt, then fades to white (as in the mockup)
const FADE_START = 880;
const STROKE_ANGLE = (-62 * Math.PI) / 180; // brush strokes run steeply, upper-right to lower-left

const DARK = [6, 84, 22];
const BASE = [11, 104, 28];
const LIGHT = [38, 152, 40];

function hash(ix, iy, seed) {
  let h = (ix * 374761393 + iy * 668265263 + seed * 1442695041) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function valueNoise(x, y, seed) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy, seed);
  const b = hash(ix + 1, iy, seed);
  const c = hash(ix, iy + 1, seed);
  const d = hash(ix + 1, iy + 1, seed);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

const mix = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.max(0, Math.min(1, v));

// Noise stretched along the stroke direction: slow along, fast across.
function streaks(x, y, along, across, seed) {
  const cos = Math.cos(STROKE_ANGLE);
  const sin = Math.sin(STROKE_ANGLE);
  return valueNoise((x * cos + y * sin) * along, (-x * sin + y * cos) * across, seed);
}

async function main() {
  const image = new Jimp(WIDTH, HEIGHT, 0xffffffff);
  image.scan(0, 0, WIDTH, HEIGHT, function (x, y, i) {
    // A gentle wobble bends the strokes so they don't look ruled.
    const wx = x + 60 * valueNoise(x * 0.004, y * 0.004, 1);
    const wy = y + 60 * valueNoise(x * 0.004 + 9, y * 0.004, 2);

    const broad = streaks(wx, wy, 0.0025, 0.012, 3) * 0.5 + streaks(wx, wy, 0.004, 0.03, 4) * 0.5;
    const bristle = streaks(wx, wy, 0.012, 0.22, 5) * 0.6 + streaks(wx, wy, 0.03, 0.5, 6) * 0.4;
    const grain = valueNoise(x * 0.35, y * 0.35, 7);

    // Light strokes are sparse; most of the surface stays near the base green.
    const light = clamp01((broad - 0.42) * 3) * bristle;
    const dark = clamp01((0.5 - bristle) * 2) * 0.7 + clamp01((0.4 - broad) * 2) * 0.3;
    const t = clamp01(light * 0.9 + (grain - 0.5) * 0.32 + (bristle - 0.5) * 0.25);

    const rgb = [0, 1, 2].map((c) => {
      const toDark = mix(BASE[c], DARK[c], clamp01(dark));
      return mix(toDark, LIGHT[c], t);
    });

    // Fade to white at the bottom (smoothstep).
    const f = clamp01((y - FADE_START) / (HEIGHT - FADE_START));
    const fade = f * f * (3 - 2 * f);
    for (let c = 0; c < 3; c++) {
      this.bitmap.data[i + c] = Math.round(mix(rgb[c], 255, fade));
    }
    this.bitmap.data[i + 3] = 255;
  });

  const file = "assets/images/login/login-bg-texture-v01.jpg";
  await image.quality(88).writeAsync(path.join(root, file));
  const bytes = (await fs.stat(path.join(root, file))).size;
  console.log({ file, width: WIDTH, height: HEIGHT, bytes });
}

main();
