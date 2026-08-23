import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { profile } from '../assets/images'
import { imageReveal, sectionReveal } from '../animations'
import { OptimizedImage } from '../components/OptimizedImage'
import { SectionLabel } from '../components/SectionLabel'
import { socials } from '../data/socials'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function About() {
  const reduced = useReducedMotion()
  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="shell about-grid">
        <motion.div variants={sectionReveal} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <SectionLabel number="02" label="ABOUT" />
          <p className="eyebrow section-eyebrow">ABOUT ME</p>
          <h2 id="about-title" className="display-heading display-heading--about">Technical precision<br />meets creative chaos.</h2>
          <div className="about-copy">
            <p>I am a Computer Science developer who refuses to choose between logic and art.</p>
            <p>My work sits between production software, visual storytelling, game development, and motion.</p>
          </div>
          <div className="about-meta mono"><span>Philippines</span><span>Remote-friendly</span></div>
          <div className="button-row about-links">
            <a className="text-link" href={socials.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a>
            <a className="text-link" href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a>
          </div>
        </motion.div>

        <motion.div className="portrait-frame" variants={imageReveal} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <OptimizedImage image={profile} alt="Portrait of Gian Carlo Noriega." width={1100} height={1400} sizes="(min-width: 640px) 45vw, 100vw" />
          <div className="portrait-frame__fade" aria-hidden="true" />
          <div className="portrait-frame__rim" aria-hidden="true" />
          <span className="image-caption mono">GIAN CARLO NORIEGA</span>
        </motion.div>
      </div>
    </section>
  )
}
