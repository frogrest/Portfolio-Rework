import { Camera, Clapperboard, Code2, Gamepad2 } from 'lucide-react'
import { motion } from 'motion/react'
import { sectionReveal } from '../animations'
import { ExperienceTimeline } from '../components/ExperienceTimeline'
import { SectionLabel } from '../components/SectionLabel'
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
  return (
    <section id="resume" className="section resume-section" aria-labelledby="resume-title">
      <div className="shell">
        <SectionLabel number="CV" label="RESUME / ARSENAL" />
        <h2 id="resume-title" className="sr-only">Resume and technical arsenal</h2>
        <div className="resume-grid">
          <motion.div className="resume-column" variants={sectionReveal} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
            <p className="eyebrow column-heading">TECHNICAL TOOLSET</p>
            <TechList groups={skillGroups} />
          </motion.div>

          <motion.div className="resume-column resume-column--journey" variants={sectionReveal} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <p className="eyebrow column-heading">JOURNEY</p>
            <ExperienceTimeline />
          </motion.div>

          <motion.div className="resume-column" variants={sectionReveal} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
