import { useId } from 'react'
import { useInView } from '../hooks.jsx'

/** Deterministic pseudo-random price series (for illustrative charts only). */
export function makeSeries(n, start, drift, vol, seed = 7) {
  let s = seed
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  let v = start
  return Array.from({ length: n }, () => (v = v * (1 + drift + (rnd() - 0.5) * vol)))
}

/** Area line chart with optional horizontal price bands (entry / target zones). */
export function LineChart({ data, bands = [], width = 640, height = 240, color = 'var(--cyan)' }) {
  const [ref, inView] = useInView(0.2)
  const gid = useId().replace(/:/g, '')
  const pad = 10
  const values = [...data, ...bands.flatMap((b) => [b.from, b.to])]
  const min = Math.min(...values) * 0.96
  const max = Math.max(...values) * 1.03
  const x = (i) => pad + (i / (data.length - 1)) * (width - pad * 2)
  const y = (v) => height - pad - ((v - min) / (max - min)) * (height - pad * 2)
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(data.length - 1)},${height} L${x(0)},${height} Z`
  const last = data.length - 1

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className={`chart line-chart ${inView ? 'is-in' : ''}`}>
      <defs>
        <linearGradient id={`g${gid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={width} y1={height * f} y2={height * f} className="grid-line" />
      ))}
      {bands.map((b) => (
        <g key={b.label} className={`band band-${b.tone}`}>
          <rect x="0" width={width} y={y(b.to)} height={y(b.from) - y(b.to)} />
          <text x="10" y={y(b.to) + 15}>
            {b.label}
          </text>
        </g>
      ))}
      <path d={area} fill={`url(#g${gid})`} className="area" />
      <path d={line} pathLength="1" className="line" style={{ stroke: color }} />
      <circle cx={x(last)} cy={y(data[last])} r="4.5" className="dot" style={{ fill: color }} />
    </svg>
  )
}
