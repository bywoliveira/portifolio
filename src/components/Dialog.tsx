import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLenis } from '../animations/SmoothScroll'
import { gsap } from '../animations/gsap'

interface DialogProps {
  open: boolean
  onClose: () => void
  labelledBy: string
  className?: string
  children: ReactNode
}

/**
 * Modal acessível baseado no <dialog> nativo (showModal):
 * foco preso dentro do modal, fundo inerte, Esc para fechar e foco devolvido ao botão de origem.
 * A animação de saída roda antes de fechar de fato.
 */
export function Dialog({ open, onClose, labelledBy, className = '', children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const lenis = useLenis()
  // Mantém o conteúdo montado durante a animação de saída.
  const [shown, setShown] = useState(open)
  if (open && !shown) setShown(true)

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const panel = dlg.querySelector<HTMLElement>('.dialog__panel')
    if (open && !dlg.open) {
      lastFocus.current = document.activeElement as HTMLElement | null
      dlg.showModal()
      // foco inicial previsível: o elemento marcado com data-autofocus (ex.: botão Fechar)
      dlg.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true })
      lenis?.stop()
      document.documentElement.classList.add('is-locked')
      if (!reduce) {
        if (panel)
          gsap.fromTo(
            panel,
            { y: 40, autoAlpha: 0, clipPath: 'inset(8% 4% 8% 4% round 4px)' },
            { y: 0, autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 0.8, ease: 'expo.out' },
          )
      }
    } else if (!open && dlg.open) {
      const finish = () => {
        dlg.close()
        setShown(false)
        lenis?.start()
        document.documentElement.classList.remove('is-locked')
        lastFocus.current?.focus({ preventScroll: true })
      }
      if (reduce || !panel) finish()
      else {
        gsap.to(panel, { y: 24, autoAlpha: 0, duration: 0.35, ease: 'power2.in', onComplete: finish })
      }
    }
  }, [open, lenis])

  // Garante a limpeza se o componente sair da tela com o modal aberto.
  useEffect(() => {
    const dlg = ref.current
    return () => {
      if (dlg?.open) dlg.close()
      document.documentElement.classList.remove('is-locked')
    }
  }, [])

  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-labelledby={labelledBy}
      data-lenis-prevent
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="dialog__panel">{shown ? children : null}</div>
    </dialog>
  )
}
