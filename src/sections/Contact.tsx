import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { contactLinks, profile } from '../data/profile'
import { MQ, gsap, useGSAP } from '../animations/gsap'
import { Starfield } from '../components/Starfield'
import { STAR_PATH, Star } from '../components/Star'
import { Horizon } from '../components/Horizon'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const links = contactLinks()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        // A estrela de assinatura se desenha e depois ganha preenchimento.
        const tl = gsap.timeline({ scrollTrigger: { trigger: '.contact__signature', start: 'top 85%', once: true } })
        tl.fromTo(
          '.contact__star-outline',
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' },
        )
          .from('.contact__star-fill', { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%', duration: 1.2, ease: 'expo.out' }, 1.1)
          .from('.contact__name-char', { yPercent: 105, duration: 1.2, stagger: 0.035, ease: 'expo.out' }, 0.4)
        gsap.to('.contact__orbits', {
          rotate: 8,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="contato" className="contact" data-theme="dark" aria-labelledby="contato-titulo">
      <Horizon className="horizon--night" />
      <Starfield seed={23} count={84} sparkles={7} />
      <svg className="contact__orbits" viewBox="0 0 1200 800" aria-hidden="true" focusable="false">
        <ellipse cx="600" cy="400" rx="560" ry="170" transform="rotate(-14 600 400)" pathLength={1} data-reveal="draw" />
        <ellipse cx="600" cy="400" rx="420" ry="120" transform="rotate(22 600 400)" pathLength={1} data-reveal="draw" data-reveal-delay="0.3" />
      </svg>

      <div className="container contact__inner">
        <p className="eyebrow" data-reveal="up">
          <Star size={9} className="eyebrow__star" />
          <span className="eyebrow__num">06</span>
          <span className="eyebrow__sep" aria-hidden="true" />
          <span>Contato</span>
        </p>
        <h2 id="contato-titulo" className="contact__title" data-reveal="lines" data-focus-target tabIndex={-1}>
          Para projetos, estudos <em>ou uma conversa</em> sobre o Ákron.
        </h2>

        <ul className="contact__links">
          {links.map((link) => (
            <li key={link.label} data-reveal="up">
              <a
                href={link.href}
                className="contact__link"
                {...(link.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <span className="contact__link-label">{link.label}</span>
                <span className="contact__link-handle">{link.handle}</span>
                <ArrowUpRight size={30} strokeWidth={1.2} aria-hidden="true" className="contact__link-arrow" />
                {link.href.startsWith('mailto:') ? null : <span className="sr-only"> (abre em nova aba)</span>}
              </a>
            </li>
          ))}
        </ul>

        <div className="contact__signature" aria-hidden="true">
          <p className="contact__quote">“{profile.quote}”</p>
          <p className="contact__name">
            <span className="contact__name-mask">
              {profile.name.split('').map((ch, i) => (
                <span key={i} className="contact__name-char">
                  {ch === ' ' ? ' ' : ch}
                </span>
              ))}
            </span>
            <svg className="contact__star" viewBox="-52 -52 104 104">
              <path d={STAR_PATH} className="contact__star-fill" transform="rotate(-8)" />
              <path d={STAR_PATH} className="contact__star-outline" transform="rotate(-8)" pathLength={1} />
            </svg>
          </p>
        </div>
        <p className="sr-only">“{profile.quote}” — {profile.name}</p>
      </div>
    </section>
  )
}
