'use client';

import Link from 'next/link';
import { useLang } from '../../components/Language';

const TEAM = [
  { name: 'Victor Kipkemboi', role: { en: 'Project Lead', sw: 'Kiongozi wa Mradi' }, image: '/Victor.jpg' },
  { name: 'Jose` Barasa', role: { en: 'Fullstack Developer', sw: 'Mtengenezaji wa Fullstack' }, image: '/Yours_truly.jpg' },
  { name: 'Sharon Gichira', role: { en: 'Data Analyst', sw: 'Mchambuzi wa Data' }, image: 'Sharon.jpg' },
  { name: 'Graham Akello', role: { en: 'ML Engineer', sw: 'Mhandisi wa ML' }, image: '/Graham.jpg' },
  { name: 'Maureen Kitonyi', role: { en: 'ML Engineer', sw: 'Mhandisi wa ML' }, image: '/Maureen.jpg' },
  { name: 'Charity Kanyua', role: { en: 'ML Engineer', sw: 'Mhandisi wa ML' }, image: '/Charity.jpg' },
];

const STATS = [
  { value: '41,690', label: { en: 'Data Points', sw: 'Pointi za Data' } },
  { value: '19', label: { en: 'Commodities', sw: 'Bidhaa' } },
  { value: '100+', label: { en: 'Markets', sw: 'Masoko' } },
  { value: '30', label: { en: 'Counties', sw: 'Kaunti' } },
];

const AI_MODELS = [
  {
    title: 'XGBoost',
    desc: {
      en: 'Gradient boosting with lag features. Best for stable commodities with clear price patterns. Trained separately for retail and wholesale prices.',
      sw: 'Msimamo wa gradient na vipengele vya lag. Bora kwa bidhaa thabiti zenye mwenendo wazi wa bei. Imefunzwa tofauti kwa bei za rejareja na jumla.',
    },
    metric: 'Best MAE: 3.32 (Beans Yellow-Green)',
  },
  {
    title: 'LSTM',
    desc: {
      en: 'Long Short-Term Memory neural network. Captures long-term seasonal dependencies. Especially strong on rice, maize flour, and dry onions.',
      sw: 'Mtandao wa neva wa Long Short-Term Memory. Inashikilia utegemezi wa msimu wa muda mrefu. Yenye nguvu hasa kwa mchele, unga wa mahindi, na vitunguu makavu.',
    },
    metric: 'Best MAE: 2.59 (Dry Onions)',
  },
  {
    title: 'SARIMA',
    desc: {
      en: 'Seasonal ARIMA baseline model. Handles trend and seasonality decomposition. Available for commodities with sufficient historical data.',
      sw: 'Mfano wa msingi wa Seasonal ARIMA. Inashughulikia mtengano wa mwenendo na msimu. Inapatikana kwa bidhaa zenye data ya kutosha ya kihistoria.',
    },
    metric: { en: 'Baseline statistical model', sw: 'Mfano wa takwimu wa msingi' },
  },
];

