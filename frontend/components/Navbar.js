
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLang } from './Language';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';
  const { lang, toggle, t } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = isHome && !scrolled ? 'bg-transparent' : 'shadow-sm';

  const links = [
    { href: '/', label: t.home },
    { href: '/forecast', label: t.forecast },
    { href: '/review', label: t.about },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${navBg}`}
      style={isHome && !scrolled ? {} : { backgroundColor: '#1B3A2D' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-bold text-white text-xl">Utabiri Agro</span>
        </Link>

        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium transition-colors duration-200"
              style={{
                color: pathname === link.href ? '#fff' : '#a8c9b0',
                borderBottom: pathname === link.href ? '2px solid #E8900A' : 'none',
                paddingBottom: pathname === link.href ? '4px' : '0',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-200"
            style={{ backgroundColor: 'transparent', borderColor: '#E8900A', color: '#E8900A' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E8900A'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#E8900A'; }}
          >
            {lang === 'en' ? '🇰🇪 SW' : '🇬🇧 EN'}
          </button>

          <Link
            href="/forecast"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200"
            style={{ backgroundColor: '#E8900A', color: '#fff' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#c97808'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E8900A'}
          >
            {t.getforecast}
          </Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white focus:outline-none">
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3" style={{ backgroundColor: '#0f2318' }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium py-2 transition-colors duration-200"
              style={{
                color: pathname === link.href ? '#fff' : '#a8c9b0',
                borderBottom: pathname === link.href ? '1px solid #E8900A' : 'none',
              }}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggle}
            className="text-xs font-bold px-3 py-2 rounded-lg border w-full text-center"
            style={{ borderColor: '#E8900A', color: '#E8900A' }}
          >
            {lang === 'en' ? '🇰🇪 Switch to Swahili' : '🇬🇧 Switch to English'}
          </button>

          <Link
            href="/forecast"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold px-4 py-2 rounded-xl text-center mt-1 text-white"
            style={{ backgroundColor: '#E8900A' }}
          >
            {t.getforecast}
          </Link>
        </div>
      )}
    </nav>
  );
}