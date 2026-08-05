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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-500 ease-in-out flex justify-center ${scrolled ? 'top-2 px-4' : 'top-0 px-0'
        }`}
    >
      <div
        className={`w-full transition-all duration-500 ease-in-out ${scrolled
          ? 'max-w-5xl rounded-full bg-white/70 dark:bg-ink/70 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-lg'
          : 'max-w-7xl bg-transparent border-transparent'
          }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center transition-transform hover:scale-105">
            <Image
              src="/logocut.jpg"
              alt="East India Company"
              width={460}
              height={257}
              priority
              unoptimized
              className="h-7 sm:h-8 w-auto max-w-[140px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-semibold text-gray-700 dark:text-cream/90 hover:text-saffron dark:hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href="https://www.eastindiapantry.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full bg-saffron text-white hover:bg-saffron-light shadow-md hover:shadow-saffron/30 transition-all"
            >
              Retail Store
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-1.5 text-gray-700 dark:text-cream hover:text-saffron dark:hover:text-white transition-colors"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-4 right-4 mt-2 md:hidden overflow-hidden transition-all duration-300 ease-in-out origin-top ${open ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          }`}
      >
        <div className="bg-white/95 dark:bg-ink/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-xl p-3 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-800 dark:text-cream/90 hover:bg-gray-100 dark:hover:bg-white/5 px-4 py-2.5 rounded-xl transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 mt-1 border-t border-gray-200 dark:border-white/10">
            <a
              href="https://www.eastindiapantry.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-sm font-semibold px-5 py-2.5 rounded-xl bg-saffron text-white hover:bg-saffron-light transition-colors"
            >
              Retail Store <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}