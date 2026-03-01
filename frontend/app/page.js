'use client';

import Link from 'next/link';
import HeroBanner from '../components/HeroBanner';

const COMMODITIES = [
  { name: 'Dry Maize', image: 'https://cdn.britannica.com/36/167236-050-BF90337E/Ears-corn.jpg' },
  { name: 'Rice', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz038ws4PTCrJgZF8DrkaDZMystXvPm7CEEw&s' },
  { name: 'Wheat', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop' },
  { name: 'Cabbages', image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&auto=format&fit=crop' },
  { name: 'Dry Onions', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop' },
  { name: 'Kales/Sukuma Wiki', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop' },
  { name: 'Spinach', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop' },
  { name: 'Meat Beef', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&auto=format&fit=crop' },
  { name: 'Maize Flour', image: 'https://kenyanwallstreet.com/_next/image?url=https%3A%2F%2Fassets.kenyanwallstreet.com%2Fassets%2F1ca57723-562a-4125-9f9b-7c15f59749dc%2F1ca57723-562a-4125-9f9b-7c15f59749dc.jpg%3Fkey%3Dlarge-avif&w=3840&q=75' },
  { name: 'Beans (Yellow-Green)', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn5alW-R8SqmKF1Mfvm417stVWk-hNgZMSQQ&s' },
  { name: 'Cowpeas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfKaZO048MOYXcFNoFariRYfaqAB3engTIWw&s' },
  { name: 'Banana (Cooking)', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop' },
];

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF6EE' }}>

      <HeroBanner />

      {/* Commodities Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold" style={{ color: '#1A1F1B' }}>Tracked Commodities</h2>
          <p className="mt-2" style={{ color: '#7A8C7E' }}>Click on a commodity to view its price forecast</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {COMMODITIES.map((commodity) => (
            <Link
              key={commodity.name}
              href={`/forecast?commodity=${encodeURIComponent(commodity.name)}`}
              className="group rounded-2xl overflow-hidden transition-all duration-200"
              style={{ backgroundColor: '#EEF5F0', boxShadow: '0 2px 8px rgba(27,58,45,0.08)' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(27,58,45,0.18)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(27,58,45,0.08)'}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={commodity.image}
                  alt={commodity.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-200" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm" style={{ color: '#1A1F1B' }}>{commodity.name}</h3>
                <p className="text-xs mt-1 font-medium" style={{ color: '#E8900A' }}>View Forecast →</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/forecast"
            className="font-semibold px-8 py-3.5 rounded-xl transition-colors duration-200 text-white"
            style={{ backgroundColor: '#1B3A2D' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d6e3e'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1B3A2D'}
          >
            View All Commodities →
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16" style={{ backgroundColor: '#EEF5F0' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold" style={{ color: '#1A1F1B' }}>How It Works</h2>
            <p className="mt-2" style={{ color: '#7A8C7E' }}>Powered by Powerful AI models working together</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[].map((model) => (
              <div key={model.title} className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#FAF6EE' }}>
                <p className="text-5xl mb-4">{model.icon}</p>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1A1F1B' }}>{model.title}</h3>
                <p className="text-sm" style={{ color: '#7A8C7E' }}>{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center" style={{ backgroundColor: '#1B3A2D' }}>
        <h2 className="text-3xl font-bold text-white mb-4">Make Smarter Decisions?</h2>
        <p className="mb-8 max-w-xl mx-auto" style={{ color: '#4CAF6E' }}>
          Get AI-powered price forecasts for any commodity across Kenya's markets.
        </p>
        <Link
          href="/forecast"
          className="font-semibold px-8 py-3.5 rounded-xl transition-colors duration-200"
          style={{ backgroundColor: '#E8900A', color: '#fff' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#c97808'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E8900A'}
        >
          Get Started →
        </Link>
      </section>

    </main>
  );
}