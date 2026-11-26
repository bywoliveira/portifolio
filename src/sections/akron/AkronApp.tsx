import { useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { akron } from '../../data/akron'
import { asset } from '../../utils/asset'
import { MQ, gsap, useGSAP } from '../../animations/gsap'
import { Phone } from '../../components/Mockups'

/** Aplicativo Flutter: quatro telas reais e a troca entre os temas claro e escuro do próprio app. */
export function AkronApp() {
  const ref = useRef<HTMLDivElement>(null)
  const [dark, setDark] = useState(true)
  const firstRun = useRef(true)

  useGSAP(
    () => {
      const darkLayers = gsap.utils.toArray<HTMLElement>('.ak-app__img--dark')
      const reduce = window.matchMedia(MQ.reduce).matches
      if (firstRun.current || reduce) {
        gsap.set(darkLayers, { autoAlpha: dark ? 1 : 0 })
        firstRun.current = false
        return
      }
      gsap.to(darkLayers, {
        autoAlpha: dark ? 1 : 0,
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: { each: 0.09, from: dark ? 'start' : 'end' },
      })
    },
    { scope: ref, dependencies: [dark] },
  )

  return (
    <div ref={ref} className="ak-band ak-band--dark ak-app" data-theme="dark">
      <div className="container ak-app__grid">
        <div className="ak-app__text">
          <h3 className="ak-kicker" data-reveal="up">
            Aplicativo
          </h3>
          <p className="ak-app__lead" data-reveal="lines">
            {akron.app.lead}
          </p>
          <ul className="ak-app__details">
            {akron.app.details.map((d) => (
              <li key={d} data-reveal="up">
                {d}
              </li>
            ))}
          </ul>
          <div className="ak-theme-switch" role="group" aria-label="Tema das capturas do aplicativo" data-reveal="up">
            <button type="button" aria-pressed={!dark} onClick={() => setDark(false)}>
              <Sun size={15} strokeWidth={1.6} aria-hidden="true" /> Claro
            </button>
            <button type="button" aria-pressed={dark} onClick={() => setDark(true)}>
              <Moon size={15} strokeWidth={1.6} aria-hidden="true" /> Escuro
            </button>
          </div>
        </div>

        <ul className="ak-app__phones" aria-label="Telas do aplicativo">
          {akron.app.screens.map((screen, i) => (
            <li key={screen.id} className={`ak-app__item ak-app__item--${i}`} data-parallax={i % 2 === 0 ? 6 : -6}>
              <Phone>
                <img
                  className="ak-app__img"
                  src={asset(screen.light)}
                  alt={`${screen.alt} Tema ${dark ? 'escuro' : 'claro'}.`}
                  width={390}
                  height={844}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="ak-app__img ak-app__img--dark"
                  src={asset(screen.dark)}
                  alt=""
                  aria-hidden="true"
                  width={390}
                  height={844}
                  loading="lazy"
                  decoding="async"
                />
              </Phone>
              <span className="ak-app__label">{screen.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="container ak-caption ak-caption--dark" data-reveal="up">
        Capturas reais do aplicativo rodando no Flutter Web · Nananilda/app_tcc, pasta docs
      </p>
    </div>
  )
}
