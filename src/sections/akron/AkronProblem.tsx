import { akron } from '../../data/akron'
import { pad } from '../../utils/format'

export function AkronProblem() {
  const { problem } = akron
  return (
    <div className="ak-band ak-band--light ak-problem" data-theme="light">
      <div className="container">
        <div className="ak-problem__head">
          <h3 className="ak-kicker" data-reveal="up">
            O problema
          </h3>
          <p className="ak-problem__lead" data-reveal="lines">
            {problem.lead}
          </p>
        </div>

        <figure className="ak-quote">
          <blockquote>
            <p data-reveal="lines">“{problem.quote}”</p>
          </blockquote>
          <figcaption data-reveal="up">— {problem.quoteSource}</figcaption>
        </figure>

        <ol className="ak-gaps">
          {problem.gaps.map((gap, i) => (
            <li key={gap.title} className="ak-gap" data-reveal="up">
              <span className="ak-gap__num">{pad(i + 1)}</span>
              <h4 className="ak-gap__title">{gap.title}</h4>
              <p>{gap.text}</p>
            </li>
          ))}
        </ol>

        <div className="ak-goal">
          <div data-reveal="up">
            <h3 className="ak-kicker">Objetivo</h3>
            <p>{akron.objective}</p>
          </div>
          <div data-reveal="up">
            <h3 className="ak-kicker">Solução</h3>
            <p>{akron.solution}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
