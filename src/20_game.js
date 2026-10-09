/* ================= Tetris core (guideline-style) ================= */
const COLS = 10, ROWS = 22, HIDDEN = 2;
const TYPES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
const SHAPES = {
  I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
};
const rotCW = (m) => m.map((row, r) => row.map((_, c) => m[m.length - 1 - c][r]));
const CELLS = {}; // CELLS[type][rot] = [[x,y],...]
TYPES.forEach((t) => {
  let m = SHAPES[t]; CELLS[t] = [];
  for (let r = 0; r < 4; r++) {
    const cells = []; m.forEach((row, y) => row.forEach((v, x) => v && cells.push([x, y])));
    CELLS[t].push(cells); m = rotCW(m);
  }
});
// SRS kick tables (x right, y up as in the guideline; we negate y)
const KICK_JLSTZ = {
  '01': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]], '10': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  '12': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]], '21': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  '23': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]], '32': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  '30': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]], '03': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
};
const KICK_I = {
  '01': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]], '10': [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  '12': [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]], '21': [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
  '23': [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]], '32': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  '30': [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]], '03': [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
};
const T_FRONT = [[[0, 0], [2, 0]], [[2, 0], [2, 2]], [[0, 2], [2, 2]], [[0, 0], [0, 2]]];
const T_CORNERS = [[0, 0], [2, 0], [0, 2], [2, 2]];
const LOCK_DELAY = 500, MAX_RESETS = 15, CLEAR_TIME = 420, TRANSITION_TIME = 2700;

