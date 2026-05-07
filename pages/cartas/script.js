// ─── CONSTRUIR TARJETAS ───────────────────────────────────────────────────────

function buildCards() {
  const grid = document.getElementById('letters-grid');

  LETTERS.forEach(letter => {
    const card = document.createElement('div');
    card.className = 'letter-card';
    card.style.setProperty('--accent',      letter.accent);
    card.style.setProperty('--accent-glow', letter.accentGlow);
    card.style.setProperty('box-shadow',    `0 0 28px ${letter.accentGlow}`);

    card.innerHTML = `
      <span class="card-icon">${letter.icon}</span>
      <span class="card-label">${letter.label}</span>
      <span class="card-sublabel">${letter.sublabel}</span>
      <span class="card-btn">Leer carta ✦</span>`;

    card.addEventListener('click', () => openLetter(letter));
    grid.appendChild(card);
  });
}

// ─── ABRIR CARTA ─────────────────────────────────────────────────────────────

function openLetter(letter) {
  const paper   = document.getElementById('letter-paper');
  const overlay = document.getElementById('letter-overlay');

  // Aplicar color de acento de esta carta
  paper.style.setProperty('--letter-accent', letter.accent);
  paper.style.setProperty('--letter-glow',   letter.accentGlow);

  // Renderizar contenido
  document.getElementById('letter-salutation').textContent = letter.salutation;
  document.getElementById('letter-body').innerHTML =
    letter.body.map(p => `<p class="letter-paragraph">${p}</p>`).join('');
  document.getElementById('letter-closing').textContent   = letter.closing;
  document.getElementById('letter-signature').textContent = letter.signature;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLetter() {
  document.getElementById('letter-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── EVENTOS ─────────────────────────────────────────────────────────────────

document.getElementById('letter-close').addEventListener('click', closeLetter);

document.getElementById('letter-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('letter-overlay')) closeLetter();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLetter();
});

// ─── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', buildCards);
