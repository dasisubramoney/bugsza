// One-off asset generation script — run manually with `node scripts/generate-image-assets.mjs`
// whenever a source logo/photo changes. Not part of the build (outputs are
// committed like any other static asset), so it stays a devDependency-only
// tool. Produces:
//   - favicons (cropped to the beetle mark alone — the full logotype doesn't
//     read at 16-32px) + apple-touch-icon
//   - a 1200x630 Open Graph / Twitter card image
//   - resized + WebP versions of the large source photos, since the
//     originals are served far larger than they're ever displayed
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const ORANGE = '#F7941D'

mkdirSync('public', { recursive: true })

// --- Favicons, cropped to the beetle mark only -----------------------
const logo = 'src/assets/Bugz_co_za_Updated_Logo.png'
const beetleCrop = { left: 0, top: 15, width: 415, height: 425 }

async function writeFavicon(size, outPath) {
  await sharp(logo)
    .extract(beetleCrop)
    .resize(size, size, { fit: 'cover' })
    .flatten({ background: ORANGE })
    .png({ compressionLevel: 9 })
    .toFile(outPath)
}

await writeFavicon(16, 'public/favicon-16x16.png')
await writeFavicon(32, 'public/favicon-32x32.png')
await writeFavicon(48, 'public/favicon-48x48.png')
await writeFavicon(180, 'public/apple-touch-icon.png')
await writeFavicon(192, 'public/icon-192.png')
await writeFavicon(512, 'public/icon-512.png')
console.log('Favicons written')

// --- Open Graph / Twitter card image (1200x630) -----------------------
const ogWidth = 1200
const ogHeight = 630
const logoMeta = await sharp(logo).metadata()
// Fit the full logotype (not just the beetle) inside the canvas with margin,
// so the OG preview still reads the brand name, not just an icon.
const logoTargetWidth = Math.round(ogWidth * 0.86)
const logoTargetHeight = Math.round(
  (logoTargetWidth / logoMeta.width) * logoMeta.height,
)
const resizedLogoBuffer = await sharp(logo)
  .resize(logoTargetWidth, logoTargetHeight)
  .toBuffer()

await sharp({
  create: {
    width: ogWidth,
    height: ogHeight,
    channels: 3,
    background: ORANGE,
  },
})
  .composite([
    {
      input: resizedLogoBuffer,
      top: Math.round((ogHeight - logoTargetHeight) / 2),
      left: Math.round((ogWidth - logoTargetWidth) / 2),
    },
  ])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile('public/og-image.jpg')
console.log('OG image written (1200x630)')

// --- Resize + WebP the large source photos -----------------------------
// Each is served far smaller than its source resolution (the logo tops out
// around ~600px display width but ships at 1700px; the product photo and
// partner logo have the same problem), so a single resize pass is most of
// the win — WebP on top of that is the rest.
const RESIZE_JOBS = [
  {
    src: 'src/assets/Bugz_co_za_Updated_Logo.png',
    base: 'src/assets/Bugz_co_za_Updated_Logo',
    width: 1000,
  },
  {
    src: 'src/assets/Bugs_product.jpeg',
    base: 'src/assets/Bugs_product',
    width: 900,
  },
  {
    src: 'src/assets/Going_Smart.png',
    base: 'src/assets/Going_Smart',
    width: 900,
  },
]

for (const { src, base, width } of RESIZE_JOBS) {
  const img = sharp(src).resize({ width, withoutEnlargement: true })
  const isJpeg = src.toLowerCase().endsWith('.jpeg') || src.toLowerCase().endsWith('.jpg')

  await img
    .clone()
    .webp({ quality: 82 })
    .toFile(`${base}.webp`)

  if (isJpeg) {
    await img.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(`${base}.resized.jpeg`)
  } else {
    await img.clone().png({ compressionLevel: 9 }).toFile(`${base}.resized.png`)
  }
  console.log(`Resized + WebP written for ${src}`)
}

console.log('\nDone. Original source files were left untouched — update')
console.log('imports in components to point at the new .resized.* / .webp files.')
