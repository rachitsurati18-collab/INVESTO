import { FORT, SERVICES } from '../data.js'
import { Reveal } from '../hooks.jsx'
import Icon from './Icon.jsx'

/* Simple illustrations for each service (concept only — no performance figures). */
function AlphaShiftVisual({ items }) {
  return (
    <div className="sv sv-etf">
      <span className="sv-title">ETF categories we research</span>
      {items.map((label, i) => (
        <div key={label} className="sv-etf-row" style={{ '--i': i }}>
          <span>{label}</span>
          <i />
        </div>
      ))}
      <span className="sv-note">
        <Icon name="refresh" size={14} /> Shift alerts when allocation should change
      </span>
    </div>
  )
}

function EdgeVisual() {
  const steps = ['Listed companies on NSE & BSE', ...FORT.map((f) => `Pass ${f.name}`), 'Edge research list']
  return (
    <div className="sv sv-funnel">
      <span className="sv-title">How an Edge idea is selected</span>
      {steps.map((s, i) => (
        <div key={s} className="sv-funnel-row" style={{ '--w': `${100 - i * 13}%`, '--i': i }}>
          {s}
        </div>
      ))}
    </div>
  )
}

function SankalpVisual() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return (
    <div className="sv sv-sip">
      <span className="sv-title">Monthly Stock SIP, one step at a time</span>
      <div className="sv-sip-bars">
        {months.map((m, i) => (
          <div key={m} className="sv-sip-col" style={{ '--h': `${((i + 1) / 12) * 100}%`, '--i': i }}>
            <i />
            <span>{m.slice(0, 1)}</span>
          </div>
        ))}
      </div>
      <span className="sv-note">
        <Icon name="check" size={14} /> Fixed amount every month, invested via your own demat account
      </span>
    </div>
  )
}

function ServiceCard({ s, i, onEnquire }) {
  return (
    <article className={`service tone-${s.color}`} style={{ '--i': i }}>
      <div className="service-body">
        <span className="service-num">0{i + 1}</span>
        <span className="eyebrow">{s.tag}</span>
        <h3>{s.name}</h3>
        <p>{s.text}</p>
        <ul className="check-list">
          {s.features.map((f) => (
            <li key={f}>
              <Icon name="check" size={16} /> {f}
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn-navy" onClick={() => onEnquire(s.name)}>
          Enquire about {s.name} <Icon name="arrow" size={16} />
        </a>
      </div>
      <div className="service-visual">
        {s.id === 'alphashift' && <AlphaShiftVisual items={s.visual} />}
        {s.id === 'edge' && <EdgeVisual />}
        {s.id === 'sankalp' && <SankalpVisual />}
      </div>
    </article>
  )
}

export default function Services({ onEnquire }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Our Services</span>
          <h2>Three ways to invest with research</h2>
          <p>
            ETFs, multibagger stocks or a monthly Stock SIP. Choose the research service that suits your goals. We
            provide the research; you invest through your own broker and demat account.
          </p>
        </Reveal>
        <div className="service-stack">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} onEnquire={onEnquire} />
          ))}
        </div>
      </div>
    </section>
  )
}
