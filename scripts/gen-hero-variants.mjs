/**
 * Prebuild: generate responsive hero variants (WebP + JPEG) from the source
 * `public/assets/hero-bg.jpg`.
 *
 * Resilient by design: this step is an optimization, not a correctness
 * requirement. If the source is missing, `sharp` fails to load, or a single
 * variant can't be written, we log a clear warning and exit 0 so the build
 * keeps going. The runtime `<HeroBackground>` component has an onError
 * fallback to the source JPEG.
 *
 * We also skip work when every target already exists and is newer than the
 * source — makes repeat builds and CI cache hits fast.
 */
import { mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = "public/assets/hero-bg.jpg";
const OUT_DIR = "public/assets/responsive";
const WIDTHS = [640, 1024, 1600, 1920];

function warn(msg) {
  console.warn(`[gen-hero-variants] ⚠️  ${msg} — skipping (build continues).`);
}

async function main() {
  if (!existsSync(SRC)) {
    warn(`source image not found at ${SRC}`);
    return;
  }

  const srcStat = await stat(SRC);
  const targets = WIDTHS.flatMap((w) => [
    path.join(OUT_DIR, `hero-bg-${w}.jpg`),
    path.join(OUT_DIR, `hero-bg-${w}.webp`),
    path.join(OUT_DIR, `hero-bg-${w}.avif`),
  ]);

  const upToDate = await Promise.all(
    targets.map(async (t) => {
      if (!existsSync(t)) return false;
      const s = await stat(t);
      return s.mtimeMs >= srcStat.mtimeMs;
    }),
  );
  if (upToDate.every(Boolean)) {
    console.log("[gen-hero-variants] up to date, nothing to do.");
    return;
  }

  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch (err) {
    warn(`could not load 'sharp' (${err?.message || err})`);
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });

  for (const w of WIDTHS) {
    try {
      await sharp(SRC)
        .resize({ width: w })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(path.join(OUT_DIR, `hero-bg-${w}.jpg`));
      await sharp(SRC)
        .resize({ width: w })
        .webp({ quality: 76 })
        .toFile(path.join(OUT_DIR, `hero-bg-${w}.webp`));
    } catch (err) {
      warn(`failed to write width=${w} (${err?.message || err})`);
    }
  }
  console.log("[gen-hero-variants] ✅ generated hero variants.");
}

main().catch((err) => {
  warn(`unexpected error (${err?.message || err})`);
  process.exit(0);
});
