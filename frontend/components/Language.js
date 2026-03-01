
'use client';

import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    home: 'Home',
    forecast: 'Forecast',
    about: 'About',
    getforecast: 'Get Forecast',
    hero_badge: 'AI-Powered Agricultural Forecasting',
    hero_title_1: "Know Tomorrow's",
    hero_title_2: 'Crop Prices',
    hero_title_3: 'Today',
    hero_sub: "Real-time market intelligence and AI-powered price forecasts for Kenya's agricultural commodities. Empowering farmers, traders, and consumers with data-driven decisions.",
    get_forecast_btn: 'Get Price Forecast →',
    learn_more: 'Learn More',
    commodities_label: 'Commodities',
    markets_label: 'Markets',
    counties_label: 'Counties',
    ai_models_label: 'AI Models',
    tracked: 'Tracked Commodities',
    tracked_sub: 'Click on a commodity to view its price forecast',
    view_forecast: 'View Forecast →',
    view_all: 'View All Commodities →',
    how_it_works: 'How It Works',
    how_sub: 'Powered by powerful AI models working together',
    cta_title: 'Make Smarter Decisions',
    cta_sub: "Get AI-powered price forecasts for any commodity across Kenya's markets.",
    get_started: 'Get Started →',
  },
  sw: {
    home: 'Nyumbani',
    forecast: 'Utabiri',
    about: 'Kuhusu',
    getforecast: 'Pata Utabiri',
    hero_badge: 'Utabiri wa Kilimo kwa AI',
    hero_title_1: 'Jua Bei ya Mazao',
    hero_title_2: 'Kesho',
    hero_title_3: 'Leo',
    hero_sub: 'Ujuzi wa soko la wakati halisi na utabiri wa bei unaotumia AI kwa bidhaa za kilimo nchini Kenya. Kuwawezesha wakulima, wafanyabiashara, na watumiaji kufanya maamuzi sahihi.',
    get_forecast_btn: 'Pata Utabiri wa Bei →',
    learn_more: 'Jifunze Zaidi',
    commodities_label: 'Bidhaa',
    markets_label: 'Masoko',
    counties_label: 'Kaunti',
    ai_models_label: 'Mifano ya AI',
    tracked: 'Bidhaa Zinazofuatiliwa',
    tracked_sub: 'Bonyeza bidhaa kuona utabiri wa bei yake',
    view_forecast: 'Ona Utabiri →',
    view_all: 'Ona Bidhaa Zote →',
    how_it_works: 'Jinsi Inavyofanya Kazi',
    how_sub: 'Inayoendeshwa na mifano ya AI yenye nguvu',
    cta_title: 'Fanya Maamuzi Bora',
    cta_sub: 'Pata utabiri wa bei unaotumia AI kwa bidhaa yoyote katika masoko ya Kenya.',
    get_started: 'Anza Sasa →',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const toggle = () => setLang((l) => (l === 'en' ? 'sw' : 'en'));
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}