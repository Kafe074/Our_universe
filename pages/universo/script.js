// ─── CANVAS DE PARTÍCULAS (HERO) ──────────────────────────────────────────────

function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  const ctx    = canvas.getContext('2d');

  let W, H;
  const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  // Partículas: puntos dorados que suben lentamente y parpadean
  const particles = Array.from({ length: 90 }, () => ({
    x:       Math.random() * innerWidth,
    y:       Math.random() * innerHeight,
    r:       Math.random() * 1.4 + 0.3,
    speed:   Math.random() * 0.25 + 0.08,
    phase:   Math.random() * Math.PI * 2,
    drift:   (Math.random() - 0.5) * 0.3,
    baseOp:  Math.random() * 0.4 + 0.08,
  }));

  (function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() * 0.0008;

    particles.forEach(p => {
      p.y     -= p.speed;
      p.x     += p.drift;
      if (p.y < -8)  { p.y = H + 8;  p.x = Math.random() * W; }
      if (p.x < -8)  p.x = W + 8;
      if (p.x > W+8) p.x = -8;

      const op = p.baseOp * (0.6 + 0.4 * Math.sin(t + p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,210,120,${op})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  })();
}

// ─── QUOTE CAROUSEL ───────────────────────────────────────────────────────────

const QUOTES = [
  'Eres más fuerte de lo que crees.',
  'Tu corazón es de las cosas más bonitas que he conocido.',
  'No necesitas ser perfecta para ser increíble.',
  'Tu luz nunca deja de brillar, incluso en tus días grises.',
  'Amarte se siente como hogar.',
];

let qIdx   = 0;
let qTimer = null;

function showQuote(idx, dir = 1) {
  const el = document.getElementById('quote-text');

  el.style.transition = 'none';
  el.style.opacity    = '0';
  el.style.transform  = `translateY(${dir * 22}px)`;

  setTimeout(() => {
    el.textContent      = QUOTES[idx];
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    el.style.opacity    = '1';
    el.style.transform  = 'translateY(0)';

    document.querySelectorAll('.q-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }, 60);
}

function nextQuote() { qIdx = (qIdx + 1) % QUOTES.length; showQuote(qIdx, 1);  resetQTimer(); }
function prevQuote() { qIdx = (qIdx - 1 + QUOTES.length) % QUOTES.length; showQuote(qIdx, -1); resetQTimer(); }
function resetQTimer() { clearInterval(qTimer); qTimer = setInterval(nextQuote, 5000); }

function initQuotes() {
  // Crear dots
  const dotsWrap = document.getElementById('q-dots');
  QUOTES.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'q-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => { qIdx = i; showQuote(i, 0); resetQTimer(); });
    dotsWrap.appendChild(d);
  });

  document.getElementById('q-prev').addEventListener('click', prevQuote);
  document.getElementById('q-next').addEventListener('click', nextQuote);

  showQuote(0);
  qTimer = setInterval(nextQuote, 5000);
}

// ─── CIERRE — SPARKLES ────────────────────────────────────────────────────────

function initSparkles() {
  const text   = document.getElementById('closing-text');
  const CHARS  = ['✦', '✧', '⭐', '·', '✦', '✦'];
  let lastTime = 0;

  text.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastTime < 80) return; // max ~12 sparkles/s
    lastTime = now;

    const sp = document.createElement('div');
    sp.className   = 'sparkle';
    sp.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];

    const dx = (Math.random() - 0.5) * 80 + 'px';
    const dy = -(Math.random() * 60 + 20)  + 'px';
    sp.style.setProperty('--dx', dx);
    sp.style.setProperty('--dy', dy);
    sp.style.left = e.clientX + 'px';
    sp.style.top  = e.clientY + 'px';

    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 900);
  });
}

// ─── SCROLL ANIMATIONS ────────────────────────────────────────────────────────

function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.10 });

  document.querySelectorAll('.section, #cierre').forEach(el => obs.observe(el));
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initQuotes();
  initSparkles();
  initScrollReveal();
});
