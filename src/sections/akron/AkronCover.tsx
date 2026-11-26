import { useRef } from 'react'
import { Play } from 'lucide-react'
import { akron } from '../../data/akron'
import { asset } from '../../utils/asset'
import { MQ, gsap, useGSAP } from '../../animations/gsap'
import { AkronLogo } from '../../components/AkronLogo'
import { Laptop } from '../../components/Mockups'
import { ButtonLink } from '../../components/Button'
import { Star } from '../../components/Star'
import { useMagnetic } from '../../hooks/useMagnetic'

export function AkronCover({ onPlay }: { onPlay: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const playRef = useMagnetic<HTMLButtonElement>(0.22)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        // O notebook "deita" e se aproxima conforme a página sobe.
        gsap.fromTo(
          '.ak-cover__device',
          { rotateX: 22, scale: 0.84, yPercent: 10 },
          {
            rotateX: 0,
            scale: 1,
            yPercent: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.ak-cover__stage', start: 'top bottom', end: 'center 55%', scrub: true },
          },
        )
        gsap.from('.ak-cover__logo .akron-logo__symbol', {
          rotate: -12,
          scale: 0.6,
          autoAlpha: 0,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.ak-cover__logo', start: 'top 85%', once: true },
        })
        gsap.from('.ak-cover__logo .akron-logo__name', {
          clipPath: 'inset(0% 100% 0% 0%)',
          duration: 1.4,
          ease: 'expo.inOut',
          delay: 0.2,
          scrollTrigger: { trigger: '.ak-cover__logo', start: 'top 85%', once: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="ak-band ak-band--light ak-cover" data-theme="light">
      <div className="container">
        <div className="ak-cover__top">
          <p className="eyebrow" data-reveal="up">
            <Star size={9} className="eyebrow__star" />
            <span className="eyebrow__num">03</span>
            <span className="eyebrow__sep" aria-hidden="true" />
            <span>Projeto principal</span>
          </p>
          <p className="ak-cover__context" data-reveal="up">
            {akron.context}
          </p>
        </div>

        <div className="ak-cover__logo">
          <AkronLogo />
          <p className="ak-cover__greek" data-reveal="up">
            <span lang="grc" className="ak-cover__greek-word">
              {akron.greek}
            </span>
            <span>{akron.meaning}</span>
          </p>
        </div>

        <div className="ak-cover__grid">
          <h2 id="akron-titulo" className="ak-cover__title" data-reveal="lines" data-focus-target tabIndex={-1}>
            <span className="sr-only">Ákron: </span>
            {akron.title}
          </h2>
          <div className="ak-cover__summary">
            <p data-reveal="up">{akron.summary}</p>
            <dl className="ak-meta" data-reveal="up">
              <div>
                <dt>Equipe</dt>
                <dd>{akron.team}</dd>
              </div>
              <div>
                <dt>Meu papel</dt>
                <dd>Scrum Master e desenvolvedora back-end</dd>
              </div>
              <div>
                <dt>Plataformas</dt>
                <dd>Web (PHP/MySQL), app Flutter e ESP32</dd>
              </div>
            </dl>
            <div className="ak-cover__actions" data-reveal="up">
              <button ref={playRef} type="button" className="btn btn--akron" onClick={onPlay}>
                <span className="btn__inner" data-magnetic-inner>
                  <Play size={14} strokeWidth={1.8} aria-hidden="true" />
                  <span className="btn__label">Assistir ao vídeo</span>
                  <span className="btn__meta">{akron.video.duration}</span>
                </span>
              </button>
              <ButtonLink href={akron.links[0].href} variant="quiet" external>
                Sistema web
              </ButtonLink>
              <ButtonLink href={akron.links[1].href} variant="quiet" external>
                Aplicativo
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="ak-cover__stage">
          <Laptop className="ak-cover__device">
            <img
              src={asset('akron/web-painel.webp')}
              width={1280}
              height={1860}
              alt="Painel do sistema web do Ákron, com o resumo dos estoques e as condições ambientais atuais."
              loading="lazy"
              decoding="async"
              className="ak-cover__shot"
            />
          </Laptop>
          <p className="ak-caption" data-reveal="up">
            Captura real do painel do sistema web · repositório Nananilda/tcc
          </p>
        </div>
      </div>
    </div>
  )
}
