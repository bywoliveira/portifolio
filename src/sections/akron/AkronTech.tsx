import { akron } from '../../data/akron'

/** Arquitetura em camadas, tecnologias por frente e o hardware usado. */
export function AkronTech() {
  const { hardware } = akron
  return (
    <div className="ak-band ak-band--light ak-tech" data-theme="light">
      <div className="container ak-tech__grid">
        <div className="ak-tech__arch">
          <h3 className="ak-kicker" data-reveal="up">
            Arquitetura em camadas
          </h3>
          <ol className="ak-layers">
            {akron.architecture.map((layer) => (
              <li key={layer.n} className="ak-layer" data-reveal="up">
                <span className="ak-layer__n">{layer.n}</span>
                <span className="ak-layer__title">{layer.title}</span>
                <span className="ak-layer__text">{layer.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="ak-tech__side">
          <h3 className="ak-kicker" data-reveal="up">
            Tecnologias
          </h3>
          <dl className="ak-stack">
            {akron.stack.map((s) => (
              <div key={s.layer} data-reveal="up">
                <dt>{s.layer}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>

          <div className="ak-hardware" data-reveal="up">
            <h3 className="ak-kicker">Hardware</h3>
            <p className="ak-hardware__board">{hardware.board}</p>
            <ul className="ak-hardware__sensors">
              {hardware.sensors.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}</strong> {s.reads}
                </li>
              ))}
            </ul>
            <ul className="ak-hardware__notes">
              {hardware.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p className="ak-hardware__honesty">{hardware.honesty}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
