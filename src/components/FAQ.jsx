import { useState } from 'react'
import { FAQS } from '../data.js'
import { Reveal } from '../hooks.jsx'
import Icon from './Icon.jsx'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="section">
      <div className="container faq-layout">
        <Reveal className="section-head left">
          <span className="eyebrow">FAQ</span>
          <h2>Frequently asked questions</h2>
          <p>Still unsure about something? Our team is happy to explain our process before you sign up.</p>
          <a href="#contact" className="btn btn-outline">
            Ask us directly <Icon name="arrow" size={16} />
          </a>
        </Reveal>
        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 60} className={`faq card ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <span className="faq-icon">
                    <Icon name="plus" size={18} />
                  </span>
                </button>
                <div id={`faq-${i}`} className="faq-a" role="region">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
