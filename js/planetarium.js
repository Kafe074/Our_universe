/* ══════════════════════════════════════
   CURSOR
══════════════════════════════════════ */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = innerWidth / 2, my = innerHeight / 2;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = ring.style.left = mx + 'px';
  cur.style.top = ring.style.top = my + 'px';
});
window.addEventListener('touchstart', () => { cur.style.display = ring.style.display = 'none' }, { once: true });

/* ══════════════════════════════════════
   STAR BACKGROUND
══════════════════════════════════════ */
const bgC = document.getElementById('bg-canvas');
const bgX = bgC.getContext('2d');
let W = innerWidth, H = innerHeight, bgStars = [];

function resizeBg() { W = bgC.width = innerWidth; H = bgC.height = innerHeight; }
resizeBg();
window.addEventListener('resize', () => { resizeBg(); buildBgStars(); resizeSolar(); });

function buildBgStars() {
  bgStars = [];
  const n = Math.floor(W * H / 3600);
  for (let i = 0; i < n; i++) {
    const t = Math.random();
    let col = t < .06 ? 'rgba(255,220,170,' : t < .11 ? 'rgba(170,190,255,' : 'rgba(240,230,210,';
    bgStars.push({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() < .04 ? Math.random() * 2 + 1.3 : Math.random() * 1.4 + .22,
      a: Math.random(), da: (Math.random() * .005 + .001) * (Math.random() < .5 ? 1 : -1),
      mn: Math.random() * .06 + .02, mx: Math.random() * .65 + .28, col
    });
  }
}
buildBgStars();

(function drawBg() {
  bgX.clearRect(0, 0, W, H);
  for (const s of bgStars) {
    s.a += s.da; if (s.a > s.mx || s.a < s.mn) s.da *= -1;
    bgX.beginPath(); bgX.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    bgX.fillStyle = s.col + s.a + ')'; bgX.fill();
  }
  requestAnimationFrame(drawBg);
})();

/* ══════════════════════════════════════
   PLANETS DATA
══════════════════════════════════════ */
const PLANETS = [
  {
    label: 'El Principio', name: 'La Propuesta',
    desc: 'El día que dijiste que sí y todo comenzó.',
    url: 'pages/ForLulito-main/index.html',
    orbitFrac: .13, size: 21, speed: .00042, angle: .8,
    hi: '#e09078', mid: '#b05840', shad: '#702820', edge: '#501810',
    band: 'rgba(90,30,15,.15)', atm: 'rgba(200,80,60,.14)',
    glow: 'rgba(200,80,60,.6)', specular: .22,
  },
  {
    label: 'Cada Segundo', name: 'Siempre Juntos',
    desc: 'Cada segundo contigo es uno que guardo para siempre.',
    url: 'pages/together/index.html',
    orbitFrac: .20, size: 17, speed: .00028, angle: 2.5,
    hi: '#e8c070', mid: '#c09040', shad: '#804810', edge: '#502800',
    band: 'rgba(100,50,0,.12)', atm: 'rgba(220,160,60,.14)',
    glow: 'rgba(210,150,50,.55)', specular: .18,
  },
  {
    label: 'Nuestro Primer Mes', name: 'El Primer Capítulo',
    desc: 'La polera, el picnic, las rosas, la boda.',
    url: 'pages/First_Month/index.html',
    orbitFrac: .29, size: 31, speed: .00016, angle: 4.2,
    hi: '#90b8e8', mid: '#4870c0', shad: '#1840a0', edge: '#0c2870',
    band: 'rgba(20,50,140,.18)', atm: 'rgba(70,110,220,.16)',
    glow: 'rgba(60,100,220,.55)', specular: .28,
    ring: true, ringCol: 'rgba(140,170,230,.22)',
  },
  {
    label: 'Un Detalle', name: 'Flores para Ti',
    desc: 'Porque siempre te mereces flores.',
    url: 'pages/flowers-main/index.html',
    orbitFrac: .38, size: 20, speed: .000115, angle: 1.1,

    // 🌼 PALETA YELLOW (elegante y cálida)
    hi: '#ffe27a',      // luz principal (amarillo suave brillante)
    mid: '#ffc94d',     // tono base
    shad: '#b88a1a',    // sombra cálida
    edge: '#5a4200',    // borde profundo

    band: 'rgba(255, 210, 90, .18)',
    atm: 'rgba(255, 220, 120, .16)',
    glow: 'rgba(255, 215, 80, .55)',

    specular: .2,
  },
  {
    label: '14 de Febrero', name: 'San Valentín',
    desc: '¿Quieres ser mi San Valentín? Ya sé la respuesta.',
    url: 'pages/want/index.html',
    orbitFrac: .47, size: 23, speed: .000088, angle: 3.4,
    hi: '#d880b8', mid: '#b04888', shad: '#702058', edge: '#400030',
    band: 'rgba(80,0,60,.15)', atm: 'rgba(210,70,160,.14)',
    glow: 'rgba(200,60,150,.55)', specular: .20,
  },
  {
    label: 'Tres Meses', name: 'Seguimos Escribiendo',
    desc: 'Tres meses de algo real. Y quedan tantos más.',
    url: 'pages/Three months/index.html',
    orbitFrac: .57, size: 27, speed: .000055, angle: 5.6,
    hi: '#80c8d8', mid: '#3888a8', shad: '#185878', edge: '#0a3050',
    band: 'rgba(10,60,100,.16)', atm: 'rgba(50,160,200,.14)',
    glow: 'rgba(40,150,195,.55)', specular: .26,
    ring: true, ringCol: 'rgba(100,200,230,.2)',
  },
];

