import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Dialog } from './Dialog'
import { asset } from '../utils/asset'

interface VideoDialogProps {
  open: boolean
  onClose: () => void
  src: string
  poster: string
  title: string
  duration: string
}

/** Vídeo de apresentação do Ákron em um modal. O arquivo só é baixado quando o modal abre. */
export function VideoDialog({ open, onClose, src, poster, title, duration }: VideoDialogProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (open) video.play().catch(() => undefined)
    else video.pause()
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} labelledBy="video-titulo" className="dialog--video">
      <div className="video-dialog">
        <header className="video-dialog__head">
          <h2 id="video-titulo" className="video-dialog__title">
            {title}
          </h2>
          <span className="video-dialog__meta">{duration} · com legendas</span>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar vídeo" data-autofocus>
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </header>
        <video
          ref={videoRef}
          className="video-dialog__video"
          src={asset(src)}
          poster={asset(poster)}
          controls
          playsInline
          preload="none"
          width={848}
          height={478}
        >
          Seu navegador não reproduz vídeos HTML5.{' '}
          <a href={asset(src)} download>
            Baixe o vídeo
          </a>
          .
        </video>
        <p className="video-dialog__credit">Vídeo produzido pela equipe Athenas para apresentar o Ákron.</p>
      </div>
    </Dialog>
  )
}
