// ─── PROGRESO EN LOCALSTORAGE ────────────────────────────────────────────────

const Progress = {
  KEY: 'pupiletras_v1',
  get()   { try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch { return {}; } },
  save(d) { try { localStorage.setItem(this.KEY, JSON.stringify(d)); } catch {} },

  getCurrentIndex() { return this.get().currentIndex ?? 0; },

  getFound(setIndex) { return new Set(this.get().found?.[setIndex] || []); },

  markFound(setIndex, word) {
    const d = this.get();
    d.found = d.found || {};
    d.found[setIndex] = d.found[setIndex] || [];
    if (!d.found[setIndex].includes(word)) d.found[setIndex].push(word);
    d.currentIndex = setIndex;
    this.save(d);
  },

  setCurrentIndex(idx) {
    const d = this.get();
    d.currentIndex = idx;
    this.save(d);
  },

  clearAll() { localStorage.removeItem(this.KEY); }
};

// ─── LÓGICA DEL JUEGO ────────────────────────────────────────────────────────

const Game = (() => {
  let currentIndex = 0;
  let puzzle  = null;
  let startCell = null;
  let hoverCell = null;

  const $ = id => document.getElementById(id);
  const cellEl = (r, c) => document.querySelector(`.pw-cell[data-r="${r}"][data-c="${c}"]`);

  // ── Init ────────────────────────────────────────────────────────
  function init() {
    $('btn-next').addEventListener('click', () => loadSet(currentIndex + 1));
    $('btn-next-pw').addEventListener('click', () => {
      $('celebration').classList.add('hidden');
      const next = currentIndex + 1;
      if (next >= WORD_SETS.length) {
        showFinal();
      } else {
        loadSet(next);
      }
    });
    $('btn-final-restart').addEventListener('click', () => {
      $('final-screen').classList.add('hidden');
      Progress.clearAll();
      loadSet(0);
    });
    $('celebration').addEventListener('click', e => {
      if (e.target === $('celebration')) $('celebration').classList.add('hidden');
    });

    const saved = Progress.getCurrentIndex();
    loadSet(saved);
  }

  // ── Cargar set ──────────────────────────────────────────────────
  function loadSet(index) {
    if (index >= WORD_SETS.length) { showFinal(); return; }
    currentIndex = index;
    startCell = null;
    hoverCell = null;
    Progress.setCurrentIndex(index);

    const set = WORD_SETS[index];
    const engine = new PupiletrasEngine(set, index);
    puzzle = engine.build();

    renderHeader(set, index);
    renderGrid();
    renderWordList();
    $('btn-next').classList.add('hidden');

    // Restaurar palabras ya encontradas
    const savedFound = Progress.getFound(index);
    if (savedFound.size > 0) restoreFound(savedFound);
  }

  // ── Restaurar progreso guardado ─────────────────────────────────
  function restoreFound(savedWords) {
    for (const p of puzzle.placed) {
      if (savedWords.has(p.word)) {
        p.found = true;
        // Marcar celdas en la cuadrícula
        for (let i = 0; i < p.word.length; i++) {
          const r = p.r + p.dr * i, c = p.c + p.dc * i;
          cellEl(r, c)?.classList.add('found');
        }
        document.querySelector(`li[data-word="${p.word}"]`)?.classList.add('found-word');
      }
    }
    updateCount();

    // Comprobar si este set ya estaba completado
    if (puzzle.placed.every(p => p.found)) {
      $('btn-next').classList.remove('hidden');
    }
  }

  // ── Header ──────────────────────────────────────────────────────
  function renderHeader(set, index) {
    $('set-number').textContent = `Pupiletras ${index + 1} de ${WORD_SETS.length}`;
    $('set-title').textContent  = set.title;
    $('word-count').textContent = `0 / ${puzzle.placed.length}`;
  }

  // ── Calcular tamaño de celda óptimo ────────────────────────────
  function calcCellSize(size) {
    const panelW  = window.innerWidth < 640 ? 0 : 290;
    const headerH = ($('game-header').offsetHeight || 56) +
                    ($('hint-bar').offsetHeight    || 26) + 20;
    const availW  = window.innerWidth  - panelW - 28;
    const availH  = window.innerHeight - headerH;
    const byW = Math.floor(availW / size);
    const byH = Math.floor(availH / size);
    return Math.max(26, Math.min(byW, byH, 68));
  }

  // ── Grid ────────────────────────────────────────────────────────
  function renderGrid() {
    const container = $('pw-grid');
    container.innerHTML = '';
    const { size } = puzzle;

    // Aplicar tamaño óptimo de celda
    const cs = calcCellSize(size);
    document.documentElement.style.setProperty('--cs', cs + 'px');

    container.style.gridTemplateColumns = `repeat(${size}, var(--cs))`;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const div = document.createElement('div');
        div.className = 'pw-cell';
        div.dataset.r = r;
        div.dataset.c = c;
        div.textContent = puzzle.grid[r][c];
        div.addEventListener('click',      () => handleClick(r, c));
        div.addEventListener('mouseenter', () => { hoverCell = {r,c}; updatePreview(); });
        container.appendChild(div);
      }
    }
    container.addEventListener('mouseleave', () => { hoverCell = null; updatePreview(); });
  }

  // ── Word list ───────────────────────────────────────────────────
  function renderWordList() {
    const ul = $('word-list');
    ul.innerHTML = '';
    for (const p of puzzle.placed) {
      const li = document.createElement('li');
      li.dataset.word = p.word;
      li.innerHTML = `<span class="word-text">${p.word}</span><span class="word-clue"> — ${p.clue}</span>`;
      ul.appendChild(li);
    }
  }

  // ── Click ───────────────────────────────────────────────────────
  function handleClick(r, c) {
    if (!startCell) {
      startCell = { r, c };
      updatePreview();
      return;
    }
    if (startCell.r === r && startCell.c === c) {
      startCell = null; updatePreview(); return;
    }
    const found = checkSelection(startCell, { r, c });
    if (found) {
      markFound(found, startCell, { r, c });
      startCell = null;
    } else {
      startCell = { r, c };
    }
    updatePreview();
  }

  // ── Path ────────────────────────────────────────────────────────
  function getPath(from, to) {
    const dr = to.r - from.r, dc = to.c - from.c;
    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
    const len   = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
    const stepR = dr === 0 ? 0 : (dr > 0 ? 1 : -1);
    const stepC = dc === 0 ? 0 : (dc > 0 ? 1 : -1);
    return Array.from({ length: len }, (_, i) => [from.r + stepR * i, from.c + stepC * i]);
  }

  // ── Verificar selección ─────────────────────────────────────────
  function checkSelection(from, to) {
    const dr = to.r - from.r, dc = to.c - from.c;
    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
    const len   = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
    const stepR = dr === 0 ? 0 : (dr > 0 ? 1 : -1);
    const stepC = dc === 0 ? 0 : (dc > 0 ? 1 : -1);

    for (const p of puzzle.placed) {
      if (p.found || p.word.length !== len) continue;
      if (p.r === from.r && p.c === from.c && p.dr === stepR  && p.dc === stepC)  return p;
      if (p.r === to.r   && p.c === to.c   && p.dr === -stepR && p.dc === -stepC) return p;
    }
    return null;
  }

  // ── Marcar encontrada ───────────────────────────────────────────
  function markFound(placed, from, to) {
    placed.found = true;
    Progress.markFound(currentIndex, placed.word);

    const path = getPath(from, to);
    if (path) path.forEach(([r,c]) => {
      const el = cellEl(r,c);
      if (el) { el.classList.remove('preview','start-sel'); el.classList.add('found'); }
    });

    document.querySelector(`li[data-word="${placed.word}"]`)?.classList.add('found-word');
    updateCount();

    if (puzzle.placed.every(p => p.found)) setTimeout(celebrate, 700);
  }

  function updateCount() {
    const total = puzzle.placed.length;
    const found = puzzle.placed.filter(p => p.found).length;
    $('word-count').textContent = `${found} / ${total}`;
  }

  // ── Preview hover ───────────────────────────────────────────────
  function updatePreview() {
    document.querySelectorAll('.pw-cell.preview,.pw-cell.start-sel')
      .forEach(el => el.classList.remove('preview','start-sel'));
    if (!startCell) return;

    cellEl(startCell.r, startCell.c)?.classList.add('start-sel');

    if (!hoverCell || (hoverCell.r === startCell.r && hoverCell.c === startCell.c)) return;
    const path = getPath(startCell, hoverCell);
    if (path) path.forEach(([r,c]) => {
      const el = cellEl(r,c);
      if (el && !el.classList.contains('found') && !el.classList.contains('start-sel'))
        el.classList.add('preview');
    });
  }

  // ── Celebración ─────────────────────────────────────────────────
  function celebrate() {
    const set   = WORD_SETS[currentIndex];
    const isLast = currentIndex === WORD_SETS.length - 1;
    $('celeb-msg').textContent   = set.completionMsg;
    $('btn-next-pw').textContent = isLast ? 'Ver mensaje final ✨' : 'Siguiente pupiletras →';
    $('celebration').classList.remove('hidden');
    $('btn-next').classList.remove('hidden');
    launchParticles();
  }

  // ── Pantalla final (todos los sets completados) ──────────────────
  function showFinal() {
    $('final-msg').textContent = FINAL_MESSAGE;
    $('final-screen').classList.remove('hidden');
    launchParticles();
  }

  // ── Partículas ───────────────────────────────────────────────────
  function launchParticles() {
    const box = $('particles');
    box.innerHTML = '';
    const chars = ['✦','💗','✨','⭐','💫','🌸','💜','🤍'];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.textContent = chars[Math.floor(Math.random() * chars.length)];
      p.style.left             = Math.random() * 90 + 5 + 'vw';
      p.style.animationDelay   = Math.random() * 1.5 + 's';
      p.style.animationDuration = 2 + Math.random() * 2 + 's';
      box.appendChild(p);
    }
    setTimeout(() => box.innerHTML = '', 5000);
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Game.init());
