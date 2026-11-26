import type { SVGProps } from 'react'

/**
 * Estrela de quatro pontas — a assinatura visual do portfólio.
 * Pontas verticais mais longas que as horizontais e curvas côncavas: lembra o brilho de uma
 * estrela vista a olho nu, sem cair no desenho de ícone genérico.
 */
export const STAR_PATH = 'M0,-50 C3.2,-13 13,-3.4 36,0 C13,3.4 3.2,13 0,50 C-3.2,13 -13,3.4 -36,0 C-13,-3.4 -3.2,-13 0,-50 Z'

type StarProps = SVGProps<SVGSVGElement> & {
  size?: number | string
  /** Traço em vez de preenchimento */
  outline?: boolean
  title?: string
}

export function Star({ size = 16, outline = false, title, ...rest }: StarProps) {
  return (
    <svg
      viewBox="-52 -52 104 104"
      width={size}
      height={size}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path
        d={STAR_PATH}
        fill={outline ? 'none' : 'currentColor'}
        stroke={outline ? 'currentColor' : 'none'}
        strokeWidth={outline ? 3 : 0}
        vectorEffect={outline ? 'non-scaling-stroke' : undefined}
      />
    </svg>
  )
}

/** A estrela "da Bianca": sempre levemente inclinada, como se tivesse sido posicionada à mão. */
export function BrandStar({ size = 18, className = '', ...rest }: StarProps) {
  return <Star size={size} className={`brand-star ${className}`} {...rest} />
}
