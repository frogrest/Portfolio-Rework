import { Camera, Clapperboard, Code2, Gamepad2 } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { SectionHead } from '../components/layout/SectionHead'
import { ExperienceTimeline } from '../components/ExperienceTimeline'
import { TechList } from '../components/TechList'
import { services, skillGroups, specialties } from '../data/skills'
import { useReducedMotion } from '../hooks/useReducedMotion'

const interests = [
  { label: 'Game Development', icon: Gamepad2 },
  { label: 'Cinematography', icon: Clapperboard },
  { label: 'Photography', icon: Camera },
  { label: 'Software Engineering', icon: Code2 },
]

export function Resume() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced) return
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const columns = el.querySelectorAll('.resume-anim')
      gsap.fromTo(columns, { opacity: 0, y: 36 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="resume" className="section resume-section" aria-labelledby="resume-title" ref={sectionRef}>
      <div className="shell">
        <SectionHead index="CV" title="RESUME / ARSENAL" />
        <h2 id="resume-title" className="sr-only">Resume and technical arsenal</h2>
        <div className="resume-grid">
          <div className="resume-column resume-anim">
            <p className="eyebrow column-heading">TECHNICAL TOOLSET</p>
            <TechList groups={skillGroups} />
          </div>

          <div className="resume-column resume-column--journey resume-anim">
            <p className="eyebrow column-heading">JOURNEY</p>
            <ExperienceTimeline />
          </div>

          <div className="resume-column resume-anim">
            <p className="eyebrow column-heading">WHAT I DO</p>
            <ul className="services-list">{services.map((service) => <li key={service}>{service}</li>)}</ul>
            <p className="eyebrow mini-heading">SPECIALTIES</p>
            <div className="tag-row specialties">{specialties.map((item) => <span key={item}>{item}</span>)}</div>
            <p className="eyebrow mini-heading">INTERESTS</p>
            <div className="interest-list">
              {interests.map(({ label, icon: Icon }) => (
                <div className="interest-item" key={label}><Icon size={17} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
