import { Fragment, useLayoutEffect, useRef, type ElementType } from 'react'
import { gsap } from '../../lib/gsap'

interface MaskedRevealProps {
  text: string
  as?: ElementType
  className?: string
  stagger?: number
  start?: string
  delay?: number
  immediate?: boolean
}

export function MaskedReveal({
  text,
  as: Tag = 'h2',
  className = '',
  stagger = 0.035,
  start = 'top 85%',
  delay = 0,
  immediate = false,
}: MaskedRevealProps) {
  const rootRef = useRef<HTMLElement>(null)
  const words = text.split(' ')

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll<HTMLElement>('.r-word')
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(targets, { yPercent: 0 })
        return
      }
      gsap.fromTo(
        targets,
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger,
          delay,
          ...(immediate ? {} : { scrollTrigger: { trigger: el, start, once: true } }),
        },
      )
    }, el)

    return () => ctx.revert()
  }, [stagger, start, delay, immediate])

  return (
    <Tag ref={rootRef} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="r-mask" aria-hidden="true">
            <span className="r-word">{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
