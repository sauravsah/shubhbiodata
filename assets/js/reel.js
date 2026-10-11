/* ShubhBiodata Biodata Reel: a ~15 s vertical (720×1280, 9:16) video drawn on a canvas from SB.model(state)
   and recorded in the browser with MediaRecorder (MP4/H.264 where supported, else WebM). Optional soft
   background music is synthesised live with WebAudio (an original pentatonic tune; no audio files).
   Loaded only when "Make a Reel" is tapped. Public: SB_REEL.open(root, api), SB_REEL.stop(). */
(function () {
  "use strict";
  var SB = window.SB, IC = window.SB_ICONS, FX = window.SB_FX || {}, I = window.SB_I18N;
  var W = 720, H = 1280, FPS = 30;
  var esc = SB.esc;

  // ---------- easing / helpers ----------
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function eo(x) { x = clamp(x, 0, 1); return 1 - Math.pow(1 - x, 3); }
  function eio(x) { x = clamp(x, 0, 1); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function rng(seed) { var a = seed >>> 0; return function () { a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function hexA(hex, a) { var n = parseInt(hex.slice(1), 16); return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")"; }
  function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function loadImg(src) { return new Promise(function (res) { if (!src) return res(null); var im = new Image(); im.onload = function () { res(im); }; im.onerror = function () { res(null); }; im.src = src; }); }

  // ---------- the film: scenes built from the model ----------
  function build(m) {
    var P = m.tpl.reel, script = m.script, rtl = m.dir === "rtl";
    function pickRows(rows, keys, n) {
      var out = []; keys.forEach(function (k) { var r = rows.filter(function (x) { return x.k === k; })[0]; if (r && out.length < n) out.push(r); });
      rows.forEach(function (r) { if (out.length < n && out.indexOf(r) < 0) out.push(r); });
      return out;
    }
    var S = [];
    S.push({ type: "intro", d: 2.4 });
    S.push({ type: "hero", d: 2.9 });
    var pr = pickRows(m.sections.personal, ["dob", "height", "birthPlace", "religion", "caste"], 4); if (pr.length) S.push({ type: "rows", d: 2.3, head: m.heads.personal, icon: "user", rows: pr });
    var cr = pickRows(m.sections.career, ["education", "occupation", "company", "income"], 4); if (cr.length) S.push({ type: "rows", d: 2.3, head: m.heads.career, icon: "cap", rows: cr });
    var fr = pickRows(m.sections.family, ["father", "mother", "native", "brothers", "sisters"], 4); if (fr.length) S.push({ type: "rows", d: 2.3, head: m.heads.family, icon: "users", rows: fr });
    var about = m.about ? firstSentences(m.about, 150) : "";
    if (m.chips.length || about) S.push({ type: "vibe", d: 2.6, head: m.chips.length ? m.heads.vibe : m.heads.about, chips: m.chips.slice(0, 8), about: about });
    var cp = m.sections.contact.filter(function (r) { return r.k === "contactPerson" || r.k === "phone"; });
    S.push({ type: "close", d: 2.6, rows: cp });
    var tot = S.reduce(function (a, s) { return a + s.d; }, 0), k = tot < 13 ? 13 / tot : tot > 15.5 ? 15.5 / tot : 1, t = 0;
    S.forEach(function (s) { s.d *= k; s.t0 = t; t += s.d; });
    return { scenes: S, dur: t, P: P, script: script, rtl: rtl, m: m };
  }
  function firstSentences(s, max) {
    s = s.replace(/\s+/g, " ").trim(); if (s.length <= max) return s;
    var cut = s.slice(0, max), i = Math.max(cut.lastIndexOf("।"), cut.lastIndexOf(". "), cut.lastIndexOf("۔"), cut.lastIndexOf("! "));
    return i > 40 ? cut.slice(0, i + 1) : cut.replace(/\s+\S*$/, "") + "…";
  }

  // ---------- renderer ----------
  function Renderer(canvas, film, assets) {
    var ctx = canvas.getContext("2d"), P = film.P, m = film.m, rtl = film.rtl;
    var R = rng(20261011), parts = [], i;
    for (i = 0; i < 42; i++) parts.push({ x: R() * W, y: R() * H, s: 7 + R() * 10, vy: 40 + R() * 70, amp: 10 + R() * 30, w: 0.6 + R() * 1.2, ph: R() * 6.28, rot: R() * 6.28, vr: -1 + R() * 2, c: ["#ff9f1c", "#ffbf47", "#ff7a59", "#f7a1c4", "#ffd166", P.acc][i % 6], k: i % 4 === 0 ? 1 : 0, a: 0.5 + R() * 0.45 });
    function font(w, size, kind) { ctx.font = w + " " + size + "px " + SB.fontStack(film.script, kind); }
    function fontAny(w, size, fam) { ctx.font = w + " " + size + "px " + fam; }
    function wrap(text, maxW) {
      var words = String(text).split(/\s+/), lines = [], cur = "";
      words.forEach(function (w) { var test = cur ? cur + " " + w : w; if (ctx.measureText(test).width <= maxW || !cur) cur = test; else { lines.push(cur); cur = w; } });
      if (cur) lines.push(cur); return lines;
    }
    function fit(text, w, size, min, kind, maxW, maxLines) {
      var s = size, lines;
      do { font(w, s, kind); lines = wrap(text, maxW); if (lines.length <= maxLines && lines.every(function (l) { return ctx.measureText(l).width <= maxW; })) break; s -= 2; } while (s > min);
      if (lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, "") + "…"; }
      return { size: s, lines: lines };
    }
    function center(lines, y, lh) { ctx.textAlign = "center"; lines.forEach(function (l, i) { ctx.fillText(l, W / 2, y + i * lh); }); }
    function bg(t) {
      var a = t * 0.12, g = ctx.createLinearGradient(W / 2 + Math.cos(a) * 300, 0, W / 2 - Math.cos(a) * 300, H);
      g.addColorStop(0, P.bg[0]); g.addColorStop(0.55, P.bg[1]); g.addColorStop(1, P.bg[2]);
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      var rg = ctx.createRadialGradient(W / 2, H * 0.42, 40, W / 2, H * 0.42, 620);
      rg.addColorStop(0, P.dark ? "rgba(255,220,160,.20)" : "rgba(255,255,255,.55)"); rg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
    }
    function particles(t, boost) {
      parts.forEach(function (p, i) {
        var y = ((p.y + p.vy * t) % (H + 60)) - 30, x = p.x + Math.sin(t * p.w + p.ph) * p.amp;
        ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot + p.vr * t);
        ctx.globalAlpha = p.a * (p.k ? 0.5 + 0.5 * Math.sin(t * 3 + i) : 1) * (boost || 1); ctx.fillStyle = p.c;
        if (p.k) FX.sparkPath(ctx, p.s * 0.8); else FX.petalPath(ctx, p.s);
        ctx.restore();
      });
    }
    function mandala(cx, cy, r, t, col, a) {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.15); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2;
      for (var i = 0; i < 16; i++) { ctx.rotate(Math.PI / 8); ctx.beginPath(); ctx.ellipse(0, -r * 0.72, r * 0.08, r * 0.24, 0, 0, Math.PI * 2); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r * 0.4, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
    function divider(y, a) {
      ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = P.acc; ctx.fillStyle = P.acc; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(W / 2 - 150, y); ctx.lineTo(W / 2 - 22, y); ctx.moveTo(W / 2 + 22, y); ctx.lineTo(W / 2 + 150, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(W / 2, y - 10); ctx.lineTo(W / 2 + 10, y); ctx.lineTo(W / 2, y + 10); ctx.lineTo(W / 2 - 10, y); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    function card(x, y, w, h, a) {
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = P.dark ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.72)"; rr(ctx, x, y, w, h, 26); ctx.fill();
      ctx.strokeStyle = P.dark ? "rgba(255,255,255,.22)" : hexA(P.acc, 0.25); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
    }
    function headChip(text, icon, y, a) {
      font("700", 34, "body"); var tw = ctx.measureText(text).width, w = Math.min(W - 80, tw + 110), x = (W - w) / 2;
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = P.acc; rr(ctx, x, y - 38, w, 76, 38); ctx.fill();
      var im = assets.icons[icon + "|head"]; if (im) ctx.drawImage(im, rtl ? x + w - 66 : x + 22, y - 22, 44, 44);
      ctx.fillStyle = P.dark ? P.bg[0] : "#ffffff"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.direction = rtl ? "rtl" : "ltr";
      ctx.fillText(text, x + w / 2 + (rtl ? -22 : 22), y + 2); ctx.restore(); ctx.textBaseline = "alphabetic";
    }

    var SC = {
      intro: function (s, lt, a) {
        mandala(W / 2, 640, 300, lt, P.acc, 0.22 * a);
        var y = m.blessing ? (m.blessing.big ? 470 : 520) : 560;
        if (m.blessing) {
          var bt = m.blessing.text, fam = m.blessing.rtl ? "'Noto Naskh Arabic',serif" : /[\u0A00-\u0A7F]/.test(bt) ? "'Noto Sans Gurmukhi','Noto Sans Devanagari',sans-serif" : /[\u0B80-\u0BFF]/.test(bt) ? "'Noto Sans Tamil',sans-serif" : /[\u0C00-\u0C7F]/.test(bt) ? "'Noto Sans Telugu',sans-serif" : /[\u0B00-\u0B7F]/.test(bt) ? "'Noto Sans Oriya','Noto Sans Devanagari',sans-serif" : /[\u0980-\u09FF]/.test(bt) ? "'Noto Sans Bengali','Noto Serif Devanagari',serif" : SB.fontStack(film.script, "display");
          var sz = m.blessing.big ? 110 : 40; fontAny("700", sz, fam);
          while (ctx.measureText(bt).width > W - 100 && sz > 22) { sz -= 2; fontAny("700", sz, fam); }
          ctx.save(); ctx.globalAlpha = a * eo((lt - 0.1) / 0.6); ctx.fillStyle = P.acc; ctx.textAlign = "center"; ctx.direction = m.blessing.rtl ? "rtl" : "ltr";
          ctx.fillText(bt, W / 2, y + (1 - eo(lt / 0.7)) * 30); ctx.restore();
          y += m.blessing.big ? 90 : 70;
        }
        divider(y, a * eo((lt - 0.4) / 0.5));
        var f = fit(m.title, "700", 70, 36, "display", W - 120, 2);
        ctx.save(); ctx.globalAlpha = a * eo((lt - 0.55) / 0.6); ctx.fillStyle = P.text; ctx.direction = rtl ? "rtl" : "ltr";
        center(f.lines, y + 100 + (1 - eo((lt - 0.55) / 0.7)) * 40, f.size * 1.35); ctx.restore();
      },
      hero: function (s, lt, a) {
        var cx = W / 2, cy = 540, Rr = 215, rev = eo(lt / 0.9), z = 1.14 - 0.14 * eio(lt / s.d);
        ctx.save(); ctx.globalAlpha = a;
        ctx.beginPath(); ctx.arc(cx, cy, (Rr + 18) * rev, 0, Math.PI * 2); ctx.fillStyle = hexA(P.acc, 0.35); ctx.fill();
        ctx.beginPath(); ctx.arc(cx, cy, Rr * rev, 0, Math.PI * 2); ctx.clip();
        if (assets.photo) {
          var im = assets.photo, sc = Math.max(2 * Rr / im.width, 2 * Rr / im.height) * z, w = im.width * sc, h = im.height * sc;
          ctx.drawImage(im, cx - w / 2, cy - h / 2 + 10, w, h);
        } else {
          var g = ctx.createLinearGradient(cx - Rr, cy - Rr, cx + Rr, cy + Rr); g.addColorStop(0, P.acc); g.addColorStop(1, P.acc2); ctx.fillStyle = g; ctx.fillRect(cx - Rr, cy - Rr, 2 * Rr, 2 * Rr);
          var ini = (m.name || "♥").trim().split(/\s+/).map(function (x) { return Array.from(x)[0]; }).slice(0, 2).join("");
          font("700", 150, "display"); ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(ini, cx, cy + 6); ctx.textBaseline = "alphabetic";
        }
        ctx.restore();
        ctx.save(); ctx.globalAlpha = a * rev; ctx.strokeStyle = P.acc; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, Rr + 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * rev); ctx.stroke(); ctx.restore();
        var na = a * eo((lt - 0.6) / 0.6), f = fit(m.name || "—", "700", 84, 40, "display", W - 90, 2);
        ctx.save(); ctx.globalAlpha = na; ctx.fillStyle = P.text; ctx.direction = rtl ? "rtl" : "ltr";
        var ny = 870 + (1 - eo((lt - 0.6) / 0.7)) * 40; center(f.lines, ny, f.size * 1.3);
        if (m.tag) { var tf = fit(m.tag, "600", 34, 22, "body", W - 120, 2); ctx.globalAlpha = a * eo((lt - 0.9) / 0.6); ctx.fillStyle = P.acc; center(tf.lines, ny + f.lines.length * f.size * 1.3 + 14, tf.size * 1.4); }
        ctx.restore();
      },
      rows: function (s, lt, a) {
        var x = 64, w = W - 128;
        var fits = s.rows.map(function (r) { return fit(r.value, "600", 38, 24, "body", w - 64, 2); });
        var block = 100 + fits.reduce(function (q, vf) { return q + 92 + vf.lines.length * vf.size * 1.32; }, 0);
        var top = Math.max(250, (H - block) / 2 - 20);
        headChip(s.head, s.icon, top + 38, a * eo(lt / 0.45));
        var y = top + 110;
        s.rows.forEach(function (r, i) {
          var ra = a * eo((lt - 0.18 - i * 0.14) / 0.45), off = (1 - eo((lt - 0.18 - i * 0.14) / 0.5)) * 50;
          var vf = fits[i], h = 70 + vf.lines.length * vf.size * 1.32;
          ctx.save(); ctx.translate(rtl ? -off : off, 0); card(x, y, w, h, ra);
          ctx.globalAlpha = ra; ctx.direction = rtl ? "rtl" : "ltr"; ctx.textAlign = rtl ? "right" : "left";
          var tx = rtl ? x + w - 32 : x + 32;
          font("600", 25, "body"); ctx.fillStyle = P.dark ? P.acc2 : P.acc; ctx.fillText(r.label, tx, y + 44);
          font("600", vf.size, "body"); ctx.fillStyle = P.text; vf.lines.forEach(function (l, j) { ctx.fillText(l, tx, y + 50 + (j + 1) * vf.size * 1.25); });
          ctx.restore(); y += h + 22;
        });
      },
      vibe: function (s, lt, a) {
        var maxW = W - 100, rows = [[]], rw = [0];
        font("600", 30, "body");
        s.chips.forEach(function (c) { var w = ctx.measureText(c.label).width + 104; if (rw[rw.length - 1] + w > maxW && rows[rows.length - 1].length) { rows.push([]); rw.push(0); } rows[rows.length - 1].push({ c: c, w: w }); rw[rw.length - 1] += w + 16; });
        var af0 = s.about ? fit(s.about, "400", 34, 24, "body", W - 170, 6) : null;
        var block = 110 + (s.chips.length ? Math.min(rows.length, 5) * 90 + 20 : 0) + (af0 ? 70 + af0.lines.length * af0.size * 1.45 : 0);
        var top = Math.max(250, (H - block) / 2 - 20);
        headChip(s.head, "sparkle", top + 38, a * eo(lt / 0.45));
        var y = top + 110;
        if (s.chips.length) {
          var n = 0;
          rows.forEach(function (row, ri) {
            var tot = row.reduce(function (q, x) { return q + x.w; }, 0) + 16 * (row.length - 1), x = (W - tot) / 2;
            if (rtl) row = row.slice().reverse();
            row.forEach(function (it) {
              var ca = a * eo((lt - 0.2 - n * 0.09) / 0.4), sc = 0.6 + 0.4 * eo((lt - 0.2 - n * 0.09) / 0.45); n++;
              ctx.save(); ctx.globalAlpha = ca; ctx.translate(x + it.w / 2, y + 36); ctx.scale(sc, sc);
              ctx.fillStyle = P.dark ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.85)"; rr(ctx, -it.w / 2, -36, it.w, 72, 36); ctx.fill();
              ctx.strokeStyle = hexA(P.acc, 0.5); ctx.lineWidth = 2; ctx.stroke();
              var im = assets.icons[it.c.icon + "|chip"]; if (im) ctx.drawImage(im, rtl ? it.w / 2 - 60 : -it.w / 2 + 22, -19, 38, 38);
              font("600", 30, "body"); ctx.fillStyle = P.text; ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.direction = "ltr";
              if (rtl) { ctx.direction = "rtl"; ctx.textAlign = "right"; ctx.fillText(it.c.label, it.w / 2 - 74, 2); } else ctx.fillText(it.c.label, -it.w / 2 + 74, 2);
              ctx.restore(); x += it.w + 16;
            });
            y += 90; if (ri > 3) return;
          });
          y += 20;
        }
        if (s.about) {
          var af = af0, h = 70 + af.lines.length * af.size * 1.45, aa = a * eo((lt - 0.7) / 0.6);
          card(60, y, W - 120, h, aa);
          ctx.save(); ctx.globalAlpha = aa; ctx.fillStyle = P.acc; fontAny("700", 90, "'Fraunces',serif"); ctx.textAlign = rtl ? "right" : "left"; ctx.fillText(rtl ? "”" : "“", rtl ? W - 80 : 80, y + 78);
          font("400", af.size, "body"); ctx.fillStyle = P.text; ctx.direction = rtl ? "rtl" : "ltr"; center(af.lines, y + 60 + af.size, af.size * 1.45); ctx.restore();
        }
      },
      close: function (s, lt, a) {
        mandala(W / 2, 520, 250, lt, P.acc, 0.25 * a);
        var sa = a * eo(lt / 0.6), sc = 0.85 + 0.15 * eo(lt / 0.7);
        var f = fit(m.heads.shubh, "700", 92, 44, "display", W - 100, 2);
        ctx.save(); ctx.globalAlpha = sa; ctx.translate(W / 2, 520); ctx.scale(sc, sc); ctx.fillStyle = P.acc; ctx.direction = rtl ? "rtl" : "ltr"; ctx.textAlign = "center";
        f.lines.forEach(function (l, i) { ctx.fillText(l, 0, (i - (f.lines.length - 1) / 2) * f.size * 1.25 + f.size * 0.35); }); ctx.restore();
        divider(650, a * eo((lt - 0.3) / 0.5));
        var y = 740;
        if (s.rows.length) {
          ctx.save(); ctx.globalAlpha = a * eo((lt - 0.45) / 0.5); font("600", 28, "body"); ctx.fillStyle = P.dark ? P.acc2 : P.acc; ctx.direction = rtl ? "rtl" : "ltr"; center([m.heads.contact], y, 34); ctx.restore();
          y += 30;
          s.rows.forEach(function (r, i) {
            var ra = a * eo((lt - 0.6 - i * 0.15) / 0.5), vf = fit(r.value, r.k === "phone" ? "700" : "600", r.k === "phone" ? 52 : 36, 24, "body", W - 120, 2);
            ctx.save(); ctx.globalAlpha = ra; ctx.fillStyle = P.text; ctx.direction = r.k === "phone" ? "ltr" : (rtl ? "rtl" : "ltr");
            y += vf.size * 1.4; center(vf.lines, y, vf.size * 1.3); y += (vf.lines.length - 1) * vf.size * 1.3 + 12; ctx.restore();
          });
        }
        ctx.save(); ctx.globalAlpha = 0.75 * a * eo((lt - 1) / 0.6); fontAny("600", 24, "'Noto Sans Devanagari',sans-serif"); ctx.fillStyle = P.text; ctx.textAlign = "center"; ctx.direction = "ltr";
        ctx.fillText("Made with ShubhBiodata", W / 2, H - 70); ctx.restore();
      }
    };
    this.draw = function (t) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.direction = "ltr";
      bg(t);
      var sc = film.scenes, cur = sc[sc.length - 1];
      for (var i = 0; i < sc.length; i++) if (t < sc[i].t0 + sc[i].d) { cur = sc[i]; break; }
      var lt = clamp(t - cur.t0, 0, cur.d), last = cur === sc[sc.length - 1];
      var a = eo(lt / 0.45) * (last ? 1 : clamp((cur.d - lt) / 0.35, 0, 1));
      particles(t, cur.type === "close" ? 1.3 : 1);
      ctx.save(); SC[cur.type](cur, lt, a); ctx.restore();
    };
  }

  // ---------- music: original gentle tune in D major pentatonic (synthesised, royalty-free) ----------
  function music(actx, dest, dur) {
    var t0 = actx.currentTime + 0.05, master = actx.createGain();
    master.gain.setValueAtTime(0, t0); master.gain.linearRampToValueAtTime(0.7, t0 + 0.8);
    master.gain.setValueAtTime(0.7, t0 + dur - 1.4); master.gain.linearRampToValueAtTime(0, t0 + dur);
    master.connect(dest);
    var verb = actx.createDelay(); verb.delayTime.value = 0.23; var fb = actx.createGain(); fb.gain.value = 0.28; var wet = actx.createGain(); wet.gain.value = 0.35;
    verb.connect(fb); fb.connect(verb); verb.connect(wet); wet.connect(master);
    function hz(n) { return 440 * Math.pow(2, (n - 69) / 12); }
    function note(n, at, len, type, vol, toVerb) {
      var o = actx.createOscillator(), g = actx.createGain(); o.type = type; o.frequency.value = hz(n);
      g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(vol, at + Math.min(0.06, len / 4)); g.gain.exponentialRampToValueAtTime(0.0008, at + len);
      o.connect(g); g.connect(master); if (toVerb) g.connect(verb); o.start(at); o.stop(at + len + 0.05);
    }
    var bar = 2.5, beat = bar / 4;
    var chords = [[50, 54, 57], [47, 50, 54], [43, 47, 50], [45, 49, 52], [50, 54, 57], [50, 54, 57, 62]]; // D, Bm, G, A, D, D
    var mel = [[74, 76, 78, 81, 78, 76, 74, 76], [74, 71, 74, 76, 78, 76, 74, 71], [71, 74, 76, 79, 78, 76, 74, 76], [76, 78, 81, 83, 81, 78, 76, 73], [74, 76, 78, 81, 83, 81, 78, 76], [78, 76, 74]];
    var bars = Math.ceil(dur / bar);
    for (var b = 0; b < bars; b++) {
      var at = t0 + b * bar, c = chords[Math.min(b, chords.length - 1)];
      c.forEach(function (n) { note(n, at, bar * 1.05, "sine", 0.05, false); note(n + 12, at, bar * 0.9, "triangle", 0.012, false); });
      note(c[0] - 12, at, bar * 0.95, "sine", 0.07, false);
      var ml = mel[Math.min(b, mel.length - 1)];
      ml.forEach(function (n, i) { var tt = at + i * (bar / ml.length); if (tt < t0 + dur - 0.4) note(n, tt, beat * (i === ml.length - 1 ? 2.2 : 1.2), "triangle", 0.075, true); });
      note(c[2] + 24, at + beat * 2, 1.2, "sine", 0.02, true); // little bell
    }
    return master;
  }

  // ---------- recording ----------
  // H.264 MP4 first (plays everywhere, incl. WhatsApp); then any MP4 the browser offers; then WebM.
  var MIMES = ["video/mp4;codecs=avc1.42E01E,mp4a.40.2", "video/mp4;codecs=avc1.42E01E,opus", "video/mp4;codecs=avc1", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"];
  function pickMime() { if (!window.MediaRecorder || !MediaRecorder.isTypeSupported) return ""; for (var i = 0; i < MIMES.length; i++) if (MediaRecorder.isTypeSupported(MIMES[i])) return MIMES[i]; return ""; }
  function canRecord(cv) { return !!(window.MediaRecorder && cv.captureStream && pickMime()); }

  var cur = null; // { raf, actx, rec, url }
  function stop() {
    if (!cur) return;
    cancelAnimationFrame(cur.raf); cur.raf = 0;
    if (cur.rec && cur.rec.state !== "inactive") { cur.cancelled = true; try { cur.rec.stop(); } catch (e) {} }
    if (cur.actx) { try { cur.actx.close(); } catch (e) {} cur.actx = null; }
  }

  function open(root, api) {
    stop();
    var t = api.t, st = api.state(), m = SB.model(st), film = build(m);
    var hasRec = typeof HTMLCanvasElement !== "undefined" && canRecord(document.createElement("canvas"));
    root.innerHTML = '<div class="reel"><div class="reel-h"><div><h3>' + esc(t("reelTitle")) + "</h3><p>" + esc(t("reelSub")) + '</p></div><button type="button" class="iconbtn" data-close aria-label="' + esc(t("reelClose")) + '">' + IC.svg("x") + "</button></div>" +
      '<div class="reel-stage"><canvas id="reelCv" width="' + W + '" height="' + H + '" lang="' + m.lang + '"></canvas><video id="reelVid" playsinline controls hidden></video>' +
      '<div class="reel-prog" hidden><div class="bar"><i></i></div><span></span></div></div>' +
      '<label class="sw reel-music"><span class="sw-t">' + IC.svg("music") + esc(t("reelMusic")) + '</span><span class="sw-ui"><input type="checkbox" id="reelMusic"' + (st.music !== false ? " checked" : "") + "><i></i></span></label>" +
      (hasRec ? "" : '<p class="reel-note warn">' + esc(t("reelNoRec")) + "</p>") +
      '<div class="reel-act" id="reelAct"></div><p class="reel-note" id="reelNote"></p></div>';
    var cv = root.querySelector("#reelCv"), vid = root.querySelector("#reelVid"), act = root.querySelector("#reelAct"), note = root.querySelector("#reelNote");
    var prog = root.querySelector(".reel-prog"), bar = prog.querySelector("i"), plabel = prog.querySelector("span");
    var assets = { photo: null, icons: {} }, rend = null;
    cur = { raf: 0 };
    var text = [m.title, m.name, m.tag, m.about, m.heads.shubh, m.heads.vibe, m.heads.personal, m.heads.career, m.heads.family, m.heads.contact, m.blessing ? m.blessing.text : ""]
      .concat(m.chips.map(function (c) { return c.label; })).concat(["personal", "career", "family", "contact"].reduce(function (a, k) { return a.concat(m.sections[k].map(function (r) { return r.label + " " + r.value; })); }, [])).join(" ");
    var iconList = [["user", "head"], ["cap", "head"], ["users", "head"], ["sparkle", "head"]].concat(m.chips.map(function (c) { return [c.icon, "chip"]; }));
    var ready = Promise.all([SB.ensureFonts(text), loadImg(m.photo).then(function (im) { assets.photo = im; })].concat(iconList.map(function (p) {
      var col = p[1] === "head" ? (film.P.dark ? film.P.bg[0] : "#ffffff") : film.P.acc;
      return loadImg(IC.dataURL(p[0], col, 2)).then(function (im) { assets.icons[p[0] + "|" + p[1]] = im; });
    }))).then(function () { rend = new Renderer(cv, film, assets); });

    function buttons(mode) {
      var h = "";
      if (mode === "start") h = hasRec ? '<button type="button" class="btn big" id="reelGo">' + IC.svg("film") + "<span>" + esc(t("reelMake")) + "</span></button>"
        : '<button type="button" class="btn" id="reelJpg">' + IC.svg("image") + "<span>" + esc(t("jpg")) + "</span></button>";
      if (mode === "done") h = '<button type="button" class="btn" id="reelDl">' + IC.svg("download") + "<span>" + esc(t("reelDownload")) + '</span></button><button type="button" class="btn wa" id="reelWa">' + IC.svg("chat") + "<span>" + esc(t("reelShare")) + '</span></button><button type="button" class="btn ghost" id="reelRe">' + IC.svg("shuffle") + "<span>" + esc(t("reelAgain")) + "</span></button>";
      act.innerHTML = h;
    }
    function playMusic(on) {
      if (!on || !(window.AudioContext || window.webkitAudioContext)) return null;
      var actx = new (window.AudioContext || window.webkitAudioContext)(), dest = actx.createMediaStreamDestination ? actx.createMediaStreamDestination() : null;
      var gm = music(actx, actx.destination, film.dur + 0.3);
      if (dest) gm.connect(dest);
      return { actx: actx, dest: dest };
    }
    function preview() {
      if (!rend) return;
      stop(); cur = { raf: 0 };
      var mu = playMusic(root.querySelector("#reelMusic").checked); if (mu) cur.actx = mu.actx;
      var t0 = performance.now();
      (function loop(now) {
        var el = (now - t0) / 1000;
        rend.draw(Math.min(el, film.dur));
        if (el < film.dur + 0.6) cur.raf = requestAnimationFrame(loop);
        else { if (cur.actx) { try { cur.actx.close(); } catch (e) {} cur.actx = null; } note.textContent = ""; }
      })(t0);
    }
    function record() {
      return ready.then(function () {
        stop(); cur = { raf: 0 };
        vid.hidden = true; cv.hidden = false; prog.hidden = false; act.innerHTML = ""; note.textContent = t("reelKeep");
        var stream = cv.captureStream(FPS), mime = pickMime();
        var mu = playMusic(root.querySelector("#reelMusic").checked);
        if (mu) { cur.actx = mu.actx; if (mu.dest) mu.dest.stream.getAudioTracks().forEach(function (tr) { stream.addTrack(tr); }); }
        var chunks = [], rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 4000000, audioBitsPerSecond: 96000 });
        cur.rec = rec;
        return new Promise(function (res, rej) {
          rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
          rec.onerror = function (e) { rej(e.error || new Error("recorder")); };
          rec.onstop = function () {
            stream.getTracks().forEach(function (tr) { tr.stop(); });
            if (cur.actx) { try { cur.actx.close(); } catch (e) {} cur.actx = null; }
            if (cur.cancelled) return rej(new Error("cancel"));
            res(new Blob(chunks, { type: mime.split(";")[0] }));
          };
          rend.draw(0); rec.start(250);
          var t0 = performance.now();
          (function loop(now) {
            var el = (now - t0) / 1000, p = Math.min(1, el / film.dur);
            rend.draw(Math.min(el, film.dur));
            bar.style.width = (p * 100).toFixed(1) + "%"; plabel.textContent = t("reelRendering").replace("{n}", Math.round(p * 100));
            if (el < film.dur + 0.25) cur.raf = requestAnimationFrame(loop); else rec.stop();
          })(t0);
        });
      }).then(function (blob) {
        prog.hidden = true; note.textContent = "";
        var ext = /mp4/.test(blob.type) ? "mp4" : "webm", name = SB.fileBase(st, "biodata-reel") + "." + ext;
        if (cur.url) URL.revokeObjectURL(cur.url);
        cur.url = URL.createObjectURL(blob); cur.blob = blob; cur.name = name; window.SB_REEL.last = { blob: blob, name: name, type: blob.type };
        vid.src = cur.url; vid.hidden = false; cv.hidden = true; vid.muted = false; vid.play().catch(function () {});
        buttons("done"); note.textContent = t("reelReady") + " · " + (blob.size / 1048576).toFixed(1) + " MB · " + ext.toUpperCase();
        return blob;
      }, function (err) { prog.hidden = true; if (err && err.message === "cancel") return; note.textContent = t("exportFail"); buttons("start"); throw err; });
    }
    act.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.id === "reelGo" || b.id === "reelRe") record().catch(function (err) { if (err && err.message !== "cancel") console.error(err); });
      else if (b.id === "reelDl") { SB.saveBlob(cur.blob, cur.name); api.celebrate(); }
      else if (b.id === "reelWa") api.shareFile(cur.blob, cur.name, cur.blob.type);
      else if (b.id === "reelJpg") { api.close(); stop(); document.getElementById("btnJpg").click(); }
    });
    root.querySelector("#reelMusic").addEventListener("change", function (e) { st.music = e.target.checked; api.save(); });
    buttons("start");
    ready.then(function () { rend.draw(0); preview(); });
    window.SB_REEL._debug = { film: film, ready: ready, drawAt: function (tt) { return ready.then(function () { stop(); rend.draw(tt); }); }, record: record, preview: preview, canvas: cv };
  }
  window.SB_REEL = { open: open, stop: stop, build: build, pickMime: pickMime };
})();
