'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FallingParticles from '../Fallingparticles';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Floating spice config ─────────────────────────────────────────────────
   Each item has: src, size (px), position (top/left/right/bottom as %),
   rotation, animation duration, delay, and z-index.
──────────────────────────────────────────────────────────────────────────── */
const FLOATING_SPICES = [


  { id: 'dried-tr', src: '/dried-fruits.jpg', size: 72, style: { top: '20%', right: '7%' }, rotate: -10, duration: 6.5, delay: 1.2, shape: 'circle', parallax: -60 },

  { id: 'nuts-mr', src: '/nuts.jpg', size: 78, style: { top: '55%', right: '1%' }, rotate: -18, duration: 7, delay: 1.5, shape: 'circle', parallax: -90 },


  { id: 'saffron-br', src: '/saffron.jpg', size: 76, style: { bottom: '12%', right: '4%' }, rotate: 20, duration: 7.5, delay: 0.7, shape: 'pill', parallax: 60 },
  { id: 'turmeric-br', src: '/turmeric.jpg', size: 62, style: { bottom: '4%', right: '14%' }, rotate: -15, duration: 9, delay: 1.8, shape: 'circle', parallax: -80 },
  { id: 'nuts-mt', src: '/nuts.jpg', size: 58, style: { top: '12%', left: '48%' }, rotate: 8, duration: 7, delay: 2.0, shape: 'circle', parallax: 40 },
  { id: 'dried-mid', src: '/dried-herbs.jpg', size: 64, style: { top: '78%', left: '44%' }, rotate: -22, duration: 8, delay: 1.4, shape: 'circle', parallax: -40 },
] as const;

/* ── Spice dust drifting up off the wave, into the hero ──────────────────── */
const DUST = [
  { left: '8%', size: 6, duration: 5, delay: 0, color: '#FF5E0E' },
  { left: '22%', size: 4, duration: 6.5, delay: 0.8, color: '#FFDF00' },
  { left: '46%', size: 5, duration: 5.5, delay: 1.4, color: '#FF5E0E' },
  { left: '64%', size: 3, duration: 7, delay: 0.4, color: '#FF2E63' },
  { left: '81%', size: 5, duration: 6, delay: 1.1, color: '#FFDF00' },
  { left: '93%', size: 4, duration: 5.2, delay: 1.8, color: '#FF5E0E' },
] as const;

/* Static words rendered individually so GSAP can stagger-reveal each one */
const PRE_WORDS = ['We', 'craft', 'the'] as const;
const POST_WORDS = ['spices', 'for', 'you'] as const;

