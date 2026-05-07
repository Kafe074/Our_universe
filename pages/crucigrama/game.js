// ─── PROGRESO EN LOCALSTORAGE ────────────────────────────────────────────────

const Progress = {
  KEY: 'crucigrama_v1',
  get()   { try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch { return {}; } },
  save(d) { try { localStorage.setItem(this.KEY, JSON.stringify(d)); } catch {} },

  getCurrentIndex() { return this.get().currentIndex ?? 0; },

  setCurrentIndex(idx) {
    const d = this.get(); d.currentIndex = idx; this.save(d);
  },

  getGrid(setIdx) {
    const d = this.get();
    return { grid: d.grids?.[setIdx] || {}, state: d.states?.[setIdx] || {} };
  },

  saveGrid(setIdx, grid, state) {
    const d = this.get();
    d.grids  = d.grids  || {};
    d.states = d.states || {};
    d.grids[setIdx]  = grid;
    d.states[setIdx] = state;
    d.currentIndex   = setIdx;
    this.save(d);
  },

  clearAll() { localStorage.removeItem(this.KEY); }
};

// ─── LÓGICA DEL JUEGO ────────────────────────────────────────────────────────

const Game = (() => {
  let currentIndex = 0;
  let xw = null;           // crossword result from engine
  let userGrid  = {};      // "r,c" → char written by user
  let cellState = {};      // "r,c" → 'correct' | 'wrong' | ''
  let selCell   = null;    // {r, c}
  let selDir    = 'across';
  let selWord   = null;
  let wordAt    = {};      // "r,c" → {across?, down?}

  // ── DOM shortcuts ───────────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const cellEl = (r, c) => document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);

  // ── Inicialización ──────────────────────────────────────────────
  function init() {
    $('btn-check').addEventListener('click', check);
    $('btn-reveal').addEventListener('click', revealWord);
    $('btn-next').addEventListener('click', () => loadSet(currentIndex + 1));
    $('btn-next-xw').addEventListener('click', () => {
      $('celebration').classList.add('hidden');
      const next = currentIndex + 1;
      if (next >= WORD_SETS.length) showFinal();
      else loadSet(next);
    });
    $('hidden-input').addEventListener('keydown', e => {
      e.preventDefault();
      handleKey(e.key);
    });
    $('celebration').addEventListener('click', e => {
      if (e.target === $('celebration')) $('celebration').classList.add('hidden');
    });
    const fr = $('btn-final-restart-xw');
    if (fr) fr.addEventListener('click', () => {
      $('final-screen-xw').classList.add('hidden');
      Progress.clearAll();
      loadSet(0);
    });

    loadSet(Progress.getCurrentIndex());
  }

  // ── Pantalla final ──────────────────────────────────────────────
  function showFinal() {
    const fs = $('final-screen-xw');
    if (fs) fs.classList.remove('hidden');
    launchParticles();
  }

  // ── Cargar un set ───────────────────────────────────────────────
  function loadSet(index) {
    if (index >= WORD_SETS.length) { showFinal(); return; }
    currentIndex = index;
    Progress.setCurrentIndex(index);

    // Restaurar grid guardado o empezar vacío
    const saved = Progress.getGrid(index);
    userGrid  = saved.grid;
    cellState = saved.state;
    selCell   = null;
    wordAt    = {};

    const set = WORD_SETS[index];
    const engine = new CrosswordEngine(set);
    xw = engine.build();

    if (!xw) {
      console.warn(`Set ${index} no generó crucigrama. Saltando.`);
      loadSet(index + 1);
      return;
    }

    // Mapear qué palabras pasan por cada celda
    for (const p of xw.placed) {
      for (let i = 0; i < p.word.length; i++) {
        const r = p.dir === 'down' ? p.row + i : p.row;
        const c = p.dir === 'across' ? p.col + i : p.col;
        const k = `${r},${c}`;
        if (!wordAt[k]) wordAt[k] = {};
        wordAt[k][p.dir] = p;
      }
    }

    renderHeader(set, index);
    renderGrid();
    renderClues();
    $('btn-next').classList.add('hidden');

    // Seleccionar primera celda
    const first = xw.acrossClues[0] || xw.downClues[0];
    if (first) selectCell(first.row, first.col, first.dir);
  }

  // ── Render cabecera ─────────────────────────────────────────────
  function renderHeader(set, index) {
    $('set-number').textContent = `Crucigrama ${index + 1} de ${WORD_SETS.length}`;
    $('set-title').textContent  = `${set.letter} · ${set.title}`;

    // Progreso de letras "TE AMO LULITO"
    const letters = WORD_SETS.slice(0, 11).map((s, i) => {
      const unlocked = i < index;
      return `<span class="${unlocked ? 'letter-unlocked' : 'letter-locked'}">${s.letter}</span>`;
    });
    const prog = $('letter-progress');
    if (prog) prog.innerHTML = letters.join(' · ');
  }

  // ── Calcular tamaño de celda óptimo ────────────────────────────
  function calcCellSize(cols, rows) {
    const panelW  = window.innerWidth < 640 ? 0 : 300;
    const headerH = ($('game-header').offsetHeight || 56) +
                    ($('current-clue').offsetHeight || 28) + 24;
    const availW  = window.innerWidth  - panelW - 36;
    const availH  = window.innerHeight - headerH;
    const byW = Math.floor(availW / cols);
    const byH = Math.floor(availH / rows);
    return Math.max(28, Math.min(byW, byH, 72));
  }

  // ── Render cuadrícula ───────────────────────────────────────────
  function renderGrid() {
    const { grid, rows, cols, numMap } = xw;

    // Aplicar tamaño óptimo de celda
    const cs = calcCellSize(cols, rows);
    document.documentElement.style.setProperty('--cs', cs + 'px');

    const container = $('xw-grid');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${cols}, var(--cs))`;
    container.style.gridTemplateRows    = `repeat(${rows}, var(--cs))`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const div = document.createElement('div');
        if (grid[r][c]) {
          div.className = 'cell active';
          div.dataset.r = r;
          div.dataset.c = c;
          div.dataset.answer = grid[r][c];

          const numKey = `${r},${c}`;
          if (numMap[numKey]) {
            const n = document.createElement('span');
            n.className = 'cell-num';
            n.textContent = numMap[numKey];
            div.appendChild(n);
          }

          const letter = document.createElement('span');
          letter.className = 'cell-letter';
          div.appendChild(letter);

          div.addEventListener('click', () => handleCellClick(r, c));
        } else {
          div.className = 'cell blocked';
        }
        container.appendChild(div);
      }
    }
  }

  // ── Render pistas ───────────────────────────────────────────────
  function renderClues() {
    const makeList = (clues, ulId) => {
      const ul = $(ulId);
      ul.innerHTML = '';
      for (const cl of clues) {
        const li = document.createElement('li');
        li.dataset.word = cl.word;
        li.innerHTML = `<b>${cl.number}.</b> ${cl.clue}`;
        li.addEventListener('click', () => {
          selectCell(cl.row, cl.col, cl.dir);
          scrollToSelected();
        });
        ul.appendChild(li);
      }
    };
    makeList(xw.acrossClues, 'across-list');
    makeList(xw.downClues,   'down-list');
  }

  // ── Selección de celda ──────────────────────────────────────────
  function handleCellClick(r, c) {
    const k = `${r},${c}`;
    // Doble-clic (o re-clic): cambiar dirección si hay ambas
    if (selCell && selCell.r === r && selCell.c === c) {
      const has = wordAt[k];
      if (has?.across && has?.down) {
        selectCell(r, c, selDir === 'across' ? 'down' : 'across');
        return;
      }
    }
    // Dirección disponible
    let dir = selDir;
    const has = wordAt[k];
    if (has && !has[dir]) dir = dir === 'across' ? 'down' : 'across';
    selectCell(r, c, dir);
  }

  function selectCell(r, c, dir) {
    selCell = { r, c };
    selDir  = dir;
    const k = `${r},${c}`;
    selWord = wordAt[k]?.[dir] || wordAt[k]?.across || wordAt[k]?.down;
    highlight();
    updateClue();
    $('hidden-input').focus();
  }

  // ── Highlight ───────────────────────────────────────────────────
  function highlight() {
    document.querySelectorAll('.cell.active').forEach(el =>
      el.classList.remove('sel', 'word-sel'));
    document.querySelectorAll('#clues li').forEach(li =>
      li.classList.remove('active-clue'));

    if (!selWord) return;

    for (let i = 0; i < selWord.word.length; i++) {
      const r = selWord.dir === 'down' ? selWord.row + i : selWord.row;
      const c = selWord.dir === 'across' ? selWord.col + i : selWord.col;
      cellEl(r, c)?.classList.add('word-sel');
    }

    const cur = cellEl(selCell.r, selCell.c);
    if (cur) { cur.classList.remove('word-sel'); cur.classList.add('sel'); }

    const li = document.querySelector(`#clues li[data-word="${selWord.word}"]`);
    if (li) { li.classList.add('active-clue'); li.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
  }

  function updateClue() {
    const el = $('current-clue');
    if (!el || !selWord) { if (el) el.textContent = ''; return; }
    const dir = selWord.dir === 'across' ? 'Horizontal' : 'Vertical';
    el.textContent = `${selWord.number}. (${dir}) ${selWord.clue}`;
  }

  // ── Teclado ─────────────────────────────────────────────────────
  function handleKey(key) {
    if (!selCell) return;

    if (key === 'Backspace') {
      typeChar('', true);
    } else if (key === 'Tab') {
      nextWord(1);
    } else if (key === 'ArrowRight') { arrowMove(0, 1, 'across'); }
    else if (key === 'ArrowLeft')  { arrowMove(0, -1, 'across'); }
    else if (key === 'ArrowDown')  { arrowMove(1, 0, 'down'); }
    else if (key === 'ArrowUp')    { arrowMove(-1, 0, 'down'); }
    else if (key.length === 1 && /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(key)) {
      const ch = key.toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace('Ñ', 'N');
      typeChar(ch, false);
    }
  }

  function typeChar(ch, isBack) {
    const k = `${selCell.r},${selCell.c}`;
    if (isBack) {
      if (userGrid[k]) {
        delete userGrid[k];
        delete cellState[k];
        refreshCell(selCell.r, selCell.c);
      } else {
        moveInWord(-1);
      }
    } else {
      userGrid[k] = ch;
      delete cellState[k];
      refreshCell(selCell.r, selCell.c);
      moveInWord(1);
    }
    // Guardar progreso tras cada tecla
    Progress.saveGrid(currentIndex, userGrid, cellState);
  }

  function moveInWord(delta) {
    if (!selWord) return;
    const w = selWord;
    const idx = w.dir === 'across' ? selCell.c - w.col : selCell.r - w.row;
    const next = idx + delta;
    if (next >= 0 && next < w.word.length) {
      const nr = w.dir === 'down' ? w.row + next : w.row;
      const nc = w.dir === 'across' ? w.col + next : w.col;
      selectCell(nr, nc, w.dir);
    } else if (next >= w.word.length) {
      nextWord(1);
    }
  }

  function nextWord(delta) {
    const all = [...xw.acrossClues, ...xw.downClues].sort((a, b) => a.number - b.number);
    const idx = all.findIndex(w => w === selWord);
    const next = all[(idx + delta + all.length) % all.length];
    if (next) selectCell(next.row, next.col, next.dir);
  }

  function arrowMove(dr, dc, preferDir) {
    const nr = selCell.r + dr, nc = selCell.c + dc;
    const el = cellEl(nr, nc);
    if (el?.classList.contains('active')) selectCell(nr, nc, preferDir);
  }

  function scrollToSelected() {
    cellEl(selCell.r, selCell.c)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  // ── Actualizar visualización de celda ───────────────────────────
  function refreshCell(r, c) {
    const el = cellEl(r, c);
    if (!el) return;
    const k = `${r},${c}`;
    el.querySelector('.cell-letter').textContent = userGrid[k] || '';
    el.classList.remove('correct', 'wrong');
    if (cellState[k]) el.classList.add(cellState[k]);
  }

  // ── Verificar respuestas ────────────────────────────────────────
  function check() {
    const { grid, rows, cols } = xw;
    let allOk = true;
    let allFilled = true;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!grid[r][c]) continue;
        const k = `${r},${c}`;
        if (!userGrid[k]) { allFilled = false; continue; }
        cellState[k] = userGrid[k] === grid[r][c] ? 'correct' : 'wrong';
        if (cellState[k] === 'wrong') allOk = false;
        refreshCell(r, c);
      }
    }

    if (allFilled && allOk) setTimeout(celebrate, 600);
  }

  // ── Revelar palabra seleccionada ────────────────────────────────
  function revealWord() {
    if (!selWord) return;
    const w = selWord;
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === 'down' ? w.row + i : w.row;
      const c = w.dir === 'across' ? w.col + i : w.col;
      const k = `${r},${c}`;
      userGrid[k]  = w.word[i];
      cellState[k] = 'correct';
      refreshCell(r, c);
    }
  }

  // ── Celebración ─────────────────────────────────────────────────
  function celebrate() {
    const set    = WORD_SETS[currentIndex];
    const isLast = currentIndex === WORD_SETS.length - 1;

    $('celeb-title').textContent = set.completionTitle;
    $('celeb-msg').innerHTML     = set.completionMsg.replace(/\n/g, '<br>');
    $('btn-next-xw').textContent = isLast ? 'Ver mensaje final ✨' : 'Siguiente crucigrama →';
    $('celebration').classList.remove('hidden');
    $('btn-next').classList.remove('hidden');

    // Guardar estado correcto tras completar
    Progress.saveGrid(currentIndex, userGrid, cellState);
    launchParticles();
  }

  // ── Partículas de celebración ───────────────────────────────────
  function launchParticles() {
    const box = $('particles');
    box.innerHTML = '';
    const chars = ['✦', '💗', '✨', '⭐', '💫', '🌸'];
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.textContent = chars[Math.floor(Math.random() * chars.length)];
      p.style.left             = Math.random() * 90 + 5 + 'vw';
      p.style.animationDelay   = Math.random() * 1.5 + 's';
      p.style.animationDuration = 2 + Math.random() * 2 + 's';
      box.appendChild(p);
    }
    setTimeout(() => { box.innerHTML = ''; }, 5000);
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Game.init());
