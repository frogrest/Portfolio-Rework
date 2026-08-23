import { motion } from 'motion/react'
import { experience } from '../data/experience'
import { fadeUp } from '../animations'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function ExperienceTimeline() {
  const reduced = useReducedMotion()
  return (
    <ol className="timeline">
      {experience.map((item) => (
        <motion.li
          key={`${item.period}-${item.title}`}
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="timeline__dot" aria-hidden="true" />
          <p className="mono timeline__period">{item.period}</p>
          <h4>{item.title}</h4>
          {item.role && <p className="timeline__role">{item.role}</p>}
          <p className="timeline__description">{item.description}</p>
        </motion.li>
      ))}
    </ol>
  )
}
