// ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────

const MEMO_PHOTOS = [
  'https://ik.imagekit.io/kafe/Proyecto_GF/first.jpg?updatedAt=1778117537229',
  'https://ik.imagekit.io/kafe/Proyecto_GF/capybara.jpg?updatedAt=1778117536503',
  'https://ik.imagekit.io/kafe/Proyecto_GF/polera.jpg?updatedAt=1778117537214',
  'https://ik.imagekit.io/kafe/Proyecto_GF/primera_mano.jpg?updatedAt=1778117537259',
  'https://ik.imagekit.io/kafe/Proyecto_GF/picnic.jpg?updatedAt=1778117537004',
  'https://ik.imagekit.io/kafe/Proyecto_GF/rosas_1.jpg?updatedAt=1778117536666',
  'https://ik.imagekit.io/kafe/Proyecto_GF/boda.jpg?updatedAt=1778117537050',
  'https://ik.imagekit.io/kafe/Proyecto_GF/dedos.jpg?updatedAt=1778117536891',
];

const PUZZLE_PHOTOS = [
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/primera_mano.jpg?updatedAt=1778117537259', label: 'La Primera Mano' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/image.png?updatedAt=1778121391841',       label: 'El Primer Picnic' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/boda.jpg?updatedAt=1778117537050',         label: 'Una Boda Juntos' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/dedos.jpg?updatedAt=1778117536891',        label: 'Deditos en una Hoja' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/graduacion.jpg?updatedAt=1778117536747',   label: 'Su Graduación' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/playa.jpg?updatedAt=1778117536365',        label: 'El Reencuentro en Lima' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/07.jpg?updatedAt=1778117537191',      label: 'Las Primeras Flores' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678590.jpg?updatedAt=1778120790200',      label: 'Sorpresa' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/IMG_4917.jpg?updatedAt=1778117537326',     label: 'Ella Cocinó para Mí' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/polera.jpg?updatedAt=1778117537214',       label: 'Mi Polera' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/capybara.jpg?updatedAt=1778117536503',     label: 'La Primera Foto Juntos' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/first.jpg?updatedAt=1778117537229',        label: 'Nuestro Comienzo' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678589.jpg?updatedAt=1778120952043',         label: 'Juntos Siempre' },
  { src: 'https://ik.imagekit.io/kafe/Proyecto_GF/5179532952285678580.jpg?updatedAt=1778120531551',   label: 'Tres Meses' },
];

// ─── NAVEGACIÓN ───────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function backToHub() {
  Trivia.stop();
  showScreen('hub');
}

document.querySelectorAll('.btn-hub').forEach(b =>
  b.addEventListener('click', backToHub)
);

document.querySelectorAll('.hub-card').forEach(card => {
  card.addEventListener('click', () => {
    const game = card.dataset.game;
    showScreen(game);
    if (game === 'trivia')   Trivia.start();
    if (game === 'memorama') Memorama.start();
    if (game === 'puzzle')   Puzzle.start();
  });
});

// ─── WIN OVERLAY ──────────────────────────────────────────────────────────────

