'use client';

export default function ForecastSummary({ historical, forecast, priceType }) {
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

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-KE', {
      month: 'short',
      year: 'numeric',
    });
  };

  const formatPrice = (price) => {
    return `KES ${price.toLocaleString('en-KE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

      
      {currentAvg && (
        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-blue-500">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Current Avg {priceType} Price</p>
          <p className="text-2xl font-bold text-gray-800">{formatPrice(currentAvg)}</p>
          <p className="text-xs text-gray-400 mt-1">Based on last 3 months</p>
        </div>
      )}

      
      <div className={`bg-white rounded-2xl shadow p-5 border-l-4 ${overallChange >= 0 ? 'border-red-400' : 'border-green-500'}`}>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Forecast Trend</p>
        <p className={`text-2xl font-bold ${overallChange >= 0 ? 'text-red-500' : 'text-green-600'}`}>
          {overallChange >= 0 ? '↑' : '↓'} {Math.abs(overallChange).toFixed(1)}%
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Over {forecast.length} month{forecast.length > 1 ? 's' : ''}
        </p>
      </div>

      
      <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-red-400">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Highest Forecast</p>
        <p className="text-2xl font-bold text-gray-800">{formatPrice(highest.price)}</p>
        <p className="text-xs text-gray-400 mt-1">{formatDate(highest.date)}</p>
      </div>

      
      <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-green-500">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Lowest Forecast</p>
        <p className="text-2xl font-bold text-gray-800">{formatPrice(lowest.price)}</p>
        <p className="text-xs text-gray-400 mt-1">{formatDate(lowest.date)}</p>
      </div>

    </div>
  );
}