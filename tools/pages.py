# Content for every page. Edit text here, then run:  python3 tools/build.py
# Each page: slug ("" = home), lang preselected, title, description, h1, intro, sections [(h2, [paragraphs or ("ul",[...])])], faq [(q, a)]

SITE = "https://sauravsah.github.io/shubhbiodata/"

PAGES = [
  dict(
    slug="", lang="en",
    title="ShubhBiodata – Free Marriage Biodata Maker in 14 Languages (Hindi, Bengali, Marathi, Tamil, Telugu…) with Video Reel",
    desc="Make a beautiful marriage biodata in 2 minutes. Free, no signup, no watermark. Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Urdu, Kannada, Odia, Malayalam, Punjabi, Maithili and Bhojpuri. 7 designs, PDF/JPG, a 15-second video Reel and WhatsApp sharing.",
    h1="Free Marriage Biodata Maker",
    intro="Beautiful marriage biodata in your language, free, in 2 minutes. Type your details, pick one of 7 designs, and download a print-ready A4 PDF, a JPG, or a 15-second video Reel for WhatsApp Status. Nothing is uploaded: your details stay on your phone.",
    sections=[
      ("How to make a marriage biodata", [("ol", [
        "Choose the biodata language: English or one of 13 Indian languages, from Hindi, Bengali and Marathi to Tamil, Telugu and Urdu.",
        "Pick one of 7 designs (including the new Pastel Bloom and Rose Gold Card) and the top blessing (Shri Ganesh, Om, Ik Onkar, Bismillah, regional blessings or none).",
        "Fill only the details you want, tap a few Vibe chips, and let “Write for me” draft your About me. Empty fields are hidden automatically.",
        "Add a photo and crop it to fit.",
        "Tap Download PDF, Download JPG, Print, Share on WhatsApp, or Make a Reel."])]),
      ("Why families use ShubhBiodata", [("ul", [
        "Free download with no watermark across the page, only a tiny credit line.",
        "Correct Indian scripts in the PDF: क्ष, ক্ষ, க்ஷ, ಕ್ಷ, ക്ഷ and Urdu Nastaliq look exactly like the preview.",
        "Works on any Android phone, no app or signup needed.",
        "Private: no account, no server, data saved only in your browser."])]),
    ],
    faq=[
      ("Is ShubhBiodata really free?", "Yes. You can download your biodata as PDF or JPG and print it for free. There is no signup."),
      ("Is my data safe?", "Your details and photo never leave your device. They are saved only in your own browser so you can come back and edit. Use “Clear all” to delete them."),
      ("Which languages are supported?", "Biodata headings and labels are available in 14 languages: English, Hindi (हिन्दी), Bengali (বাংলা), Marathi (मराठी), Telugu (తెలుగు), Tamil (தமிழ்), Gujarati (ગુજરાતી), Urdu (اردو), Kannada (ಕನ್ನಡ), Odia (ଓଡ଼ିଆ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), Maithili (मैथिली) and Bhojpuri (भोजपुरी). You can type the details in any language."),
      ("Can I add my own fields?", "Yes. Use “Extra fields” to add rows like Blood group, Kul devta or Hobbies."),
      ("What is the Biodata Reel?", "A 15-second vertical video made from your biodata, with your photo, details and soft music, ready for WhatsApp Status. It is created inside your browser; nothing is uploaded."),
      ("Can it write my About me?", "Yes. Tap “Write for me” beside About me or Expectations, choose a tone (Simple, Family-first, Fun or Professional) and edit the text as you like. It uses ready-made sentence templates, not AI."),
    ]),
  dict(
    slug="maithili-marriage-biodata", lang="mai",
    title="Maithili Marriage Biodata Format – Free Maithili Biodata Maker (मैथिली विवाह बायोडाटा)",
    desc="Make a Maithili marriage biodata (विवाह परिचय-पत्र) free. Mithila-style labels in Devanagari: पिताक नाम, माताक नाम, मूल गाम, गोत्र. No signup. PDF, JPG, WhatsApp.",
    h1="Maithili Marriage Biodata Maker (मैथिली विवाह बायोडाटा)",
    intro="A free biodata maker with headings in Maithili: पिताक नाम, माताक नाम, मूल गाम, परिवारक विवरण. Fill the form, pick a design and download a clean A4 PDF to share with families across Mithila and Bihar.",
    sections=[
      ("Maithili biodata format", [("ul", [
        "व्यक्तिगत विवरण: नाम, जन्म तिथि, जन्म समय, जन्म स्थान, लम्बाई, गोत्र, मूल, राशि, नक्षत्र",
        "शिक्षा आ व्यवसाय: शिक्षा, व्यवसाय, कार्यस्थल, वार्षिक आय",
        "परिवारक विवरण: पिताक नाम, माताक नाम, भाइ, बहिन, मूल गाम",
        "सम्पर्क विवरण: सम्पर्क व्यक्ति, मोबाइल नम्बर"])]),
      ("Add Mithila-specific details", ["Use “Extra fields” for rows like मूल (Mool), पंजी, or कुलदेवता. They print in the same style as the rest of the biodata."]),
    ],
    faq=[
      ("Maithili biodata kona banabi? (मैथिली बायोडाटा कोना बनाबी?)", "Form bharu, design chunu aa PDF download karu. फॉर्म भरू, डिजाइन चुनू आ PDF डाउनलोड करू।"),
      ("Is it free?", "Yes. Free download, no signup, no OTP."),
      ("Can I write details in English and headings in Maithili?", "Yes. The headings follow the language you pick; you can type the details in any language."),
    ]),
  dict(
    slug="bhojpuri-marriage-biodata", lang="bho",
    title="Bhojpuri Marriage Biodata Format – Shadi Biodata in Bhojpuri (भोजपुरी बियाह बायोडाटा) Free",
    desc="Free Bhojpuri marriage biodata maker with Bhojpuri headings (बाबूजी के नाँव, माई के नाँव, पुश्तैनी गाँव). Make a shadi biodata in 2 minutes, download PDF/JPG or share on WhatsApp.",
    h1="Bhojpuri Marriage Biodata Maker (भोजपुरी बियाह बायोडाटा)",
    intro="Make a shadi / biyah biodata with headings in Bhojpuri: बाबूजी के नाँव, माई के नाँव, पुश्तैनी गाँव, परिवार के जानकारी. Prefer Hindi? Switch the biodata language to Hindi in one tap.",
    sections=[
      ("Bhojpuri biodata format", [("ul", [
        "निजी जानकारी: नाँव, जनम तारीख, जनम के समय, जनम स्थान, लंबाई, जाति, गोत्र",
        "पढ़ाई आ काम-धंधा: पढ़ाई, काम-धंधा, काम के जगह, सालाना कमाई",
        "परिवार के जानकारी: बाबूजी के नाँव, माई के नाँव, भाई, बहिन, पुश्तैनी गाँव",
        "संपर्क: संपर्क करे वाला, मोबाइल नंबर, पता"])]),
      ("For families in Bihar, UP and Jharkhand", ["Many Bhojpuri families share a Hindi biodata. ShubhBiodata gives you both: pick Bhojpuri or Hindi labels, and the same details switch instantly."]),
    ],
    faq=[
      ("Bhojpuri biodata kaise banaayi? (भोजपुरी बायोडाटा कइसे बनाईं?)", "Form bhari, design chuni aa PDF download kari. फॉर्म भरीं, डिजाइन चुनीं आ PDF डाउनलोड करीं।"),
      ("Is it free?", "Yes, it is free with no signup."),
      ("Can I share it on WhatsApp?", "Yes. Tap “Share on WhatsApp”. On most Android phones the image goes straight into the chat."),
    ]),
  dict(
    slug="hindi-marriage-biodata", lang="hi",
    title="Hindi Marriage Biodata Format – शादी का बायोडाटा हिंदी में (Free PDF Maker)",
    desc="Free Hindi marriage biodata maker: विवाह बायोडाटा हिंदी में बनाएँ. Proper Hindi headings, 7 designs, photo, Shri Ganesh header. Download PDF/JPG, print or share on WhatsApp.",
    h1="Hindi Marriage Biodata Maker (विवाह बायोडाटा हिंदी में)",
    intro="शादी का बायोडाटा हिंदी में 2 मिनट में बनाएँ। Fill the form in Hindi or English, the headings print in Hindi (जन्म तिथि, पिता का नाम, पारिवारिक विवरण), and download a print-ready PDF for free.",
    sections=[
      ("Hindi biodata format (बायोडाटा फॉर्मेट)", [("ul", [
        "व्यक्तिगत विवरण: नाम, जन्म तिथि, जन्म समय, जन्म स्थान, कद, रंग, धर्म, जाति, गोत्र, राशि, नक्षत्र, मांगलिक",
        "शिक्षा एवं व्यवसाय: शिक्षा, व्यवसाय, कार्यस्थल, वार्षिक आय",
        "पारिवारिक विवरण: पिता का नाम, माता का नाम, भाई, बहन, मूल निवास",
        "संपर्क विवरण: संपर्क व्यक्ति, मोबाइल नंबर, पता"])]),
      ("Hindi typing tip", ["Android: open Gboard settings → Languages → add Hindi (हिन्दी). Then type in English letters and Gboard converts them, e.g. “pita” → पिता."]),
    ],
    faq=[
      ("Hindi me biodata kaise banaye? (हिंदी में बायोडाटा कैसे बनाएँ?)", "Biodata language mein Hindi chunein, form bharein aur PDF download karein. बायोडाटा भाषा में हिन्दी चुनें, फ़ॉर्म भरें और PDF डाउनलोड करें।"),
      ("Kya yeh free hai? (क्या यह मुफ़्त है?)", "Haan, bilkul free hai, koi signup nahi. हाँ, बिल्कुल मुफ़्त।"),
      ("Shri Ganesh header kaise lagaye?", "“Top blessing” mein Shri Ganesh, Om ya None chunein."),
    ]),
  dict(
    slug="marriage-biodata-format", lang="en",
    title="Marriage Biodata Format 2026 – Free Editable Format, PDF Download",
    desc="The standard marriage biodata format with all sections explained: personal, horoscope, education, family, contact and expectations. Fill it online free and download PDF or JPG.",
    h1="Marriage Biodata Format (Free, Editable)",
    intro="A good marriage biodata fits on one A4 page and covers six things: personal details, horoscope details (optional), education and career, family, contact, and a few lines about you. Fill the format below and it lays itself out for you.",
    sections=[
      ("Standard marriage biodata format", [("ol", [
        "Personal: name, date / time / place of birth, height, complexion, religion, caste, gotra.",
        "Horoscope (optional): rashi, nakshatra, manglik.",
        "Education & career: highest degree, occupation, organisation, annual income.",
        "Family: father's and mother's name and occupation, brothers, sisters, native place.",
        "Contact: contact person, mobile, email, address.",
        "About me and expectations: 2–3 lines each."])]),
      ("Tips", [("ul", [
        "Use a clear, recent photo with a plain background.",
        "Keep it to one page; ShubhBiodata auto-sizes the text to fit.",
        "Leave out anything you are not comfortable sharing; empty fields are hidden."])]),
    ],
    faq=[
      ("What is the best marriage biodata format?", "One A4 page with personal, family, education/career and contact details, plus a photo. Horoscope details are optional."),
      ("Can I download the format as PDF?", "Yes. Fill it online and tap Download PDF. It is free."),
      ("Biodata format for boy and girl — is it different?", "The sections are the same. Just fill in what applies; empty fields are hidden."),
    ]),
  dict(
    slug="biodata-for-marriage", lang="en",
    title="Biodata for Marriage – Make Free Marriage Biodata Online (PDF/JPG)",
    desc="Make a biodata for marriage online free: 7 designs, photo, 14 languages incl. Hindi, Bengali, Marathi, Tamil, Telugu, Urdu. No signup. Download PDF/JPG, print, or share on WhatsApp in 2 minutes.",
    h1="Biodata for Marriage – Make It Free in 2 Minutes",
    intro="Create a neat biodata for marriage on your phone. Choose a design, fill your details, and download a print-ready PDF or a JPG for WhatsApp. No app, no signup, and your details stay on your device.",
    sections=[
      ("What makes a good biodata for marriage", [("ul", [
        "Clear name and photo at the top.",
        "Accurate birth details if the families will match horoscopes.",
        "Honest education, job and family details.",
        "A short, warm “About me” line."])]),
      ("Make it in your language", ["Headings are available in English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Urdu, Kannada, Odia, Malayalam, Punjabi, Maithili and Bhojpuri, so the biodata reads naturally for both families."]),
    ],
    faq=[
      ("How do I make a biodata for marriage on my phone?", "Open this page, fill the form, choose a design, then tap Download PDF or Share on WhatsApp."),
      ("Do I need to sign up?", "No. There is no account and no OTP."),
      ("Can I edit it later?", "Yes. Your details are saved in your browser on this device. Come back any time and edit."),
    ]),
]


