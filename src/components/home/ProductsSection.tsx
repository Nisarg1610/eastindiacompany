'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const products = [
  {
    title: 'Dried Herbs',
    image: '/dried-herbs.jpg',
    category: 'Botanicals',
    description: 'Premium globally-sourced dried herbs that elevate your culinary creations with natural, earthy aromas and fresh flavors.'
  },
  {
    title: 'Exotic Blends',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    category: 'Signature',
    description: 'Unique and proprietary spice blends meticulously crafted to deliver authentic, rich, and highly complex flavor profiles.'
  },
  {
    title: 'Dried Fruit',
    image: '/dried-fruits.jpg',
    category: 'Sweet & Savory',
    description: 'High-quality, naturally sweet dried fruits perfect for baking, snacking, or beautifully garnishing your best dishes.'
  },
  {
    title: 'Pure Spices',
    image: '/spices.jpg',
    category: 'Essentials',
    description: 'A comprehensive selection of pure, highly potent spices directly imported from top growers worldwide.'
  },
  {
    title: 'Fine Flours',
    image: '/flours.jpg',
    category: 'Baking',
    description: 'Specialty baking and cooking flours, finely milled and consistently graded to ensure perfect texture in your recipes.'
  },
  {
    title: 'Premium Nuts',
    image: '/nuts.jpg',
    category: 'Crunch & Richness',
    description: 'Fresh, premium grade nuts providing the perfect crunch and richness to both your sweet and savory dishes.'
  },
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Header Reveal
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // 3D Scroll Effect on Cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 150,
            z: -500,       // Pushed deep into the screen
            rotateX: -45,  // Tilted backward
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',  // Start animation when card enters viewport
              end: 'top 60%',    // Finish animation when card reaches 60% of viewport
              scrub: 1.5,        // Tie animation smoothly to scroll (1.5s lag)
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#FDFBF7] relative overflow-hidden" style={{ perspective: '1200px' }}>


      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">

        <div className="absolute -top-40 -right-40 w-96 h-96 bg-saffron/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 -left-40 w-96 h-96 bg-cardamom/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(#e8ddd0 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-saffron mb-4">
            <span className="w-6 h-px bg-saffron" />
            Our Catalog
            <span className="w-6 h-px bg-saffron" />
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-ink mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            Explore the <br className="hidden lg:block" />
            <span className="italic text-saffron">Collection</span>
          </h2>
          <p className="text-stone text-lg leading-relaxed">
            From the world's most aromatic herbs to the rarest exotic blends, discover a curated selection of ingredients designed to transform your culinary journey.
          </p>
        </div>

        {/* 3D Animated Grid (Swipeable Carousel on Mobile) */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {products.map((product, i) => (
            <div
              key={product.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative h-[400px] sm:h-[450px] md:h-[500px] w-[85vw] sm:w-[60vw] md:w-full shrink-0 snap-center rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl will-change-transform"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'top center'
              }}
            >
              {/* Image Layer */}
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-stone/5">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="product-image object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-ink/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end" style={{ transform: 'translateZ(30px)' }}>
                {/* Category Badge */}
                <div className="absolute top-8 left-8 opacity-100 translate-y-0 md:opacity-0 md:-translate-y-4 transition-all duration-500 ease-out md:group-hover:opacity-100 md:group-hover:translate-y-0 md:delay-100">
                  <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] font-bold">
                    {product.category}
                  </span>
                </div>

                <div className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-y-6 md:translate-y-0 md:group-hover:-translate-y-6">
                  <h3
                    className="text-3xl font-bold text-white mb-2"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {product.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-full md:w-0 h-px bg-saffron transition-all duration-700 ease-out md:group-hover:w-full mb-4 opacity-100 md:opacity-0 md:group-hover:opacity-100" />

                  {/* Description */}
                  <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="text-white/80 text-sm leading-relaxed pb-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 md:delay-200">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-saffron flex items-center justify-center text-white opacity-100 translate-x-0 md:opacity-0 md:translate-x-8 transition-all duration-500 ease-out md:group-hover:opacity-100 md:group-hover:translate-x-0 md:delay-150">
                  <ArrowRight size={20} className="rotate-0 md:-rotate-45 md:group-hover:rotate-0 transition-transform duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 sm:mt-24 text-center">
          <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ink text-white font-bold tracking-widest uppercase text-xs hover:bg-saffron hover:scale-105 transition-all duration-300 shadow-xl group">
            View Complete Catalog
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
