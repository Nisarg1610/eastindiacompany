import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/90 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Main Grid ──────────────────────────────────────────
          mobile:  1 column stacked
          sm:      2 columns (brand spans full, then links | contact)
          lg:      3 columns (brand | links | contact)
      */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                      gap-12 sm:gap-14 lg:gap-16">

        {/* Brand */}
        <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
          <p className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            East India{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-coral">Co.</span>
          </p>
          <p className="text-sm leading-relaxed text-cream/60 max-w-sm">
            Canada's premier wholesale food distributor, restaurant supplier,
            and spice importer, elevating culinary experiences since 1972.
          </p>
          <img
            src="https://cdn.prod.website-files.com/64395635e51864cb5a505982/660c3b159bc442e75f28427c_mark-of-trust-certified-HACCP-GMP-Food-Safety-Management-logo-En-GB-0420.png"
            alt="HACCP GMP Certified"
            className="h-12 sm:h-14 opacity-70 mt-2 w-fit brightness-0 invert"
          />
        </div>

        {/* Site Links */}
        <div className="flex flex-col gap-5 lg:ml-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">
            Site Links
          </p>
          <ul className="flex flex-col gap-3">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-cream/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://www.eastindiapantry.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-cream/60 hover:text-white transition-colors duration-300"
              >
                Retail Store <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">
            Contact
          </p>
          <address className="not-italic flex flex-col gap-4 text-sm text-cream/60">
            <p className="leading-relaxed">
              1630 Trinity Drive, Units 5 &amp; 6<br />
              Mississauga, Ontario<br />
              L5T 1L6
            </p>
            <div className="w-8 h-px bg-white/10" />
            <p className="leading-relaxed">
              Mon&ndash;Fri: 9:30 am &ndash; 6:00 pm<br />
              Sat &amp; Sun: Closed
            </p>
            <a
              href="tel:9052763212"
              className="text-saffron-light hover:text-white transition-colors duration-300 font-semibold text-lg inline-block mt-1"
            >
              905-276-3212
            </a>
          </address>
        </div>

      </div>

      {/* ── Bottom Bar ─────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6
                        flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-cream/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} East India Company. All rights reserved.
          </p>
          <p className="text-xs font-medium text-cream/40 text-center sm:text-right">
            Mississauga, Ontario, Canada
          </p>
        </div>
      </div>

    </footer>
  );
}