# ---------------------------------------------------------------------------
# Landing pages for the other Indian languages. The biodata headings shown in the
# "format" list are read from assets/js/i18n.js (LX block), so they always match the maker.
import json as _json, os as _os, re as _re
_I18N = open(_os.path.join(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__))), "assets", "js", "i18n.js"), encoding="utf-8").read()
LX = _json.loads(_re.search(r"var LX = (\{.*?\});\s*/\*LX-JSON-END", _I18N, _re.S).group(1))
LMETA = _json.loads(_re.search(r"var LMETA = (\{.*?\});\s*/\*LMETA-JSON-END", _I18N, _re.S).group(1))

FONT_FILE = {"beng": "noto-sans-bengali-bengali-400-normal.woff2", "gujr": "noto-sans-gujarati-gujarati-400-normal.woff2",
             "guru": "noto-sans-gurmukhi-gurmukhi-400-normal.woff2", "orya": "noto-sans-oriya-oriya-400-normal.woff2",
             "taml": "noto-sans-tamil-tamil-400-normal.woff2", "telu": "noto-sans-telugu-telugu-400-normal.woff2",
             "knda": "noto-sans-kannada-kannada-400-normal.woff2", "mlym": "noto-sans-malayalam-malayalam-400-normal.woff2",
             "arab": "noto-naskh-arabic-arabic-400-normal.woff2"}

