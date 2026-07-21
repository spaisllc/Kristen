/* ============================================================================
   Oakley — "Paw Prints in Snowfall" engine
   ----------------------------------------------------------------------------
   A Colorado winter night behind the whole page: layered falling snow, and a
   trail of tiny paw prints wherever the cursor (or finger) goes. Prints linger,
   then fade like real tracks filling in. When nobody's touching the screen, an
   invisible Oakley wanders off by himself, leaving his own trail.

   No dependencies. Honors prefers-reduced-motion.
   ============================================================================ */
(() => {
  'use strict';

  const canvas = document.getElementById('snow');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------- snow */
  const flakes = [];

  function seedFlakes() {
    flakes.length = 0;
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 200);
    for (let i = 0; i < count; i++) {
      const depth = 0.35 + Math.random() * 0.65;      // 0.35 far … 1 near
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: depth * 2.4,
        depth,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.4 + Math.random() * 0.9,
      });
    }
  }

  /* -------------------------------------------------------- pawprints */
  // A paw print: one pad + four toes, drawn in soft snow-shadow blue.
  function drawPaw(x, y, angle, size, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = `rgba(150, 190, 225, ${alpha})`;
    // main pad
    ctx.beginPath();
    ctx.ellipse(0, size * 0.22, size * 0.42, size * 0.34, 0, 0, Math.PI * 2);
    ctx.fill();
    // four toes
    const toes = [-0.75, -0.25, 0.25, 0.75];
    for (const t of toes) {
      ctx.beginPath();
      ctx.ellipse(size * 0.52 * t, -size * 0.34, size * 0.15, size * 0.2, t * 0.25, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  const prints = [];                 // {x, y, angle, born, size}
  // scaled per screen size in resize() — small screens get wider spacing,
  // smaller paws, and shorter-lived trails so prints never clump
  let PRINT_LIFE = 14000;            // ms before fully faded
  let SPACING = 26;                  // px of travel between prints
  let PAW_SIZE = 13;                 // base paw print size
  let MAX_PRINTS = 160;
  let printSide = 1;

  function addPrint(x, y, dx, dy) {
    const angle = Math.atan2(dy, dx) + Math.PI / 2;
    // alternate left/right paw, offset perpendicular to travel
    const px = Math.cos(angle) * PAW_SIZE * 0.54 * printSide;
    const py = Math.sin(angle) * PAW_SIZE * 0.54 * printSide;
    prints.push({ x: x + px, y: y + py, angle, born: performance.now(), size: PAW_SIZE + Math.random() * 3 });
    printSide = -printSide;
    if (prints.length > MAX_PRINTS) prints.shift();
  }

  /* ------------------------------------------- pointer trail + wander */
  let last = null;                   // last print position
  let lastInput = 0;
  // the invisible Oakley: picks a waypoint, trots to it at walking pace,
  // picks another. On touch devices he IS the show — no cursor exists.
  const wanderer = { x: 0, y: 0, tx: 0, ty: 0 };
  let wanderAcc = 0;

  function newWaypoint() {
    wanderer.tx = canvas.width * (0.12 + Math.random() * 0.76);
    wanderer.ty = canvas.height * (0.12 + Math.random() * 0.76);
  }

  function trailTo(x, y) {
    lastInput = performance.now();
    if (last) {
      const dx = x - last.x, dy = y - last.y;
      const d = Math.hypot(dx, dy);
      if (d > SPACING) {             // one print every SPACING px of travel
        addPrint(x, y, dx, dy);
        last = { x, y };
      }
    } else {
      last = { x, y };
    }
  }

  window.addEventListener('pointermove', (e) => trailTo(e.clientX, e.clientY), { passive: true });
  window.addEventListener('pointerdown', (e) => {
    // a happy little stampede on tap
    for (let i = 0; i < 3; i++) {
      addPrint(e.clientX + (Math.random() - 0.5) * 30, e.clientY + (Math.random() - 0.5) * 30,
               Math.random() - 0.5, Math.random() - 0.5);
    }
    lastInput = performance.now();
  }, { passive: true });
  window.addEventListener('blur', () => { last = null; });

  /* ----------------------------------------------------------- frame */
  let gust = 0;
  let prevT = 0;

  function frame(t) {
    const dt = Math.min(t - prevT, 50) || 16.7;
    prevT = t;
    const W = canvas.width, H = canvas.height;

    // night sky
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#0b1526');
    sky.addColorStop(0.6, '#101f38');
    sky.addColorStop(1, '#18294a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    gust = Math.sin(t * 0.00012) * 0.35;

    // snow
    for (const f of flakes) {
      f.sway += 0.008 * f.swaySpeed;
      f.y += f.depth * 1.1;
      f.x += Math.sin(f.sway) * 0.5 + gust * f.depth;
      if (f.y > H + 4) { f.y = -4; f.x = Math.random() * W; }
      if (f.x > W + 4) f.x = -4;
      if (f.x < -4) f.x = W + 4;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(235, 242, 252, ${0.25 + f.depth * 0.5})`;
      ctx.fill();
    }

    // idle? an invisible Oakley goes for an actual walk — waypoint to
    // waypoint at ~100px/s, printing with every stride
    if (t - lastInput > 2500) {
      const dx = wanderer.tx - wanderer.x, dy = wanderer.ty - wanderer.y;
      const d = Math.hypot(dx, dy);
      if (d < 14) {
        newWaypoint();
      } else {
        const step = Math.min(dt * 0.1, d);
        wanderer.x += (dx / d) * step;
        wanderer.y += (dy / d) * step;
        wanderAcc += step;
        if (wanderAcc > SPACING) {
          addPrint(wanderer.x, wanderer.y, dx, dy);
          wanderAcc = 0;
        }
      }
    }

    // prints, fading like tracks filling back in
    for (let i = prints.length - 1; i >= 0; i--) {
      const age = t - prints[i].born;
      if (age > PRINT_LIFE) { prints.splice(i, 1); continue; }
      const fade = 1 - age / PRINT_LIFE;
      drawPaw(prints[i].x, prints[i].y, prints[i].angle, prints[i].size, 0.5 * fade);
    }

    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------ boot */
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (Math.min(canvas.width, canvas.height) < 720) {
      SPACING = 36; PAW_SIZE = 10; PRINT_LIFE = 9000; MAX_PRINTS = 90;
    } else {
      SPACING = 26; PAW_SIZE = 13; PRINT_LIFE = 14000; MAX_PRINTS = 160;
    }
    seedFlakes();
  }
  window.addEventListener('resize', resize);
  resize();
  wanderer.x = canvas.width / 2;
  wanderer.y = canvas.height / 2;
  newWaypoint();

  if (reduced) {
    // one still winter frame, no animation, no trails
    const W = canvas.width, H = canvas.height;
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#0b1526');
    sky.addColorStop(1, '#18294a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);
    for (const f of flakes) {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(235,242,252,${0.25 + f.depth * 0.5})`;
      ctx.fill();
    }
    return;
  }

  requestAnimationFrame(frame);
})();
