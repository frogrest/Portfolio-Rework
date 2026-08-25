// Generates JPG variants (640/960/1280/1600px, capped at the source width) for
// every JPG in src/assets/images/. The variants are picked up by
// src/assets/images/index.ts to build a responsive srcset. Run after replacing
// or adding any image:  npm run optimize:images
import { readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'images')
const files = (await readdir(dir)).filter((file) => file.endsWith('.jpg') && !/-\d+\.jpg$/.test(file))

for (const file of files) {
  const input = path.join(dir, file)
  const base = file.replace(/\.jpg$/, '')
  const { width } = await sharp(input).metadata()
  if (!width) throw new Error(`Could not read width of ${file}`)

  // Remove stale variants so replaced images never serve old sizes.
  for (const existing of await readdir(dir)) {
    if (existing.startsWith(`${base}-`) && /-\d+\.jpg$/.test(existing)) {
      await rm(path.join(dir, existing))
    }
  }

  const widths = [...new Set([640, 960, 1280, 1600].filter((w) => w < width).concat(width))]
  for (const w of widths) {
    const output = path.join(dir, `${base}-${w}.jpg`)
    await sharp(input).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 85 }).toFile(output)
    console.log(`${base}-${w}.jpg`)
  }
}

console.log(`\nDone — ${files.length} image(s) processed.`)
