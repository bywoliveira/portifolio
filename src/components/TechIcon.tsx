import type { ComponentType, SVGProps } from 'react'
import {
  siAngular,
  siBootstrap,
  siCss,
  siDart,
  siEspressif,
  siFigma,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siPhp,
  siSqlite,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons'
import { Braces, Cpu, Layers, Lightbulb, Workflow } from 'lucide-react'

/** Ícones oficiais (Simple Icons) e ícones conceituais (Lucide) disponíveis para as habilidades. */
const BRANDS = {
  php: siPhp,
  laravel: siLaravel,
  mysql: siMysql,
  sqlite: siSqlite,
  html: siHtml5,
  css: siCss,
  javascript: siJavascript,
  typescript: siTypescript,
  angular: siAngular,
  bootstrap: siBootstrap,
  flutter: siFlutter,
  dart: siDart,
  espressif: siEspressif,
  git: siGit,
  github: siGithub,
  figma: siFigma,
} satisfies Record<string, SimpleIcon>

const GLYPHS = {
  api: Braces,
  layers: Layers,
  cpu: Cpu,
  workflow: Workflow,
  lightbulb: Lightbulb,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>

export type IconKey = keyof typeof BRANDS | keyof typeof GLYPHS

export function TechIcon({ name, size = 22 }: { name: IconKey; size?: number }) {
  if (name in BRANDS) {
    const icon = BRANDS[name as keyof typeof BRANDS]
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" className="tech-icon">
        <path d={icon.path} fill="currentColor" />
      </svg>
    )
  }
  const Glyph = GLYPHS[name as keyof typeof GLYPHS]
  return <Glyph width={size} height={size} strokeWidth={1.5} aria-hidden="true" className="tech-icon" />
}

/** Marca do GitHub (a biblioteca Lucide não traz mais ícones de marcas). */
export function GithubMark({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path d={siGithub.path} fill="currentColor" />
    </svg>
  )
}
