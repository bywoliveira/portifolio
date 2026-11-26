import { useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { certificateAreas, certificateFiles, certificates, type CertificateArea } from '../data/certificates'
import { asset } from '../utils/asset'
import { formatMonthYear, pad } from '../utils/format'
import { MQ, gsap, useGSAP } from '../animations/gsap'
import { SectionIntro } from '../components/SectionIntro'
import { CertificateModal } from '../components/CertificateModal'
import { BrandStar } from '../components/Star'

type Filter = 'todos' | CertificateArea

export function Certificates() {
  const ref = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<Filter>('todos')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const visible = useMemo(
    () => certificates.filter((c) => filter === 'todos' || c.area === filter),
    [filter],
  )
  const totalHours = certificates.reduce((sum, c) => sum + c.hours, 0)
  const institutions = new Set(certificates.map((c) => c.issuer)).size

  // Lista reaparece em cascata quando o filtro muda.
  useGSAP(
    () => {
      if (window.matchMedia(MQ.reduce).matches) return
      gsap.fromTo(
        '.cert',
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.04, ease: 'power3.out', clearProps: 'transform,opacity,visibility' },
      )
    },
    { scope: ref, dependencies: [filter], revertOnUpdate: false },
  )

  // Prévia flutuante que acompanha o cursor (apenas mouse).
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MQ.motion} and ${MQ.finePointer} and ${MQ.desktop}`, () => {
        const box = ref.current?.querySelector<HTMLElement>('.cert-preview')
        const list = ref.current?.querySelector<HTMLElement>('.cert-list')
        if (!box || !list) return
        const xTo = gsap.quickTo(box, 'x', { duration: 0.55, ease: 'power3.out' })
        const yTo = gsap.quickTo(box, 'y', { duration: 0.55, ease: 'power3.out' })
        const move = (e: PointerEvent) => {
          xTo(e.clientX + 28)
          yTo(e.clientY - 140)
        }
        list.addEventListener('pointermove', move)
        return () => list.removeEventListener('pointermove', move)
      })
    },
    { scope: ref },
  )

  useGSAP(
    () => {
      const box = ref.current?.querySelector('.cert-preview')
      if (!box) return
      gsap.to(box, {
        autoAlpha: preview ? 1 : 0,
        scale: preview ? 1 : 0.92,
        rotate: preview ? -3 : 0,
        duration: 0.4,
        ease: 'power3.out',
      })
    },
    { scope: ref, dependencies: [preview] },
  )

  return (
    <section ref={ref} id="certificados" className="certs" data-theme="light" aria-labelledby="certificados-titulo">
      <div className="container">
        <div className="certs__head">
          <SectionIntro
            id="certificados"
            number="04"
            eyebrow="Formação e certificados"
            title={
              <>
                Cursos concluídos, <em>com o documento à vista.</em>
              </>
            }
          />
          <div className="certs__formation" data-reveal="up">
            <p className="certs__formation-label">Formação principal</p>
            <p className="certs__formation-title">Técnico em Desenvolvimento de Sistemas</p>
            <p className="certs__formation-meta">SENAI · Mococa-SP · integrado ao Ensino Médio · TCC: Ákron (2026)</p>
          </div>
        </div>

        <dl className="certs__stats">
          <div data-reveal="up">
            <dt>Certificados</dt>
            <dd>{pad(certificates.length)}</dd>
          </div>
          <div data-reveal="up">
            <dt>Horas de estudo</dt>
            <dd>{totalHours}</dd>
          </div>
          <div data-reveal="up">
            <dt>Instituições</dt>
            <dd>
              {pad(institutions)}
              <span>SENAI-SP e ICMC-USP</span>
            </dd>
          </div>
        </dl>

        <div className="certs__filters" role="group" aria-label="Filtrar certificados por área" data-reveal="up">
          {[{ id: 'todos' as Filter, label: 'Todos' }, ...certificateAreas].map((area) => {
            const count =
              area.id === 'todos' ? certificates.length : certificates.filter((c) => c.area === area.id).length
            return (
              <button
                key={area.id}
                type="button"
                className="certs__filter"
                aria-pressed={filter === area.id}
                onClick={() => setFilter(area.id as Filter)}
              >
                {area.label}
                <span className="certs__filter-count">{count}</span>
              </button>
            )
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'certificado exibido' : 'certificados exibidos'}
        </p>

        <ol className="cert-list" onPointerLeave={() => setPreview(null)}>
          {visible.map((c, i) => {
            const files = certificateFiles(c.slug)
            return (
              <li
                key={c.slug}
                className={`cert${c.featured ? ' cert--featured' : ''}`}
                onPointerEnter={() => setPreview(c.slug)}
              >
                <span className="cert__thumb">
                  <img src={asset(files.thumb)} alt="" width={440} height={622} loading="lazy" decoding="async" />
                </span>
                <span className="cert__index" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <div className="cert__main">
                  {c.featured ? (
                    <span className="cert__badge">
                      <BrandStar size={9} /> Programação · extensão universitária
                    </span>
                  ) : null}
                  <h3 className="cert__title">{c.title}</h3>
                  <p className="cert__issuer">
                    {c.issuer} <span aria-hidden="true">·</span> {c.unitShort}
                  </p>
                </div>
                <p className="cert__hours">
                  <span className="sr-only">Carga horária: </span>
                  {c.hours} h
                </p>
                <p className="cert__date">
                  <span className="sr-only">Concluído em </span>
                  {formatMonthYear(c.end)}
                </p>
                <button
                  type="button"
                  className="cert__open"
                  aria-haspopup="dialog"
                  onClick={() => setOpenIndex(i)}
                >
                  <span>Ver</span>
                  <span className="sr-only"> certificado: {c.title}</span>
                  <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="cert-preview" aria-hidden="true">
        {visible.map((c) => (
          <img
            key={c.slug}
            src={asset(certificateFiles(c.slug).thumb)}
            alt=""
            className={preview === c.slug ? 'is-active' : undefined}
            loading="lazy"
            decoding="async"
            width={440}
            height={622}
          />
        ))}
      </div>

      <CertificateModal list={visible} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </section>
  )
}
