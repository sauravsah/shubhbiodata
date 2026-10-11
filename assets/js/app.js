/* ShubhBiodata — the maker UI (form, design picker, live preview, exports). 100% client-side.
   Rendering lives in core.js (SB.*); optional features load on demand:
     writer.js -> About-me writer (window.SB_WRITER), reel.js -> Biodata Reel (window.SB_REEL). */
(function () {
  "use strict";
  var CFG = window.SHUBH_CONFIG || {};
  var I = window.SB_I18N, SB = window.SB, IC = window.SB_ICONS, CH = window.SB_CHIPS, FX = window.SB_FX || {};
  var STORE_KEY = "shubhbiodata.v1", PAID_KEY = "shubhbiodata.paid";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ic = IC.svg, esc = SB.esc;

  var TYPES = { dob: "date", birthTime: "time", phone: "tel", email: "email", aboutText: "textarea", expectations: "textarea", manglik: "select" };
  var LISTS = { religion: ["Hindu", "हिन्दू", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "बौद्ध"], complexion: ["Fair", "Wheatish", "Dusky", "गोरा", "गेहुँआ", "साँवला"] };
  var FICON = { fullName: "user", dob: "cake", birthTime: "clock", birthPlace: "pin", height: "ruler", complexion: "palette", religion: "diya", caste: "users", gotra: "tree", rashi: "star", nakshatra: "moon", manglik: "planet",
    education: "cap", occupation: "briefcase", company: "building", income: "wallet", father: "user", fatherOcc: "briefcase", mother: "user", motherOcc: "briefcase", brothers: "users", sisters: "users", native: "home",
    contactPerson: "user", phone: "phone", email: "mail", address: "pin", aboutText: "heart", expectations: "rings" };
  // Progress: what makes a biodata feel complete (weights), in the order we nudge people.
  var PROG = [["fullName", 2], ["dob", 1], ["birthPlace", 1], ["height", 1], ["religion", 1], ["education", 1], ["occupation", 1], ["father", 1], ["mother", 1], ["native", 1], ["phone", 1], ["photo", 2], ["chips", 1], ["aboutText", 1]];

  var DEFAULT = { v: 1, lang: "en", ui: "en", tpl: "traditional", deity: "ganesh", deva: false, f: {}, custom: [], photo: "", g: "", chips: [], customChips: [], music: true };
  var state = load();
  // Safe fallbacks for saved state from older versions (removed language, removed design, removed field)
  if (state.lang === "ne") state.lang = "hi";
  if (I.LANGS.indexOf(state.lang) < 0) state.lang = "en";
  if (state.tpl === "nepali") state.tpl = "bloom";
  if (!SB.TEMPLATES.some(function (x) { return x.id === state.tpl; })) state.tpl = "traditional";
  if (state.f && "dobBS" in state.f) delete state.f.dobBS;
  var pageLang = document.body.getAttribute("data-lang");
  // Language landing pages preselect their language once per session; generic English pages keep the saved choice.
  if (pageLang && pageLang !== "en" && I.LANGS.indexOf(pageLang) >= 0) {
    var seen = null; try { seen = sessionStorage.getItem("sb.langpage." + pageLang); } catch (e) {}
    if (!seen) {
      state.lang = pageLang; try { sessionStorage.setItem("sb.langpage." + pageLang, "1"); } catch (e) {}
      if (pageLang === "ur" && (state.deity === "ganesh" || state.deity === "om")) state.deity = "bismillah";
      if (pageLang === "pa" && state.deity === "ganesh") state.deity = "ikonkar";
    }
  }
  if (/[?&]paid=1/.test(location.search)) { try { localStorage.setItem(PAID_KEY, "1"); } catch (e) {} }

  function load() {
    try { var s = JSON.parse(localStorage.getItem(STORE_KEY) || "null"); if (s && s.v === 1) return Object.assign({}, DEFAULT, s, { f: s.f || {}, custom: s.custom || [], chips: s.chips || [], customChips: s.customChips || [] }); } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT));
  }
  var saveT;
  function save() {
    clearTimeout(saveT);
    saveT = setTimeout(function () {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); flash($("#savedNote")); }
      catch (e) { try { localStorage.setItem(STORE_KEY, JSON.stringify(Object.assign({}, state, { photo: "" }))); } catch (e2) {} }
    }, 300);
    progress(); scheduleThumbs();
  }
  function saveNow() { clearTimeout(saveT); try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") saveNow(); });
  window.addEventListener("pagehide", saveNow);
  function flash(el) { if (!el) return; el.classList.add("on"); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove("on"); }, 1400); }

  function t(k) { return (I.UI[state.ui] || I.UI.en)[k] || I.UI.en[k] || k; }
  function isPaid() { try { return localStorage.getItem(PAID_KEY) === "1"; } catch (e) { return false; } }
  function sheetOpts() { return { footer: SB.footerOn(CFG, isPaid()) }; }
  function fieldLabel(k) { var lab = I.formLabel(k, state.lang) || [k, k]; return (state.ui === "hi" ? lab[1] : lab[0]).replace(/\s*\*$/, ""); }

  // ---------- preview ----------
  var renderT, renderSeq = 0;
  function scheduleRender() { clearTimeout(renderT); renderT = setTimeout(render, 90); }
  function render(animate) {
    var host = $("#sheetHost"); if (!host) return;
    host.innerHTML = SB.sheetHTML(state, sheetOpts());
    var sheet = host.firstChild;
    SB.fit(sheet); scalePreview();
    var empty = $("#pvEmpty"); if (empty) empty.hidden = !!(state.f.fullName || "").trim();
    if (animate) { host.classList.remove("swap"); void host.offsetWidth; host.classList.add("swap"); }
    var my = ++renderSeq;
    SB.ensureFonts(sheet).then(function () { if (my === renderSeq && host.firstChild === sheet) SB.fit(sheet); });
  }
  function scalePreview() {
    var host = $("#sheetHost"), wrap = $("#previewWrap"); if (!host || !host.firstChild) return;
    var s = Math.min(1, wrap.clientWidth / 794);
    host.firstChild.style.transform = "scale(" + s + ")";
    host.style.height = Math.ceil(1123 * s) + "px"; host.style.width = Math.ceil(794 * s) + "px";
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { render(); });
  window.addEventListener("resize", function () { scalePreview(); });

  // ---------- design thumbnails (real mini previews of the user's own biodata) ----------
  var thumbT;
  function scheduleThumbs() { clearTimeout(thumbT); thumbT = setTimeout(refreshThumbs, 700); }
  function scaleThumbs() {
    var th = $(".tthumb"); if (!th) return; var s = th.clientWidth / 794;
    $$(".tscale").forEach(function (x) { x.style.transform = "scale(" + s + ")"; });
  }
  window.addEventListener("resize", function () { scaleThumbs(); });
  function refreshThumbs() {
    scaleThumbs();
    $$(".tcard").forEach(function (b) {
      var box = $(".tscale", b); if (!box) return;
      box.innerHTML = SB.sheetHTML(Object.assign({}, state, { tpl: b.getAttribute("data-tpl") }), { footer: false });
    });
  }

  // ---------- progress ----------
  function filled(k) {
    if (k === "photo") return !!state.photo;
    if (k === "chips") return (state.chips || []).length + (state.customChips || []).length > 0;
    return !!(state.f[k] || "").trim();
  }
  function progress() {
    var box = $("#progCard"); if (!box) return;
    var tot = 0, got = 0, next = null;
    PROG.forEach(function (p) { tot += p[1]; if (filled(p[0])) got += p[1]; else if (!next) next = p[0]; });
    var pc = Math.round(got / tot * 100);
    var msg = pc < 10 ? "prog0" : pc < 35 ? "prog1" : pc < 65 ? "prog2" : pc < 100 ? "prog3" : "prog4";
    var nm = next === "photo" ? t("photo") : next === "chips" ? t("secVibe") : next ? fieldLabel(next) : "";
    $(".ring-fg", box).style.strokeDashoffset = (163.4 * (1 - pc / 100)).toFixed(1);
    $(".ring-n", box).textContent = pc + "%";
    $(".prog-t", box).textContent = t("prog").replace("{n}", pc);
    $(".prog-m", box).textContent = t(msg);
    var nx = $(".prog-next", box); nx.textContent = next && pc >= 10 ? t("progNext").replace("{f}", nm) : ""; nx.setAttribute("data-k", next || "");
    box.classList.toggle("done", pc === 100);
    var mb = $("#mProg"); if (mb) mb.style.setProperty("--p", pc);
  }

  // ---------- form ----------
  var accOpen = { personal: true };
  function fieldHTML(k) {
    var lab = I.formLabel(k, state.lang) || [k, k, ""], label = state.ui === "hi" ? lab[1] : lab[0];
    var ph = (state.ui === "hi" ? lab[3] : "") || lab[2] || "";
    var type = TYPES[k] || "text", v = esc(state.f[k] || ""), id = "f_" + k, inp;
    if (type === "textarea") inp = '<textarea id="' + id + '" data-k="' + k + '" rows="3" placeholder="' + esc(ph) + '">' + v + "</textarea>";
    else if (type === "select") {
      inp = '<select id="' + id + '" data-k="' + k + '"><option value="">' + esc(t("select")) + "</option>" +
        ["yes", "no", "partial"].map(function (o) { return '<option value="' + o + '"' + (state.f[k] === o ? " selected" : "") + ">" + esc(I.bio(o, state.ui === "hi" ? "hi" : "en")) + "</option>"; }).join("") + "</select>";
    } else {
      var list = LISTS[k] ? ' list="dl_' + k + '"' : "";
      inp = '<input id="' + id + '" data-k="' + k + '" type="' + type + '" value="' + v + '" placeholder="' + esc(ph) + '"' + list + (k === "fullName" ? ' required autocomplete="name"' : "") + (k === "phone" ? ' autocomplete="tel" inputmode="tel"' : "") + (k === "email" ? ' autocomplete="email"' : "") + ">";
      if (LISTS[k]) inp += '<datalist id="dl_' + k + '">' + LISTS[k].map(function (o) { return '<option value="' + esc(o) + '">'; }).join("") + "</datalist>";
    }
    var wide = type === "textarea" || k === "fullName" || k === "address" ? " wide" : "";
    var wbtn = type === "textarea" ? '<button type="button" class="wbtn" data-writer="' + k + '">' + ic("wand") + "<span>" + esc(t("writeBtn")) + "</span></button>" : "";
    var html = '<div class="fld' + wide + (type === "textarea" ? " ta" : "") + '"><div class="flh"><label for="' + id + '">' + esc(label) + "</label>" + wbtn + "</div>" +
      '<div class="inp">' + ic(FICON[k] || "sparkle") + inp + "</div>";
    if (type === "textarea") html += '<div class="writer" id="wr_' + k + '" hidden></div>';
    return html + "</div>";
  }
  function customHTML() {
    return state.custom.map(function (r, i) {
      return '<div class="crow" data-i="' + i + '"><input data-ck="k" value="' + esc(r.k || "") + '" placeholder="' + esc(t("rowLabel")) + '" aria-label="' + esc(t("rowLabel")) + '">' +
        '<input data-ck="v" value="' + esc(r.v || "") + '" placeholder="' + esc(t("rowValue")) + '" aria-label="' + esc(t("rowValue")) + '">' +
        '<button type="button" class="x" data-del="' + i + '" aria-label="' + esc(t("remove")) + '">' + ic("x") + "</button></div>";
    }).join("");
  }
  function vibeHTML() {
    var on = state.chips || [];
    var h = CH.GROUPS.map(function (g) {
      return '<div class="cgroup"><div class="cgt">' + esc(g.ui[state.ui === "hi" ? 1 : 0]) + '</div><div class="cpick">' +
        CH.CHIPS.filter(function (c) { return c.kind === g.kind; }).map(function (c) {
          var sel = on.indexOf(c.id) >= 0;
          return '<button type="button" class="vchip' + (sel ? " on" : "") + '" aria-pressed="' + sel + '" data-chip="' + c.id + '">' + ic(c.icon) + "<span>" + esc(CH.label(c.id, state.ui === "hi" ? "hi" : "en")) + "</span></button>";
        }).join("") + "</div></div>";
    }).join("");
    h += '<div class="cgroup"><div class="cgt">' + esc(t("customChip")) + '</div><div class="cpick" id="customChips">' +
      (state.customChips || []).map(function (s, i) { return '<span class="vchip on mine">' + ic("sparkle") + "<span>" + esc(s) + '</span><button type="button" class="cx" data-cdel="' + i + '" aria-label="' + esc(t("remove")) + '">' + ic("x") + "</button></span>"; }).join("") +
      '</div><div class="cadd"><input id="chipInput" maxlength="28" placeholder="' + esc(t("chipPh")) + '" aria-label="' + esc(t("customChip")) + '"><button type="button" class="btn sm ghost" id="chipAdd">' + ic("plus") + "<span>" + esc(t("addChip")) + "</span></button></div></div>";
    return h;
  }
  function accHTML(id, icon, title, hint, inner, count) {
    var open = !!accOpen[id];
    return '<div class="acc' + (open ? " open" : "") + '" data-sec="' + id + '"><button type="button" class="acc-h" aria-expanded="' + open + '" aria-controls="p_' + id + '">' +
      '<span class="acc-ic">' + ic(icon) + '</span><span class="acc-tt"><b>' + esc(title) + "</b><small>" + esc(hint) + "</small></span>" +
      (count ? '<span class="acc-n">' + count + "</span>" : "") + '<span class="acc-cv">' + ic("chev") + "</span></button>" +
      '<div class="acc-p" id="p_' + id + '"' + (open ? "" : " inert") + '><div class="acc-in">' + inner + "</div></div></div>";
  }
  function countFor(fields) { var n = fields.filter(function (k) { return (state.f[k] || "").trim(); }).length; return n ? n + "/" + fields.length : ""; }
  function buildForm() {
    var form = $("#form"); if (!form) return;
    var h = '<div class="photo-pick"><div class="ph-thumb' + (state.photo ? " has" : "") + '" style="' + (state.photo ? "background-image:url(" + state.photo + ")" : "") + '">' + (state.photo ? "" : ic("camera")) + "</div>" +
      '<div class="ph-b"><div class="ph-title">' + esc(t("photo")) + " <small>(" + esc(t("optional")) + ")</small></div>" +
      '<div class="ph-btns"><label class="btn sm">' + ic("camera") + "<span>" + esc(state.photo ? t("changePhoto") : t("addPhoto")) + '</span><input id="photoInput" type="file" accept="image/*" hidden></label>' +
      (state.photo ? '<button type="button" class="btn sm ghost" id="photoRemove">' + ic("trash") + "<span>" + esc(t("removePhoto")) + "</span></button>" : "") + "</div>" +
      '<p class="tip">' + ic("sparkle") + "<span>" + esc(t("photoTip")) + "</span></p></div></div>";
    h += '<div class="gsel" role="radiogroup" aria-label="' + esc(t("gLabel")) + '"><span class="gl">' + esc(t("gLabel")) + "</span>" +
      [["f", "bride", "female"], ["m", "groom", "male"]].map(function (g) { return '<button type="button" role="radio" class="gb' + (state.g === g[0] ? " on" : "") + '" aria-checked="' + (state.g === g[0]) + '" data-g="' + g[0] + '">' + ic(g[2]) + "<span>" + esc(t(g[1])) + "</span></button>"; }).join("") + "</div>";
    SB.SECTIONS.forEach(function (s) {
      h += accHTML(s.id, s.icon, t(s.ui), t(s.hint), '<div class="grid">' + s.fields.map(fieldHTML).join("") + "</div>", countFor(s.fields));
      if (s.id === "contact") {
        var nc = (state.chips || []).length + (state.customChips || []).length;
        h += accHTML("vibe", "sparkle", t("secVibe"), t("hintVibe"), vibeHTML(), nc ? String(nc) : "");
      }
    });
    h += accHTML("custom", "plus", t("secCustom"), t("hintCustom"), '<div id="customRows">' + customHTML() + '</div><button type="button" class="btn sm ghost" id="addRow">' + ic("plus") + "<span>" + esc(t("addRow")) + "</span></button>", state.custom.length ? String(state.custom.length) : "");
    form.innerHTML = h;
  }
  function setAcc(id, open) {
    accOpen[id] = open;
    var a = $('.acc[data-sec="' + id + '"]'); if (!a) return;
    a.classList.toggle("open", open); $(".acc-h", a).setAttribute("aria-expanded", open);
    var p = $(".acc-p", a); if (open) p.removeAttribute("inert"); else p.setAttribute("inert", "");
  }
  function refreshCounts() {
    SB.SECTIONS.forEach(function (s) {
      var a = $('.acc[data-sec="' + s.id + '"] .acc-h'); if (!a) return;
      var c = countFor(s.fields), n = $(".acc-n", a);
      if (c && !n) { n = document.createElement("span"); n.className = "acc-n"; a.insertBefore(n, $(".acc-cv", a)); }
      if (n) { if (c) n.textContent = c; else n.remove(); }
    });
  }
  function buildControls() {
    var c = $("#controls"); if (!c) return;
    function opt(l) { return '<option value="' + l + '"' + (state.lang === l ? " selected" : "") + ">" + esc(I.LANG_NAMES[l]) + "</option>"; }
    var h = '<label class="ctl"><span>' + ic("globe") + esc(t("bioLang")) + '</span><select id="langSel">' +
      I.GROUPS.map(function (g) { var o = g[2].map(opt).join(""); return g[0] ? '<optgroup label="' + esc(state.ui === "hi" ? g[1] : g[0]) + '">' + o + "</optgroup>" : o; }).join("") + "</select></label>";
    var bl = I.blessOptions(state.lang).map(function (k) { return [k, I.BLESS[k].ui[state.ui === "hi" ? 1 : 0]]; }).concat([["none", t("none")]]);
    h += '<label class="ctl"><span>' + ic("diya") + esc(t("header")) + '</span><select id="deitySel">' +
      bl.map(function (o) { return '<option value="' + o[0] + '"' + (state.deity === o[0] ? " selected" : "") + ">" + esc(o[1]) + "</option>"; }).join("") + "</select></label>";
    h += '<div class="ctl full" id="designs"><span>' + ic("palette") + esc(t("template")) + '</span><small class="hint">' + esc(t("tplHint")) + '</small><div class="tpls" role="radiogroup" aria-label="' + esc(t("template")) + '">' +
      SB.TEMPLATES.map(function (tp) {
        var on = state.tpl === tp.id;
        return '<button type="button" role="radio" aria-checked="' + on + '" class="tcard' + (on ? " on" : "") + '" data-tpl="' + tp.id + '" style="--a:' + tp.pal[0] + ";--b:" + tp.pal[1] + '">' +
          '<span class="tthumb"><span class="tscale"></span></span><span class="tname">' + esc(state.ui === "hi" ? tp.hi : tp.name) + "</span>" +
          (tp.isNew ? '<span class="tnew">' + esc(t("newBadge")) + "</span>" : "") + '<span class="tchk">' + ic("check") + "</span></button>";
      }).join("") + "</div></div>";
    var dg = I.meta(state.lang).digits;
    h += '<label class="sw' + (dg ? "" : " dim") + '"><span class="sw-t">' + ic("hash") + esc(t("deva")) + (dg ? " <small>(" + dg.slice(1, 4) + ")</small>" : "") + '</span><span class="sw-ui"><input type="checkbox" id="devaChk"' + (state.deva ? " checked" : "") + (dg ? "" : " disabled") + '><i></i></span></label>';
    c.innerHTML = h;
    refreshThumbs();
  }
  function applyUI() {
    document.documentElement.setAttribute("data-ui", state.ui);
    document.documentElement.lang = state.ui === "hi" ? "hi" : (document.body.getAttribute("data-lang") === "hi" ? "hi" : "en");
    $$("[data-t]").forEach(function (el) { el.textContent = t(el.getAttribute("data-t")); });
    $$(".uib").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-ui") === state.ui); b.setAttribute("aria-pressed", b.getAttribute("data-ui") === state.ui); });
    buildControls(); buildForm(); progress(); themeLang();
  }
  // The theme toggle speaks the UI language when it is Hindi, otherwise the biodata language (all 14 are translated in theme.js).
  function themeLang() { if (window.SB_THEME) window.SB_THEME.setLang(state.ui === "hi" ? "hi" : state.lang); }

  // ---------- events ----------
  document.addEventListener("input", function (e) {
    var el = e.target, k = el.getAttribute && el.getAttribute("data-k");
    if (k) { state.f[k] = el.value; save(); scheduleRender(); refreshCounts(); return; }
    var ck = el.getAttribute && el.getAttribute("data-ck");
    if (ck) { var i = +el.closest(".crow").getAttribute("data-i"); state.custom[i][ck] = el.value; save(); scheduleRender(); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.target && e.target.id === "chipInput" && e.key === "Enter") { e.preventDefault(); addCustomChip(); }
    if (e.key === "Escape") { var m = $(".modal:not([hidden])"); if (m && m.id !== "busy") { var c = $("[data-close]", m) || $("#cropCancel", m) || $("#payCancel", m); if (c) c.click(); } }
  });
  document.addEventListener("change", function (e) {
    var el = e.target;
    if (el.id === "langSel") {
      state.lang = el.value;
      if (state.lang === "ur" && (state.deity === "ganesh" || state.deity === "om")) state.deity = "bismillah";
      if (state.deity !== "none" && I.blessOptions(state.lang).indexOf(state.deity) < 0) state.deity = "ganesh";
      save(); buildControls(); buildForm(); render(true); themeLang();
    }
    else if (el.id === "deitySel") { state.deity = el.value; save(); render(); }
    else if (el.id === "devaChk") { state.deva = el.checked; save(); render(); }
    else if (el.id === "photoInput" && el.files && el.files[0]) { openCrop(el.files[0]); el.value = ""; }
    else if (el.getAttribute("data-k")) { state.f[el.getAttribute("data-k")] = el.value; save(); scheduleRender(); refreshCounts(); }
  });
  function addCustomChip() {
    var inp = $("#chipInput"); if (!inp) return; var v = inp.value.trim(); if (!v) { inp.focus(); return; }
    state.customChips = (state.customChips || []).concat([v]).slice(0, 6); save(); rebuildVibe(); render(); var n = $("#chipInput"); if (n) n.focus();
  }
  function rebuildVibe() {
    var a = $('.acc[data-sec="vibe"] .acc-in'); if (a) a.innerHTML = vibeHTML();
    var n = (state.chips || []).length + (state.customChips || []).length, h = $('.acc[data-sec="vibe"] .acc-h'), b = h && $(".acc-n", h);
    if (h) { if (n && !b) { b = document.createElement("span"); b.className = "acc-n"; h.insertBefore(b, $(".acc-cv", h)); } if (b) { if (n) b.textContent = n; else b.remove(); } }
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("button,a,.prog-next") : null; if (!b) return;
    if (b.hasAttribute("data-tpl")) {
      state.tpl = b.getAttribute("data-tpl"); save();
      $$(".tcard").forEach(function (x) { var on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-checked", on); });
      b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
      render(true);
    }
    else if (b.classList.contains("acc-h")) { var id = b.parentNode.getAttribute("data-sec"); setAcc(id, !accOpen[id]); }
    else if (b.classList.contains("uib")) { state.ui = b.getAttribute("data-ui"); save(); applyUI(); }
    else if (b.hasAttribute("data-g")) { state.g = b.getAttribute("data-g"); save(); $$(".gb").forEach(function (x) { var on = x.getAttribute("data-g") === state.g; x.classList.toggle("on", on); x.setAttribute("aria-checked", on); }); refreshWriters(); }
    else if (b.hasAttribute("data-chip")) {
      var cid = b.getAttribute("data-chip"), arr = state.chips || [], ix = arr.indexOf(cid);
      if (ix >= 0) arr.splice(ix, 1); else arr.push(cid);
      state.chips = arr; b.classList.toggle("on", ix < 0); b.setAttribute("aria-pressed", ix < 0);
      b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
      save(); scheduleRender(); rebuildVibeCount();
    }
    else if (b.hasAttribute("data-cdel")) { state.customChips.splice(+b.getAttribute("data-cdel"), 1); save(); rebuildVibe(); render(); }
    else if (b.id === "chipAdd") addCustomChip();
    else if (b.id === "addRow") { state.custom.push({ k: "", v: "" }); save(); $("#customRows").innerHTML = customHTML(); var ins = $$("#customRows input"); if (ins.length) ins[ins.length - 2].focus(); }
    else if (b.hasAttribute("data-del")) { state.custom.splice(+b.getAttribute("data-del"), 1); save(); $("#customRows").innerHTML = customHTML(); render(); }
    else if (b.id === "photoRemove") { state.photo = ""; save(); buildForm(); render(); }
    else if (b.hasAttribute("data-writer")) toggleWriter(b.getAttribute("data-writer"));
    else if (b.hasAttribute("data-tone")) { var w = b.closest(".writer"); WR[w.id].tone = b.getAttribute("data-tone"); WR[w.id].seed = 1 + (Math.random() * 1e6 | 0); drawWriter(w.id); }
    else if (b.hasAttribute("data-shuffle")) { var w2 = b.closest(".writer"); WR[w2.id].seed = 1 + (Math.random() * 1e6 | 0); drawWriter(w2.id); }
    else if (b.hasAttribute("data-use")) useWriter(b.closest(".writer").id);
    else if (b.hasAttribute("data-wg")) { state.g = b.getAttribute("data-wg"); save(); buildFormKeep(); }
    else if (b.classList.contains("prog-next")) jumpTo(b.getAttribute("data-k"));
    else if (b.id === "btnPdf" || b.id === "mPdf") doExport("pdf");
    else if (b.id === "btnJpg") doExport("jpg");
    else if (b.id === "btnPrint") doExport("print");
    else if (b.id === "btnWa") doExport("wa");
    else if (b.id === "btnReel" || b.id === "mReel") openReel();
    else if (b.id === "btnClear") { if (confirm(t("confirmClear"))) { var keep = { lang: state.lang, ui: state.ui, tpl: state.tpl, deity: state.deity }; state = Object.assign(JSON.parse(JSON.stringify(DEFAULT)), keep); try { localStorage.removeItem(STORE_KEY); } catch (x) {} applyUI(); render(); } }
    else if (b.id === "btnSample") fillSample();
    else if (b.id === "goPreview") $("#previewPane").scrollIntoView({ behavior: "smooth" });
    else if (b.id === "goEdit" || b.id === "heroStart") { var fp = $("#formPane"); fp.scrollIntoView({ behavior: "smooth" }); }
    else if (b.id === "heroDesigns") { var d = $("#designs"); if (d) d.scrollIntoView({ behavior: "smooth", block: "center" }); }
  });
  function rebuildVibeCount() { var n = (state.chips || []).length + (state.customChips || []).length, h = $('.acc[data-sec="vibe"] .acc-h'), b = h && $(".acc-n", h); if (!h) return; if (n && !b) { b = document.createElement("span"); b.className = "acc-n"; h.insertBefore(b, $(".acc-cv", h)); } if (b) { if (n) b.textContent = n; else b.remove(); } }
  function jumpTo(k) {
    if (!k) return;
    if (k === "photo") { var p = $(".photo-pick"); p.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    if (k === "chips") { setAcc("vibe", true); $('.acc[data-sec="vibe"]').scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    var s = SB.SECTIONS.filter(function (x) { return x.fields.indexOf(k) >= 0; })[0]; if (s) setAcc(s.id, true);
    var el = $("#f_" + k); if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(function () { el.focus({ preventScroll: true }); }, 350); }
  }

  // ---------- About-me writer (lazy) ----------
  var WR = {};
  function loadWriter() { return SB.loadScript(SB.ASSETS + "js/writer.js?v=" + (window.SB_V || ""), function () { return !!window.SB_WRITER; }); }
  function toggleWriter(field) {
    var id = "wr_" + field, box = $("#" + id); if (!box) return;
    if (!box.hidden) { box.hidden = true; return; }
    loadWriter().then(function () { WR[id] = WR[id] || { field: field, tone: "s", seed: 1 + (Math.random() * 1e6 | 0) }; box.hidden = false; drawWriter(id); })
      .catch(function () { toast(t("loadFail")); });
  }
  function writerData() {
    var f = state.f, lang = state.lang;
    var chips = (state.chips || []).map(function (id) { return CH.BY_ID[id]; }).filter(Boolean);
    return { name: (f.fullName || "").trim(), occ: (f.occupation || "").trim(), company: (f.company || "").trim(), edu: (f.education || "").trim(), native: (f.native || "").trim(),
      hobbies: chips.filter(function (c) { return c.kind === "hobby"; }).map(function (c) { return CH.label(c.id, lang); }),
      traits: chips.filter(function (c) { return c.kind === "trait"; }).map(function (c) { return CH.label(c.id, lang); }) };
  }
  function drawWriter(id) {
    var box = $("#" + id), w = WR[id]; if (!box || !w) return;
    var tones = [["s", "toneS"], ["f", "toneF"], ["u", "toneU"], ["p", "toneP"]];
    var h = '<div class="wtones" role="group">' + tones.map(function (x) { return '<button type="button" class="wt' + (w.tone === x[0] ? " on" : "") + '" data-tone="' + x[0] + '" aria-pressed="' + (w.tone === x[0]) + '">' + esc(t(x[1])) + "</button>"; }).join("") + "</div>";
    if (!state.g) {
      h += '<div class="wneed">' + ic("sparkle") + "<span>" + esc(t("writerNeedG")) + '</span><div class="wneed-b"><button type="button" class="btn sm ghost" data-wg="f">' + ic("female") + esc(t("bride")) + '</button><button type="button" class="btn sm ghost" data-wg="m">' + ic("male") + esc(t("groom")) + "</button></div></div>";
    } else {
      var txt = window.SB_WRITER.write({ kind: w.field === "aboutText" ? "about" : "expect", lang: state.lang, g: state.g, tone: w.tone, seed: w.seed, data: writerData() });
      w.text = txt;
      h += '<div class="wout" dir="' + (I.meta(state.lang).dir || "ltr") + '" lang="' + state.lang + '">' + esc(txt) + "</div>" +
        '<div class="wact"><button type="button" class="btn sm ghost" data-shuffle="1">' + ic("shuffle") + "<span>" + esc(t("shuffle")) + '</span></button><button type="button" class="btn sm" data-use="1">' + ic("check") + "<span>" + esc(t("useText")) + "</span></button></div>";
    }
    box.innerHTML = h;
  }
  function refreshWriters() { Object.keys(WR).forEach(function (id) { var b = $("#" + id); if (b && !b.hidden) drawWriter(id); }); }
  function buildFormKeep() { var open = Object.keys(WR).filter(function (id) { var b = $("#" + id); return b && !b.hidden; }); buildForm(); open.forEach(function (id) { var b = $("#" + id); if (b) { b.hidden = false; drawWriter(id); } }); }
  function useWriter(id) {
    var w = WR[id]; if (!w || !w.text) return;
    state.f[w.field] = w.text; var ta = $("#f_" + w.field); if (ta) { ta.value = w.text; ta.classList.remove("glow"); void ta.offsetWidth; ta.classList.add("glow"); }
    save(); render(); refreshCounts(); $("#" + id).hidden = true; toast(t("writerAdded"));
  }

  // ---------- sample data ----------
  var SAMPLES = {
    en: { fullName: "Ananya Sharma", dob: "1998-03-14", birthTime: "06:45", birthPlace: "Patna, Bihar", height: "5 ft 4 in", complexion: "Wheatish", religion: "Hindu", caste: "Brahmin", gotra: "Kashyap", rashi: "Meen", nakshatra: "Revati", manglik: "no", education: "MBA (Marketing), SCMHRD Pune", occupation: "Marketing Manager", company: "Infosys, Bengaluru", income: "₹12 lakh per year", father: "Shri Ramesh Sharma", fatherOcc: "Retired teacher", mother: "Smt. Sunita Sharma", motherOcc: "Homemaker", brothers: "1 younger (studying)", sisters: "1 elder (married)", native: "Chhapra, Saran (Bihar)", contactPerson: "Shri Ramesh Sharma (Father)", phone: "+91 98XXX XXXXX", email: "family@example.com", address: "Kankarbagh, Patna", aboutText: "Calm, cheerful and family-oriented. I enjoy music, travel and cooking for my family.", expectations: "An educated, kind and family-oriented partner who respects both families." },
    hi: { fullName: "अनन्या शर्मा", dob: "1998-03-14", birthTime: "06:45", birthPlace: "पटना, बिहार", height: "5 फ़ुट 4 इंच", complexion: "गेहुँआ", religion: "हिन्दू", caste: "ब्राह्मण", gotra: "कश्यप", rashi: "मीन", nakshatra: "रेवती", manglik: "no", education: "एम.बी.ए. (मार्केटिंग), SCMHRD पुणे", occupation: "मार्केटिंग मैनेजर", company: "इंफ़ोसिस, बेंगलुरु", income: "₹12 लाख प्रति वर्ष", father: "श्री रमेश शर्मा", fatherOcc: "सेवानिवृत्त शिक्षक", mother: "श्रीमती सुनीता शर्मा", motherOcc: "गृहिणी", brothers: "1 छोटा भाई (पढ़ाई)", sisters: "1 बड़ी बहन (विवाहित)", native: "छपरा, सारण (बिहार)", contactPerson: "श्री रमेश शर्मा (पिता)", phone: "+91 98XXX XXXXX", address: "कंकड़बाग, पटना", aboutText: "शांत, हँसमुख और परिवार से जुड़ी हुई। संगीत, यात्रा और परिवार के लिए खाना बनाना पसंद है।", expectations: "शिक्षित, सरल स्वभाव और दोनों परिवारों का सम्मान करने वाला जीवनसाथी।" }
  };
  SAMPLES.mai = Object.assign({}, SAMPLES.hi, { birthPlace: "मधुबनी", native: "दरभंगा, मिथिला", aboutText: "शान्त, परिवार-प्रेमी आ मेहनती। संगीत आ यात्रा नीक लगैत अछि।" });
  SAMPLES.bho = Object.assign({}, SAMPLES.hi, { native: "छपरा, सारण (बिहार)", aboutText: "सीधा-सादा, परिवार से जुड़ल आ मेहनती। घूमल आ गीत-संगीत पसंद बा।" });
  Object.keys(I.SAMPLES_X).forEach(function (k) { SAMPLES[k] = Object.assign({}, SAMPLES.en, { email: "" }, I.SAMPLES_X[k]); });
  function fillSample() {
    state.f = Object.assign({}, SAMPLES[state.lang] || SAMPLES.en);
    state.custom = [{ k: I.bio("blood", state.lang), v: "B+" }];
    if (!state.chips || !state.chips.length) state.chips = ["music", "travel", "cooking", "family", "cheerful", "sunday"];
    state.g = ["en", "hi", "mai", "bho"].indexOf(state.lang) >= 0 ? "f" : "m"; // the sample people: a bride in en/hi/mai/bho, grooms in the other samples
    save(); buildForm(); render();
  }

  // ---------- photo crop ----------
  var crop = null;
  function openCrop(file) {
    var url = URL.createObjectURL(file), img = new Image();
    img.onload = function () {
      var m = $("#cropModal"), cv = $("#cropCanvas"), z = $("#cropZoom");
      crop = { img: img, zoom: 1, x: 0, y: 0, url: url };
      crop.base = Math.max(cv.width / img.width, cv.height / img.height);
      z.value = 1; m.hidden = false; drawCrop();
    };
    img.onerror = function () { alert(t("badImage")); };
    img.src = url;
  }
  function clampCrop() {
    var cv = $("#cropCanvas"), s = crop.base * crop.zoom, w = crop.img.width * s, h = crop.img.height * s;
    crop.x = Math.min(0, Math.max(cv.width - w, crop.x)); crop.y = Math.min(0, Math.max(cv.height - h, crop.y));
  }
  function drawCrop(center) {
    var cv = $("#cropCanvas"), ctx = cv.getContext("2d"), s = crop.base * crop.zoom;
    if (center !== false && crop.cx === undefined) { crop.x = (cv.width - crop.img.width * s) / 2; crop.y = (cv.height - crop.img.height * s) / 3; crop.cx = 1; }
    clampCrop(); ctx.fillStyle = "#eee"; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.drawImage(crop.img, crop.x, crop.y, crop.img.width * s, crop.img.height * s);
  }
  document.addEventListener("DOMContentLoaded", function () {
    var cv = $("#cropCanvas"); if (!cv) return;
    var drag = null;
    cv.addEventListener("pointerdown", function (e) { if (!crop) return; drag = { x: e.clientX, y: e.clientY, ox: crop.x, oy: crop.y }; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener("pointermove", function (e) { if (!drag) return; var r = cv.width / cv.getBoundingClientRect().width; crop.x = drag.ox + (e.clientX - drag.x) * r; crop.y = drag.oy + (e.clientY - drag.y) * r; drawCrop(false); });
    cv.addEventListener("pointerup", function () { drag = null; });
    $("#cropZoom").addEventListener("input", function (e) {
      var cx = cv.width / 2, cy = cv.height / 2, old = crop.base * crop.zoom; crop.zoom = +e.target.value; var nw = crop.base * crop.zoom;
      crop.x = cx - (cx - crop.x) * nw / old; crop.y = cy - (cy - crop.y) * nw / old; drawCrop(false);
    });
    $("#cropOk").addEventListener("click", function () {
      var out = document.createElement("canvas"); out.width = 600; out.height = 750;
      var r = out.width / cv.width, s = crop.base * crop.zoom * r, ctx = out.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, 600, 750); ctx.drawImage(crop.img, crop.x * r, crop.y * r, crop.img.width * s, crop.img.height * s);
      state.photo = out.toDataURL("image/jpeg", 0.86); URL.revokeObjectURL(crop.url); crop = null;
      $("#cropModal").hidden = true; save(); buildForm(); render();
    });
    $("#cropCancel").addEventListener("click", function () { $("#cropModal").hidden = true; if (crop) URL.revokeObjectURL(crop.url); crop = null; });
  });

  // ---------- exports ----------
  function payGate() {
    return new Promise(function (res, rej) {
      if (!CFG.PAYMENT_ENABLED || isPaid()) return res();
      var m = $("#payModal");
      $("#payPrice").textContent = (CFG.CURRENCY === "INR" ? "₹" : CFG.CURRENCY + " ") + CFG.PRICE;
      var pay = $("#payNow"); pay.href = CFG.PAYMENT_LINK || "#"; pay.hidden = !CFG.PAYMENT_LINK;
      m.hidden = false;
      $("#payDone").onclick = function () { try { localStorage.setItem(PAID_KEY, "1"); } catch (e) {} m.hidden = true; render(); res(); };
      $("#payCancel").onclick = function () { m.hidden = true; rej(new Error("cancel")); };
    });
  }
  function needName() {
    if ((state.f.fullName || "").trim()) return false;
    toast(t("nameNeeded")); setAcc("personal", true);
    var n = $("#f_fullName"); if (n) { n.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(function () { n.focus({ preventScroll: true }); }, 350); }
    return true;
  }
  function celebrate() { if (FX.confetti) FX.confetti(); toast(t("shubh") + " " + t("dlDone"), true); }
  var busy = false;
  function doExport(kind) {
    if (busy || needName()) return;
    if (kind === "print") {
      payGate().then(function () {
        // Lay out and auto-fit in the (rendered, off-screen) export host: #printHost is display:none on screen, where fit() cannot measure.
        var ph = $("#printHost"), ex = $("#exportHost"); ex.innerHTML = SB.sheetHTML(state, sheetOpts()); var sh = ex.firstChild;
        SB.ensureFonts(sh).then(function () { SB.fit(sh); ph.innerHTML = ""; ph.appendChild(sh); window.print(); });
      }).catch(function () {});
      return;
    }
    busy = true; var ov = $("#busy"); ov.hidden = false;
    payGate().then(function () { return SB.renderCanvas(state, sheetOpts()); }).then(function (canvas) {
      return SB.canvasToBlob(canvas, 0.92).then(function (jpg) {
        if (kind === "jpg") { SB.saveBlob(jpg, SB.fileBase(state) + ".jpg"); celebrate(); return; }
        if (kind === "pdf") return jpg.arrayBuffer().then(function (buf) { SB.saveBlob(window.SB_PDF.fromJpeg(new Uint8Array(buf), canvas.width, canvas.height), SB.fileBase(state) + ".pdf"); celebrate(); });
        if (kind === "wa") return shareFile(jpg, SB.fileBase(state) + ".jpg", "image/jpeg");
      });
    }).catch(function (err) {
      if (err && err.message !== "cancel") { console.error(err); alert(t("exportFail") + " (" + (err.message || err) + ")"); }
    }).then(function () { busy = false; ov.hidden = true; });
  }
  function shareText() { return (state.lang === "en" ? "Marriage biodata of " : "") + (state.f.fullName || "") + " — made free with ShubhBiodata " + (CFG.SITE_URL || ""); }
  // Web Share with a file where the phone supports it; otherwise download + open WhatsApp.
  function shareFile(blob, name, type) {
    var file = null, text = shareText();
    try { file = new File([blob], name, { type: type }); } catch (e) {}
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      return navigator.share({ files: [file], title: I.bio("title", state.lang), text: text }).catch(function (e) { if (e && e.name !== "AbortError") throw e; });
    }
    SB.saveBlob(blob, name); toast(t("waFallback"));
    setTimeout(function () { window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank", "noopener"); }, 700);
    return Promise.resolve();
  }
  var toastT;
  function toast(msg, party) {
    var el = $("#toast"); el.textContent = msg; el.className = party ? "party" : ""; el.hidden = false;
    void el.offsetWidth; el.classList.add("in"); clearTimeout(toastT);
    toastT = setTimeout(function () { el.classList.remove("in"); setTimeout(function () { el.hidden = true; }, 300); }, party ? 4200 : 5200);
  }

  // ---------- Biodata Reel (lazy) ----------
  function openReel() {
    if (needName()) return;
    var m = $("#reelModal"); m.hidden = false;
    var root = $("#reelRoot"); root.innerHTML = '<div class="spin"></div>';
    SB.loadScript(SB.ASSETS + "js/reel.js?v=" + (window.SB_V || ""), function () { return !!window.SB_REEL; })
      .then(function () { window.SB_REEL.open(root, { state: function () { return state; }, t: t, save: save, shareFile: shareFile, celebrate: celebrate, toast: toast, close: function () { m.hidden = true; } }); })
      .catch(function () { root.innerHTML = "<p>" + esc(t("loadFail")) + "</p>"; });
  }
  document.addEventListener("click", function (e) { var c = e.target.closest && e.target.closest("[data-close]"); if (c) { var m = c.closest(".modal"); if (m) { m.hidden = true; if (window.SB_REEL && m.id === "reelModal") window.SB_REEL.stop(); } } });

  // ---------- boot ----------
  function boot() {
    applyUI(); render();
    if (FX.petals) FX.petals($("#petals"));
    document.documentElement.classList.add("ready");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  window.SB_DEBUG = {
    state: function () { return state; }, fillSample: fillSample,
    setLang: function (l) { state.lang = l; buildControls(); buildForm(); render(); themeLang(); },
    setTheme: function (p) { if (window.SB_THEME) window.SB_THEME.set(p); },
    setDeity: function (d) { state.deity = d; buildControls(); render(); }, setDigits: function (on) { state.deva = !!on; buildControls(); render(); },
    setTpl: function (x) { state.tpl = x; buildControls(); render(); }, setPhoto: function (d) { state.photo = d; buildForm(); render(); progress(); },
    setGender: function (g) { state.g = g; buildForm(); }, setChips: function (a, c) { state.chips = a; state.customChips = c || []; buildForm(); render(); progress(); },
    openAcc: setAcc, renderCanvas: function () { return SB.renderCanvas(state, sheetOpts()); }, celebrate: celebrate, openReel: openReel, toggleWriter: toggleWriter
  };
})();
