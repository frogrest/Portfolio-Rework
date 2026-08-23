# GCN Portfolio

A cinematic React + TypeScript developer portfolio for Gian Carlo Noriega — full-stack developer, creative technologist, and video editor based in the Philippines.

> **Full documentation:** see [DOCUMENTATION.md](./DOCUMENTATION.md) — a practical owner's manual covering architecture, file-by-file maps, content inventory, and step-by-step guides for every change you might make.

## Stack

- React 19
- Vite
- TypeScript (strict)
- Motion (animations)
- Lucide React (icons)
- Plain CSS with custom properties (no Tailwind)
- sharp (image pipeline scripts)
- GitHub Pages

## Quick start

```bash
npm install
npm run dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run typecheck` | Type-check (`tsc -b`) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Preview the built site locally |
| `npm run generate:og` | Render `public/og-cover.svg` → `og-cover.png` |
| `npm run optimize:images` | Generate WebP variants for images in `src/assets/images/` |

## Deployment

GitHub Pages deployment is handled automatically by `.github/workflows/deploy.yml` on every push to `main`:

```bash
git add .
git commit -m "Describe your change"
git push
```

1. The repo is `Portfolio-Rework`, published at `https://frogrest.github.io/Portfolio-Rework/`.
2. **Settings → Pages → Source** must be set to **GitHub Actions** (not "Deploy from a branch"). This is already configured.
3. Push to `main` — the workflow builds and deploys automatically.

Vite is configured with `base: '/Portfolio-Rework/'` because the site is published at `https://<username>.github.io/Portfolio-Rework/`. If you rename the repository, update this value (and the URLs in `index.html` + `public/404.html`).

## Changing content

All content is data-driven — edit the files below (see [DOCUMENTATION.md](./DOCUMENTATION.md) for full examples):

- Projects / case studies → `src/data/projects.ts`
- Skills / services / specialties → `src/data/skills.ts`
- Experience timeline → `src/data/experience.ts`
- Email & social URLs (incl. pending LinkedIn URL) → `src/data/socials.ts`
- Hero / About / Resume / Contact copy → `src/sections/*.tsx`
- Meta tags & SEO → `index.html`
- Resume PDF → `public/resume.pdf` (keep the filename)

## Replacing images

All portfolio images are local Vite imports. Keep the filenames and replace the files directly, then run `npm run optimize:images` to regenerate WebP variants:

- `src/assets/images/hero-workspace.jpg` — hero background, originally from `Images/Cover.jpg`
- `src/assets/images/profile.jpg` — real portrait, originally from `Images/Me.png`
- `src/assets/images/frogpos-cover.jpg` — real FrogPOS dashboard screenshot
- `src/assets/images/frogpos-pos.jpg` — additional FrogPOS POS screenshot (case-study gallery)
- `src/assets/images/frogpos-receipt.jpg` — additional FrogPOS receipt screenshot (case-study gallery)
- `src/assets/images/prepaview-cover.jpg` — real Prepaview game screenshot; 6 additional screenshots from itch.io are in `prepaview-shot-1.jpg` through `prepaview-shot-6.jpg`
- `src/assets/images/restaurant-bot-cover.jpg` — real Restaurant Bot chatbot screenshot

All images are now real assets sourced from the original portfolio (`frogrest/Portfolio`) and the Prepaview itch.io page (`frogrest.itch.io/prepaview`). See [DOCUMENTATION.md](./DOCUMENTATION.md#46-images) for the full inventory.

## Static pages

The rework also serves the original portfolio's static pages from `public/`:

- `/Portfolio-Rework/blog/` — blog listing + two posts (FrogPOS build story, Prepaview thesis)
- `/Portfolio-Rework/resume.html` — printable resume page
- `/Portfolio-Rework/restaurant_chatbot.html` — Restaurant Bot prototype

These plain-HTML pages depend on `public/Styles/styles.css`, `public/JS/script.js`, and `public/Images/` (all included).

## Performance & accessibility

- Below-the-fold images are lazy-loaded via `<picture>` with WebP `srcset` variants and JPG fallbacks; dimensions prevent layout shift.
- The hero image is eagerly loaded.
- Motion respects `prefers-reduced-motion`.
- The app uses a modal case study rather than client-side routes, avoiding GitHub Pages refresh 404s; `public/404.html` redirects unknown URLs to the root.
- Semantic sections, skip link, keyboard-focus styles, focus-trapped menus/modals with focus restoration, Escape-to-close, minimum touch targets, descriptive alt text, reduced-motion support.
