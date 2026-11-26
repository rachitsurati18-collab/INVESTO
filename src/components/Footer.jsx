import { FIRM, NAV, SERVICES } from '../data.js'
import { Logo } from './Header.jsx'
import './Footer.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo height={52} />
            <p>
              SEBI-registered research for Indian investors. Every idea passes four walls: Fundamental, Overview, Risk
              and Trigger. We provide research. Investment decisions and trading remain under your control.
            </p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            {SERVICES.map((s) => (
              <a key={s.id} href="#services">
                {s.name} <span>· {s.tag}</span>
              </a>
            ))}
          </div>
          <div className="footer-col">
            <h4>Quick links</h4>
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
            <a href="#grievances">Complaints</a>
          </div>
        </div>

        <div className="footer-reg">
          <span>{FIRM.registeredName}</span>
          <span>SEBI RA Reg. No: {FIRM.sebiReg}</span>
          <span>BSE Enlistment No: {FIRM.bseEnlistment}</span>
        </div>

        <p className="disclaimer">
          <strong>Disclaimer:</strong> Investments in the securities market are subject to market risks. Read all
          related documents carefully before investing. Registration granted by SEBI, enlistment with BSE and
          certification from NISM in no way guarantee performance of the intermediary or provide any assurance of
          returns to investors. We do not manage client funds or trading accounts, and we do not offer guaranteed or
          assured returns. The sample report on this website uses a hypothetical company and figures for illustration
          only and is not a recommendation.
        </p>

        <div className="footer-bottom">
          <span>
            © {YEAR} {FIRM.brand}. All rights reserved.
          </span>
          <span>
            Complaints:{' '}
            <a href="https://scores.sebi.gov.in" target="_blank" rel="noreferrer">
              SEBI SCORES
            </a>{' '}
            ·{' '}
            <a href="https://smartodr.in" target="_blank" rel="noreferrer">
              SMART ODR
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
