interface SectionLabelProps {
  number: string
  label: string
}

export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="section-label" aria-hidden="true">
      <span>{number}</span>
      <span>/</span>
      <span>{label}</span>
    </div>
  )
}
