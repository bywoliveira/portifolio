import type { ReactNode } from 'react'
import { Star } from './Star'

interface SectionIntroProps {
  id: string
  number: string
  eyebrow: string
  title: ReactNode
  className?: string
  children?: ReactNode
}

/** Cabeçalho padrão das seções: numeração, rótulo e título revelado por linhas. */
export function SectionIntro({ id, number, eyebrow, title, className = '', children }: SectionIntroProps) {
  return (
    <header className={`section-intro ${className}`}>
      <p className="eyebrow" data-reveal="up">
        <Star size={9} className="eyebrow__star" />
        <span className="eyebrow__num">{number}</span>
        <span className="eyebrow__sep" aria-hidden="true" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={`${id}-titulo`} className="section-title" data-reveal="lines" data-focus-target tabIndex={-1}>
        {title}
      </h2>
      {children}
    </header>
  )
}
