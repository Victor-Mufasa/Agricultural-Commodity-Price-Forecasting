'use client';

import { useLang } from './Language';

export default function ForecastTable({ data, priceType }) {
  const { lang } = useLang();

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8" style={{ color: '#7A8C7E' }}>
        {lang === 'en' ? 'No forecast data available' : 'Hakuna data ya utabiri inayopatikana'}
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
    return {
      label: lang === 'en' ? '→ Stable' : '→ Thabiti',
      color: 'text-gray-400'
    };
  };

  const priceLabel = priceType === 'Retail'
    ? (lang === 'en' ? 'Retail' : 'Rejareja')
    : (lang === 'en' ? 'Wholesale' : 'Jumla');

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b" style={{ borderColor: '#d4e6d9' }}>
            <th className="py-3 px-4 font-medium" style={{ color: '#7A8C7E' }}>#</th>
            <th className="py-3 px-4 font-medium" style={{ color: '#7A8C7E' }}>
              {lang === 'en' ? 'Month' : 'Mwezi'}
            </th>
            <th className="py-3 px-4 font-medium" style={{ color: '#7A8C7E' }}>
              {priceLabel} {lang === 'en' ? 'Price (KES)' : 'Bei (KES)'}
            </th>
            <th className="py-3 px-4 font-medium" style={{ color: '#7A8C7E' }}>
              {lang === 'en' ? 'Change' : 'Mabadiliko'}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const prev = index > 0 ? data[index - 1].price : null;
            const trend = getTrend(row.price, prev);
            const date = new Date(row.date);
            const formattedDate = date.toLocaleDateString(
              lang === 'en' ? 'en-KE' : 'sw-KE',
              { month: 'long', year: 'numeric' }
            );

            return (
              <tr
                key={row.date}
                className="border-b transition-colors"
                style={{ borderColor: '#eef5f0' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EEF5F0'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td className="py-3 px-4" style={{ color: '#7A8C7E' }}>{index + 1}</td>
                <td className="py-3 px-4 font-medium" style={{ color: '#1A1F1B' }}>{formattedDate}</td>
                <td className="py-3 px-4 font-semibold" style={{ color: '#1B3A2D' }}>
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