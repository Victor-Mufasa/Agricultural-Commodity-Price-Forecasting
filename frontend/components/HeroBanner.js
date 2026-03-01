'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLang } from './Language';

function CountUp({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const isPlus = String(target).includes('+');
          const numeric = parseInt(String(target).replace('+', ''));
          const startTime = performance.now();

          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * numeric);
            setCount(isPlus ? `${current}+` : current);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function HeroBanner() {
  const { t } = useLang();

  return (
    <div className="relative w-full h-screen overflow-hidden -mt-[60px]">
      <img
        src="/pexels-arifulhb-3560020.jpg"
        alt="Kenya Agriculture"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {[
            { value: '19', label: t.commodities_label },
            { value: '100+', label: t.markets_label },
            { value: '30', label: t.counties_label },
            { value: '3', label: t.ai_models_label },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold" style={{ color: '#E8900A' }}>
                <CountUp target={stat.value} />
              </p>
              <p className="text-gray-300 text-sm mt-1 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        
        <span
          className="text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6"
          style={{ backgroundColor: '#1B3A2D' }}
        >
          {t.hero_badge}
        </span>

        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mb-6">
          {t.hero_title_1}{' '}
          <span style={{ color: '#4CAF6E' }}>{t.hero_title_2}</span>{' '}
          {t.hero_title_3}
        </h1>

       
        <p className="text-gray-300 text-lg max-w-2xl mb-10">{t.hero_sub}</p>

        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/forecast"
            className="text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-200 text-base"
            style={{ backgroundColor: '#1B3A2D' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d6e3e'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1B3A2D'}
          >
            {t.get_forecast_btn}
          </Link>
          <Link
            href="/review"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-200 text-base border border-white/30"
          >
            {t.learn_more}
          </Link>
        </div>
      </div>
    </div>
  );
}