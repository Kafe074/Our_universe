// ─── SETS DE PUPILETRAS ──────────────────────────────────────────────────────
// Para añadir un nuevo set: copiar un bloque y añadirlo al array.
// Palabras sin tildes (el motor las normaliza).
// ─────────────────────────────────────────────────────────────────────────────

const WORD_SETS = [
  {
    title: 'Amor y Calma',
    completionMsg: 'Contigo encontré calma, hogar y un amor que hace latir mi corazón 🤍',
    words: [
      { word: 'AMOR',    clue: 'Lo que siento por ti' },
      { word: 'ABRAZO',  clue: 'Refugio que quisiera ser' },
      { word: 'CALMA',   clue: 'Lo que traes a mi vida' },
      { word: 'HOGAR',   clue: 'Lo que siento cuando estás cerca' },
      { word: 'LUZ',     clue: 'Lo que eres en mi oscuridad' },
      { word: 'CONTIGO', clue: 'La palabra que lo cambia todo' },
      { word: 'LATIDOS', clue: 'Lo que se acelera cuando te pienso' },
    ]
  },
  {
    title: 'Universo',
    completionMsg: 'En este universo infinito, tú siempre serás mi luz más bonita ✨',
    words: [
      { word: 'ESTRELLAS',    clue: 'Lo que miro y pienso en ti' },
      { word: 'UNIVERSO',     clue: 'Donde todo me lleva a ti' },
      { word: 'DESTELLO',     clue: 'Como tú iluminas mi día' },
      { word: 'LUZ',          clue: 'Lo que eres para mí' },
      { word: 'INFINITO',     clue: 'Cuánto te quiero' },
      { word: 'CONSTELACION', clue: 'Lo que formamos juntos' },
    ]
  },
  {
    title: 'Fe y Proceso',
    completionMsg: 'Dios sigue guiando nuestro proceso, incluso en los días donde cuesta creer 🤍',
    words: [
      { word: 'DIOS',      clue: 'Quien guía lo nuestro' },
      { word: 'PROCESO',   clue: 'Cada etapa que vivimos' },
      { word: 'ESPERANZA', clue: 'Lo que nunca quiero que pierdas' },
      { word: 'CRECER',    clue: 'Lo que hacemos juntos' },
      { word: 'PACIENCIA', clue: 'Lo que estamos aprendiendo' },
      { word: 'FIRME',     clue: 'Cómo quiero que te mantengas' },
    ]
  },
  {
    title: 'Distancia',
    completionMsg: 'Aunque la distancia duela, siempre vale la pena esperar por ti 🕊️',
    words: [
      { word: 'DISTANCIA', clue: 'Lo que a veces duele pero enseña' },
      { word: 'TIEMPO',    clue: 'Lo que valoro cuando lo comparto contigo' },
      { word: 'EXTRANAR',  clue: 'Lo que hago cuando no estás' },
      { word: 'ESPERAR',   clue: 'Lo que hago con paciencia por nosotros' },
      { word: 'JUNTOS',    clue: 'A donde siempre quiero volver' },
    ]
  },
  {
    title: 'Yellow',
    completionMsg: 'Mira las estrellas… todo lo que hago, lo hago por ti 💛',
    words: [
      { word: 'YELLOW',    clue: 'La canción que nos conecta' },
      { word: 'COLDPLAY',  clue: 'La banda de nuestra canción' },
      { word: 'LUZ',       clue: 'Lo que eres en mi vida' },
      { word: 'BRILLAR',   clue: 'Lo que haces sin darte cuenta' },
      { word: 'CIELO',     clue: 'Donde están las estrellas para ti' },
      { word: 'ESTRELLAS', clue: 'Look how they shine for you' },
    ]
  }
];

const FINAL_MESSAGE = 'Si encontraste todas las palabras, entonces ya sabes un poco de lo que siento por ti. 🤍';
