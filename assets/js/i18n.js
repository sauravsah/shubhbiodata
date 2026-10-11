/* ShubhBiodata — labels for the biodata (14 languages) and the app UI (English / Hindi).
   The first 4 languages use the L arrays below; the others live in the JSON blocks LX / LMETA / SAMPLES_X
   (keep those blocks valid JSON: tools/build.py reads them to write the landing pages). */
(function () {
  // Order of each array: en, hi, mai, bho
  var L = {
    title: ["Marriage Biodata", "विवाह बायोडाटा", "विवाह परिचय-पत्र", "बियाह बायोडाटा"],
    personal: ["Personal Details", "व्यक्तिगत विवरण", "व्यक्तिगत विवरण", "निजी जानकारी"],
    career: ["Education & Career", "शिक्षा एवं व्यवसाय", "शिक्षा आ व्यवसाय", "पढ़ाई आ काम-धंधा"],
    family: ["Family Details", "पारिवारिक विवरण", "परिवारक विवरण", "परिवार के जानकारी"],
    contact: ["Contact Details", "संपर्क विवरण", "सम्पर्क विवरण", "संपर्क"],
    about: ["About Me", "मेरे बारे में", "हमरा बारेमे", "हमरा बारे में"],
    expect: ["Expectations", "अपेक्षाएँ", "अपेक्षा", "उम्मीद"],
    other: ["Other Details", "अन्य विवरण", "आन विवरण", "अउरी जानकारी"],

    fullName: ["Name", "नाम", "नाम", "नाँव"],
    dob: ["Date of Birth", "जन्म तिथि", "जन्म तिथि", "जनम तारीख"],
    birthTime: ["Time of Birth", "जन्म समय", "जन्म समय", "जनम के समय"],
    birthPlace: ["Place of Birth", "जन्म स्थान", "जन्म स्थान", "जनम स्थान"],
    height: ["Height", "कद", "लम्बाई", "लंबाई"],
    complexion: ["Complexion", "रंग", "रंग", "रंग"],
    religion: ["Religion", "धर्म", "धर्म", "धरम"],
    caste: ["Caste", "जाति", "जाति", "जाति"],
    gotra: ["Gotra", "गोत्र", "गोत्र", "गोत्र"],
    rashi: ["Rashi", "राशि", "राशि", "राशि"],
    nakshatra: ["Nakshatra", "नक्षत्र", "नक्षत्र", "नक्षत्र"],
    manglik: ["Manglik", "मांगलिक", "मांगलिक", "मांगलिक"],

    education: ["Education", "शिक्षा", "शिक्षा", "पढ़ाई"],
    occupation: ["Occupation", "व्यवसाय", "व्यवसाय", "काम-धंधा"],
    company: ["Organisation", "कार्यस्थल", "कार्यस्थल", "काम के जगह"],
    income: ["Annual Income", "वार्षिक आय", "वार्षिक आय", "सालाना कमाई"],

    father: ["Father's Name", "पिता का नाम", "पिताक नाम", "बाबूजी के नाँव"],
    fatherOcc: ["Father's Occupation", "पिता का व्यवसाय", "पिताक व्यवसाय", "बाबूजी के काम"],
    mother: ["Mother's Name", "माता का नाम", "माताक नाम", "माई के नाँव"],
    motherOcc: ["Mother's Occupation", "माता का व्यवसाय", "माताक व्यवसाय", "माई के काम"],
    brothers: ["Brothers", "भाई", "भाइ", "भाई"],
    sisters: ["Sisters", "बहन", "बहिन", "बहिन"],
    native: ["Native Place", "मूल निवास", "मूल गाम", "पुश्तैनी गाँव"],

    contactPerson: ["Contact Person", "संपर्क व्यक्ति", "सम्पर्क व्यक्ति", "संपर्क करे वाला"],
    phone: ["Mobile", "मोबाइल नंबर", "मोबाइल नम्बर", "मोबाइल नंबर"],
    email: ["Email", "ईमेल", "ईमेल", "ईमेल"],
    address: ["Address", "पता", "पता", "पता"],
    aboutText: ["About Me", "मेरे बारे में", "हमरा बारेमे", "हमरा बारे में"],
    expectations: ["Expectations", "अपेक्षाएँ", "अपेक्षा", "उम्मीद"],

    yes: ["Yes", "हाँ", "हँ", "हँ"],
    no: ["No", "नहीं", "नहि", "ना"],
    partial: ["Partial (Anshik)", "आंशिक", "आंशिक", "आंशिक"],
    blood: ["Blood Group", "ब्लड ग्रुप", "ब्लड ग्रुप", "ब्लड ग्रुप"],
    ganesh: ["|| Shri Ganeshaya Namah ||", "॥ श्री गणेशाय नमः ॥", "॥ श्री गणेशाय नमः ॥", "॥ श्री गणेशाय नमः ॥"]
  };
  var BASE4 = ["en", "hi", "mai", "bho"];

  // ---- Other Indian languages: labels (all keys required), script meta, sample data ----
  /*LX-JSON-START*/
  var LX = {
  "mr": {"title":"विवाह बायोडाटा","personal":"वैयक्तिक माहिती","career":"शिक्षण व व्यवसाय","family":"कौटुंबिक माहिती","contact":"संपर्क माहिती","about":"माझ्याबद्दल","expect":"अपेक्षा","other":"इतर माहिती","fullName":"नाव","dob":"जन्म तारीख","birthTime":"जन्म वेळ","birthPlace":"जन्म ठिकाण","height":"उंची","complexion":"वर्ण","religion":"धर्म","caste":"जात","gotra":"गोत्र","rashi":"रास","nakshatra":"नक्षत्र","manglik":"मंगळ","education":"शिक्षण","occupation":"नोकरी / व्यवसाय","company":"कार्यस्थळ","income":"वार्षिक उत्पन्न","father":"वडिलांचे नाव","fatherOcc":"वडिलांचा व्यवसाय","mother":"आईचे नाव","motherOcc":"आईचा व्यवसाय","brothers":"भाऊ","sisters":"बहीण","native":"मूळ गाव","contactPerson":"संपर्क व्यक्ती","phone":"मोबाईल नंबर","email":"ई-मेल","address":"पत्ता","aboutText":"माझ्याबद्दल","expectations":"अपेक्षा","yes":"होय","no":"नाही","partial":"आंशिक","ganesh":"॥ श्री गणेशाय नमः ॥","blood":"रक्तगट"},
  "bn": {"title":"বিবাহ বায়োডাটা","personal":"ব্যক্তিগত তথ্য","career":"শিক্ষা ও পেশা","family":"পারিবারিক তথ্য","contact":"যোগাযোগ","about":"আমার সম্পর্কে","expect":"প্রত্যাশা","other":"অন্যান্য তথ্য","fullName":"নাম","dob":"জন্ম তারিখ","birthTime":"জন্ম সময়","birthPlace":"জন্মস্থান","height":"উচ্চতা","complexion":"গায়ের রং","religion":"ধর্ম","caste":"জাতি","gotra":"গোত্র","rashi":"রাশি","nakshatra":"নক্ষত্র","manglik":"মাঙ্গলিক","education":"শিক্ষাগত যোগ্যতা","occupation":"পেশা","company":"কর্মস্থল","income":"বার্ষিক আয়","father":"পিতার নাম","fatherOcc":"পিতার পেশা","mother":"মাতার নাম","motherOcc":"মাতার পেশা","brothers":"ভাই","sisters":"বোন","native":"আদি নিবাস","contactPerson":"যোগাযোগের ব্যক্তি","phone":"মোবাইল নম্বর","email":"ইমেল","address":"ঠিকানা","aboutText":"আমার সম্পর্কে","expectations":"প্রত্যাশা","yes":"হ্যাঁ","no":"না","partial":"আংশিক","ganesh":"॥ শ্রী গণেশায় নমঃ ॥","blood":"রক্তের গ্রুপ"},
  "te": {"title":"వివాహ బయోడేటా","personal":"వ్యక్తిగత వివరాలు","career":"విద్య మరియు ఉద్యోగం","family":"కుటుంబ వివరాలు","contact":"సంప్రదింపు వివరాలు","about":"నా గురించి","expect":"భాగస్వామి నుండి ఆశించేవి","other":"ఇతర వివరాలు","fullName":"పేరు","dob":"పుట్టిన తేదీ","birthTime":"పుట్టిన సమయం","birthPlace":"పుట్టిన ప్రదేశం","height":"ఎత్తు","complexion":"రంగు","religion":"మతం","caste":"కులం","gotra":"గోత్రం","rashi":"రాశి","nakshatra":"నక్షత్రం","manglik":"కుజ దోషం","education":"విద్యార్హత","occupation":"ఉద్యోగం / వృత్తి","company":"పని ప్రదేశం","income":"వార్షిక ఆదాయం","father":"తండ్రి పేరు","fatherOcc":"తండ్రి వృత్తి","mother":"తల్లి పేరు","motherOcc":"తల్లి వృత్తి","brothers":"సోదరులు","sisters":"సోదరీమణులు","native":"స్వస్థలం","contactPerson":"సంప్రదించవలసినవారు","phone":"మొబైల్ నంబర్","email":"ఈమెయిల్","address":"చిరునామా","aboutText":"నా గురించి","expectations":"భాగస్వామి నుండి ఆశించేవి","yes":"ఉంది","no":"లేదు","partial":"పాక్షికం","ganesh":"॥ శ్రీ గణేశాయ నమః ॥","blood":"రక్త వర్గం"},
  "ta": {"title":"திருமண சுயவிவரம்","personal":"தனிப்பட்ட விவரங்கள்","career":"கல்வி மற்றும் பணி","family":"குடும்ப விவரங்கள்","contact":"தொடர்பு விவரங்கள்","about":"என்னைப் பற்றி","expect":"எதிர்பார்ப்புகள்","other":"பிற விவரங்கள்","fullName":"பெயர்","dob":"பிறந்த தேதி","birthTime":"பிறந்த நேரம்","birthPlace":"பிறந்த இடம்","height":"உயரம்","complexion":"நிறம்","religion":"மதம்","caste":"ஜாதி","gotra":"கோத்திரம்","rashi":"ராசி","nakshatra":"நட்சத்திரம்","manglik":"செவ்வாய் தோஷம்","education":"கல்வித் தகுதி","occupation":"பணி","company":"பணியிடம்","income":"ஆண்டு வருமானம்","father":"தந்தை பெயர்","fatherOcc":"தந்தையின் பணி","mother":"தாய் பெயர்","motherOcc":"தாயின் பணி","brothers":"சகோதரர்கள்","sisters":"சகோதரிகள்","native":"சொந்த ஊர்","contactPerson":"தொடர்புக்கு","phone":"கைபேசி எண்","email":"மின்னஞ்சல்","address":"முகவரி","aboutText":"என்னைப் பற்றி","expectations":"எதிர்பார்ப்புகள்","yes":"உண்டு","no":"இல்லை","partial":"பகுதி","ganesh":"ஸ்ரீ விநாயகர் துணை","blood":"இரத்த வகை"},
  "gu": {"title":"લગ્ન બાયોડેટા","personal":"વ્યક્તિગત માહિતી","career":"અભ્યાસ અને વ્યવસાય","family":"કૌટુંબિક માહિતી","contact":"સંપર્ક માહિતી","about":"મારા વિશે","expect":"અપેક્ષાઓ","other":"અન્ય માહિતી","fullName":"નામ","dob":"જન્મ તારીખ","birthTime":"જન્મ સમય","birthPlace":"જન્મ સ્થળ","height":"ઊંચાઈ","complexion":"વર્ણ","religion":"ધર્મ","caste":"જ્ઞાતિ","gotra":"ગોત્ર","rashi":"રાશિ","nakshatra":"નક્ષત્ર","manglik":"માંગલિક","education":"અભ્યાસ","occupation":"વ્યવસાય","company":"કાર્યસ્થળ","income":"વાર્ષિક આવક","father":"પિતાનું નામ","fatherOcc":"પિતાનો વ્યવસાય","mother":"માતાનું નામ","motherOcc":"માતાનો વ્યવસાય","brothers":"ભાઈ","sisters":"બહેન","native":"મૂળ વતન","contactPerson":"સંપર્ક વ્યક્તિ","phone":"મોબાઇલ નંબર","email":"ઈમેલ","address":"સરનામું","aboutText":"મારા વિશે","expectations":"અપેક્ષાઓ","yes":"હા","no":"ના","partial":"આંશિક","ganesh":"॥ શ્રી ગણેશાય નમઃ ॥","blood":"બ્લડ ગ્રુપ"},
  "ur": {"title":"شادی کا بائیو ڈیٹا","personal":"ذاتی معلومات","career":"تعلیم و روزگار","family":"خاندانی معلومات","contact":"رابطہ","about":"میرے بارے میں","expect":"توقعات","other":"دیگر معلومات","fullName":"نام","dob":"تاریخِ پیدائش","birthTime":"وقتِ پیدائش","birthPlace":"جائے پیدائش","height":"قد","complexion":"رنگت","religion":"مذہب","caste":"ذات / برادری","gotra":"مسلک","rashi":"راشی","nakshatra":"نکشتر","manglik":"منگلک","education":"تعلیم","occupation":"پیشہ","company":"ادارہ","income":"سالانہ آمدنی","father":"والد کا نام","fatherOcc":"والد کا پیشہ","mother":"والدہ کا نام","motherOcc":"والدہ کا پیشہ","brothers":"بھائی","sisters":"بہن","native":"آبائی وطن","contactPerson":"رابطے کے لیے","phone":"موبائل نمبر","email":"ای میل","address":"پتہ","aboutText":"میرے بارے میں","expectations":"توقعات","yes":"ہاں","no":"نہیں","partial":"جزوی","ganesh":"॥ श्री गणेशाय नमः ॥","blood":"بلڈ گروپ"},
  "kn": {"title":"ವಿವಾಹ ಬಯೋಡೇಟಾ","personal":"ವೈಯಕ್ತಿಕ ವಿವರಗಳು","career":"ಶಿಕ್ಷಣ ಮತ್ತು ಉದ್ಯೋಗ","family":"ಕುಟುಂಬದ ವಿವರಗಳು","contact":"ಸಂಪರ್ಕ ವಿವರಗಳು","about":"ನನ್ನ ಬಗ್ಗೆ","expect":"ನಿರೀಕ್ಷೆಗಳು","other":"ಇತರ ವಿವರಗಳು","fullName":"ಹೆಸರು","dob":"ಜನ್ಮ ದಿನಾಂಕ","birthTime":"ಜನ್ಮ ಸಮಯ","birthPlace":"ಜನ್ಮ ಸ್ಥಳ","height":"ಎತ್ತರ","complexion":"ಮೈಬಣ್ಣ","religion":"ಧರ್ಮ","caste":"ಜಾತಿ","gotra":"ಗೋತ್ರ","rashi":"ರಾಶಿ","nakshatra":"ನಕ್ಷತ್ರ","manglik":"ಕುಜ ದೋಷ","education":"ವಿದ್ಯಾರ್ಹತೆ","occupation":"ಉದ್ಯೋಗ","company":"ಕೆಲಸದ ಸ್ಥಳ","income":"ವಾರ್ಷಿಕ ಆದಾಯ","father":"ತಂದೆಯ ಹೆಸರು","fatherOcc":"ತಂದೆಯ ಉದ್ಯೋಗ","mother":"ತಾಯಿಯ ಹೆಸರು","motherOcc":"ತಾಯಿಯ ಉದ್ಯೋಗ","brothers":"ಸಹೋದರರು","sisters":"ಸಹೋದರಿಯರು","native":"ಸ್ವಂತ ಊರು","contactPerson":"ಸಂಪರ್ಕ ವ್ಯಕ್ತಿ","phone":"ಮೊಬೈಲ್ ಸಂಖ್ಯೆ","email":"ಇಮೇಲ್","address":"ವಿಳಾಸ","aboutText":"ನನ್ನ ಬಗ್ಗೆ","expectations":"ನಿರೀಕ್ಷೆಗಳು","yes":"ಇದೆ","no":"ಇಲ್ಲ","partial":"ಭಾಗಶಃ","ganesh":"॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥","blood":"ರಕ್ತದ ಗುಂಪು"},
  "or": {"title":"ବିବାହ ବାୟୋଡାଟା","personal":"ବ୍ୟକ୍ତିଗତ ବିବରଣୀ","career":"ଶିକ୍ଷା ଓ ବୃତ୍ତି","family":"ପାରିବାରିକ ବିବରଣୀ","contact":"ଯୋଗାଯୋଗ","about":"ମୋ ବିଷୟରେ","expect":"ପ୍ରତ୍ୟାଶା","other":"ଅନ୍ୟାନ୍ୟ ବିବରଣୀ","fullName":"ନାମ","dob":"ଜନ୍ମ ତାରିଖ","birthTime":"ଜନ୍ମ ସମୟ","birthPlace":"ଜନ୍ମ ସ୍ଥାନ","height":"ଉଚ୍ଚତା","complexion":"ରଙ୍ଗ","religion":"ଧର୍ମ","caste":"ଜାତି","gotra":"ଗୋତ୍ର","rashi":"ରାଶି","nakshatra":"ନକ୍ଷତ୍ର","manglik":"ମାଙ୍ଗଳିକ","education":"ଶିକ୍ଷାଗତ ଯୋଗ୍ୟତା","occupation":"ବୃତ୍ତି","company":"କର୍ମସ୍ଥଳ","income":"ବାର୍ଷିକ ଆୟ","father":"ପିତାଙ୍କ ନାମ","fatherOcc":"ପିତାଙ୍କ ବୃତ୍ତି","mother":"ମାତାଙ୍କ ନାମ","motherOcc":"ମାତାଙ୍କ ବୃତ୍ତି","brothers":"ଭାଇ","sisters":"ଭଉଣୀ","native":"ମୂଳ ନିବାସ","contactPerson":"ଯୋଗାଯୋଗ ବ୍ୟକ୍ତି","phone":"ମୋବାଇଲ ନମ୍ବର","email":"ଇମେଲ","address":"ଠିକଣା","aboutText":"ମୋ ବିଷୟରେ","expectations":"ପ୍ରତ୍ୟାଶା","yes":"ହଁ","no":"ନାହିଁ","partial":"ଆଂଶିକ","ganesh":"॥ ଶ୍ରୀ ଗଣେଶାୟ ନମଃ ॥","blood":"ରକ୍ତ ଗ୍ରୁପ"},
  "ml": {"title":"വിവാഹ ബയോഡാറ്റ","personal":"വ്യക്തിഗത വിവരങ്ങൾ","career":"വിദ്യാഭ്യാസവും ജോലിയും","family":"കുടുംബ വിവരങ്ങൾ","contact":"ബന്ധപ്പെടാൻ","about":"എന്നെക്കുറിച്ച്","expect":"പ്രതീക്ഷകൾ","other":"മറ്റു വിവരങ്ങൾ","fullName":"പേര്","dob":"ജനനത്തീയതി","birthTime":"ജനന സമയം","birthPlace":"ജനന സ്ഥലം","height":"ഉയരം","complexion":"നിറം","religion":"മതം","caste":"ജാതി","gotra":"ഗോത്രം","rashi":"രാശി","nakshatra":"നക്ഷത്രം","manglik":"ചൊവ്വാദോഷം","education":"വിദ്യാഭ്യാസ യോഗ്യത","occupation":"ജോലി","company":"ജോലിസ്ഥലം","income":"വാർഷിക വരുമാനം","father":"അച്ഛന്റെ പേര്","fatherOcc":"അച്ഛന്റെ ജോലി","mother":"അമ്മയുടെ പേര്","motherOcc":"അമ്മയുടെ ജോലി","brothers":"സഹോദരന്മാർ","sisters":"സഹോദരിമാർ","native":"സ്വദേശം","contactPerson":"ബന്ധപ്പെടേണ്ട വ്യക്തി","phone":"മൊബൈൽ നമ്പർ","email":"ഇമെയിൽ","address":"വിലാസം","aboutText":"എന്നെക്കുറിച്ച്","expectations":"പ്രതീക്ഷകൾ","yes":"ഉണ്ട്","no":"ഇല്ല","partial":"ഭാഗികം","ganesh":"॥ ശ്രീ ഗണേശായ നമഃ ॥","blood":"രക്തഗ്രൂപ്പ്"},
  "pa": {"title":"ਵਿਆਹ ਬਾਇਓਡਾਟਾ","personal":"ਨਿੱਜੀ ਵੇਰਵੇ","career":"ਸਿੱਖਿਆ ਅਤੇ ਕਿੱਤਾ","family":"ਪਰਿਵਾਰਕ ਵੇਰਵੇ","contact":"ਸੰਪਰਕ","about":"ਮੇਰੇ ਬਾਰੇ","expect":"ਉਮੀਦਾਂ","other":"ਹੋਰ ਵੇਰਵੇ","fullName":"ਨਾਮ","dob":"ਜਨਮ ਮਿਤੀ","birthTime":"ਜਨਮ ਸਮਾਂ","birthPlace":"ਜਨਮ ਸਥਾਨ","height":"ਕੱਦ","complexion":"ਰੰਗ","religion":"ਧਰਮ","caste":"ਜਾਤ","gotra":"ਗੋਤ","rashi":"ਰਾਸ਼ੀ","nakshatra":"ਨਛੱਤਰ","manglik":"ਮਾਂਗਲਿਕ","education":"ਵਿੱਦਿਅਕ ਯੋਗਤਾ","occupation":"ਕਿੱਤਾ","company":"ਕੰਮ ਦੀ ਥਾਂ","income":"ਸਾਲਾਨਾ ਆਮਦਨ","father":"ਪਿਤਾ ਦਾ ਨਾਮ","fatherOcc":"ਪਿਤਾ ਦਾ ਕਿੱਤਾ","mother":"ਮਾਤਾ ਦਾ ਨਾਮ","motherOcc":"ਮਾਤਾ ਦਾ ਕਿੱਤਾ","brothers":"ਭਰਾ","sisters":"ਭੈਣ","native":"ਜੱਦੀ ਪਿੰਡ","contactPerson":"ਸੰਪਰਕ ਵਿਅਕਤੀ","phone":"ਮੋਬਾਈਲ ਨੰਬਰ","email":"ਈਮੇਲ","address":"ਪਤਾ","aboutText":"ਮੇਰੇ ਬਾਰੇ","expectations":"ਉਮੀਦਾਂ","yes":"ਹਾਂ","no":"ਨਹੀਂ","partial":"ਅੰਸ਼ਕ","ganesh":"॥ ਸ਼੍ਰੀ ਗਣੇਸ਼ਾਯ ਨਮਃ ॥","blood":"ਬਲੱਡ ਗਰੁੱਪ"}
  };
  /*LX-JSON-END*/
  /*LMETA-JSON-START*/
  var LMETA = {
  "mr": {"en":"Marathi","native":"मराठी","script":"deva","digits":"०१२३४५६७८९","months":["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोव्हेंबर","डिसेंबर"],"daypart":[["सकाळी","दुपारी","संध्याकाळी","रात्री"],"वाजता"]},
  "bn": {"en":"Bengali","native":"বাংলা","script":"beng","digits":"০১২৩৪৫৬৭৮৯","months":["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],"daypart":[["সকাল","দুপুর","সন্ধ্যা","রাত"],""]},
  "te": {"en":"Telugu","native":"తెలుగు","script":"telu","digits":"౦౧౨౩౪౫౬౭౮౯","months":["జనవరి","ఫిబ్రవరి","మార్చి","ఏప్రిల్","మే","జూన్","జూలై","ఆగస్టు","సెప్టెంబర్","అక్టోబర్","నవంబర్","డిసెంబర్"],"daypart":[["ఉదయం","మధ్యాహ్నం","సాయంత్రం","రాత్రి"],"గంటలకు"]},
  "ta": {"en":"Tamil","native":"தமிழ்","script":"taml","digits":null,"months":["ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்ட்","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்"],"daypart":[["காலை","மதியம்","மாலை","இரவு"],"மணி"]},
  "gu": {"en":"Gujarati","native":"ગુજરાતી","script":"gujr","digits":"૦૧૨૩૪૫૬૭૮૯","months":["જાન્યુઆરી","ફેબ્રુઆરી","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટેમ્બર","ઑક્ટોબર","નવેમ્બર","ડિસેમ્બર"],"daypart":[["સવારે","બપોરે","સાંજે","રાત્રે"],"વાગ્યે"]},
  "ur": {"en":"Urdu","native":"اردو","script":"arab","dir":"rtl","digits":"۰۱۲۳۴۵۶۷۸۹","months":["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"],"daypart":[["صبح","دوپہر","شام","رات"],"بجے"]},
  "kn": {"en":"Kannada","native":"ಕನ್ನಡ","script":"knda","digits":"೦೧೨೩೪೫೬೭೮೯","months":["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಏಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟೆಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್"],"daypart":[["ಬೆಳಿಗ್ಗೆ","ಮಧ್ಯಾಹ್ನ","ಸಂಜೆ","ರಾತ್ರಿ"],"ಗಂಟೆ"]},
  "or": {"en":"Odia","native":"ଓଡ଼ିଆ","script":"orya","digits":"୦୧୨୩୪୫୬୭୮୯","months":["ଜାନୁଆରୀ","ଫେବୃଆରୀ","ମାର୍ଚ୍ଚ","ଅପ୍ରେଲ","ମେ","ଜୁନ","ଜୁଲାଇ","ଅଗଷ୍ଟ","ସେପ୍ଟେମ୍ବର","ଅକ୍ଟୋବର","ନଭେମ୍ବର","ଡିସେମ୍ବର"],"daypart":[["ସକାଳ","ଦିପହର","ସନ୍ଧ୍ୟା","ରାତି"],""]},
  "ml": {"en":"Malayalam","native":"മലയാളം","script":"mlym","digits":null,"months":["ജനുവരി","ഫെബ്രുവരി","മാർച്ച്","ഏപ്രിൽ","മേയ്","ജൂൺ","ജൂലൈ","ഓഗസ്റ്റ്","സെപ്റ്റംബർ","ഒക്ടോബർ","നവംബർ","ഡിസംബർ"],"daypart":[["രാവിലെ","ഉച്ചയ്ക്ക്","വൈകുന്നേരം","രാത്രി"],"മണി"]},
  "pa": {"en":"Punjabi","native":"ਪੰਜਾਬੀ","script":"guru","digits":"੦੧੨੩੪੫੬੭੮੯","months":["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ"],"daypart":[["ਸਵੇਰੇ","ਦੁਪਹਿਰੇ","ਸ਼ਾਮ","ਰਾਤ"],"ਵਜੇ"]}
  };
  /*LMETA-JSON-END*/
  /*SAMPLES-JSON-START*/
  var SAMPLES_X = {
  "mr": {"fullName":"अमित सुरेश देशपांडे","birthPlace":"पुणे","height":"5 फूट 8 इंच","complexion":"गव्हाळ","religion":"हिंदू","caste":"देशस्थ ब्राह्मण","gotra":"कश्यप","rashi":"मिथुन","nakshatra":"मृग","education":"एम.बी.ए., सिम्बायोसिस पुणे","occupation":"मार्केटिंग मॅनेजर","company":"बेंगळुरू","income":"वार्षिक ₹9 लाख","father":"श्री. सुरेश देशपांडे","fatherOcc":"निवृत्त बँक अधिकारी","mother":"सौ. सुनीता देशपांडे","motherOcc":"गृहिणी","brothers":"1 धाकटा भाऊ (शिक्षण)","sisters":"1 मोठी बहीण (विवाहित)","native":"सातारा","contactPerson":"श्री. सुरेश देशपांडे (वडील)","address":"कोथरूड, पुणे","aboutText":"शांत, कुटुंबप्रिय आणि मेहनती. प्रवास, क्रिकेट आणि वाचनाची आवड.","expectations":"सुशिक्षित, समजूतदार आणि दोन्ही कुटुंबांचा आदर करणारी जोडीदार."},
  "bn": {"fullName":"অনির্বাণ চক্রবর্তী","birthPlace":"কলকাতা","height":"5 ফুট 8 ইঞ্চি","complexion":"উজ্জ্বল শ্যামবর্ণ","religion":"হিন্দু","caste":"ব্রাহ্মণ","gotra":"শাণ্ডিল্য","rashi":"মিথুন","nakshatra":"মৃগশিরা","education":"এম.বি.এ., যাদবপুর বিশ্ববিদ্যালয়","occupation":"মার্কেটিং ম্যানেজার","company":"বেঙ্গালুরু","income":"বার্ষিক ₹9 লাখ","father":"শ্রী সুব্রত চক্রবর্তী","fatherOcc":"অবসরপ্রাপ্ত শিক্ষক","mother":"শ্রীমতী রীতা চক্রবর্তী","motherOcc":"গৃহিণী","brothers":"1 জন ছোট ভাই (পড়াশোনা)","sisters":"1 জন বড় বোন (বিবাহিত)","native":"বর্ধমান, পশ্চিমবঙ্গ","contactPerson":"শ্রী সুব্রত চক্রবর্তী (পিতা)","address":"সল্টলেক, কলকাতা","aboutText":"শান্ত, পরিবারমুখী ও পরিশ্রমী। ভ্রমণ, ক্রিকেট আর বই পড়তে ভালোবাসি।","expectations":"শিক্ষিত, সহৃদয় এবং দুই পরিবারকে সম্মান করেন এমন জীবনসঙ্গী।"},
  "te": {"fullName":"శ్రీకాంత్ రెడ్డి","birthPlace":"విజయవాడ","height":"5 అడుగుల 8 అంగుళాలు","complexion":"చామనఛాయ","religion":"హిందూ","caste":"రెడ్డి","gotra":"కాశ్యప","rashi":"మిథునం","nakshatra":"మృగశిర","education":"ఎం.బి.ఎ., ఆంధ్ర విశ్వవిద్యాలయం","occupation":"మార్కెటింగ్ మేనేజర్","company":"హైదరాబాద్","income":"సంవత్సరానికి ₹9 లక్షలు","father":"శ్రీ వెంకట రెడ్డి","fatherOcc":"వ్యాపారం","mother":"శ్రీమతి పద్మావతి","motherOcc":"గృహిణి","brothers":"1 తమ్ముడు (చదువు)","sisters":"1 అక్క (వివాహిత)","native":"గుంటూరు","contactPerson":"శ్రీ వెంకట రెడ్డి (తండ్రి)","address":"కూకట్‌పల్లి, హైదరాబాద్","aboutText":"ప్రశాంతమైన, కుటుంబానికి విలువనిచ్చే, కష్టపడి పనిచేసే వ్యక్తి. ప్రయాణం, క్రికెట్, పుస్తకాలు ఇష్టం.","expectations":"చదువుకున్న, మంచి మనసున్న, రెండు కుటుంబాలను గౌరవించే జీవిత భాగస్వామి."},
  "ta": {"fullName":"கார்த்திக் சுப்பிரமணியன்","birthPlace":"மதுரை","height":"5 அடி 8 அங்குலம்","complexion":"மாநிறம்","religion":"இந்து","caste":"முதலியார்","gotra":"காசியப","rashi":"மிதுனம்","nakshatra":"மிருகசீரிடம்","education":"எம்.பி.ஏ., அண்ணா பல்கலைக்கழகம்","occupation":"மார்க்கெட்டிங் மேலாளர்","company":"சென்னை","income":"ஆண்டுக்கு ₹9 லட்சம்","father":"திரு. சுப்பிரமணியன்","fatherOcc":"ஓய்வுபெற்ற ஆசிரியர்","mother":"திருமதி. லட்சுமி","motherOcc":"இல்லத்தரசி","brothers":"1 தம்பி (படிப்பு)","sisters":"1 அக்கா (திருமணமானவர்)","native":"மதுரை","contactPerson":"திரு. சுப்பிரமணியன் (தந்தை)","address":"அண்ணா நகர், சென்னை","aboutText":"அமைதியான, குடும்பப் பற்றுள்ள, கடின உழைப்பாளி. பயணம், கிரிக்கெட், வாசிப்பு பிடிக்கும்.","expectations":"படித்த, அன்பான, இரு குடும்பங்களையும் மதிக்கும் வாழ்க்கைத் துணை."},
  "gu": {"fullName":"હાર્દિક જયેશભાઈ પટેલ","birthPlace":"અમદાવાદ","height":"5 ફૂટ 8 ઇંચ","complexion":"ઘઉંવર્ણો","religion":"હિન્દુ","caste":"લેઉવા પટેલ","gotra":"કશ્યપ","rashi":"મિથુન","nakshatra":"મૃગશીર્ષ","education":"એમ.બી.એ., ગુજરાત યુનિવર્સિટી","occupation":"માર્કેટિંગ મેનેજર","company":"બેંગલુરુ","income":"વાર્ષિક ₹9 લાખ","father":"શ્રી જયેશભાઈ પટેલ","fatherOcc":"વ્યવસાય","mother":"શ્રીમતી હેતલબેન પટેલ","motherOcc":"ગૃહિણી","brothers":"1 નાનો ભાઈ (અભ્યાસ)","sisters":"1 મોટી બહેન (પરિણીત)","native":"મહેસાણા","contactPerson":"શ્રી જયેશભાઈ પટેલ (પિતા)","address":"સેટેલાઇટ, અમદાવાદ","aboutText":"શાંત, પરિવારપ્રેમી અને મહેનતુ. પ્રવાસ, ક્રિકેટ અને વાંચનનો શોખ.","expectations":"શિક્ષિત, સમજદાર અને બંને પરિવારોનો આદર કરનાર જીવનસાથી."},
  "ur": {"fullName":"محمد عمران خان","birthPlace":"لکھنؤ","height":"5 فٹ 9 انچ","complexion":"گندمی","religion":"اسلام","caste":"پٹھان","gotra":"سنی حنفی","rashi":"","nakshatra":"","manglik":"","education":"ایم بی اے، علی گڑھ مسلم یونیورسٹی","occupation":"مارکیٹنگ منیجر","company":"بنگلورو","income":"سالانہ 9 لاکھ روپے","father":"جناب عبدالرحمٰن خان","fatherOcc":"کاروبار","mother":"محترمہ شبانہ خان","motherOcc":"خاتونِ خانہ","brothers":"1 چھوٹا بھائی (زیرِ تعلیم)","sisters":"1 بڑی بہن (شادی شدہ)","native":"لکھنؤ، اتر پردیش","contactPerson":"جناب عبدالرحمٰن خان (والد)","address":"امین آباد، لکھنؤ","aboutText":"پُرسکون، خاندان سے محبت کرنے والا اور محنتی۔ سفر، کرکٹ اور مطالعہ کا شوق ہے۔","expectations":"تعلیم یافتہ، نیک سیرت اور دونوں خاندانوں کی عزت کرنے والی شریکِ حیات۔"},
  "kn": {"fullName":"ಪ್ರಶಾಂತ್ ಹೆಗಡೆ","birthPlace":"ಮೈಸೂರು","height":"5 ಅಡಿ 8 ಇಂಚು","complexion":"ಗೋಧಿ ಬಣ್ಣ","religion":"ಹಿಂದೂ","caste":"ಹವ್ಯಕ ಬ್ರಾಹ್ಮಣ","gotra":"ಕಾಶ್ಯಪ","rashi":"ಮಿಥುನ","nakshatra":"ಮೃಗಶಿರ","education":"ಎಂ.ಬಿ.ಎ., ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ","occupation":"ಮಾರ್ಕೆಟಿಂಗ್ ಮ್ಯಾನೇಜರ್","company":"ಬೆಂಗಳೂರು","income":"ವಾರ್ಷಿಕ ₹9 ಲಕ್ಷ","father":"ಶ್ರೀ ರಮೇಶ್ ಹೆಗಡೆ","fatherOcc":"ನಿವೃತ್ತ ಶಿಕ್ಷಕರು","mother":"ಶ್ರೀಮತಿ ಸುಮಾ ಹೆಗಡೆ","motherOcc":"ಗೃಹಿಣಿ","brothers":"1 ತಮ್ಮ (ವಿದ್ಯಾರ್ಥಿ)","sisters":"1 ಅಕ್ಕ (ವಿವಾಹಿತೆ)","native":"ಶಿರಸಿ, ಉತ್ತರ ಕನ್ನಡ","contactPerson":"ಶ್ರೀ ರಮೇಶ್ ಹೆಗಡೆ (ತಂದೆ)","address":"ಜಯನಗರ, ಬೆಂಗಳೂರು","aboutText":"ಶಾಂತ ಸ್ವಭಾವ, ಕುಟುಂಬಪ್ರೇಮಿ ಮತ್ತು ಶ್ರಮಜೀವಿ. ಪ್ರವಾಸ, ಕ್ರಿಕೆಟ್ ಮತ್ತು ಓದು ಇಷ್ಟ.","expectations":"ವಿದ್ಯಾವಂತೆ, ಸೌಮ್ಯ ಸ್ವಭಾವದ ಮತ್ತು ಎರಡೂ ಕುಟುಂಬಗಳನ್ನು ಗೌರವಿಸುವ ಸಂಗಾತಿ."},
  "or": {"fullName":"ସୌମ୍ୟ ରଞ୍ଜନ ମହାପାତ୍ର","birthPlace":"କଟକ","height":"5 ଫୁଟ 8 ଇଞ୍ଚ","complexion":"ଗହମ ରଙ୍ଗ","religion":"ହିନ୍ଦୁ","caste":"କରଣ","gotra":"କାଶ୍ୟପ","rashi":"ମିଥୁନ","nakshatra":"ମୃଗଶିରା","education":"ଏମ୍.ବି.ଏ., ଉତ୍କଳ ବିଶ୍ୱବିଦ୍ୟାଳୟ","occupation":"ମାର୍କେଟିଂ ମ୍ୟାନେଜର","company":"ଭୁବନେଶ୍ୱର","income":"ବାର୍ଷିକ ₹9 ଲକ୍ଷ","father":"ଶ୍ରୀ ପ୍ରଶାନ୍ତ କୁମାର ମହାପାତ୍ର","fatherOcc":"ଅବସରପ୍ରାପ୍ତ ଶିକ୍ଷକ","mother":"ଶ୍ରୀମତୀ ସୁଜାତା ମହାପାତ୍ର","motherOcc":"ଗୃହିଣୀ","brothers":"1 ସାନ ଭାଇ (ପାଠପଢ଼ା)","sisters":"1 ବଡ଼ ଭଉଣୀ (ବିବାହିତା)","native":"ପୁରୀ","contactPerson":"ଶ୍ରୀ ପ୍ରଶାନ୍ତ କୁମାର ମହାପାତ୍ର (ପିତା)","address":"ସହିଦ ନଗର, ଭୁବନେଶ୍ୱର","aboutText":"ଶାନ୍ତ, ପରିବାରପ୍ରେମୀ ଓ ପରିଶ୍ରମୀ। ଭ୍ରମଣ, କ୍ରିକେଟ ଓ ପଢ଼ିବା ଭଲ ପାଏ।","expectations":"ଶିକ୍ଷିତା, ସରଳ ଓ ଉଭୟ ପରିବାରକୁ ସମ୍ମାନ କରୁଥିବା ଜୀବନସାଥୀ।"},
  "ml": {"fullName":"അർജുൻ നായർ","birthPlace":"തൃശ്ശൂർ","height":"5 അടി 8 ഇഞ്ച്","complexion":"ഇരുനിറം","religion":"ഹിന്ദു","caste":"നായർ","gotra":"","rashi":"മിഥുനം","nakshatra":"മകയിരം","education":"എം.ബി.എ., കേരള സർവകലാശാല","occupation":"മാർക്കറ്റിംഗ് മാനേജർ","company":"കൊച്ചി","income":"പ്രതിവർഷം ₹9 ലക്ഷം","father":"ശ്രീ. രാധാകൃഷ്ണൻ നായർ","fatherOcc":"റിട്ട. അധ്യാപകൻ","mother":"ശ്രീമതി. ലത","motherOcc":"വീട്ടമ്മ","brothers":"1 അനിയൻ (പഠിക്കുന്നു)","sisters":"1 ചേച്ചി (വിവാഹിത)","native":"തൃശ്ശൂർ","contactPerson":"ശ്രീ. രാധാകൃഷ്ണൻ നായർ (അച്ഛൻ)","address":"കാക്കനാട്, കൊച്ചി","aboutText":"ശാന്തനും കുടുംബസ്നേഹിയും കഠിനാധ്വാനിയും. യാത്ര, ക്രിക്കറ്റ്, വായന ഇഷ്ടം.","expectations":"വിദ്യാസമ്പന്നയും സ്നേഹമുള്ളവളും ഇരു കുടുംബങ്ങളെയും ബഹുമാനിക്കുന്നവളുമായ ജീവിതപങ്കാളി."},
  "pa": {"fullName":"ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ ਢਿੱਲੋਂ","birthPlace":"ਲੁਧਿਆਣਾ","height":"5 ਫੁੱਟ 10 ਇੰਚ","complexion":"ਕਣਕਵੰਨਾ","religion":"ਸਿੱਖ","caste":"ਜੱਟ","gotra":"ਢਿੱਲੋਂ","rashi":"","nakshatra":"","manglik":"","education":"ਐਮ.ਬੀ.ਏ., ਪੰਜਾਬ ਯੂਨੀਵਰਸਿਟੀ","occupation":"ਮਾਰਕੀਟਿੰਗ ਮੈਨੇਜਰ","company":"ਚੰਡੀਗੜ੍ਹ","income":"ਸਾਲਾਨਾ ₹9 ਲੱਖ","father":"ਸ. ਹਰਜੀਤ ਸਿੰਘ ਢਿੱਲੋਂ","fatherOcc":"ਖੇਤੀਬਾੜੀ","mother":"ਸ੍ਰੀਮਤੀ ਮਨਜੀਤ ਕੌਰ","motherOcc":"ਘਰੇਲੂ","brothers":"1 ਛੋਟਾ ਭਰਾ (ਪੜ੍ਹਾਈ)","sisters":"1 ਵੱਡੀ ਭੈਣ (ਵਿਆਹੀ ਹੋਈ)","native":"ਪਿੰਡ ਮੁੱਲਾਂਪੁਰ, ਲੁਧਿਆਣਾ","contactPerson":"ਸ. ਹਰਜੀਤ ਸਿੰਘ (ਪਿਤਾ)","address":"ਸੈਕਟਰ 35, ਚੰਡੀਗੜ੍ਹ","aboutText":"ਸ਼ਾਂਤ, ਪਰਿਵਾਰ ਨਾਲ ਜੁੜਿਆ ਅਤੇ ਮਿਹਨਤੀ। ਸਫ਼ਰ, ਕ੍ਰਿਕਟ ਅਤੇ ਕਿਤਾਬਾਂ ਦਾ ਸ਼ੌਕ।","expectations":"ਪੜ੍ਹੀ-ਲਿਖੀ, ਨਿਮਰ ਅਤੇ ਦੋਵਾਂ ਪਰਿਵਾਰਾਂ ਦਾ ਸਤਿਕਾਰ ਕਰਨ ਵਾਲੀ ਜੀਵਨ ਸਾਥਣ।"}
  };
  /*SAMPLES-JSON-END*/

  var LANGS = BASE4.concat(Object.keys(LX));
  var LANG_NAMES = { en: "English", hi: "हिन्दी (Hindi)", mai: "मैथिली (Maithili)", bho: "भोजपुरी (Bhojpuri)" };
  Object.keys(LMETA).forEach(function (k) { LANG_NAMES[k] = LMETA[k].native + " (" + LMETA[k].en + ")"; });
  // Dropdown groups: [English label, Hindi label, codes]
  var GROUPS = [
    ["", "", ["en"]],
    ["North India", "उत्तर भारत", ["hi", "bho", "mai", "pa", "ur"]],
    ["East & North-East", "पूर्व और पूर्वोत्तर", ["bn", "or"]],
    ["West India", "पश्चिम भारत", ["mr", "gu"]],
    ["South India", "दक्षिण भारत", ["ta", "te", "kn", "ml"]]
  ];
  var DEVA_DIGITS = "०१२३४५६७८९";
  function meta(lang) {
    if (LMETA[lang]) return LMETA[lang];
    return { script: lang === "en" ? "latn" : "deva", digits: lang === "en" ? null : DEVA_DIGITS };
  }

  var MONTHS = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    hi: ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
  };
  MONTHS.mai = MONTHS.hi; MONTHS.bho = MONTHS.hi;
  Object.keys(LMETA).forEach(function (k) { MONTHS[k] = LMETA[k].months; });

  // time-of-day words: [morning, afternoon, evening, night], plus "o'clock" word
  var DAYPART = {
    hi: [["सुबह", "दोपहर", "शाम", "रात"], "बजे"],
    mai: [["भोर", "दुपहर", "साँझ", "राति"], "बजे"],
    bho: [["सबेरे", "दुपहरिया", "साँझ", "रात"], "बजे"]
  };
  Object.keys(LMETA).forEach(function (k) { DAYPART[k] = LMETA[k].daypart; });

  function bio(key, lang) {
    if (LX[lang] && LX[lang][key]) return LX[lang][key];
    var row = L[key]; if (!row) return key;
    var i = BASE4.indexOf(lang); return row[i < 0 ? 0 : i];
  }

  // ---- Top blessings. text: per-language text ("_" = default). ui: [English, Hindi] option label.
  // langs: shown only for these biodata languages (omitted = shown for every language).
  var BLESS = {
    ganesh: { ui: ["Shri Ganesh", "श्री गणेश"] },
    om: { text: { _: "ॐ" }, ui: ["Om (ॐ)", "ॐ"], big: true },
    prajapati: { text: { _: "॥ प्रजापतये नमः ॥", bn: "॥ প্রজাপতয়ে নমঃ ॥" }, ui: ["Prajapataye Namah", "प्रजापतये नमः"], langs: ["bn"] },
    pillaiyar: { text: { _: "உ" }, ui: ["Pillaiyar Suzhi (உ)", "पिल्लैयार सुली (உ)"], langs: ["ta"], big: true },
    srirastu: { text: { _: "శ్రీరస్తు · శుభమస్తు · అవిఘ్నమస్తు" }, ui: ["Srirastu Subhamastu", "श्रीरस्तु शुभमस्तु"], langs: ["te"] },
    jagannath: { text: { _: "॥ ଜୟ ଜଗନ୍ନାଥ ॥" }, ui: ["Jai Jagannath", "जय जगन्नाथ"], langs: ["or"] },
    ikonkar: { text: { _: "ੴ" }, ui: ["Ik Onkar (ੴ)", "इक ओंकार (ੴ)"], big: true },
    satgur: { text: { _: "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ" }, ui: ["Ik Onkar Satgur Prasad", "इक ओंकार सतगुर प्रसाद"] },
    waheguru: { text: { _: "॥ ਵਾਹਿਗੁਰੂ ॥" }, ui: ["Waheguru", "वाहेगुरु"] },
    bismillah: { text: { _: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ" }, ui: ["Bismillah", "बिस्मिल्लाह"], rtl: true },
    n786: { text: { _: "786" }, ui: ["786", "786"] }
  };
  // Order of options per biodata language (anything not listed keeps the default order)
  var BLESS_ORDER = { _: ["ganesh", "om", "prajapati", "pillaiyar", "srirastu", "jagannath", "ikonkar", "satgur", "waheguru", "bismillah", "n786"],
    ur: ["bismillah", "n786", "ganesh", "om", "ikonkar", "satgur", "waheguru"],
    pa: ["ikonkar", "satgur", "waheguru", "ganesh", "om", "bismillah", "n786"] };
  function blessOptions(lang) {
    return (BLESS_ORDER[lang] || BLESS_ORDER._).filter(function (k) { var b = BLESS[k]; return !b.langs || b.langs.indexOf(lang) >= 0; });
  }
  function blessText(k, lang) {
    if (k === "ganesh") return bio("ganesh", lang);
    var b = BLESS[k]; if (!b) return "";
    return b.text[lang] || b.text._;
  }

  // ---------- App UI strings (English / Hindi) ----------
  // {n} and {f} are filled in by app.js.
  var UI = {
    en: {
      tagline: "Beautiful marriage biodata in your language, free, in 2 minutes",
      bioLang: "Biodata language", template: "Choose a design", tplHint: "Tap a design to see it on your biodata instantly.",
      header: "Top blessing", none: "None", ganeshOpt: "Shri Ganesh", omOpt: "Om", deva: "Native digits",
      photo: "Photo", addPhoto: "Add photo", changePhoto: "Change", removePhoto: "Remove",
      photoTip: "Families love a clear, smiling photo with a plain background.",
      cropTitle: "Adjust your photo", cropHint: "Drag to move, use the slider to zoom.", zoom: "Zoom", useThis: "Use photo", cancel: "Cancel",
      secPersonal: "Personal details", secCareer: "Education & career", secFamily: "Family", secContact: "Contact", secAbout: "About you & expectations", secCustom: "Extra fields",
      hintPersonal: "Name, birth details and horoscope", hintCareer: "Studies, work and income", hintFamily: "Parents, siblings and native place",
      hintContact: "Who should families call?", hintAbout: "A few warm lines about you", hintCustom: "Blood group, hobbies, kul devta…",
      addRow: "Add a field", rowLabel: "Label (e.g. Blood group)", rowValue: "Value", remove: "Remove",
      pdf: "Download PDF", jpg: "Download JPG", print: "Print", wa: "Share on WhatsApp", mPdf: "PDF",
      clear: "Clear all", sample: "Fill a sample", saved: "Saved on this device", preview: "Preview", edit: "Edit",
      confirmClear: "Delete everything you typed, and the photo, from this device?",
      nameNeeded: "Please add a name first. It is the only required field.", working: "Making your biodata beautiful…",
      waFallback: "Your image is downloaded. Attach it in the WhatsApp chat that opens.",
      shubh: "Shubh ho! 🎉", dlDone: "Your biodata is downloaded. Wishing you a wonderful match!",
      done: "Done!", select: "Select", optional: "optional", privacy: "Your details never leave this device. No signup, no upload.",
      payTitle: "Download in HD", payBody: "One-time payment of", payBtn: "Pay now", paidBtn: "I have paid, download",
      fitNote: "Text auto-sizes to fit one A4 page.",
      livePreview: "Live preview", emptyPreview: "Start with your name. Your biodata appears here as you type ✨",
      prog: "Your biodata is {n}% complete", progNext: "Up next: {f}",
      prog0: "Let's begin! Add your name to get started ✨", prog1: "Great start! Add your birth details next.",
      prog2: "Looking lovely! Family details help families connect.", prog3: "Almost there! A photo and a few lines about you make it shine.",
      prog4: "Perfect! Your biodata is ready to share 🎉",
      newBadge: "New", heroCta: "Start making", heroSee: "See designs",
      writeBtn: "Write for me", toneS: "Simple", toneF: "Family-first", toneU: "Fun", toneP: "Professional", shuffle: "Shuffle", useText: "Use this",
      writerNeedG: "Is this biodata for a bride or a groom? Pick one so the sentences are grammatically right.", writerAdded: "Added! Feel free to edit it in your own words.",
      gLabel: "This biodata is for", bride: "Bride", groom: "Groom",
      secVibe: "Vibe chips", hintVibe: "Tap what feels like you", customChip: "Add your own", chipPh: "e.g. Painting mehndi", addChip: "Add",
      loadFail: "Could not load this part. Please check your connection and try again.", badImage: "Could not read this image. Please try a JPG or PNG photo.",
      exportFail: "Sorry, something went wrong while creating the file. Please try again, or use Print.",
      reelBtn: "Make a Reel", reelTitle: "Your Biodata Reel", reelSub: "A 15-second vertical video for WhatsApp Status and family groups.",
      reelMake: "Create video", reelRendering: "Creating your Reel… {n}%", reelReady: "Your Reel is ready! 🎉", reelDownload: "Download video", reelShare: "Share on WhatsApp",
      reelMusic: "Soft music", reelReplay: "Replay preview", reelAgain: "Create again", reelClose: "Close", reelPreviewing: "Previewing…",
      reelNoRec: "This browser cannot record video. You can still watch the animated preview here and download your biodata as a JPG.",
      reelKeep: "Keep this screen open while the video is being created.",
      reelShort: "Reel", pFree: "Free", pNoSignup: "No signup", pFormats: "PDF · JPG · Reel · WhatsApp", pDesigns: "7 designs", pLangs: "14 languages: Hindi, Bengali, Marathi, Tamil, Telugu, Urdu & more"
    },
    hi: {
      tagline: "आपकी भाषा में सुंदर विवाह बायोडाटा, मुफ़्त, सिर्फ़ 2 मिनट में",
      bioLang: "बायोडाटा की भाषा", template: "डिज़ाइन चुनें", tplHint: "कोई भी डिज़ाइन चुनें, प्रीव्यू तुरंत बदल जाएगा।",
      header: "ऊपर का शुभ चिह्न", none: "कोई नहीं", ganeshOpt: "श्री गणेश", omOpt: "ॐ", deva: "अपनी लिपि के अंक",
      photo: "फ़ोटो", addPhoto: "फ़ोटो जोड़ें", changePhoto: "बदलें", removePhoto: "हटाएँ",
      photoTip: "सादे बैकग्राउंड वाली साफ़, मुस्कुराती फ़ोटो परिवारों को सबसे ज़्यादा पसंद आती है।",
      cropTitle: "फ़ोटो ठीक करें", cropHint: "खिसकाने के लिए खींचें, ज़ूम के लिए स्लाइडर चलाएँ।", zoom: "ज़ूम", useThis: "यह फ़ोटो लगाएँ", cancel: "रद्द करें",
      secPersonal: "व्यक्तिगत विवरण", secCareer: "शिक्षा और व्यवसाय", secFamily: "परिवार", secContact: "संपर्क", secAbout: "अपने बारे में और अपेक्षाएँ", secCustom: "अतिरिक्त जानकारी",
      hintPersonal: "नाम, जन्म का विवरण और कुंडली", hintCareer: "पढ़ाई, काम और आय", hintFamily: "माता-पिता, भाई-बहन और मूल निवास",
      hintContact: "परिवार किससे संपर्क करें?", hintAbout: "अपने बारे में कुछ दिल से लिखी बातें", hintCustom: "ब्लड ग्रुप, शौक़, कुलदेवता…",
      addRow: "नई पंक्ति जोड़ें", rowLabel: "शीर्षक (जैसे ब्लड ग्रुप)", rowValue: "जानकारी", remove: "हटाएँ",
      pdf: "PDF डाउनलोड करें", jpg: "JPG डाउनलोड करें", print: "प्रिंट करें", wa: "WhatsApp पर भेजें", mPdf: "PDF",
      clear: "सब मिटाएँ", sample: "नमूना भरें", saved: "इस डिवाइस में सेव हो गया", preview: "प्रीव्यू", edit: "भरें",
      confirmClear: "इस डिवाइस से लिखी हुई सारी जानकारी और फ़ोटो मिटा दें?",
      nameNeeded: "पहले नाम लिखें। सिर्फ़ यही ज़रूरी है।", working: "आपका बायोडाटा सज रहा है…",
      waFallback: "फ़ोटो डाउनलोड हो गई है। खुलने वाली WhatsApp चैट में इसे अटैच करें।",
      shubh: "शुभ हो! 🎉", dlDone: "आपका बायोडाटा डाउनलोड हो गया। अच्छे रिश्ते के लिए शुभकामनाएँ!",
      done: "हो गया!", select: "चुनें", optional: "वैकल्पिक", privacy: "आपकी जानकारी इसी डिवाइस में रहती है। न साइनअप, न अपलोड।",
      payTitle: "HD में डाउनलोड करें", payBody: "एक बार का भुगतान", payBtn: "अभी भुगतान करें", paidBtn: "भुगतान हो गया, डाउनलोड करें",
      fitNote: "टेक्स्ट अपने-आप एक A4 पेज में फ़िट हो जाता है।",
      livePreview: "लाइव प्रीव्यू", emptyPreview: "अपना नाम लिखिए, बायोडाटा यहाँ साथ-साथ बनता दिखेगा ✨",
      prog: "आपका बायोडाटा {n}% पूरा है", progNext: "अगला: {f}",
      prog0: "चलिए शुरू करें! सबसे पहले अपना नाम लिखें ✨", prog1: "बढ़िया शुरुआत! अब जन्म का विवरण जोड़ें।",
      prog2: "बहुत सुंदर! परिवार का विवरण रिश्ता जोड़ने में मदद करता है।", prog3: "बस थोड़ा और! एक फ़ोटो और अपने बारे में दो पंक्तियाँ इसे और निखार देंगी।",
      prog4: "शानदार! आपका बायोडाटा भेजने के लिए तैयार है 🎉",
      newBadge: "नया", heroCta: "बनाना शुरू करें", heroSee: "डिज़ाइन देखें",
      writeBtn: "मेरे लिए लिखें", toneS: "सरल", toneF: "परिवार पहले", toneU: "मज़ेदार", toneP: "प्रोफ़ेशनल", shuffle: "दूसरा विकल्प", useText: "यही लगाएँ",
      writerNeedG: "यह बायोडाटा वधू का है या वर का? एक चुनें, ताकि वाक्यों का व्याकरण सही रहे।", writerAdded: "जुड़ गया! चाहें तो अपने शब्दों में बदल लें।",
      gLabel: "यह बायोडाटा किसका है", bride: "वधू (लड़की)", groom: "वर (लड़का)",
      secVibe: "आपकी पसंद", hintVibe: "जो आप पर जँचे, उस पर टैप करें", customChip: "अपना जोड़ें", chipPh: "जैसे मेहंदी लगाना", addChip: "जोड़ें",
      loadFail: "यह हिस्सा लोड नहीं हो सका। इंटरनेट जाँचकर फिर से कोशिश करें।", badImage: "यह फ़ोटो खुल नहीं पाई। कृपया JPG या PNG फ़ोटो चुनें।",
      exportFail: "माफ़ कीजिए, फ़ाइल बनाते समय कुछ गड़बड़ हो गई। फिर से कोशिश करें या प्रिंट का उपयोग करें।",
      reelBtn: "रील बनाएँ", reelTitle: "आपकी बायोडाटा रील", reelSub: "WhatsApp स्टेटस और फ़ैमिली ग्रुप के लिए 15 सेकंड का वर्टिकल वीडियो।",
      reelMake: "वीडियो बनाएँ", reelRendering: "आपकी रील बन रही है… {n}%", reelReady: "आपकी रील तैयार है! 🎉", reelDownload: "वीडियो डाउनलोड करें", reelShare: "WhatsApp पर भेजें",
      reelMusic: "हल्का संगीत", reelReplay: "प्रीव्यू फिर चलाएँ", reelAgain: "फिर से बनाएँ", reelClose: "बंद करें", reelPreviewing: "प्रीव्यू चल रहा है…",
      reelNoRec: "यह ब्राउज़र वीडियो रिकॉर्ड नहीं कर सकता। आप यहाँ एनिमेटेड प्रीव्यू देख सकते हैं और बायोडाटा JPG में डाउनलोड कर सकते हैं।",
      reelKeep: "वीडियो बनने तक यह स्क्रीन खुली रखें।",
      reelShort: "रील", pFree: "मुफ़्त", pNoSignup: "साइनअप की ज़रूरत नहीं", pFormats: "PDF · JPG · रील · WhatsApp", pDesigns: "7 डिज़ाइन", pLangs: "14 भाषाएँ: हिन्दी, बांग्ला, मराठी, तमिल, तेलुगु, उर्दू और भी"
    }
  };

  // Form field labels in the UI language: [English, Hindi, English placeholder, Hindi placeholder]
  var FORM = {
    fullName: ["Full name *", "पूरा नाम *", "e.g. Ananya Sharma", "जैसे अनन्या शर्मा"],
    dob: ["Date of birth", "जन्म तिथि", "", ""],
    birthTime: ["Time of birth", "जन्म समय", "", ""],
    birthPlace: ["Place of birth", "जन्म स्थान", "e.g. Patna", "जैसे पटना"],
    height: ["Height", "कद", "e.g. 5 ft 4 in", "जैसे 5 फ़ुट 4 इंच"],
    complexion: ["Complexion", "रंग", "e.g. Fair / Wheatish", "जैसे गोरा / गेहुँआ"],
    religion: ["Religion", "धर्म", "e.g. Hindu", "जैसे हिन्दू"],
    caste: ["Caste / community", "जाति / समुदाय", "e.g. Brahmin", "जैसे ब्राह्मण"],
    gotra: ["Gotra", "गोत्र", "e.g. Kashyap", "जैसे कश्यप"],
    rashi: ["Rashi", "राशि", "e.g. Mithun", "जैसे मिथुन"],
    nakshatra: ["Nakshatra", "नक्षत्र", "e.g. Rohini", "जैसे रोहिणी"],
    manglik: ["Manglik", "मांगलिक", "", ""],
    education: ["Education", "शिक्षा", "e.g. B.Tech, NIT Patna", "जैसे बी.टेक, एनआईटी पटना"],
    occupation: ["Occupation", "व्यवसाय", "e.g. Software Engineer", "जैसे सॉफ़्टवेयर इंजीनियर"],
    company: ["Company / workplace", "कंपनी / कार्यस्थल", "e.g. Infosys, Bengaluru", "जैसे इंफ़ोसिस, बेंगलुरु"],
    income: ["Annual income", "वार्षिक आय", "e.g. ₹8 lakh per year", "जैसे ₹8 लाख सालाना"],
    father: ["Father's name", "पिता का नाम", "e.g. Shri Ramesh Sharma", "जैसे श्री रमेश शर्मा"],
    fatherOcc: ["Father's occupation", "पिता का व्यवसाय", "e.g. Retired teacher", "जैसे सेवानिवृत्त शिक्षक"],
    mother: ["Mother's name", "माता का नाम", "e.g. Smt. Sunita Sharma", "जैसे श्रीमती सुनीता शर्मा"],
    motherOcc: ["Mother's occupation", "माता का व्यवसाय", "e.g. Homemaker", "जैसे गृहिणी"],
    brothers: ["Brothers", "भाई", "e.g. 1 elder (married)", "जैसे 1 बड़े भाई (विवाहित)"],
    sisters: ["Sisters", "बहन", "e.g. 1 younger (studying)", "जैसे 1 छोटी बहन (पढ़ाई)"],
    native: ["Native place", "मूल निवास", "e.g. Chhapra, Saran", "जैसे छपरा, सारण"],
    contactPerson: ["Contact person", "संपर्क व्यक्ति", "e.g. Father", "जैसे पिताजी"],
    phone: ["Mobile number", "मोबाइल नंबर", "e.g. +91 98765 43210", "जैसे +91 98765 43210"],
    email: ["Email", "ईमेल", "e.g. family@gmail.com", "जैसे family@gmail.com"],
    address: ["Current address", "वर्तमान पता", "e.g. Kankarbagh, Patna", "जैसे कंकड़बाग, पटना"],
    aboutText: ["About me", "मेरे बारे में", "Your nature, hobbies and values in 2–3 warm lines", "अपना स्वभाव, शौक़ और सोच 2–3 पंक्तियों में"],
    expectations: ["Expectations from partner", "जीवनसाथी से अपेक्षाएँ", "e.g. Educated, kind and family-oriented", "जैसे शिक्षित, सरल और परिवार से जुड़ा जीवनसाथी"]
  };

  // Form labels that change with the biodata language (e.g. Urdu uses Maslak in the Gotra row)
  var FORM_LANG = {
    ur: { gotra: ["Maslak / sect", "मसलक / फ़िरक़ा", "e.g. Sunni Hanafi"], caste: ["Caste / Biradari", "जाति / बिरादरी", "e.g. Pathan"] },
    ta: { manglik: ["Chevvai dosham (Manglik)", "चेव्वाय दोषम (मांगलिक)", ""] },
    te: { manglik: ["Kuja dosham (Manglik)", "कुज दोष (मांगलिक)", ""] },
    kn: { manglik: ["Kuja dosha (Manglik)", "कुज दोष (मांगलिक)", ""] },
    ml: { manglik: ["Chovva dosham (Manglik)", "चोव्वा दोषम (मांगलिक)", ""] },
    pa: { gotra: ["Gotra / Got", "गोत्र / गोत", "e.g. Dhillon"] }
  };
  function formLabel(k, lang) { return (FORM_LANG[lang] && FORM_LANG[lang][k]) || FORM[k]; }

  window.SB_I18N = { L: L, LX: LX, LMETA: LMETA, SAMPLES_X: SAMPLES_X, LANGS: LANGS, LANG_NAMES: LANG_NAMES, GROUPS: GROUPS, meta: meta,
    MONTHS: MONTHS, DAYPART: DAYPART, bio: bio, BLESS: BLESS, blessOptions: blessOptions, blessText: blessText, UI: UI, FORM: FORM, formLabel: formLabel };
})();
