import fs from 'fs';
import path from 'path';

// Base URL of the deployed application
const BASE_URL = 'https://avogatro.github.io/simultaneous-equation-cannons-calculator';

// The sub-paths in our application
const ROUTES = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/extra', priority: '0.8', changefreq: 'monthly' },
  { path: '/banished', priority: '0.8', changefreq: 'monthly' },
  { path: '/help', priority: '0.6', changefreq: 'monthly' },
  { path: '/about', priority: '0.5', changefreq: 'yearly' },
];

// Dynamically read supported languages from the locales folder
const localesDir = path.join(process.cwd(), 'src', 'locales');
const languages = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

// Map our internal language codes to standard BCP 47 tags for SEO
const languageTagMap = {
  'zh-CN': 'zh-Hans',
  'zh-TW': 'zh-Hant',
};

function getHreflang(lang) {
  return languageTagMap[lang] || lang;
}

// Generate the sitemap XML
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

ROUTES.forEach(route => {
  const urlBase = `${BASE_URL}${route.path}`;
  
  // Create an entry for the default URL (English fallback)
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>${urlBase}/</loc>\n`;
  sitemapXml += `    <changefreq>${route.changefreq}</changefreq>\n`;
  sitemapXml += `    <priority>${route.priority}</priority>\n`;

  // x-default is for unmatched languages (defaults to English version without param)
  sitemapXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlBase}/" />\n`;

  // Generate alternate links for ALL supported languages (including english)
  languages.forEach(lang => {
    const hreflang = getHreflang(lang);
    // Standard parameter for i18next-browser-languagedetector is ?lng=xx
    const localizedUrl = route.path === '' ? `${BASE_URL}/?lng=${lang}` : `${urlBase}/?lng=${lang}`;
    sitemapXml += `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${localizedUrl}" />\n`;
  });

  sitemapXml += `  </url>\n`;
});

sitemapXml += `</urlset>\n`;

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml);

const testSitemapPath = path.join(process.cwd(), 'public', 'testsitemap.xml');
fs.writeFileSync(testSitemapPath, sitemapXml);

console.log(`Generated sitemap with ${ROUTES.length} routes and ${languages.length} language alternates per route.`);