const WinOverlay = {
  show(title, msg, onRestart) {
    document.getElementById('win-title').textContent = title;
    document.getElementById('win-msg').textContent   = msg;
    document.getElementById('win-overlay').classList.remove('hidden');
    document.getElementById('btn-win-restart').onclick = () => {
      document.getElementById('win-overlay').classList.add('hidden');
      onRestart();
    };
    document.getElementById('btn-win-hub').onclick = () => {
      document.getElementById('win-overlay').classList.add('hidden');
      backToHub();
    };
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// TRIVIA
// ═══════════════════════════════════════════════════════════════════════════════

const Trivia = (() => {
  let idx = 0, score = 0, timer = null, answered = false;
  const SECS = 15;

  const $ = id => document.getElementById(id);

  function start() {
    idx = 0; score = 0;
    $('trivia-result').style.display = 'none';
    $('trivia-card').style.display   = 'block';
    showQuestion();
  }

  function stop() { clearInterval(timer); }

  function showQuestion() {
    clearInterval(timer);
    answered = false;
    const q = TRIVIA_QUESTIONS[idx];
    $('trivia-progress').textContent = `Pregunta ${idx + 1} de ${TRIVIA_QUESTIONS.length}`;
    $('trivia-question').textContent = q.question;
    $('trivia-feedback').textContent = '';

    const opts = $('trivia-options');
    opts.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'trivia-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => answer(i));
      opts.appendChild(btn);
    });

    // Timer
    let remaining = SECS;
    $('trivia-timer-fill').style.width = '100%';
    timer = setInterval(() => {
      remaining -= 0.1;
      $('trivia-timer-fill').style.width = (remaining / SECS * 100) + '%';
      if (remaining <= 0) {
        clearInterval(timer);
        if (!answered) answer(-1);
      }
    }, 100);
  }

  function answer(chosen) {
    if (answered) return;
    answered = true;
    clearInterval(timer);

    const q = TRIVIA_QUESTIONS[idx];
    const opts = document.querySelectorAll('.trivia-opt');
    opts.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
      else if (i === chosen) btn.classList.add('wrong');
    });

    if (chosen === q.correct) {
      score++;
      document.getElementById('trivia-feedback').textContent = '¡Correcto! ' + q.fun;
    } else {
      document.getElementById('trivia-feedback').textContent =
        chosen === -1 ? '⏱ Tiempo. La respuesta era: ' + q.options[q.correct]
                      : 'Incorrecto. Era: ' + q.options[q.correct];
    }

    setTimeout(() => {
      idx++;
      if (idx < TRIVIA_QUESTIONS.length) showQuestion();
      else showResult();
    }, 2000);
  }

  function showResult() {
    $('trivia-card').style.display   = 'none';
    $('trivia-result').style.display = 'block';
    $('trivia-score-num').textContent = `${score}/${TRIVIA_QUESTIONS.length}`;

    const result = TRIVIA_RESULTS.find(r => score >= r.min && score <= r.max);
    $('trivia-result-msg').textContent = result?.msg || '';

    $('btn-trivia-restart').onclick = start;
  }

  return { start, stop };
})();

// ═══════════════════════════════════════════════════════════════════════════════
// MEMORAMA
// ═══════════════════════════════════════════════════════════════════════════════

