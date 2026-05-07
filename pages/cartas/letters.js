// ─── CARTAS PARA TI ───────────────────────────────────────────────────────────
// Para editar una carta: busca el objeto con el id correspondiente
// y reemplaza el texto dentro de los párrafos.
// Puedes añadir tantos párrafos como quieras al array "body".
// ─────────────────────────────────────────────────────────────────────────────

const LETTERS = [
  {
    id: 'triste',
    label: 'Cuando estés triste',
    sublabel: 'Para esos días grises',
    icon: '🌧️',
    accent: '#88b0e0',
    accentGlow: 'rgba(80,130,210,.5)',
    salutation: 'Mi amor,',
    body: [
      'Sé que hay días donde todo pesa más de lo normal… días donde tu corazón se cansa, donde piensas demasiado y donde incluso sonreír cuesta un poquito más. Y aunque a veces no sepas cómo explicarlo, quiero que recuerdes algo muy importante: no tienes que pasar esos momentos sola.',
      
      'Yo estoy aquí para ti, incluso en esos días donde no sabes qué decir, donde quieres silencio o simplemente alguien que se quede contigo sin pedirte nada. No necesito que seas perfecta, fuerte o que tengas todo resuelto para amarte. Te amo también en tus momentos más frágiles, más sensibles y más humanos.',
      
      'Ojalá pudieras verte como yo te veo… porque incluso cuando tú sientes que no brillas, yo sigo viendo una persona increíble, llena de luz, ternura y un corazón hermoso. Nunca dudes del valor que tienes.',
      
      'Y aunque no siempre pueda arreglar lo que sientes, sí quiero acompañarte en cada proceso, abrazarte en tus días difíciles y recordarte que siempre tendrás un lugar seguro conmigo.'
    ],
    closing: 'Siempre contigo,',
    signature: 'Itito'
  },

  {
    id: 'alegre',
    label: 'Cuando estés alegre',
    sublabel: 'Para esos días que brillan',
    icon: '☀️',
    accent: '#f0c870',
    accentGlow: 'rgba(200,150,30,.5)',
    salutation: 'Lulú hermosa,',
    body: [
      'No sabes cuánto amo verte feliz. De verdad… hay algo en tu sonrisa que cambia completamente mis días. Cuando estás bien, cuando te emocionas por algo, cuando te ríes sin darte cuenta, siento una tranquilidad muy bonita en el corazón.',
      
      'Tu alegría tiene una forma especial de iluminar todo alrededor. Incluso en los momentos simples, haces que todo se sienta más bonito. Y sinceramente, una de las cosas que más deseo en esta vida es seguir viendo esa sonrisa muchas veces más.',
      
      'Guarda estos momentos felices, amor. Recuérdalos en los días difíciles y nunca olvides que mereces sentirte así de bien. Mereces paz, tranquilidad, amor y personas que te hagan sentir querida.',
      
      'Y yo… quiero ser una de esas personas que siempre aporte luz a tu vida.'
    ],
    closing: 'Feliz de verte sonreír,',
    signature: 'Itito'
  },

  {
    id: 'duda',
    label: 'Cuando dudes de ti',
    sublabel: 'Para cuando no te veas como yo te veo',
    icon: '🌟',
    accent: '#80d8a0',
    accentGlow: 'rgba(50,170,80,.5)',
    salutation: 'Amor,',
    body: [
      'Sé que a veces eres muy dura contigo misma. Sé que hay momentos donde sientes que no avanzas suficiente, donde comparas tus procesos o donde piensas que no eres tan buena como los demás. Pero quiero que por un momento pares y escuches esto:',
      
      'Eres muchísimo más valiosa de lo que imaginas. Y no lo digo por decirlo… lo veo en tu forma de amar, en cómo te preocupas por otros, en cómo intentas hacer las cosas bien incluso cuando te cuesta. Veo una mujer fuerte, sensible, inteligente y con un corazón precioso.',
      
      'Admiro muchísimo la persona que eres. Me inspiras a ser mejor y me haces sentir orgulloso todos los días, incluso en esos momentos donde tú no logras verlo.',
      
      'No necesitas ser perfecta para que te amen. Para mí ya eres alguien increíble tal y como eres.'
    ],
    closing: 'Creyendo siempre en ti,',
    signature: 'Itito'
  },

  {
    id: 'extrana',
    label: 'Cuando me extrañes',
    sublabel: 'Para cuando la distancia duela',
    icon: '🕊️',
    accent: '#e8a0b8',
    accentGlow: 'rgba(200,80,120,.5)',
    salutation: 'Mi Lulú,',
    body: [
      'Si estás leyendo esto, probablemente me estés extrañando… y quiero que sepas algo: yo también te extraño muchísimo. Extraño hablar contigo, escuchar tu voz, compartir incluso las cosas más pequeñas contigo.',
      
      'No es fácil la distancia. A veces duele más de lo que podemos explicar, porque cuando amas de verdad a alguien, cualquier ausencia se siente enorme. Pero incluso en medio de eso, hay algo bonito: cada momento lejos de ti me hace valorar aún más tenerte.',
      
      'Y aunque ahora existan despedidas, tiempos ocupados o momentos donde no podemos estar juntos como quisiéramos, sigo creyendo con todo mi corazón que valdrá la pena.',
      
      'Porque honestamente… sueño con el día donde ya no tengamos que extrañarnos así. Donde podamos compartir la vida juntos, acompañarnos en todo y construir ese futuro bonito que tantas veces imagino contigo.'
    ],
    closing: 'Contando los días,',
    signature: 'Tu Itito'
  },

  {
    id: 'amor',
    label: 'Cuánto te amo',
    sublabel: 'Para cuando quieras recordarlo',
    icon: '💗',
    accent: '#f0a870',
    accentGlow: 'rgba(210,120,50,.5)',
    salutation: 'Lu,',
    body: [
      'Te amo más de lo que muchas veces logro explicar con palabras. Y aunque intento demostrártelo de muchas formas, siento que nunca será suficiente para expresar todo lo que provocas en mi corazón.',
      
      'Amo tu forma de ser, tu ternura, tus pensamientos, tu sensibilidad, tu manera de preocuparte por otros, incluso tus pequeños detalles y las cosas que tal vez tú consideras insignificantes. Para mí, todo eso te hace única.',
      
      'No quiero un amor pasajero contigo. No quiero algo que simplemente “se siente bonito”. Quiero construir una vida contigo. Quiero acompañarte en cada etapa, apoyarte cuando estés cansada, celebrar tus logros, abrazarte en tus días difíciles y crecer juntos de verdad.',
      
      'Sueño con hacer las cosas bien contigo. Sueño con un futuro donde podamos mirarnos y decir: “valió la pena quedarnos”. Y sí… también sueño con casarme contigo algún día, formar un hogar bonito y seguir eligiéndote incluso después de muchos años.',
      
      'Gracias por existir, por llegar a mi vida y por convertirte en alguien tan importante para mí. Eres de las cosas más bonitas que me han pasado.'
    ],
    closing: 'Con todo lo que soy,',
    signature: 'Itito'
  },
];