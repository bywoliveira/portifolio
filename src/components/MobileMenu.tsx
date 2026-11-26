import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { navigation } from '../data/navigation'
import { contactLinks, profile } from '../data/profile'
import { useLenis, useScrollTo } from '../animations/SmoothScroll'
import { gsap, useGSAP } from '../animations/gsap'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { Starfield } from './Starfield'
import { BrandStar } from './Star'
import { pad } from '../utils/format'

interface MobileMenuProps {
  open: boolean
  onClose: (returnFocus?: boolean) => void
  current: string
}

/** Menu de tela cheia para celulares e tablets. Abre a partir do botão, em recorte circular. */
export function MobileMenu({ open, onClose, current }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const [visible, setVisible] = useState(false)
  const lenis = useLenis()
  const scrollTo = useScrollTo()
  const reduce = usePrefersReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      tl.current = gsap
        .timeline({ paused: true, onReverseComplete: () => setVisible(false) })
        .fromTo(
          el,
          { clipPath: 'circle(0% at calc(100% - 40px) 34px)' },
          { clipPath: 'circle(150% at calc(100% - 40px) 34px)', duration: 0.95, ease: 'expo.inOut' },
        )
        .from('.mobile-menu__label', { yPercent: 115, duration: 0.85, stagger: 0.055, ease: 'expo.out' }, 0.32)
        .from('.mobile-menu__num, .mobile-menu__footer > *', { autoAlpha: 0, y: 8, duration: 0.5, stagger: 0.03 }, 0.5)
        .from('.mobile-menu__star', { rotate: -90, scale: 0.4, autoAlpha: 0, duration: 1.2, ease: 'expo.out' }, 0.3)
    },
    { scope: ref },
  )

  useEffect(() => {
    if (open) setVisible(true)
  }, [open])

  useEffect(() => {
    const t = tl.current
    if (!t || !visible) return
    const html = document.documentElement
    const blocked = [document.getElementById('conteudo'), document.querySelector('.site-footer')]
    if (open) {
      lenis?.stop()
      html.classList.add('is-locked')
      blocked.forEach((el) => el?.setAttribute('inert', ''))
      if (reduce) t.progress(1)
      else t.timeScale(1).play()
      requestAnimationFrame(() => ref.current?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true }))
    } else {
      lenis?.start()
      html.classList.remove('is-locked')
      blocked.forEach((el) => el?.removeAttribute('inert'))
      if (reduce) {
        t.progress(0)
        setVisible(false)
      } else t.timeScale(1.5).reverse()
    }
  }, [open, visible, lenis, reduce])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const mql = window.matchMedia('(min-width: 1024px)')
    const onWide = () => mql.matches && onClose(false)
    window.addEventListener('keydown', onKey)
    mql.addEventListener('change', onWide)
    return () => {
      window.removeEventListener('keydown', onKey)
      mql.removeEventListener('change', onWide)
    }
  }, [open, onClose])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    lenis?.start()
    onClose(false)
    scrollTo(`#${id}`)
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <div
      ref={ref}
      id="menu-mobile"
      className="mobile-menu"
      hidden={!visible}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      data-lenis-prevent
    >
      <Starfield seed={31} count={46} sparkles={4} />
      <BrandStar size={220} className="mobile-menu__star" />
      <nav aria-label="Seções">
        <ol className="mobile-menu__list">
          {navigation.map((item, i) => (
            <li key={item.id} className="mobile-menu__item">
              <a
                href={`#${item.id}`}
                onClick={go(item.id)}
                aria-current={current === item.id ? 'true' : undefined}
                className="mobile-menu__link"
              >
                <span className="mobile-menu__num">{pad(i + 1)}</span>
                <span className="mobile-menu__mask">
                  <span className="mobile-menu__label">{item.id === 'github' ? 'Outros projetos' : item.label}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="mobile-menu__footer">
        <p className="eyebrow">{profile.coordinates}</p>
        <ul className="mobile-menu__contacts">
          {contactLinks().map((c) => (
            <li key={c.label}>
              <a href={c.href} target="_blank" rel="noopener noreferrer">
                {c.label}
                <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
