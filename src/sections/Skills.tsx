import { skillGroups } from '../data/skills'
import { SectionIntro } from '../components/SectionIntro'
import { Starfield } from '../components/Starfield'
import { TechIcon } from '../components/TechIcon'
import { pad } from '../utils/format'

export function Skills() {
  let counter = 0
  return (
    <section id="habilidades" className="skills" data-theme="dark" aria-labelledby="habilidades-titulo">
      <Starfield seed={5} count={44} sparkles={3} className="starfield--dim" />
      <div className="container skills__grid">
        <div className="skills__aside">
          <SectionIntro
            id="habilidades"
            number="02"
            eyebrow="Habilidades e tecnologias"
            title={
              <>
                O que eu uso, <em>e onde.</em>
              </>
            }
          />
          <p className="skills__intro" data-reveal="up">
            Cada tecnologia aponta para o lugar em que aparece: repositórios, o TCC ou cursos. Sem porcentagens nem
            níveis inventados — o que está aqui dá para conferir.
          </p>
          <p className="skills__legend" aria-hidden="true" data-reveal="up">
            <span>Nº</span>
            <span>Tecnologia</span>
            <span>Onde aparece</span>
          </p>
        </div>

        <div className="skills__catalog">
          {skillGroups.map((group) => (
            <div key={group.id} className="skills__group" role="group" aria-labelledby={`skills-${group.id}`}>
              <h3 id={`skills-${group.id}`} className="skills__group-title" data-reveal="up">
                {group.title}
              </h3>
              {group.note ? (
                <p className="skills__note" data-reveal="up">
                  {group.note}
                </p>
              ) : null}
              <ul className="skills__list">
                {group.items.map((item) => {
                  counter += 1
                  return (
                    <li key={item.name} className="skill" data-reveal="up">
                      <span className="skill__num" aria-hidden="true">
                        {pad(counter)}
                      </span>
                      <span className="skill__icons">
                        {item.icons.map((icon) => (
                          <TechIcon key={icon} name={icon} size={20} />
                        ))}
                      </span>
                      <span className="skill__name">{item.name}</span>
                      <span className="skill__where">{item.where}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
