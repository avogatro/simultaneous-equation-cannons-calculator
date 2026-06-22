import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SimultaneousEquationCannonsState } from './Model';
import HomeView from './HomeView';
import DeckConfigView from './DeckConfigView';
import HelpView from './HelpView';
import AboutView from './AboutView';
import './index.css';

const DEFAULT_EXTRA_FUSION = [2, 3, 4, 5, 6];
const DEFAULT_EXTRA_XYZ = [2, 3, 4, 5, 6];

function App() {
  const { t, i18n } = useTranslation();

  const getInitialView = () => {
    const path = window.location.pathname;
    if (path.includes('/extra')) return 'extra';
    if (path.includes('/banished')) return 'banished';
    if (path.includes('/help')) return 'help';
    if (path.includes('/about')) return 'about';
    return 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView);

  const navigate = (view) => {
    setCurrentView(view);
    const basePath = '/simultaneous-equation-cannons-calculator/';
    const newPath = view === 'home' ? basePath : `${basePath}${view}`;
    window.history.pushState({ view }, '', newPath);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // State for Deck Configuration
  const [extraFusion, setExtraFusion] = useState(() => {
    const saved = localStorage.getItem('sec_extra_fusion');
    return saved ? JSON.parse(saved) : DEFAULT_EXTRA_FUSION;
  });
  
  const [extraXyz, setExtraXyz] = useState(() => {
    const saved = localStorage.getItem('sec_extra_xyz');
    return saved ? JSON.parse(saved) : DEFAULT_EXTRA_XYZ;
  });
  
  // State for Banished Monsters
  const [banishedFusion, setBanishedFusion] = useState(() => {
    const saved = localStorage.getItem('sec_banished_fusion');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [banishedXyz, setBanishedXyz] = useState(() => {
    const saved = localStorage.getItem('sec_banished_xyz');
    return saved ? JSON.parse(saved) : [];
  });

  // State for PWA Install Prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  // Calculate State Model (Memoized to prevent blocking main thread)
  const secState = useMemo(() => new SimultaneousEquationCannonsState(
    extraFusion,
    extraXyz,
    banishedFusion,
    banishedXyz
  ), [extraFusion, extraXyz, banishedFusion, banishedXyz]);

  // Persistence Effects
  useEffect(() => localStorage.setItem('sec_extra_fusion', JSON.stringify(extraFusion)), [extraFusion]);
  useEffect(() => localStorage.setItem('sec_extra_xyz', JSON.stringify(extraXyz)), [extraXyz]);
  useEffect(() => localStorage.setItem('sec_banished_fusion', JSON.stringify(banishedFusion)), [banishedFusion]);
  useEffect(() => localStorage.setItem('sec_banished_xyz', JSON.stringify(banishedXyz)), [banishedXyz]);

  // Parse URL Parameters for shared setups
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let updated = false;

    if (params.has('fusion')) {
      const f = params.get('fusion').split(',').map(n => parseInt(n)).filter(n => !isNaN(n));
      if (f.length > 0) {
        setExtraFusion(f);
        updated = true;
      }
    }

    if (params.has('xyz')) {
      const x = params.get('xyz').split(',').map(n => parseInt(n)).filter(n => !isNaN(n));
      if (x.length > 0) {
        setExtraXyz(x);
        updated = true;
      }
    }

    if (updated) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleResetBanished = () => {
    setBanishedFusion([]);
    setBanishedXyz([]);
  };

  const handleResetExtraDeck = () => {
    setExtraFusion(DEFAULT_EXTRA_FUSION);
    setExtraXyz(DEFAULT_EXTRA_XYZ);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView secState={secState} onResetBanished={handleResetBanished} onResetExtraDeck={handleResetExtraDeck} />;
      case 'extra':
        return (
          <DeckConfigView 
            title={t('deck.extra_title')} 
            subtitle={t('deck.extra_sub')}
            fusion={extraFusion}
            setFusion={setExtraFusion}
            xyz={extraXyz}
            setXyz={setExtraXyz}
            onSave={() => navigate('home')}
          />
        );
      case 'banished':
        return (
          <DeckConfigView 
            title={t('deck.banished_title')} 
            subtitle={t('deck.banished_sub')}
            fusion={banishedFusion}
            setFusion={setBanishedFusion}
            xyz={banishedXyz}
            setXyz={setBanishedXyz}
            onSave={() => navigate('home')}
            showReset={true}
          />
        );
      case 'help':
        return <HelpView />;
      case 'about':
        return <AboutView />;
      default:
        return <HomeView secState={secState} onResetBanished={handleResetBanished} onResetExtraDeck={handleResetExtraDeck} />;
    }
  };

  return (
    <div className="app-container">
      <nav className="glass-container" id="navbar">
        <div className="logo-container">
          <button className="logo-btn" onClick={() => navigate('home')}>
            <img src={`${import.meta.env.BASE_URL}img/icon.webp`} alt="logo" className="logo-img" />
          </button>
        </div>
        <button 
          className={`nav-bar-url ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => navigate('home')}
        >
          {t('nav.main')}
        </button>
        <button 
          className={`nav-bar-url ${currentView === 'extra' ? 'active' : ''}`}
          onClick={() => navigate('extra')}
        >
          {t('nav.extra')}
        </button>
        <button 
          className={`nav-bar-url ${currentView === 'banished' ? 'active' : ''}`}
          onClick={() => navigate('banished')}
        >
          {t('nav.banished')}
        </button>
        <button 
          className={`nav-bar-url ${currentView === 'help' ? 'active' : ''}`}
          onClick={() => navigate('help')}
        >
          {t('nav.help')}
        </button>
        <button 
          className={`nav-bar-url ${currentView === 'about' ? 'active' : ''}`}
          onClick={() => navigate('about')}
        >
          {t('nav.about')}
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {isInstallable && (
            <button 
              className="nav-bar-url"
              onClick={handleInstallClick}
            >
              {t('nav.install')}
            </button>
          )}
          <select 
            className="nav-bar-url" 
            style={{ backgroundColor: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}
            value={i18n.language ? (i18n.language.includes('zh') ? 'zh-CN' : i18n.language.split('-')[0]) : 'en'}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <option value="en" style={{ color: '#000' }}>English</option>
            <option value="es" style={{ color: '#000' }}>Español</option>
            <option value="zh-CN" style={{ color: '#000' }}>中文</option>
            <option value="hi" style={{ color: '#000' }}>हिन्दी</option>
            <option value="bn" style={{ color: '#000' }}>বাংলা</option>
            <option value="pt" style={{ color: '#000' }}>Português</option>
            <option value="ru" style={{ color: '#000' }}>Русский</option>
            <option value="ja" style={{ color: '#000' }}>日本語</option>
            <option value="de" style={{ color: '#000' }}>Deutsch</option>
            <option value="fr" style={{ color: '#000' }}>Français</option>
            <option value="it" style={{ color: '#000' }}>Italiano</option>
            <option value="ko" style={{ color: '#000' }}>한국어</option>
            <option value="ar" style={{ color: '#000' }}>العربية</option>
            <option value="id" style={{ color: '#000' }}>Bahasa Indonesia</option>
            <option value="ur" style={{ color: '#000' }}>اردو</option>
            <option value="tr" style={{ color: '#000' }}>Türkçe</option>
            <option value="vi" style={{ color: '#000' }}>Tiếng Việt</option>
            <option value="pl" style={{ color: '#000' }}>Polski</option>
            <option value="th" style={{ color: '#000' }}>ไทย</option>
            <option value="nl" style={{ color: '#000' }}>Nederlands</option>
          </select>
        </div>
      </nav>

      <main className="view-enter">
        {renderView()}
      </main>

      <footer className="footer" style={{ marginTop: 'auto', padding: '2rem 0', textAlign: 'center' }}>
        <label htmlFor="author">
          2025 {t('about.created_by', { defaultValue: 'Created by' })} <a href="https://github.com/avogatro/" className="author" id="author" style={{ color: 'var(--color-6)', textDecoration: 'none', fontWeight: 'bold' }}>Avogatro</a>
        </label>
      </footer>
    </div>
  );
}

export default App;
