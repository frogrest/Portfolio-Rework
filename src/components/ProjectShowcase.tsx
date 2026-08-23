import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import type { MouseEvent } from 'react'
import type { Project } from '../data/projects'
import { imageReveal, sectionReveal } from '../animations'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { OptimizedImage } from './OptimizedImage'

interface ProjectShowcaseProps {
  project: Project
  index: number
  onOpenCaseStudy: (project: Project) => void
}

export function ProjectShowcase({ project, index, onOpenCaseStudy }: ProjectShowcaseProps) {
  const reduced = useReducedMotion()

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
      <motion.div
        className="project-showcase__content"
        variants={sectionReveal}
        initial={reduced ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="project-number" aria-hidden="true">{project.number}</div>
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        <div className="tag-row">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
        <ul className="project-features">{project.features.slice(0, 5).map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <div className="button-row project-actions">
          {project.liveUrl && <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">LIVE WEBSITE <ArrowUpRight size={16} /></a>}
          {project.secondaryUrl && <a className="text-link" href={project.secondaryUrl} target="_blank" rel="noreferrer">{project.secondaryLabel ?? 'OPEN'} <ArrowUpRight size={16} /></a>}
          {!project.liveUrl && project.id === 'prepaview' && <span className="text-link is-muted" aria-label="Watch reel not published yet">WATCH REEL · SOON</span>}
          {!project.secondaryUrl && project.id === 'prepaview' && <span className="text-link is-muted" aria-label="Playable demo not published yet">PLAY DEMO · SOON</span>}
          {!project.liveUrl && project.id === 'restaurant-bot' && <span className="text-link is-muted" aria-label="Restaurant Bot prototype link not published yet">VIEW PROTOTYPE · SOON</span>}
          <button className="text-link text-link--button" onClick={() => onOpenCaseStudy(project)}>CASE STUDY <ArrowRight size={16} /></button>
        </div>
      </motion.div>

      <motion.div
        className="project-showcase__visual"
        variants={imageReveal}
        initial={reduced ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        onMouseMove={onPointerMove}
        onMouseLeave={resetPointer}
      >
        <OptimizedImage src={project.image} alt={project.imageAlt} width={1600} height={1000} />
        <div className="project-image-overlay" aria-hidden="true" />
        <span className="image-caption mono">{project.number} / {project.title}</span>
      </motion.div>
    </article>
  )
}
