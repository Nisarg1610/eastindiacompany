'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import AnimatedReveal from './AnimatedReveal';

export default function ContactSection() {
  return (
    // 1. Added `relative` and removed `bg-cream`
    <section className="relative py-16 sm:py-24 border-t border-linen">

      {/* Background Image Container */}
      <div className="absolute inset-0 pointer-events-none -z-10 select-none">
        <Image
          src="/texture2.jpg" /* <-- Ensure this file exists in your /public folder */
          alt="Base Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* 2. Added `relative z-10` to keep content above the background image */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">

          <AnimatedReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Delivery, Pickup &amp; Contact
            </h2>
            <p className="text-stone leading-relaxed mb-8">
              Fast shipping for small or bulk orders, pallet and container options
              for wholesale, and convenient pickup at our Mississauga location.
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={0.1}>
            <div className="inline-flex flex-col sm:flex-row gap-6 sm:gap-10 text-left bg-white rounded-2xl border border-linen p-6 sm:p-8 mb-8 w-full sm:w-auto">
              <div className="flex gap-3">
                <MapPin size={20} className="text-saffron shrink-0 mt-0.5" />
                <address className="not-italic text-sm text-stone leading-relaxed">
                  1630 Trinity Drive, Units 5 &amp; 6<br />
                  Mississauga, ON L5T 1L6
                </address>
              </div>
              <div className="flex gap-3">
                <Phone size={20} className="text-saffron shrink-0 mt-0.5" />
                <div className="text-sm text-stone">
                  <a
                    href="tel:9052763212"
                    className="font-semibold text-charcoal hover:text-saffron transition-colors"
                  >
                    905-276-3212
                  </a>
                  <p className="mt-1">Mon–Fri: 9:30 am – 6:00 pm</p>
                </div>
              </div>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.15}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-saffron text-cream font-semibold text-sm hover:bg-saffron-dark transition-colors"
            >
              Get In Touch
              <ArrowRight size={16} />
            </Link>
          </AnimatedReveal>

        </div>
      </div>
    </section>
  );
}