import { useEffect, useMemo, useState } from 'react'
import { STAR_PATH } from './Star'

/** Gerador pseudoaleatório com semente: o céu é sempre o mesmo a cada carregamento. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface StarfieldProps {
  seed?: number
  /** Quantidade de pontos */
  count?: number
  /** Quantidade de pequenas estrelas de quatro pontas */
  sparkles?: number
  className?: string
}

/** Campo de estrelas decorativo (SVG leve, sem canvas). Algumas cintilam devagar via CSS. */
export function Starfield({ seed = 7, count = 70, sparkles = 5, className = '' }: StarfieldProps) {
  // Decorativo: só entra depois da hidratação, para deixar o HTML inicial mais leve.
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  const { dots, stars } = useMemo(() => {
    const rand = mulberry32(seed)
    const dots = Array.from({ length: count }, (_, i) => ({
      x: rand() * 1600,
      y: rand() * 1000,
      r: 0.45 + Math.pow(rand(), 3) * 1.25,
      o: 0.25 + rand() * 0.6,
      twinkle: i % 9 === 0,
      delay: (rand() * 6).toFixed(2),
    }))
    const stars = Array.from({ length: sparkles }, () => ({
      x: 80 + rand() * 1440,
      y: 60 + rand() * 880,
      s: 0.06 + rand() * 0.09,
      o: 0.45 + rand() * 0.4,
      delay: (rand() * 6).toFixed(2),
    }))
    return { dots, stars }
  }, [seed, count, sparkles])

  if (!ready) return null
  return (
    <svg
      className={`starfield ${className}`}
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x.toFixed(1)}
          cy={d.y.toFixed(1)}
          r={d.r.toFixed(2)}
          opacity={d.o.toFixed(2)}
          className={d.twinkle ? 'twinkle' : undefined}
          style={d.twinkle ? { animationDelay: `${d.delay}s` } : undefined}
        />
      ))}
      {stars.map((s, i) => (
        <path
          key={`s${i}`}
          d={STAR_PATH}
          transform={`translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) scale(${s.s.toFixed(3)})`}
          opacity={s.o.toFixed(2)}
          className="twinkle"
          style={{ animationDelay: `${s.delay}s` }}
        />
      ))}
    </svg>
  )
}
