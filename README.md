# GCN Portfolio

A cinematic React + TypeScript developer portfolio for Gian Carlo Noriega — full-stack developer, creative technologist, and video editor based in the Philippines.

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Motion
- Lucide React
- GitHub Pages

## Development

```bash
npm install
npm run dev
```

## Type checking

```bash
npm run typecheck
```

## Production

```bash
npm run build
npm run preview
```

Vite is configured with `base: '/Portfolio-Rework/'` because this repository is published at `https://<username>.github.io/Portfolio-Rework/`. If you rename the repository later, update this value to match the new repository name.

## Deployment

GitHub Pages deployment is handled automatically by `.github/workflows/deploy.yml`.

1. Push the repository to GitHub as `Portfolio-Rework`.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main`.

```bash
git add .
git commit -m "Rebuild portfolio in React"
git push
```

The workflow installs dependencies, runs the production build, uploads `dist/`, and deploys it with the official GitHub Pages actions.

## Replacing images

All portfolio images are local Vite imports. Keep the filenames and replace the files directly:

- `src/assets/images/hero-workspace.jpg` → personal workstation photo
- `src/assets/images/profile.jpg` → real headshot
- `src/assets/images/frogpos-cover.jpg` → authentic FrogPOS screenshot
- `src/assets/images/prepaview-cover.jpg` → authentic gameplay screenshot
- `src/assets/images/restaurant-bot-cover.jpg` → authentic application screenshot

The current portrait is an anonymous generated silhouette. The current FrogPOS image is deliberately labeled as a screenshot placeholder so it is never presented as authentic UI.

Temporary free-use stock photography:

- Hero: So Phors / Pexels — https://www.pexels.com/photo/computer-monitor-displaying-lines-of-code-25437427/
- Prepaview cover: Minh Phuc / Pexels — https://www.pexels.com/photo/a-computer-in-a-room-19931378/
- Restaurant Bot cover: cottonbro studio / Pexels — https://www.pexels.com/photo/workstation-computer-monitor-with-html-editor-6804613/

## Social links

Edit `src/data/socials.ts` to update social URLs. The GitHub URL is configured for `frogrest`; the LinkedIn URL intentionally points to LinkedIn's home page until the exact personal profile URL is supplied.

## Project content

Edit `src/data/projects.ts` to change titles, technologies, features, links, and case-study copy. Project markup is rendered through reusable components rather than duplicated by hand.

## Resume

`public/resume.pdf` is included so the hero Resume button never breaks. Replace it with the final recruiter-facing resume whenever needed; keep the filename unchanged.

## Performance notes

- Below-the-fold images are lazy-loaded.
- Image dimensions/aspect ratios prevent layout shifts.
- Hero image is eagerly loaded.
- No video backgrounds, WebGL, or 3D libraries are used.
- Motion respects `prefers-reduced-motion`.
- CSS effects are restrained and mostly static.
- The app uses a modal case study rather than client-side routes, avoiding GitHub Pages refresh 404s.

## Accessibility

The site includes semantic sections, a skip link, keyboard-focus styles, Escape-to-close menus/modals, minimum touch targets, descriptive alt text, reduced-motion support, and no hover-only required interactions.
