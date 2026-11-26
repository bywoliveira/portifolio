import { useRef } from 'react'
import { Cpu, Database, MonitorSmartphone, Server, Thermometer, type LucideIcon } from 'lucide-react'
import { akron } from '../../data/akron'
import { MQ, gsap, useGSAP } from '../../animations/gsap'
import { pad } from '../../utils/format'

const ICONS: Record<string, LucideIcon> = {
  sensores: Thermometer,
  esp32: Cpu,
  api: Server,
  mysql: Database,
  telas: MonitorSmartphone,
}

/**
 * "Do sensor à tela": o caminho de uma leitura, contado em cinco etapas.
 * No desktop a cena fica fixa (pin) e a rolagem empurra a leitura pelo trajeto;
 * no celular as etapas acendem uma a uma, na vertical.
 */
export function AkronPipeline() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const stages = gsap.utils.toArray<HTMLElement>('.ak-stage')

      mm.add(`${MQ.motion} and (min-width: 1024px) and (min-height: 680px)`, () => {
        const track = ref.current?.querySelector<HTMLElement>('.ak-flow__track')
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '.ak-flow-pin',
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        tl.fromTo('.ak-flow__fill', { scaleX: 0 }, { scaleX: 1, duration: 4 }, 0)
          .fromTo('.ak-flow__packet', { x: 0 }, { x: () => track?.clientWidth ?? 0, duration: 4 }, 0)
        stages.forEach((stage, i) => {
          tl.fromTo(stage, { '--lit': 0.0 }, { '--lit': 1, duration: 0.45, ease: 'power1.out' }, Math.max(0, i - 0.2))
        })
        tl.fromTo('.ak-payload', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 3.4)
      })

      mm.add(`${MQ.motion} and (max-width: 1023.98px), ${MQ.motion} and (max-height: 679.98px)`, () => {
        gsap.fromTo(
          '.ak-flow__fill',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.ak-flow', start: 'top 70%', end: 'bottom 70%', scrub: true } },
        )
        stages.forEach((stage) =>
          gsap.fromTo(
            stage,
            { '--lit': 0 },
            { '--lit': 1, ease: 'none', scrollTrigger: { trigger: stage, start: 'top 75%', end: 'top 55%', scrub: true } },
          ),
        )
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="ak-band ak-band--dark ak-pipeline" data-theme="dark">
      <div className="ak-flow-pin">
        <div className="container ak-pipeline__inner">
          <div className="ak-pipeline__head">
            <h3 className="ak-kicker">Como funciona</h3>
            <p className="ak-pipeline__title">
              Do sensor <em>à tela.</em>
            </p>
            <ul className="ak-measures" aria-label="Grandezas monitoradas">
              {akron.measures.map((m) => (
                <li key={m.label}>
                  {m.label} <span>{m.unit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ak-flow">
            <div className="ak-flow__track" aria-hidden="true">
              <span className="ak-flow__fill" />
              <span className="ak-flow__packet" />
            </div>
            <ol className="ak-flow__stages">
              {akron.pipeline.map((stage, i) => {
                const Icon = ICONS[stage.id] ?? Server
                return (
                  <li key={stage.id} className="ak-stage">
                    <span className="ak-stage__node" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span className="ak-stage__num">Etapa {pad(i + 1)}</span>
                    <h4 className="ak-stage__title">{stage.title}</h4>
                    <p className="ak-stage__detail">{stage.detail}</p>
                  </li>
                )
              })}
            </ol>
          </div>

          <figure className="ak-payload">
            <pre aria-label="Exemplo de requisição enviada pelo ESP32">
              <code>
                {akron.payload.lines.map((line, i) => (
                  <span key={i} className={`ak-payload__line ak-payload__line--${i}`}>
                    {line}
                    {'\n'}
                  </span>
                ))}
              </code>
            </pre>
            <figcaption>{akron.payload.note}</figcaption>
          </figure>
        </div>
      </div>

      <div className="container ak-features">
        <h3 className="ak-kicker" data-reveal="up">
          Funcionalidades
        </h3>
        <ul className="ak-features__list">
          {akron.features.map((f, i) => (
            <li key={f.title} className="ak-feature" data-reveal="up">
              <span className="ak-feature__num">{pad(i + 1)}</span>
              <h4 className="ak-feature__title">{f.title}</h4>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
