# Simultaneous Equation Cannons Helper - Project Skills & Features

Based on the commit history and project documentation, this project has evolved into a fully-featured, performant, and secure web application. Below is a breakdown of the key technologies, skills, and features implemented in the codebase:

## 1. Core Technologies & Architecture
- **Backend & Foundation:** Originally built using Python and the Flask framework for server-side logic and API handling.
- **Frontend Expansion:** Expanded to include a JavaScript client-side application version.
- **Deployment & Automation:** Utilizes GitHub deployment scripts to automate server updates (PythonAnywhere).

## 2. Progressive Web App (PWA)
- Upgraded to a Progressive Web App (PWA), allowing the application to be installed and fully function **offline**.
- Implemented permanent sessions to maintain user state and calculated targets across visits.

## 3. UI/UX & Responsive Design
- **Multiple View Modes:** Supports dynamically switching between Matrix, Grid, and List views to display possible target combinations (while preserving the user's view preference).
- **Advanced Color Generation:** Uses HCT (Hue, Chroma, Tone) color generation methods to create accessible and dynamic UI color heatmaps.
- **Responsive Layout:** Extensive optimizations for mobile devices, including specific CSS handles for mobile split-screen layouts and strict minimum-width constraints.

## 4. Performance Optimization
- **Algorithmic Efficiency:** Implemented memoization caching to drastically reduce repetitive calculations for SEC state permutations.
- **Asset Optimization:** Comprehensive compression and optimization of fonts and images.
- **Load Time Reductions:** Preloads Google Fonts and mitigates Cumulative Layout Shift (CLS) for a smoother perceived user load time.

## 5. Search Engine Optimization (SEO)
- Implemented robust SEO practices including `sitemap`, `robots.txt`, targeted keywords, and canonical links for web crawlers.

## 6. Security
- Added a strict Content Security Policy (CSP) to protect against web vulnerabilities.

## 7. Domain Logic (Yu-Gi-Oh! TCG)
- Engineered a complex combinatorial calculator resolving the card math for "Simultaneous Equation Cannons".
- Features tracking for "Extra Deck" levels/ranks, updating calculations dynamically based on previously banished monsters and counting total extra deck cards.

## 8. Internationalization (i18n) & Localization
- **Multi-Language Support**: Fully integrated `react-i18next` to support 20 languages, seamlessly detecting user locale while allowing manual selection via the UI.
- **Deep Yu-Gi-Oh! Localization**: Extensively localized translations to abide by official regional TCG/OCG terminology (e.g., native regional terms for "Extra Deck", "Banish Zone", "Rank", "Level" in Spanish, Arabic, Japanese, Traditional Chinese, etc.) rather than literal machine translations.
- **UI Naming Conventions**: Audited and corrected language-specific UI conventions, such as using appropriate infinitive verb forms for buttons in Romance languages and correct noun capitalizations.
- **Automation Scripts**: Engineered custom Node.js JSON mapping scripts to rapidly seed, inject, and structure missing translation keys across vast sets of language dictionaries efficiently, bypassing third-party translation API rate-limits.

## 9. SEO & PWA Discoverability
- **PWA Prompting**: Integrated a native, localized "Install Offline App" button directly into the main navigation to boost user adoption of the Progressive Web App feature.
- **Search Engine Indexing**: Integrated Bing Webmaster verification tags directly into the application header for improved search engine indexing.
