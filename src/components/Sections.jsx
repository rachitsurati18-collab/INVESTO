import { DELIVERABLES, EXPECT, ONBOARDING } from '../data.js'
import { Reveal, useScrollProgress, useTilt } from '../hooks.jsx'
import Icon from './Icon.jsx'

function DelivCard({ d, i }) {
  const ref = useTilt(4.8)
  return (
    <Reveal delay={i * 80} className="deliv-wrap">
      <div ref={ref} className="deliv card tilt">
        <span className="icon-chip">
          <Icon name={d.icon} size={22} />
        </span>
        <h3>{d.title}</h3>
        <p>{d.text}</p>
      </div>
    </Reveal>
  )
}

export function Deliverables() {
  return (
    <section id="deliverables" className="section section-soft">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Research Deliverables</span>
          <h2>What you get as a client</h2>
          <p>Our research doesn't stop at the first report. Every company we cover is tracked against its thesis.</p>
        </Reveal>
        <div className="deliv-grid">
          {DELIVERABLES.map((d, i) => (
            <DelivCard key={d.title} d={d} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function Expectations() {
  return (
    <section id="expectations" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Client Expectations</span>
          <h2>Clear about what we do, and what we don't</h2>
        </Reveal>

        <div className="expect-grid">
          <Reveal className="expect card is-yes">
            <h3>
              <span className="icon-chip">
                <Icon name="check" />
              </span>
              What you can expect
            </h3>
            <ul>
              {EXPECT.can.map((t) => (
                <li key={t}>
                  <Icon name="check" size={16} /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="expect card is-no">
            <h3>
              <span className="icon-chip">
                <Icon name="x" />
              </span>
              What we do not offer
            </h3>
            <ul>
              {EXPECT.cannot.map((t) => (
                <li key={t}>
                  <Icon name="x" size={16} /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="notice">
          <Icon name="scale" size={26} />
          <p>
            <b>We provide research and analysis only.</b> Returns are not guaranteed. We do not manage your money or
            operate your trading account. Every investment decision and every trade remains entirely under your
            control.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function Onboarding() {
  const ref = useScrollProgress()
  return (
    <section id="join" className="section section-navy">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">How to Join</span>
          <h2>Get started in five simple steps</h2>
          <p>A simple, SEBI-compliant process. Every step is completed through official channels only.</p>
        </Reveal>
        <ol ref={ref} className="steps">
          <span className="steps-line">
            <span />
          </span>
          {ONBOARDING.map((s, i) => (
            <li key={s.title} className="step" style={{ '--i': i }}>
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Grievances() {
  const tiers = [
    {
      n: '1',
      title: 'Contact our grievance officer',
      text: 'Write to our grievance officer with your details. We will acknowledge your complaint and work to resolve it promptly.',
      href: '#contact',
      cta: 'View grievance contact',
    },
    {
      n: '2',
      title: 'SEBI SCORES',
      text: "If your complaint is not resolved, lodge it on SEBI's online SCORES platform, which tracks it until closure.",
      href: 'https://scores.sebi.gov.in',
      cta: 'scores.sebi.gov.in',
      external: true,
    },
    {
      n: '3',
      title: 'SMART ODR portal',
      text: 'If you are still not satisfied, you can opt for online conciliation and arbitration through the SMART ODR portal.',
      href: 'https://smartodr.in',
      cta: 'smartodr.in',
      external: true,
    },
  ]
  return (
    <section id="grievances" className="section section-soft">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Complaints & Grievances</span>
          <h2>A clear path to resolution</h2>
        </Reveal>
        <div className="griev-grid">
          {tiers.map((t, i) => (
            <Reveal key={t.n} delay={i * 100} className="griev card">
              <span className="griev-n">{t.n}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <a href={t.href} className="link" {...(t.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                {t.cta} <Icon name={t.external ? 'external' : 'arrow'} size={14} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
