import type { ResponsiveImage } from '../../components/OptimizedImage'

const jpgs = import.meta.glob('./*.jpg', { eager: true, import: 'default' }) as Record<string, string>
const webps = import.meta.glob('./*.webp', { eager: true, import: 'default' }) as Record<string, string>

/**
 * Builds a ResponsiveImage from `<name>.jpg` plus its generated `<name>-<width>.webp`
 * variants (see `npm run optimize:images`). If the WebP variants are missing the
 * component still renders with the JPG alone.
 */
function imageSet(name: string): ResponsiveImage {
  const fallback = jpgs[`./${name}.jpg`]
  if (!fallback) throw new Error(`Missing image: src/assets/images/${name}.jpg`)
  const sources = Object.entries(webps)
    .filter(([path]) => path.startsWith(`./${name}-`) && /-(\d+)\.webp$/.test(path))
    .map(([path, src]) => ({ src, width: Number(path.match(/-(\d+)\.webp$/)?.[1]) }))
    .sort((a, b) => a.width - b.width)
  return { fallback, sources }
}

export const heroWorkspace = imageSet('hero-workspace')
export const profile = imageSet('profile')
export const frogposCover = imageSet('frogpos-cover')
export const frogposPos = imageSet('frogpos-pos')
export const frogposReceipt = imageSet('frogpos-receipt')
export const prepaviewCover = imageSet('prepaview-cover')
export const prepaviewShot1 = imageSet('prepaview-shot-1')
export const prepaviewShot2 = imageSet('prepaview-shot-2')
export const prepaviewShot3 = imageSet('prepaview-shot-3')
export const prepaviewShot4 = imageSet('prepaview-shot-4')
export const prepaviewShot5 = imageSet('prepaview-shot-5')
export const prepaviewShot6 = imageSet('prepaview-shot-6')
export const restaurantBotCover = imageSet('restaurant-bot-cover')