export default function ReviewPage() {
  const { lang } = useLang();

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF6EE' }}>

      
      <div className="relative w-full h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&auto=format&fit=crop"
          alt="Agriculture Kenya"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl font-bold text-white mb-3">
            {lang === 'en' ? 'About This Project' : 'Kuhusu Mradi Huu'}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            {lang === 'en'
              ? "Using AI to bring price transparency to Kenya's agricultural markets"
              : 'Kutumia AI kuleta uwazi wa bei katika masoko ya kilimo ya Kenya'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">

       
        <section className="rounded-2xl shadow p-8 mb-12" style={{ backgroundColor: '#EEF5F0' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A1F1B' }}>
            {lang === 'en' ? 'Project Overview' : 'Muhtasari wa Mradi'}
          </h2>
          {lang === 'en' ? (
            <>
              <p className="leading-relaxed mb-4" style={{ color: '#7A8C7E' }}>
                The Kenya Agricultural Commodity Price Forecasting system is an AI-powered platform
                designed to predict retail and wholesale prices for 19 key agricultural commodities
                across 100+ markets in 30 counties.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: '#7A8C7E' }}>
                Built using data from the Kenya Agricultural Market Information System (KAMIS),
                the platform combines three machine learning models — XGBoost, LSTM, and SARIMA —
                to deliver accurate short and medium-term price forecasts.
              </p>
              <p className="leading-relaxed" style={{ color: '#7A8C7E' }}>
                The goal is to empower farmers, traders, and consumers with actionable price intelligence
                that supports smarter buying, selling, and policy decisions.
              </p>
            </>
          ) : (
            <>
              <p className="leading-relaxed mb-4" style={{ color: '#7A8C7E' }}>
                Mfumo wa Utabiri wa Bei za Bidhaa za Kilimo nchini Kenya ni jukwaa linalotumia AI
                lililoundwa kutabiri bei za rejareja na jumla kwa bidhaa 19 muhimu za kilimo
                katika masoko 100+ katika kaunti 30.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: '#7A8C7E' }}>
                Umejengwa kwa kutumia data kutoka Mfumo wa Habari za Soko la Kilimo la Kenya (KAMIS),
                jukwaa linaunganisha mifano mitatu ya kujifunza kwa mashine — XGBoost, LSTM, na SARIMA —
                kutoa utabiri sahihi wa bei wa muda mfupi na wa kati.
              </p>
              <p className="leading-relaxed" style={{ color: '#7A8C7E' }}>
                Lengo ni kuwawezesha wakulima, wafanyabiashara, na watumiaji kwa ujuzi wa bei unaoweza
                kutumika ambao unasaidia maamuzi bora ya kununua, kuuza, na sera.
              </p>
            </>
          )}
        </section>

       
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {STATS.map((stat) => (
            <div key={stat.label.en} className="rounded-2xl p-6 text-center text-white" style={{ backgroundColor: '#1B3A2D' }}>
              <p className="text-4xl font-bold" style={{ color: '#E8900A' }}>{stat.value}</p>
              <p className="text-sm mt-1" style={{ color: '#4CAF6E' }}>{stat.label[lang]}</p>
            </div>
          ))}
        </section>

       
        <section className="rounded-2xl shadow p-8 mb-12" style={{ backgroundColor: '#EEF5F0' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A1F1B' }}>
            {lang === 'en' ? 'Data Source' : 'Chanzo cha Data'}
          </h2>
          <div className="flex items-start gap-4">
            <span className="text-4xl">🗃️</span>
            <div>
              <h3 className="font-semibold text-lg" style={{ color: '#1A1F1B' }}>
                KAMIS — Kenya Agricultural Market Information System
              </h3>
              <p className="mt-2 leading-relaxed" style={{ color: '#7A8C7E' }}>
                {lang === 'en'
                  ? 'All price data is sourced from KAMIS, which collects weekly retail and wholesale prices from markets across Kenya. The dataset covers January 2024 to February 2026 and includes 41,690 price records aggregated monthly per commodity and market.'
                  : 'Data yote ya bei inatoka KAMIS, ambayo inakusanya bei za rejareja na jumla za kila wiki kutoka masoko kote Kenya. Dataset inashughulikia Januari 2024 hadi Februari 2026 na inajumuisha rekodi 41,690 za bei zilizokusanywa kwa mwezi kwa bidhaa na soko.'}
              </p>
            </div>
          </div>
        </section>

        
        <section className="rounded-2xl shadow p-8 mb-12" style={{ backgroundColor: '#EEF5F0' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A1F1B' }}>
            {lang === 'en' ? 'AI Models Used' : 'Mifano ya AI Iliyotumiwa'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {AI_MODELS.map((model) => (
              <div key={model.title} className="rounded-xl p-5" style={{ backgroundColor: '#FAF6EE' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1A1F1B' }}>{model.title}</h3>
                <p className="text-sm mb-3" style={{ color: '#7A8C7E' }}>{model.desc[lang]}</p>
                <p className="text-xs font-semibold" style={{ color: '#4CAF6E' }}>
                  {typeof model.metric === 'object' ? model.metric[lang] : model.metric}
                </p>
              </div>
            ))}
          </div>
        </section>

       
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#1A1F1B' }}>
            {lang === 'en' ? 'Meet the Team' : 'Kutana na Timu'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="rounded-2xl shadow p-5 text-center" style={{ backgroundColor: '#EEF5F0' }}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                />
                <h3 className="font-semibold text-sm" style={{ color: '#1A1F1B' }}>{member.name}</h3>
                <p className="text-xs mt-1" style={{ color: '#7A8C7E' }}>{member.role[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        
        <section className="rounded-2xl p-10 text-center text-white" style={{ backgroundColor: '#1B3A2D' }}>
          <h2 className="text-2xl font-bold mb-3">
            {lang === 'en' ? 'Explore Price Forecasts' : 'Chunguza Utabiri wa Bei'}
          </h2>
          <p className="mb-6" style={{ color: '#4CAF6E' }}>
            {lang === 'en'
              ? "Get AI-powered predictions for any commodity across Kenya."
              : 'Pata utabiri unaotumia AI kwa bidhaa yoyote kote Kenya.'}
          </p>
          <Link
            href="/forecast"
            className="font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
            style={{ backgroundColor: '#E8900A', color: '#fff' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#c97808'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E8900A'}
          >
            {lang === 'en' ? 'Get Forecast →' : 'Pata Utabiri →'}
          </Link>
        </section>

      </div>
    </main>
  );
}