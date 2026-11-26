import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { navigation } from '../data/navigation'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrollTo } from '../animations/SmoothScroll'
import { ScrollTrigger, gsap, useGSAP } from '../animations/gsap'
import { Monogram } from './Monogram'
import { Star } from './Star'
import { GithubMark } from './TechIcon'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const active = useActiveSection()
  const scrollTo = useScrollTo()
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  // "Outros projetos" também acende o item "Projetos" do menu.
  const current = active === 'github' ? 'akron' : active

  useGSAP(
    () => {
      const header = headerRef.current
      if (!header) return
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
      )
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll()
          header.classList.toggle('is-scrolled', y > 24)
          if (y < 240 || self.direction === -1) header.classList.remove('is-hidden')
          else if (self.direction === 1) header.classList.add('is-hidden')
        },
      })
    },
    { scope: headerRef },
  )

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollTo(`#${id}`)
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <header ref={headerRef} className={`site-header${menuOpen ? ' is-menu-open' : ''}`}>
        <div className="site-header__inner container">
          <a href="#inicio" className="site-header__brand" onClick={go('inicio')}>
            <Monogram />
            <span className="site-header__name">Bianca Oliveira</span>
            <span className="sr-only">, voltar ao início</span>
          </a>

          <nav className="site-nav" aria-label="Principal">
            <ul className="site-nav__list">
              {navigation
                .filter((item) => item.inHeader)
                .map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="site-nav__link"
                      aria-current={current === item.id ? 'true' : undefined}
                      onClick={go(item.id)}
                    >
                      <Star size={8} className="site-nav__star" />
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          <a className="site-header__github" href={profile.github.url} target="_blank" rel="noopener noreferrer">
            <GithubMark size={16} />
            <span>GitHub</span>
            <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="menu-toggle__label">{menuOpen ? 'Fechar' : 'Menu'}</span>
            <span className="menu-toggle__icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
        <span ref={progressRef} className="site-header__progress" aria-hidden="true" />
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={(returnFocus = true) => {
          setMenuOpen(false)
          if (returnFocus) toggleRef.current?.focus()
        }}
        current={current}
      />
    </>
  )
}
