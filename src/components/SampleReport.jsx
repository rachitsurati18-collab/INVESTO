import { FORT, SAMPLE_REPORT as R } from '../data.js'
import { Reveal, useCountUp, useInView } from '../hooks.jsx'
import { LineChart, makeSeries } from './Charts.jsx'
import Icon from './Icon.jsx'

const price = makeSeries(120, 700, 0.0016, 0.03, 3)
const inr = (n) => `₹${n.toLocaleString('en-IN')}`

function ScoreBar({ s, start }) {
  const n = useCountUp(s.value, start)
  return (
    <div className={`score tone-${s.color}`}>
      <div className="score-top">
        <span>
          <b>{s.key}</b> {s.name}
        </span>
        <strong>{n}</strong>
      </div>
      <div className="score-track">
        <span style={{ width: start ? `${s.value}%` : 0 }} />
      </div>
    </div>
  )
}

export default function SampleReport() {
  const scores = FORT.map((f) => ({ key: f.key, name: f.name, value: R.scores[f.key], color: f.color }))
  const composite = Math.round(scores.reduce((a, s) => a + s.value, 0) / scores.length)
  const [ref, inView] = useInView(0.15)
  const compositeN = useCountUp(composite, inView)

  return (
    <section id="report" className="section section-navy">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Sample Research Report</span>
          <h2>What you receive for every stock</h2>
          <p>
            Each report scores the company on all four walls and clearly sets out the risk rating, holding period,
            suggested allocation, entry zone, and review and exit conditions.
          </p>
        </Reveal>

        <Reveal className="report">
          <div className="report-warning">
            <Icon name="alert" size={18} />
            <span>
              <b>Sample only.</b> The company, scores, prices and all figures below are hypothetical and shown only to
              explain our report format. This is not a recommendation to buy or sell any security.
            </span>
          </div>

          <div className="report-head" ref={ref}>
            <div>
              <span className="tag">Hypothetical company</span>
              <h3>{R.company}</h3>
              <span className="muted">{R.sector} · NSE / BSE · FORT Research Report</span>
            </div>
            <div className="composite">
              <span>FORT score</span>
              <strong>
                {compositeN}
                <small>/100</small>
              </strong>
            </div>
          </div>

          <div className="report-grid">
            <div className="tile scores">
              <h4>FORT scores</h4>
              {scores.map((s) => (
                <ScoreBar key={s.key} s={s} start={inView} />
              ))}
            </div>
            <div className="tile">
              <div className="tile-head">
                <h4>Price chart with entry and target zones</h4>
                <span className="tag">Hypothetical data</span>
              </div>
              <LineChart
                data={price}
                color="var(--cyan)"
                bands={[
                  { label: `Entry zone ${inr(R.entry.from)} – ${inr(R.entry.to)}`, from: R.entry.from, to: R.entry.to, tone: 'green' },
                  { label: `Target range ${inr(R.target.from)} – ${inr(R.target.to)}`, from: R.target.from, to: R.target.to, tone: 'gold' },
                ]}
              />
            </div>
          </div>

          <div className="kpi-row">
            <div className="kpi">
              <span>Risk rating</span>
              <strong>{R.risk}</strong>
              <div className="risk-meter">
                {['Low', 'Moderate', 'High'].map((l) => (
                  <i key={l} className={l === R.risk ? 'on' : ''} title={l} />
                ))}
              </div>
            </div>
            <div className="kpi">
              <span>Investment horizon</span>
              <strong>{R.horizon}</strong>
            </div>
            <div className="kpi">
              <span>Suggested allocation</span>
              <strong>{R.allocation}</strong>
            </div>
            <div className="kpi">
              <span>Entry zone</span>
              <strong>
                {inr(R.entry.from)} – {inr(R.entry.to)}
              </strong>
            </div>
          </div>

          <div className="conditions">
            <div className="tile">
              <h4>
                <Icon name="refresh" size={18} /> Review conditions
              </h4>
              <ul>
                {R.review.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="tile is-exit">
              <h4>
                <Icon name="x" size={18} /> Exit conditions
              </h4>
              <ul>
                {R.exit.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
