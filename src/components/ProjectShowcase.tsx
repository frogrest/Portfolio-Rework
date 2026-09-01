import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, type MouseEvent } from 'react'
import { gsap } from '../lib/gsap'
import type { Project } from '../data/projects'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { OptimizedImage } from './OptimizedImage'

interface ProjectShowcaseProps {
  project: Project
  index: number
  onOpenCaseStudy: (project: Project) => void
}

export function ProjectShowcase({ project, index, onOpenCaseStudy }: ProjectShowcaseProps) {
  const reduced = useReducedMotion()
  const contentRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const contentEl = contentRef.current
    const visualEl = visualRef.current
    if (!contentEl || !visualEl) return

    const ctx = gsap.context(() => {
      gsap.fromTo(contentEl, { opacity: 0, y: 36 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: contentEl, start: 'top 82%', once: true },
      })
      gsap.fromTo(visualEl, { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: visualEl, start: 'top 82%', once: true },
      })
    }, contentEl)

    return () => ctx.revert()
  }, [reduced])

  const onPointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8
    target.style.setProperty('--pointer-x', `${x}px`)
    target.style.setProperty('--pointer-y', `${y}px`)
  }

  const resetPointer = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--pointer-x', '0px')
    event.currentTarget.style.setProperty('--pointer-y', '0px')
  }

  return (
    <article className={`project-showcase ${index % 2 ? 'is-reversed' : ''}`}>
      <div className="project-number" aria-hidden="true">{project.number}</div>
      <div ref={contentRef} className="project-showcase__content">
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        <div className="tag-row">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
        <ul className="project-features">{project.features.slice(0, 5).map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <div className="button-row project-actions">
          {project.liveUrl && <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">LIVE WEBSITE <ArrowUpRight size={16} aria-hidden="true" /></a>}
          {project.secondaryUrl && <a className="text-link" href={project.secondaryUrl} target="_blank" rel="noreferrer">{project.secondaryLabel ?? 'OPEN'} <ArrowUpRight size={16} aria-hidden="true" /></a>}
          {project.soonLabels?.map((label) => <span key={label} className="text-link is-muted">{label}</span>)}
          <button className="text-link text-link--button" onClick={() => onOpenCaseStudy(project)}>CASE STUDY <ArrowRight size={16} aria-hidden="true" /></button>
        </div>
      </div>

      <div ref={visualRef} className="project-showcase__visual work-row__trigger" onMouseMove={onPointerMove} onMouseLeave={resetPointer}>
        <div className="work-row__bar" aria-hidden="true" />
        <OptimizedImage image={project.image} alt={project.imageAlt} width={1600} height={1000} sizes="(min-width: 1024px) 60vw, 100vw" />
        <div className="project-image-overlay" aria-hidden="true" />
        <span className="image-caption mono">{project.number} / {project.title}</span>
      </div>
    </article>
  )
}
