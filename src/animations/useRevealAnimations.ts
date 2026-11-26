import type { RefObject } from 'react'
import { EASE, MQ, ScrollTrigger, SplitText, gsap, useGSAP } from './gsap'

/**
 * Animações de entrada declarativas. Basta marcar o elemento no JSX:
 *
 *   data-reveal="lines"   texto revelado linha a linha, com máscara (SplitText)
 *   data-reveal="up"      surge de baixo com fade
 *   data-reveal="clip"    imagem/bloco revelado por recorte (clip-path)
 *   data-reveal="draw"    traço SVG desenhado (use pathLength="1" no elemento)
 *   data-reveal-delay     atraso em segundos (opcional)
 *   data-parallax="12"    deslocamento vertical em % durante a rolagem (desktop)
 *
 * Tudo roda dentro de gsap.matchMedia(): com "reduzir movimento" ativado nada é animado
 * e o conteúdo aparece normalmente. A configuração é feita quando o navegador fica ocioso,
 * depois da primeira pintura, para não travar o carregamento. O useGSAP desfaz tudo ao desmontar.
 */
export function useRevealAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    (context) => {
      const root = scope.current
      if (!root) return
      const delayOf = (el: Element) => Number((el as HTMLElement).dataset.revealDelay ?? 0)
      // Só anima o que ainda está abaixo da tela: o que já foi visto continua visível.
      const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92

      const setup = () =>
        context.add(() => {
          const mm = gsap.matchMedia()

          mm.add(MQ.motion, () => {
            // 1) Linhas com máscara
            root.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
              if (!below(el)) return
              SplitText.create(el, {
                type: 'lines',
                mask: 'lines',
                autoSplit: true,
                aria: 'none',
                linesClass: 'split-line',
                onSplit(self) {
                  return gsap.from(self.lines, {
                    yPercent: 108,
                    duration: 1.2,
                    ease: EASE.revelar,
                    stagger: 0.085,
                    delay: delayOf(el),
                    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                  })
                },
              })
            })

            // 2) Surgir de baixo (em lote)
            const ups = [...root.querySelectorAll<HTMLElement>('[data-reveal="up"]')].filter(below)
            if (ups.length) {
              gsap.set(ups, { y: 34, autoAlpha: 0 })
              ScrollTrigger.batch(ups, {
                start: 'top 92%',
                once: true,
                onEnter: (batch) =>
                  gsap.to(batch, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.07,
                    delay: delayOf(batch[0]),
                  }),
              })
            }

            // 3) Recorte
            root.querySelectorAll<HTMLElement>('[data-reveal="clip"]').forEach((el) => {
              if (!below(el)) return
              const inner = el.querySelector('img, video, .clip-inner')
              const tl = gsap.timeline({
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                delay: delayOf(el),
              })
              tl.fromTo(
                el,
                { clipPath: 'inset(100% 0% 0% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' },
              )
              if (inner) tl.from(inner, { scale: 1.18, duration: 1.8, ease: 'expo.out' }, 0.15)
            })

            // 4) Traços SVG
            root.querySelectorAll<SVGElement>('[data-reveal="draw"]').forEach((el) => {
              if (!below(el)) return
              gsap.fromTo(
                el,
                { strokeDasharray: 1, strokeDashoffset: 1 },
                {
                  strokeDashoffset: 0,
                  duration: 1.8,
                  ease: 'power2.inOut',
                  delay: delayOf(el),
                  scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top 75%', once: true },
                },
              )
            })
          })

          // 5) Parallax só em telas grandes
          mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
            root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
              const amount = Number(el.dataset.parallax ?? 10)
              gsap.fromTo(
                el,
                { yPercent: amount },
                {
                  yPercent: -amount,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: el.parentElement ?? el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                },
              )
            })
          })
        })

      const idle = window.requestIdleCallback
        ? window.requestIdleCallback(setup, { timeout: 700 })
        : window.setTimeout(setup, 60)

      // Fontes carregadas mudam a altura dos textos: recalcula as posições.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())

      return () => {
        if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
        else window.clearTimeout(idle)
      }
    },
    { scope },
  )
}
