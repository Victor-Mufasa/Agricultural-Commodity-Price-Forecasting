'use client';

import { useState, useEffect } from 'react';
import { getCommodities, getCounties, getMarkets, getModelAvailability, getHistoricalPrices, getForecast } from '../lib/api';
import PriceChart from '../components/PriceChart';
import ForecastTable from '../components/ForecastTable';
import Selector from '../components/Selector';

export default function Home() {

  // ── Dropdown data ──
  const [commodities, setCommodities] = useState([]);
  const [counties, setCounties] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [availability, setAvailability] = useState({});

  // ── User selections ──
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedPriceType, setSelectedPriceType] = useState('Retail');
  const [selectedModel, setSelectedModel] = useState('xgb');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [selectedSteps, setSelectedSteps] = useState(6);

  // ── Data ──
  const [historical, setHistorical] = useState([]);
  const [forecast, setForecast] = useState([]);

  // ── UI state ──
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // ── Load dropdowns on mount ──
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
        setError('Failed to load data. Is the Flask server running?');
      }
    };
    loadDropdowns();
  }, []);

  // ── When county changes, filter markets ──
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

  // ── Check which models are available for selected commodity ──
  const availableModels = availability[selectedCommodity] || {};
  const modelOptions = [
    { value: 'xgb', label: 'XGBoost', key: `xgb_${selectedPriceType.toLowerCase()}` },
    { value: 'lstm', label: 'LSTM', key: `lstm_${selectedPriceType.toLowerCase()}` },
    { value: 'sarima', label: 'SARIMA', key: `sarima_${selectedPriceType.toLowerCase()}` },
  ].filter(m => availableModels[m.key]);

  // ── Fetch data ──
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
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Combined chart data ──
  const chartData = [
    ...historical.map(d => ({ date: d.date, historical: d.price })),
    ...forecast.map(d => ({ date: d.date, forecast: d.price })),
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <div className="bg-green-700 text-white py-8 px-6 shadow-md">
        <h1 className="text-3xl font-bold">🌾 Kenya Agricultural Price Forecasting</h1>
        <p className="text-green-200 mt-1">Historical prices and AI-powered forecasts for agricultural commodities</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Options</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Selector
              label="Commodity"
              value={selectedCommodity}
              onChange={setSelectedCommodity}
              options={commodities.map(c => ({ value: c, label: c }))}
            />

            <Selector
              label="Price Type"
              value={selectedPriceType}
              onChange={setSelectedPriceType}
              options={[
                { value: 'Retail', label: 'Retail' },
                { value: 'Wholesale', label: 'Wholesale' },
              ]}
            />

            <Selector
              label="Forecast Model"
              value={selectedModel}
              onChange={setSelectedModel}
              options={modelOptions.map(m => ({ value: m.value, label: m.label }))}
            />

            <Selector
              label="County (optional)"
              value={selectedCounty}
              onChange={handleCountyChange}
              options={[{ value: '', label: 'All Counties' }, ...counties.map(c => ({ value: c, label: c }))]}
            />

            <Selector
              label="Market (optional)"
              value={selectedMarket}
              onChange={setSelectedMarket}
              options={[{ value: '', label: 'All Markets' }, ...markets.map(m => ({ value: m, label: m }))]}
            />

            <Selector
              label="Forecast Horizon"
              value={selectedSteps}
              onChange={(v) => setSelectedSteps(Number(v))}
              options={[
                { value: 3, label: '3 Months' },
                { value: 6, label: '6 Months' },
                { value: 12, label: '12 Months' },
                { value: 24, label: '24 Months' },
              ]}
            />
          </div>

          <button
            onClick={handleFetch}
            disabled={loading || !selectedCommodity}
            className="mt-6 w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors duration-200"
          >
            {loading ? 'Loading...' : 'Get Forecast'}
          </button>

          {error && (
            <p className="mt-4 text-red-500 text-sm">{error}</p>
          )}
        </div>

        {/* ── Results ── */}
        {hasSearched && !loading && (
          <>
            {/* Summary */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedCommodity} — {selectedPriceType} Price
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Showing historical data and {selectedSteps}-month forecast using {selectedModel.toUpperCase()}
                {selectedCounty && ` in ${selectedCounty}`}
                {selectedMarket && ` — ${selectedMarket}`}
              </p>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
              <h3 className="text-md font-semibold text-gray-600 mb-4">Price Trend & Forecast</h3>
              <PriceChart data={chartData} />
            </div>

            {/* Forecast Table */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-md font-semibold text-gray-600 mb-4">Forecasted Prices (KES)</h3>
              <ForecastTable data={forecast} priceType={selectedPriceType} />
            </div>
          </>
        )}

        {/* ── Empty state ── */}
        {!hasSearched && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🌽</p>
            <p className="text-lg">Select a commodity and click <strong>Get Forecast</strong> to begin</p>
          </div>
        )}
      </div>
    </main>
  );
}