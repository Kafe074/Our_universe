// ─── MOTOR DE CRUCIGRAMAS ─────────────────────────────────────────────────────
// Genera automáticamente la cuadrícula a partir de una lista de palabras.
// No requiere diseño manual: sólo palabras + pistas.
// ─────────────────────────────────────────────────────────────────────────────

class CrosswordEngine {
  constructor(wordSet) {
    this.words = this._prepare(wordSet.words);
    this.map   = {};   // "r,c" → char
    this.placed = [];  // [{word,row,col,dir,clue}]
  }

  // Normalizar: mayúsculas, sin tildes, sin espacios
  _clean(str) {
    return str.toUpperCase()
              .normalize('NFD')
              .replace(/[̀-ͯ]/g, '')
              .replace(/Ñ/g, 'N')
              .replace(/\s+/g, '');
  }

  _prepare(words) {
    return words
      .map(w => ({ ...w, word: this._clean(w.word) }))
      .filter(w => w.word.length >= 3)
      .sort((a, b) => b.word.length - a.word.length);
  }

  _k(r, c)     { return `${r},${c}`; }
  _get(r, c)   { return this.map[this._k(r, c)] ?? null; }
  _set(r, c, ch) { this.map[this._k(r, c)] = ch; }

  _canPlace(word, row, col, dir) {
    let intersects = (this.placed.length === 0);

    for (let i = 0; i < word.length; i++) {
      const r = dir === 'down' ? row + i : row;
      const c = dir === 'across' ? col + i : col;
      const cur = this._get(r, c);

      if (cur !== null) {
        if (cur !== word[i]) return false;
        intersects = true;
      } else {
        // Sin letras paralelas adyacentes
        if (dir === 'across') {
          if (this._get(r - 1, c) || this._get(r + 1, c)) return false;
        } else {
          if (this._get(r, c - 1) || this._get(r, c + 1)) return false;
        }
      }
    }

    // Sin extensión de palabras existentes (celda antes/después)
    const r0 = dir === 'down' ? row - 1 : row;
    const c0 = dir === 'across' ? col - 1 : col;
    if (this._get(r0, c0)) return false;

    const rE = dir === 'down' ? row + word.length : row;
    const cE = dir === 'across' ? col + word.length : col;
    if (this._get(rE, cE)) return false;

    return intersects;
  }

  _doPlace(word, row, col, dir, clue) {
    for (let i = 0; i < word.length; i++) {
      const r = dir === 'down' ? row + i : row;
      const c = dir === 'across' ? col + i : col;
      this._set(r, c, word[i]);
    }
    this.placed.push({ word, row, col, dir, clue });
  }

  _tryWord(wordObj) {
    const { word, clue } = wordObj;
    const newDir = (p) => p.dir === 'across' ? 'down' : 'across';

    for (const p of this.placed) {
      const nd = newDir(p);
      for (let pi = 0; pi < p.word.length; pi++) {
        for (let wi = 0; wi < word.length; wi++) {
          if (p.word[pi] !== word[wi]) continue;
          const row = p.dir === 'across' ? p.row - wi     : p.row + pi;
          const col = p.dir === 'across' ? p.col + pi     : p.col - wi;
          if (this._canPlace(word, row, col, nd)) {
            this._doPlace(word, row, col, nd, clue);
            return true;
          }
        }
      }
    }
    return false;
  }

  build() {
    const sorted = [...this.words];

    // Colocar la primera palabra horizontalmente
    const first = sorted[0];
    this._doPlace(first.word, 0, 0, 'across', first.clue);

    // Varias pasadas para maximizar palabras colocadas
    const rest = sorted.slice(1);
    for (let pass = 0; pass < 5; pass++) {
      for (const w of rest) {
        if (!this.placed.some(p => p.word === w.word)) {
          this._tryWord(w);
        }
      }
    }

    if (!Object.keys(this.map).length) return null;

    // Calcular límites
    const coords = Object.keys(this.map).map(k => k.split(',').map(Number));
    const minR = Math.min(...coords.map(k => k[0]));
    const maxR = Math.max(...coords.map(k => k[0]));
    const minC = Math.min(...coords.map(k => k[1]));
    const maxC = Math.max(...coords.map(k => k[1]));

    const rows = maxR - minR + 1;
    const cols = maxC - minC + 1;

    // Cuadrícula 2D de respuestas
    const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
    for (const [k, ch] of Object.entries(this.map)) {
      const [r, c] = k.split(',').map(Number);
      grid[r - minR][c - minC] = ch;
    }

    // Normalizar posiciones
    const placed = this.placed.map(p => ({
      ...p,
      row: p.row - minR,
      col: p.col - minC
    }));

    // Numerar celdas de inicio (orden: fila, columna)
    const numMap = {};
    let num = 1;
    const acrossClues = [], downClues = [];

    const startCells = [...placed]
      .sort((a, b) => a.row !== b.row ? a.row - b.row : a.col - b.col);

    for (const p of startCells) {
      const k = `${p.row},${p.col}`;
      if (!numMap[k]) numMap[k] = num++;
      p.number = numMap[k];
      (p.dir === 'across' ? acrossClues : downClues).push(p);
    }

    acrossClues.sort((a, b) => a.number - b.number);
    downClues.sort((a, b) => a.number - b.number);

    return { grid, placed, rows, cols, numMap, acrossClues, downClues };
  }
}
