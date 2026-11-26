import Icon from './Icon.jsx'

const ITEMS = [
  { icon: 'shield', title: 'SEBI Registered', text: 'Research Analyst' },
  { icon: 'badge', title: 'BSE Enlisted', text: 'Research entity' },
  { icon: 'chart', title: 'NSE & BSE', text: 'Listed stocks & ETFs' },
  { icon: 'user', title: 'You stay in control', text: 'Research only, no money handling' },
]

export default function TrustStrip() {
  return (
    <div className="trust">
      <div className="container trust-grid">
        {ITEMS.map((it, i) => (
          <div key={it.title} className="trust-item" style={{ '--i': i }}>
            <span className="trust-icon">
              <Icon name={it.icon} size={22} />
            </span>
            <div>
              <strong>{it.title}</strong>
              <span>{it.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
