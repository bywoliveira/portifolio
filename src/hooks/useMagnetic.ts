import { useRef } from 'react'
import { MQ, gsap, useGSAP } from '../animations/gsap'

/**
 * Microinteração magnética discreta: o elemento acompanha levemente o cursor.
 * Só em dispositivos com mouse e sem "reduzir movimento".
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(`${MQ.motion} and ${MQ.finePointer}`, () => {
        const inner = el.querySelector<HTMLElement>('[data-magnetic-inner]')
        const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' })
        const ixTo = inner ? gsap.quickTo(inner, 'x', { duration: 0.7, ease: 'power3.out' }) : null
        const iyTo = inner ? gsap.quickTo(inner, 'y', { duration: 0.7, ease: 'power3.out' }) : null
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const dx = e.clientX - (r.left + r.width / 2)
          const dy = e.clientY - (r.top + r.height / 2)
          xTo(dx * strength)
          yTo(dy * strength)
          ixTo?.(dx * strength * 0.35)
          iyTo?.(dy * strength * 0.35)
        }
        const leave = () => {
          xTo(0)
          yTo(0)
          ixTo?.(0)
          iyTo?.(0)
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        return () => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
          gsap.set([el, inner].filter(Boolean), { x: 0, y: 0 })
        }
      })
    },
    { scope: ref },
  )
  return ref
}
