# GCN Portfolio — Design System

## 1. Design Philosophy & Aesthetic

### Core Identity

**"Cinematic Tech"** — a dark, atmospheric portfolio that positions software engineering as a craft equal to filmmaking and visual storytelling. The design treats every section as a scene, every interaction as a transition, and every project as a case study worth examining.

### Mood & Tone

- **Dark and immersive:** Deep charcoal backgrounds (`#07090c`) with subtle cyan undertones evoke a late-night coding environment — focused, serious, contemplative.
- **Monochrome with signature accent:** The palette is almost entirely grayscale, with a restrained cyan accent (`#00a8c6`) used sparingly for interactive elements, section numbers, and the brand mark. The accent never overwhelms; it guides.
- **Textured minimalism:** A fixed 64px grid overlay at 2.8% opacity adds a subtle blueprint-grid texture. A fractal-noise grain layer in the hero adds analog depth. These are felt rather than seen.
- **Typographic hierarchy:** Three typefaces create a clear voice: **Space Grotesk** for commanding display headings, **Inter** for readable body text, and **IBM Plex Mono** for all metadata, labels, and code-adjacent content.

### Design Principles

1. **Content first, chrome second.** Every visual decision exists to surface the work and the writing. Borders are 1px at 8% opacity — barely there. Shadows are deep inset vignettes on the hero wash, not box-shadows on cards.
2. **Motion with purpose.** Animations are triggered by scroll (`whileInView`), respect `prefers-reduced-motion`, and use a single shared easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`). No element moves for its own sake.
3. **Dark-only.** There is no light mode. The site lives in darkness and uses that constraint to create mood. All design decisions are made against `#07090c` and `#0c0f14`.
4. **Fluid, not fixed.** Every dimension uses `clamp()` to scale between phone and ultrawide. The page shell (`--shell`) responds to viewport width. Nothing breaks at any size between 320px and 1920px+.
5. **Accessibility is not optional.** Contrast ratios meet AA (4.5:1) on all backgrounds. Focus indicators use the accent color. Images have descriptive alt text. Menus and modals trap focus, restore it on close, and dismiss on Escape.

---

## 2. Typography

### Font Stack

| Role | Font | Weights | Fallback |
| --- | --- | --- | --- |
| Display headings | Space Grotesk | 400, 500, 600, 700 | sans-serif |
| Body text | Inter | 400, 500, 600 | ui-sans-serif, system-ui, sans-serif |
| Mono labels, metadata, code | IBM Plex Mono | 400, 500 | ui-monospace, monospace |

> Loaded from Google Fonts via `<link>` in `index.html`. Preconnected to `fonts.googleapis.com` and `fonts.gstatic.com` for performance.

### Type Scale

All sizes use `clamp(min, preferred, max)` to scale fluidly.

| Element | CSS | Notes |
| --- | --- | --- |
| Hero name (light) | `clamp(2.6rem, 14vw, 4.6rem)` mobile, `clamp(2.9rem, 10vw, 8.5rem)` desktop | `font-weight: 400`, `letter-spacing: -.075em` |
| Hero name (bold) | `clamp(3.4rem, 18vw, 6rem)` mobile, `clamp(3.8rem, 13.5vw, 11rem)` desktop | `font-weight: 700` |
| Section heading (About) | `clamp(2.5rem, 6.5vw, 6.5rem)` | `font-weight: 500` |
| Section heading (Work) | `clamp(3.5rem, 10.5vw, 10rem)` | `font-weight: 500` |
| Section heading (Contact) | `clamp(3rem, 16vw, 5.2rem)` mobile, `clamp(3.4rem, 10vw, 9.5rem)` desktop | `font-weight: 400`, strong is `700` |
| Project title | `clamp(2.6rem, 7vw, 6.2rem)` | `font-weight: 650` |
| Project subtitle | `clamp(1.05rem, 1.7vw, 1.35rem)` | `font-weight: 500` |
| Hero lede | `clamp(1rem, 1.7vw, 1.25rem)` | `line-height: 1.65` |
| Body text | `clamp(.95rem, 1.3vw, 1.05rem)` | `line-height: 1.7` |
| Description text | `clamp(.98rem, 1.4vw, 1.13rem)` | `line-height: 1.75` |
| Eyebrow / mono labels | `.72rem` | `IBM Plex Mono`, `letter-spacing: .13em` |
| Section label | `.69rem` | Numbered "02 · ABOUT" |
| Timeline heading | `clamp(1.15rem, 2vw, 1.45rem)` | `font-weight: 600` |
| Tag chips | `.58rem` | Uppercase, `letter-spacing: .04em` |
| Feature list | `.78rem` | `color: var(--text-muted)` |
| Footer meta | `.6rem` | Uppercase, `letter-spacing: .06em` |
| Scroll indicator | `.58rem` | `letter-spacing: .12em` |
| Case-study title | `clamp(3rem, 10vw, 8rem)` | `font-weight: 700` |

