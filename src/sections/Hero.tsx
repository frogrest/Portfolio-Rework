import { ArrowDown, ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import type { MouseEvent } from 'react'
import heroWorkspace from '../assets/images/hero-workspace.jpg'
import { revealText, staggerChildren } from '../animations'
import { OptimizedImage } from '../components/OptimizedImage'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Hero() {
  const reduced = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 70, damping: 20 })
  const y = useSpring(useMotionValue(0), { stiffness: 70, damping: 20 })

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 12)
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 10)
  }

  return (
    <section id="home" className="hero" onMouseMove={onMove} aria-labelledby="hero-title">
      <motion.div
        className="hero__image-wrap"
        style={{ x, y }}
        initial={reduced ? false : { scale: 1.04, opacity: 0.72 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <OptimizedImage src={heroWorkspace} alt="Dark monochrome developer workstation with a coding monitor and keyboard." width={1000} height={1324} eager />
      </motion.div>
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <motion.div className="hero__content shell" variants={staggerChildren} initial={reduced ? false : 'hidden'} animate="visible">
        <motion.p className="eyebrow hero__eyebrow" variants={revealText}>FULL-STACK DEVELOPER<br />& CREATIVE TECHNOLOGIST</motion.p>
        <div className="hero__title-mask">
          <motion.h1 id="hero-title" variants={revealText}><span>GIAN CARLO</span><strong>NORIEGA</strong></motion.h1>
        </div>
        <motion.p className="hero__lede" variants={revealText}>
          I build production software and immersive digital experiences where engineering meets visual storytelling.
        </motion.p>
        <motion.div className="hero__actions" variants={revealText}>
          <a className="button button--primary" href="#work">VIEW MY WORK <ArrowRight size={17} /></a>
          <a className="button button--ghost" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer">RESUME</a>
        </motion.div>
        <motion.p className="hero__location mono" variants={revealText}>Philippines · Available Remote</motion.p>
      </motion.div>

      <a className="scroll-indicator" href="#about" aria-label="Scroll to about section"><span>SCROLL</span><ArrowDown size={16} /></a>
    </section>
  )
}
