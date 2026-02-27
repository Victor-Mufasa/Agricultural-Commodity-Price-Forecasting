'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-green-700 shadow-sm';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/forecast', label: 'Forecast' },
    { href: '/review', label: 'About' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-bold text-white text-xl">Utabiri Agro</span>
        </Link>

        {/* ── Desktop Links — centered ── */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-white border-b-2 border-white pb-1'
                  : 'text-green-100 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Get Forecast Button ── */}
        <div className="hidden md:block">
          <Link
            href="/forecast"
            className="bg-white hover:bg-green-50 text-green-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200"
          >
            Get Forecast
          </Link>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
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

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-green-800 px-4 pb-4 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-2 transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-white border-b border-white'
                  : 'text-green-200 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/forecast"
            onClick={() => setMenuOpen(false)}
            className="bg-white text-green-700 text-sm font-semibold px-4 py-2 rounded-xl text-center mt-1"
          >
            Get Forecast
          </Link>
        </div>
      )}
    </nav>
  );
}