/* Tiny PDF writer: wraps one JPEG into a single A4 page. No external library needed.
   Because the page is an image of the browser-rendered biodata, Devanagari conjuncts
   (क्ष, त्र, श्र, द्ध …) always look exactly like the preview. */
(function () {
  function enc(s) { var a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i) & 255; return a; }
  function fromJpeg(jpeg, w, h) {
    var parts = [], len = 0, off = [];
    function push(b) { parts.push(b); len += b.length; }
    function obj(n, body) { off[n] = len; push(enc(n + " 0 obj\n" + body + "\nendobj\n")); }
    var PW = 595.28, PH = 841.89; // A4 in points
    // keep aspect ratio, centred
    var s = Math.min(PW / w, PH / h), dw = w * s, dh = h * s, dx = (PW - dw) / 2, dy = (PH - dh) / 2;
    push(enc("%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n"));
    obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
    obj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
    obj(3, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + PW + " " + PH + "] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>");
    off[4] = len;
    push(enc("4 0 obj\n<< /Type /XObject /Subtype /Image /Width " + w + " /Height " + h + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + jpeg.length + " >>\nstream\n"));
    push(jpeg);
    push(enc("\nendstream\nendobj\n"));
    var content = "q " + dw.toFixed(2) + " 0 0 " + dh.toFixed(2) + " " + dx.toFixed(2) + " " + dy.toFixed(2) + " cm /Im0 Do Q";
    obj(5, "<< /Length " + content.length + " >>\nstream\n" + content + "\nendstream");
    obj(6, "<< /Producer (ShubhBiodata) /Title (Marriage Biodata) >>");
    var xref = len, x = "xref\n0 7\n0000000000 65535 f \n";
    for (var i = 1; i <= 6; i++) x += ("0000000000" + off[i]).slice(-10) + " 00000 n \n";
    x += "trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n" + xref + "\n%%EOF\n";
    push(enc(x));
    return new Blob(parts, { type: "application/pdf" });
  }
  window.SB_PDF = { fromJpeg: fromJpeg };
})();
