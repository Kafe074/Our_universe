// ─── TRIVIA: PREGUNTAS SOBRE NOSOTROS ────────────────────────────────────────
// Para añadir una pregunta: copiar un bloque y añadirlo al array.
// correct: índice (0-3) de la opción correcta en el array options.
// fun: mensaje que aparece al responder correctamente.
// ─────────────────────────────────────────────────────────────────────────────

const TRIVIA_QUESTIONS = [
  {
    question:  '¿Qué día nos conocimos?',
    options:   ['1 agosto 2025', '4 agosto 2025', '7 noviembre 2025', '22 agosto 2025'],
    correct:   0,
    fun:       'El principio de todo 💗'
  },
  {
    question:  '¿Cuál es nuestra canción?',
    options:   ['Perfect — Ed Sheeran', 'Yellow — Coldplay', 'Te Esperaba — Carlos Rivera', 'Lover — Taylor Swift'],
    correct:   1,
    fun:       '«Look at the stars, look how they shine for you» ✦'
  },
  {
    question:  '¿Qué pasó el 12 de agosto?',
    options:   ['Nos dimos el primer beso', 'Primera cita oficial', 'Nos agarramos de la mano por primera vez', 'Te regalé flores'],
    correct:   2,
    fun:       'Desde ese día siempre buscábamos la mano del otro 🤍'
  },
  {
    question:  '¿Qué te di el 11 de agosto porque tenías frío?',
    options:   ['Una chaqueta', 'Una bufanda', 'Un abrigo', 'Mi polera'],
    correct:   3,
    fun:       'Te quedaba muy grande y te veías muy tierna 🥰'
  },
  {
    question:  '¿A dónde viajaste cuando te acompañé al terminal el 15 de agosto?',
    options:   ['Cusco', 'Arequipa', 'Ayacucho', 'Trujillo'],
    correct:   2,
    fun:       'No quería que te fueras, pero ahí estaba'
  },
  {
    question:  '¿Qué había escondido en el ramo que me regalaste el 30 de septiembre?',
    options:   ['Un pokemon', 'Una carta', 'Carrito de Hotwheels', 'Un oso de peluche'],
    correct:   2,
    fun:       'Solo tú podías tener esa idea 😄'
  },
  {
    question:  '¿En qué fecha te pedí que fueras mi novia?',
    options:   ['26 septiembre 2025', '7 noviembre 2025', '1 agosto 2025', '29 septiembre 2025'],
    correct:   1,
    fun:       'A las 4:00 PM. El universo comenzó ese día ✦'
  },
  {
    question:  '¿Cuál es tu nombre completo?',
    options:   ['Luciana', 'Luisiana', 'Luzia', 'Luziana'],
    correct:   3,
    fun:       'Luziana. El nombre más bonito 🌟'
  },
];

const TRIVIA_RESULTS = [
  { min: 8, max: 8, msg: '¡Perfecta! 8 de 8. Sí que nos conocemos bien... o tienes trampa 😄' },
  { min: 6, max: 7, msg: '¡Muy bien! Sabes bastante de nuestra historia 💗' },
  { min: 4, max: 5, msg: '¡Bien! Hay algunos detalles que repasar... o fue la emoción 😊' },
  { min: 0, max: 3, msg: 'Hmm... ¡hay que repasar nuestra historia! Pero te quiero igual 🤍' },
];
