import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { profile } from '../data/profile'
import { MQ, ScrollTrigger, SplitText, gsap, useGSAP } from '../animations/gsap'
import { useScrollTo } from '../animations/SmoothScroll'
import { CelestialChart } from '../components/CelestialChart'
import { Starfield } from '../components/Starfield'
import { BrandStar } from '../components/Star'
import { ButtonLink } from '../components/Button'
import { GithubMark } from '../components/TechIcon'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const scrollTo = useScrollTo()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        // Planeta percorrendo a órbita (elipse paramétrica; pausa quando o topo sai da tela).
        const planet = ref.current?.querySelector<SVGCircleElement>('.chart-planet')
        const angle = { t: 0.04 }
        const orbit = gsap.to(angle, {
          t: 1.04,
          duration: 70,
          repeat: -1,
          ease: 'none',
          onUpdate: () => {
            const a = Math.PI + angle.t * Math.PI * 2
            planet?.setAttribute('cx', (400 + Math.cos(a) * 392).toFixed(1))
            planet?.setAttribute('cy', (400 + Math.sin(a) * 128).toFixed(1))
          },
        })
        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? orbit.resume() : orbit.pause()),
        })

        const html = document.documentElement
        const name = ref.current?.querySelector<HTMLElement>('.hero__name')
        // JavaScript chegou tarde (o nome já apareceu pela trava de segurança): não esconde de novo.
        const late = !html.classList.contains('hero-ready') && !!name && getComputedStyle(name).visibility === 'visible'
        html.classList.add('hero-ready')
        if (late) return

        const first = SplitText.create('.hero__word--first', { type: 'chars', charsClass: 'hero__char', aria: 'none' })
        const second = SplitText.create('.hero__word--second', { type: 'chars', charsClass: 'hero__char', aria: 'none' })

        const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'expo.out' } })
        tl.from(first.chars, { yPercent: 118, duration: 1.35, stagger: 0.045 })
          .from(second.chars, { yPercent: 118, duration: 1.35, stagger: 0.04 }, 0.16)
          .from('.hero__name-star', { scale: 0, rotate: -140, duration: 1.6, transformOrigin: '50% 50%' }, 0.75)
          .fromTo(
            '.chart-ring circle[pathLength]',
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut' },
            0,
          )
          .from('.chart-ticks, .chart-label, .chart-line--dashed, .chart-line--faint', { autoAlpha: 0, duration: 1.6, ease: 'power1.out' }, 0.5)
          .fromTo(
            '.chart-orbit',
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 2.6, stagger: 0.3, ease: 'power2.inOut' },
            0.25,
          )
          .from('.chart-dot', { scale: 0, transformOrigin: '50% 50%', duration: 0.7, stagger: 0.09, ease: 'back.out(3)' }, 0.85)
          .fromTo(
            '.chart-link',
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.7, stagger: 0.14, ease: 'power1.inOut' },
            1.0,
          )
          .from('.chart-signature', { scale: 0.3, rotate: -50, autoAlpha: 0, transformOrigin: '50% 50%', duration: 1.8 }, 0.55)

        return () => {
          first.revert()
          second.revert()
        }
      })

      // Profundidade na rolagem e leve reação ao cursor (desktop).
      mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
        const st = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('.hero__name', { yPercent: -22, ease: 'none', scrollTrigger: st })
        gsap.to('.hero__chart', { yPercent: 14, rotate: 7, ease: 'none', scrollTrigger: st })
        gsap.to('.hero__sky', { yPercent: 10, ease: 'none', scrollTrigger: st })
        gsap.to('.hero__bottom', { autoAlpha: 0, y: -30, ease: 'none', scrollTrigger: { ...st, end: '60% top' } })
      })

      mm.add(`${MQ.motion} and ${MQ.finePointer} and ${MQ.desktop}`, () => {
        const chart = ref.current?.querySelector<HTMLElement>('.hero__chart-inner')
        if (!chart) return
        const xTo = gsap.quickTo(chart, 'x', { duration: 1.6, ease: 'power3.out' })
        const yTo = gsap.quickTo(chart, 'y', { duration: 1.6, ease: 'power3.out' })
        const move = (e: PointerEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * -26)
          yTo((e.clientY / window.innerHeight - 0.5) * -20)
        }
        window.addEventListener('pointermove', move)
        return () => window.removeEventListener('pointermove', move)
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="inicio" className="hero" data-theme="dark" aria-label="Início">
      <div className="hero__sky" aria-hidden="true">
        <Starfield seed={11} count={72} sparkles={6} />
      </div>
      <div className="hero__chart" aria-hidden="true">
        <div className="hero__chart-inner">
          <CelestialChart />
        </div>
      </div>

      <div className="hero__inner container">
        <p className="hero__coords eyebrow">
          <span>{profile.coordinates}</span>
          <span className="hero__coords-sep" aria-hidden="true" />
          <span>
            {profile.city}, {profile.state}
          </span>
        </p>

        <h1 className="hero__name" aria-label={profile.name}>
          <span className="hero__mask" aria-hidden="true">
            <span className="hero__word hero__word--first">Bianca</span>
          </span>
          <span className="hero__mask hero__mask--second" aria-hidden="true">
            <span className="hero__word hero__word--second">Oliveira</span>
          </span>
          <BrandStar size="0.2em" className="hero__name-star" />
        </h1>

        <div className="hero__bottom">
          <p className="hero__role">
            {profile.area} <span aria-hidden="true">·</span> {profile.school}
          </p>
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__actions">
            <ButtonLink href="#akron">Conhecer os projetos</ButtonLink>
            <ButtonLink href={profile.github.url} variant="ghost" external icon={<GithubMark size={15} />}>
              GitHub
            </ButtonLink>
          </div>
        </div>

        <a
          href="#sobre"
          className="hero__scroll"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('#sobre')
          }}
        >
          <span className="hero__scroll-track" aria-hidden="true">
            <span className="hero__scroll-star">
              <BrandStar size={9} />
            </span>
          </span>
          <span className="hero__scroll-label">Rolar</span>
          <ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" className="hero__scroll-arrow" />
        </a>
      </div>
    </section>
  )
}
