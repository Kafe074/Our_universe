// ─── GALERÍA DE FOTOS ────────────────────────────────────────────────────────
// Para añadir fotos: agregar un objeto { src, title, desc } al array.
// src: ruta relativa desde esta carpeta.
// ─────────────────────────────────────────────────────────────────────────────

const PHOTOS = [
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/first.jpg',
    title: 'Nuestro Comienzo',
    desc:  'Sin pensarlo tomé la foto, y de pronto se volvió mi favorita. En ella podía ver a una persona de la cual podría aprender mucho. Y quién lo diría que terminaríamos enamorándonos. La más bonita coincidencia.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/capybara.jpg',
    title: 'La Primera Foto Juntos',
    desc:  'Fue una semana en la cual nos vimos todos los días y sin pensarlo aquel día pregunté si podía acompañarte y tu respuesta fue sí. Pasamos un bonito tiempo y ahí tomamos nuestra primera foto juntos, la primera de muchas.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/polera.jpg',
    title: 'Mi Polera',
    desc:  'Ese día te di mi polera y ese mismo día me di cuenta de lo mucho que empezabas a importarme, de cómo sentía la necesidad de que te abrigaras, y luego verte con mi polera puesta y que te quedaba muy grande... se sentía bonito. Te veías muy tierna y bonita. Ese día no solo me di cuenta de lo mucho que me importabas, sino que quería siempre estar ahí para cuidarte.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/primera_mano.jpg',
    title: 'La Primera Mano',
    desc:  'En aquel momento en el que me sujetaste la mano, todo se detuvo y solo quería que eso durara para siempre. Fue algo bonito, algo tierno. El hecho de no querer soltar tu mano, y cómo ambos estábamos muy nerviosos, era algo único y muy especial. Desde ese día siempre buscábamos la mano del otro.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/picnic.jpg',
    title: 'El Primer Picnic',
    desc:  'Ese día fue uno de los mejores. El salir contigo, sentarnos, pintar y compartir ese lindo momento fue muy especial. Pero lo que lo hizo más especial fue lo que pasó después: cuando fuimos con Richard y Anita, la carrera que hicimos y el recostarme en tu hombro y poder descansar ahí. Se sentía muy real, muy especial, muy nosotros. Te ibas convirtiendo en mi lugar seguro.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/picnic_2.jpg',
    title: 'Ella Cocinó para Mí',
    desc:  'Fue la vez en la cual me sentí tan nervioso cuando me abrazaste y tenerte tan cerca, que empezaba a pensar que yo también te gustaba.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/rosas_1.jpg',
    title: 'Las Primeras Flores',
    desc:  'Tenía la idea de que regalar rosas era algo vergonzoso: el caminar por la calle con las flores y lo que diría la gente. Pero al pensar que darte flores te sacaría una sonrisa y te alegraría, cambió mi opinión. De camino a entregarte las rosas, solo pensaba en cómo te lo daría, si te gustaría... En ese momento solo quería verte, entregarte las rosas y ver tu sonrisa. Demostrarte que sí me importas mucho y que quería ser yo quien te regale siempre flores.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/boda.jpg',
    title: 'Una Boda Juntos',
    desc:  'Durante todo ese tiempo me fui enamorando de ti, y de cómo tenías un hermoso corazón dispuesto a ayudar. A pesar del cansancio que tenías, te quedabas despierta hasta muy tarde solo para ayudar a otros. Y cómo todo lo hacías con mucho amor y esmero, me iba gustando mucho. Yo, un chico muy enamorado de ti, solo quería acompañarte en las desveladas, en tus actividades, en todo momento.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/rosas_2.jpg',
    title: 'Sorpresa',
    desc:  'Quería darte una sorpresa, solo por bonita. Te mereces todo lo mejor, mi niña hermosa.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/peque%C3%B1os.jpg',
    title: 'Nosotros',
    desc:  'Cuando me enviaste esa foto sentía una emoción muy grande. Que lo hayas hecho tú y darme cuenta de lo muy feliz que me hacías con cada detalle que tenías conmigo... Mi corazón se siente muy alegre contigo a mi lado.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/IMG_4716.jpg',
    title: 'Haciendo Pan',
    desc:  'Recuerdo que le decía indirectamente a Richard que te invitara, porque fue el tiempo en el cual no hablamos. Pero tenía muchas ganas de verte e intentaba encontrar una excusa para poder verte y compartir contigo.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/IMG_4917.jpg',
    title: 'Seguridad',
    desc:  'Una de las cosas que quiero es que te sientas segura cuando estés conmigo, que en mí puedas sentirte en paz y que todo está bien. Quiero estar en tus buenos y malos momentos, cuidando de ti y apoyándote.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/IMG_4813.jpg',
    title: 'Siempre Presente',
    desc:  'Quiero ser quien te apoye en todas tus actividades, en cada momento que sea posible, poder acompañarte y ser de ayuda para ti.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/dedos.jpg',
    title: 'Deditos en una Hoja',
    desc:  'Nuestras manos encajan perfectamente. En ese momento sentí algo tan bonito que no necesitaba nada más para ser feliz. Me di cuenta que contigo sería muy feliz y por eso quiero un futuro a tu lado, que podamos cumplir todas nuestras metas.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/playa.jpg',
    title: 'El Reencuentro en Lima',
    desc:  'La idea de estar juntos conociendo una ciudad nueva me parece un increíble plan. Y qué mejor si lo hacemos también sirviendo al Señor y trabajando en su obra. Lo que más deseo es tenerte a mi lado y poder crecer en Dios juntos, siguiendo los planes que tiene para nosotros.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/graduacion.jpg',
    title: 'Su Graduación',
    desc:  'Fue un hermoso tiempo que pude compartir contigo, en el cual pude conocer a tus papás. Y aumentaron más las ganas de hacer las cosas bien y poder tener un futuro juntos, en el cual tus papás puedan confiar en mí. Estoy muy orgulloso de ti y de todo lo que estás logrando.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/cine.jpg',
    title: 'Juntos Siempre',
    desc:  'Quiero y deseo seguir compartiendo más momentos contigo. Crear más momentos juntos y hermosos recuerdos. Quiero seguir junto a ti en los momentos difíciles y en los buenos. Quiero luchar y perseverar por nuestra relación tan hermosa. Y que cada día me siga enamorando de ti.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678583.jpg',
    title: 'Flores para la más linda',
    desc:  'Una manera de mostrarte mi amor, igual de todas formas ningún ramo se compara a tu belleza.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678573.jpg',
    title: 'Peluche!',
    desc:  'Vi un compartido tuyo y no lo dude dos veces, decidí comprartelo y darte un bonito detalle, un bonito y tierno corderito, tan lindo como lo eres tu mi princesa.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678579.jpg',
    title: 'Heladitos',
    desc:  'Un día tranquilo los dos juntos comiendo un heladito para después buscar nuestras chompas de Spiderman y hacer match juntitos.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678593.jpg',
    title: 'Anillos',
    desc:  'Un anillo, una promesa, la cual cumpliré pronto, y seremos felizmente casados.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678582.jpg',
    title: 'Al cine otra vez!',
    desc:  'Una noche bonita, junto a la compañia perfecta, a pesar de no terminar de ver la pelicula. Fue tan hermoso tener a mi lado y cogerte de la mano y cuidarte.'
  },
    {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678586.jpg',
    title: 'Última salida',
    desc:  'Un bonito tiempo disfrutando cada minuto y pasandolo de lo mejor cada segundo, un momento lleno de risas, abrazos y mucho amor.'
  },
    {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678581.jpg',
    title: 'Nuestra ultima salida en Huancayo',
    desc:  'Y quizas de casualidad al mismo lugar en el nos vimos por primera vez, pero esta vez ya no como dos desconocidos sino como el amor de mi vida, con la personita con la cual todo momento era mejor.'
  },
{
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678577.jpg',
    title: 'Nuestra primera cita virtual',
    desc:  'Y a pesar de la distancia, seguimos tan unidos y con mucho más amor que dar, lindos momentos donde ni la distancia nos puede separar.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/aniversario.jpeg',
    title: 'Viajecito',
    desc:  'Un viaje que nació de la nada, un viaje de improvisto pero fue tan hermoso momento y especial, ya que nos extrañabamos mucho.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678580.jpg',
    title: 'Playita',
    desc:  'Una tarde en la playa junto al amor de mi vida, que más podía desear, simplemente que ese momento sea eterno.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678576.jpg',
    title: 'Shiny',
    desc:  'Mientras tomaba la foto pensaba, ella brilla más que el sol, tan linda mi futura esposa.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678591.jpg',
    title: 'Ayacucho',
    desc:  'Un viaje a Ayacucho a visitar al amor de mi vida y pasar unos días increible, los nervios de punta porque conocería a tu familia pero fue muy bonito.'
  },
  {
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678590.jpg',
    title: 'Paseito',
    desc:  'Salir a pasear, jugar, reir, suspirar, amar, todo eso contigo a mi lado, como le haces para que cada momento a tu lado sea tan especial y hermoso.'
  },
{
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678584.jpg',
    title: 'Cena con tu familia',
    desc:  'La manera en la que me recibieron todos fue tan especial y desde el primer momento me hicieron sentir parte, te amo mi Lulú, también a mis cuñaditos.'
  },
{
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678589.jpg',
    title: 'Café',
    desc:  'La ultima noche en Ayacucho fue una aventura, desde hablar frente a todos en la iglesia, ir al café y atravezar multitudes de gente, correr a casa para llegar temprano pero lo bonito fue que en todo estos momento tu estabas a mi lado, como mi compañera de cada aventura.'
  },
{
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678585.jpg',
    title: 'Noches de series',
    desc:  'Lo bonito y bien que se siente que te intereses por mis gustos y que lo compartas junto a mi. También quería agregar sobre el segundo viaje a Ayacucho pero no tenemos fotito jeje. Fue un hermoso tiempo, a pesar de que se haya acortado, siempre es muy bonito compartir contigo y toda tu familia'
  },
{
    src:   'https://ik.imagekit.io/kafe/Proyecto_GF/image.png',
    title: 'Brithday',
    desc:  'Una de las ultimas fotos, y solo tengo que agradecer por todo lo bonito que me haces sentir, con cada detalle, mensaje, audio, sonrisa que me das es más que suficiente para arreglar un día malo, te amo demasiado linda y ahora tengo un peluche favorito jeje (no se lo digas a los demás).'
  },

];
