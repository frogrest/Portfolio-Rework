import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], .work-row__trigger, .contact__cta, .cap-row, .project-showcase, .case-study, .button, .text-link'

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    gsap.set(el, { xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

    const move = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      el.classList.add('is-visible')
    }
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      el.classList.toggle('is-active', Boolean(target?.closest(INTERACTIVE_SELECTOR)))
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [reduced])

  return <div ref={ref} className="cursor-ring" aria-hidden="true" />
}
