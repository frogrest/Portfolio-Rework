# GRAIN → GCN Integration — Implementation Notes

Generated: 2026-09-01

## What changed

The GCN Portfolio has been migrated from Motion (Framer Motion) to GSAP + ScrollTrigger + Lenis, adopting the visual language of the GRAIN Studio reference project (`TestForFrontend/`). Light-mode code was removed to align with DESIGN.md's dark-only principle.

## New files (11)

| File | Purpose |
|---|---|
| `src/lib/gsap.ts` | Registers ScrollTrigger, sets GSAP defaults (`expo.out`, 0.9s duration) |
| `src/hooks/useLenis.ts` | Smooth-scroll engine wired through GSAP ticker; skips reduced-motion + coarse pointer + width < 768px |
| `src/hooks/useReducedMotion.ts` | Synchronous `matchMedia` init (fixes hydration flash bug in old version) |
| `src/components/motion/MaskedReveal.tsx` | Word-rise-through-overflow-mask via GSAP ScrollTrigger; replaces Motion `revealText` |
| `src/components/motion/ScrubText.tsx` | Scroll-scrubbed word colour; mapped to `--accent-light` / `--text-secondary` |
| `src/components/motion/Marquee.tsx` | CSS-driven infinite-loop track with `data-speed` |
| `src/components/layout/SectionHead.tsx` | Grid layout: mono index + MaskedReveal title; replaces `SectionLabel` |
| `src/components/layout/MarqueeBand.tsx` | Tag carousel sourced from `specialties` data |
| `src/components/ui/Magnetic.tsx` | Pointer-follow drift via `gsap.quickTo`; desktop fine-pointer only |
| `src/components/ui/Cursor.tsx` | Lagged accent ring; desktop fine-pointer only; hidden on reduced-motion |

## Deleted files (4)

| File | Reason |
|---|---|
| `src/animations.ts` | Motion Variants (`fadeUp`, `revealText`, `sectionReveal`, etc.) replaced by GSAP timelines |
| `src/components/ThemeToggleButton.tsx` | Superseded by `ui/ThemeToggle.tsx` (light/dark toggle later restored on request) |
| `src/components/SectionLabel.tsx` | Replaced by `SectionHead` |
| `src/hooks/useTheme.ts` | Recreated as a shared hook for the light/dark toggle (data-theme + theme-color) |

## Modified files (15+)

| File | Key changes |
|---|---|
| `index.html` | Removed `IBM+Plex+Mono` from Google Fonts link; re-added inline no-flash theme script (`data-theme`) |
| `src/main.tsx` | Added `lenis/dist/lenis.css`, `@fontsource/jetbrains-mono` imports, `document.documentElement.classList.add('js')` |
| `src/App.tsx` | Mounts `<Cursor />`, calls `useLenis(true)` |
| `src/styles/globals.css` | + easing tokens, + all GRAIN CSS classes, + comprehensive reduced-motion block, + `[data-theme="light"]` tokens, - IBM Plex Mono |
| `src/components/Navbar.tsx` | Signal-underline hover (`site-nav__link::after`), right-aligned nav + theme toggle, frosted-glass header |
| `src/components/MobileMenu.tsx` | GSAP open/close (`onComplete` unmount), preserved focus trap + Escape + focus restoration |
| `src/components/Footer.tsx` | 4-column grid, signal-color hover, wordmark stroke |
| `src/components/ProjectShowcase.tsx` | GSAP `fromTo` + ScrollTrigger, preserved CSS `--pointer-x/y` parallax, adopted `work-row` grid + rail |
| `src/components/CaseStudy.tsx` | GSAP open/close (opacity + y), 0.25s exit, preserved focus trap + scroll lock |
| `src/components/ExperienceTimeline.tsx` | Single ScrollTrigger with staggered `fromTo` |
| `src/sections/Hero.tsx` | `MaskedReveal` for title, `<Magnetic>` on hero image + CTA buttons, GSAP stagger for content |
| `src/sections/About.tsx` | `SectionHead` + `ScrubText` for bio, GSAP `fromTo` + ScrollTrigger |
| `src/sections/Resume.tsx` | Single GSAP timeline with stagger across 3 columns |
| `src/sections/Contact.tsx` | `MaskedReveal` for heading, `<Magnetic>` on CTA, GSAP stagger |
| `src/sections/Work.tsx` | Replaced `SectionLabel` with inline `.section-label` HTML |
| `package.json` | Added `gsap`, `lenis`, `@fontsource/jetbrains-mono`; removed `motion` |
| `vite.config.ts` | Added `manualChunks` (`vendor-react`, `vendor-gsap`) for cache stability |
| `README.md` | Stack updated; image-loading contradiction fixed; Motion removal noted |

## Dependencies

```json
{
  "dependencies": {
    "gsap": "^latest",
    "lenis": "^1.3.5",
    "@fontsource/jetbrains-mono": "^latest",
    "lucide-react": "^0.468.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  }
}
```

`motion` is fully removed. `@types/react` / `@types/react-dom` unchanged.

## CSS tokens added

| Token | Value | Notes |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | |
| `--ease-out-quad` | `cubic-bezier(0.25, 1, 0.5, 1)` | |
| `--ease-lenis` | `cubic-bezier(0.1, 1, 0.3, 1)` | Lenis lerp easing |
| `--line` | `rgba(255,255,255,.06)` | For `.frame-v` vertical hairline borders |

## Verification checklist

- [ ] `npm run typecheck` — passes
- [ ] `npm run build` — passes, no Motion in bundle
- [ ] Dev server (`npm run dev`): all 5 sections render
- [ ] Scroll animations fire on scroll (Hero title, About, Resume, Work, Contact)
- [ ] Mobile menu opens/closes with GSAP animation; focus trap + Escape + focus restore work
- [ ] CaseStudy modal opens/closes with GSAP animation; focus trap + scroll lock + focus restore work
- [ ] Navbar active-link highlighting updates on scroll
- [ ] Lenis smooth scroll works via anchor links (`#about`, `#work`)
- [ ] Reduced-motion toggle in DevTools disables all scroll animations, hides cursor ring, pauses marquee
- [ ] JetBrains Mono loads; IBM Plex Mono Google Fonts request gone from Network tab
- [ ] `prefers-reduced-motion: reduce` → `MaskedReveal` words stay visible (`yPercent: 0` fallback fires)
- [ ] `useActiveSection` active-link tracking is within ~100ms of visible scroll position (may need `rootMargin` tuning with Lenis lerp)

## Known follow-up (not blockers)

- `useActiveSection.ts` `rootMargin: '-28% 0px -58% 0px'` may need slight widening after live testing with Lenis's 0.08 lerp smoothing.
- `Navbar.tsx` uses both `site-header` and `navbar` classes to merge GCN's positioning with GRAIN's frosted-glass treatment — verify the layout on mobile.
- `@fontsource/jetbrains-mono` ships many unicode subsets; the build output shows ~10 woff/woff2 files. Consider switching to `@fontsource/jetbrains-mono/latin.css` if bundle size matters.
