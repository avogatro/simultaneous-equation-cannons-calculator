import fs from 'fs';
import path from 'path';

const extraDeckTranslations = {
  es: "Deck Extra",
  fr: "Extra Deck",      // Officially Extra Deck in FR TCG
  it: "Extra Deck",      // Officially Extra Deck in IT TCG
  pt: "Deck Adicional",
  nl: "Extra Deck",
  pl: "Dodatkowa Talia",
  ru: "Дополнительная колода",
  ja: "エクストラデッキ",
  ko: "엑스트라 덱",
  vi: "Bộ Bài Phụ",
  th: "เอ็กซ์ตร้าเด็ค",
  id: "Dek Ekstra",
  tr: "Ekstra Deste",
  ar: "المجموعة الإضافية",
  ur: "اضافی ڈیک",
  hi: "अतिरिक्त डेक",
  bn: "অতিরিক্ত ডেক"
};

function deepReplace(obj, lang) {
  const term = extraDeckTranslations[lang];
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      // Replace "Extra Deck" case insensitively
      obj[key] = obj[key].replace(/Extra Deck/gi, term);
    } else if (typeof obj[key] === 'object') {
      deepReplace(obj[key], lang);
    }
  }
}

Object.keys(extraDeckTranslations).forEach(lang => {
  const filePath = path.join(process.cwd(), 'src', 'locales', lang, 'translation.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Deep replace "Extra Deck" anywhere it appears in a string
    deepReplace(data, lang);
    
    // Explicitly ensure nav.extra is correct in case it was missing or fully English
    if (!data.nav) data.nav = {};
    data.nav.extra = extraDeckTranslations[lang];

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Translated 'Extra Deck' to '${extraDeckTranslations[lang]}' for ${lang}`);
  }
});
