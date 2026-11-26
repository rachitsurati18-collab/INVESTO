import { FORT } from '../data.js'
import { useCountUp, useInView, useScrollProgress, useTilt } from '../hooks.jsx'
import Icon from './Icon.jsx'

/* Decorative animated candlesticks in the hero background (not market data). */
const CANDLES = Array.from({ length: 28 }, (_, i) => {
  const base = 60 + i * 4 + Math.sin(i * 1.3) * 18
  const up = Math.sin(i * 2.1) > -0.35
  return { x: i * 52 + 10, y: 300 - base, h: 18 + Math.abs(Math.cos(i * 1.7)) * 34, up }
})
function Candles() {
  return (
    <svg className="candles" viewBox="0 0 1460 320" preserveAspectRatio="none" aria-hidden="true">
      {CANDLES.map((c, i) => (
        <g key={i} className={c.up ? 'up' : 'down'} style={{ '--i': i }}>
          <line x1={c.x + 9} x2={c.x + 9} y1={c.y - 14} y2={c.y + c.h + 14} />
          <rect x={c.x} y={c.y} width="18" height={c.h} rx="2" />
        </g>
      ))}
    </svg>
  )
}

const STATS = [
  { value: 4, label: 'Research walls' },
  { value: 24, label: 'Parameters checked' },
  { value: 3, label: 'Research services' },
  { value: 5, label: 'Simple steps to join' },
]

const TOWER_HEIGHTS = [48, 62, 76, 92]

function Stat({ value, label, start }) {
  const n = useCountUp(value, start)
  return (
    <div className="hero-stat">
      <strong>{n}</strong>
      <span>{label}</span>
    </div>
  )
}

export default function Hero({ active, onSelect }) {
  const [statsRef, statsIn] = useInView(0)
  const sectionRef = useScrollProgress('exit')
  const cardRef = useTilt(5.6)
  const current = FORT.find((f) => f.key === active)

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <Candles />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="pill">
            <Icon name="shield" size={16} /> SEBI-Registered Research Analyst
          </span>
          <h1>
            Every stock must pass <span className="hl">four walls.</span>
          </h1>
          <p className="lead">
            Investo Research studies every company through the FORT framework: <b>Fundamental</b>, <b>Overview</b>,{' '}
            <b>Risk</b> and <b>Trigger</b>. Only businesses that clear all four walls make it to our research list for
            Indian investors.
          </p>
          <div className="hero-actions">
            <a href="#services" className="btn btn-gold">
              Explore services <Icon name="arrow" size={18} />
            </a>
            <a href="#framework" className="btn btn-outline-light">
              How we research
            </a>
          </div>
          <div ref={statsRef} className="hero-stats">
            {STATS.map((s) => (
              <Stat key={s.label} {...s} start={statsIn} />
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div ref={cardRef} className="fort-card">
            <div className="fort-card-head">
              <span>FORT research checklist</span>
              <span className="muted-light">Select a wall</span>
            </div>

            <div className="towers">
              <svg className="towers-line" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,180 C60,170 80,150 120,140 S190,120 220,95 S300,70 330,40 S380,20 400,10" pathLength="1" />
              </svg>
              {FORT.map((f, i) => (
                <button
                  key={f.key}
                  className={`tower ${active === f.key ? 'is-active' : ''}`}
                  style={{ '--h': `${TOWER_HEIGHTS[i]}%`, '--i': i }}
                  onClick={() => onSelect(f.key)}
                  aria-pressed={active === f.key}
                  aria-label={`${f.name} wall`}
                >
                  <span className="tower-letter">{f.key}</span>
                </button>
              ))}
            </div>
            <div className="tower-labels">
              {FORT.map((f) => (
                <span key={f.key} className={active === f.key ? 'is-active' : ''}>
                  {f.name}
                </span>
              ))}
            </div>

            <div className="fort-card-detail" key={current.key}>
              <span className={`badge tone-${current.color}`}>{current.key}</span>
              <div>
                <strong>{current.question}</strong>
                <a href="#framework" className="link-light">
                  View all 6 parameters <Icon name="arrow" size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
