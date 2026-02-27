'use client';

export default function ForecastTable({ data, priceType }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No forecast data available
      </div>
    );
  }

  
  const getTrend = (current, previous) => {
    if (!previous) return null;
    const change = ((current - previous) / previous) * 100;
    if (current > previous) return {
      label: `↑ ${change.toFixed(1)}%`,
      color: 'text-red-500'
    };
    if (current < previous) return {
      label: `↓ ${Math.abs(change).toFixed(1)}%`,
      color: 'text-green-600'
    };
    return { label: '→ Stable', color: 'text-gray-400' };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3 px-4 text-gray-500 font-medium">#</th>
            <th className="py-3 px-4 text-gray-500 font-medium">Month</th>
            <th className="py-3 px-4 text-gray-500 font-medium">{priceType} Price (KES)</th>
            <th className="py-3 px-4 text-gray-500 font-medium">Change</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const prev = index > 0 ? data[index - 1].price : null;
            const trend = getTrend(row.price, prev);
            const date = new Date(row.date);
            const formattedDate = date.toLocaleDateString('en-KE', {
              month: 'long',
              year: 'numeric',
            });

            return (
              <tr
                key={row.date}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-400">{index + 1}</td>
                <td className="py-3 px-4 text-gray-700 font-medium">{formattedDate}</td>
                <td className="py-3 px-4 text-gray-800 font-semibold">
                  KES {row.price.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className={`py-3 px-4 font-medium ${trend?.color}`}>
                  {trend?.label || '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}