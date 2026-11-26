import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'
import { useScrollTo } from '../animations/SmoothScroll'
import { Star } from './Star'

type Variant = 'primary' | 'ghost' | 'quiet'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: Variant
  children: ReactNode
  /** Mostra a seta de link externo */
  external?: boolean
  icon?: ReactNode
}

/**
 * Link com aparência de botão. Âncoras internas (#secao) rolam com o Lenis;
 * links externos abrem em nova aba com rel="noopener noreferrer".
 */
export function ButtonLink({
  href,
  variant = 'primary',
  children,
  external,
  icon,
  className = '',
  onClick,
  ...rest
}: ButtonLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>(variant === 'quiet' ? 0.18 : 0.26)
  const scrollTo = useScrollTo()
  const isAnchor = href.startsWith('#')

  return (
    <a
      ref={ref}
      href={href}
      className={`btn btn--${variant} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={(e) => {
        if (isAnchor) {
          e.preventDefault()
          scrollTo(href)
          history.replaceState(null, '', href)
        }
        onClick?.(e)
      }}
      {...rest}
    >
      <span className="btn__inner" data-magnetic-inner>
        {icon ?? <Star size={11} className="btn__star" />}
        <span className="btn__label">{children}</span>
        {external ? <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" className="btn__arrow" /> : null}
      </span>
      {external ? <span className="sr-only"> (abre em nova aba)</span> : null}
    </a>
  )
}
