#!/usr/bin/env python3
"""Generates index.html, the SEO landing pages, privacy page, sitemap.xml and robots.txt.
Run from the repo root:  python3 tools/build.py
(Only needed when page text in tools/pages.py changes. The site itself has no build step.)"""
import html, json, os, re, sys, datetime
sys.path.insert(0, os.path.dirname(__file__))
from pages import PAGES, SITE

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TODAY = datetime.date.today().isoformat()
V = "8"  # bump to bust caches after editing CSS/JS
e = html.escape

# Icons: single source of truth is assets/js/icons.js (JSON block), shared with the app.
_ICONS = json.loads(re.search(r"var P = (\{.*?\});\s*/\*ICONS-JSON-END", open(os.path.join(ROOT, "assets", "js", "icons.js"), encoding="utf-8").read(), re.S).group(1))
# Theme toggle strings (14 languages): single source of truth is assets/js/theme.js (JSON block).
_THEME = json.loads(re.search(r"var T = (\{.*?\});\s*/\*THEME-JSON-END", open(os.path.join(ROOT, "assets", "js", "theme.js"), encoding="utf-8").read(), re.S).group(1))
# Runs before first paint: saved choice (localStorage "sb.theme") or the OS setting -> <html data-theme>, colour-scheme, theme-color.
THEME_BOOT = """<meta name="color-scheme" content="light dark">
<script>(function(d){var p=null;try{p=localStorage.getItem("sb.theme")}catch(e){}var x=p==="light"||p==="dark";var t=x?p:(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");d.setAttribute("data-theme",t);d.setAttribute("data-theme-pref",x?p:"system");d.style.colorScheme=t;var m=d.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#1c0f26":"#ff7a8a")})(document.documentElement)</script>"""


def theme_btn(lang):
    s = _THEME.get(lang, _THEME["en"])
    aria = s["aria"].replace("{cur}", s["system"]).replace("{next}", s["dark"])
    rtl = ' dir="rtl"' if lang == "ur" else ""
    icons = "".join(f'<span class="thm-i i-{m}">{ic(n)}</span>' for m, n in (("light", "sun"), ("dark", "moon"), ("system", "auto")))
    return (f'<button type="button" class="thm" id="themeBtn" data-mode="system" lang="{lang}" aria-label="{e(aria)}" title="{e(aria)}">'
            f'<span class="thm-ic">{icons}</span><span class="thm-t"{rtl}>{e(s["system"])}</span></button>')


def ic(name, cls=""):
    return ('<svg class="ic%s" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' % (" " + cls if cls else "")) + _ICONS[name].replace("'", '"') + "</svg>"

LANG_PAGES = [(p["slug"], p["lang"]) for p in PAGES if p["slug"].endswith("-marriage-biodata")]
LANG_LINKS = [(sl, sl.split("-")[0].capitalize() + " biodata") for sl, _ in LANG_PAGES] + \
             [("marriage-biodata-format", "Biodata format"), ("biodata-for-marriage", "Biodata for marriage")]


def block(item):
    if isinstance(item, tuple):
        tag, items = item
        return f"<{tag}>" + "".join(f"<li>{e(x)}</li>" for x in items) + f"</{tag}>"
    return f"<p>{e(item)}</p>"


def head(p, pre, url):
    og_img = SITE + "assets/img/og.png"
    hreflang = "".join(
        f'<link rel="alternate" hreflang="{l}" href="{SITE}{s}/">' for s, l in
        LANG_PAGES)
    hreflang += f'<link rel="alternate" hreflang="x-default" href="{SITE}">'
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "WebApplication", "name": "ShubhBiodata", "url": url, "applicationCategory": "UtilitiesApplication",
         "operatingSystem": "Any", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "INR"},
         "inLanguage": ["en"] + [l for _, l in LANG_PAGES], "description": p["desc"]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p.get("faq", [])]}]}
    if not p.get("faq"):
        ld["@graph"].pop()
    return f"""<!doctype html>
<html lang="{'hi' if p['lang']=='hi' else 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{e(p['title'])}</title>
<meta name="description" content="{e(p['desc'])}">
<link rel="canonical" href="{url}">
{hreflang}
<meta name="theme-color" content="#ff7a8a">
{THEME_BOOT}
<meta property="og:type" content="website">
<meta property="og:site_name" content="ShubhBiodata">
<meta property="og:title" content="{e(p['title'])}">
<meta property="og:description" content="{e(p['desc'])}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{og_img}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{pre}assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="{pre}assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="{pre}assets/img/apple-touch-icon.png">
<link rel="manifest" href="{pre}manifest.webmanifest">
<link rel="preload" href="{pre}assets/fonts/noto-sans-devanagari-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{pre}assets/fonts/noto-sans-devanagari-devanagari-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{pre}assets/fonts/fraunces-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>{f'<link rel="preload" href="{pre}assets/fonts/{p["font"]}" as="font" type="font/woff2" crossorigin>' if p.get("font") else ""}
<link rel="stylesheet" href="{pre}assets/css/fonts.css?v={V}">
<link rel="stylesheet" href="{pre}assets/css/app.css?v={V}">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>"""


