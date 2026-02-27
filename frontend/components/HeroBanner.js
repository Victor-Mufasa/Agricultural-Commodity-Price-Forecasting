'use client';

import Link from 'next/link';

export default function HeroBanner() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
     
      <img
        src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&auto=format&fit=crop"
        alt="Kenya Agriculture"
        className="absolute inset-0 w-full h-full object-cover"
      />

     
      <div className="absolute inset-0 bg-black/55" />

      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <span className="bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
          AI-Powered Agricultural Forecasting
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mb-6">
          Know Tomorrow's <span className="text-green-400">Crop Prices</span> Today
        </h1>

        <p className="text-gray-300 text-lg max-w-2xl mb-10">
          Real-time market intelligence and AI-powered price forecasts for Kenya's agricultural commodities. 
          Empowering farmers, traders, and consumers with data-driven decisions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/forecast"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-200 text-base"
          >
            Get Price Forecast →
          </Link>
          <Link
            href="/review"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-200 text-base border border-white/30"
          >
            Learn More
          </Link>
        </div>

      
        <div className="flex flex-wrap justify-center gap-8 mt-14">
          {[
            { value: '19', label: 'Commodities' },
            { value: '100+', label: 'Markets' },
            { value: '30', label: 'Counties' },
            { value: '3', label: 'AI Models' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-green-400">{stat.value}</p>
              <p className="text-gray-300 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}