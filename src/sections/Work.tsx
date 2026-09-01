import { useState } from 'react'
import { CaseStudy } from '../components/CaseStudy'
import { ProjectShowcase } from '../components/ProjectShowcase'
import { projects, type Project } from '../data/projects'

export function Work() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="shell work-heading">
        <div className="section-label" aria-hidden="true">
          <span>03</span>
          <span>/</span>
          <span>SELECTED WORK</span>
        </div>
        <h2 id="work-title" className="display-heading display-heading--work">PROJECTS</h2>
      </div>
      <div className="shell projects-stack">
        {projects.map((project, index) => (
          <ProjectShowcase key={project.id} project={project} index={index} onOpenCaseStudy={setActiveProject} />
        ))}
      </div>
      <CaseStudy project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
