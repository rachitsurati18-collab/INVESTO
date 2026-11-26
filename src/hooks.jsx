import { useEffect, useRef, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const canObserve = typeof window !== 'undefined' && 'IntersectionObserver' in window

/**
 * Returns [ref, inView] — becomes true once the element's top has scrolled
 * `offset` (fraction of viewport height) into view.
 */
export function useInView(offset = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(!canObserve)
  useEffect(() => {
    const el = ref.current
    if (!el || !canObserve) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0, rootMargin: `0px 0px -${Math.round(offset * 100)}% 0px` },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [offset])
  return [ref, inView]
}

/** Fades / lifts children into view on scroll. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView(0.1)
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Animates a number from 0 to `target` once `start` is true. */
export function useCountUp(target, start, duration = 1200) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = prefersReduced() ? 1 : Math.min((now - t0) / duration, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    // Safety net: if animation frames are paused (background tab, slow load), still land on the final number.
    const fallback = setTimeout(() => {
      cancelAnimationFrame(raf)
      setValue(target)
    }, duration + 600)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
    }
  }, [target, start, duration])
  return value
}

/** Gentle 3D tilt that follows the pointer (desktop only). */
export function useTilt(max = 4) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced() || !window.matchMedia('(hover: hover)').matches) return
    let raf = 0
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty('--ry', `${px * max * 2}deg`)
        el.style.setProperty('--rx', `${-py * max * 2}deg`)
      })
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--rx', '0deg')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])
  return ref
}

/* ── Scroll-linked motion ───────────────────────────────────────────
   One shared, passive, rAF-throttled scroll listener writes a CSS variable
   --p (0 → 1) on each registered element, describing how far the element has
   travelled through the viewport. CSS then uses --p for smooth, scrubbed
   motion without React re-renders. */
const tracked = new Map() // element → mode
let ticking = false
function update() {
  ticking = false
  const vh = window.innerHeight
  tracked.forEach((mode, el) => {
    const r = el.getBoundingClientRect()
    if (r.bottom < -vh || r.top > vh * 2) return
    // 'through': 0 when the element's top enters at the bottom of the viewport, 1 when its bottom reaches the middle.
    // 'exit':    0 while the element sits at the top of the page, 1 once it has scrolled fully out of view.
    const raw = mode === 'exit' ? -r.top / r.height : (vh - r.top) / (r.height + vh * 0.5)
    const p = Math.min(1, Math.max(0, raw))
    el.style.setProperty('--p', p.toFixed(3))
  })
}
function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(update)
  }
}

export function useScrollProgress(mode = 'through') {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced()) {
      el.style.setProperty('--p', '1')
      return
    }
    if (tracked.size === 0) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
    }
    tracked.set(el, mode)
    onScroll()
    return () => {
      tracked.delete(el)
      if (tracked.size === 0) {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    }
  }, [mode])
  return ref
}

/** Returns the id of the section currently in the middle of the viewport. */
export function useScrollSpy(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}
