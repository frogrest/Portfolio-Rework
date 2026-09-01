import { MaskedReveal } from '../motion/MaskedReveal'

interface SectionHeadProps {
  index: string
  title: string
  className?: string
}

export function SectionHead({ index, title, className = '' }: SectionHeadProps) {
  return (
    <div className={`section-head${className ? ` ${className}` : ''}`}>
      <span className="section-head__index" aria-hidden="true">
        {index}
      </span>
      <MaskedReveal as="h2" className="section-head__title" text={title} />
    </div>
  )
}
