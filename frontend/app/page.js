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
  { name: 'Maize Flour', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop' },
  { name: 'Beans (Yellow-Green)', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn5alW-R8SqmKF1Mfvm417stVWk-hNgZMSQQ&s' },
  { name: 'Cowpeas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfKaZO048MOYXcFNoFariRYfaqAB3engTIWw&s' },
  { name: 'Banana (Cooking)', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      
      <HeroBanner />

     
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Tracked Commodities</h2>
          <p className="text-gray-500 mt-2">Click on a commodity to view its price forecast</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {COMMODITIES.map((commodity) => (
            <Link
              key={commodity.name}
              href={`/forecast?commodity=${encodeURIComponent(commodity.name)}`}
              className="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-200 bg-white"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={commodity.image}
                  alt={commodity.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-sm">{commodity.name}</h3>
                <p className="text-green-600 text-xs mt-1">View Forecast →</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/forecast"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-200"
          >
            View All Commodities →
          </Link>
        </div>
      </section>

      
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
            <p className="text-gray-500 mt-2">Powered by Powerful AI models working together</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              
            ].map((model) => (
              <div key={model.title} className="text-center p-6 rounded-2xl bg-gray-50">
                <p className="text-5xl mb-4">{model.icon}</p>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{model.title}</h3>
                <p className="text-gray-500 text-sm">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

 
      <section className="bg-green-700 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4"> Make Smarter Decisions?</h2>
        <p className="text-green-200 mb-8 max-w-xl mx-auto">
          Get AI-powered price forecasts for any commodity across Kenya's markets.
        </p>
        <Link
          href="/forecast"
          className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8 py-3.5 rounded-xl transition-colors duration-200"
        >
          Get Started →
        </Link>
      </section>

    </main>
  );
}