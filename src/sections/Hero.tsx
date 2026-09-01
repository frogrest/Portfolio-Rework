import { ArrowRight } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { Magnetic } from '../components/ui/Magnetic'
import { OptimizedImage } from '../components/OptimizedImage'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { heroWorkspace } from '../assets/images'

export function Hero() {
  const reduced = useReducedMotion()
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reduced) return
    const el = contentRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.hero__anim')
      gsap.fromTo(items, { opacity: 0, y: 32 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.1,
      })
    }, el)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__image-wrap">
        <Magnetic strength={0.15}>
          <OptimizedImage image={heroWorkspace} alt="Cinematic dusk scene with a coding monitor and keyboard." width={1000} height={1324} sizes="(min-width: 1024px) 45vw, 74vw" />
        </Magnetic>
      </div>
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div ref={contentRef} className="hero__content shell">
        <p className="eyebrow hero__eyebrow hero__anim">FULL-STACK DEVELOPER<br />& CREATIVE TECHNOLOGIST</p>
        <div className="hero__title-mask">
          <h1 id="hero-title">
            <span className="hero__anim">GIAN CARLO</span>
            <strong className="hero__anim">NORIEGA</strong>
          </h1>
        </div>
        <p className="hero__lede hero__anim">
          I build production software and immersive digital experiences where engineering meets visual storytelling.
        </p>
        <div className="hero__actions hero__anim">
          <Magnetic strength={0.2}>
            <a className="button button--primary" href="#work">VIEW MY WORK <ArrowRight size={17} aria-hidden="true" /></a>
          </Magnetic>
          <a className="button button--ghost" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer">RESUME</a>
        </div>
        <p className="hero__location mono hero__anim">Philippines · Available Remote</p>
      </div>
    </section>
  )
}