def _fmt(lang):
    L = LX[lang]; sep = "، " if lang == "ur" else ", "
    def row(sec, keys): return L[sec] + ": " + sep.join(L[k] for k in keys)
    return [("ul", [
        row("personal", ["fullName", "dob", "birthTime", "birthPlace", "height", "religion", "caste", "gotra", "rashi", "nakshatra"]),
        row("career", ["education", "occupation", "company", "income"]),
        row("family", ["father", "mother", "brothers", "sisters", "native"]),
        row("contact", ["contactPerson", "phone", "address"])])]

# slug, code, local words for the h1/title, extra tips section, FAQ in the language
_X = [
  ("bengali-marriage-biodata", "bn", "বিয়ের বায়োডাটা (Biyer Biodata)",
   "Make your biyer biodata in Bengali with proper headings like পিতার নাম, মাতার নাম, গোত্র, রাশি and আদি নিবাস. Add the classic ॥ প্রজাপতয়ে নমঃ ॥ or ॥ শ্রী গণেশায় নমঃ ॥ at the top and download a print-ready PDF for free.",
   ("Bengali touches", ["Pick “Prajapataye Namah” as the top blessing for the traditional Bengali wedding header.", "Add rows like গণ (Deb / Manushya / Rakshas), বংশ or কুলদেবতা from “Extra fields”.", "Tick “Native digits” to print numbers as ০১২৩."]),
   [("বাংলায় বায়োডাটা কীভাবে বানাবেন? (Bengali biodata kivabe banabo?)", "Biodata language-এ বাংলা বেছে নিন, ফর্ম পূরণ করুন, ডিজাইন বেছে PDF ডাউনলোড করুন। Choose Bengali, fill the form, download the PDF.")]),
  ("marathi-marriage-biodata", "mr", "लग्नाचा बायोडाटा (Lagnacha Biodata)",
   "Make your lagnacha biodata in Marathi with headings like वडिलांचे नाव, आईचे नाव, रास, नक्षत्र, मंगळ and मूळ गाव. Keep ॥ श्री गणेशाय नमः ॥ at the top and download a clean A4 PDF free.",
   ("Marathi touches", ["Add कुलदैवत, देवक, नाडी or गण from “Extra fields”.", "Tick “Native digits” to print numbers as १२३."]),
   [("मराठीत बायोडाटा कसा बनवायचा? (Marathi biodata kasa banvaycha?)", "भाषा म्हणून मराठी निवडा, माहिती भरा आणि PDF डाउनलोड करा. Choose Marathi, fill the form and download the PDF.")]),
  ("telugu-marriage-biodata", "te", "పెళ్లి బయోడేటా (Pelli Biodata)",
   "Make your pelli biodata in Telugu with headings like తండ్రి పేరు, గోత్రం, నక్షత్రం, కుజ దోషం and స్వస్థలం. Start with శ్రీరస్తు · శుభమస్తు · అవిఘ్నమస్తు or ॥ శ్రీ గణేశాయ నమః ॥, and download a free PDF.",
   ("Telugu touches", ["Choose “Srirastu Subhamastu” as the top blessing for a traditional Telugu header.", "The Manglik row prints as కుజ దోషం.", "Add ఇంటి పేరు (house name) or కులదైవం from “Extra fields”."]),
   [("తెలుగులో బయోడేటా ఎలా తయారు చేయాలి? (Telugu biodata ela cheyali?)", "భాషగా తెలుగు ఎంచుకోండి, వివరాలు నింపి PDF డౌన్‌లోడ్ చేయండి. Choose Telugu, fill the form and download.")]),
  ("tamil-marriage-biodata", "ta", "திருமண பயோடேட்டா (Thirumana Biodata)",
   "Make your thirumana biodata in Tamil with headings like தந்தை பெயர், கோத்திரம், ராசி, நட்சத்திரம், செவ்வாய் தோஷம் and சொந்த ஊர். Start with the Pillaiyar Suzhi “உ” or ஸ்ரீ விநாயகர் துணை and download a free PDF.",
   ("Tamil touches", ["Pick “Pillaiyar Suzhi (உ)” or “Shri Ganesh” (prints as ஸ்ரீ விநாயகர் துணை) as the top blessing.", "The Manglik row prints as செவ்வாய் தோஷம் (உண்டு / இல்லை).", "Add குலதெய்வம், லக்னம் or பாதம் from “Extra fields”."]),
   [("தமிழில் பயோடேட்டா எப்படி உருவாக்குவது? (Tamil biodata eppadi?)", "மொழியாக தமிழைத் தேர்ந்தெடுத்து, விவரங்களை நிரப்பி PDF பதிவிறக்கவும். Choose Tamil, fill the form and download.")]),
  ("gujarati-marriage-biodata", "gu", "લગ્ન બાયોડેટા (Lagna Biodata)",
   "Make your lagna biodata in Gujarati with headings like પિતાનું નામ, માતાનું નામ, જ્ઞાતિ, ગોત્ર, રાશિ and મૂળ વતન. Keep ॥ શ્રી ગણેશાય નમઃ ॥ at the top and download a free PDF.",
   ("Gujarati touches", ["Add કુળદેવી, અટક or મોસાળ from “Extra fields”.", "Tick “Native digits” to print numbers as ૧૨૩."]),
   [("ગુજરાતીમાં બાયોડેટા કેવી રીતે બનાવવો? (Gujarati biodata kevi rite banavvo?)", "ભાષા તરીકે ગુજરાતી પસંદ કરો, વિગતો ભરો અને PDF ડાઉનલોડ કરો. Choose Gujarati, fill the form and download.")]),
  ("urdu-marriage-biodata", "ur", "شادی کا بائیو ڈیٹا (Rishta Biodata)",
   "Make a rishta / shadi biodata in Urdu with a proper right-to-left layout: labels on the right, photo on the left, Nastaliq headings, and rows like والد کا نام، والدہ کا نام، مسلک and آبائی وطن. Start with Bismillah or 786 and download a free PDF.",
   ("Urdu touches", ["The whole biodata flips right-to-left, and English text like phone numbers and emails still reads correctly.", "Choose “Bismillah” or “786” as the top blessing.", "The Gotra row becomes مسلک (Maslak) and Caste becomes ذات / برادری.", "Tick “Native digits” to print numbers as ۱۲۳."]),
   [("اردو میں بائیو ڈیٹا کیسے بنائیں؟ (Urdu biodata kaise banayein?)", "زبان میں اردو منتخب کریں، تفصیل بھریں اور PDF ڈاؤن لوڈ کریں۔ Choose Urdu, fill the form and download.")]),
  ("kannada-marriage-biodata", "kn", "ಮದುವೆ ಬಯೋಡೇಟಾ (Maduve Biodata)",
   "Make your maduve biodata in Kannada with headings like ತಂದೆಯ ಹೆಸರು, ಗೋತ್ರ, ರಾಶಿ, ನಕ್ಷತ್ರ, ಕುಜ ದೋಷ and ಸ್ವಂತ ಊರು. Keep ॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥ at the top and download a free PDF.",
   ("Kannada touches", ["The Manglik row prints as ಕುಜ ದೋಷ.", "Add ಮನೆ ದೇವರು or ಗಣ from “Extra fields”.", "Tick “Native digits” to print numbers as ೧೨೩."]),
   [("ಕನ್ನಡದಲ್ಲಿ ಬಯೋಡೇಟಾ ಹೇಗೆ ಮಾಡುವುದು? (Kannada biodata hege?)", "ಭಾಷೆಯಾಗಿ ಕನ್ನಡ ಆಯ್ಕೆ ಮಾಡಿ, ವಿವರ ತುಂಬಿ PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ. Choose Kannada, fill the form and download.")]),
  ("odia-marriage-biodata", "or", "ବାହାଘର ବାୟୋଡାଟା (Bahaghara Biodata)",
   "Make your bahaghara biodata in Odia with headings like ପିତାଙ୍କ ନାମ, ମାତାଙ୍କ ନାମ, ଗୋତ୍ର, ରାଶି and ମୂଳ ନିବାସ. Start with ॥ ଜୟ ଜଗନ୍ନାଥ ॥ or ॥ ଶ୍ରୀ ଗଣେଶାୟ ନମଃ ॥ and download a free PDF.",
   ("Odia touches", ["Choose “Jai Jagannath” as the top blessing.", "Add ଇଷ୍ଟଦେବତା or ଗଣ from “Extra fields”.", "Tick “Native digits” to print numbers as ୧୨୩."]),
   [("ଓଡ଼ିଆରେ ବାୟୋଡାଟା କିପରି ତିଆରି କରିବେ? (Odia biodata kipari?)", "ଭାଷା ଭାବେ ଓଡ଼ିଆ ବାଛନ୍ତୁ, ବିବରଣୀ ଭରନ୍ତୁ ଓ PDF ଡାଉନଲୋଡ କରନ୍ତୁ। Choose Odia, fill the form and download.")]),
  ("malayalam-marriage-biodata", "ml", "കല്യാണ ബയോഡാറ്റ (Kalyana Biodata)",
   "Make your kalyana biodata in Malayalam with headings like അച്ഛന്റെ പേര്, അമ്മയുടെ പേര്, നക്ഷത്രം, ചൊവ്വാദോഷം and സ്വദേശം. Download a print-ready PDF free, or share the image on WhatsApp.",
   ("Malayalam touches", ["The Manglik row prints as ചൊവ്വാദോഷം (ഉണ്ട് / ഇല്ല).", "Add ജാതകം details, തറവാട് or ഇല്ലം from “Extra fields”."]),
   [("മലയാളത്തിൽ ബയോഡാറ്റ എങ്ങനെ ഉണ്ടാക്കാം? (Malayalam biodata engane?)", "ഭാഷയായി മലയാളം തിരഞ്ഞെടുത്ത്, വിവരങ്ങൾ നൽകി PDF ഡൗൺലോഡ് ചെയ്യുക. Choose Malayalam, fill the form and download.")]),
  ("punjabi-marriage-biodata", "pa", "ਵਿਆਹ ਬਾਇਓਡਾਟਾ (Viah Biodata)",
   "Make your viah / rishta biodata in Punjabi (Gurmukhi) with headings like ਪਿਤਾ ਦਾ ਨਾਮ, ਮਾਤਾ ਦਾ ਨਾਮ, ਗੋਤ and ਜੱਦੀ ਪਿੰਡ. Start with ੴ, ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ or ਵਾਹਿਗੁਰੂ, or Shri Ganesh, and download a free PDF.",
   ("Punjabi touches", ["Choose “Ik Onkar”, “Ik Onkar Satgur Prasad” or “Waheguru” as the top blessing.", "The Gotra row prints as ਗੋਤ.", "Tick “Native digits” to print numbers as ੧੨੩."]),
   [("ਪੰਜਾਬੀ ਵਿੱਚ ਬਾਇਓਡਾਟਾ ਕਿਵੇਂ ਬਣਾਈਏ? (Punjabi biodata kive banaiye?)", "ਭਾਸ਼ਾ ਵਿੱਚ ਪੰਜਾਬੀ ਚੁਣੋ, ਵੇਰਵੇ ਭਰੋ ਅਤੇ PDF ਡਾਊਨਲੋਡ ਕਰੋ। Choose Punjabi, fill the form and download.")]),
]

for _slug, _lang, _local, _intro, _tips, _faq in _X:
    _m = LMETA[_lang]
    PAGES.append(dict(
        slug=_slug, lang=_lang, script=_m["script"], font=FONT_FILE.get(_m["script"]),
        title=f"{_m['en']} Marriage Biodata Format – {_local} Free Maker",
        desc=f"Free {_m['en']} marriage biodata maker with proper {_m['native']} headings ({LX[_lang]['title']}). 7 designs, photo, PDF/JPG download, video Reel, WhatsApp share. No signup, nothing uploaded.",
        h1=f"{_m['en']} Marriage Biodata Maker ({LX[_lang]['title']})",
        intro=_intro,
        sections=[(f"{_m['en']} biodata format ({LX[_lang]['title']})", _fmt(_lang)), (_tips[0], [("ul", _tips[1])])],
        faq=_faq + [("Is it free?", "Yes. Download the PDF or JPG free, with no signup and no OTP. Your details never leave your phone."),
                    (f"Can I type the details in English and keep {_m['en']} headings?", f"Yes. Headings follow the biodata language you pick ({_m['native']}); type the details in any language or script.")]))
