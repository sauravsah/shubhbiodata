/* ShubhBiodata micro-animations: hero petals and the download confetti. Canvas-only, GPU-cheap,
   paused when off-screen or hidden, and switched off for prefers-reduced-motion. */
(function () {
  "use strict";
  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var COLS = ["#ff9f1c", "#ffbf47", "#ff6f61", "#f7a1c4", "#c9b6ff", "#ffd166"];

  function isDark() { return document.documentElement.getAttribute("data-theme") === "dark"; }
  function petalPath(ctx, s) { ctx.beginPath(); ctx.moveTo(0, -s); ctx.quadraticCurveTo(s * 0.9, -s * 0.2, 0, s); ctx.quadraticCurveTo(-s * 0.9, -s * 0.2, 0, -s); ctx.fill(); }
  function sparkPath(ctx, s) { ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(s * 0.25, -s * 0.25); ctx.lineTo(s, 0); ctx.lineTo(s * 0.25, s * 0.25); ctx.lineTo(0, s); ctx.lineTo(-s * 0.25, s * 0.25); ctx.lineTo(-s, 0); ctx.lineTo(-s * 0.25, -s * 0.25); ctx.closePath(); ctx.fill(); }

  // ---------- hero petals ----------
  function petals(canvas) {
    if (!canvas || RM || !canvas.getContext) return;
    var ctx = canvas.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 1.5), W, H, P = [], run = false, vis = true, raf = 0, last = 0;
    function size() { var r = canvas.getBoundingClientRect(); W = r.width; H = r.height; canvas.width = W * dpr; canvas.height = H * dpr; }
    function mk(top) { return { x: Math.random() * W, y: top ? -20 - Math.random() * H : Math.random() * H, s: 4 + Math.random() * 6, vy: 14 + Math.random() * 22, vx: -6 + Math.random() * 12, r: Math.random() * 6.28, vr: -1 + Math.random() * 2, c: COLS[(Math.random() * COLS.length) | 0], k: Math.random() < 0.22 ? 1 : 0, a: 0.55 + Math.random() * 0.4 }; }
    function frame(t) {
      var dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      var dk = isDark();
      P.forEach(function (p) {
        p.y += p.vy * dt; p.x += (p.vx + Math.sin((t / 1000) + p.r) * 8) * dt; p.r += p.vr * dt;
        if (p.y > H + 20) { var n = mk(true); for (var k in n) p[k] = n[k]; }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = dk ? Math.min(1, p.a + 0.15) : p.a; ctx.fillStyle = p.c;
        if (dk) { ctx.shadowColor = p.k ? "#ffd166" : p.c; ctx.shadowBlur = p.k ? 12 : 6; } // night mode: petals and sparkles glow softly
        if (p.k) sparkPath(ctx, p.s * 0.8); else petalPath(ctx, p.s);
        ctx.restore();
      });
      if (run) raf = requestAnimationFrame(frame);
    }
    function start() { if (run || !vis || document.hidden) return; run = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    function stop() { run = false; cancelAnimationFrame(raf); }
    size(); var n = W < 600 ? 14 : 24; for (var i = 0; i < n; i++) P.push(mk(false));
    window.addEventListener("resize", function () { size(); });
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; if (vis) start(); else stop(); }).observe(canvas);
    start();
  }

  // ---------- confetti burst ----------
  function confetti() {
    if (RM) return;
    var cv = document.createElement("canvas"), ctx = cv.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var W = window.innerWidth, H = window.innerHeight; cv.width = W * dpr; cv.height = H * dpr;
    cv.className = "confetti"; document.body.appendChild(cv);
    var P = [], i, t0 = performance.now(), N = W < 600 ? 90 : 140;
    for (i = 0; i < N; i++) {
      var ang = -Math.PI / 2 + (Math.random() - 0.5) * 1.6, sp = 380 + Math.random() * 520;
      P.push({ x: W / 2 + (Math.random() - 0.5) * 60, y: H * 0.72, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, r: Math.random() * 6, vr: -8 + Math.random() * 16, s: 4 + Math.random() * 5, c: COLS[i % COLS.length], k: i % 3 });
    }
    (function frame(t) {
      var el = (t - t0) / 1000, dt = 1 / 60;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      P.forEach(function (p) {
        p.vy += 900 * dt; p.vx *= 0.985; p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = Math.max(0, 1 - el / 2); ctx.fillStyle = p.c;
        if (p.k === 0) ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); else if (p.k === 1) petalPath(ctx, p.s); else sparkPath(ctx, p.s * 0.8);
        ctx.restore();
      });
      if (el < 2.1) requestAnimationFrame(frame); else cv.remove();
    })(t0);
  }
  window.SB_FX = { petals: petals, confetti: confetti, reducedMotion: RM, petalPath: petalPath, sparkPath: sparkPath, COLS: COLS };
})();
