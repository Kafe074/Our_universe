// ─── SETS DE PALABRAS ────────────────────────────────────────────────────────
// Cada set corresponde a una letra. Las 11 letras temáticas deletrean:
//   T · E · A · M · O · L · U · L · I · T · O  →  "TE AMO LULITO" 💗
// Para añadir un nuevo crucigrama: copiar un bloque { letter, title, ... }
//   y añadirlo al array. El motor genera la cuadrícula automáticamente.
// ─────────────────────────────────────────────────────────────────────────────

const WORD_SETS = [
  {
    letter: 'T', title: 'Ternura',
    completionTitle: '¡Crucigrama completado!',
    completionMsg: 'Primera letra desbloqueada: T ·',
    words: [
      { word: 'TRANQUILIDAD', clue: 'Lo que siento cuando estoy contigo.' },
      { word: 'TRAYECTO',     clue: 'El camino que estamos recorriendo juntos.' },
      { word: 'TEMPLANZA',    clue: 'Lo que necesitas en momentos difíciles.' },
      { word: 'TALENTO',      clue: 'Algo que tienes y a veces no reconoces.' },
      { word: 'TERNURA',      clue: 'Lo que transmites incluso sin darte cuenta.' },
      { word: 'TESORO',       clue: 'Lo que eres para mí.' },
      { word: 'TIEMPO',       clue: 'Lo que valoro cuando lo comparto contigo.' },
      { word: 'TU',           clue: 'La persona que siempre elijo.' },
    ]
  },
  {
    letter: 'E', title: 'Especial',
    completionTitle: '¡Crucigrama completado!',
    completionMsg: 'Llevas dos letras: T · E ·',
    words: [
      { word: 'ESPERANZA',  clue: 'Lo que nunca quiero que pierdas.' },
      { word: 'ENTENDER',   clue: 'Lo que intento hacer contigo siempre.' },
      { word: 'ESFUERZO',   clue: 'Lo que das incluso cuando te cuesta.' },
      { word: 'ESPECIAL',   clue: 'Cómo te veo todos los días.' },
      { word: 'ESENCIA',    clue: 'Lo más puro de quien eres.' },
      { word: 'ENERGIA',    clue: 'Lo que transmites cuando estás bien.' },
      { word: 'EMOCION',    clue: 'Lo que siento cuando estoy contigo.' },
      { word: 'ELEGIR',     clue: 'Lo que hago contigo cada día.' },
    ]
  },
  {
    letter: 'A', title: 'Amor',
    completionTitle: '¡Crucigrama completado!',
    completionMsg: 'Tres letras ya: T · E · A ·',
    words: [
      { word: 'ATENCION',  clue: 'Lo que mereces siempre.' },
      { word: 'ALEGRIA',   clue: 'Lo que me das sin darte cuenta.' },
      { word: 'APOYO',     clue: 'Lo que quiero ser para ti siempre.' },
      { word: 'ABRAZO',    clue: 'Lo que quisiera darte cuando estás mal.' },
      { word: 'ANIMO',     clue: 'Lo que intento darte cuando estás triste.' },
      { word: 'AMOR',      clue: 'Lo que siento por ti en todo momento.' },
      { word: 'ALMA',      clue: 'Lo que conecta lo nuestro.' },
      { word: 'AQUI',      clue: 'Donde estoy para ti.' },
    ]
  },
  {
    letter: 'M', title: 'Momentos',
    completionTitle: '¡Crucigrama completado!',
    completionMsg: 'Cuatro letras: T · E · A · M · ¿Lo adivinas?',
    words: [
      { word: 'MOMENTOS',  clue: 'Lo que más valoro contigo.' },
      { word: 'MISTERIO',  clue: 'A veces no sé qué sientes, pero quiero entender.' },
      { word: 'MEJORAR',   clue: 'Lo que quiero hacer por nosotros.' },
      { word: 'MIRADA',    clue: 'Algo tuyo que dice mucho sin palabras.' },
      { word: 'MOTIVO',    clue: 'Razón por la que sonrío.' },
      { word: 'MUNDO',     clue: 'Donde estás tú.' },
      { word: 'MAGIA',     clue: 'Lo que siento cuando estoy contigo.' },
      { word: 'MANOS',     clue: 'Las que quisiera sostener.' },
    ]
  },
  {
    letter: 'O', title: 'Orgullo',
    completionTitle: '¡Crucigrama completado!',
    completionMsg: 'T · E · A · M · O · ¡Ya forman algo! ¿Lo notas?',
    words: [
      { word: 'OPORTUNIDAD', clue: 'Lo que es nuestra relación.' },
      { word: 'OBSTACULOS',  clue: 'Cosas que podemos superar juntos.' },
      { word: 'ORGULLO',     clue: 'Lo que siento por ti.' },
      { word: 'ORIGEN',      clue: 'Donde empezó todo.' },
      { word: 'OBJETIVO',    clue: 'Construir algo bonito contigo.' },
      { word: 'ORACION',     clue: 'Lo que hago por ti.' },
      { word: 'OASIS',       clue: 'Lo que eres en mis días difíciles.' },
      { word: 'OIR',         clue: 'Lo que quiero hacer contigo siempre.' },
    ]
  },
  {
    letter: 'L', title: 'Lulú',
    completionTitle: '¡Crucigrama completado!',
    completionMsg: 'T · E · A · M · O · L · Seis letras... ¿Quién será?',
    words: [
      { word: 'LEALTAD',  clue: 'Base de lo nuestro.' },
      { word: 'LAGRIMAS', clue: 'Lo que quiero evitarte.' },
      { word: 'LOGROS',   clue: 'Lo que tienes aunque no lo veas.' },
      { word: 'LATIR',    clue: 'Lo que hace mi corazón por ti.' },
      { word: 'LENTO',    clue: 'A veces vamos así, y está bien.' },
      { word: 'LADO',     clue: 'Donde quiero estar siempre.' },
      { word: 'LULU',     clue: 'El apodo más bonito para ti.' },
      { word: 'LUZ',      clue: 'Lo que eres en mi vida.' },
    ]
  },
  {
    letter: 'U', title: 'Única',
    completionTitle: '¡Crucigrama completado!',
    completionMsg: 'T · E · A · M · O · L · U · Casi tu nombre...',
    words: [
      { word: 'UNIVERSO', clue: 'Donde todo me lleva a ti.' },
      { word: 'URGENTE',  clue: 'Lo que siento por abrazarte.' },
      { word: 'UTOPIA',   clue: 'Algo que contigo se siente real.' },
      { word: 'UNIDAD',   clue: 'Lo que quiero construir contigo.' },
      { word: 'UNION',    clue: 'Lo que tenemos.' },
      { word: 'UBICAR',   clue: 'Donde siempre estás: en mi mente.' },
      { word: 'UNICA',    clue: 'Cómo te veo.' },
      { word: 'USAR',     clue: 'Lo que hago con cada oportunidad de hablarte.' },
    ]
  },
  {
    letter: 'L', title: 'Luziana',
    completionTitle: '¡Crucigrama completado!',
    completionMsg: 'T · E · A · M · O · L · U · L · Tu nombre aparece...',
    words: [
      { word: 'LIBERTAD', clue: 'Lo que también es amar bien.' },
      { word: 'LATIDOS',  clue: 'Lo que se acelera contigo.' },
      { word: 'LUZIANA',  clue: 'Tu nombre completo.' },
      { word: 'LLEGAR',   clue: 'A donde quiero ir contigo.' },
      { word: 'LOGRAR',   clue: 'Lo que podemos hacer juntos.' },
      { word: 'LUGAR',    clue: 'Donde quiero estar contigo.' },
      { word: 'LUCES',    clue: 'Como tú iluminas mi vida.' },
      { word: 'LINDO',    clue: 'Cómo se siente todo contigo.' },
    ]
  },
  {
    letter: 'I', title: 'Increíble',
    completionTitle: '¡Crucigrama completado!',
    completionMsg: 'T · E · A · M · O · L · U · L · I · Dos letras más...',
    words: [
      { word: 'INSPIRACION', clue: 'Lo que provocas en mí.' },
      { word: 'IMPERFECTO',  clue: 'Lo que somos, y está bien.' },
      { word: 'IMPORTANTE',  clue: 'Lo que eres en mi vida.' },
      { word: 'INCREIBLE',   clue: 'Cómo eres para mí.' },
      { word: 'INTENTAR',    clue: 'Lo que nunca dejaré de hacer.' },
      { word: 'INTENSO',     clue: 'Cómo se siente esto a veces.' },
      { word: 'ILUSION',     clue: 'Lo que tengo contigo.' },
      { word: 'INICIO',      clue: 'Lo que somos aún.' },
    ]
  },
  {
    letter: 'T', title: 'Todo',
    completionTitle: '¡Crucigrama completado!',
    completionMsg: 'T · E · A · M · O · L · U · L · I · T · ¡Una sola letra!',
    words: [
      { word: 'TOLERAR',  clue: 'Parte de amar.' },
      { word: 'TENERTE',  clue: 'Lo que agradezco.' },
      { word: 'TRATAR',   clue: 'De hacerlo mejor siempre.' },
      { word: 'TARDE',    clue: 'Las llamadas que no quiero que terminen.' },
      { word: 'TOMAR',    clue: 'Decisiones juntos.' },
      { word: 'TENTAR',   clue: 'A seguir adelante juntos.' },
      { word: 'TENER',    clue: 'Lo que siento contigo.' },
      { word: 'TODO',     clue: 'Lo que daría por ti.' },
    ]
  },
  {
    letter: 'O', title: 'Olvidar',
    completionTitle: '¡Las 11 letras completadas! 💗',
    completionMsg: 'T · E · A · M · O · L · U · L · I · T · O\n\n"TE AMO LULITO"\n\nCada crucigrama era una letra. Cada palabra, un sentimiento real. ❤️',
    words: [
      { word: 'OFRECER',   clue: 'Lo que quiero darte siempre.' },
      { word: 'OBSERVAR',  clue: 'Lo que hago cuando te admiro.' },
      { word: 'OLVIDAR',   clue: 'Lo que nunca haría contigo.' },
      { word: 'OCASION',   clue: 'Cada momento contigo.' },
      { word: 'OPINION',   clue: 'Lo que valoro de ti.' },
      { word: 'ORGULLO',   clue: 'Lo que siento por ti.' },
      { word: 'ORDEN',     clue: 'Lo que traes a mi vida.' },
      { word: 'OBRAR',     clue: 'Lo que Dios hace en nosotros.' },
    ]
  },
  {
    letter: '✦', title: 'Nuestras Palabras',
    completionTitle: '¡Crucigrama final completado! 💗',
    completionMsg: 'Estas palabras son solo el comienzo de todo lo que quiero decirte. Siempre habrá más. ❤️',
    words: [
      { word: 'DISTANCIA',  clue: 'Lo que a veces duele pero enseña.' },
      { word: 'CONSUELO',   clue: 'Lo que quiero darte cuando lloras.' },
      { word: 'PACIENCIA',  clue: 'Lo que estamos aprendiendo.' },
      { word: 'ESPERAR',    clue: 'Lo que hago con paciencia por nosotros.' },
      { word: 'PROCESO',    clue: 'Cada etapa que vivimos.' },
      { word: 'SONRISA',    clue: 'Lo que me cambia el día.' },
      { word: 'ABRIGO',     clue: 'Lo que quiero ser para ti.' },
      { word: 'CRECER',     clue: 'Lo que estamos haciendo juntos.' },
      { word: 'FUERZA',     clue: 'Lo que tienes en momentos difíciles.' },
      { word: 'VALOR',      clue: 'Lo que tienes aunque dudes.' },
      { word: 'DIOS',       clue: 'Quien guía lo nuestro.' },
    ]
  }
];