/* ══════════════════════════════════════
   SOLAR CANVAS LOGIC
══════════════════════════════════════ */
const sc = document.getElementById('solar-canvas');
const sx = sc.getContext('2d');
let cx, cy, minD;

function resizeSolar() {
  sc.width = innerWidth;
  sc.height = innerHeight;
  cx = sc.width / 2; cy = sc.height / 2;
  minD = Math.min(sc.width, sc.height);
}
resizeSolar();

const sunR = () => minD * 0.054;

function drawSphere(ctx, px, py, r, p) {
  ctx.save();
  ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.clip();
  const lx = px - r * .38, ly = py - r * .42;
  const g = ctx.createRadialGradient(lx, ly, r * .04, px, py, r * 1.05);
  g.addColorStop(0, p.hi); g.addColorStop(.35, p.mid);
  g.addColorStop(.72, p.shad); g.addColorStop(1, p.edge);
  ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
  ctx.fillStyle = g; ctx.fill();
  for (let b = 0; b < 4; b++) {
    const by = py - r * .6 + b * r * .42;
    const bh = r * (.08 + b * .03);
    ctx.beginPath(); ctx.ellipse(px, by, r * .92, bh, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.band; ctx.fill();
  }
  const shadow = ctx.createRadialGradient(px + r * .3, py + r * .1, r * .5, px + r * .3, py + r * .1, r * 1.2);
  shadow.addColorStop(0, 'rgba(0,0,0,0)'); shadow.addColorStop(.6, 'rgba(0,0,0,.08)');
  shadow.addColorStop(1, 'rgba(0,0,0,.45)');
  ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
  ctx.fillStyle = shadow; ctx.fill();
  const spec = ctx.createRadialGradient(lx + r * .08, ly + r * .1, 0, lx + r * .08, ly + r * .1, r * .45);
  spec.addColorStop(0, `rgba(255,255,255,${p.specular})`);
  spec.addColorStop(.5, `rgba(255,255,255,${p.specular * .3})`);
  spec.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
  ctx.fillStyle = spec; ctx.fill();
  const limb = ctx.createRadialGradient(px, py, r * .55, px, py, r);
  limb.addColorStop(0, 'rgba(0,0,0,0)'); limb.addColorStop(1, 'rgba(0,0,0,.42)');
  ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
  ctx.fillStyle = limb; ctx.fill();
  ctx.restore();
  const aHalo = ctx.createRadialGradient(px, py, r * .8, px, py, r * 1.55);
  aHalo.addColorStop(0, p.atm); aHalo.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath(); ctx.arc(px, py, r * 1.55, 0, Math.PI * 2);
  ctx.fillStyle = aHalo; ctx.fill();
}

function drawRing(ctx, px, py, r, col) {
  ctx.save();
  ctx.translate(px, py); ctx.scale(1, .26);
  ctx.beginPath(); ctx.arc(0, 0, r * 1.75, 0, Math.PI * 2);
  ctx.strokeStyle = col; ctx.lineWidth = r * .6; ctx.stroke();
  ctx.restore();
}

function drawSun(ctx, t) {
  const r = sunR();
  const pulse = 1 + Math.sin(t * .0007) * .035;
  const coronas = [{ s: 3.4, a: .02, c: '255,200,80' }, { s: 2.4, a: .045, c: '255,180,50' }, { s: 1.7, a: .085, c: '255,150,30' }, { s: 1.28, a: .16, c: '255,130,20' }];
  for (const g of coronas) {
    const cg = ctx.createRadialGradient(cx, cy, r * .3, cx, cy, r * g.s * pulse);
    cg.addColorStop(0, `rgba(${g.c},${g.a})`); cg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath(); ctx.arc(cx, cy, r * g.s * pulse, 0, Math.PI * 2);
    ctx.fillStyle = cg; ctx.fill();
  }
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
  const sg = ctx.createRadialGradient(cx - r * .28, cy - r * .28, r * .04, cx, cy, r);
  sg.addColorStop(0, '#fffce0'); sg.addColorStop(.2, '#ffe878'); sg.addColorStop(.55, '#ffb830'); sg.addColorStop(.82, '#e07810'); sg.addColorStop(1, '#903800');
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = sg; ctx.fill();
  ctx.restore();
}

const tooltip = document.getElementById('tooltip');
const ttLabel = document.getElementById('tt-label');
const ttName = document.getElementById('tt-name');
const ttDesc = document.getElementById('tt-desc');
let hovered = null;
const angles = PLANETS.map(p => p.angle);

function getPlanetPos(i) {
  const orbitPx = PLANETS[i].orbitFrac * minD;
  return { x: cx + Math.cos(angles[i]) * orbitPx, y: cy + Math.sin(angles[i]) * orbitPx };
}

sc.addEventListener('mousemove', e => {
  let found = null;
  for (let i = 0; i < PLANETS.length; i++) {
    const { x, y } = getPlanetPos(i);
    if (Math.hypot(e.clientX - x, e.clientY - y) < PLANETS[i].size + 14) { found = i; break; }
  }
  hovered = found;
  if (found !== null) {
    const p = PLANETS[found];
    ttLabel.textContent = p.label; ttName.textContent = p.name; ttDesc.textContent = p.desc;
    tooltip.style.left = e.clientX + 'px'; tooltip.style.top = e.clientY + 'px';
    tooltip.classList.add('show');
  } else { tooltip.classList.remove('show'); }
});
sc.addEventListener('click', () => { if (hovered !== null) window.location.href = PLANETS[hovered].url; });

function render(t) {
  sx.clearRect(0, 0, sc.width, sc.height);
  for (let i = 0; i < PLANETS.length; i++) {
    const orbitPx = PLANETS[i].orbitFrac * minD;
    sx.beginPath(); sx.arc(cx, cy, orbitPx, 0, Math.PI * 2);
    sx.strokeStyle = 'rgba(240,230,210,.048)'; sx.lineWidth = 1; sx.stroke();
  }
  drawSun(sx, t);
  for (let i = 0; i < PLANETS.length; i++) {
    const p = PLANETS[i]; angles[i] += p.speed;
    const orbitPx = p.orbitFrac * minD;
    const px = cx + Math.cos(angles[i]) * orbitPx; const py = cy + Math.sin(angles[i]) * orbitPx;
    const isH = (hovered === i); const r = isH ? p.size * 1.14 : p.size;
    if (p.ring) { sx.save(); sx.beginPath(); sx.rect(px - r * 2, py - r * 2, r * 4, r); sx.clip(); drawRing(sx, px, py, r, p.ringCol); sx.restore(); }
    drawSphere(sx, px, py, r, p);
    if (p.ring) { sx.save(); sx.beginPath(); sx.rect(px - r * 2, py, r * 4, r * 2); sx.clip(); drawRing(sx, px, py, r, p.ringCol); sx.restore(); }
    if (isH) { sx.beginPath(); sx.arc(px, py, r + 9, 0, Math.PI * 2); sx.strokeStyle = p.glow; sx.lineWidth = 2; sx.stroke(); }
  }
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

// Counter
const START = new Date('2025-11-07T16:00:00');
const dEl = document.getElementById('cd-days'), hEl = document.getElementById('cd-h'), mEl = document.getElementById('cd-m'), sEl = document.getElementById('cd-s');
function updateCounter() {
  const diff = Date.now() - START; if (diff < 0) return;
  dEl.textContent = Math.floor(diff / 86400000);
  hEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
  mEl.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  sEl.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
}
setInterval(updateCounter, 1000); updateCounter();

// Configuración de Playlist
const playlist = [
  { title: "Nuestra Canción 1", src: "audio/cancion1.mp3" },
  { title: "Momento Especial", src: "audio/cancion2.mp3" },
  { title: "Eternidad", src: "audio/cancion3.mp3" }
];

let currentTrack = 0;
const audio = new Audio(playlist[currentTrack].src);
audio.volume = 0.7;

const playBtn = document.getElementById('play-btn');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const trackTitle = document.getElementById('player-title');
const progressBar = document.getElementById('player-progress');

// Función para cargar canción
function loadTrack(index) {
  audio.src = playlist[index].src;
  trackTitle.textContent = "♪ " + playlist[index].title;
}

// Play / Pause
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
  } else {
    audio.pause();
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
  }
});

// Actualizar barra de progreso
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + '%';
});

// Siguiente canción automática
audio.addEventListener('ended', () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
});

// Inicializar primer título
trackTitle.textContent = "♪ " + playlist[currentTrack].title;

/* ══════════════════════════════════════
   NAVEGACIÓN INTERNA (IFRAME)
══════════════════════════════════════ */
const overlay = document.getElementById('planet-overlay');
const frame = document.getElementById('planet-frame');
const closeBtn = document.getElementById('close-planet');

sc.addEventListener('click', () => {
  if (hovered !== null) {
    const targetUrl = PLANETS[hovered].url;

    // Mostramos el overlay con un efecto de fade
    overlay.style.display = 'block';
    overlay.style.opacity = '0';

    // Cargamos la URL
    frame.src = targetUrl;

    // Animación de entrada
    setTimeout(() => {
      overlay.style.transition = 'opacity 0.8s ease';
      overlay.style.opacity = '1';
    }, 10);
  }
});

closeBtn.addEventListener('click', () => {
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
    frame.src = ""; // Limpiamos para ahorrar recursos
  }, 800);
});