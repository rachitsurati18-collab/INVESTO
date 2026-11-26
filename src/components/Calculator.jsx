import { useMemo, useState } from 'react'
import { Reveal } from '../hooks.jsx'
import Icon from './Icon.jsx'

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')
const short = (n) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(2)} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(2)} L` : inr(n)

function Slider({ label, value, min, max, step, onChange, format }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <label className="slider">
      <span className="slider-top">
        {label}
        <b>{format(value)}</b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--pct': `${pct}%` }}
      />
    </label>
  )
}

export default function Calculator() {
  const [monthly, setMonthly] = useState(10000)
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(12)

  const { points, invested, value } = useMemo(() => {
    const r = rate / 100 / 12
    const pts = []
    let v = 0
    for (let m = 1; m <= years * 12; m++) {
      v = (v + monthly) * (1 + r)
      if (m % 12 === 0) pts.push({ year: m / 12, invested: monthly * m, value: v })
    }
    return { points: pts, invested: monthly * years * 12, value: v }
  }, [monthly, years, rate])

  const W = 560
  const H = 240
  const max = value * 1.05
  const x = (i) => (i / Math.max(1, points.length - 1)) * W
  const y = (v) => H - (v / max) * H
  const path = (key) => points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p[key]).toFixed(1)}`).join(' ')
  const area = (key) => `${path(key)} L${W},${H} L0,${H} Z`
  const gainPct = Math.round(((value - invested) / value) * 100)

  return (
    <section id="calculator" className="section section-soft">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Stock SIP Calculator</span>
          <h2>See how a monthly SIP can grow</h2>
          <p>Move the sliders to see the power of investing a fixed amount every month, the idea behind Sankalp.</p>
        </Reveal>

        <Reveal className="calc card">
          <div className="calc-inputs">
            <Slider label="Monthly investment" value={monthly} min={1000} max={100000} step={1000} onChange={setMonthly} format={inr} />
            <Slider label="Time period" value={years} min={1} max={30} step={1} onChange={setYears} format={(v) => `${v} yrs`} />
            <Slider label="Assumed annual return" value={rate} min={1} max={25} step={0.5} onChange={setRate} format={(v) => `${v}%`} />

            <div className="calc-results">
              <div>
                <span>Amount invested</span>
                <strong>{short(invested)}</strong>
              </div>
              <div>
                <span>Estimated gain</span>
                <strong className="up">{short(value - invested)}</strong>
              </div>
              <div className="total">
                <span>Estimated value</span>
                <strong>{short(value)}</strong>
              </div>
            </div>
            <a href="#services" className="btn btn-navy">
              Explore Sankalp <Icon name="arrow" size={16} />
            </a>
          </div>

          <div className="calc-chart">
            <div className="calc-split">
              <i style={{ width: `${100 - gainPct}%` }} />
              <em style={{ width: `${gainPct}%` }} />
            </div>
            <div className="calc-legend">
              <span><i className="inv" /> Invested {100 - gainPct}%</span>
              <span><i className="gain" /> Gain {gainPct}%</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="calc-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="calcG" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#15803d" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#15803d" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area('value')} fill="url(#calcG)" />
              <path d={path('value')} className="calc-line value" />
              <path d={area('invested')} fill="rgba(1,12,59,0.08)" />
              <path d={path('invested')} className="calc-line invested" />
            </svg>
            <div className="calc-axis">
              <span>Year 1</span>
              <span>Year {years}</span>
            </div>
          </div>
          <p className="calc-note">
            For illustration only. Returns are not guaranteed; actual stock returns can be higher, lower or negative. The
            assumed return is set by you and is not a projection by Investo Research.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
