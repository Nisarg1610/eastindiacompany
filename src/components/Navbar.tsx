'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isDarkBg = scrolled || open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isDarkBg
          ? 'bg-ink/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
          : 'bg-transparent pt-4'
        }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-12' : 'h-14'}`}>

        <Link href="/" className="shrink-0 flex items-center py-1">
          <Image
            src="/logo.png"
            alt="East India Company"
            width={460}
            height={257}
            priority
            unoptimized
            className={`h-7 sm:h-9 w-auto max-w-[160px] sm:max-w-[200px] object-contain transition-all ${isDarkBg ? 'brightness-0 invert opacity-90 hover:opacity-100' : 'opacity-100 hover:opacity-80'}`}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-10 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-all duration-200 ${isDarkBg
                  ? 'text-cream/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                  : 'text-gray-800 hover:text-black hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]'
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle dark={isDarkBg} />
          <a
            href="https://www.eastindiapantry.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full bg-saffron text-white hover:bg-saffron-light hover:scale-105 hover:shadow-[0_0_20px_rgba(255,94,14,0.3)] transition-all duration-300"
          >
            Retail Store <ArrowRight size={16} />
          </a>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle dark={isDarkBg} />
          <button
            className={`p-2 transition-colors ${isDarkBg ? 'text-cream hover:text-white' : 'text-gray-800 hover:text-black'}`}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-ink/95 backdrop-blur-xl border-t border-white/10 px-4 sm:px-6 pb-6 pt-3 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block text-base font-medium text-cream/80 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-colors duration-200"
            >
              {label}
            </Link>
          ))}

          <div className="pt-4 mt-2 border-t border-white/10">
            <a
              href="https://www.eastindiapantry.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-base font-semibold px-5 py-3.5 rounded-xl bg-saffron text-white hover:bg-saffron-light transition-colors duration-200"
            >
              Retail Store <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}