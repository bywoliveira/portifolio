import { forwardRef, type ReactNode } from 'react'

/** Notebook desenhado em CSS. O conteúdo (captura real) vai dentro da tela. */
export const Laptop = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(function Laptop(
  { children, className = '' },
  ref,
) {
  return (
    <div className={`laptop ${className}`} ref={ref}>
      <div className="laptop__lid">
        <span className="laptop__camera" aria-hidden="true" />
        <div className="laptop__screen">{children}</div>
      </div>
      <div className="laptop__base" aria-hidden="true">
        <span className="laptop__notch" />
      </div>
    </div>
  )
})

/** Celular desenhado em CSS, proporção 390 × 844. */
export function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone__screen">{children}</div>
      <span className="phone__island" aria-hidden="true" />
    </div>
  )
}
