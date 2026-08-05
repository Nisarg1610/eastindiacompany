'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Award, BadgeDollarSign, Calendar, Globe } from 'lucide-react';
import AnimatedReveal from './AnimatedReveal';
import FallingParticles from '../Fallingparticles';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
  { icon: Calendar, title: 'Years of Trust', text: 'Trusted since 1972', stat: 50, color: '#FF5E0E' }, // saffron
  { icon: Award, title: 'High Quality', text: 'Fresh, additive-free spices', color: '#FF2E63' }, // coral
  { icon: Globe, title: 'Global Sourcing', text: 'Products from around the world', color: '#8A2BE2' }, // cardamom
  { icon: BadgeDollarSign, title: 'Great Prices', text: 'Competitive wholesale rates for retailers, restaurants and manufacturers', color: '#2D8B4E' }, // leaf
];

/* ── Counts up from 0 once the stat scrolls into view, driven by GSAP + ScrollTrigger ── */
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const counter = { val: 0 };

      gsap.to(counter, {
        val: value,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = `${Math.round(counter.val)}${suffix}`;
        },
      });
    },
    { scope: ref }
  );

  return <span ref={ref}>0{suffix}</span>;
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobOneRef = useRef<HTMLDivElement>(null);
  const blobTwoRef = useRef<HTMLDivElement>(null);
  const turmericThumbRef = useRef<HTMLDivElement>(null);
  const saffronThumbRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ── Ambient blob drift, timed independently per side ── */
      gsap.to(blobOneRef.current, {
        x: 26,
        y: -18,
        scale: 1.08,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(blobTwoRef.current, {
        x: -20,
        y: 22,
        scale: 0.92,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });

      /* ── Floating spice thumbnails ── */
      gsap.to(turmericThumbRef.current, {
        y: -12,
        rotate: 6,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(saffronThumbRef.current, {
        y: 10,
        rotate: -8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });

      /* ── Staggered list items reveal ── */
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.editorial-list-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative bg-parchment overflow-hidden">

      {/* ── Ambient decoration ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={blobOneRef} className="absolute -left-24 w-80 rounded-full bg-saffron/15 blur-3xl" />
        <div ref={blobTwoRef} className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-cardamom/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)',
          }}
        />


        <div
          ref={saffronThumbRef}
          className="hidden md:block absolute bottom-16 left-[5%] w-12 h-12 rounded-full overflow-hidden opacity-70"
        >
          <Image src="/saffron.jpg" alt="" fill sizes="48px" className="object-cover rounded-full" />
        </div>

        <FallingParticles count={10} />
      </div>

      <div className="relative z-10 pb-10 sm:pb-40">
        <div className="max-w-7xl mx-auto px-11 sm:px-10 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start pt-10">

          {/* ── Left Column: Intro Text ── */}
          <div className="lg:w-5/12 lg:sticky lg:top-32">
            <AnimatedReveal>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-saffron mb-6">
                <span className="w-6 h-px bg-saffron" />
                Since 1972
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-ink mb-6 leading-[1.1]"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                Your Trusted <br />
                <span className="italic text-saffron">Wholesale</span> Partner
              </h2>
              <p className="text-stone leading-relaxed text-lg mb-10 max-w-md">
                We supply food retailers, wholesalers, restaurant suppliers, and food
                manufacturers with everything from Black Pepper and Basmati Rice to
                Spanish Saffron and custom spice blends — all at excellent prices.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-saffron font-bold uppercase tracking-widest text-sm hover:text-ink transition-colors duration-300 group"
              >
                Contact for Inquiries
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </AnimatedReveal>
          </div>

          {/* ── Right Column: Editorial Unboxed List ── */}
          <div className="lg:w-7/12 w-full pt-8 lg:pt-0" ref={listRef}>
            <div className="flex flex-col border-t border-ink/10">

              {/* Primary Stat Item */}
              <div className="editorial-list-item py-10 border-b border-ink/10 flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-center">
                <div className="w-16 h-16 shrink-0 flex items-center justify-center text-saffron">
                  <Calendar size={36} strokeWidth={1.5} />
                </div>
                <div>
                  <p
                    className="text-6xl sm:text-[5rem] font-bold text-ink leading-none mb-3"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    <Counter value={50} suffix="+" />
                  </p>
                  <p className="text-stone/90 text-lg sm:text-xl font-medium tracking-wide">
                    Years supplying quality spices across Canada
                  </p>
                </div>
              </div>

              {/* Secondary Feature Items */}
              {features.slice(1).map((feature, i) => (
                <div
                  key={feature.title}
                  className="editorial-list-item py-8 border-b border-ink/10 flex gap-6 sm:gap-10 items-start sm:items-center group"
                >
                  <div
                    className="w-16 h-16 shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                    style={{ color: feature.color }}
                  >
                    <feature.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-ink mb-2"
                      style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-stone/90 text-base sm:text-lg">
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}