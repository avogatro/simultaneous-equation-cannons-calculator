import { useTranslation } from 'react-i18next';

export default function AboutView() {
  const { t } = useTranslation();
  return (
    <div className="app-container">
      <h1>{t('about.title')}</h1>
      <h2>{t('about.desc')}</h2>

      <div className="resource-links" style={{ marginTop: '20px' }}>
        <p className="resource-link" style={{ fontSize: '1.2rem' }}>
          {t('about.github')} <a href="https://github.com/avogatro/simultaneous-equation-cannons-calculator" style={{ color: 'var(--color-6)', textDecoration: 'none', fontWeight: 'bold' }}>{t('about.source_code', { defaultValue: 'source code' })}</a>
        </p>
      </div>
    </div>
  );
}
