import { useRef, useState, type KeyboardEvent } from 'react'
import { akron } from '../../data/akron'
import { asset } from '../../utils/asset'
import { MQ, gsap, useGSAP } from '../../animations/gsap'
import { Laptop, Phone } from '../../components/Mockups'

const SCREEN_RATIO = 800 / 1280 // tela 16:10 do notebook

/**
 * Sistema web: abas com as telas reais. As capturas mais longas "rolam" dentro do notebook
 * conforme a página desce. A troca de aba revela a nova tela por recorte.
 */
export function AkronWeb() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const previous = useRef(0)
  const { screens, mobile } = akron.web

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLImageElement>('.ak-web__shot').forEach((img) => {
          const h = Number(img.getAttribute('height'))
          const w = Number(img.getAttribute('width'))
          const extra = 1 - (w * SCREEN_RATIO) / h
          if (extra <= 0.01) return
          gsap.fromTo(
            img,
            { yPercent: 0 },
            {
              yPercent: -extra * 100,
              ease: 'none',
              scrollTrigger: { trigger: '.ak-web__stage', start: 'top 70%', end: 'bottom 20%', scrub: 0.6 },
            },
          )
        })
      })
    },
    { scope: ref },
  )

  // Transição entre abas (recorte de baixo para cima).
  useGSAP(
    () => {
      const shots = gsap.utils.toArray<HTMLElement>('.ak-web__layer')
      const next = shots[active]
      const prev = shots[previous.current]
      if (!next || previous.current === active) return
      const reduce = window.matchMedia(MQ.reduce).matches
      gsap.set(shots, { zIndex: 0 })
      gsap.set(prev, { zIndex: 1, autoAlpha: 1 })
      gsap.set(next, { zIndex: 2, autoAlpha: 1 })
      if (reduce) {
        gsap.set(shots.filter((s) => s !== next), { autoAlpha: 0 })
      } else {
        gsap.fromTo(
          next,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.9,
            ease: 'expo.inOut',
            onComplete: () => gsap.set(shots.filter((s) => s !== next), { autoAlpha: 0 }),
          },
        )
      }
      previous.current = active
    },
    { scope: ref, dependencies: [active] },
  )

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = screens.length - 1
    let next = active
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    setActive(next)
    ref.current?.querySelector<HTMLButtonElement>(`#ak-tab-${screens[next].id}`)?.focus()
  }

  return (
    <div ref={ref} className="ak-band ak-band--light ak-web" data-theme="light">
      <div className="container">
        <div className="ak-web__head">
          <h3 className="ak-kicker" data-reveal="up">
            Sistema web
          </h3>
          <p className="ak-web__lead" data-reveal="lines">
            {akron.web.lead}
          </p>
        </div>

        <div className="ak-web__tabs" role="tablist" aria-label="Telas do sistema web" data-reveal="up">
          {screens.map((screen, i) => (
            <button
              key={screen.id}
              id={`ak-tab-${screen.id}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="ak-web-panel"
              tabIndex={i === active ? 0 : -1}
              className="ak-web__tab"
              onClick={() => setActive(i)}
              onKeyDown={onKey}
            >
              <span className="ak-web__tab-num">{String(i + 1).padStart(2, '0')}</span>
              {screen.label}
            </button>
          ))}
        </div>

        <div className="ak-web__stage">
          <Laptop className="ak-web__laptop">
            <div
              id="ak-web-panel"
              role="tabpanel"
              aria-labelledby={`ak-tab-${screens[active].id}`}
              className="ak-web__panel"
            >
              {screens.map((screen, i) => (
                <div key={screen.id} className="ak-web__layer" aria-hidden={i !== active}>
                  <img
                    className="ak-web__shot"
                    src={asset(screen.src)}
                    width={screen.width}
                    height={screen.height}
                    alt={screen.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </Laptop>

          <div className="ak-web__phones" aria-label="Versão responsiva do sistema web">
            {mobile.map((m, i) => (
              <Phone key={m.src} className={`ak-web__phone ak-web__phone--${i}`}>
                <img src={asset(m.src)} alt={m.alt} width={390} height={844} loading="lazy" decoding="async" />
              </Phone>
            ))}
          </div>
        </div>
        <p className="ak-caption" data-reveal="up">
          Capturas reais do sistema web (claro no notebook; claro e escuro no celular) · Nananilda/tcc, pasta docs
        </p>
      </div>
    </div>
  )
}
