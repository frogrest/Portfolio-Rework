import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { MaskedReveal } from '../components/motion/MaskedReveal'
import { Magnetic } from '../components/ui/Magnetic'
import { socials } from '../data/socials'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Contact() {
  const reduced = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced) return
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll('.contact-anim')
      gsap.fromTo(targets, { opacity: 0, y: 36 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [reduced])

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials.emailAddress)
      setCopied(true)
      if (resetTimer.current) clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => setCopied(false), 2400)
    } catch {
      window.location.href = socials.email
    }
  }

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title" ref={sectionRef}>
      <div className="shell contact-inner">
        <div className="contact-anim">
          <div className="section-label" aria-hidden="true">
            <span>04</span>
            <span>/</span>
            <span>CONTACT</span>
          </div>
          <div className="contact-grid">
            <h2 id="contact-title">
              <MaskedReveal text="LET'S BUILD SOMETHING REMARKABLE." as="span" />
            </h2>
            <div className="contact-lower">
              <p>Open to software engineering roles, freelance work, creative collaborations, and interesting products.</p>
              <div className="contact-meta">
                <span className="mono">Philippines · Remote-friendly</span>
                <a href={socials.email}>{socials.emailAddress}</a>
              </div>
              <div className="button-row contact-actions">
                <Magnetic strength={0.15}>
                  <a className="button button--primary" href={socials.email}>SEND EMAIL <ArrowUpRight size={17} aria-hidden="true" /></a>
                </Magnetic>
                <button type="button" className="button button--ghost" onClick={copyEmail}>
                  <span aria-live="polite">{copied ? 'COPIED' : 'COPY EMAIL'}</span>
                  {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                </button>
                <a className="button button--ghost" href={socials.github} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={17} aria-hidden="true" /></a>
                <a className="button button--ghost" href={socials.linkedin} target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
