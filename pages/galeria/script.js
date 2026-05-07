// ─── GALERÍA ──────────────────────────────────────────────────────────────────

let currentIdx = 0;

// ── Construir la grilla ────────────────────────────────────────────────────
function buildGrid() {
  const grid = document.getElementById('gallery-grid');

  PHOTOS.forEach((photo, i) => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.innerHTML = `
      <img src="${photo.src}" alt="${photo.title}" loading="lazy" />
      <div class="photo-overlay">
        <span class="photo-title">${photo.title}</span>
        <span class="photo-hint">Toca para ver ✦</span>
      </div>`;
    card.addEventListener('click', () => openLightbox(i));
    grid.appendChild(card);
  });
}

// ── Animaciones de entrada con IntersectionObserver ────────────────────────
function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        // Delay escalonado por columna/fila
        const delay = (e.target.dataset.idx % 3) * 80;
        setTimeout(() => e.target.classList.add('visible'), delay);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.photo-card').forEach((card, i) => {
    card.dataset.idx = i;
    observer.observe(card);
  });
}

// ── Lightbox ───────────────────────────────────────────────────────────────
function openLightbox(idx) {
  currentIdx = idx;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function renderLightbox() {
  const photo = PHOTOS[currentIdx];
  const img   = document.getElementById('lightbox-img');

  img.style.opacity = '0';
  img.src = photo.src;
  img.onload = () => { img.style.opacity = '1'; };

  document.getElementById('lb-title').textContent   = photo.title;
  document.getElementById('lb-desc').textContent    = photo.desc;
  document.getElementById('lb-counter').textContent =
    `${currentIdx + 1} / ${PHOTOS.length}`;

  document.getElementById('lb-prev').disabled = currentIdx === 0;
  document.getElementById('lb-next').disabled = currentIdx === PHOTOS.length - 1;
}

function navigate(dir) {
  const next = currentIdx + dir;
  if (next < 0 || next >= PHOTOS.length) return;
  currentIdx = next;
  renderLightbox();
}

// ── Eventos ────────────────────────────────────────────────────────────────
document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => navigate(-1));
document.getElementById('lb-next').addEventListener('click', () => navigate(1));

document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  navigate(1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    navigate(-1);
});

// Swipe táctil en el lightbox
let touchStartX = 0;
document.getElementById('lightbox').addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
});
document.getElementById('lightbox').addEventListener('touchend', e => {
  const dx = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(dx) > 50) navigate(dx > 0 ? 1 : -1);
});

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildGrid();
  initAnimations();
});
