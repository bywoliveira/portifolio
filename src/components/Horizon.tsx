import { useRef } from 'react'
import { MQ, gsap, useGSAP } from '../animations/gsap'

/**
 * Transição entre seções: a borda superior da seção nasce curva, como o horizonte de um
 * planeta, e se achata enquanto a seção sobe na tela.
 */
export function Horizon({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          el,
          { scaleY: 1 },
          {
            scaleY: 0.08,
            ease: 'none',
            transformOrigin: '50% 100%',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'top 25%', scrub: true },
          },
        )
      })
    },
    { scope: ref },
  )
  return (
    <svg ref={ref} className={`horizon ${className}`} viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M0 140 C 300 6, 1140 6, 1440 140 Z" />
    </svg>
  )
}
