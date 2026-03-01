'use client';

import { useLang } from './Language';

export default function ForecastSummary({ historical, forecast, priceType }) {
  const { lang } = useLang();

  if (!forecast || forecast.length === 0) return null;

  const recentHistorical = historical.slice(-3);
  const currentAvg = recentHistorical.length > 0
    ? recentHistorical.reduce((sum, d) => sum + d.price, 0) / recentHistorical.length
    : null;

  const highest = forecast.reduce((max, d) => d.price > max.price ? d : max, forecast[0]);
  const lowest = forecast.reduce((min, d) => d.price < min.price ? d : min, forecast[0]);

  const firstPrice = forecast[0].price;
  const lastPrice = forecast[forecast.length - 1].price;
  const overallChange = ((lastPrice - firstPrice) / firstPrice) * 100;

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString(lang === 'en' ? 'en-KE' : 'sw-KE', {
    month: 'short', year: 'numeric',
  });

  const formatPrice = (price) => `KES ${price.toLocaleString('en-KE', {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  })}`;

  const priceLabel = priceType === 'Retail'
    ? (lang === 'en' ? 'Retail' : 'Rejareja')
    : (lang === 'en' ? 'Wholesale' : 'Jumla');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

      {currentAvg && (
        <div className="rounded-2xl shadow p-5 border-l-4 border-blue-500" style={{ backgroundColor: '#EEF5F0' }}>
          <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#7A8C7E' }}>
            {lang === 'en' ? `Current Avg ${priceLabel} Price` : `Bei ya Wastani ya ${priceLabel} Sasa`}
          </p>
          <p className="text-2xl font-bold" style={{ color: '#1A1F1B' }}>{formatPrice(currentAvg)}</p>
          <p className="text-xs mt-1" style={{ color: '#7A8C7E' }}>
            {lang === 'en' ? 'Based on last 3 months' : 'Kulingana na miezi 3 iliyopita'}
          </p>
        </div>
      )}

      <div className={`rounded-2xl shadow p-5 border-l-4 ${overallChange >= 0 ? 'border-red-400' : 'border-green-500'}`} style={{ backgroundColor: '#EEF5F0' }}>
        <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#7A8C7E' }}>
          {lang === 'en' ? 'Forecast Trend' : 'Mwenendo wa Utabiri'}
        </p>
        <p className={`text-2xl font-bold ${overallChange >= 0 ? 'text-red-500' : 'text-green-600'}`}>
          {overallChange >= 0 ? '↑' : '↓'} {Math.abs(overallChange).toFixed(1)}%
        </p>
        <p className="text-xs mt-1" style={{ color: '#7A8C7E' }}>
          {lang === 'en'
            ? `Over ${forecast.length} month${forecast.length > 1 ? 's' : ''}`
            : `Katika miezi ${forecast.length}`}
        </p>
      </div>

      <div className="rounded-2xl shadow p-5 border-l-4 border-red-400" style={{ backgroundColor: '#EEF5F0' }}>
        <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#7A8C7E' }}>
          {lang === 'en' ? 'Highest Forecast' : 'Utabiri wa Juu'}
        </p>
        <p className="text-2xl font-bold" style={{ color: '#1A1F1B' }}>{formatPrice(highest.price)}</p>
        <p className="text-xs mt-1" style={{ color: '#7A8C7E' }}>{formatDate(highest.date)}</p>
      </div>

      <div className="rounded-2xl shadow p-5 border-l-4 border-green-500" style={{ backgroundColor: '#EEF5F0' }}>
        <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#7A8C7E' }}>
          {lang === 'en' ? 'Lowest Forecast' : 'Utabiri wa Chini'}
        </p>
        <p className="text-2xl font-bold" style={{ color: '#1A1F1B' }}>{formatPrice(lowest.price)}</p>
        <p className="text-xs mt-1" style={{ color: '#7A8C7E' }}>{formatDate(lowest.date)}</p>
      </div>

    </div>
  );
}