import { ArrowUpRight } from 'lucide-react'
import { akron } from '../../data/akron'
import { BrandStar } from '../../components/Star'
import { AkronSymbol } from '../../components/AkronLogo'

/** Separa com clareza o que foi responsabilidade da Bianca e o que foi trabalho da equipe. */
export function AkronRole() {
  const { role } = akron
  return (
    <div className="ak-band ak-band--paper ak-role" data-theme="light">
      <div className="container ak-role__grid">
        <div className="ak-role__mine">
          <h3 className="ak-kicker" data-reveal="up">
            Minha parte no projeto
          </h3>
          <ol className="ak-role__list">
            {role.items.map((item) => (
              <li key={item.title} data-reveal="up">
                <BrandStar size={14} className="ak-role__star" />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="ak-role__source" data-reveal="up">
            {role.source}{' '}
            <a href={role.repo.href} target="_blank" rel="noopener noreferrer">
              {role.repo.label}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </p>
        </div>

        <div className="ak-role__team">
          <h3 className="ak-kicker" data-reveal="up">
            Equipe Athenas
          </h3>
          <ul className="ak-team">
            {akron.teamMembers.map((m) => (
              <li key={m.name} className={m.me ? 'is-me' : undefined} data-reveal="up">
                <span className="ak-team__name">
                  {m.name}
                  {m.me ? <span className="ak-team__me">eu</span> : null}
                </span>
                <span className="ak-team__role">{m.role}</span>
              </li>
            ))}
          </ul>
          <p className="ak-role__advisors" data-reveal="up">
            {akron.advisors}
          </p>
        </div>

        <p className="ak-role__limits" data-reveal="up">
          {akron.limits}
        </p>

        <nav className="ak-links" aria-label="Links do Ákron">
          <AkronSymbol className="ak-links__symbol" />
          <ul>
            {akron.links.map((link) => (
              <li key={link.href} data-reveal="up">
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="ak-link">
                  <span className="ak-link__label">{link.label}</span>
                  <span className="ak-link__sub">{link.sub}</span>
                  <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" className="ak-link__arrow" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
