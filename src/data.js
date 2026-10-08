// Catálogo de EJEMPLO. Reemplazar por el inventario real de la tienda.
// Camisetas y balones son mockups dibujados (sin marcas). La ropa usa fotos de stock (Unsplash).
// Sin precios: el cliente consulta por WhatsApp porque el inventario cambia cada semana.
const ph = (id, w = 900) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

export const CATS = [
  ['camisetas', 'Camisetas'],
  ['ropa', 'Ropa urbana y deportiva'],
  ['accesorios', 'Artículos deportivos'],
]

const TALLAS = ['S', 'M', 'L', 'XL']

const jersey = (o) => ['front', 'back'].map((view) => ({ type: 'jersey', view, ...o }))
const ball = (o) => [{ type: 'ball', ...o }]

const FOTOS_ROPA = [
  ph('photo-1551028719-00167b16eac5'),
  ph('photo-1506629082955-511b1aa562c8'),
  ph('photo-1518459031867-a89b944bffe4'),
  ph('photo-1556905055-8f358a7a47b2'),
]
const ropa = (i) => [FOTOS_ROPA[i], ...FOTOS_ROPA.filter((_, j) => j !== i)]

export const PRODUCTS = [
  { id: 1, name: 'Camiseta Fútbol Negra', cat: 'camisetas', sizes: TALLAS, tag: 'Nuevo',
    media: jersey({ body: '#141414', trim: '#f2f2f2', ink: '#f2f2f2', pattern: 'plain', num: '10', name: 'ZONA' }),
    desc: 'Camiseta de fútbol en tela liviana que deja respirar la piel. Para la cancha, el parche del barrio o para lucirla en la calle con estilo urbano.' },
  { id: 2, name: 'Camiseta Fútbol Blanca', cat: 'camisetas', sizes: TALLAS,
    media: jersey({ body: '#f2f2f2', trim: '#141414', ink: '#141414', pattern: 'plain', num: '7', name: 'ZONA' }),
    desc: 'Clásica y limpia. Tela de secado rápido, cuello reforzado y un corte cómodo para jugar o para el día a día.' },
  { id: 3, name: 'Camiseta Fútbol Grafito Franja', cat: 'camisetas', sizes: TALLAS, tag: 'Más pedido',
    media: jersey({ body: '#3b3b3b', trim: '#f2f2f2', ink: '#f2f2f2', pattern: 'sash', num: '9', name: 'ZONA' }),
    desc: 'Diseño con franja diagonal que se hace notar. Liviana, resistente al lavado y con estampado de buena definición.' },
  { id: 4, name: 'Camiseta Fútbol Roja Rayas', cat: 'camisetas', sizes: TALLAS,
    media: jersey({ body: '#b3121f', trim: '#f2f2f2', ink: '#ffffff', pattern: 'stripes', num: '11', name: 'ZONA' }),
    desc: 'Rayas verticales y mucha actitud. Ideal para el equipo del barrio, la banca o el parche de los domingos.' },
  { id: 5, name: 'Chaqueta Urbana', cat: 'ropa', sizes: TALLAS, tag: 'Nuevo', media: ropa(0),
    desc: 'Chaqueta de estilo urbano para las noches frescas. Combina con todo, dentro y fuera de la cancha.' },
  { id: 6, name: 'Short Deportivo', cat: 'ropa', sizes: TALLAS, media: ropa(1),
    desc: 'Short ligero con bolsillos laterales y cintura cómoda. Para entrenar, correr o andar relajado.' },
  { id: 7, name: 'Conjunto Deportivo Mujer', cat: 'ropa', sizes: TALLAS, media: ropa(2),
    desc: 'Conjunto de top y licra para entrenar con comodidad y verte bien dentro y fuera del gimnasio.' },
  { id: 8, name: 'Buzo Urbano', cat: 'ropa', sizes: TALLAS, media: ropa(3),
    desc: 'Buzo cómodo y abrigado para calentar antes de entrenar o para las tardes frescas.' },
  { id: 9, name: 'Balón de Fútbol Blanco', cat: 'accesorios', sizes: ['Única'],
    media: ball({ base: '#f2f2f2', patch: '#141414' }),
    desc: 'Balón de fútbol con costura reforzada y buen agarre, para cancha sintética o potrero.' },
  { id: 10, name: 'Balón de Fútbol Grafito', cat: 'accesorios', sizes: ['Única'],
    media: ball({ base: '#3b3b3b', patch: '#f2f2f2' }),
    desc: 'Balón resistente con diseño en tonos oscuros, hecho para el uso diario.' },
]

export const galleryFor = (p) => p.media
export const coverOf = (p) => p.media[0]

export const relatedFor = (p) => {
  const others = PRODUCTS.filter((x) => x.id !== p.id)
  const same = others.filter((x) => x.cat === p.cat)
  return [...same, ...others.filter((x) => !same.includes(x))].slice(0, 8)
}

export const catLabel = (cat) => CATS.find(([k]) => k === cat)?.[1] || cat
