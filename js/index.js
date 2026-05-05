// Cursor
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
  cur.style.left = ring.style.left = e.clientX + 'px';
  cur.style.top  = ring.style.top  = e.clientY + 'px';
});
window.addEventListener('touchstart', () => {
  cur.style.display = ring.style.display = 'none';
}, { once: true });

// Stars
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let W, H, stars = [];
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', () => { resize(); buildStars(); });
function buildStars() {
  stars = [];
  const n = Math.floor(W * H / 4200);
  for (let i = 0; i < n; i++) stars.push({
    x: Math.random()*W, y: Math.random()*H,
    r: Math.random()*1.6+0.25,
    a: Math.random(), da: (Math.random()*.006+.001)*(Math.random()<.5?1:-1),
    min: Math.random()*.06+.03, max: Math.random()*.6+.3
  });
}
buildStars();
(function draw() {
  ctx.clearRect(0,0,W,H);
  for (const s of stars) {
    s.a += s.da;
    if (s.a > s.max || s.a < s.min) s.da *= -1;
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(240,230,210,${s.a})`; ctx.fill();
  }
  requestAnimationFrame(draw);
})();

// Shooting stars
function spawnShoot() {
  const el = document.createElement('div');
  el.className = 'shoot';
  el.style.left = Math.random() * 60 + '%';
  el.style.top  = Math.random() * 50 + '%';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1400);
  setTimeout(spawnShoot, Math.random() * 8000 + 6000);
}
setTimeout(spawnShoot, 3500);

// Enter button
document.getElementById('enter-btn').addEventListener('click', () => {
  document.body.classList.add('leaving');
  setTimeout(() => { window.location.href = 'planetarium.html'; }, 650);
});