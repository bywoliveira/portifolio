import { BrandStar } from './Star'

/** Monograma "BO" com a estrela de assinatura no canto do O. */
export function Monogram({ className = '' }: { className?: string }) {
  return (
    <span className={`monogram ${className}`} aria-hidden="true">
      <span className="monogram__b">B</span>
      <span className="monogram__o">O</span>
      <BrandStar size="0.42em" className="monogram__star" />
    </span>
  )
}
