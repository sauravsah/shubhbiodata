/*
 * ShubhBiodata settings. This is the ONLY file you need to change.
 * See README.md ("Turning on payments") before editing.
 */
window.SHUBH_CONFIG = {
  // false = every download is free and carries a tiny "Made with ShubhBiodata" line.
  // true  = downloads ask for a one-time payment first (see PAYMENT_LINK).
  PAYMENT_ENABLED: false,

  // Price shown on the pay screen (number, in CURRENCY).
  PRICE: 29,
  CURRENCY: "INR",

  // Paste a Razorpay Payment Page / Payment Button link or a UPI pay link here, e.g.
  // "https://rzp.io/l/shubhbiodata"  or  "upi://pay?pa=yourname@okaxis&pn=ShubhBiodata&am=29&cu=INR"
  PAYMENT_LINK: "",

  // When true and the user has paid, the "Made with ShubhBiodata" line is removed.
  REMOVE_FOOTER_WHEN_PAID: true,

  SITE_NAME: "ShubhBiodata",
  SITE_URL: "https://sauravsah.github.io/shubhbiodata/",
  CONTACT_EMAIL: "sauravsahbrj@gmail.com"
};
