'use client';

import Link from 'next/link';

const TEAM = [
  {
    name: 'Victor Kipkemboi',
    role: 'Project Lead ',
    image: '/Victor.jpg',
  },
  {
    name: 'Jose` Barasa',
    role: 'Fullstack Developer',
    image: '/Yours_truly.jpg',
  },
  {
    name: 'Sharon Gichira',
    role: 'Data Analyst',
    image: 'Sharon.jpg',
  },
  {
    name: 'Graham Akello',
    role: 'ML Engineer',
    image: '/Graham.jpg',
  },
  {
    name: 'Maureen Kitonyi',
    role: 'ML Engineer',
    image: '/Maureen.jpg',
  },{
    name: 'Charity Kanyua',
    role: 'ML Engineer',
    image: '/Charity.jpg',
  },
];

const STATS = [
  { value: '41,690', label: 'Data Points' },
  { value: '19', label: 'Commodities' },
  { value: '100+', label: 'Markets' },
  { value: '30', label: 'Counties' },
];

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      
      <div className="relative w-full h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&auto=format&fit=crop"
          alt="Agriculture Kenya"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl font-bold text-white mb-3">About This Project</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Using AI to bring price transparency to Kenya's agricultural markets
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">

      
        <section className="bg-white rounded-2xl shadow p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Kenya Agricultural Commodity Price Forecasting system is an AI-powered platform
            designed to predict retail and wholesale prices for 19 key agricultural commodities
            across 100+ markets in 30 counties.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Built using data from the Kenya Agricultural Market Information System (KAMIS),
            the platform combines three machine learning models — XGBoost, LSTM, and SARIMA —
            to deliver accurate short and medium-term price forecasts.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The goal is to empower farmers, traders, and consumers with actionable price intelligence
            that supports smarter buying, selling, and policy decisions.
          </p>
        </section>

       
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-green-700 rounded-2xl p-6 text-center text-white">
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="text-green-200 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        
        <section className="bg-white rounded-2xl shadow p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Source</h2>
          <div className="flex items-start gap-4">
            <span className="text-4xl">🗃️</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">KAMIS — Kenya Agricultural Market Information System</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">
                All price data is sourced from KAMIS, which collects weekly retail and wholesale prices
                from markets across Kenya. The dataset covers January 2024 to February 2026 and includes
                41,690 price records aggregated monthly per commodity and market.
              </p>
            </div>
          </div>
        </section>

        
        <section className="bg-white rounded-2xl shadow p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Models Used</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                
                title: 'XGBoost',
                desc: 'Gradient boosting with lag features. Best for stable commodities with clear price patterns. Trained separately for retail and wholesale prices.',
                metric: 'Best MAE: 3.32 (Beans Yellow-Green)',
              },
              {
            
                title: 'LSTM',
                desc: 'Long Short-Term Memory neural network. Captures long-term seasonal dependencies. Especially strong on rice, maize flour, and dry onions.',
                metric: 'Best MAE: 2.59 (Dry Onions)',
              },
              {
                
                title: 'SARIMA',
                desc: 'Seasonal ARIMA baseline model. Handles trend and seasonality decomposition. Available for commodities with sufficient historical data.',
                metric: 'Baseline statistical model',
              },
            ].map((model) => (
              <div key={model.title} className="bg-gray-50 rounded-xl p-5">
                <p className="text-4xl mb-3">{model.icon}</p>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{model.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{model.desc}</p>
                <p className="text-green-600 text-xs font-semibold">{model.metric}</p>
              </div>
            ))}
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Meet the Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl shadow p-5 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                />
                <h3 className="font-semibold text-gray-800 text-sm">{member.name}</h3>
                <p className="text-gray-400 text-xs mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        
        <section className="bg-green-700 rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Explore Price Forecasts</h2>
          <p className="text-green-200 mb-6">Get AI-powered predictions for any commodity across Kenya.</p>
          <Link
            href="/forecast"
            className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
          >
            Get Forecast →
          </Link>
        </section>

      </div>
    </main>
  );
}