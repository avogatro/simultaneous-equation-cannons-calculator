import { useTranslation } from 'react-i18next';

export default function HelpView() {
  const { t } = useTranslation();
  return (
    <div className="glass-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>{t('help.tut')}</h1>
      <h2>{t('help.usage')}</h2>

      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        {t('help.h1')}
      </p>

      <div className="help-grid">
        <div>
          <p>{t('help.h2')}</p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <li>{t('help.h3')}</li>
            <li>{t('help.h4')}</li>
            <li>{t('help.h5')}</li>
            <li>{t('help.h6')}</li>
          </ul>
          <p>{t('help.h7')}</p>
        </div>
        <div>
          <img className="help-img" src={`${import.meta.env.BASE_URL}img/total_cards.webp`} alt="total-cards" />
        </div>

        <div>
          <p>{t('help.h8')}</p>
        </div>
        <div>
          <img className="help-img" src={`${import.meta.env.BASE_URL}img/level_to_match.webp`} alt="level-to-match" />
        </div>

        <div>
          <p>{t('help.h9')}</p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <li>{t('help.h10')}</li>
            <li>{t('help.h11')}</li>
          </ul>
          <p>{t('help.h12')}</p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <li>{t('help.h13')}</li>
            <li>{t('help.h14')}</li>
          </ul>
          <p>{t('help.h15')}</p>
        </div>
        <div>
          {/* Empty spacer or we can put another image if available */}
        </div>

        <div>
          <p>{t('help.h16')}</p>
        </div>
        <div>
          <img className="help-img" src={`${import.meta.env.BASE_URL}img/what_to_send.webp`} alt="what-to-send" />
        </div>

        <div>
          <p>{t('help.h17')}</p>
          <p>{t('help.h18')}</p>
        </div>
        <div>
          <img className="help-img" src={`${import.meta.env.BASE_URL}img/pre_banish.webp`} alt="pre-banish" />
        </div>
      </div>
    </div>
  );
}
