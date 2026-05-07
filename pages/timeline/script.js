// ─── PREPARAR EVENTOS ────────────────────────────────────────────────────────
// Aplanar TIMELINE: asignar el mes a cada evento y filtrar separadores

const EVENTS = (() => {
  let month = '';
  return TIMELINE
    .map(item => {
      if (item.month) { month = item.month; return null; }
      return { ...item, month };
    })
    .filter(Boolean);
})();

// ─── ESTADO ───────────────────────────────────────────────────────────────────

let idx         = 0;
let isAnimating = false;

// ─── RENDER ───────────────────────────────────────────────────────────────────

function render() {
  const ev   = EVENTS[idx];
  const type = ev.type || 'regular';

  const isMajor     = type === 'milestone-major';
  const isMilestone = type === 'milestone' || isMajor;

  const titleClass = isMajor ? 'is-major'
                   : isMilestone ? 'is-milestone' : '';

  document.getElementById('slide').innerHTML = `
    <span class="ev-icon">${ev.icon || '✦'}</span>
    <div class="ev-line"></div>
    <span class="ev-date">${ev.date}</span>
    <h2 class="ev-title ${titleClass}">${ev.title}</h2>
    <p class="ev-desc">${ev.desc}</p>
  `;

  // Cabecera y barra de progreso
  document.getElementById('ev-month').textContent   = ev.month;
  document.getElementById('ev-counter').textContent = `${idx + 1} / ${EVENTS.length}`;
  document.getElementById('progress-bar').style.width =
    `${((idx + 1) / EVENTS.length) * 100}%`;

  // Botones
  document.getElementById('btn-prev').disabled = idx === 0;
  document.getElementById('btn-next').disabled = idx === EVENTS.length - 1;
}

// ─── NAVEGACIÓN ───────────────────────────────────────────────────────────────

async function navigate(dir) {
  const next = idx + dir;
  if (next < 0 || next >= EVENTS.length || isAnimating) return;
  isAnimating = true;

  const slide = document.getElementById('slide');

  // Salida
  slide.classList.add(dir > 0 ? 'exit-up' : 'exit-down');
  await wait(380);

  // Preparar entrada
  idx = next;
  render();
  slide.classList.remove('exit-up', 'exit-down');
  slide.classList.add(dir > 0 ? 'enter-up' : 'enter-down');

  // Un frame para que el browser pinte el estado inicial antes de animar
  await wait(20);
  slide.classList.remove('enter-up', 'enter-down');

  await wait(460);
  isAnimating = false;
}

const wait = ms => new Promise(r => setTimeout(r, ms));

// ─── CONTROLES ────────────────────────────────────────────────────────────────

// Teclado
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault(); navigate(1);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault(); navigate(-1);
  }
});

// Botones
document.getElementById('btn-prev').addEventListener('click', () => navigate(-1));
document.getElementById('btn-next').addEventListener('click', () => navigate(1));

// Swipe táctil
let touchY = 0;
document.addEventListener('touchstart', e => { touchY = e.touches[0].clientY; });
document.addEventListener('touchend',   e => {
  const dy = touchY - e.changedTouches[0].clientY;
  if (Math.abs(dy) > 50) navigate(dy > 0 ? 1 : -1);
});

// ─── ARRANQUE ─────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => render());
