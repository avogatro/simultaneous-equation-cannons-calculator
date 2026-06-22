import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';
import pLimit from 'p-limit';

// We updated the English baseline to use the exact UI concepts the user wanted
// (e.g. "Main Page", "Banish Zone", "Banish:", "List View")
const keysToRetranslate = [
  ['nav', 'main'],
  ['nav', 'banished'],
  ['deck', 'banished_sub'],
  ['home', 'title'],
  ['home', 'send_banish_zone'],
  ['home', 'return_extra'],
  ['home', 'switch_list'],
  ['home', 'switch_grid'],
  ['help', 'h1'],
  ['help', 'h8'],
  ['help', 'h12'],
  ['help', 'h17'],
  ['help', 'h18']
];

// Languages to process (Skipping en, de, zh-CN since user handled them or we did)
const languagesToProcess = [
  'es', 'hi', 'bn', 'pt', 'ru', 'ja', 'fr', 'it', 
  'ko', 'ar', 'id', 'ur', 'tr', 'vi', 'pl', 'th', 'nl'
];

async function main() {
  const enPath = path.join(process.cwd(), 'src', 'locales', 'en', 'translation.json');
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  const limit = pLimit(2); // Google translate API limit concurrency

  const promises = languagesToProcess.map(lang => limit(async () => {
    console.log(`Processing ${lang}...`);
    const filePath = path.join(process.cwd(), 'src', 'locales', lang, 'translation.json');
    if (!fs.existsSync(filePath)) return;
    
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let updated = false;

    for (const [section, key] of keysToRetranslate) {
      if (enData[section] && enData[section][key]) {
        const enString = enData[section][key];
        try {
          const res = await translate(enString, { to: lang });
          content[section][key] = res.text;
          updated = true;
        } catch (e) {
          console.error(`Error translating [${section}][${key}] for ${lang}:`, e.message);
        }
      }
    }

    if (updated) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      console.log(`Updated contextual translations for ${lang}`);
    }
  }));

  await Promise.all(promises);
  console.log('All contextual translations applied!');
}

main().catch(console.error);