### Type Hierarchy

```
DISPLAY (Space Grotesk)
  ├── Hero name (400 + 700)
  ├── Section headings (500)
  ├── Project titles (650)
  └── Case-study titles (700)
  
BODY (Inter)
  ├── Hero lede (400)
  ├── Paragraphs (400)
  ├── Project subtitle (500)
  ├── Timeline entry (600)
  └── Feature bullets (400)
  
MONO (IBM Plex Mono)
  ├── Eyebrow labels (400)
  ├── Section numbers (400)
  ├── Buttons / links (500)
  ├── Tag chips (400)
  ├── Navigation items (500)
  └── Footer metadata (400)
```

---

## 3. Color Palette

### Dark Mode (the only mode)

| Token | Hex/RGBA | Usage |
| --- | --- | --- |
| `--background` | `#07090c` | Page background, hero wash base |
| `--background-secondary` | `#0c0f14` | Resume section, About gradient |
| `--surface` | `#11151b` | Cards, icon buttons, project visual backdrop |
| `--text-primary` | `#f4f6f8` | Headings, body text, primary button text |
| `--text-secondary` | `#a0a8b3` | Paragraphs, metadata, descriptions |
| `--text-muted` | `#7f8994` | Labels, timestamps, feature bullets |
| `--accent` | `#00a8c6` | Section labels, decorative dots, bullet points |
| `--accent-light` | `#39c5df` | Active nav links, brand dot, focus outlines, section numbers |
| `--border` | `rgba(255,255,255,.08)` | Section dividers, card borders, button outlines |
| `--ease` | `cubic-bezier(0.22,1,0.36,1)` | All CSS transitions |

### Contrast Verification

- `--text-muted` (`#7f8994`) on `--background` (`#07090c`): **5.6:1** (AA)
- `--text-muted` on `--background-secondary` (`#0c0f14`): **5.4:1** (AA)
- `--text-secondary` (`#a0a8b3`) on `--background`: **7.3:1** (AAA)
- `--text-primary` (`#f4f6f8`) on `--background`: **15.7:1** (AAA)

### Accent Application

The cyan accent is used only for:
- The brand dot (`GCN**.**`)
- Active section numbers in the section label
- Active nav indicator underline
- Focus-visible outlines
- Timeline dot
- Link button text
- Section label numbers
- Decorative rim glow behind the portrait
- Tag chip borders on hover

---

## 4. Design Choices

### Spacing & Layout

- **Page shell:** `--shell: min(100% - 2rem, 1500px)` → fluid padding, max 1500px. Scales to `3rem` at 640px, `5rem` at 1024px, `8rem` at 1440px.
- **Section padding:** `clamp(6.5rem, 10vw, 10rem)` vertical — generous breathing room.
- **Grid gaps:** 3rem between major columns (About, Resume), 2.3rem for project cards, 1.5rem for image galleries.
- **Hero padding:** 7.5rem top, 4.5rem bottom (reduced on mobile).
- **Button heights:** 46px minimum for touch targets.

### Borders

- **Every border is `1px solid var(--border)`** — a near-transparent white at 8% opacity. This creates a subtle separation without visual weight.
- Section dividers use the same border on `border-top`.
- No border-radius on any component except the skip-link (`.25rem`) and the portrait rim (circle, decorative).

### Shadows & Glows

