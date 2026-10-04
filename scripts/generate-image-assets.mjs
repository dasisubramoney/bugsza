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
const beetleCrop = { left: 50, top: 30, width: 400, height: 400 }

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
    // 440w covers every usage of this logo: the largest is PartnersRow's
    // card box (Lighthouse measures it at ~437px on mobile), everything
    // else (nav/footer/legal pages) is under 110px. It used to ship at
    // 1000w for no usage that needed it.
    src: 'src/assets/Bugz_co_za_Updated_Logo.png',
    base: 'src/assets/Bugz_co_za_Updated_Logo',
    width: 440,
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
  {
    // PartnersRow shows this logo as a ~220px-wide badge, far smaller than
    // the GoingSmartPage hero (max-w-md) that the 900w file above serves.
    src: 'src/assets/Going_Smart.png',
    base: 'src/assets/Going_Smart-badge',
    width: 500,
  },
  {
    src: 'src/assets/Innovation_Centre_Logo.png',
    base: 'src/assets/Innovation_Centre_Logo',
    width: 600,
  },
  {
    // PartnersRow shows this logo as a ~96px badge, far smaller than the
    // InnovationCentrePage hero (w-40) that the 600w file above serves.
    // Flat-color logo art holds up fine at a lower webp quality.
    src: 'src/assets/Innovation_Centre_Logo.png',
    base: 'src/assets/Innovation_Centre_Logo-badge',
    width: 300,
    quality: 70,
  },
  {
    // Smaller 1x candidate for the same badge, for srcset — Lighthouse's
    // mobile viewport renders this logo at ~80px (below the sm: breakpoint
    // that raises it to 96px), so the 300w file alone is 2x oversized there.
    src: 'src/assets/Innovation_Centre_Logo.png',
    base: 'src/assets/Innovation_Centre_Logo-badge-sm',
    width: 160,
    quality: 40,
  },
  {
    src: 'src/assets/innovation-centre/workshop-1.jpg',
    base: 'src/assets/innovation-centre/workshop-1',
    width: 800,
  },
  {
    src: 'src/assets/innovation-centre/workshop-2.jpg',
    base: 'src/assets/innovation-centre/workshop-2',
    width: 800,
  },
  {
    src: 'src/assets/innovation-centre/workshop-3.jpg',
    base: 'src/assets/innovation-centre/workshop-3',
    width: 800,
  },
  {
    src: 'src/assets/innovation-centre/workshop-4.jpg',
    base: 'src/assets/innovation-centre/workshop-4',
    width: 800,
  },
  {
    // White-on-transparent recolor of the Athea Digital logo (original was
    // black on a white background) so it reads against the DeveloperBanner's
    // dark background. Displayed around 100px tall, so 300w covers retina.
    src: 'src/assets/athea-digital-logo.png',
    base: 'src/assets/athea-digital-logo',
    width: 300,
  },
  {
    src: 'src/assets/going-smart/smart-meter.jpg',
    base: 'src/assets/going-smart/smart-meter',
    width: 700,
  },
  {
    src: 'src/assets/going-smart/energy-efficient-home.jpg',
    base: 'src/assets/going-smart/energy-efficient-home',
    width: 700,
  },
]

for (const { src, base, width, quality = 82 } of RESIZE_JOBS) {
  const img = sharp(src).resize({ width, withoutEnlargement: true })
  const isJpeg = src.toLowerCase().endsWith('.jpeg') || src.toLowerCase().endsWith('.jpg')

  await img
    .clone()
    .webp({ quality })
    .toFile(`${base}.webp`)

  if (isJpeg) {
    await img.clone().jpeg({ quality, mozjpeg: true }).toFile(`${base}.resized.jpeg`)
  } else {
    await img.clone().png({ compressionLevel: 9 }).toFile(`${base}.resized.png`)
  }
  console.log(`Resized + WebP written for ${src}`)
}

console.log('\nDone. Original source files were left untouched — update')
console.log('imports in components to point at the new .resized.* / .webp files.')
