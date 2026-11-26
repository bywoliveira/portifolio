import { ArrowUpRight, MapPin } from 'lucide-react'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { pad } from '../utils/format'
import { SectionIntro } from '../components/SectionIntro'
import { ButtonLink } from '../components/Button'
import { GithubMark } from '../components/TechIcon'
import { Starfield } from '../components/Starfield'

export function GitHubSection() {
  return (
    <section id="github" className="gh" data-theme="dark" aria-labelledby="github-titulo">
      <Starfield seed={41} count={36} sparkles={2} className="starfield--dim" />
      <div className="container">
        <div className="gh__head">
          <SectionIntro
            id="github"
            number="05"
            eyebrow="GitHub e outros projetos"
            title={
              <>
                Estudos e projetos, <em>versionados.</em>
              </>
            }
          />
          <div className="gh__profile" data-reveal="up">
            <a className="gh__handle" href={profile.github.url} target="_blank" rel="noopener noreferrer">
              <GithubMark size={22} />
              <span>@{profile.github.user}</span>
              <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <p className="gh__bio">“{profile.github.bio}”</p>
            <p className="gh__place">
              <MapPin size={14} strokeWidth={1.5} aria-hidden="true" /> {profile.city}, São Paulo
            </p>
          </div>
        </div>

        <ol className="repo-list">
          {projects.map((p, i) => (
            <li key={p.name} className="repo" data-reveal="up">
              <span className="repo__num" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3 className="repo__name">
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="repo__link">
                  {p.name}
                  <span className="sr-only"> (repositório no GitHub, abre em nova aba)</span>
                </a>
              </h3>
              <p className="repo__desc">{p.description}</p>
              <p className="repo__stack">{p.stack.join(' · ')}</p>
              <ArrowUpRight size={22} strokeWidth={1.3} aria-hidden="true" className="repo__arrow" />
            </li>
          ))}
        </ol>

        <div className="gh__more" data-reveal="up">
          <p>O Ákron, projeto principal, está nos repositórios da equipe, citados no estudo de caso acima.</p>
          <ButtonLink href={profile.github.url} variant="ghost" external icon={<GithubMark size={15} />}>
            Ver perfil completo
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
