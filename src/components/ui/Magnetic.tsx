import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.28, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    xTo.current = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    yTo.current = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })
    return () => {
      gsap.killTweensOf(el)
      xTo.current = null
      yTo.current = null
    }
  }, [reduced])

  function handleMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduced) return
    const el = ref.current
    if (!el || !xTo.current || !yTo.current) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    xTo.current(relX * strength)
    yTo.current(relY * strength)
  }

  function reset() {
    xTo.current?.(0)
    yTo.current?.(0)
  }

  return (
    <div
      ref={ref}
      className={`magnetic${className ? ` ${className}` : ''}`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </div>
  )
}
