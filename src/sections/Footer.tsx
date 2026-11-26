import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { contactLinks, profile } from '../data/profile'
import { useScrollTo } from '../animations/SmoothScroll'
import { Monogram } from '../components/Monogram'

export function Footer() {
  const scrollTo = useScrollTo()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <a
          href="#inicio"
          className="site-footer__brand"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('#inicio')
          }}
        >
          <Monogram />
          <span>{profile.name}</span>
        </a>

        <ul className="site-footer__links">
          {contactLinks().map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {link.label}
                <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden="true" />
                {link.href.startsWith('mailto:') ? null : <span className="sr-only"> (abre em nova aba)</span>}
              </a>
            </li>
          ))}
        </ul>

        <p className="site-footer__copy" suppressHydrationWarning>
          © {year} {profile.name} · {profile.area}
        </p>

        <button type="button" className="site-footer__top" onClick={() => scrollTo('#inicio')}>
          Voltar ao topo
          <ArrowUp size={15} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}
