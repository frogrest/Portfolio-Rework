import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { OptimizedImage } from './OptimizedImage'
import type { Project } from '../data/projects'

interface CaseStudyProps {
  project: Project | null
  onClose: () => void
}

export function CaseStudy({ project, onClose }: CaseStudyProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!project) return
    setVisible(true)
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        const first = focusable[0]
        const last = focusable.at(-1)
        if (!first || !last) return
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('modal-open')

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
      returnFocusRef.current?.focus()
    }
  }, [project])

  useEffect(() => {
    if (!visible || !dialogRef.current) return
    const backdrop = dialogRef.current.parentElement
    const article = dialogRef.current

    gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    gsap.fromTo(article, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' })
  }, [visible, project])

  function handleClose() {
    if (!dialogRef.current) return
    const backdrop = dialogRef.current.parentElement
    const article = dialogRef.current

    gsap.to(backdrop, { opacity: 0, duration: 0.25, ease: 'power2.in' })
    gsap.to(article, { opacity: 0, y: 20, duration: 0.25, ease: 'power3.in', onComplete: () => {
      setVisible(false)
      onClose()
    } })
  }

  if (!visible || !project) return null

  return (
    <div
      className="case-study-backdrop"
      data-lenis-prevent
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) handleClose()
      }}
    >
      <article
        ref={dialogRef}
        className="case-study"
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <div className="case-study__bar">
          <span className="mono">PROJECT {project.number}</span>
          <button ref={closeRef} className="icon-button" onClick={handleClose} aria-label="Close case study"><X size={22} aria-hidden="true" /></button>
        </div>

        <header className="case-study__hero">
          <p className="eyebrow">{project.category}</p>
          <h2 id="case-study-title">{project.title}</h2>
          <p>{project.subtitle}</p>
        </header>

        <OptimizedImage image={project.image} alt={project.imageAlt} width={1600} height={1000} className="case-study__image" sizes="min(1180px, 100vw)" />

        {project.caseStudy.screenshots && project.caseStudy.screenshots.length > 0 && (
          <section className="case-study__section case-study__gallery" aria-label="Screenshots">
            <p className="mono case-kicker">SCREENSHOTS</p>
            <div className="case-study__gallery-grid">
              {project.caseStudy.screenshots.map((shot) => (
                <figure key={shot.image.fallback} className={`case-study__gallery-item ${shot.height > shot.width ? 'is-portrait' : ''}`}>
                  <OptimizedImage image={shot.image} alt={shot.alt} width={shot.width} height={shot.height} sizes="(min-width: 1024px) 560px, 100vw" />
                </figure>
              ))}
            </div>
          </section>
        )}

        <div className="case-study__grid">
          <section><p className="mono case-kicker">THE PROBLEM</p><p>{project.caseStudy.problem}</p></section>
          <section><p className="mono case-kicker">THE SOLUTION</p><p>{project.caseStudy.solution}</p></section>
          <section><p className="mono case-kicker">MY ROLE</p><p>{project.caseStudy.role}</p></section>
          <section><p className="mono case-kicker">RESULT</p><p>{project.caseStudy.result}</p></section>
        </div>

        <section className="case-study__section">
          <p className="mono case-kicker">TECHNOLOGIES</p>
          <div className="tag-row">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
        </section>

        <section className="case-study__section">
          <p className="mono case-kicker">KEY FEATURES</p>
          <ul className="feature-grid">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </section>

        <section className="case-study__section">
          <p className="mono case-kicker">LINKS</p>
          <div className="button-row">
            {project.liveUrl && <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">LIVE WEBSITE <ArrowUpRight size={16} aria-hidden="true" /></a>}
            {project.secondaryUrl && <a className="text-link" href={project.secondaryUrl} target="_blank" rel="noreferrer">{project.secondaryLabel ?? 'OPEN PROJECT'} <ArrowUpRight size={16} aria-hidden="true" /></a>}
          </div>
        </section>
      </article>
    </div>
  )
}