const Memorama = (() => {
  let flipped = [], matched = 0, moves = 0, locked = false;

  function start() {
    flipped = []; matched = 0; moves = 0; locked = false;
    updateInfo();

    // Crear pares y mezclar
    const pairs = [...MEMO_PHOTOS, ...MEMO_PHOTOS];
    pairs.sort(() => Math.random() - 0.5);

    const board = document.querySelector('.memo-board');
    board.innerHTML = '';

    pairs.forEach((src, i) => {
      const card = document.createElement('div');
      card.className = 'memo-card';
      card.dataset.src = src;
      card.dataset.idx = i;
      card.innerHTML = `
        <div class="memo-card-inner">
          <div class="memo-front">✦</div>
          <div class="memo-back"><img src="${src}" loading="lazy" /></div>
        </div>`;
      card.addEventListener('click', () => flip(card));
      board.appendChild(card);
    });
  }

  function flip(card) {
    if (locked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    flipped.push(card);
    if (flipped.length === 2) check();
  }

  function check() {
    locked = true;
    moves++;
    updateInfo();
    const [a, b] = flipped;

    if (a.dataset.src === b.dataset.src) {
      a.classList.add('matched');
      b.classList.add('matched');
      matched++;
      flipped = [];
      locked = false;
      if (matched === MEMO_PHOTOS.length) {
        setTimeout(() => WinOverlay.show(
          '¡Memorama completo!',
          `¡Lo lograste en ${moves} movimientos! Cada foto, un recuerdo nuestro 💗`,
          start
        ), 500);
      }
    } else {
      setTimeout(() => {
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        flipped = [];
        locked = false;
      }, 900);
    }
  }

  function updateInfo() {
    document.getElementById('memo-moves').textContent = `Movimientos: ${moves}`;
    document.getElementById('memo-matched').textContent = `Parejas: ${matched}/${MEMO_PHOTOS.length}`;
  }

  return { start };
})();

// ═══════════════════════════════════════════════════════════════════════════════
// PUZZLE
// ═══════════════════════════════════════════════════════════════════════════════

const Puzzle = (() => {
  let slots = [], selected = null, moves = 0, photoIdx = 0, N = 3;
  const SIZES = [3, 4, 5];

  function currentPhoto() { return PUZZLE_PHOTOS[photoIdx]; }
  function total()        { return N * N; }

  function start(pIdx, size) {
    if (pIdx  !== undefined) photoIdx = pIdx;
    if (size  !== undefined) N        = size;
    selected = null; moves = 0;
    updateUI();

    const prev = document.getElementById('puzzle-preview');
    if (prev) prev.src = currentPhoto().src;

    slots = Array.from({ length: total() }, (_, i) => i);
    do { slots.sort(() => Math.random() - 0.5); } while (isSolved());
    render();
  }

  function nextPhoto() {
    photoIdx = (photoIdx + 1) % PUZZLE_PHOTOS.length;
    start();
  }
  function prevPhoto() {
    photoIdx = (photoIdx - 1 + PUZZLE_PHOTOS.length) % PUZZLE_PHOTOS.length;
    start();
  }
  function setSize(size) { start(undefined, size); }

  function updateUI() {
    document.getElementById('puzzle-moves').textContent =
      `Movimientos: ${moves}`;
    document.getElementById('puzzle-label').textContent =
      `${photoIdx + 1} / ${PUZZLE_PHOTOS.length} · ${currentPhoto().label}`;
    document.getElementById('puzzle-hint').textContent =
      'Toca una pieza para seleccionarla, luego toca otra para intercambiarlas';

    // Marcar el botón de tamaño activo
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.classList.toggle('size-active', parseInt(btn.dataset.size) === N);
    });
  }

  function render() {
    const grid = document.getElementById('puzzle-grid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
    const src = currentPhoto().src;

    slots.forEach((imgIdx, gridIdx) => {
      const piece = document.createElement('div');
      piece.className = 'puzzle-piece' +
        (selected === gridIdx ? ' selected' : '') +
        (imgIdx === gridIdx   ? ' correct-pos' : '');

      // Posición de la pieza dentro de la imagen
      const col = imgIdx % N;
      const row = Math.floor(imgIdx / N);
      // background-size: N*100% ; background-position usa porcentaje relativo al rango disponible
      const pct = N === 1 ? 0 : 100 / (N - 1);
      piece.style.backgroundImage    = `url(${src})`;
      piece.style.backgroundSize     = `${N * 100}% ${N * 100}%`;
      piece.style.backgroundPosition = `${col * pct}% ${row * pct}%`;

      piece.addEventListener('click', () => handleClick(gridIdx));
      grid.appendChild(piece);
    });
  }

  function handleClick(gridIdx) {
    if (selected === null) {
      selected = gridIdx;
    } else if (selected === gridIdx) {
      selected = null;
    } else {
      [slots[selected], slots[gridIdx]] = [slots[gridIdx], slots[selected]];
      moves++;
      document.getElementById('puzzle-moves').textContent = `Movimientos: ${moves}`;
      selected = null;
      if (isSolved()) {
        render();
        const difficulty = `${N}×${N}`;
        setTimeout(() => WinOverlay.show(
          '¡Puzzle resuelto!',
          `¡Lo armaste en ${moves} movimientos (${difficulty})! «${currentPhoto().label}» 🤍`,
          () => start()
        ), 300);
        return;
      }
    }
    render();
  }

  function isSolved() {
    return slots.every((img, grid) => img === grid);
  }

  return { start, nextPhoto, prevPhoto, setSize };
})();

// ─── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => showScreen('hub'));