/* Words that cycle through the typewriter effect — each with its own vibrant accent color */
const CYCLE_WORDS = [
  { text: 'finest', color: '#FF5E0E' }, // saffron
  { text: 'boldest', color: '#FF2E63' }, // coral
  { text: 'richest', color: '#8A2BE2' }, // cardamom purple
] as const;

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const spiceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dustRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const platterRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const accentWrapRef = useRef<HTMLSpanElement>(null);
  const typedWordRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteBtnRef = useRef<HTMLAnchorElement>(null);
  const waveLineRef = useRef<SVGPathElement>(null);
  const cornerTLRef = useRef<HTMLDivElement>(null);
  const cornerBRRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = headlineRef.current?.querySelectorAll<HTMLSpanElement>('.word') ?? [];
      const statItems = statsRef.current?.querySelectorAll<HTMLDivElement>('.stat-item') ?? [];

      /* ── Load-in sequence: eyebrow -> headline words -> copy -> CTAs ── */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(
          words,
          { opacity: 0, y: 36, rotateX: 40 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.055 },
          '-=0.25'
        )
        .fromTo(paraRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
        .fromTo(ctaRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo(
          statItems,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.35'
        )
        .fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          '-=0.9'
        )
        .fromTo(
          platterRef.current,
          { opacity: 0, x: -30, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          spiceRefs.current,
          { opacity: 0, scale: 0.5, rotate: (i: number) => FLOATING_SPICES[i].rotate - 20 },
          {
            opacity: 1,
            scale: 1,
            rotate: (i: number) => FLOATING_SPICES[i].rotate,
            duration: 0.7,
            stagger: 0.07,
            ease: 'back.out(1.6)',
          },
          '-=0.6'
        );

      /* ── Typewriter: cycles through CYCLE_WORDS forever, each with its own color ── */
      if (typedWordRef.current) {
        const el = typedWordRef.current;
        const proxy = { chars: 0 };
        const typeSpeed = 0.065; // seconds per character, typing in
        const deleteSpeed = 0.04; // seconds per character, deleting
        const holdDuration = 1.2; // pause once fully typed
        const gapDuration = 0.35; // pause once fully deleted, before next word

        const typeTl = gsap.timeline({ repeat: -1, delay: 1.7 });

        CYCLE_WORDS.forEach((word) => {
          typeTl
            .call(() => {
              if (accentWrapRef.current) {
                gsap.to(accentWrapRef.current, { color: word.color, duration: 0.3, ease: 'power1.out' });
              }
              if (cursorRef.current) {
                gsap.to(cursorRef.current, { backgroundColor: word.color, duration: 0.3, ease: 'power1.out' });
              }
            })
            .to(proxy, {
              chars: word.text.length,
              duration: word.text.length * typeSpeed,
              ease: `steps(${word.text.length})`,
              onUpdate: () => {
                el.textContent = word.text.slice(0, Math.round(proxy.chars));
              },
            })
            .to({}, { duration: holdDuration })
            .to(proxy, {
              chars: 0,
              duration: word.text.length * deleteSpeed,
              ease: `steps(${word.text.length})`,
              onUpdate: () => {
                el.textContent = word.text.slice(0, Math.round(proxy.chars));
              },
            })
            .to({}, { duration: gapDuration });
        });
      }

      /* ── Blinking type-cursor alongside the cycling word ── */
      if (cursorRef.current) {
        gsap.set(cursorRef.current, { backgroundColor: CYCLE_WORDS[0].color });
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.01,
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.45,
          delay: 1.7,
          ease: 'none',
        });
      }
      if (accentWrapRef.current) {
        gsap.set(accentWrapRef.current, { color: CYCLE_WORDS[0].color });
      }

      /* ── Ambient float loops (each spice bobs at its own pace) ── */
      spiceRefs.current.forEach((el, i) => {
        if (!el) return;
        const spice = FLOATING_SPICES[i];
        gsap.to(el, {
          y: -14,
          duration: spice.duration / 2,
          delay: spice.delay + 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      /* ── Dust rising off the wave crest, looping ── */
      dustRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = DUST[i];
        gsap.fromTo(
          el,
          { y: 0, opacity: 0 },
          {
            y: -46,
            opacity: 0.7,
            duration: d.duration / 2,
            delay: d.delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }
        );
      });

      /* ── Scroll parallax: spices drift apart, image card lifts, corners rotate ── */
      spiceRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: FLOATING_SPICES[i].parallax,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      gsap.to(cardRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });

      gsap.to(platterRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });

      gsap.to(cornerTLRef.current, {
        rotate: 28,
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.to(cornerBRRef.current, {
        rotate: -28,
        y: 30,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });

      /* ── Hand-drawn wave line draws itself in once, on load ── */
      if (waveLineRef.current) {
        const length = waveLineRef.current.getTotalLength();
        gsap.set(waveLineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(waveLineRef.current, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.out',
          delay: 0.6,
        });
      }
    },
    { scope: rootRef }
  );

  /* ── Magnetic "Get a Quote" button ── */
  useGSAP(
    () => {
      const btn = quoteBtnRef.current;
      if (!btn) return;

      const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });
      const scaleTo = gsap.quickTo(btn, 'scale', { duration: 0.4, ease: 'power3' });

      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        xTo(relX * 0.3);
        yTo(relY * 0.3);
        scaleTo(1.05);
      };
      const handleLeave = () => {
        xTo(0);
        yTo(0);
        scaleTo(1);
      };

      btn.addEventListener('mousemove', handleMove);
      btn.addEventListener('mouseleave', handleLeave);
      return () => {
        btn.removeEventListener('mousemove', handleMove);
        btn.removeEventListener('mouseleave', handleLeave);
      };
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative min-h-screen overflow-hidden flex items-center">

      {/* ── Full-spread botanical sketch background ── */}
      {/* ── 1. NEW: Base Background Image ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 select-none">
        <Image
          src="/BLACK.jpg"
          alt="Base Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[#1a1208]/70 dark:bg-ink/80" />
      </div>

      {/* ── 2. MODIFIED: Botanical sketch overlay ── */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none flex items-center justify-center mix-blend-screen dark:mix-blend-overlay">
        { }
        <div className="relative w-full h-full opacity-15 dark:opacity-20">
          <Image
            src="/spice_sketches_bg.png"
            alt="Spice Sketch Overlay"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>

      {/* ── Falling leaves, almonds & dried fruit — continuous ambient drift ── */}
      <FallingParticles count={16} className="z-[1]" />

      {/* ── SCATTERED FLOATING SPICES ── */}
      {FLOATING_SPICES.map((spice, i) => (
        <div
          key={spice.id}
          ref={(el) => { spiceRefs.current[i] = el; }}
          className="absolute pointer-events-none select-none z-[2]"
          style={{ ...spice.style, width: spice.size, height: spice.size }}
        >
          <div
            className="relative w-full h-full overflow-hidden shadow-[0_8px_24px_rgba(26,18,8,0.18)] border-[3px] border-white/70"
            style={{ borderRadius: spice.shape === 'pill' ? '40%' : '50%' }}
          >
            <Image src={spice.src} alt="" fill sizes={`${spice.size}px`} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#f27a3a]/10 to-transparent" />
          </div>
        </div>
      ))}

      {/* Corner accent sketches */}

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-10 pt-28 pb-28 sm:pb-36 lg:pt-24 lg:pb-32 min-h-screen">

        {/* ── LEFT: Text ── */}
        <div className="w-full lg:w-[46%] flex flex-col gap-6 z-10">

          <p ref={eyebrowRef} className="text-sm font-bold tracking-[0.22em] uppercase text-[#f27a3a] opacity-0">
            Natural &amp; Organic
          </p>

          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl lg:text-[4.2rem] font-bold text-cream leading-[1.12] [perspective:800px]"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {PRE_WORDS.map((w, i) => (
              <span key={`pre-${i}`}>
                <span className="word inline-block opacity-0">{w}</span>{' '}
              </span>
            ))}
            <span
              ref={accentWrapRef}
              className="word inline-flex items-baseline opacity-0 italic"
              style={{ minWidth: '7ch' }}
            >
              <span ref={typedWordRef} />
              <span
                ref={cursorRef}
                className="inline-block w-[3px] h-[0.85em] ml-1 align-middle not-italic"
              />
            </span>
            <br />
            {POST_WORDS.map((w, i) => (
              <span key={`post-${i}`}>
                <span className="word inline-block opacity-0">{w}</span>
                {i < POST_WORDS.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>

          <p ref={paraRef} className="text-base sm:text-lg text-cream/75 leading-relaxed max-w-md opacity-0">
            An outstanding spice wholesale distributor and importer. We supply
            retail and wholesale distribution across Canada — from Black Pepper
            and Basmati Rice to hand-picked Spanish Saffron.
          </p>

          <div ref={ctaRef} className="flex items-center gap-4 mt-2 opacity-0">
            <Link
              ref={quoteBtnRef}
              href="/contact"
              className="inline-flex items-center justify-center px-9 py-3.5 rounded-full bg-[#f27a3a] text-white text-sm font-bold hover:bg-[#e06626] transition-colors duration-300 shadow-[0_8px_24px_rgba(242,122,58,0.35)] will-change-transform"
            >
              Get a Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cream hover:text-[#f27a3a] transition-colors duration-300 group"
            >
              View Products
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="flex items-center gap-8 mt-4 pt-6 border-t border-cream/15">
            {[
              { value: '200+', label: 'Spice Varieties' },
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Happy Clients' },
            ].map((stat) => (
              <div key={stat.label} className="stat-item flex flex-col opacity-0">
                <span className="text-2xl font-bold text-[#f27a3a]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  {stat.value}
                </span>
                <span className="text-xs text-cream/65 font-medium mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Image Card ── */}
        <div className="w-full lg:w-[50%] relative flex items-center justify-center mt-4 lg:mt-0">

          <div
            ref={cardRef}
            className="relative w-full max-w-[520px] lg:max-w-[560px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(26,18,8,0.18)] opacity-0"
          >
            <Image
              src="/spices.jpg"
              alt="Premium Indian Spices"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 50vw"
              className="object-cover"
            />

            {/* Top-left brush blur corner */}
            <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none z-10">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <filter id="blur-tl" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="18" />
                  </filter>
                </defs>
                <ellipse cx="40" cy="40" rx="90" ry="60" fill="#f27a3a" opacity="0.45" filter="url(#blur-tl)" transform="rotate(-20 40 40)" />
                <ellipse cx="20" cy="70" rx="60" ry="35" fill="#e24e4e" opacity="0.30" filter="url(#blur-tl)" transform="rotate(10 20 70)" />
                <ellipse cx="80" cy="20" rx="50" ry="25" fill="#FFDF00" opacity="0.20" filter="url(#blur-tl)" transform="rotate(-35 80 20)" />
              </svg>
            </div>

            {/* Bottom-right brush blur corner */}
            <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none z-10">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <filter id="blur-br" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="18" />
                  </filter>
                </defs>
                <ellipse cx="160" cy="160" rx="90" ry="60" fill="#c0392b" opacity="0.40" filter="url(#blur-br)" transform="rotate(20 160 160)" />
                <ellipse cx="180" cy="130" rx="60" ry="35" fill="#f27a3a" opacity="0.30" filter="url(#blur-br)" transform="rotate(-10 180 130)" />
                <ellipse cx="120" cy="175" rx="50" ry="28" fill="#8B2500" opacity="0.25" filter="url(#blur-br)" transform="rotate(35 120 175)" />
              </svg>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/30 via-transparent to-transparent" />
          </div>

          {/* Floating spice platter */}
          <div
            ref={platterRef}
            className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-10 w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden border-[6px] border-white shadow-[0_20px_50px_rgba(26,18,8,0.22)] z-20 opacity-0"
          >
            <Image src="/spice_platter.png" alt="Spice Platter" fill sizes="240px" className="object-cover" />
          </div>

          {/* Decorative background blob behind card */}
          <div
            className="absolute -z-10 w-[110%] h-[110%] rounded-[50%] opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, #f27a3a 0%, transparent 70%)' }}
          />
        </div>

      </div>

      {/* ── WAVY TRANSITION INTO ABOUT SECTION ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block w-full h-[64px] sm:h-[100px] lg:h-[120px]">
          <path
            d="M0,64 C160,10 320,118 480,78 C640,38 800,110 960,66 C1120,22 1280,90 1440,58 L1440,120 L0,120 Z"
            style={{ fill: 'var(--color-parchment)' }}
          />
        </svg>

        {/* Hand-drawn accent line, draws itself in on load via GSAP */}
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 w-full h-[64px] sm:h-[100px] lg:h-[120px]">
          <path
            ref={waveLineRef}
            d="M0,64 C160,10 320,118 480,78 C640,38 800,110 960,66 C1120,22 1280,90 1440,58"
            fill="none"
            style={{ stroke: 'var(--color-saffron)', opacity: 0.4 }}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Drifting spice dust rising off the wave */}
        {DUST.map((d, i) => (
          <span
            key={i}
            ref={(el) => { dustRefs.current[i] = el; }}
            className="absolute bottom-4 rounded-full blur-[1px]"
            style={{ left: d.left, width: d.size, height: d.size, backgroundColor: d.color, opacity: 0 }}
          />
        ))}
      </div>
    </section>
  );
}