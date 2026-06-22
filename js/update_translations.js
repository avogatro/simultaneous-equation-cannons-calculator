import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';
import pLimit from 'p-limit';

const baseMissingKeys = {
  deck: {
    lvl_cards: "Lvl \\ Cards",
    lvl: "Lvl"
  },
  home: {
    switch_list: "Switch to List",
    switch_grid: "Switch to Grid",
    select_total: "Select Total Number",
    get_more: "to Get More Info",
    error: "Extra Deck Monster Over 15! Reset",
    reset_extra: "Reset Extra Deck"
  },
  about: {
    created_by: "Created by",
    source_code: "source code"
  }
};

const topLanguages = [
  'en', 'es', 'zh-CN', 'hi', 'bn', 'pt', 'ru', 'ja', 'de', 'fr', 
  'it', 'ko', 'ar', 'id', 'ur', 'tr', 'vi', 'pl', 'th', 'nl'
];

async function updateMissing(obj, baseObj, langCode) {
  let updated = false;
  for (const [key, value] of Object.entries(baseObj)) {
    if (typeof value === 'object') {
      if (!obj[key]) obj[key] = {};
      const childUpdated = await updateMissing(obj[key], value, langCode);
      if (childUpdated) updated = true;
    } else {
      if (obj[key] === undefined) {
        if (langCode === 'en') {
          obj[key] = value;
        } else {
          try {
            const res = await translate(value, { to: langCode });
            obj[key] = res.text;
          } catch (e) {
            console.error(`Error translating "${value}" to ${langCode}:`, e.message);
            obj[key] = value;
          }
        }
        updated = true;
      }
    }
  }
  return updated;
}

async function main() {
  const limit = pLimit(2);
  const promises = topLanguages.map(lang => limit(async () => {
    console.log(`Checking ${lang}...`);
    const filePath = path.join(process.cwd(), 'src', 'locales', lang, 'translation.json');
    if (!fs.existsSync(filePath)) return;
    
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const updated = await updateMissing(content, baseMissingKeys, lang);
    
    if (updated) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      console.log(`Updated missing keys for ${lang}`);
    } else {
      console.log(`No missing keys for ${lang}`);
    }
  }));

  await Promise.all(promises);
  console.log('All missing translations injected!');
}

main().catch(console.error);