def topbar(pre, ui=True, lang="en"):
    sw = '<div class="uisw" role="group" aria-label="Language"><button class="uib on" data-ui="en" type="button">English</button><button class="uib" data-ui="hi" type="button">हिन्दी</button></div>' if ui else ""
    return f"""<header class="top"><div class="wrap"><a class="brand" href="{pre or './'}"><img src="{pre}assets/img/favicon.svg" alt="" width="30" height="30"><span>Shubh<b>Biodata</b></span></a>{sw}{theme_btn(lang)}</div></header>"""


def footer(pre):
    links = "".join(f'<a href="{pre}{s}/">{e(n)}</a>' for s, n in LANG_LINKS)
    return f"""<footer class="site"><div class="wrap"><div class="links">{links}</div>
<p>ShubhBiodata is free and private: everything is made inside your browser and nothing is uploaded. <a href="{pre}privacy/">Privacy</a> · Contact: <a href="mailto:sauravsahbrj@gmail.com">sauravsahbrj@gmail.com</a></p>
<p>© {datetime.date.today().year} ShubhBiodata. Fonts: Noto, Cormorant Garamond and Fraunces (SIL OFL). Export uses html2canvas (MIT).</p></div></footer>"""


MODALS = """
<div class="modal" id="cropModal" hidden><div class="box"><h3 data-t="cropTitle"></h3><small data-t="cropHint"></small>
<canvas id="cropCanvas" width="480" height="600"></canvas>
<label><span data-t="zoom"></span> <input id="cropZoom" type="range" min="1" max="4" step="0.01" value="1"></label>
<div class="row"><button class="btn ghost" id="cropCancel" type="button" data-t="cancel"></button><button class="btn" id="cropOk" type="button" data-t="useThis"></button></div></div></div>
<div class="modal" id="payModal" hidden><div class="box"><h3 data-t="payTitle"></h3><p><span data-t="payBody"></span> <b id="payPrice"></b></p>
<div class="row"><a class="btn" id="payNow" target="_blank" rel="noopener" data-t="payBtn"></a></div>
<div class="row"><button class="btn ghost" id="payCancel" type="button" data-t="cancel"></button><button class="btn gold" id="payDone" type="button" data-t="paidBtn"></button></div></div></div>
<div class="modal" id="reelModal" hidden><div class="box" role="dialog" aria-modal="true"><div id="reelRoot"></div></div></div>
<div class="modal" id="busy" hidden><div class="box"><div class="spin"></div><span data-t="working"></span></div></div>
<div id="toast" role="status" aria-live="polite" hidden></div>
<div id="exportHost" aria-hidden="true"></div>
<div id="printHost"></div>"""


def maker():
    def b(i, t, cls="", extra=""):
        return f'<button type="button" class="btn {cls}" id="{i}"{extra}>{ic(t[0])}<span data-t="{t[1]}"></span></button>'
    return f"""<div class="app" id="maker">
<div id="formPane">
<div class="card prog" id="progCard"><div class="ring"><svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5c7f"/><stop offset="1" stop-color="#ffb627"/></linearGradient></defs><circle class="ring-bg" cx="32" cy="32" r="26"/><circle class="ring-fg" cx="32" cy="32" r="26"/></svg><span class="ring-n">0%</span></div>
<div class="prog-b"><div class="prog-t"></div><div class="prog-m"></div><button type="button" class="prog-next"></button></div></div>
<div class="card"><div id="controls"></div></div>
<div class="card"><form id="form" autocomplete="on" onsubmit="return false"></form>
<div class="rowbtns"><button type="button" class="btn sm ghost" id="btnSample">{ic("wand")}<span data-t="sample"></span></button><span class="saved" id="savedNote">{ic("check")}<span data-t="saved"></span></span><button type="button" class="btn sm ghost" id="btnClear">{ic("trash")}<span data-t="clear"></span></button></div>
<p class="privacy-note">{ic("lock")}<span data-t="privacy"></span></p></div>
</div>
<div id="previewPane">
<div class="pv-head"><span class="live"><i></i><span data-t="livePreview"></span></span></div>
<div id="previewWrap"><div id="sheetHost"></div><div id="pvEmpty" data-t="emptyPreview" hidden></div></div>
<div class="actions">{b("btnPdf", ("download","pdf"))}{b("btnJpg", ("image","jpg"), "ghost")}{b("btnPrint", ("printer","print"), "ghost")}{b("btnWa", ("chat","wa"), "wa")}<button type="button" class="btn reel" id="btnReel">{ic("film")}<span data-t="reelBtn"></span><span class="tnew" data-t="newBadge"></span></button></div>
<p class="fitnote" data-t="fitNote"></p>
</div>
</div>
<div class="mbar" id="mProg"><button type="button" class="btn ghost" id="goEdit">{ic("edit")}<span data-t="edit"></span></button><button type="button" class="btn ghost" id="goPreview">{ic("eye")}<span data-t="preview"></span></button><button type="button" class="btn ghost" id="mReel">{ic("film")}<span data-t="reelShort">Reel</span></button><button type="button" class="btn" id="mPdf">{ic("download")}<span data-t="mPdf"></span></button></div>"""


