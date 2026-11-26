import { forwardRef, useMemo } from 'react'
import { STAR_PATH } from './Star'

const C = 400 // centro do desenho

function ellipsePath(rx: number, ry: number) {
  return `M ${C - rx} ${C} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`
}

/** Pontos da constelação (coordenadas do desenho 800×800). */
export const CONSTELLATION = [
  { x: 214, y: 534, r: 2.4 },
  { x: 296, y: 458, r: 3.1 },
  { x: 372, y: 486, r: 2.2 },
  { x: 452, y: 376, r: 3.6 },
  { x: 556, y: 410, r: 2.6 },
  { x: 470, y: 262, r: 2.3 },
]
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [3, 5],
]

/**
 * Carta celeste autoral do topo: anel graduado com os pontos cardeais em português,
 * órbitas inclinadas, uma constelação mínima e a estrela de assinatura.
 * As classes `chart-*` são usadas pela animação de entrada no Hero.
 */
export const CelestialChart = forwardRef<SVGSVGElement>(function CelestialChart(_, ref) {
  const ticks = useMemo(() => {
    let d = ''
    for (let a = 0; a < 360; a += 3) {
      const rad = (a * Math.PI) / 180
      const inner = a % 30 === 0 ? 306 : a % 15 === 0 ? 316 : 322
      const x1 = C + Math.cos(rad) * inner
      const y1 = C + Math.sin(rad) * inner
      const x2 = C + Math.cos(rad) * 330
      const y2 = C + Math.sin(rad) * 330
      d += `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`
    }
    return d
  }, [])

  return (
    <svg ref={ref} className="celestial-chart" viewBox="0 0 800 800" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="chart-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A9C7FF" stopOpacity="0.28" />
          <stop offset="45%" stopColor="#4169E1" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#4169E1" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* anel graduado */}
      <g className="chart-ring">
        <circle cx={C} cy={C} r={330} className="chart-line" pathLength={1} />
        <path d={ticks} className="chart-ticks" />
        <circle cx={C} cy={C} r={226} className="chart-line chart-line--dashed" />
        <line x1={C} y1={30} x2={C} y2={770} className="chart-line chart-line--faint" />
        <line x1={30} y1={C} x2={770} y2={C} className="chart-line chart-line--faint" />
        <text x={C} y={88} className="chart-label">N</text>
        <text x={720} y={C + 5} className="chart-label">L</text>
        <text x={C} y={724} className="chart-label">S</text>
        <text x={80} y={C + 5} className="chart-label">O</text>
      </g>

      {/* órbitas */}
      <g transform={`rotate(-22 ${C} ${C})`}>
        <path id="orbit-a" d={ellipsePath(392, 128)} className="chart-orbit" pathLength={1} />
        <circle r={5} className="chart-planet" cx={C - 392} cy={C} />
      </g>
      <g transform={`rotate(36 ${C} ${C})`}>
        <path d={ellipsePath(300, 92)} className="chart-orbit chart-orbit--soft" pathLength={1} />
      </g>

      {/* constelação */}
      <g className="chart-constellation">
        {LINKS.map(([a, b], i) => (
          <line
            key={i}
            x1={CONSTELLATION[a].x}
            y1={CONSTELLATION[a].y}
            x2={CONSTELLATION[b].x}
            y2={CONSTELLATION[b].y}
            className="chart-link"
            pathLength={1}
          />
        ))}
        {CONSTELLATION.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} className="chart-dot" />
        ))}
      </g>

      {/* estrela de assinatura */}
      <g className="chart-signature" transform="translate(586 238)">
        <circle r={120} fill="url(#chart-glow)" />
        <path d={STAR_PATH} transform="rotate(-8) scale(1.3)" className="chart-star" />
      </g>
    </svg>
  )
})
