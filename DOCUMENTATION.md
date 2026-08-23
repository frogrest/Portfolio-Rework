# GCN Portfolio — Owner's Manual

A complete guide to how this portfolio works, what it contains, and how to change it.

This is a single-page React application with a dark "cinematic tech" design, built by and for **Gian Carlo Noriega** and deployed to GitHub Pages at **https://frogrest.github.io/Portfolio-Rework/**.

---

## Table of contents

1. [Quick reference](#1-quick-reference)
2. [How the website works](#2-how-the-website-works)
   - Tech stack
   - Architecture
   - Annotated file-by-file map
   - How sections render
   - How animations work
   - How the case-study modal works
   - How the deployment pipeline works
3. [What the website contains](#3-what-the-website-contains)
   - Section inventory
   - Content inventory with file locations
4. [What you can change](#4-what-you-can-change)
   - Name & hero copy
   - Projects (add / edit / remove)
   - Skills
   - Experience
   - Socials (including the pending LinkedIn URL)
   - Images (portrait, project covers, OG cover)
   - resume.pdf
   - Colors, fonts & theme variables
   - Meta tags & SEO
   - Deployment settings
5. [How to run, build & deploy](#5-how-to-run-build--deploy)
6. [Troubleshooting & FAQ](#6-troubleshooting--faq)

---

## 1. Quick reference

| Task | Command |
| --- | --- |
| Start the dev server | `npm run dev` |
| Type-check only | `npm run typecheck` |
| Production build | `npm run build` |
| Preview the built site locally | `npm run preview` |
| Regenerate the social preview PNG | `npm run generate:og` |
| Regenerate WebP image variants | `npm run optimize:images` |
| Deploy | push to `main` (GitHub Actions auto-deploys) |

Live site: **https://frogrest.github.io/Portfolio-Rework/**

---

## 2. How the website works

### Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **React 19** (function components + hooks) | Modern, widely known |
| Language | **TypeScript** (strict mode) | Types prevent data-shape bugs |
| Build tool | **Vite 7** | Fast dev server, small production bundles |
| Styling | **Plain CSS** (`globals.css`, custom properties) | Zero runtime cost; Tailwind was removed |
| Animation | **Motion** (formerly Framer Motion) | Declarative scroll/enter animations, reduced-motion aware |
| Icons | **Lucide React** | Tree-shakeable inline SVG icons |
| Image pipeline | **sharp** (devDependency, scripts only) | Generates WebP variants + OG PNG |
| Hosting | **GitHub Pages** via Actions | Free static hosting, auto-deploy on push |

### Architecture

The app is a single route (`index.html` → `src/main.tsx` → `src/App.tsx`). There is no router: the page is one long scroll made of five `<section>` elements, each rendered by its own component under `src/sections/`. Content lives in typed data files under `src/data/`, so markup and content stay decoupled.

Key data flow:

```
src/data/*.ts  ──►  src/sections/*.tsx  ──►  src/components/*.tsx
     (content)        (page regions)          (reusable UI)
```

Because there are no routes, a random deep URL on GitHub Pages would 404 — the `public/404.html` safety net instantly redirects any unknown URL back to the root.

### Annotated file-by-file map

#### Root

| File | Purpose |
| --- | --- |
| `index.html` | HTML shell: fonts, meta tags (SEO / Open Graph / Twitter), Person JSON-LD, skip link, mount point |
| `package.json` | Scripts (`dev`, `build`, `typecheck`, `preview`, `generate:og`, `optimize:images`) and dependencies |
| `package-lock.json` | Committed for reproducible `npm ci` installs in CI |
| `vite.config.ts` | Vite config; sets `base: '/Portfolio-Rework/'` for GitHub Pages |
| `tsconfig*.json` | TypeScript project references (app + node configs) |
| `README.md` | Short entry point that links to this document |
| `DOCUMENTATION.md` | This file |

#### Scripts

| File | Purpose |
| --- | --- |
| `scripts/generate-og.mjs` | Renders `public/og-cover.svg` → `public/og-cover.png` (1200×630) with sharp. Run after editing the SVG. |
| `scripts/optimize-images.mjs` | Scans `src/assets/images/*.jpg` and generates responsive WebP variants (640 / 960 / 1280 / 1600px, capped at source width, quality 82). |

#### `public/` (copied verbatim into the build)

| File | Purpose |
| --- | --- |
| `favicon.svg` | Browser tab icon |
| `og-cover.svg` | Source artwork for the social preview image |
| `og-cover.png` | Rendered 1200×630 preview referenced by meta tags (Facebook/X/LinkedIn ignore SVGs) |
| `resume.pdf` | The resume linked from the Hero "RESUME" button |
| `404.html` | Instant redirect back to the site root |
| `blog/` | Static blog section (listing + two posts: FrogPOS built-in-a-month, Prepaview thesis) — inherited from the original portfolio |
| `resume.html` | Printable standalone resume page (from the original portfolio) |
| `restaurant_chatbot.html` | Standalone Restaurant Bot prototype page (from the original portfolio) |
| `Styles/styles.css` | Original design-system stylesheet used by `blog/` + `restaurant_chatbot.html` |
| `JS/script.js` | Original vanilla JS (theme toggle, tabs, audio, reveals) used by the static pages |
| `Images/` | Original-format image files used by the static pages (`Cover.jpg`, `FrogPOS-*.png`, `Prepaview.jpg`) |

#### `src/`

| File | Purpose |
| --- | --- |
| `main.tsx` | Entry point: creates the React root, imports `globals.css` |
| `App.tsx` | Composes the page: `ErrorBoundary` → navbar → five sections → footer |
| `animations.ts` | Reusable Motion `Variants` (fadeUp, revealText, stagger, image reveal, etc.) |
| `styles/globals.css` | The entire stylesheet: design tokens, reset, all section/component styles, breakpoints |

#### `src/components/`

| File | Purpose |
| --- | --- |
| `Navbar.tsx` | Fixed header: desktop nav, active-section highlighting, mobile menu trigger |
| `MobileMenu.tsx` | Full-screen mobile nav with focus trap, Escape-to-close, focus restoration |
| `CaseStudy.tsx` | Slide-in modal for project deep-dives (focus trap, Escape, backdrop click). Renders the case-study copy plus a screenshot gallery when `caseStudy.screenshots` is present |
| `ProjectShowcase.tsx` | The large alternating cards in the Work section |
| `OptimizedImage.tsx` | `<picture>` wrapper: WebP `srcset` + JPG fallback, lazy loading, placeholder fade-in |
| `ErrorBoundary.tsx` | Catches render errors and shows a styled reload screen |
| `ExperienceTimeline.tsx` | Renders the experience list in Resume |
| `SectionLabel.tsx` | The numbered eyebrow labels (`02 · ABOUT`) |
| `TechList.tsx` | Renders skill groups with icons |

#### `src/sections/`

| File | Section rendered |
| --- | --- |
| `Hero.tsx` | `#home` — headline, background image, CTA buttons, resume link |
| `About.tsx` | `#about` — bio, portrait, GitHub/LinkedIn links |
| `Resume.tsx` | `#resume` — skills, timeline, services, specialties, interests |
| `Work.tsx` | `#work` — project showcase stack + case-study modal state |
| `Contact.tsx` | `#contact` — email, copy-email, social buttons |

#### `src/data/`

| File | Content it owns |
| --- | --- |
| `projects.ts` | All project data + the `Project` type |
| `skills.ts` | Skill groups, services, specialties |
| `experience.ts` | Resume timeline entries |
| `socials.ts` | Email address and social URLs (single source of truth) |

#### `src/hooks/`

| File | Purpose |
| --- | --- |
| `useActiveSection.ts` | IntersectionObserver that tracks which section is in view |
| `useReducedMotion.ts` | Reads `prefers-reduced-motion` and disables Motion variants |

#### `src/assets/images/`

The five source JPGs plus their generated WebP variants and the `index.ts` module that maps them into `ResponsiveImage` objects:

| Source JPG | Used in |
| --- | --- |
| `hero-workspace.jpg` | Hero background (originally `Cover.jpg` from the original portfolio) |
| `profile.jpg` | About portrait (real photo, originally `Me.png`) |
| `frogpos-cover.jpg` | FrogPOS project card (real dashboard screenshot) |
| `frogpos-pos.jpg` | FrogPOS case-study gallery (POS terminal screenshot) |
| `frogpos-receipt.jpg` | FrogPOS case-study gallery (thermal receipt screenshot) |
| `prepaview-cover.jpg` | Prepaview project card (real game screenshot) |
| `prepaview-shot-1..6.jpg` | Prepaview case-study gallery (6 screenshots from frogrest.itch.io/prepaview) |
| `restaurant-bot-cover.jpg` | Restaurant Bot project card (real chatbot screenshot) |

`index.ts` exports `heroWorkspace`, `profile`, `frogposCover`, `frogposPos`, `frogposReceipt`, `prepaviewCover`, `prepaviewShot1`–`prepaviewShot6`, and `restaurantBotCover`. The FrogPOS and Prepaview projects reference their extra screenshots via `caseStudy.screenshots`.

### How sections render

`App.tsx` renders five sections inside `<main id="main">`. Each section has an `id` that matches a nav item (`home`, `about`, `resume`, `work`, `contact`). The navbar's `useActiveSection` observes those ids and highlights the current link. The mobile menu and desktop nav both link to the same `#id` anchors; `html { scroll-behavior: smooth }` animates the scroll.

### How animations work

- Motion `Variants` are declared in `src/animations.ts`.
- Sections use `whileInView` with `viewport={{ once: true, amount: ... }}`, so they animate once as they enter the viewport.
- Hero uses `initial`/`animate` (on load) plus a mouse-parallax via `useSpring`/`useMotionValue`.
- `useReducedMotion` disables initial hidden states when the user prefers reduced motion, and `globals.css` has a `prefers-reduced-motion` media query that collapses durations.

### How the case-study modal works

`Work.tsx` holds `activeProject` state. Clicking **CASE STUDY** in `ProjectShowcase` opens `CaseStudy`, which:

1. Captures the currently focused element and stores it in `returnFocusRef`.
2. Focuses the close button and traps Tab within the dialog.
3. Locks body scroll (`.modal-open` class).
4. Renders the case-study copy, and if the project has `caseStudy.screenshots`, a responsive gallery of screenshots.
5. Closes on Escape, backdrop click, or the ✕ button — and returns focus to the trigger.

### How the deployment pipeline works

`.github/workflows/deploy.yml` runs on every push to `main` (and manually via workflow_dispatch):

1. Checks out the repo.
2. Sets up Node 22 with npm cache.
3. Runs `npm ci` (uses the committed `package-lock.json`).
4. Runs `npm run build` → outputs `dist/`.
5. Uploads `dist/` as a Pages artifact.
6. Deploys it with the official GitHub Pages actions.

The site URL is determined by the repo name because Vite's `base` is `/Portfolio-Rework/`.

> **Important**: In the repository's **Settings → Pages → Build and deployment → Source**, this must be set to **"GitHub Actions"** (not "Deploy from a branch"). Otherwise the raw source files are served instead of the built application.

---

## 3. What the website contains

### Section inventory (in page order)

| # | Nav id | Label | Content |
| --- | --- | --- | --- |
| — | — | Skip link | "Skip to content" — jumps past nav to `<main>` |
| 01 | `home` | Hero | Eyebrow, huge name, lede, "VIEW MY WORK" + "RESUME" buttons, location, scroll indicator, background photo |
| 02 | `about` | About | "Technical precision meets creative chaos." heading, bio paragraphs, location meta, GitHub/LinkedIn links, portrait with caption |
| — | `resume` | Resume / Arsenal | 3 columns: **Technical Toolset**, **Journey** (timeline), **What I Do** (services, specialties, interests) |
| 03 | `work` | Selected Work | Three project cards, each opening a case-study modal |
| 04 | `contact` | Contact | "Let's build something remarkable.", copy-email + send-email, GitHub/LinkedIn buttons |
| — | — | Footer | Brand mark, footer nav, © year, "Built with React + TypeScript" |

### Content inventory with file locations

| Content | Value (current) | File |
| --- | --- | --- |
| Site title / SEO title | "Gian Carlo Noriega \| Full-Stack Developer & Creative Technologist" | `index.html` |
| Meta description | "Portfolio of Gian Carlo Noriega — …" | `index.html` |
| Person JSON-LD | Name, job title, URL, email, country, GitHub | `index.html` |
| Hero eyebrow | "FULL-STACK DEVELOPER & CREATIVE TECHNOLOGIST" | `src/sections/Hero.tsx` |
| Hero name | GIAN CARLO **NORIEGA** | `src/sections/Hero.tsx` |
| Hero lede | "I build production software and immersive digital experiences…" | `src/sections/Hero.tsx` |
| Hero location | "Philippines · Available Remote" | `src/sections/Hero.tsx` |
| About heading | "Technical precision meets creative chaos." | `src/sections/About.tsx` |
| About bio | Two paragraphs | `src/sections/About.tsx` |
| About portrait caption | "GIAN CARLO NORIEGA" | `src/sections/About.tsx` |
| Skills (Production) | TypeScript, React, Node.js, PostgreSQL, Tailwind CSS, JavaScript | `src/data/skills.ts` |
| Skills (Proficient) | Python, C#, Java, .NET, HTML/CSS | `src/data/skills.ts` |
| Skills (Creative) | Unreal Engine, After Effects, Sony Vegas, CapCut, Canva | `src/data/skills.ts` |
| Services | 8 items ("Full-Stack Development", …) | `src/data/skills.ts` |
| Specialties | React, TypeScript, Node.js, PostgreSQL, Unreal Engine, After Effects | `src/data/skills.ts` |
| Interests | Game Development, Cinematography, Photography, Software Engineering | `src/sections/Resume.tsx` |
| Experience entries | 4 items (FrogPOS, DevCon, Video Editing & VFX, BSCS) | `src/data/experience.ts` |
| Projects | FrogPOS, Prepaview, Restaurant Bot | `src/data/projects.ts` |
| Email address | giannoriega4everything@gmail.com | `src/data/socials.ts` |
| GitHub URL | https://github.com/frogrest | `src/data/socials.ts` |
| LinkedIn URL | **https://www.linkedin.com/ (placeholder — see §4)** | `src/data/socials.ts` |
| Resume file | `public/resume.pdf` | `public/` |
| Resume page (standalone) | `public/resume.html` | `public/` |
| Blog listing | `public/blog/index.html` | `public/blog/` |
| Blog post: FrogPOS built-in-a-month | `public/blog/frogpos-built-in-a-month.html` | `public/blog/` |
| Blog post: Prepaview thesis | `public/blog/prepaview-thesis-unreal-engine.html` | `public/blog/` |
| Restaurant Bot prototype page | `public/restaurant_chatbot.html` | `public/` |
| Social preview | `public/og-cover.png` (from `og-cover.svg`) | `public/` |

---

## 4. What you can change

> Everything below is a copy-paste recipe. After any content change, run `npm run build` (or just look at `npm run dev`) to confirm it still works, then push to deploy.

### 4.1 Name & hero copy

**Name** — `src/sections/Hero.tsx`:

```tsx
<motion.h1 id="hero-title" variants={revealText}><span>GIAN CARLO</span><strong>NORIEGA</strong></motion.h1>
```

Change the two words inside `<span>` (light) and `<strong>` (heavy).

**Hero eyebrow** — same file:

```tsx
<motion.p className="eyebrow hero__eyebrow" variants={revealText}>FULL-STACK DEVELOPER<br />& CREATIVE TECHNOLOGIST</motion.p>
```

**Hero lede** — same file:

```tsx
<motion.p className="hero__lede" variants={revealText}>
  I build production software and immersive digital experiences where engineering meets visual storytelling.
</motion.p>
```

**Location** — same file: `<motion.p className="hero__location mono" variants={revealText}>Philippines · Available Remote</motion.p>`

> The name also appears in: `index.html` (title/meta/JSON-LD), the About caption, the footer © line, and `public/og-cover.svg`. Update those for consistency.

### 4.2 Projects — add / edit / remove

All project data lives in **`src/data/projects.ts`** as an array of `Project` objects. Each project renders automatically into the Work section — no component edits needed.

**The `Project` type** (`src/data/projects.ts`):

```ts
export interface Project {
  id: string                    // unique key
  number: string                // displayed big number ("01")
  title: string                 // card + modal title
  subtitle: string              // short line under the title
  category: string              // mono eyebrow ("FULL-STACK SAAS PLATFORM")
  description: string           // card paragraph
  technologies: string[]        // tag chips
  features: string[]            // bullet list (card shows first 5)
  image: ResponsiveImage        // from src/assets/images/index.ts
  imageAlt: string              // accessibility description
  liveUrl?: string              // "LIVE WEBSITE" link
  secondaryUrl?: string         // second link
  secondaryLabel?: string       // label for the second link
  status?: 'live' | 'soon'      // release state
  soonLabels?: string[]         // muted "SOON" placeholders for unpublished links
  caseStudy: {                  // modal content
    problem: string
    solution: string
    role: string
    result: string
    screenshots?: { image: ResponsiveImage; alt: string; width: number; height: number }[]
  }
}
```

**Add a new project — complete example.** Copy this block into the `projects` array and replace the values:

```ts
{
  id: 'my-project',
  number: '04',
  title: 'MY PROJECT',
  subtitle: 'One line describing what it is.',
  category: 'CATEGORY LABEL',
  description: 'A paragraph explaining the project for the card.',
  technologies: ['React', 'TypeScript', 'Node.js'],
  features: ['Feature one', 'Feature two', 'Feature three'],
  image: /* add to src/assets/images/index.ts, see below */,
  imageAlt: 'Descriptive alt text for accessibility.',
  liveUrl: 'https://example.com',
  status: 'live',
  caseStudy: {
    problem: 'The problem it solves.',
    solution: 'The approach taken.',
    role: 'Your contribution.',
    result: 'The outcome.',
    // Optional screenshot gallery shown inside the modal.
    // image = ResponsiveImage export, alt = per-image description, width/height = natural px.
    screenshots: [
      { image: myProjectCover, alt: 'Screen one.', width: 1600, height: 1000 },
    ],
  },
},
```

For the image: drop `my-project.jpg` into `src/assets/images/`, run `npm run optimize:images` (generates WebP variants), then export it in `src/assets/images/index.ts`:

```ts
export const myProjectCover = imageSet('my-project')
```

and import it in `projects.ts`:

```ts
import { frogposCover, prepaviewCover, restaurantBotCover, myProjectCover } from '../assets/images'
```

**Remove a project**: delete its object from the `projects` array. `Work.tsx` renders whatever remains.

**Mark a project "SOON"** (links not published yet): set `status: 'soon'` and provide `soonLabels`:

```ts
status: 'soon',
soonLabels: ['WATCH REEL · SOON', 'PLAY DEMO · SOON'],
```

The muted labels replace the missing links automatically — no hardcoded `id` checks anywhere.

### 4.3 Skills

`src/data/skills.ts`:

- **`skillGroups`** — array of `{ label, items }`; each item is `{ name, icon }`. The icons are Lucide components imported at the top of the file. To use a different icon, add it to the import from `lucide-react` and swap it in.
- **`services`** — simple string array rendered with "—" bullets in Resume.
- **`specialties`** — string array rendered as tag chips.

Example — add a skill to the Production group:

```ts
items: [
  { name: 'TypeScript', icon: Braces },
  { name: 'React', icon: Code2 },
  { name: 'Tailwind CSS', icon: Layers3 }, // e.g. swap out, or add more here
],
```

### 4.4 Experience

`src/data/experience.ts` — array of `{ period, title, role?, description }`. Rendered newest-first by the timeline. Example:

```ts
{
  period: '2023 — PRESENT',
  title: 'Acme Corp',
  role: 'Software Engineer',
  description: 'What you did and built.',
},
```

### 4.5 Socials (including the pending LinkedIn URL)

`src/data/socials.ts` — the single source of truth for the email and social URLs. Used by Hero, About, Contact, and Footer.

```ts
const emailAddress = 'giannoriega4everything@gmail.com'

export const socials = {
  emailAddress,
  email: `mailto:${emailAddress}`,
  github: 'https://github.com/frogrest',
  // Replace with Gian Carlo's exact profile URL when available.
  linkedin: 'https://www.linkedin.com/',
} as const
```

**To add the LinkedIn URL**: replace `'https://www.linkedin.com/'` with the exact profile URL, e.g. `'https://www.linkedin.com/in/gian-carlo-noriega'`. That one line updates every LinkedIn link site-wide. (Also add the same URL to `sameAs` in the JSON-LD block in `index.html`.)

### 4.6 Images

**Source files** live in `src/assets/images/`. After replacing any JPG **keep the filename**, then run `npm run optimize:images` to regenerate WebP variants (it removes stale variants first).

All images are now **real** assets (sourced from the original `frogrest/Portfolio` project and the Prepaview itch.io page):

| Image | Where it appears | Source |
| --- | --- | --- |
| `hero-workspace.jpg` | Hero background (2048×1365, ~170 KB JPG → served as WebP, ~10 KB at 640px) | Original `Images/Cover.jpg` |
| `profile.jpg` | About portrait (real photo, 2390×4095) | Original `Images/Me.png` |
| `frogpos-cover.jpg` | FrogPOS card + modal cover (1280×800) | Original `Images/FrogPOS-Dashboard.png` |
| `frogpos-pos.jpg` | FrogPOS case-study gallery (1280×800) | Original `Images/FrogPOS-POS.png` |
| `frogpos-receipt.jpg` | FrogPOS case-study gallery (1080×1920) | Original `Images/FrogPOS-Receipt.png` |
| `prepaview-cover.jpg` | Prepaview card + modal cover (1024×1024) | Original `Images/Prepaview.jpg` |
| `prepaview-shot-1..6.jpg` | Prepaview case-study gallery | Screenshots from https://frogrest.itch.io/prepaview |
| `restaurant-bot-cover.jpg` | Restaurant Bot card + modal (383×433) | Original `Images/RestaurantChatbot.png` |

**Portrait specifically**: the About caption reads "GIAN CARLO NORIEGA" and the image is displayed at 4:5 with a dark gradient and `object-position: center top`. To swap in a different headshot, replace `profile.jpg` (keep the filename) and re-run `npm run optimize:images`.

**To add a screenshot gallery to a project**: export each image in `src/assets/images/index.ts` via `imageSet('name')`, then add them to `caseStudy.screenshots` in `src/data/projects.ts` with per-image `alt`, `width`, and `height` (natural pixels). The modal renders them in a responsive grid.

### 4.7 resume.pdf

Replace `public/resume.pdf` with the final recruiter-facing PDF. **Keep the filename** — the Hero button points to `%BASE_URL%resume.pdf`. The file is served from `public/` verbatim.

### 4.7b Static pages (blog, resume.html, chatbot)

The rework also serves the original portfolio's static pages from `public/`, so they live at:

- `/Portfolio-Rework/blog/` — blog listing + two posts (`frogpos-built-in-a-month.html`, `prepaview-thesis-unreal-engine.html`)
- `/Portfolio-Rework/resume.html` — printable resume
- `/Portfolio-Rework/restaurant_chatbot.html` — Restaurant Bot prototype

These are plain HTML from the original project and depend on `public/Styles/styles.css`, `public/JS/script.js`, and `public/Images/`. If you edit them, keep those relative paths intact. The nav links on these pages point to `../index.html` (the React app root).

### 4.8 Colors, fonts & theme variables

All design tokens are CSS custom properties at the top of `src/styles/globals.css`:

```css
:root {
  --background: #07090c;          /* page / dark base */
  --background-secondary: #0c0f14; /* alt section background */
  --surface: #11151b;             /* cards, buttons */
  --text-primary: #f4f6f8;
  --text-secondary: #a0a8b3;
  --text-muted: #7f8994;          /* AA-compliant on both dark backgrounds */
  --accent: #00a8c6;
  --accent-light: #39c5df;
  --border: rgba(255, 255, 255, 0.08);
  --shell: min(100% - 2rem, 1500px); /* page width (varies by breakpoint) */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```

- Change any value and it applies site-wide instantly.
- Keep `--text-muted` light enough for 4.5:1 contrast on both `--background` and `--background-secondary`.

**Fonts** are loaded in `index.html` via Google Fonts: **Inter** (body), **Space Grotesk** (headings), **IBM Plex Mono** (mono labels). The `font-family` fallbacks and usages are scattered across `globals.css` (e.g. `.mono, .section-label, ...`). To change a font, update the Google Fonts `<link>` in `index.html` and the matching `font-family` rules in `globals.css`.

### 4.9 Meta tags & SEO

All in `index.html`:

- **Title** — `<title>` tag.
- **Description** — `<meta name="description">`.
- **Open Graph** — `og:type/title/description/url/site_name/image/image:width/image:height/image:alt`. The image points to `/og-cover.png`.
- **Twitter** — `twitter:card/title/description/image`.
- **Canonical** — `<link rel="canonical">`.
- **Theme** — `theme-color`, `color-scheme`.
- **Structured data** — the `application/ld+json` `Person` block (name, jobTitle, url, email, address, sameAs).

To regenerate the social preview image after editing `public/og-cover.svg`:

```bash
npm run generate:og
```

> The PNG is what platforms actually render — SVG previews are ignored by Facebook/X/LinkedIn.

### 4.10 Deployment settings

- **Vite base path** — `vite.config.ts`: `base: '/Portfolio-Rework/'`. This must match the GitHub Pages URL segment. If you rename the repository, update it (e.g. `base: '/MyNewName/'`).
- **The site URL in metadata** — `index.html` (`og:url`, `canonical`, JSON-LD `url`) uses the full URL `https://frogrest.github.io/Portfolio-Rework/`. Update if the account or repo changes.
- **The workflow** — `.github/workflows/deploy.yml`. Node version is pinned to 22. The 404 redirect target is hardcoded to `/Portfolio-Rework/` in `public/404.html` — update it if the base path changes.
- **Pages settings** — on GitHub: **Settings → Pages → Source: GitHub Actions**.

---

## 5. How to run, build & deploy

### Prerequisites

- Node.js 20+ (22 is used in CI).
- npm (comes with Node).

### Local development

```bash
npm install
npm run dev
```

Open the printed localhost URL. Changes to `src/` hot-reload.

### Type-check

```bash
npm run typecheck
```

Runs `tsc -b` in strict mode across the app and config projects. Must pass before merging.

### Production build + preview

```bash
npm run build        # type-checks then bundles to dist/
npm run preview      # serves dist/ locally to inspect the real output
```

The `preview` server runs at the correct `/Portfolio-Rework/` base path, so links and assets resolve exactly as they will in production.

### Deploy

```bash
git add .
git commit -m "Describe your change"
git push
```

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes automatically. Deployment progress appears under the repository's **Actions** tab; the live URL is shown in the workflow run summary.

You can also trigger a deploy manually from the Actions tab (workflow_dispatch) — or with an empty commit: `git commit --allow-empty -m "Trigger Pages deploy"` followed by `git push`.

**One-time setup** (already done): GitHub **Settings → Pages → Source** must be **"GitHub Actions"**. If it's set to "Deploy from a branch", the raw source code is served and the site appears blank.

---

## 6. Troubleshooting & FAQ

**"TypeScript errors after editing a data file."**
The data files are typed. The most common mistakes: a missing required field (e.g. forgetting `caseStudy`), a typo in a field name, or using `image` as a string instead of a `ResponsiveImage` export. Check the error message for the exact field; `npm run typecheck` pinpoints the file and line.

**"I added an image but the card shows nothing."**
The image must be (1) a `.jpg` in `src/assets/images/`, (2) exported from `src/assets/images/index.ts` via `imageSet('filename')`, and (3) assigned to the project's `image` field. Then run `npm run optimize:images`.

**"The social preview doesn't update when I share the link."**
Platforms cache previews aggressively. Regenerate the PNG (`npm run generate:og`), redeploy, and test with a fresh URL / cache-busting share (Facebook's Sharing Debugger can force a re-scrape). Also confirm `og:image` in `index.html` uses the full public URL, not a relative path.

**"I renamed the repo and everything 404s."**
Update three things to match the new repository name: `base` in `vite.config.ts`, the hardcoded URL in `public/404.html`, and the full URLs in `index.html` (`og:url`, `canonical`, JSON-LD). Rebuild and redeploy.

**"I changed a WebP-width and the page still uses the old one."**
Run `npm run optimize:images` — it deletes stale `<name>-*.webp` variants before regenerating, so orphaned sizes are removed.

**"The mobile menu / modal keeps focus in the page behind it."**
Both `MobileMenu` and `CaseStudy` implement a focus trap, Escape-to-close, and focus restoration. If focus seems wrong, confirm you're testing the latest build (modal focus logic lives in `src/components/CaseStudy.tsx` and `MobileMenu.tsx`).

**"The year in the footer is wrong."**
It's computed automatically: `{new Date().getFullYear()}` in `src/components/Footer.tsx`. Nothing to maintain.

**"Why is Tailwind gone?"**
Tailwind 4 and the Vite plugin were removed; an equivalent ~15-line reset now lives at the top of `src/styles/globals.css`, and all styling is plain CSS with custom properties. Visual parity was verified.

**"Can I use this as a template?"**
Yes. The content is fully data-driven; replace the data files, images, resume, and meta tags, update the base path and repo name, and it's a new portfolio.