- **No box-shadows are used.** Depth is created through:
  - Inset vignette shadows on the hero wash (`box-shadow: inset 0 0 180px rgba(0,0,0,.78)`)
  - A blurred, screen-blended cyan glow behind the portrait (`filter: blur(70px); mix-blend-mode: screen`)
  - The radial gradient in `.site-frame` (`radial-gradient(circle at 80% 18%, rgba(0,168,198,.045), transparent 28rem)`)
- **Glass effects:** The navbar and `.button--ghost` use `backdrop-filter: blur()` for a subtle frosted-glass look over the background.

### Button System

| Variant | Background | Text | Border |
| --- | --- | --- | --- |
| `.button--primary` | `--text-primary` | `#080b0f` | same as background |
| `.button--ghost` | `rgba(8,10,13,.28)` blurred | inherit | `--border` |
| `.text-link` | none | `--text-primary` | underline scaleX(0.28) on hover |
| `.text-link--button` | none | `--accent-light` | underline on hover |

All buttons share `min-height: 46px`, `IBM Plex Mono`, uppercase, `.72rem`, and a hover lift of `translateY(-2px)`.

### Navigation

- **Desktop:** Fixed top bar, 82px height. Nav items are mono uppercase, `.64rem`. Active section gets a bottom underline and `--text-primary` color.
- **Mobile:** Full-screen overlay (`z-index: 200`) with large Space Grotesk links. Opening triggers a focus trap on the close button. Escape closes.
- **Mobile menu nav links:** `clamp(1.6rem, 7vw, 2.8rem)` with a 01/02/03 mono index and an arrow icon on the contact link.

### Case-Study Modal

- **Slide-in panel:** `width: min(100%, 1180px)`, left-side backdrop blur, `z-index: 240`.
- **Focus trap:** Tab cycles through focusable elements. Escape closes. Focus returns to the trigger button on close.
- **Body scroll lock:** `body.modal-open { overflow: hidden }` prevents background scrolling.

### Image Handling

- **Aspect-ratio containers:** Every image is wrapped in a `<span style="aspect-ratio: W/H">` with `object-fit: cover` to prevent layout shift.
- **Eager loading:** All images load eagerly (`loading="eager"`) — no lazy loading, since the portfolio is a single scroll and all images are critical.
- **Filters:** Images get a subtle desaturated/cinematic filter:
  - Hero: `grayscale(.9) contrast(1.05) brightness(.95)`
  - Project covers: `saturate(.9) contrast(1.04) brightness(1)`
  - Case-study images: `saturate(.9) brightness(1)`
  - Portrait: no filter (natural coloring from Base.jpg)

