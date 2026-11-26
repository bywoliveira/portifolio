import { useRef } from 'react'
import { navigation } from '../data/navigation'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrollTo } from '../animations/SmoothScroll'
import { gsap, useGSAP } from '../animations/gsap'
import { Star } from './Star'

/** Posição de cada estrela (uma por seção) dentro de uma área de 44 × 380 px. */
const POS = [
  { x: 14, y: 12 },
  { x: 34, y: 68 },
  { x: 9, y: 126 },
  { x: 29, y: 188 },
  { x: 12, y: 248 },
  { x: 35, y: 308 },
  { x: 19, y: 366 },
]

/**
 * Navegação lateral em forma de constelação (desktop).
 * Cada seção é uma estrela; o traço até a próxima estrela se desenha conforme a leitura avança,
 * então a constelação só fica completa quando a pessoa chega ao contato.
 */
export function ConstellationNav() {
  const ref = useRef<HTMLElement>(null)
  const active = useActiveSection()
  const scrollTo = useScrollTo()
  const activeIndex = navigation.findIndex((n) => n.id === active)

  useGSAP(
    () => {
      gsap.utils.toArray<SVGLineElement>('.cn__progress').forEach((line, i) => {
        gsap.fromTo(
          line,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            // elementos passados diretamente: seletores ficariam restritos ao escopo da <nav>
            scrollTrigger: {
              trigger: document.getElementById(navigation[i].id),
              start: 'top 55%',
              end: 'bottom 55%',
              scrub: true,
            },
          },
        )
      })
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, x: 14 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: document.getElementById('sobre'),
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    },
    { scope: ref },
  )

  return (
    <nav ref={ref} className="constellation-nav" aria-label="Seções da página">
      <svg className="cn__svg" viewBox="0 0 44 380" aria-hidden="true" focusable="false">
        {POS.slice(0, -1).map((p, i) => (
          <line key={`b${i}`} x1={p.x} y1={p.y} x2={POS[i + 1].x} y2={POS[i + 1].y} className="cn__base" />
        ))}
        {POS.slice(0, -1).map((p, i) => (
          <line
            key={`p${i}`}
            x1={p.x}
            y1={p.y}
            x2={POS[i + 1].x}
            y2={POS[i + 1].y}
            className="cn__progress"
            pathLength={1}
            strokeDasharray={1}
          />
        ))}
      </svg>
      <ol className="cn__list">
        {navigation.map((item, i) => (
          <li
            key={item.id}
            className={`cn__item${i === activeIndex ? ' is-active' : ''}${i < activeIndex ? ' is-past' : ''}`}
            style={{ left: POS[i].x, top: POS[i].y }}
          >
            <a
              href={`#${item.id}`}
              className="cn__node"
              aria-current={i === activeIndex ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(`#${item.id}`)
                history.replaceState(null, '', `#${item.id}`)
              }}
            >
              <Star size={12} className="cn__star" />
              <span className="cn__label">{item.short}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
