import { useState } from 'react'
import { CaseStudy } from '../components/CaseStudy'
import { ProjectShowcase } from '../components/ProjectShowcase'
import { SectionLabel } from '../components/SectionLabel'
import { projects, type Project } from '../data/projects'

export function Work() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="shell work-heading">
        <SectionLabel number="03" label="SELECTED WORK" />
        <h2 id="work-title" className="display-heading display-heading--work">CASE<br />STUDIES</h2>
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
