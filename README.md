# ShubhBiodata

**Beautiful marriage biodata in your language, free, in 2 minutes. PDF, JPG and a 15-second video Reel.**

Live site: https://sauravsah.github.io/shubhbiodata/

A 100% static marriage-biodata maker. Everything happens in the visitor's browser: no server, no accounts, no trackers, no paid APIs, no CDNs. Hosting on GitHub Pages is free and needs no maintenance.

## What it does
- Biodata labels in **14 languages**: English; Hindi, Maithili, Bhojpuri, Marathi (Devanagari); Bengali; Odia; Gujarati; Punjabi (Gurmukhi); Tamil; Telugu; Kannada; Malayalam; Urdu (Nastaliq/Naskh, full right-to-left layout: labels right, photo left). App UI in English / Hindi.
- Language dropdown is grouped by region and shows each language in its own script, e.g. "বাংলা (Bengali)".
- Regional field names where they differ: Manglik prints as Kuja dosham (Telugu/Kannada), Chevvai dosham (Tamil), Chovva dosham (Malayalam), Mangal (Marathi); in Urdu the Gotra row is Maslak and Caste is Zaat / Biradari.
- **7 A4 designs**: Traditional (red-gold with a marigold toran), Floral, Minimal (gold accent), Royal Maroon (mandala watermark), Modern (sidebar), and the new **Pastel Bloom** (soft pastel florals, modern sans) and **Rose Gold Card** (clean, contemporary). The picker shows live mini previews of the visitor's own biodata.
- Optional top blessing (plain text, no copyrighted art): Shri Ganesh (written in the biodata's own script; Tamil prints ஸ்ரீ விநாயகர் துணை), Om, Ik Onkar ੴ, Ik Onkar Satgur Prasad, Waheguru, Bismillah, 786, plus regional ones: Prajapataye Namah (Bengali), Pillaiyar Suzhi உ (Tamil), Srirastu Subhamastu (Telugu), Jai Jagannath (Odia), or none. The Urdu page starts on Bismillah and the Punjabi page on Ik Onkar.
- Photo upload with drag + zoom crop. Custom extra rows. Optional native digits (१२३ / ১২৩ / ૧૨૩ / ੧੨੩ / ୧୨୩ / ౧౨౩ / ೧೨೩ / ۱۲۳; off by default; not offered for Tamil and Malayalam).
- **Vibe chips**: 25 tap-to-add icon chips (hobbies, personality, ideal Sunday) plus up to 6 custom chips; labels translated into all 14 languages (`assets/js/chips.js`); printed as an icon row on every design and shown in the Reel.
- **About-me writer** ("Write for me" beside About me and Expectations): handcrafted, gender-aware sentence templates in all 14 languages (`assets/js/writer.js`), tones Simple / Family-first / Fun / Professional, Shuffle for variants, Bride/Groom selector for correct grammar. No AI, no network. The text is editable after "Use this".
- **Biodata Reel**: a ~15-second vertical video (720×1280, 9:16) drawn on a canvas from the biodata (intro with blessing and petals, photo reveal, name, 3–4 detail slides, vibe chips + about line, "Shubh Vivah" closing card with contact), in the chosen design's colours and in every language including Urdu RTL. Recorded in the browser with MediaRecorder (H.264 MP4 where the browser offers it, otherwise any MP4, otherwise WebM; ~4 Mbit/s, so a 15 s reel is about 3–8 MB). Optional soft background music is an original tune synthesised live with WebAudio (no audio files). Live preview, progress bar, Download video, Share on WhatsApp (Web Share with the file, else download + WhatsApp). Browsers without MediaRecorder get the animated preview plus a JPG download.
- Progress ring ("Your biodata is 70% complete") with an "Up next" nudge, celebratory confetti + "Shubh ho! 🎉" toast on download, petals in the hero; all animations are canvas/transform-only and switch off for `prefers-reduced-motion`.
- **Light and dark mode**: follows the phone/computer setting by default; the sun/moon button in the header (icon-only on phones) cycles System → the opposite look → the system look → System, and remembers the choice on the device (`localStorage` key `sb.theme`; System = key removed). Applied before first paint, so there is no white flash. Dark mode is deep plum and midnight with marigold, coral and rose-gold accents, glass cards, glowing petals and sparkles. The toggle label and screen-reader text are translated into all 14 languages (it speaks Hindi when the UI is Hindi, otherwise the biodata language). **The A4 preview, design thumbnails, PDF/JPG/print exports and the Reel never change with the theme.**
- Only the name is required; empty fields are hidden. Text auto-shrinks to fit one A4 page.
- Download **PDF** and **JPG**, **Print**, and **Share on WhatsApp**.
- Autosaves in the browser (localStorage). "Clear all" deletes it. Old saved states are migrated safely (a removed language falls back, a removed design maps to Pastel Bloom).
- SEO landing pages, each a full working copy of the maker with its language preselected:
  `/hindi-`, `/maithili-`, `/bhojpuri-`, `/bengali-`, `/marathi-`, `/telugu-`, `/tamil-`, `/gujarati-`, `/urdu-`, `/kannada-`, `/odia-`, `/malayalam-`, `/punjabi-marriage-biodata/`, `/marriage-biodata-format/`, `/biodata-for-marriage/`, plus `/privacy/`, `sitemap.xml`, `robots.txt`.

## Turning on payments (later)
Everything is controlled by **`config.js`** in the repo root. Nothing else needs to change.

1. Create a Razorpay **Payment Page** or **Payment Button** link (or a UPI link like `upi://pay?pa=yourid@bank&pn=ShubhBiodata&am=29&cu=INR`).
   - In Razorpay, set the payment page's **redirect URL after success** to `https://sauravsah.github.io/shubhbiodata/?paid=1`. Visitors who come back through that link are unlocked automatically on that device.
2. Edit `config.js` on GitHub (open the file → pencil icon → edit → "Commit changes"):
   ```js
   PAYMENT_ENABLED: true,
   PRICE: 29,
   PAYMENT_LINK: "https://rzp.io/l/your-link",
   ```
3. GitHub Pages redeploys by itself within about a minute.

How it behaves when on: Download/Print/WhatsApp first show a small "Download in HD" box with the price, a **Pay now** button (opens the link) and an **"I have paid, download"** button. After payment the "Made with ShubhBiodata" line is removed (`REMOVE_FOOTER_WHEN_PAID`).

**Honest limitation:** a static site cannot verify a payment. The "I have paid" button works on trust; it is an honour-system paywall. For real verification you need a tiny server (e.g. a free Cloudflare Worker that checks the Razorpay webhook). That is a later step and is not built.

To turn payments off again, set `PAYMENT_ENABLED: false`.

## Editing page text
Landing-page text lives in `tools/pages.py`. After editing, run `python3 tools/build.py` from the repo root to regenerate the HTML pages, `sitemap.xml` and `robots.txt`, then commit. (Hark can do this for you.) If you change CSS/JS, bump `V` in `tools/build.py` so phones fetch the new files (currently `8`).

Biodata labels for each language live in `assets/js/i18n.js`: the first 4 (en, hi, mai, bho) in the `L` arrays, the other 10 in the `LX` (labels), `LMETA` (script, digits, months, time words) and `SAMPLES_X` (Fill-sample data) blocks. Keep those three blocks valid JSON: `tools/pages.py` reads `LX`/`LMETA` to print each language's format list on its landing page. Icons live in `assets/js/icons.js` (a JSON block that `tools/build.py` also reads, so the static HTML and the app share one icon set).

## Files
```
index.html, */index.html   pages (generated by tools/build.py)
config.js                  payment + site settings
assets/js/i18n.js          labels in 14 languages, blessings, sample data + UI strings (English/Hindi)
assets/js/icons.js         inline SVG icon set (one stroke style, no CDN)
assets/js/chips.js         Vibe chips and their labels in 14 languages
assets/js/core.js          data model (SB.model), design registry, A4 sheet renderer, fonts, image export
assets/js/app.js           the maker UI (form, picker, preview, progress, exports)
assets/js/fx.js            hero petals + download confetti (canvas; petals/sparkles glow in dark mode)
assets/js/theme.js         light/dark toggle, OS-follow, theme-color, toggle text in 14 languages (JSON block read by tools/build.py)
assets/js/writer.js        About-me writer templates (loaded on demand)
assets/js/reel.js          Biodata Reel renderer, music and recorder (loaded on demand)
assets/js/pdf.js           tiny built-in PDF writer (wraps the rendered image in an A4 PDF)
assets/css/app.css         UI + the 7 designs
assets/css/fonts.css       self-hosted fonts (one @font-face per script/weight with unicode-range)
assets/fonts/              Noto Sans/Serif Devanagari, Noto Sans Bengali/Gujarati/Gurmukhi/Oriya/Tamil/Telugu/Kannada/Malayalam, Noto Naskh Arabic, Noto Nastaliq Urdu, Cormorant Garamond, Fraunces (SIL OFL)
assets/vendor/             html2canvas 1.4.1 (MIT)
.github/workflows/pages.yml  deploys to GitHub Pages on every push to main
```

## How the pieces fit (for future features)
Everything printable comes from one function, `SB.model(state)` in `core.js`: localised labels, values, chips, blessing, photo and the chosen design's palette (`tpl.reel` holds the video colours). The A4 sheet (`SB.sheetHTML`) and the Reel (`reel.js`) are two renderers of that model; a new output (for example a square Instagram card) is a third renderer that reads the same model and is loaded on demand like `reel.js`.

## Light / dark theme (how it works, rules for future changes)
- `tools/build.py` puts a tiny inline script (`THEME_BOOT`) right after `<meta name="theme-color">` in every page's `<head>`: it reads `sb.theme` (or `prefers-color-scheme`) and sets `<html data-theme="light|dark" data-theme-pref="light|dark|system">`, `color-scheme` and the theme-color (`#ff7a8a` light, `#1c0f26` dark) before anything paints. `404.html` carries the same snippet by hand.
- `assets/js/theme.js` (loaded on every page, including privacy) wires the `.thm` button, follows OS changes while on System, syncs other tabs, and adds `.theme-anim` for a 0.45 s colour cross-fade (skipped for `prefers-reduced-motion`). Its `T` JSON block holds the 14 translations; `build.py` pre-renders the button text in each landing page's language.
- Dark styles live in one block in `app.css` (`html[data-theme=dark] …`). In dark mode bright gradient buttons/chips carry dark plum text (`--ongrad`) so they meet WCAG AA, and field borders are ≥3:1 against the cards.
- Light-mode contrast fixes live in their own block just above it (`html:not([data-theme=dark]) …`), so they can never touch dark mode. The coral-to-marigold gradient stays; on it text and icons are deep plum (`--ongrad-l` #3a0a24). Rose text (links, "See designs", selected design name, "Up next", counters) uses the deeper `--brand-ink` #c8264f; field, chip and design-card borders use dusty rose `--fbd` #b47a8f (≥3:1); "Saved" is #137a50. The WhatsApp, Reel and gold buttons keep white text on slightly deeper jewel-tone gradients. Light and dark both audit at 0 WCAG AA failures (desktop + mobile).
- **Never theme the sheet.** `.sheet` pins `--muted` and `color-scheme:light`; no `html[data-theme=dark]` selector may reach `.sheet`, `.tthumb` contents or the Reel canvas. When adding a new design or UI rule, run `work/test_theme_export.py` (JPG/PDF must be byte-identical light vs dark, Reel frames identical, sheet computed styles identical) and `work/test_theme_print.py`.
- Tests: `work/v2_dark.py checks` (no-flash, cycle, persistence, OS-follow, 14-language labels, landing pages, reduced motion), `work/v2_dark.py audit` (WCAG contrast audit of the UI via `work/contrast_audit.js`), `work/audit_all.py` (same audit, light + dark × desktop + mobile × 5 UI states), `work/audit_pages.py` (landing, privacy, 404, Hindi UI), `work/export_snapshot.py` (hashes of JPG/PDF/Reel/sheet styles; `--cmp` two snapshots to prove exports did not change), `work/v2_dark.py shots` (screenshots `screens/v2-dark-*.png`, `v2-light-desktop-home.png`).

## Fonts and page weight
Each script's font is declared with a `unicode-range`, so a browser only downloads it when that script is actually on screen. The English/Hindi home page loads Noto Sans Devanagari, Cormorant Garamond and Fraunces (~25 KB per face); picking Tamil adds ~45 KB, Bengali ~140 KB, Urdu ~320 KB. `writer.js` (~43 KB) and `reel.js` (~28 KB) are fetched only when their buttons are tapped; html2canvas only on the first download.

## How export works (why Devanagari is always correct)
The biodata is laid out in HTML with self-hosted Noto fonts for each script, rendered to a 2× image with html2canvas (the browser shapes क्ष, त्र, श्र, द्ध itself), and that JPEG is wrapped into a single-page A4 PDF by `pdf.js`. No PDF text shaping is involved, so conjuncts never break. Trade-off: text in the PDF is not selectable. The Reel draws text with the canvas API, which uses the same browser shaping.

## Credits & licences
- Noto Sans/Serif Devanagari, Noto Sans Bengali, Gujarati, Gurmukhi, Oriya, Tamil, Telugu, Kannada, Malayalam, Noto Naskh Arabic, Noto Nastaliq Urdu (via Fontsource), Cormorant Garamond, Fraunces: SIL Open Font License 1.1 (see `assets/fonts/OFL-*.txt`).
- Icons, ornaments and the Reel music are original to this project.
- html2canvas © Niklas von Hertzen, MIT licence.

Contact: sauravsahbrj@gmail.com
