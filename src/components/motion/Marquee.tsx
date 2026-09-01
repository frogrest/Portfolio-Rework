import { type ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  speed?: 'default' | 'slow' | 'fast'
  className?: string
  reversed?: boolean
}

export function Marquee({ children, speed = 'default', className = '', reversed = false }: MarqueeProps) {
  return (
    <div className={`marquee${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div
        className="marquee__track"
        data-speed={speed}
        style={reversed ? { animationDirection: 'reverse' } : undefined}
      >
        <div className="marquee__group">{children}</div>
        <div className="marquee__group">{children}</div>
      </div>
    </div>
  )
}
