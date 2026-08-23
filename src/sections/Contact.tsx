import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { sectionReveal } from '../animations'
import { SectionLabel } from '../components/SectionLabel'
import { socials } from '../data/socials'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Contact() {
  const reduced = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <motion.div className="shell contact-inner" variants={sectionReveal} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        <SectionLabel number="04" label="CONTACT" />
        <h2 id="contact-title">LET&apos;S BUILD<br />SOMETHING<br /><strong>REMARKABLE.</strong></h2>
        <div className="contact-lower">
          <p>Open to software engineering roles, freelance work, creative collaborations, and interesting products.</p>
          <div className="contact-meta">
            <span className="mono">Philippines · Remote-friendly</span>
            <a href={socials.email}>{socials.emailAddress}</a>
          </div>
          <div className="button-row contact-actions">
            <a className="button button--primary" href={socials.email}>SEND EMAIL <ArrowUpRight size={17} /></a>
            <button type="button" className="button button--ghost" onClick={copyEmail}>
              <span aria-live="polite">{copied ? 'COPIED' : 'COPY EMAIL'}</span>
              {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
            </button>
            <a className="button button--ghost" href={socials.github} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={17} /></a>
            <a className="button button--ghost" href={socials.linkedin} target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={17} /></a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
