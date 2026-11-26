import { useEffect, useRef, useState } from 'react'
import { NAV } from '../data.js'
import { useScrollSpy } from '../hooks.jsx'
import logo from '../assets/investo-logo.png'
import Icon from './Icon.jsx'
import './Header.css'

const IDS = NAV.map((n) => n.id)

export function Logo({ height = 44 }) {
  return (
    <a href="#home" className="logo" aria-label="Investo Research home">
      <img src={logo} alt="Investo Research" height={height} width={Math.round((height * 473) / 144)} />
    </a>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const barRef = useRef(null)
  const active = useScrollSpy(IDS)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = document.documentElement
        setScrolled(h.scrollTop > 10) // React skips re-render when the value is unchanged
        const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Logo />
        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Main">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-gold btn-sm header-cta">
          Get Started
        </a>
        <button
          className="menu-btn"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'x' : 'menu'} />
        </button>
      </div>
      <span ref={barRef} className="scroll-progress" />
    </header>
  )
}
