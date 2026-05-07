// ─── NUESTRA HISTORIA ────────────────────────────────────────────────────────
// Para añadir un nuevo momento: copiar un bloque { date, title, desc, type }
// y añadirlo al array. type puede ser: 'milestone', 'special', 'regular'
// ─────────────────────────────────────────────────────────────────────────────

const TIMELINE = [

  // ── Agosto 2025 ──────────────────────────────────────────────────────────
  { month: 'Agosto 2025' },

  {
    date: '1 agosto 2025',
    title: 'El Día que Todo Comenzó',
    desc: 'Nos conocimos. Todavía no sabía que esa persona cambiaría mi vida para siempre.',
    type: 'milestone', icon: '✦'
  },
  {
    date: '4 — 8 agosto 2025',
    title: 'La Primera Semana',
    desc: 'Salimos todos los días de esa semana. Era como si el tiempo nos dijera que no nos separáramos.',
    type: 'special', icon: '🌟'
  },
  {
    date: '11 agosto 2025',
    title: 'Mi Polera',
    desc: 'Tenías frío. Te di mi polera sin pensarlo dos veces. Sin saber cuánto iba a significar ese gesto.',
    type: 'regular', icon: '🤍'
  },
  {
    date: '12 agosto 2025',
    title: 'La Primera Mano',
    desc: 'Nos agarramos de la mano por primera vez. Todo cambió en ese instante.',
    type: 'milestone', icon: '✦'
  },
  {
    date: '14 agosto 2025',
    title: 'En la Puerta del Instituto',
    desc: 'Fui a recogerte. Verte salir y encontrarme ahí fue uno de mis momentos favoritos.',
    type: 'regular', icon: '🤍'
  },
  {
    date: '15 agosto 2025',
    title: 'La Primera Despedida',
    desc: 'Te acompañé al terminal para que viajaras a Ayacucho. No quería que te fueras, pero ahí estaba.',
    type: 'special', icon: '🕊️'
  },
  {
    date: '22 agosto 2025',
    title: 'El Primer Picnic',
    desc: 'Extendimos una manta y compartimos ese espacio. El cielo, tú y yo. Perfecto.',
    type: 'special', icon: '🌸'
  },
  {
    date: '24 agosto 2025',
    title: 'Ella Cocinó para Mí',
    desc: 'Volvimos al parque, pero esta vez tú cocinaste. Fue uno de los gestos más bonitos que recuerdo.',
    type: 'regular', icon: '🤍'
  },
  {
    date: '29 agosto 2025',
    title: 'Las Primeras Flores',
    desc: 'Te regalé flores por primera vez. Tu cara al recibirlas lo decía todo.',
    type: 'special', icon: '🌸'
  },

  // ── Septiembre 2025 ───────────────────────────────────────────────────────
  { month: 'Septiembre 2025' },

  {
    date: '6 septiembre 2025',
    title: 'Una Boda Juntos',
    desc: 'Asistimos a una boda. Me pregunté si algún día estaríamos en una así.',
    type: 'regular', icon: '🤍'
  },
  {
    date: '12 septiembre 2025',
    title: 'Más Flores',
    desc: 'Porque una vez no era suficiente para decirte cuánto me importas.',
    type: 'regular', icon: '🌸'
  },
  {
    date: '18 — 21 septiembre 2025',
    title: 'El Retiro de Evangelismo',
    desc: 'Cuatro días juntos sirviendo. Te vi diferente ahí, y me gustó más lo que vi.',
    type: 'special', icon: '🕊️'
  },
  {
    date: '26 septiembre 2025',
    title: 'El Primer Beso',
    desc: 'El primer beso. Nada más que agregar.',
    type: 'milestone', icon: '✦'
  },
  {
    date: '29 septiembre 2025',
    title: '"Te Amo"',
    desc: 'Me dijiste "te amo" por primera vez. Esas dos palabras lo cambiaron todo.',
    type: 'milestone', icon: '✦'
  },
  {
    date: '30 septiembre 2025',
    title: 'Un Ramo con Hotwheels',
    desc: 'Me regalaste un ramo de flores con carritos de Hotwheels. Solo tú podías tener esa idea. Solo yo puedo decir que tengo esa novia.',
    type: 'special', icon: '💗'
  },

  // ── Octubre 2025 ──────────────────────────────────────────────────────────
  { month: 'Octubre 2025' },

  {
    date: '30 octubre 2025',
    title: 'Haciendo Pan',
    desc: 'Fuimos a un pueblito a hacer pan. Esas pequeñas aventuras son las que más atesoro.',
    type: 'special', icon: '🌟'
  },

  // ── Noviembre 2025 ────────────────────────────────────────────────────────
  { month: 'Noviembre 2025' },

  {
    date: '7 noviembre 2025 · 4:00 PM',
    title: '¿Quieres Ser Mi Novia?',
    desc: 'Le pedí que fuera mi novia. Dijo que sí. A las 4:00 PM de ese día, el universo comenzó.',
    type: 'milestone-major', icon: '✦'
  },
  {
    date: '13 noviembre 2025',
    title: 'Deditos en una Hoja',
    desc: 'Pintamos nuestros deditos y los estampamos en una hoja. Simple, espontáneo, y completamente nuestro.',
    type: 'regular', icon: '🤍'
  },
  {
    date: '21 noviembre 2025',
    title: 'Su Graduación del Seminario',
    desc: 'Se graduó del seminario. Estaba tan orgulloso de ella que no cabía en mí mismo.',
    type: 'special', icon: '🌟'
  },
  {
    date: '23 noviembre 2025',
    title: 'Paseo por Lima',
    desc: 'Caminamos sin rumbo fijo. Esos paseos sin destino son mis favoritos cuando son contigo.',
    type: 'regular', icon: '🤍'
  },
  {
    date: '28 — 30 noviembre 2025',
    title: 'El Campamento',
    desc: 'Tres días de campamento juntos. Noches bajo las estrellas, y tú ahí. No pedía más.',
    type: 'special', icon: '🌟'
  },

  // ── Diciembre 2025 ────────────────────────────────────────────────────────
  { month: 'Diciembre 2025' },

  {
    date: '1 diciembre 2025',
    title: 'Escapados a Comer Pizza',
    desc: 'Nos escapamos de una reunión con sus compañeros para ir a comer pizza y grabar videos. Esa complicidad es completamente nuestra.',
    type: 'regular', icon: '💗'
  },
  {
    date: '5 diciembre 2025',
    title: 'Cine y Juegos',
    desc: 'Fuimos al cine y a jugar. Un día simple que guardo con todo el cariño del mundo.',
    type: 'regular', icon: '🤍'
  },
  {
    date: '15 diciembre 2025',
    title: 'Chompas de Spiderman',
    desc: 'Comimos helados y compramos chompas navideñas de Spiderman que hacen match. Definitivamente somos ese tipo de pareja, y me encanta.',
    type: 'special', icon: '💗'
  },
  {
    date: '17 diciembre 2025',
    title: 'El Anillo de Promesa',
    desc: 'Le di un anillo de promesa. Una promesa que tengo muy en serio.',
    type: 'milestone', icon: '✦'
  },
  {
    date: '18 diciembre 2025',
    title: 'Al Cine Otra Vez',
    desc: 'Volvimos al cine. Contigo cada salida, aunque se repita, es diferente.',
    type: 'regular', icon: '🤍'
  },
  {
    date: '21 diciembre 2025',
    title: 'La Última Salida Solos',
    desc: 'Sabíamos que era la última salida antes de que regresara a casa. La aprovechamos bien.',
    type: 'special', icon: '🌟'
  },
  {
    date: '22 diciembre 2025',
    title: 'Juegos Mecánicos con Amigos',
    desc: 'Fuimos a los juegos mecánicos con amigos. Reír juntos así, sin complicaciones, es algo que amo.',
    type: 'regular', icon: '🤍'
  },
  {
    date: '23 diciembre 2025',
    title: 'La Despedida',
    desc: 'Nos despedimos. La distancia iba a comenzar, pero lo nuestro siempre ha sido más fuerte que eso.',
    type: 'milestone', icon: '✦'
  },

  // ── Enero 2026 ────────────────────────────────────────────────────────────
  { month: 'Enero 2026' },

  {
    date: '16 — 17 enero 2026',
    title: 'Las Primeras Citas Virtuales',
    desc: 'La primera y la segunda cita virtual. La pantalla no pudo separarnos de verdad.',
    type: 'special', icon: '🌟'
  },
  {
    date: '23 enero 2026',
    title: 'El Reencuentro en Lima',
    desc: 'Viajé a Lima para verte. Fuimos a la playa, vimos el sunset, nos subimos a un bote. Uno de los mejores días de mi vida.',
    type: 'milestone', icon: '✦'
  },

  // ── Febrero 2026 ──────────────────────────────────────────────────────────
  { month: 'Febrero 2026' },

  {
    date: '14 — 16 febrero 2026',
    title: 'San Valentín en Ayacucho',
    desc: 'Viajé a Ayacucho para estar contigo en San Valentín. Vale cada kilómetro recorrido.',
    type: 'milestone', icon: '✦'
  },

  // ── Marzo 2026 ────────────────────────────────────────────────────────────
  { month: 'Marzo 2026' },

  {
    date: '20 — 22 marzo 2026',
    title: 'Ayacucho, Otra Vez',
    desc: 'De vuelta en Ayacucho juntos. Cada reencuentro es más dulce que el anterior.',
    type: 'special', icon: '🌟'
  },

  // ── Abril 2026 ────────────────────────────────────────────────────────────
  { month: 'Abril 2026' },

  {
    date: '29 abril 2026',
    title: 'El Peluchito',
    desc: 'Me regaló un peluchito igual al que yo le regalé en su graduación. Sin decir nada, con ese gesto lo dijo todo.',
    type: 'special', icon: '💗'
  },
];
