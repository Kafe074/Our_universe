// ─── RNG CON SEMILLA ─────────────────────────────────────────────────────────
// Generador determinístico: el mismo setIndex siempre produce el mismo grid.
// Esto permite guardar el progreso correctamente.
// ─────────────────────────────────────────────────────────────────────────────

class SeededRNG {
  constructor(seed) {
    this.s = ((seed * 1664525 + 1013904223) ^ 0xdeadbeef) >>> 0 || 1;
  }
  next() {
    this.s ^= this.s << 13;
    this.s ^= this.s >>> 17;
    this.s ^= this.s << 5;
    return (this.s >>> 0) / 4294967296;
  }
}

// ─── MOTOR DE PUPILETRAS ──────────────────────────────────────────────────────

class PupiletrasEngine {
  static DIRS = [
    [0,1],[1,0],[1,1],[-1,1],[0,-1],[-1,0],[-1,-1],[1,-1]
  ];

  constructor(wordSet, setIndex = 0) {
    this.rng    = new SeededRNG(setIndex * 99991 + 12347);
    this.words  = this._prepare(wordSet.words);
    this.size   = Math.max(14, Math.max(...this.words.map(w => w.word.length)) + 3);
    this.grid   = [];
    this.placed = [];
  }

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

  _rInt(n)     { return Math.floor(this.rng.next() * n); }
  _inBounds(r, c) { return r >= 0 && r < this.size && c >= 0 && c < this.size; }

  _canPlace(word, r, c, dr, dc) {
    for (let i = 0; i < word.length; i++) {
      const nr = r + dr * i, nc = c + dc * i;
      if (!this._inBounds(nr, nc)) return false;
      const cur = this.grid[nr][nc];
      if (cur && cur !== word[i]) return false;
    }
    return true;
  }

  _doPlace(wordObj, r, c, dr, dc) {
    for (let i = 0; i < wordObj.word.length; i++) {
      this.grid[r + dr * i][c + dc * i] = wordObj.word[i];
    }
    this.placed.push({ ...wordObj, r, c, dr, dc, found: false });
  }

  _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = this._rInt(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  _tryPlace(wordObj) {
    const dirs = this._shuffle([...PupiletrasEngine.DIRS]);
    for (let attempt = 0; attempt < 400; attempt++) {
      const [dr, dc] = dirs[attempt % dirs.length];
      const r = this._rInt(this.size);
      const c = this._rInt(this.size);
      if (this._canPlace(wordObj.word, r, c, dr, dc)) {
        this._doPlace(wordObj, r, c, dr, dc);
        return true;
      }
    }
    return false;
  }

  _fillRandom() {
    const L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < this.size; r++)
      for (let c = 0; c < this.size; c++)
        if (!this.grid[r][c])
          this.grid[r][c] = L[this._rInt(26)];
  }

  build() {
    this.grid   = Array.from({ length: this.size }, () => Array(this.size).fill(null));
    this.placed = [];
    for (const w of this.words) this._tryPlace(w);
    this._fillRandom();
    return { grid: this.grid, placed: this.placed, size: this.size };
  }
}
