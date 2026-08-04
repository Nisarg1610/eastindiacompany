'use client';

import { useRef, useMemo } from 'react';
import Image from 'next/image';
import { Award, Blend, BadgeDollarSign } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const highlights = [
  {
    icon: Blend,
    title: 'Unique Spice Blends',
    text: 'From cinnamon and black pepper to za\'atar and sumac — an extensive range designed to inspire creativity in the kitchen.',
    color: '#FF5E0E', // saffron
    image: '/spices.jpg',
  },
  {
    icon: Award,
    title: 'High Quality',
    text: 'Every spice is selected for distinct flavor, potency, and freshness — free from additives and packed with natural goodness.',
    color: '#FF2E63', // coral
    image: '/turmeric.jpg',
  },
  {
    icon: BadgeDollarSign,
    title: 'Unbeatable Prices',
    text: 'Premium spices at competitive wholesale rates, so you get the finest flavors without compromising your budget.',
    color: '#FFDF00', // turmeric
    image: '/saffron.jpg',
  },
];

// --- 3D Background Component ---
function ThreeBackground() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random particles
  const [positions, colors] = useMemo(() => {
    const count = 250;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Warm spice palette for particles
    const colorPalette = [
      new THREE.Color('#FF5E0E'), // saffron
      new THREE.Color('#FF2E63'), // coral
      new THREE.Color('#FFDF00'), // turmeric
      new THREE.Color('#8B4513'), // brown
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.08}
            vertexColors
            transparent
            opacity={0.8}
            sizeAttenuation
          />
        </points>
      </Float>
    </>
  );
}

// --- Main Section ---
export default function WhyEastIndiaSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reveal cards as they scroll into view (standard vertical scroll)
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  /* ── Image card below the button: fades/rises in on scroll, tilts gently with the cursor ── */
  useGSAP(
    () => {
      const card = imageCardRef.current;
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      card.style.transformStyle = 'preserve-3d';
      const parent = card.parentElement as HTMLElement | null;
      if (parent) parent.style.perspective = '800px';

      const rotY = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power3' });
      const rotX = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power3' });
      const lift = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power3' });

      const handleMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        rotY(relX * 6);
        rotX(relY * -6);
        lift(-4);
      };
      const handleLeave = () => {
        rotY(0);
        rotX(0);
        lift(0);
      };

      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative bg-[#1a1208] pt-20 pb-24 sm:pt-32 sm:pb-32 overflow-hidden">

      {/* --- Sticky 3D Background --- */}
      {/* Absolute fill within the section, acts as a backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="sticky top-0 h-screen w-full">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ThreeBackground />
          </Canvas>
          {/* Subtle gradient vignette to fade out the edges into the dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1208] via-[#1a1208]/60 to-[#1a1208]/20 opacity-90" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

        {/* --- Left Column: Sticky Intro Text --- */}
        <div className="lg:sticky lg:top-32 w-full lg:w-5/12 flex flex-col justify-start">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-saffron mb-4">
            <span className="w-6 h-px bg-saffron" />
            Why Choose Us
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-cream mb-6 leading-[1.1]"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            A World of <br className="hidden lg:block" />
            <span className="italic text-saffron">Flavors</span>
          </h2>
          <p className="text-cream/70 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
            We source, blend, and deliver the finest spices from across the globe directly to your kitchen. Discover what makes our collection truly exceptional.
          </p>

          <button className="self-start px-8 py-3.5 rounded-full bg-saffron text-white font-bold tracking-wider text-sm hover:bg-[#e06626] hover:scale-105 transition-all shadow-[0_8px_24px_rgba(242,122,58,0.35)]">
            Explore All Products
          </button>

          {/* Rectangular image card, filling the space below the button */}
          <div
            ref={imageCardRef}
            className="relative mt-10 w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)] will-change-transform opacity-0"
          >
            <Image
              src="/spices.jpg"
              alt="Hand-selected spices at East India Company"
              fill
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208] via-[#1a1208]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-saffron">
                Since 1972
              </span>
              <p className="text-cream text-lg font-bold mt-1" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Handpicked, Straight From Origin
              </p>
            </div>
          </div>
        </div>

        {/* --- Right Column: Scrolling Features (Unboxed) --- */}
        <div className="w-full lg:w-7/12 flex flex-col gap-12 sm:gap-16 lg:gap-24 lg:pt-32 pb-16 lg:pb-32">
          {highlights.map((item, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start group"
            >
              {/* Floating Icon */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shrink-0 border border-white/10 transition-transform duration-700 group-hover:scale-110"
                style={{ color: item.color, backgroundColor: `${item.color}05` }}
              >
                <item.icon size={32} strokeWidth={1.5} />
              </div>

              {/* Clean Typography */}
              <div>
                <h3
                  className="text-3xl sm:text-4xl font-bold text-cream mb-4 transition-colors duration-500 group-hover:text-white"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-cream/60 text-lg sm:text-xl leading-relaxed font-light transition-colors duration-500 group-hover:text-cream/90">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-16 sm:h-24 pointer-events-none z-20"
        style={{
          background: '#FDFBF7',
          clipPath: 'polygon(0% 100%, 100% 55%, 100% 100%, 0% 100%)',
        }}
      />
    </section>
  );
}