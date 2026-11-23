const fs = require('fs');
const Jimp = require('jimp-compact');
(async () => {
  const report = [];
  for (const subject of ['tennis', 'picnic', 'games']) {
    const input = `design/assets/masters/home-${subject}-v01.png`;
    const output = `assets/images/home/home-${subject}-v01.jpg`;
    const image = await Jimp.read(input);
    const original = { width: image.bitmap.width, height: image.bitmap.height };
    await image.cover(480, 294).quality(85).writeAsync(output);
    report.push({ input, original, output, width: 480, height: 294, bytes: fs.statSync(output).size, transparent: false });
  }
  fs.writeFileSync('design/assets/exports/home-photos-v01.json', JSON.stringify(report, null, 2) + '\n');
})();