class Game {
  constructor(hooks) { this.h = hooks; this.state = 'idle'; }
  start(stageIdx) {
    this.board = Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
    this.meta = Array.from({ length: ROWS }, () => new Array(COLS).fill(null)); this.pidN = 0; // per-cell piece id + local coords (food skins join cells of one piece)
    this.bag = []; this.queue = []; this.refill();
    this.hold = null; this.canHold = true;
    this.score = 0; this.lines = 0; this.combo = -1; this.b2b = false;
    this.startStage = stageIdx; this.stageIdx = stageIdx; this.lap = 0; this.linesInStage = 0;
    this.stats = { tetris: 0, tspin: 0, maxCombo: 0, pieces: 0 };
    this.softDrop = false; this.gravAcc = 0; this.clearRows = []; this.clearT = 0; this.transT = 0;
    this.time = 0;
    this.updateLevel();
    this.state = 'playing';
    this.spawn();
  }
  get absStage() { return this.lap * STAGES.length + this.stageIdx; }
  updateLevel() {
    // eased ramp: spread the climb over the whole (long) journey so every world stays reachable
    this.speedLevel = Math.min(15, 1 + Math.min(12, this.absStage * 12 / Math.max(8, STAGES.length - 1)) + (this.linesInStage / LINES_PER_STAGE) * 0.8);
    const old = this.level; this.level = Math.floor(this.speedLevel);
    if (old && this.level > old && this.h.onLevel) this.h.onLevel(this.level);
  }
  gravityMs() { const s = this.speedLevel; return 1000 * Math.pow(Math.max(0.05, 0.8 - (s - 1) * 0.007), s - 1); }
  refill() {
    while (this.queue.length < 7) {
      if (!this.bag.length) { this.bag = TYPES.slice(); for (let i = this.bag.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]]; } }
      this.queue.push(this.bag.pop());
    }
  }
  cellsOf(p) { return CELLS[p.type][p.rot].map(([x, y]) => [x + p.x, y + p.y]); }
  collide(p) {
    for (const [x, y] of this.cellsOf(p)) {
      if (x < 0 || x >= COLS || y >= ROWS) return true;
      if (y >= 0 && this.board[y][x]) return true;
    }
    return false;
  }
  spawn(type) {
    if (!type) { type = this.queue.shift(); this.refill(); }
    const p = { type, rot: 0, x: type === 'O' ? 4 : 3, y: 0 };
    this.piece = p; this.lockTimer = 0; this.resets = 0; this.lastRot = false; this.lastKick = 0; this.gravAcc = 0;
    if (this.collide(p)) { this.piece = null; return this.gameOver(); }
    const down = { ...p, y: p.y + 1 };
    if (!this.collide(down)) p.y++;
    this.lowestY = p.y;
    this.stats.pieces++;
    if (this.h.onSpawn) this.h.onSpawn(p);
  }
  grounded(p = this.piece) { return this.collide({ ...p, y: p.y + 1 }); }
  afterManip() {
    if (this.grounded()) { if (this.resets < MAX_RESETS) { this.lockTimer = 0; this.resets++; } }
  }
  move(dx) {
    if (this.state !== 'playing' || !this.piece) return false;
    const p = { ...this.piece, x: this.piece.x + dx };
    if (this.collide(p)) return false;
    this.piece = p; this.lastRot = false; this.afterManip();
    this.h.onMove && this.h.onMove(dx);
    return true;
  }
  rotate(dir) {
    if (this.state !== 'playing' || !this.piece) return false;
    const cur = this.piece;
    if (cur.type === 'O') { this.h.onRotate && this.h.onRotate(true, dir); return true; }
    const to = (cur.rot + dir + 4) % 4;
    const kicks = (cur.type === 'I' ? KICK_I : KICK_JLSTZ)['' + cur.rot + to];
    for (let i = 0; i < kicks.length; i++) {
      const p = { ...cur, rot: to, x: cur.x + kicks[i][0], y: cur.y - kicks[i][1] };
      if (!this.collide(p)) {
        this.piece = p; this.lastRot = true; this.lastKick = i;
        if (p.y > this.lowestY) { this.lowestY = p.y; this.resets = 0; }
        this.afterManip();
        this.h.onRotate && this.h.onRotate(true, dir);
        return true;
      }
    }
    this.h.onRotate && this.h.onRotate(false);
    return false;
  }
  stepDown() {
    const p = { ...this.piece, y: this.piece.y + 1 };
    if (this.collide(p)) return false;
    this.piece = p; this.lastRot = false;
    if (p.y > this.lowestY) { this.lowestY = p.y; this.resets = 0; this.lockTimer = 0; }
    return true;
  }
  ghostY() { let y = this.piece.y; while (!this.collide({ ...this.piece, y: y + 1 })) y++; return y; }
  hardDrop() {
    if (this.state !== 'playing' || !this.piece) return;
    const from = this.piece.y, gy = this.ghostY(), dist = gy - from;
    if (dist > 0) { this.piece = { ...this.piece, y: gy }; this.lastRot = false; }
    this.score += dist * 2;
    this.h.onHardDrop && this.h.onHardDrop(this.cellsOf(this.piece), dist, this.piece.type);
    this.hardFlag = true; this.lock(); this.hardFlag = false;
  }
  holdPiece() {
    if (this.state !== 'playing' || !this.piece || !this.canHold) return;
    const cur = this.piece.type;
    this.canHold = false;
    if (this.hold) { const h = this.hold; this.hold = cur; this.spawn(h); }
    else { this.hold = cur; this.spawn(); }
    this.h.onHold && this.h.onHold();
  }
  tspinCheck() {
    const p = this.piece;
    if (p.type !== 'T' || !this.lastRot) return null;
    const occ = ([cx, cy]) => { const x = p.x + cx, y = p.y + cy; return x < 0 || x >= COLS || y >= ROWS || (y >= 0 && this.board[y][x]); };
    const corners = T_CORNERS.filter(occ).length;
    if (corners < 3) return null;
    const front = T_FRONT[p.rot].filter(occ).length;
    return front === 2 || this.lastKick === 4 ? 'full' : 'mini';
  }
  lock() {
    const p = this.piece; const tIdx = TYPES.indexOf(p.type) + 1;
    const ts = this.tspinCheck();
    const cells = this.cellsOf(p);
    let above = true;
    const pid = ++this.pidN, loc = CELLS[p.type][p.rot]; let pcx = 0, pby = 0; cells.forEach(([x, y]) => { pcx += x + 0.5; pby = Math.max(pby, y + 1); }); pcx /= 4;
    const born = typeof performance !== 'undefined' ? performance.now() / 1000 : 0;
    for (let i = 0; i < cells.length; i++) { const [x, y] = cells[i]; if (y >= 0) { this.board[y][x] = tIdx; if (this.meta) this.meta[y][x] = { pid, lx: loc[i][0], ly: loc[i][1], pcx, pby, born, cut: 0 }; } if (y >= HIDDEN) above = false; }
    this.piece = null; this.canHold = true;
    if (above) return this.gameOver();
    const full = [];
    for (let y = 0; y < ROWS; y++) if (this.board[y].every((v) => v)) full.push(y);
    const n = full.length;
    let pts = 0, label = '';
    const names = ['', 'SINGLE', 'DOUBLE', 'TRIPLE', 'TETRIS'];
    if (ts === 'full') { pts = [400, 800, 1200, 1600][n]; label = 'T-SPIN' + (n ? ' ' + names[n] : ''); }
    else if (ts === 'mini') { pts = [100, 200, 400][n] || 400; label = 'MINI T-SPIN' + (n ? ' ' + names[n] : ''); }
    else { pts = [0, 100, 300, 500, 800][n]; label = names[n]; }
    let b2bBonus = false;
    if (n > 0) {
      const difficult = n === 4 || !!ts;
      if (difficult && this.b2b) { pts *= 1.5; b2bBonus = true; }
      this.b2b = difficult;
      this.combo++;
    } else this.combo = -1;
    pts = Math.floor(pts * this.level);
    if (this.combo > 0) pts += 50 * this.combo * this.level;
    // perfect clear?
    let pc = false;
    if (n > 0) { const remaining = this.board.filter((r, y) => !full.includes(y)).some((r) => r.some((v) => v)); pc = !remaining; if (pc) pts += [800, 1200, 1800, 2000][n - 1] * this.level; }
    this.score += pts;
    if (n === 4) this.stats.tetris++;
    if (ts && n) this.stats.tspin++;
    this.stats.maxCombo = Math.max(this.stats.maxCombo, this.combo);
    const info = { n, rows: full, tspin: ts, label, b2b: b2bBonus, combo: this.combo, pc, pts, cells, type: p.type, hard: !!this.hardFlag };
    if (n > 0) {
      this.state = 'clearing'; this.clearRows = full; this.clearT = 0;
      this.h.onClear && this.h.onClear(info);
    } else {
      this.h.onLock && this.h.onLock(info);
      this.spawn();
    }
  }
  finishClear() {
    const rows = this.clearRows;
    if (this.meta) this.splitFragments(rows);
    this.board = this.board.filter((_, y) => !rows.includes(y));
    while (this.board.length < ROWS) this.board.unshift(new Array(COLS).fill(0));
    if (this.meta) { this.meta = this.meta.filter((_, y) => !rows.includes(y)); while (this.meta.length < ROWS) this.meta.unshift(new Array(COLS).fill(null)); }
    this.lines += rows.length; this.linesInStage += rows.length; this.clearRows = [];
    if (this.linesInStage >= LINES_PER_STAGE) {
      this.linesInStage -= LINES_PER_STAGE;
      this.stageIdx++;
      if (this.stageIdx >= STAGES.length) { this.stageIdx = 0; this.lap++; }
      this.state = 'transition'; this.transT = 0;
      this.updateLevel();
      this.h.onStage && this.h.onStage(this.stageIdx, this.lap);
      return;
    }
    this.updateLevel();
    this.state = 'playing';
    this.spawn();
  }
  // a clear can cut a piece in two: give each surviving fragment its own id and mark the sliced faces
  splitFragments(rows) {
    const M = this.meta, gone = (y) => rows.includes(y), seen = new Set(), used = new Set();
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const m = M[y][x]; if (!m || gone(y) || !this.board[y][x]) { if (m && !this.board[y][x]) M[y][x] = null; continue; }
      if (y > 0 && gone(y - 1) && M[y - 1][x] && M[y - 1][x].pid === m.pid) m.cut |= 1;
      if (y < ROWS - 1 && gone(y + 1) && M[y + 1][x] && M[y + 1][x].pid === m.pid) m.cut |= 4;
    }
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const m = M[y][x]; if (!m || gone(y) || seen.has(y * COLS + x)) continue;
      const old = m.pid, nid = used.has(old) ? ++this.pidN : old; used.add(old);
      const st = [[x, y]]; seen.add(y * COLS + x);
      while (st.length) { const [cx, cy] = st.pop(); M[cy][cx] = Object.assign({}, M[cy][cx], { pid: nid });
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = cx + dx, ny = cy + dy; if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS || gone(ny) || seen.has(ny * COLS + nx)) continue; const q = M[ny][nx]; if (q && q.pid === old) { seen.add(ny * COLS + nx); st.push([nx, ny]); } } }
    }
  }
  gameOver() {
    this.state = 'over';
    this.h.onGameOver && this.h.onGameOver();
  }
  update(dt) {
    if (this.state === 'clearing') { this.clearT += dt; if (this.clearT >= CLEAR_TIME) this.finishClear(); return; }
    if (this.state === 'transition') { this.transT += dt; if (this.transT >= TRANSITION_TIME) { this.state = 'playing'; this.spawn(); } return; }
    if (this.state !== 'playing' || !this.piece) return;
    this.time += dt;
    const g = this.gravityMs();
    const iv = this.softDrop ? Math.min(Math.max(g / 20, 8), g) : g;
    this.gravAcc += dt;
    let moved = 0;
    while (this.gravAcc >= iv) {
      this.gravAcc -= iv;
      if (this.stepDown()) { moved++; if (this.softDrop) this.score += 1; }
      else { this.gravAcc = 0; break; }
      if (moved > 22) break;
    }
    if (moved && this.softDrop && this.h.onSoft) this.h.onSoft();
    if (this.grounded()) {
      this.lockTimer += dt;
      if (this.lockTimer >= LOCK_DELAY) this.lock();
    }
  }
}
