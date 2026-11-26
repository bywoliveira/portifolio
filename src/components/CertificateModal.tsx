import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight, FileText, ShieldCheck, X, ZoomIn, ZoomOut } from 'lucide-react'
import { Dialog } from './Dialog'
import { certificateAreas, certificateFiles, type Certificate } from '../data/certificates'
import { asset } from '../utils/asset'
import { formatDate, pad } from '../utils/format'

interface CertificateModalProps {
  list: Certificate[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function CertificateModal({ list, index, onClose, onNavigate }: CertificateModalProps) {
  const open = index !== null
  const [page, setPage] = useState<1 | 2>(1)
  const [zoom, setZoom] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [current, setCurrent] = useState<Certificate | null>(null)

  // Guarda o último certificado aberto para manter o conteúdo durante a animação de saída.
  const cert = index !== null ? list[index] : current
  useEffect(() => {
    if (index !== null) setCurrent(list[index])
  }, [index, list])

  useEffect(() => {
    setPage(1)
    setZoom(false)
  }, [index])

  useEffect(() => setLoaded(false), [cert?.slug, page])

  // Setas ← → navegam entre certificados enquanto o modal está aberto
  // (exceto quando o foco está nas abas de página, que usam as setas para trocar de aba).
  const navRef = useRef<(delta: number) => void>(() => undefined)
  useEffect(() => {
    if (index === null) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.getAttribute('role') === 'tab') return
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        navRef.current(e.key === 'ArrowRight' ? 1 : -1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  if (!cert) return <Dialog open={false} onClose={onClose} labelledBy="cert-titulo" children={null} />

  const files = certificateFiles(cert.slug)
  const total = list.length
  const i = index ?? 0
  const go = (delta: number) => onNavigate((i + delta + total) % total)
  navRef.current = go
  const area = certificateAreas.find((a) => a.id === cert.area)?.label

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const next = page === 1 ? 2 : 1
      setPage(next)
      document.getElementById(`cert-pagina-${next}`)?.focus()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} labelledBy="cert-titulo" className="dialog--cert">
      <div className="cert-modal">
        <header className="cert-modal__head">
          <span className="cert-modal__count" aria-live="polite">
            Certificado {pad(i + 1)} de {pad(total)}
          </span>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar certificado" data-autofocus>
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </header>

        <div className="cert-modal__body">
          <div className="cert-modal__viewer">
            <div className="cert-modal__pages" role="tablist" aria-label="Páginas do certificado">
              {([1, 2] as const).map((p) => (
                <button
                  key={p}
                  id={`cert-pagina-${p}`}
                  type="button"
                  role="tab"
                  aria-selected={page === p}
                  aria-controls="cert-documento"
                  tabIndex={page === p ? 0 : -1}
                  onClick={() => setPage(p)}
                  onKeyDown={onTabKey}
                >
                  {p === 1 ? 'Certificado' : 'Verso'}
                </button>
              ))}
              <button
                type="button"
                className="cert-modal__zoom"
                aria-pressed={zoom}
                onClick={() => setZoom((z) => !z)}
              >
                {zoom ? <ZoomOut size={16} strokeWidth={1.6} aria-hidden="true" /> : <ZoomIn size={16} strokeWidth={1.6} aria-hidden="true" />}
                {zoom ? 'Reduzir' : 'Ampliar'}
              </button>
            </div>
            <div
              id="cert-documento"
              role="tabpanel"
              aria-labelledby={`cert-pagina-${page}`}
              className={`cert-modal__doc${zoom ? ' is-zoomed' : ''}${page === 2 ? ' is-back' : ''}`}
              tabIndex={zoom ? 0 : -1}
            >
              {page === 1 ? (
                <img className="cert-modal__placeholder" src={asset(files.thumb)} alt="" aria-hidden="true" />
              ) : null}
              <img
                key={`${cert.slug}-${page}`}
                className={`cert-modal__img${loaded ? ' is-loaded' : ''}`}
                src={asset(page === 1 ? files.page1 : files.page2)}
                alt={
                  page === 1
                    ? `Certificado do curso ${cert.title}, emitido para Bianca Moreira de Oliveira. Dados pessoais ocultados.`
                    : `Verso do certificado ${cert.title}, com o conteúdo do curso.`
                }
                onLoad={() => setLoaded(true)}
                onClick={() => setZoom((z) => !z)}
              />
            </div>
          </div>

          <div className="cert-modal__info">
            {area ? <p className="eyebrow">{area}</p> : null}
            <h2 id="cert-titulo" className="cert-modal__title">
              {cert.title}
            </h2>
            {cert.officialTitle ? <p className="cert-modal__official">{cert.officialTitle}</p> : null}
            <dl className="cert-modal__data">
              <div>
                <dt>Instituição</dt>
                <dd>{cert.issuer}</dd>
              </div>
              <div>
                <dt>Unidade</dt>
                <dd>{cert.unit}</dd>
              </div>
              <div>
                <dt>Carga horária</dt>
                <dd>{cert.hours} horas</dd>
              </div>
              <div>
                <dt>Período</dt>
                <dd>
                  {formatDate(cert.start)} a {formatDate(cert.end)}
                </dd>
              </div>
              <div>
                <dt>Emissão</dt>
                <dd>{formatDate(cert.issued)}</dd>
              </div>
              {cert.extra?.map((x) => (
                <div key={x.label}>
                  <dt>{x.label}</dt>
                  <dd>{x.value}</dd>
                </div>
              ))}
            </dl>
            {cert.summary ? <p className="cert-modal__summary">{cert.summary}</p> : null}
            {cert.topics.length ? (
              <>
                <h3 className="cert-modal__subtitle">Conteúdo</h3>
                <ul className="cert-modal__topics">
                  {cert.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </>
            ) : null}
            <a className="btn btn--ghost btn--small" href={asset(files.pdf)} target="_blank" rel="noopener noreferrer">
              <span className="btn__inner">
                <FileText size={15} strokeWidth={1.6} aria-hidden="true" />
                <span className="btn__label">Abrir PDF</span>
              </span>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <p className="cert-modal__privacy">
              <ShieldCheck size={16} strokeWidth={1.6} aria-hidden="true" />
              Versão pública: número de documento, data de nascimento e códigos de autenticação foram removidos do
              arquivo.
            </p>
          </div>
        </div>

        <footer className="cert-modal__nav">
          <button type="button" onClick={() => go(-1)}>
            <ChevronLeft size={18} strokeWidth={1.5} aria-hidden="true" /> Anterior
          </button>
          <span className="cert-modal__hint" aria-hidden="true">
            ← → para navegar
          </span>
          <button type="button" onClick={() => go(1)}>
            Próximo <ChevronRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </footer>
      </div>
    </Dialog>
  )
}
