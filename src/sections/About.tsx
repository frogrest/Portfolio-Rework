import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { SectionHead } from '../components/layout/SectionHead'
import { ScrubText } from '../components/motion/ScrubText'
import { OptimizedImage } from '../components/OptimizedImage'
import { socials } from '../data/socials'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { profile } from '../assets/images'

export function About() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced) return
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll('.about-anim')
      gsap.fromTo(targets, { opacity: 0, y: 36 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="about" className="section about-section" aria-labelledby="about-title" ref={sectionRef}>
      <div className="shell about-grid">
        <div className="about-anim">
          <SectionHead index="02" title="ABOUT" />
          <p className="eyebrow section-eyebrow">ABOUT ME</p>
          <h2 id="about-title" className="display-heading display-heading--about">Technical precision<br />meets creative chaos.</h2>
          <div className="about-copy">
            <ScrubText text="I am a Computer Science developer who refuses to choose between logic and art." />
            <ScrubText text="My work sits between production software, visual storytelling, game development, and motion." />
          </div>
          <div className="about-meta mono"><span>Philippines</span><span>Remote-friendly</span></div>
          <div className="button-row about-links">
            <a className="text-link" href={socials.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="text-link" href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>

        <div className="portrait-frame about-anim">
          <OptimizedImage image={profile} alt="Portrait of Gian Carlo Noriega." width={1100} height={1400} sizes="(min-width: 640px) 45vw, 100vw" />
          <div className="portrait-frame__fade" aria-hidden="true" />
          <div className="portrait-frame__rim" aria-hidden="true" />
          <span className="image-caption mono">GIAN CARLO NORIEGA</span>
        </div>
      </div>
    </section>
  )
}
