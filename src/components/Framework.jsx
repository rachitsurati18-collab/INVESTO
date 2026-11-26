import { FORT } from '../data.js'
import { Reveal } from '../hooks.jsx'
import Icon from './Icon.jsx'

export default function Framework({ active, onSelect }) {
  const idx = FORT.findIndex((f) => f.key === active)
  const current = FORT[idx]

  return (
    <section id="framework" className="section section-soft">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Our Process · The FORT Framework</span>
          <h2>Four walls every stock must pass</h2>
          <p>
            Every company must pass through all four research stages, in order, before it is considered for our stock
            universe. Select a wall to see its parameters, evaluation criteria and passing condition.
          </p>
        </Reveal>

        <Reveal className="fort-tabs" role="tablist" aria-label="FORT categories">
          <span className="fort-track">
            <span style={{ width: `${(idx / (FORT.length - 1)) * 100}%` }} />
          </span>
          {FORT.map((f, i) => (
            <button
              key={f.key}
              role="tab"
              id={`tab-${f.key}`}
              aria-selected={active === f.key}
              aria-controls="fort-panel"
              className={`fort-tab tone-${f.color} ${active === f.key ? 'is-active' : ''} ${i < idx ? 'is-done' : ''}`}
              onClick={() => onSelect(f.key)}
            >
              <span className="fort-tab-letter">{f.key}</span>
              <span className="fort-tab-text">
                <small>Stage {i + 1}</small>
                {f.name}
              </span>
            </button>
          ))}
        </Reveal>

        <div
          id="fort-panel"
          role="tabpanel"
          aria-labelledby={`tab-${current.key}`}
          className={`fort-panel tone-${current.color}`}
          key={current.key}
        >
          <div className="fort-panel-intro">
            <span className="fort-big-letter">{current.key}</span>
            <div>
              <span className="eyebrow">
                Stage {idx + 1} of 4 · {current.name}
              </span>
              <h3>{current.question}</h3>
              <p>{current.summary}</p>
            </div>
          </div>

          <div className="param-grid">
            {current.params.map((p, i) => (
              <div key={p.name} className="param" style={{ '--i': i }}>
                <span className="param-num">{String(i + 1).padStart(2, '0')}</span>
                <h4>{p.name}</h4>
                <p>{p.criteria}</p>
              </div>
            ))}
          </div>

          <div className="pass-box">
            <Icon name="shield" size={22} />
            <div>
              <strong>Passing condition</strong>
              <p>{current.pass}</p>
            </div>
          </div>

          <div className="fort-nav">
            <button className="btn btn-outline btn-sm" disabled={idx === 0} onClick={() => onSelect(FORT[idx - 1].key)}>
              ← {idx > 0 ? FORT[idx - 1].name : 'Start'}
            </button>
            <button
              className="btn btn-outline btn-sm"
              disabled={idx === FORT.length - 1}
              onClick={() => onSelect(FORT[idx + 1].key)}
            >
              {idx < FORT.length - 1 ? FORT[idx + 1].name : 'Universe'} →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
