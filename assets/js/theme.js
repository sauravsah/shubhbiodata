/* ShubhBiodata light / dark theme. The tiny inline script in <head> (tools/build.py: THEME_BOOT) sets
   <html data-theme> before first paint; this file wires the header toggle, follows the OS setting while the
   choice is "system", updates <meta name=theme-color> and translates the toggle into all 14 languages.
   Only the app UI is themed: the A4 sheet, thumbnails, exports and the Reel keep their own design colours.
   tools/build.py reads the JSON block below to pre-render the toggle text, so keep it valid JSON. */
(function () {
  "use strict";
  /*THEME-JSON-START*/
  var T = {
  "en": {"light": "Light", "dark": "Dark", "system": "System", "aria": "Theme: {cur}. Tap to switch to {next}."},
  "hi": {"light": "लाइट", "dark": "डार्क", "system": "सिस्टम", "aria": "थीम: {cur}। {next} मोड के लिए टैप करें।"},
  "mai": {"light": "इजोत", "dark": "अन्हार", "system": "सिस्टम", "aria": "थीम: {cur}। {next} मोड लेल टैप करू।"},
  "bho": {"light": "अँजोर", "dark": "अन्हार", "system": "सिस्टम", "aria": "थीम: {cur}। {next} मोड खातिर टैप करीं।"},
  "mr": {"light": "उजळ", "dark": "गडद", "system": "सिस्टम", "aria": "थीम: {cur}. {next} मोडसाठी टॅप करा."},
  "bn": {"light": "হালকা", "dark": "গাঢ়", "system": "সিস্টেম", "aria": "থিম: {cur}। {next} মোডে যেতে ট্যাপ করুন।"},
  "te": {"light": "లేత", "dark": "ముదురు", "system": "సిస్టమ్", "aria": "థీమ్: {cur}. {next} మోడ్‌కి మార్చడానికి నొక్కండి."},
  "ta": {"light": "வெளிர்", "dark": "இருள்", "system": "சிஸ்டம்", "aria": "தீம்: {cur}. {next} பயன்முறைக்கு மாற்ற தட்டவும்."},
  "gu": {"light": "લાઇટ", "dark": "ડાર્ક", "system": "સિસ્ટમ", "aria": "થીમ: {cur}. {next} મોડ માટે ટૅપ કરો."},
  "ur": {"light": "روشن", "dark": "تاریک", "system": "سسٹم", "aria": "تھیم: {cur}۔ {next} موڈ کے لیے ٹیپ کریں۔"},
  "kn": {"light": "ತಿಳಿ", "dark": "ಗಾಢ", "system": "ಸಿಸ್ಟಂ", "aria": "ಥೀಮ್: {cur}. {next} ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ."},
  "or": {"light": "ହାଲୁକା", "dark": "ଗାଢ଼", "system": "ସିଷ୍ଟମ", "aria": "ଥିମ୍: {cur}। {next} ମୋଡ ପାଇଁ ଟ୍ୟାପ୍ କରନ୍ତୁ।"},
  "ml": {"light": "ലൈറ്റ്", "dark": "ഡാർക്ക്", "system": "സിസ്റ്റം", "aria": "തീം: {cur}. {next} മോഡിലേക്ക് മാറാൻ ടാപ്പ് ചെയ്യുക."},
  "pa": {"light": "ਲਾਈਟ", "dark": "ਡਾਰਕ", "system": "ਸਿਸਟਮ", "aria": "ਥੀਮ: {cur}। {next} ਮੋਡ ਲਈ ਟੈਪ ਕਰੋ।"}
  };
  /*THEME-JSON-END*/
  var KEY = "sb.theme", COLORS = { light: "#ff7a8a", dark: "#1c0f26" };
  var d = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var rm = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var lang = (document.body && document.body.getAttribute("data-lang")) || "en", animT;

  function pref() { var p = null; try { p = localStorage.getItem(KEY); } catch (e) {} return p === "light" || p === "dark" ? p : "system"; }
  function sys() { return mq && mq.matches ? "dark" : "light"; }
  function resolved(p) { return p === "system" ? sys() : p; }
  // Every tap changes what you see, and "System" is one stop of the loop:
  // System -> the opposite of the OS -> the OS look as an explicit choice -> System.
  function nextOf(p) { var s = sys(); return p === "system" ? (s === "dark" ? "light" : "dark") : (p === s ? "system" : s); }
  function str(l) { return T[l] || T.en; }

  function label() {
    var p = pref(), s = str(lang), n = nextOf(p);
    var cur = s[p], aria = s.aria.replace("{cur}", cur).replace("{next}", s[n]);
    Array.prototype.forEach.call(document.querySelectorAll(".thm"), function (b) {
      b.setAttribute("data-mode", p); b.setAttribute("aria-label", aria); b.setAttribute("title", aria); b.setAttribute("lang", lang);
      var tx = b.querySelector(".thm-t"); if (tx) { tx.textContent = cur; tx.setAttribute("dir", lang === "ur" ? "rtl" : "ltr"); }
    });
  }
  function apply(p, animate) {
    var t = resolved(p);
    if (animate && !(rm && rm.matches)) {
      d.classList.add("theme-anim"); clearTimeout(animT);
      animT = setTimeout(function () { d.classList.remove("theme-anim"); }, 650);
    }
    d.setAttribute("data-theme", t); d.setAttribute("data-theme-pref", p); d.style.colorScheme = t;
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute("content", COLORS[t]);
    label();
    try { window.dispatchEvent(new CustomEvent("sb-theme", { detail: { theme: t, pref: p } })); } catch (e) {}
  }
  function set(p) {
    if (p !== "light" && p !== "dark") p = "system";
    try { if (p === "system") localStorage.removeItem(KEY); else localStorage.setItem(KEY, p); } catch (e) {}
    apply(p, true);
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".thm"); if (!b) return;
    set(nextOf(pref()));
    b.classList.remove("spun"); void b.offsetWidth; b.classList.add("spun");
  });
  if (mq) { var on = function () { if (pref() === "system") apply("system", true); }; if (mq.addEventListener) mq.addEventListener("change", on); else if (mq.addListener) mq.addListener(on); }
  // Another tab changed it
  window.addEventListener("storage", function (e) { if (e.key === KEY) apply(pref(), true); });

  apply(pref(), false);
  window.SB_THEME = {
    T: T, get: function () { return d.getAttribute("data-theme"); }, pref: pref, set: set, next: nextOf,
    setLang: function (l) { lang = T[l] ? l : "en"; label(); }
  };
})();
