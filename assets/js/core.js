/* ShubhBiodata core: data model, design registry, A4 sheet renderer and image export.
   No DOM UI here. app.js (the form), reel.js (Biodata Reel) and any future renderer read the same model:
     SB.model(state)          -> plain object with every printable value, already localised
     SB.TEMPLATES / SB.tpl()  -> design registry (palette is shared by the sheet, thumbnails and the Reel)
     SB.sheetHTML(state)      -> A4 sheet markup;  SB.renderCanvas(state) -> 2x canvas via html2canvas
     SB.fontStack(script, kind), SB.ensureFonts(text) -> fonts for canvas renderers (the Reel). */
(function () {
  "use strict";
  var I = window.SB_I18N, C = window.SB_CHIPS, IC = window.SB_ICONS;
  var SCRIPT_SRC = (document.currentScript && document.currentScript.src) || "";
  var ASSETS = SCRIPT_SRC ? new URL("../", SCRIPT_SRC).href : "assets/";

  // ---------- designs ----------
  // pal: colours for thumbnails/UI; reel: colours for the vertical video (bg gradient, text, accents).
  var TEMPLATES = [
    { id: "traditional", name: "Traditional", hi: "पारंपरिक", pal: ["#9b1b1b", "#c8a24a", "#fffaf0"], chip: "#9b1b1b",
      reel: { bg: ["#5c0b16", "#9b1b1b", "#d0782e"], text: "#fff7e6", acc: "#f6c453", acc2: "#ffd9a0", dark: true } },
    { id: "floral", name: "Floral", hi: "फूलों वाला", pal: ["#b5446e", "#7fa37f", "#fff8f8"], chip: "#a8325e",
      reel: { bg: ["#fde2ea", "#f9c9d8", "#e6efdc"], text: "#4a2333", acc: "#b5446e", acc2: "#7fa37f", dark: false } },
    { id: "minimal", name: "Minimal", hi: "सादा", pal: ["#222222", "#c8a24a", "#ffffff"], chip: "#333333",
      reel: { bg: ["#fafaf9", "#f1efe9", "#e7e2d6"], text: "#1d1d1d", acc: "#a8842f", acc2: "#555555", dark: false } },
    { id: "royal", name: "Royal Maroon", hi: "शाही मरून", pal: ["#5e0b15", "#d4af37", "#fffdf6"], chip: "#5e0b15",
      reel: { bg: ["#2a0409", "#5e0b15", "#8a1c2b"], text: "#fff4d6", acc: "#e8c35a", acc2: "#f3dfa2", dark: true } },
    { id: "modern", name: "Modern", hi: "मॉडर्न", pal: ["#1f3b4d", "#e07a5f", "#ffffff"], chip: "#e07a5f", sidebar: true,
      reel: { bg: ["#16303f", "#1f3b4d", "#2f5a70"], text: "#f4f8fa", acc: "#ff9a7d", acc2: "#a9c3d1", dark: true } },
    { id: "bloom", name: "Pastel Bloom", hi: "पेस्टल ब्लूम", pal: ["#e58fb0", "#b6a6ec", "#fff7fa"], chip: "#c0567f", isNew: true,
      reel: { bg: ["#ffe3ec", "#f1e6ff", "#e3f3e7"], text: "#4b2a3d", acc: "#d0628e", acc2: "#8f7fd6", dark: false } },
    { id: "rosegold", name: "Rose Gold Card", hi: "रोज़ गोल्ड कार्ड", pal: ["#b76e79", "#e8c4b8", "#fffaf8"], chip: "#a85d68", isNew: true,
      reel: { bg: ["#3b2328", "#7d4650", "#c48b8f"], text: "#fff4ef", acc: "#f2c9b8", acc2: "#ffe3d6", dark: true } }
  ];
  function tpl(id) { return TEMPLATES.filter(function (x) { return x.id === id; })[0] || TEMPLATES[0]; }

  var SECTIONS = [
    { id: "personal", ui: "secPersonal", icon: "user", hint: "hintPersonal", open: true, fields: ["fullName", "dob", "birthTime", "birthPlace", "height", "complexion", "religion", "caste", "gotra", "rashi", "nakshatra", "manglik"] },
    { id: "career", ui: "secCareer", icon: "cap", hint: "hintCareer", fields: ["education", "occupation", "company", "income"] },
    { id: "family", ui: "secFamily", icon: "users", hint: "hintFamily", fields: ["father", "fatherOcc", "mother", "motherOcc", "brothers", "sisters", "native"] },
    { id: "contact", ui: "secContact", icon: "phone", hint: "hintContact", fields: ["contactPerson", "phone", "email", "address"] },
    { id: "aboutsec", ui: "secAbout", icon: "heart", hint: "hintAbout", fields: ["aboutText", "expectations"] }
  ];

  // ---------- helpers ----------
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function nb(s) { return esc(s).replace(/ /g, "&nbsp;"); }
  function multiline(s) { return esc(s).replace(/\n/g, "<br>"); }
  function digitsFor(state) {
    var set = I.meta(state.lang).digits;
    return function (s) { return state.deva && set ? String(s).replace(/[0-9]/g, function (d) { return set[+d]; }) : String(s); };
  }
  function fmtDate(v, lang) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ""); if (!m) return v;
    var months = I.MONTHS[lang] || I.MONTHS.en;
    return (+m[3]) + " " + months[+m[2] - 1] + " " + m[1];
  }
  function fmtTime(v, lang) {
    var m = /^(\d{1,2}):(\d{2})/.exec(v || ""); if (!m) return v;
    var h = +m[1], mm = m[2], h12 = ((h + 11) % 12) + 1;
    if (lang === "en") return h12 + ":" + mm + " " + (h < 12 ? "AM" : "PM");
    var dp = I.DAYPART[lang]; var part = h >= 4 && h < 12 ? 0 : h < 16 ? 1 : h < 19 ? 2 : 3;
    return (dp[0][part] + " " + h12 + ":" + mm + " " + dp[1]).trim();
  }
  function val(state, k) {
    var v = ((state.f || {})[k] || "").trim(); if (!v) return "";
    if (k === "dob") v = fmtDate(v, state.lang);
    else if (k === "birthTime") v = fmtTime(v, state.lang);
    else if (k === "manglik") v = I.bio(v, state.lang);
    return v;
  }
  function isRTL(state) { return I.meta(state.lang).dir === "rtl"; }

  // ---------- the model: everything a renderer needs, already localised ----------
  function model(state) {
    var lang = state.lang, d = digitsFor(state), meta = I.meta(lang);
    function rows(keys) { return keys.map(function (k) { var v = val(state, k); return v ? { k: k, label: I.bio(k, lang), value: d(v) } : null; }).filter(Boolean); }
    var b = I.BLESS[state.deity], btxt = b ? I.blessText(state.deity, lang) : "";
    var chips = (state.chips || []).filter(function (id) { return C.BY_ID[id]; }).map(function (id) { var c = C.BY_ID[id]; return { id: id, label: C.label(id, lang), icon: c.icon, kind: c.kind }; })
      .concat((state.customChips || []).filter(function (s) { return (s || "").trim(); }).map(function (s) { return { id: "custom", label: s.trim(), icon: "sparkle", kind: "custom" }; }));
    return {
      lang: lang, dir: isRTL(state) ? "rtl" : "ltr", script: meta.script, tpl: tpl(state.tpl), gender: state.g || "",
      title: I.bio("title", lang), blessing: btxt ? { id: state.deity, text: btxt, big: !!b.big, rtl: !!b.rtl } : null,
      name: ((state.f || {}).fullName || "").trim(), photo: state.photo || "",
      tag: d([val(state, "occupation"), val(state, "company")].filter(Boolean).join(" · ")),
      sections: {
        personal: rows(SECTIONS[0].fields.slice(1)), career: rows(SECTIONS[1].fields),
        family: rows(SECTIONS[2].fields), contact: rows(SECTIONS[3].fields)
      },
      about: d(((state.f || {}).aboutText || "").trim()), expect: d(((state.f || {}).expectations || "").trim()),
      custom: (state.custom || []).filter(function (r) { return (r.k || "").trim() || (r.v || "").trim(); }).map(function (r) { return { label: r.k || "", value: d(r.v || "") }; }),
      chips: chips,
      heads: { personal: I.bio("personal", lang), career: I.bio("career", lang), family: I.bio("family", lang), contact: I.bio("contact", lang),
        about: I.bio("about", lang), expect: I.bio("expect", lang), other: I.bio("other", lang), vibe: C.vibeTitle(lang), shubh: C.shubh(lang) }
    };
  }

  // ---------- self-made ornaments (inline SVG, no copyrighted art) ----------
  var FLIP = { tl: "", tr: "translate(120 0) scale(-1 1)", bl: "translate(0 120) scale(1 -1)", br: "translate(120 120) scale(-1 -1)" };
  function cornerSVG(color, cls) {
    return '<svg class="corner ' + cls + '" width="240" height="240" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="' + color + '" stroke-width="2.2"><g transform="' + FLIP[cls] + '">' +
      '<path d="M6 114V40C6 20 20 6 40 6H114"/><path d="M16 114V46C16 28 28 16 46 16H114" stroke-width="1.2"/>' +
      '<path d="M30 30c10-12 26-10 30 0s-8 18-16 12" /><path d="M30 30c-12 10-10 26 0 30s18-8 12-16"/>' +
      '<circle cx="30" cy="30" r="4.5" fill="' + color + '"/><circle cx="76" cy="16" r="2.4" fill="' + color + '"/><circle cx="16" cy="76" r="2.4" fill="' + color + '"/>' +
      '<path d="M88 16q8-8 16 0q-8 8-16 0z" fill="' + color + '"/><path d="M16 88q-8 8 0 16q8-8 0-16z" fill="' + color + '"/></g></svg>';
  }
  function petals(cx, cy, r, n, col, op, rx) {
    var s = "", i;
    for (i = 0; i < n; i++) s += '<ellipse cx="' + cx + '" cy="' + (cy - r) + '" rx="' + (r * (rx || 0.55)) + '" ry="' + r + '" fill="' + col + '" opacity="' + (op || 0.85) + '" transform="rotate(' + (i * 360 / n) + " " + cx + " " + cy + ')"/>';
    return s;
  }
  function flowerSVG(cls) {
    function flower(cx, cy, r, col) { return petals(cx, cy, r, 6, col) + '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.45) + '" fill="#f2c14e"/>'; }
    function leaf(x, y, rot) { return '<path d="M0 0C14-10 34-10 46 0C34 10 14 10 0 0Z" fill="#7fa37f" transform="translate(' + x + " " + y + ") rotate(" + rot + ')"/>'; }
    var p = leaf(60, 40, 20) + leaf(40, 64, 70) + leaf(118, 30, -10) + leaf(30, 120, 95) + leaf(150, 22, 10) + leaf(20, 150, 80);
    p += flower(44, 44, 22, "#e58fa9") + flower(104, 26, 14, "#f3b6c6") + flower(26, 104, 14, "#f3b6c6") + flower(150, 52, 9, "#e58fa9") + flower(52, 150, 9, "#e58fa9");
    return '<svg class="flower ' + cls + '" width="380" height="380" viewBox="0 0 190 190" xmlns="http://www.w3.org/2000/svg"><g transform="' + (cls === "br" ? "rotate(180 95 95)" : "") + '">' + p + "</g></svg>";
  }
  // Pastel Bloom: soft watercolour-like clusters (layered translucent petals) + sage sprigs
  function bloomSVG(cls) {
    function bloom(cx, cy, r, c1, c2) {
      return petals(cx, cy, r, 5, c1, 0.55, 0.7) + petals(cx, cy, r * 0.68, 5, c2, 0.7, 0.7).replace(/rotate\((\d+)/g, function (m, a) { return "rotate(" + (+a + 36); }) +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.22) + '" fill="#ffd98e"/>';
    }
    function sprig(x, y, rot) {
      var s = '<g transform="translate(' + x + " " + y + ") rotate(" + rot + ')"><path d="M0 0C20 -4 44 -4 70 0" stroke="#9cbf9a" stroke-width="2" fill="none"/>', i;
      for (i = 0; i < 4; i++) s += '<path d="M' + (12 + i * 15) + ' -1c4-9 10-12 15-12c-2 7-7 11-15 12z" fill="#b5d3b0" opacity=".9"/><path d="M' + (12 + i * 15) + ' 1c4 9 10 12 15 12c-2-7-7-11-15-12z" fill="#a6c8a2" opacity=".9"/>';
      return s + "</g>";
    }
    var g = '<circle cx="120" cy="70" r="70" fill="#fde4ee" opacity=".7"/><circle cx="60" cy="40" r="44" fill="#efe7ff" opacity=".8"/>' +
      sprig(30, 120, -35) + sprig(110, 150, -70) + sprig(150, 30, 10) +
      bloom(70, 70, 34, "#f7b8cf", "#f392b5") + bloom(140, 92, 22, "#cfc2f7", "#b19ff0") + bloom(118, 32, 16, "#ffd3c2", "#ffb59c") + bloom(36, 136, 14, "#cfc2f7", "#b19ff0") +
      '<circle cx="168" cy="132" r="4" fill="#f392b5" opacity=".7"/><circle cx="94" cy="126" r="3" fill="#b19ff0" opacity=".8"/><circle cx="182" cy="62" r="3" fill="#ffb59c"/>';
    return '<svg class="bloom ' + cls + '" width="420" height="420" viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg"><g transform="' + (cls === "br" ? "rotate(180 105 105)" : cls === "tr" ? "translate(210 0) scale(-1 1)" : cls === "bl" ? "translate(0 210) scale(1 -1)" : "") + '">' + g + "</g></svg>";
  }
  // Traditional toran: a hanging marigold garland across the top
  function toranSVG() {
    var s = '<path d="M0 6 Q300 30 600 6" stroke="#b5802a" stroke-width="1.6" fill="none"/>', i, x, y;
    for (i = 0; i <= 24; i++) {
      x = i * 25; y = 6 + 24 * 4 * (x / 600) * (1 - x / 600);
      s += '<circle cx="' + x + '" cy="' + y + '" r="5.2" fill="' + (i % 2 ? "#f29d1f" : "#e4572e") + '"/><circle cx="' + x + '" cy="' + y + '" r="2" fill="#ffd166"/>';
      if (i % 4 === 2) s += '<path d="M' + x + " " + (y + 5) + "v14" + '" stroke="#b5802a" stroke-width="1"/><circle cx="' + x + '" cy="' + (y + 22) + '" r="4" fill="#f29d1f"/><path d="M' + (x - 3) + " " + (y + 27) + " l3 7 3-7z" + '" fill="#4f8a3c"/>';
    }
    return '<svg class="toran" width="1200" height="100" viewBox="0 0 600 50" xmlns="http://www.w3.org/2000/svg">' + s + "</svg>";
  }
  function mandalaSVG() {
    var s = "", i;
    for (i = 0; i < 16; i++) s += '<ellipse cx="60" cy="22" rx="6" ry="16" transform="rotate(' + (i * 22.5) + ' 60 60)"/>';
    return '<svg class="mandala" width="240" height="240" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#d4af37" stroke-width="1.4">' + s +
      '<circle cx="60" cy="60" r="20"/><circle cx="60" cy="60" r="44"/><circle cx="60" cy="60" r="6" fill="#d4af37"/></svg>';
  }
  // Rose Gold Card: art-deco fan corners
  function decoSVG(cls) {
    var s = "", i;
    for (i = 0; i < 5; i++) s += '<path d="M0 ' + (40 + i * 18) + "A" + (40 + i * 18) + " " + (40 + i * 18) + " 0 0 0 " + (40 + i * 18) + ' 0" stroke-width="' + (i === 0 ? 2 : 1) + '"/>';
    return '<svg class="deco ' + cls + '" width="280" height="280" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#c48b8f"><g transform="' + (cls === "br" ? "rotate(180 70 70)" : "") + '">' + s +
      '<circle cx="14" cy="14" r="4" fill="#c48b8f"/></g></svg>';
  }
  function asImg(svg) {
    var cls = /class="([^"]+)"/.exec(svg)[1];
    return '<img class="' + cls + '" alt="" src="data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace(/ class="[^"]+"/, "")) + '">';
  }
  var DECOR = {
    traditional: function () { return '<div class="frame f1"></div><div class="frame f2"></div>' + asImg(toranSVG()) + ["tl", "tr", "bl", "br"].map(function (c) { return asImg(cornerSVG("#c8a24a", c)); }).join(""); },
    floral: function () { return '<div class="frame f1"></div>' + asImg(flowerSVG("tl")) + asImg(flowerSVG("br")); },
    minimal: function () { return '<div class="goldbar"></div>'; },
    royal: function () { return '<div class="frame f1"></div><div class="frame f2"></div>' + asImg(mandalaSVG()) + ["tl", "tr", "bl", "br"].map(function (c) { return asImg(cornerSVG("#d4af37", c)); }).join(""); },
    modern: function () { return ""; },
    bloom: function () { return '<div class="frame f1"></div>' + asImg(bloomSVG("tr")) + asImg(bloomSVG("bl")); },
    rosegold: function () { return '<div class="frame f1"></div><div class="strip"></div>' + asImg(decoSVG("tl")) + asImg(decoSVG("br")); }
  };

  // ---------- A4 sheet ----------
  function rowsHTML(rows) {
    if (!rows.length) return "";
    return '<div class="rows">' + rows.map(function (r) { return '<div class="r"><div class="k">' + nb(r.label) + '</div><div class="c">:</div><div class="v">' + esc(r.value) + "</div></div>"; }).join("") + "</div>";
  }
  function section(id, title, inner) { return inner ? '<section class="s s-' + id + '"><h3><span>' + nb(title) + "</span></h3>" + inner + "</section>" : ""; }
  function chipsHTML(m) {
    if (!m.chips.length) return "";
    var col = m.tpl.chip;
    return '<div class="chips">' + m.chips.map(function (c) { return '<span class="chip"><img alt="" src="' + IC.dataURL(c.icon, col, 2) + '"><span>' + nb(c.label) + "</span></span>"; }).join("") + "</div>";
  }
  function footerOn(cfg, paid) { return !cfg.PAYMENT_ENABLED || !(paid && cfg.REMOVE_FOOTER_WHEN_PAID); }

  function sheetHTML(state, opts) {
    opts = opts || {};
    var m = model(state), tp = m.tpl, h = m.heads;
    var name = m.name || "—";
    var personal = rowsHTML(m.sections.personal), career = rowsHTML(m.sections.career), family = rowsHTML(m.sections.family), contact = rowsHTML(m.sections.contact);
    var about = m.about ? '<div class="p">' + multiline(m.about) + "</div>" : "", expect = m.expect ? '<div class="p">' + multiline(m.expect) + "</div>" : "";
    var other = rowsHTML(m.custom), vibe = chipsHTML(m);
    var bl = m.blessing ? '<div class="deity d-' + m.blessing.id + (m.blessing.big ? " om" : "") + '"' + (m.blessing.rtl ? ' dir="rtl" lang="ar"' : "") + ">" + nb(m.blessing.text) + "</div>" : "";
    var head = bl + '<div class="doc-title"><span>' + nb(m.title) + "</span></div>";
    var photo = m.photo ? '<div class="photo" style="background-image:url(' + m.photo + ')"></div>' : "";
    var foot = opts.footer === false ? "" : '<div class="madewith" dir="ltr">Made with ShubhBiodata</div>';
    var cls = "sheet tpl-" + tp.id + " lang-" + m.lang + " scr-" + m.script + (m.photo ? " has-photo" : "");
    var tag = m.tag ? '<div class="tag">' + esc(m.tag) + "</div>" : "";
    var body;
    if (tp.sidebar) {
      body = '<div class="content side"><aside class="fitbox">' + photo + '<div class="name">' + esc(name) + "</div>" + tag + section("contact", h.contact, contact) + "</aside>" +
        '<main class="fitbox">' + head + section("personal", h.personal, personal) + section("career", h.career, career) + section("family", h.family, family) +
        section("vibe", h.vibe, vibe) + section("about", h.about, about) + section("expect", h.expect, expect) + section("other", h.other, other) + "</main></div>";
    } else {
      body = '<div class="content fitbox">' + head + '<div class="namebar"><div class="name">' + esc(name) + "</div>" + tag + "</div>" +
        '<div class="first">' + (section("personal", h.personal, personal) || "<div></div>") + photo + "</div>" +
        section("career", h.career, career) + section("family", h.family, family) + section("contact", h.contact, contact) +
        section("vibe", h.vibe, vibe) + section("about", h.about, about) + section("expect", h.expect, expect) + section("other", h.other, other) + "</div>";
    }
    return '<div class="' + cls + '" lang="' + m.lang + '" dir="' + m.dir + '">' + DECOR[tp.id]() + body + foot + "</div>";
  }

  function fit(sheet) {
    var fs = 1.14, boxes = Array.prototype.slice.call(sheet.querySelectorAll(".fitbox"));
    function over() { return boxes.some(function (b) { return b.scrollHeight > b.clientHeight + 1; }); }
    sheet.style.setProperty("--fs", fs);
    while (over() && fs > 0.6) { fs = Math.round((fs - 0.03) * 100) / 100; sheet.style.setProperty("--fs", fs); }
    sheet.setAttribute("data-fs", fs);
  }

  // ---------- fonts ----------
  // Script fonts are declared with unicode-range, so document.fonts.load(font, text) only downloads
  // files whose range covers characters actually present: other scripts are never fetched.
  var SCRIPT_FAMS = [["Noto Sans Bengali", /[\u0980-\u09FF]/g], ["Noto Sans Gujarati", /[\u0A80-\u0AFF]/g], ["Noto Sans Gurmukhi", /[\u0A00-\u0A7F]/g], ["Noto Sans Oriya", /[\u0B00-\u0B7F]/g],
    ["Noto Sans Tamil", /[\u0B80-\u0BFF]/g], ["Noto Sans Telugu", /[\u0C00-\u0C7F]/g], ["Noto Sans Kannada", /[\u0C80-\u0CFF]/g], ["Noto Sans Malayalam", /[\u0D00-\u0D7F]/g],
    ["Noto Naskh Arabic", /[\u0600-\u06FF]/g], ["Noto Nastaliq Urdu", /[\u0600-\u06FF]/g, ["700"]]];
  function ensureFonts(textOrEl) {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    var txt = typeof textOrEl === "string" ? textOrEl : (textOrEl ? textOrEl.textContent : "");
    var sample = "क्ष त्र श्र द्ध Ag 09";
    var faces = ["400 16px 'Noto Sans Devanagari'", "600 16px 'Noto Sans Devanagari'", "700 16px 'Noto Sans Devanagari'", "400 16px 'Noto Serif Devanagari'", "700 16px 'Noto Serif Devanagari'",
      "600 16px 'Cormorant Garamond'", "700 16px 'Cormorant Garamond'", "600 16px 'Fraunces'"]
      .map(function (f) { return document.fonts.load(f, sample).catch(function () {}); });
    // Italic faces only for the designs that use them (keeps the first load light)
    var cl = textOrEl && textOrEl.classList ? textOrEl.className : "";
    if (/tpl-floral/.test(cl)) faces.push(document.fonts.load("italic 600 16px 'Cormorant Garamond'", sample).catch(function () {}));
    if (/tpl-bloom/.test(cl)) faces.push(document.fonts.load("italic 600 16px 'Fraunces'", sample).catch(function () {}));
    SCRIPT_FAMS.forEach(function (f) {
      var mm = txt.match(f[1]); if (!mm) return;
      var chars = mm.join("");
      (f[2] || ["400", "600", "700"]).forEach(function (w) { faces.push(document.fonts.load(w + " 16px '" + f[0] + "'", chars).catch(function () {})); });
    });
    return Promise.all(faces).then(function () { return document.fonts.ready; });
  }
  var BODY = { latn: "'Noto Sans Devanagari'", deva: "'Noto Sans Devanagari'", beng: "'Noto Sans Bengali','Noto Sans Devanagari'", gujr: "'Noto Sans Gujarati','Noto Sans Devanagari'",
    guru: "'Noto Sans Gurmukhi','Noto Sans Devanagari'", orya: "'Noto Sans Oriya','Noto Sans Devanagari'", taml: "'Noto Sans Tamil','Noto Sans Devanagari'", telu: "'Noto Sans Telugu','Noto Sans Devanagari'",
    knda: "'Noto Sans Kannada','Noto Sans Devanagari'", mlym: "'Noto Sans Malayalam','Noto Sans Devanagari'", arab: "'Noto Naskh Arabic','Noto Sans Devanagari'" };
  // kind: body | display (big names/titles). Latin display = Fraunces, Urdu display = Nastaliq, other scripts = their own Noto Sans bold.
  function fontStack(script, kind) {
    var b = BODY[script] || BODY.deva;
    if (kind === "display") {
      if (script === "latn") return "'Fraunces','Noto Sans Devanagari',serif";
      if (script === "arab") return "'Noto Nastaliq Urdu','Noto Naskh Arabic',serif";
      if (script === "deva") return "'Noto Serif Devanagari','Fraunces',serif";
    }
    return b + ",sans-serif";
  }

  // ---------- export ----------
  function loadScript(src, test) {
    return new Promise(function (res, rej) {
      if (test && test()) return res();
      var s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = function () { rej(new Error("Could not load " + src)); }; document.head.appendChild(s);
    });
  }
  function renderCanvas(state, opts) {
    var host = document.getElementById("exportHost");
    host.innerHTML = sheetHTML(state, opts);
    var sheet = host.firstChild; fit(sheet);
    return ensureFonts(sheet).then(function () { return loadScript(ASSETS + "vendor/html2canvas.min.js", function () { return !!window.html2canvas; }); }).then(function () {
      fit(sheet);
      // Draw on a canvas that carries the sheet's lang, so the export shapes text exactly like the preview.
      var cv = document.createElement("canvas"); cv.width = 794 * 2; cv.height = 1123 * 2;
      cv.setAttribute("lang", sheet.getAttribute("lang") || "en");
      cv.style.cssText = "position:fixed;left:-99999px;top:0;width:794px;height:1123px";
      document.body.appendChild(cv);
      return window.html2canvas(sheet, { canvas: cv, scale: 2, backgroundColor: "#ffffff", useCORS: true, logging: false, width: 794, height: 1123, windowWidth: 1200, scrollX: 0, scrollY: 0 })
        .then(function (c) { cv.remove(); return c; }, function (e) { cv.remove(); throw e; });
    }).then(function (canvas) { host.innerHTML = ""; return canvas; });
  }
  function canvasToBlob(canvas, q) {
    return new Promise(function (res) {
      if (canvas.toBlob) canvas.toBlob(function (b) { res(b); }, "image/jpeg", q);
      else { var d = atob(canvas.toDataURL("image/jpeg", q).split(",")[1]), a = new Uint8Array(d.length); for (var i = 0; i < d.length; i++) a[i] = d.charCodeAt(i); res(new Blob([a], { type: "image/jpeg" })); }
    });
  }
  function fileBase(state, suffix) {
    var n = (((state.f || {}).fullName) || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return (n ? n + "-" : "") + (suffix || "marriage-biodata");
  }
  function saveBlob(blob, name) {
    var a = document.createElement("a"), u = URL.createObjectURL(blob);
    a.href = u; a.download = name; a.rel = "noopener"; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(u); a.remove(); }, 8000);
  }

  window.SB = { ASSETS: ASSETS, TEMPLATES: TEMPLATES, tpl: tpl, SECTIONS: SECTIONS, model: model, sheetHTML: sheetHTML, fit: fit, ensureFonts: ensureFonts,
    fontStack: fontStack, renderCanvas: renderCanvas, canvasToBlob: canvasToBlob, fileBase: fileBase, saveBlob: saveBlob, loadScript: loadScript, footerOn: footerOn, esc: esc };
})();
