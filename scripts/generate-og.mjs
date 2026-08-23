// Renders public/og-cover.svg to public/og-cover.png (1200x630).
// Facebook, X, and LinkedIn ignore SVG open-graph images, so the PNG is the
// one referenced by the meta tags in index.html.
// Run after editing the SVG:  npm run generate:og
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const svgPath = fileURLToPath(new URL('../public/og-cover.svg', import.meta.url))
const pngPath = fileURLToPath(new URL('../public/og-cover.png', import.meta.url))

const svg = await readFile(svgPath)
const png = sharp(svg, { density: 96 }).resize(1200, 630).png()
await png.toFile(pngPath)

const { width, height } = await sharp(pngPath).metadata()
console.log(`Generated og-cover.png (${width}x${height})`)
