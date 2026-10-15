import { useEffect, useMemo, useRef, useState } from 'react'
import { CATS, PRODUCTS, catLabel, coverOf, galleryFor, relatedFor } from './data'
import { Shot } from './Art'

const LOGO = import.meta.env.BASE_URL + 'logo.webp'
const PHONE = '573152212734'
const PHONE_LABEL = '315 221 2734'
const TIKTOK = 'https://www.tiktok.com/@zona_sportocana'
const ADDRESS = 'Cra. 11 #11-17, Ocaña, Norte de Santander'
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

const wa = (msg) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`

const TICKER = ['Envíos a todo el país', 'Pedidos por WhatsApp', 'Estilo urbano', 'Apoyamos el deporte ocañero', 'Tienda física en Ocaña']

const STEPS = [
  ['Escríbenos', 'Mándanos un mensaje por WhatsApp con lo que buscas.'],
  ['Elige', 'Te enviamos fotos y videos reales, con las tallas disponibles.'],
  ['Confirma el pago', 'Te indicamos los medios de pago disponibles.'],
  ['Recíbelo', 'Enviamos a todo el país o lo recoges en la tienda en Ocaña.'],
]

const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M20.5 3.5A11.8 11.8 0 0 0 12 0 12 12 0 0 0 1.7 17.9L0 24l6.3-1.6A12 12 0 0 0 12 24a12 12 0 0 0 8.5-20.5zM12 21.9a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.9zm5.4-7.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.4 3.4c.2.2 2.4 3.7 5.8 5.1 2.1.9 2.9.9 4 .8a3.4 3.4 0 0 0 2.2-1.6 2.7 2.7 0 0 0 .2-1.6c-.1-.1-.3-.2-.6-.3z" />
  </svg>
)

const TILES = [
  { cat: 'camisetas', d: 'De tus equipos y selecciones favoritas.', img: 'photo-1526232761682-d26e03ac148e' },
  { cat: 'ropa', d: 'Para entrenar y para la calle.', img: 'photo-1571008887538-b36bb32f4571' },
  { cat: 'accesorios', d: 'Todo para vivir el deporte.', img: 'photo-1517836357463-d25dfeac3438' },
]

function parseHash() {
  const h = window.location.hash
  const p = h.match(/^#\/producto\/(\d+)/)
  if (p) return { name: 'product', id: Number(p[1]) }
  const c = h.match(/^#\/categoria\/(\w+)/)
  if (c) return { name: 'category', cat: c[1] }
  return { name: 'home' }
}

function useRoute() {
  const [route, setRoute] = useState(parseHash)
  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

// En pantallas con ratón el menú abre al pasar; en táctiles abre al tocar.
const canHover = () => window.matchMedia('(hover: hover)').matches

function Header({ go }) {
  const [menu, setMenu] = useState(false)
  const [dd, setDd] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) { setDd(false); setMenu(false) } }
    const onKey = (e) => { if (e.key === 'Escape') { setDd(false); setMenu(false) } }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [])

  const close = () => { setDd(false); setMenu(false) }
  const goTo = (section) => { close(); go(section) }

  return (
    <>
      <div className="util">
        <span>Envíos a todo el país · Pedidos por WhatsApp</span>
        <span>{PHONE_LABEL}</span>
      </div>
      <header className="top" ref={ref}>
        <button className="brand" onClick={() => goTo()} aria-label="Zona Sport Ocaña, inicio">
          <img src={LOGO} alt="Zona Sport Ocaña" />
        </button>
        <nav aria-label="Secciones" className={menu ? 'open' : ''}>
          <div className={'dd' + (dd ? ' open' : '')} onMouseEnter={() => canHover() && setDd(true)} onMouseLeave={() => canHover() && setDd(false)}>
            <button className="dd-btn" aria-haspopup="true" aria-expanded={dd} onClick={() => (canHover() ? setDd(true) : setDd((v) => !v))}>
              Catálogo <span className="caret" aria-hidden="true">▾</span>
            </button>
            <div className="dd-menu">
              {CATS.map(([k, label]) => (
                <a key={k} href={'#/categoria/' + k} onClick={close}>
                  {label} <small>{PRODUCTS.filter((p) => p.cat === k).length}</small>
                </a>
              ))}
              <button onClick={() => goTo('catalogo')}>Ver todo el catálogo →</button>
            </div>
          </div>
          <button onClick={() => goTo('novedades')}>Novedades</button>
          <button onClick={() => goTo('como-comprar')}>Cómo comprar</button>
          <button onClick={() => goTo('visitanos')}>Visítanos</button>
        </nav>
        <a className="btn btn-wa" href={wa('Hola Zona Sport, quiero hacer un pedido.')} target="_blank" rel="noreferrer">
          <WaIcon /> <span>Pedir por WhatsApp</span>
        </a>
        <button className="burger" aria-label="Abrir menú" aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
          <i /><i /><i />
        </button>
      </header>
    </>
  )
}

function Hero({ go }) {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" aria-hidden="true">
        <img className="logo-a" src={LOGO} alt="" />
        <img className="logo-b" src={LOGO} alt="" />
      </div>
      <div className="hero-copy">
        <span className="kicker"><i /> Tienda deportiva · Ocaña, Norte de Santander</span>
        <h1>Donde se vive el deporte <em>con flow.</em></h1>
        <p>Camisetas, ropa y artículos deportivos con estilo urbano. Apoyamos el deporte ocañero y enviamos a todo el país.</p>
        <div className="hero-cta">
          <button className="btn btn-white" onClick={() => go('catalogo')}>Ver catálogo</button>
          <a className="btn btn-ghost" href={wa('Hola Zona Sport, quiero ver lo que tienen disponible.')} target="_blank" rel="noreferrer">Escríbenos por WhatsApp</a>
        </div>
      </div>
      <aside className="hero-card">
        <span className="eyebrow">Tienda física</span>
        <b>Ocaña, Norte de Santander</b>
        <p>{ADDRESS}</p>
        <p className="hours">Lunes a sábado · desde las 8:00 a. m.<br />Domingo cerrado</p>
        <a className="link" href={MAP_LINK} target="_blank" rel="noreferrer">Cómo llegar →</a>
      </aside>
    </section>
  )
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div>{Array(4).fill(TICKER).flat().map((t, i) => <span key={i}>★ {t}</span>)}</div>
    </div>
  )
}

function ProductCard({ p }) {
  return (
    <a className="pcard" href={'#/producto/' + p.id}>
      <div className="pimg">
        <Shot item={coverOf(p)} alt={p.name} />
        {p.tag && <span className="ptag">{p.tag}</span>}
      </div>
      <div className="pbody">
        <h3>{p.name}</h3>
        <small>{catLabel(p.cat)}</small>
        <span>Consultar precio</span>
      </div>
    </a>
  )
}

function Categories() {
  return (
    <section className="section" id="catalogo">
      <span className="eyebrow">Catálogo</span>
      <h2>Lo que llega, se mueve.</h2>
      <p className="lead">Nuestro inventario cambia cada semana. Elige una categoría o mira las llegadas en TikTok.</p>
      <div className="offer">
        {TILES.map((t) => (
          <a key={t.cat} className="tile" href={'#/categoria/' + t.cat}>
            <img src={`https://images.unsplash.com/${t.img}?q=80&w=900&auto=format&fit=crop`} alt="" loading="lazy" />
            <div>
              <p>{t.d}</p>
              <h3>{catLabel(t.cat)}</h3>
              <span>Ver {catLabel(t.cat).toLowerCase()}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function Featured() {
  return (
    <section className="section" id="novedades">
      <div className="head-row">
        <div>
          <span className="eyebrow">Novedades</span>
          <h2>Lo más pedido.</h2>
        </div>
        <a className="link" href="#/categoria/camisetas">Ver camisetas</a>
      </div>
      <div className="pgrid">
        {PRODUCTS.slice(0, 6).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  )
}

function CategoryPage({ cat, go }) {
  const list = useMemo(() => PRODUCTS.filter((p) => p.cat === cat), [cat])
  const label = catLabel(cat)
  useEffect(() => { window.scrollTo(0, 0) }, [cat])

  return (
    <div className="pdp">
      <button className="back" onClick={() => go('catalogo')}>← Volver al catálogo</button>
      <span className="eyebrow">Catálogo</span>
      <h2 className="cat-title">{label} <small>{list.length} productos</small></h2>
      <p className="lead">Pídenos fotos reales, precio y tallas disponibles por WhatsApp.</p>
      {list.length === 0 && <p className="lead">Pronto tendremos productos en esta categoría.</p>}
      <div className="pgrid">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}

function Tiktok() {
  return (
    <section className="tiktok">
      <div>
        <span className="eyebrow">Llegadas nuevas</span>
        <h2>Mira lo nuevo en TikTok.</h2>
        <p>Cada vez que llega mercancía, la mostramos en video. Síguenos en <b>@zona_sportocana</b>.</p>
      </div>
      <a className="btn btn-white" href={TIKTOK} target="_blank" rel="noreferrer">Ver en TikTok</a>
    </section>
  )
}

function Steps() {
  return (
    <section className="section" id="como-comprar">
      <span className="eyebrow">Cómo comprar</span>
      <h2>Pide desde donde estés.</h2>
      <p className="lead">Compra desde Cúcuta, Bucaramanga o cualquier ciudad del país, con una tienda real detrás.</p>
      <ol className="steps">
        {STEPS.map(([t, d], i) => (
          <li key={t}>
            <b>{String(i + 1).padStart(2, '0')}</b>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Visit() {
  return (
    <section className="section visit" id="visitanos">
      <div className="visit-info">
        <span className="eyebrow">Visítanos</span>
        <h2>Una tienda real, en Ocaña.</h2>
        <dl>
          <dt>Dirección</dt><dd>{ADDRESS}</dd>
          <dt>Horario</dt><dd>Lunes a sábado · desde las 8:00 a. m.<br />Domingo cerrado</dd>
          <dt>WhatsApp</dt><dd>{PHONE_LABEL}</dd>
          <dt>TikTok</dt><dd>@zona_sportocana</dd>
        </dl>
        <div className="hero-cta">
          <a className="btn btn-white" href={MAP_LINK} target="_blank" rel="noreferrer">Cómo llegar</a>
          <a className="btn btn-ghost" href={wa('Hola Zona Sport, tengo una pregunta.')} target="_blank" rel="noreferrer">Escribir</a>
        </div>
      </div>
      <div className="map-wrap">
        <a className="map-fallback" href={MAP_LINK} target="_blank" rel="noreferrer">
          <b>Ocaña, Norte de Santander</b>
          <span>Abrir en Google Maps →</span>
        </a>
        <iframe className="map" title="Mapa de Zona Sport Ocaña" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot-grid">
        <div className="foot-brand">
          <img src={LOGO} alt="Zona Sport Ocaña" />
          <p>Tienda deportiva en Ocaña, Norte de Santander. Donde se vive el deporte con flow.</p>
        </div>
        <div className="foot-col">
          <h4>Tienda</h4>
          <ul>
            {CATS.map(([k, label]) => <li key={k}><a href={'#/categoria/' + k}>{label}</a></li>)}
          </ul>
        </div>
        <div className="foot-col">
          <h4>Contacto</h4>
          <ul>
            <li><a href={wa('Hola Zona Sport, tengo una pregunta.')} target="_blank" rel="noreferrer">WhatsApp {PHONE_LABEL}</a></li>
            <li><a href={TIKTOK} target="_blank" rel="noreferrer">TikTok @zona_sportocana</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Visítanos</h4>
          <ul>
            <li>{ADDRESS}</li>
            <li>Lunes a sábado · desde las 8:00 a. m.</li>
            <li><a href={MAP_LINK} target="_blank" rel="noreferrer">Cómo llegar</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Zona Sport Ocaña</span>
        <span>Propuesta de diseño · borrador</span>
      </div>
    </footer>
  )
}

function ProductPage({ id, go }) {
  const p = PRODUCTS.find((x) => x.id === id)
  const [idx, setIdx] = useState(0)
  const [size, setSize] = useState('')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!p) {
    return (
      <div className="pdp">
        <button className="back" onClick={() => go('catalogo')}>← Volver al catálogo</button>
        <p className="lead">No encontramos ese producto.</p>
      </div>
    )
  }

  const gallery = galleryFor(p)
  const related = relatedFor(p)
  const next = () => setIdx((i) => (i + 1) % gallery.length)
  const prev = () => setIdx((i) => (i - 1 + gallery.length) % gallery.length)
  const msg = `Hola Zona Sport, quiero pedir: ${p.name}${size && size !== 'Única' ? ' · talla ' + size : ''}. ¿Está disponible?`

  return (
    <div className="pdp">
      <a className="back" href={'#/categoria/' + p.cat}>← Volver a {catLabel(p.cat).toLowerCase()}</a>
      <div className="pdp-top">
        <div className="pdp-gallery">
          <div className="thumbs">
            {gallery.map((src, i) => (
              <button key={i} className={'thumb' + (i === idx ? ' on' : '')} onClick={() => setIdx(i)} aria-label={`Foto ${i + 1}`}>
                <Shot item={src} alt="" />
              </button>
            ))}
          </div>
          <div className="pdp-main">
            <Shot item={gallery[idx]} alt={p.name} />
            {gallery.length > 1 && (<>
              <button className="nav prev" onClick={prev} aria-label="Foto anterior">‹</button>
              <button className="nav next" onClick={next} aria-label="Foto siguiente">›</button>
            </>)}
          </div>
        </div>
        <div className="pdp-info">
          {p.tag && <span className="eyebrow hot">{p.tag}</span>}
          <small className="cat">{catLabel(p.cat)}</small>
          <h1>{p.name}</h1>
          <p className="price-note">Consulta precio y disponibilidad por WhatsApp.</p>
          {p.sizes[0] !== 'Única' && (<>
            <h4>Talla</h4>
            <div className="chips">
              {p.sizes.map((s) => <button key={s} className={size === s ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>)}
            </div>
          </>)}
          <a className="btn btn-wa wide" href={wa(msg)} target="_blank" rel="noreferrer"><WaIcon /> Pedir por WhatsApp</a>
          <p className="ship-note">Te respondemos con fotos reales, precio y tallas disponibles. Envíos a todo el país o recoge en la tienda en Ocaña.</p>
        </div>
      </div>

      <div className="pdp-desc">
        <h4>Descripción</h4>
        <p>{p.desc}</p>
      </div>

      <div className="pdp-related">
        <h4>También te puede interesar</h4>
        <div className="rel-row">
          {related.map((r) => (
            <a key={r.id} className="rel-card" href={'#/producto/' + r.id}>
              <div className="rimg"><Shot item={coverOf(r)} alt={r.name} /></div>
              <b>{r.name}</b>
              <span>Consultar precio</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const route = useRoute()

  const go = (section) => {
    const scroll = () => {
      if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (route.name !== 'home') {
      window.location.hash = '#/'
      setTimeout(scroll, 120)
    } else scroll()
  }

  return (
    <>
      <Header go={go} />
      <main>
        {route.name === 'product' && <ProductPage key={route.id} id={route.id} go={go} />}
        {route.name === 'category' && <CategoryPage cat={route.cat} go={go} />}
        {route.name === 'home' && (
          <>
            <Hero go={go} />
            <Marquee />
            <Categories />
            <Featured />
            <Tiktok />
            <Steps />
            <Visit />
          </>
        )}
      </main>
      <Footer />
      <a className="float-wa" href={wa('Hola Zona Sport, quiero hacer un pedido.')} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp">
        <WaIcon />
      </a>
    </>
  )
}