### Animations

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` — a custom ease-out that starts fast and settles slowly.
- **Scroll reveals:** Sections animate in via `whileInView` with `{ opacity: 0, y: 36 }` → `{ opacity: 1, y: 0 }` over 0.75s.
- **Hero parallax:** Mouse-driven spring-based parallax on the hero image (disabled on mobile/touch).
- **Reduced motion:** `prefers-reduced-motion: reduce` collapses all animation durations to 0.01ms. The `useReducedMotion` hook disables initial hidden states in React components.

### Breakpoints

| Width | Behavior |
| --- | --- |
| ≤ 400px | Tighter shell (1.25rem gutter), smaller mobile menu, full-width buttons |
| ≤ 639px | Single-column layout, stacked hero image, mobile menu replaces desktop nav |
| 640px+ | Two-column About/Resume/Case-study grids, shell expands |
| 1024px+ | Desktop nav visible, three-column Resume, side-by-side project cards, right-side hero image |
| 1440px+ | Wider shell, larger hero image |

---

## 5. Visual Assets

### The Base Image (Portrait)

The foundational visual element of the design system is the **base image** (`Base.jpg`, 820×1024), used as the profile portrait in the About section. It serves as the primary personal visual identifier.

- **Source:** `src/assets/images/profile.jpg` (converted from the original `Base.jpg`)
- **Dimensions:** 820×1024 (4:5 aspect ratio, matches the portrait frame)
- **Display:** The portrait frame renders it at 4:5 crop with `object-position: center top`, wrapped in a dark gradient overlay on the left and bottom, and a blurred cyan rim glow behind the right side.
- **No CSS filter:** The base image is shown with its natural coloring (no grayscale, no brightness adjustment) to keep the portrait authentic.

### Other Images

| File | Source | Dimensions | Where Used |
| --- | --- | --- | --- |
| `hero-workspace.jpg` | Original `Cover.jpg` | 2048×1365 | Hero background |
| `frogpos-cover.jpg` | Original `FrogPOS-Dashboard.png` | 1280×800 | FrogPOS project card + case-study hero |
| `frogpos-pos.jpg` | Original `FrogPOS-POS.png` | 1280×800 | FrogPOS case-study gallery |
| `frogpos-receipt.jpg` | Original `FrogPOS-Receipt.png` | 1080×1920 | FrogPOS case-study gallery (portrait, full-width) |
| `prepaview-cover.jpg` | Original `Prepaview.jpg` | 1024×1024 | Prepaview project card |
| `prepaview-shot-1..6.jpg` | itch.io screenshots | ~1280×724 | Prepaview case-study gallery |
| `restaurant-bot-cover.jpg` | Original `RestaurantChatbot.png` | 383×433 | Restaurant Bot project card |
| `og-cover.svg` + `og-cover.png` | Custom SVG rendered to PNG | 1200×630 | Social preview card |

### Image Processing Pipeline

All JPG source images are processed through `scripts/optimize-images.mjs` (sharp) to generate WebP variants at multiple widths. The `<picture>` element was previously used for WebP delivery but was removed for cross-platform reliability — images now serve as plain JPGs via `<img>` tags.

The OG preview is generated separately via `scripts/generate-og.mjs`, which renders the SVG to a 1200×630 PNG using sharp.

---

## 6. Component Inventory

| Component | File | Purpose |
| --- | --- | --- |
| Navbar | `Navbar.tsx` | Fixed top nav, desktop links + mobile menu trigger |
| MobileMenu | `MobileMenu.tsx` | Full-screen overlay nav with focus trap |
| OptimizedImage | `OptimizedImage.tsx` | Aspect-ratio protected `<img>` with eager loading |
| ErrorBoundary | `ErrorBoundary.tsx` | Catches render errors, shows reload button |
| CaseStudy | `CaseStudy.tsx` | Slide-in modal with case-study copy + screenshot gallery |
| ProjectShowcase | `ProjectShowcase.tsx` | Alternating project card with image + metadata |
| SectionLabel | `SectionLabel.tsx` | Numbered eyebrow labels ("02 · ABOUT") |
| TechList | `TechList.tsx` | Skill group list with Lucide icons |
| ExperienceTimeline | `ExperienceTimeline.tsx` | Vertical timeline with dot markers |
| Footer | `Footer.tsx` | Brand, nav links, copyright |
| Hero | `Hero.tsx` | Full-screen hero with parallax image + reveal text |
| About | `About.tsx` | Bio + portrait with fade overlay |
| Resume | `Resume.tsx` | Three-column skills + timeline + services |
| Work | `Work.tsx` | Project card stack + case-study modal state |
| Contact | `Contact.tsx` | Email, copy-email button, social links |

---

## 7. Data Model

All content is data-driven from `src/data/`:

| File | Contains |
| --- | --- |
| `projects.ts` | `Project[]` — titles, descriptions, tech stacks, features, images, case-study text, screenshots |
| `skills.ts` | `SkillGroup[]` — categorized skills with Lucide icons, services list, specialties |
| `experience.ts` | `Experience[]` — timeline entries with period, title, role, description |
| `socials.ts` | Email address, GitHub URL, LinkedIn URL |

---

## 8. Deployment

- **Host:** GitHub Pages at `https://frogrest.github.io/Portfolio-Rework/`
- **Build tool:** Vite 7, configured with `base: '/Portfolio-Rework/'`
- **CI:** GitHub Actions workflow (`.github/workflows/deploy.yml`) — runs `npm ci && npm run build` on push to `main`, deploys `dist/` artifact
- **Pages source:** Must be set to **"GitHub Actions"** (not "Deploy from a branch") in the repository settings
- **404 handling:** `public/404.html` redirects unknown URLs to the root for single-page app compatibility