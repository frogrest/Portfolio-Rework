import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { experience } from '../data/experience'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function ExperienceTimeline() {
  const reduced = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    if (reduced) return
    const el = listRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>('.timeline__item')
      gsap.fromTo(items, { opacity: 0, y: 28 }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [reduced])

  return (
    <ol ref={listRef} className="timeline">
      {experience.map((item) => (
        <li key={`${item.period}-${item.title}`} className="timeline__item">
          <span className="timeline__dot" aria-hidden="true" />
          <p className="mono timeline__period">{item.period}</p>
          <h4>{item.title}</h4>
          {item.role && <p className="timeline__role">{item.role}</p>}
          <p className="timeline__description">{item.description}</p>
        </li>
      ))}
    </ol>
  )
}
