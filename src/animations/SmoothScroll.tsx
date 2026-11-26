import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

const LenisContext = createContext<Lenis | null>(null)

/**
 * Rolagem suave com Lenis, sincronizada com o GSAP:
 * - o Lenis NÃO tem loop próprio (`autoRaf: false`); quem chama `lenis.raf()` é o ticker do GSAP,
 *   então existe um único requestAnimationFrame para tudo;
 * - cada rolagem do Lenis atualiza o ScrollTrigger.
 * Com `prefers-reduced-motion: reduce`, o Lenis não é criado e a rolagem nativa é mantida.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    })
    instance.on('scroll', ScrollTrigger.update)

    const update = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    return () => {
      gsap.ticker.remove(update)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}

const HEADER_OFFSET = 0

/**
 * Rola até um alvo (seletor, elemento ou posição) e, ao terminar, move o foco para ele —
 * importante para quem navega pelo teclado ou com leitor de tela.
 */
export function useScrollTo() {
  const lenis = useLenis()
  return useCallback(
    (target: string | HTMLElement | number, options: { focus?: boolean; immediate?: boolean } = {}) => {
      const { focus = true, immediate = false } = options
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
      const focusTarget = () => {
        if (!focus || typeof el === 'number' || !el) return
        const heading = el.querySelector<HTMLElement>('[data-focus-target]') ?? el
        if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
        heading.focus({ preventScroll: true })
      }
      if (lenis) {
        lenis.scrollTo(el ?? 0, {
          offset: HEADER_OFFSET,
          duration: immediate ? 0 : 1.5,
          immediate,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
          onComplete: focusTarget,
        })
      } else {
        if (typeof el === 'number') window.scrollTo({ top: el })
        else if (el) el.scrollIntoView()
        else window.scrollTo({ top: 0 })
        focusTarget()
      }
    },
    [lenis],
  )
}
