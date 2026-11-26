import { profile } from '../data/profile'
import { asset } from '../utils/asset'
import { SectionIntro } from '../components/SectionIntro'
import { Horizon } from '../components/Horizon'
import { BrandStar, STAR_PATH } from '../components/Star'

/** Composição gráfica usada no lugar da foto, caso `profile.photo` seja `null`. */
function Emblem() {
  return (
    <svg className="about__emblem" viewBox="0 0 400 500" aria-hidden="true" focusable="false">
      <ellipse cx="200" cy="250" rx="180" ry="62" transform="rotate(-24 200 250)" className="about__emblem-orbit" />
      <ellipse cx="200" cy="250" rx="140" ry="190" className="about__emblem-orbit about__emblem-orbit--soft" />
      <path d={STAR_PATH} transform="translate(200 250) rotate(-8) scale(1.6)" className="about__emblem-star" />
    </svg>
  )
}

export function About() {
  const photo = profile.photo
  return (
    <section id="sobre" className="about" data-theme="light" aria-labelledby="sobre-titulo">
      <Horizon className="horizon--paper" />
      <div className="container about__grid">
        <div className="about__text">
          <SectionIntro id="sobre" number="01" eyebrow="Sobre mim" title={profile.aboutTitle} />
          <div className="about__body">
            {profile.about.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'about__lead' : undefined} data-reveal="up">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <figure className="about__portrait">
          <svg className="about__orbit" viewBox="0 0 520 640" aria-hidden="true" focusable="false">
            <ellipse cx="260" cy="320" rx="250" ry="88" transform="rotate(-28 260 320)" pathLength={1} data-reveal="draw" />
          </svg>
          <div className="about__frame" data-reveal="clip">
            {photo ? (
              <img
                src={asset(photo.src)}
                srcSet={`${asset(photo.srcSmall)} 560w, ${asset(photo.src)} 900w`}
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 88vw"
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <Emblem />
            )}
          </div>
          <figcaption className="about__caption" data-reveal="up">
            <BrandStar size={10} />
            <span>{profile.fullName}</span>
            <span className="about__caption-place">
              {profile.city}, {profile.state}
            </span>
          </figcaption>
        </figure>

        <dl className="about__facts">
          {profile.facts.map((fact) => (
            <div key={fact.label} className="about__fact" data-reveal="up">
              <dt>{fact.label}</dt>
              <dd>
                {fact.value}
                <span>{fact.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
