import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })

// Evita "pulos" quando a barra de endereço do celular aparece/some.
ScrollTrigger.config({ ignoreMobileResize: true })

/** Curvas usadas no site inteiro (nomes em português para facilitar a manutenção). */
export const EASE = {
  revelar: 'expo.out',
  suave: 'power2.inOut',
  saida: 'power3.in',
} as const

/** Consultas de mídia usadas com gsap.matchMedia(). */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px)',
  mobile: '(max-width: 1023.98px)',
  finePointer: '(hover: hover) and (pointer: fine)',
} as const

export { gsap, ScrollTrigger, SplitText, useGSAP }
