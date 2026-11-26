import { useState } from 'react'
import { FIRM, SERVICES } from '../data.js'
import { Reveal } from '../hooks.jsx'
import Icon from './Icon.jsx'

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

function CopyRow({ icon, label, value, href }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    if (await copyText(value)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }
  return (
    <div className="copy-row">
      <span className="icon-chip">
        <Icon name={icon} size={18} />
      </span>
      <div className="copy-text">
        <span>{label}</span>
        {href ? <a href={href}>{value}</a> : <strong>{value}</strong>}
      </div>
      <button className={`copy-btn ${copied ? 'is-copied' : ''}`} onClick={onCopy} aria-label={`Copy ${label}`}>
        <Icon name={copied ? 'check' : 'copy'} size={16} />
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  )
}

export default function Contact({ service, onService }) {
  const subject = encodeURIComponent(`Enquiry: ${service || 'Investo Research services'}`)
  const body = encodeURIComponent(
    `Hello Investo Research team,\n\nI would like to know more about ${service || 'your research services'}.\n\nName:\nPhone:\nCity:\n`,
  )

  return (
    <section id="contact" className="section section-soft">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Contact & Regulatory Information</span>
          <h2>Talk to our research team</h2>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-card card">
            <h3>Get in touch</h3>
            <CopyRow icon="mail" label="Email" value={FIRM.email} href={`mailto:${FIRM.email}`} />
            <CopyRow icon="phone" label="Phone" value={FIRM.phone} href={`tel:${FIRM.phone.replace(/\s/g, '')}`} />
            <CopyRow icon="clock" label="Working hours" value={FIRM.hours} />

            <div className="enquiry">
              <span className="muted">I'm interested in</span>
              <div className="chips">
                {SERVICES.map((s) => (
                  <button
                    key={s.name}
                    className={`chip tone-${s.color} ${service === s.name ? 'is-active' : ''}`}
                    onClick={() => onService(service === s.name ? '' : s.name)}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <a className="btn btn-gold" href={`mailto:${FIRM.email}?subject=${subject}&body=${body}`}>
                <Icon name="mail" size={18} /> Send enquiry{service ? ` for ${service}` : ''}
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="contact-card card">
            <h3>Regulatory information</h3>
            <CopyRow icon="building" label="Registered name" value={FIRM.registeredName} />
            <CopyRow icon="badge" label="SEBI Research Analyst Reg. No." value={FIRM.sebiReg} />
            <CopyRow icon="shield" label="BSE Enlistment No." value={FIRM.bseEnlistment} />
            <CopyRow icon="building" label="Registered office" value={FIRM.office} />
            <CopyRow icon="user" label="Compliance officer" value={FIRM.complianceOfficer} />
            <CopyRow icon="alert" label="Grievance contact" value={FIRM.grievance} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
