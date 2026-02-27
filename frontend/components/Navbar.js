'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/forecast', label: 'Forecast' },
    { href: '/review', label: 'About' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
       
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-bold text-green-700 text-lg">Utabiri Agro </span>
        </Link>

        
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-green-700 border-b-2 border-green-700 pb-1'
                  : 'text-gray-500 hover:text-green-700'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/forecast"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200"
          >
            Get Forecast
          </Link>
        </div>
      </div>
    </nav>
  );
}