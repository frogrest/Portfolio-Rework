import { Fragment, useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ScrubTextProps {
  text: string
  className?: string
  accentWords?: string[]
  start?: string
  end?: string
}

export function ScrubText({
  text,
  className = '',
  accentWords = [],
  start = 'top 78%',
  end = 'bottom 55%',
}: ScrubTextProps) {
  const rootRef = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const words = text.split(' ')
  const accent = new Set(accentWords.map((w) => w.toLowerCase()))

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      if (reduced) return
      const targets = el.querySelectorAll<HTMLElement>('.s-word')
      gsap.to(targets, {
        color: 'var(--accent-light)',
        stagger: 0.045,
        duration: 0.6,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 0.8,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [reduced, start, end])

  return (
    <p ref={rootRef} className={className} aria-label={text}>
      {words.map((word, i) => {
        const isAccent = accent.has(word.replace(/[^a-zA-Z]/g, '').toLowerCase())
        return (
          <Fragment key={i}>
            <span
              className={`s-word${isAccent ? ' s-word--signal' : ''}`}
              aria-hidden="true"
            >
              {word}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
    </p>
  )
}
