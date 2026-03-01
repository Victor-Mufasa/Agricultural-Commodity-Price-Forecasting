'use client';

import { useState, useEffect } from 'react';
import { getCommodities, getCounties, getMarkets, getModelAvailability, getHistoricalPrices, getForecast } from '../../lib/api';
import PriceChart from '../../components/PriceChart';
import ForecastTable from '../../components/ForecastTable';
import ForecastSummary from '../../components/ForecastSummary';
import Selector from '../../components/Selector';
import { useLang } from '../../components/Language';

export default function ForecastPage() {
  const { t, lang } = useLang();

  const [commodities, setCommodities] = useState([]);
  const [counties, setCounties] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [availability, setAvailability] = useState({});

  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedPriceType, setSelectedPriceType] = useState('Retail');
  const [selectedModel, setSelectedModel] = useState('xgb');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [selectedSteps, setSelectedSteps] = useState(6);

  const [historical, setHistorical] = useState([]);
  const [forecast, setForecast] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [comms, cnties, mkts, avail] = await Promise.all([
          getCommodities(),
          getCounties(),
          getMarkets(),
          getModelAvailability(),
        ]);
        setCommodities(comms);
        setCounties(cnties);
        setMarkets(mkts);
        setAvailability(avail);
        setSelectedCommodity(comms[0] || '');
      } catch (err) {
        setError(lang === 'en'
          ? 'Failed to load data. Is the Flask server running?'
          : 'Imeshindwa kupakia data. Je, seva ya Flask inafanya kazi?');
      }
    };
    loadDropdowns();
  }, []);

  const handleCountyChange = async (county) => {
    setSelectedCounty(county);
    setSelectedMarket('');
    try {
      const filtered = await getMarkets(county || null);
      setMarkets(filtered);
    } catch (err) {
      console.error('Failed to load markets for county:', err);
    }
  };

  const availableModels = availability[selectedCommodity] || {};
  const modelOptions = [
    { value: 'xgb', label: 'XGBoost', key: `xgb_${selectedPriceType.toLowerCase()}` },
    { value: 'lstm', label: 'LSTM', key: `lstm_${selectedPriceType.toLowerCase()}` },
    { value: 'sarima', label: 'SARIMA', key: `sarima_${selectedPriceType.toLowerCase()}` },
  ].filter(m => availableModels[m.key]);

  const handleFetch = async () => {
    if (!selectedCommodity) return;
    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const [hist, fore] = await Promise.all([
        getHistoricalPrices({
          commodity: selectedCommodity,
          priceType: selectedPriceType,
          county: selectedCounty || null,
          market: selectedMarket || null,
        }),
        getForecast({
          commodity: selectedCommodity,
          modelType: selectedModel,
          priceType: selectedPriceType,
          steps: selectedSteps,
        }),
      ]);

      setHistorical(hist.data || []);
      setForecast(fore.data || []);
    } catch (err) {
      setError(err.response?.data?.message || (lang === 'en'
        ? 'Something went wrong. Please try again.'
        : 'Hitilafu imetokea. Tafadhali jaribu tena.'));
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    ...historical.map(d => ({ date: d.date, historical: d.price })),
    ...forecast.map(d => ({ date: d.date, forecast: d.price })),
  ];

  const forecastHorizonOptions = lang === 'en'
    ? [
        { value: 3, label: '3 Months' },
        { value: 6, label: '6 Months' },
        { value: 12, label: '12 Months' },
        { value: 24, label: '24 Months' },
      ]
    : [
        { value: 3, label: 'Miezi 3' },
        { value: 6, label: 'Miezi 6' },
        { value: 12, label: 'Miezi 12' },
        { value: 24, label: 'Miezi 24' },
      ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF6EE' }}>
      <div className="text-white py-8 px-6 shadow-md" style={{ backgroundColor: '#1B3A2D' }}>
        <h1 className="text-3xl font-bold">🌾 {lang === 'en' ? 'Price Forecast' : 'Utabiri wa Bei'}</h1>
        <p className="mt-1" style={{ color: '#4CAF6E' }}>
          {lang === 'en'
            ? "AI-powered price forecasts for Kenya's agricultural commodities"
            : 'Utabiri wa bei unaotumia AI kwa bidhaa za kilimo nchini Kenya'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-2xl shadow p-6 mb-8" style={{ backgroundColor: '#EEF5F0' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#1A1F1B' }}>
            {lang === 'en' ? 'Select Options' : 'Chagua Chaguo'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Selector
              label={lang === 'en' ? 'Commodity' : 'Bidhaa'}
              value={selectedCommodity}
              onChange={setSelectedCommodity}
              options={commodities.map(c => ({ value: c, label: c }))}
            />
            <Selector
              label={lang === 'en' ? 'Price Type' : 'Aina ya Bei'}
              value={selectedPriceType}
              onChange={setSelectedPriceType}
              options={[
                { value: 'Retail', label: lang === 'en' ? 'Retail' : 'Rejareja' },
                { value: 'Wholesale', label: lang === 'en' ? 'Wholesale' : 'Jumla' },
              ]}
            />
            <Selector
              label={lang === 'en' ? 'County (optional)' : 'Kaunti (hiari)'}
              value={selectedCounty}
              onChange={handleCountyChange}
              options={[
                { value: '', label: lang === 'en' ? 'All Counties' : 'Kaunti Zote' },
                ...counties.map(c => ({ value: c, label: c }))
              ]}
            />
            <Selector
              label={lang === 'en' ? 'Market (optional)' : 'Soko (hiari)'}
              value={selectedMarket}
              onChange={setSelectedMarket}
              options={[
                { value: '', label: lang === 'en' ? 'All Markets' : 'Masoko Yote' },
                ...markets.map(m => ({ value: m, label: m }))
              ]}
            />
            <Selector
              label={lang === 'en' ? 'Forecast Horizon' : 'Muda wa Utabiri'}
              value={selectedSteps}
              onChange={(v) => setSelectedSteps(Number(v))}
              options={forecastHorizonOptions}
            />
          </div>

          <button
            onClick={handleFetch}
            disabled={loading || !selectedCommodity}
            className="mt-6 w-full sm:w-auto px-8 py-3 text-white font-semibold rounded-xl transition-colors duration-200"
            style={{ backgroundColor: loading || !selectedCommodity ? '#ccc' : '#1B3A2D' }}
            onMouseEnter={e => { if (!loading && selectedCommodity) e.currentTarget.style.backgroundColor = '#2d6e3e'; }}
            onMouseLeave={e => { if (!loading && selectedCommodity) e.currentTarget.style.backgroundColor = '#1B3A2D'; }}
          >
            {loading
              ? (lang === 'en' ? 'Loading...' : 'Inapakia...')
              : t.getforecast}
          </button>

          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        </div>

        {hasSearched && !loading && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold" style={{ color: '#1A1F1B' }}>
                {selectedCommodity} — {selectedPriceType === 'Retail'
                  ? (lang === 'en' ? 'Retail' : 'Rejareja')
                  : (lang === 'en' ? 'Wholesale' : 'Jumla')} {lang === 'en' ? 'Price' : 'Bei'}
              </h2>
              <p className="text-sm mt-1" style={{ color: '#7A8C7E' }}>
                {lang === 'en'
                  ? `Showing historical data and ${selectedSteps}-month forecast`
                  : `Inaonyesha data ya kihistoria na utabiri wa miezi ${selectedSteps}`}
                {selectedCounty && ` ${lang === 'en' ? 'in' : 'katika'} ${selectedCounty}`}
                {selectedMarket && ` — ${selectedMarket}`}
              </p>
            </div>

            <ForecastSummary historical={historical} forecast={forecast} priceType={selectedPriceType} />

            <div className="rounded-2xl shadow p-6 mb-6" style={{ backgroundColor: '#EEF5F0' }}>
              <h3 className="text-md font-semibold mb-4" style={{ color: '#1A1F1B' }}>
                {lang === 'en' ? 'Price Trend & Forecast' : 'Mwenendo wa Bei na Utabiri'}
              </h3>
              <PriceChart data={chartData} />
            </div>

            <div className="rounded-2xl shadow p-6" style={{ backgroundColor: '#EEF5F0' }}>
              <h3 className="text-md font-semibold mb-4" style={{ color: '#1A1F1B' }}>
                {lang === 'en' ? 'Forecasted Prices (KES)' : 'Bei Zilizotabiriwa (KES)'}
              </h3>
              <ForecastTable data={forecast} priceType={selectedPriceType} />
            </div>
          </>
        )}

        {!hasSearched && (
          <div className="text-center py-20" style={{ color: '#7A8C7E' }}>
           <p className="text-lg">
              {lang === 'en'
                ? <>Select a commodity and click <strong>Get Forecast</strong> to begin</>
                : <>Chagua bidhaa na ubonyeze <strong>Pata Utabiri</strong> kuanza</>}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}