def page(p):
    slug = p["slug"]
    pre = "../" if slug else ""
    url = SITE + (slug + "/" if slug else "")
    secs = "".join(f"<h2>{e(h)}</h2>" + "".join(block(x) for x in items) for h, items in p["sections"])
    faq = "".join(f"<details><summary>{e(q)}</summary><p>{e(a)}</p></details>" for q, a in p["faq"])
    body = f"""
<body data-lang="{p['lang']}">
{topbar(pre, lang=p['lang'])}
<main class="wrap">
<section class="hero"><canvas id="petals" aria-hidden="true"></canvas><h1>{e(p['h1'])}</h1><p>{e(p['intro'])}</p>
<div class="pills"><span>{ic("check")}<span data-t="pFree">Free</span></span><span>{ic("check")}<span data-t="pNoSignup">No signup</span></span><span>{ic("check")}<span data-t="pFormats">PDF · JPG · Reel · WhatsApp</span></span><span>{ic("check")}<span data-t="pDesigns">7 designs</span></span><span>{ic("check")}<span data-t="pLangs">14 languages: Hindi, Bengali, Marathi, Tamil, Telugu, Urdu &amp; more</span></span></div>
<div class="hero-cta"><button type="button" class="btn" id="heroStart">{ic("sparkle")}<span data-t="heroCta"></span></button><button type="button" class="btn ghost" id="heroDesigns">{ic("palette")}<span data-t="heroSee"></span></button></div></section>
{maker()}
<section class="content-sec">{secs}<h2>FAQ</h2><div class="faq">{faq}</div></section>
</main>
{footer(pre)}
{MODALS}
<script>window.SB_V="{V}"</script>
<script src="{pre}config.js?v={V}"></script>
<script src="{pre}assets/js/i18n.js?v={V}"></script>
<script src="{pre}assets/js/icons.js?v={V}"></script>
<script src="{pre}assets/js/chips.js?v={V}"></script>
<script src="{pre}assets/js/core.js?v={V}"></script>
<script src="{pre}assets/js/pdf.js?v={V}"></script>
<script src="{pre}assets/js/fx.js?v={V}"></script>
<script src="{pre}assets/js/theme.js?v={V}"></script>
<script src="{pre}assets/js/app.js?v={V}"></script>
</body></html>
"""
    out = os.path.join(ROOT, slug, "index.html") if slug else os.path.join(ROOT, "index.html")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, "w", encoding="utf-8").write(head(p, pre, url) + body)
    return url


def privacy():
    p = dict(title="Privacy – ShubhBiodata", desc="ShubhBiodata collects no data. Your biodata is created in your browser and never uploaded.", lang="en", faq=[])
    pre = "../"
    url = SITE + "privacy/"
    body = f"""
<body>
{topbar(pre, ui=False)}
<main class="wrap content-sec"><h1>Privacy</h1>
<p><b>Short version: we collect nothing.</b></p>
<ul>
<li>Your biodata (text and photo) is created entirely inside your own browser. It is never sent to any server.</li>
<li>To let you come back and edit, your details are saved in your browser's local storage on this device only. Tap “Clear all” in the maker to delete them, or clear your browser data.</li>
<li>There are no accounts, no cookies for tracking, no analytics and no advertising scripts. All fonts and code are served from this website itself; no third-party services are contacted.</li>
<li>When you tap “Share on WhatsApp”, your phone's own share menu or WhatsApp is opened by you; ShubhBiodata does not see what you send.</li>
<li>The website is hosted on GitHub Pages. GitHub may keep standard server logs (such as IP address) as described in <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub's privacy statement</a>.</li>
</ul>
<p>Questions: <a href="mailto:sauravsahbrj@gmail.com">sauravsahbrj@gmail.com</a></p>
<p><a class="btn" href="../">Make your biodata</a></p>
</main>
{footer(pre)}
<script src="{pre}assets/js/theme.js?v={V}"></script>
</body></html>
"""
    os.makedirs(os.path.join(ROOT, "privacy"), exist_ok=True)
    open(os.path.join(ROOT, "privacy", "index.html"), "w", encoding="utf-8").write(head(p, pre, url) + body)
    return url


def main():
    urls = [page(p) for p in PAGES] + [privacy()]
    sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for u in urls:
        pr = "1.0" if u == SITE else ("0.3" if "privacy" in u else "0.8")
        sm += f"  <url><loc>{u}</loc><lastmod>{TODAY}</lastmod><priority>{pr}</priority></url>\n"
    sm += "</urlset>\n"
    open(os.path.join(ROOT, "sitemap.xml"), "w").write(sm)
    open(os.path.join(ROOT, "robots.txt"), "w").write(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}sitemap.xml\n")
    print("\n".join(urls))


if __name__ == "__main__":
    main()
