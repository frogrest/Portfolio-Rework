// Generates WebP variants (640/960/1280/1600px, capped at the source width) for
// every JPG in src/assets/images/. The variants are imported by
// src/assets/images/index.ts and served through <picture> with the JPG as
// fallback. Run after replacing or adding any image:  npm run optimize:images
import { readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'images')
const files = (await readdir(dir)).filter((file) => file.endsWith('.jpg'))

for (const file of files) {
  const input = path.join(dir, file)
  const base = file.replace(/\.jpg$/, '')
  const { width } = await sharp(input).metadata()
  if (!width) throw new Error(`Could not read width of ${file}`)

  // Remove stale variants first so replaced images never serve old sizes.
  for (const existing of await readdir(dir)) {
    if (existing.startsWith(`${base}-`) && existing.endsWith('.webp')) {
      await rm(path.join(dir, existing))
    }
  }

  const widths = [...new Set([640, 960, 1280, 1600].filter((w) => w < width).concat(width))]
  for (const w of widths) {
    const output = path.join(dir, `${base}-${w}.webp`)
    await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(output)
    console.log(`${base}-${w}.webp`)
  }
}

console.log(`\nDone — ${files.length} image(s) processed.`)
