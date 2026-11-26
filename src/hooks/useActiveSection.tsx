import { createContext, useContext, useState, type ReactNode } from 'react'
import { ScrollTrigger, gsap, useGSAP } from '../animations/gsap'
import { navigation } from '../data/navigation'

interface SectionState {
  active: string
}

const SectionContext = createContext<SectionState>({ active: navigation[0].id })

/**
 * Observa a rolagem e informa:
 *  - qual seção está ativa (para o menu e a constelação lateral);
 *  - o tema (claro/escuro) da faixa que está sob o header e no meio da tela, gravado em
 *    <html data-header-theme> e <html data-nav-theme>. O CSS usa isso para trocar as cores.
 * Faixas são elementos com `data-theme="dark|light"` — não aninhe uma faixa dentro de outra.
 */
export function SectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(navigation[0].id)

  useGSAP((context) => {
    const html = document.documentElement

    const setup = () =>
      context.add(() => {
        navigation.forEach(({ id }) => {
          ScrollTrigger.create({
            trigger: `#${id}`,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => self.isActive && setActive(id),
          })
        })
        gsap.utils.toArray<HTMLElement>('[data-theme]').forEach((band) => {
          const theme = band.dataset.theme ?? 'dark'
          ScrollTrigger.create({
            trigger: band,
            start: 'top 40px',
            end: 'bottom 40px',
            onToggle: (self) => self.isActive && (html.dataset.headerTheme = theme),
          })
          ScrollTrigger.create({
            trigger: band,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => self.isActive && (html.dataset.navTheme = theme),
          })
        })
      })

    // Criados quando o navegador fica ocioso: não disputam o carregamento inicial.
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(setup, { timeout: 500 })
      : window.setTimeout(setup, 40)

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
    }
  })

  return <SectionContext.Provider value={{ active }}>{children}</SectionContext.Provider>
}

export function useActiveSection() {
  return useContext(SectionContext).active
}
