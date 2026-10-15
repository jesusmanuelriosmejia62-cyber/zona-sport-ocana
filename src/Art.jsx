import { useId } from 'react'

const SHIRT = (neck) =>
  `M120 44 L158 32 Q200 ${neck} 242 32 L280 44 L352 102 L312 152 L280 130 L280 362 L120 362 L120 130 L88 152 L48 102 Z`

function Jersey({ body, trim, ink, pattern, view, num, name }) {
  const id = useId()
  const front = view === 'front'
  const neck = front ? 88 : 58
  return (
    <svg className="art" viewBox="0 0 400 400" role="img" aria-label={`Camiseta ${view === 'front' ? 'frente' : 'espalda'}`}>
      <defs>
        <clipPath id={id + 'c'}><path d={SHIRT(neck)} /></clipPath>
        <linearGradient id={id + 's'} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".28" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="378" rx="120" ry="8" fill="#000" opacity=".35" />
      <g clipPath={`url(#${id}c)`}>
        <rect width="400" height="400" fill={body} />
        {pattern === 'stripes' && [0, 1, 2, 3].map((i) => <rect key={i} x={132 + i * 40} y="20" width="18" height="360" fill={trim} />)}
        {pattern === 'sash' && <polygon points="120,160 280,250 280,310 120,220" fill={trim} />}
        <rect width="400" height="400" fill={`url(#${id}s)`} />
      </g>
      <path d={SHIRT(neck)} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="48" y1="102" x2="88" y2="152" stroke={trim} strokeWidth="12" strokeLinecap="round" />
      <line x1="352" y1="102" x2="312" y2="152" stroke={trim} strokeWidth="12" strokeLinecap="round" />
      <path d={`M158 32 Q200 ${neck} 242 32`} stroke={trim} strokeWidth="10" fill="none" strokeLinecap="round" />
      {front ? (<>
        <text x="200" y="150" textAnchor="middle" fontFamily="Jost, sans-serif" fontWeight="700" fontSize="34" letterSpacing="2" fill={ink}>ZONA</text>
        <text x="200" y="168" textAnchor="middle" fontFamily="Jost, sans-serif" fontWeight="500" fontSize="11" letterSpacing="3" fill={ink}>SPORT OCAÑA</text>
      </>) : (<>
        <text x="200" y="118" textAnchor="middle" fontFamily="Jost, sans-serif" fontWeight="700" fontSize="22" letterSpacing="4" fill={ink}>{name}</text>
        <text x="200" y="270" textAnchor="middle" fontFamily="Jost, sans-serif" fontWeight="700" fontSize="130" fill={ink}>{num}</text>
      </>)}
    </svg>
  )
}

const pent = (cx, cy, r, rot) =>
  Array.from({ length: 5 }, (_, i) => {
    const a = rot + (i * 2 * Math.PI) / 5
    return `${(cx + r * Math.sin(a)).toFixed(1)},${(cy - r * Math.cos(a)).toFixed(1)}`
  }).join(' ')

function Ball({ base, patch }) {
  const id = useId()
  const outer = Array.from({ length: 5 }, (_, i) => {
    const a = (i * 2 * Math.PI) / 5
    return { x: 200 + 128 * Math.sin(a), y: 200 - 128 * Math.cos(a), a }
  })
  const inner = Array.from({ length: 5 }, (_, i) => {
    const a = (i * 2 * Math.PI) / 5
    return { x: 200 + 52 * Math.sin(a), y: 200 - 52 * Math.cos(a) }
  })
  return (
    <svg className="art" viewBox="0 0 400 400" role="img" aria-label="Balón de fútbol">
      <defs>
        <clipPath id={id + 'c'}><circle cx="200" cy="200" r="140" /></clipPath>
        <radialGradient id={id + 'g'} cx=".35" cy=".3" r=".9">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".4" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="360" rx="110" ry="9" fill="#000" opacity=".4" />
      <circle cx="200" cy="200" r="140" fill={base} />
      <g clipPath={`url(#${id}c)`}>
        <polygon points={pent(200, 200, 52, 0)} fill={patch} />
        {outer.map((o, i) => <polygon key={i} points={pent(o.x, o.y, 50, o.a + Math.PI)} fill={patch} />)}
        {inner.map((p, i) => <line key={i} x1={p.x} y1={p.y} x2={outer[i].x} y2={outer[i].y} stroke={patch} strokeWidth="5" />)}
      </g>
      <circle cx="200" cy="200" r="140" fill={`url(#${id}g)`} />
    </svg>
  )
}

export function Shot({ item, alt }) {
  if (typeof item === 'string') return <img className="photo" src={item} alt={alt} loading="lazy" />
  if (item.type === 'jersey') return <Jersey {...item} />
  return <Ball {...item} />
}
