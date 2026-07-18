import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const src = "src/assets/hero-bg.jpg";
const outDir = "public/assets/responsive";
await mkdir(outDir, { recursive: true });
for (const w of [640, 1024, 1600, 1920]) {
  await sharp(src).resize({ width: w }).jpeg({ quality: 78, mozjpeg: true }).toFile(`${outDir}/hero-bg-${w}.jpg`);
  await sharp(src).resize({ width: w }).webp({ quality: 76 }).toFile(`${outDir}/hero-bg-${w}.webp`);
}
console.log("hero variants generated");
