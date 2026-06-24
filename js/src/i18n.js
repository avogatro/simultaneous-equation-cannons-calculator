import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all 20 translation files dynamically using Vite's glob import
const modules = import.meta.glob('./locales/*/translation.json', { eager: true });

const resources = {};

for (const path in modules) {
  // Extract language code from path (e.g., './locales/en/translation.json' -> 'en')
  const match = path.match(/\.\/locales\/(.+)\/translation\.json/);
  if (match) {
    const lang = match[1];
    resources[lang] = {
      translation: modules[path].default || modules[path]
    };
  }
}

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: {
      'zh-HK': ['zh-TW', 'en'],
      'zh-TW': ['zh-TW', 'en'],
      'zh': ['zh-CN', 'en'],
      'default': ['en']
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
