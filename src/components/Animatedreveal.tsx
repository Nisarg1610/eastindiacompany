'use client';

import { ReactNode, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AnimatedRevealProps {
    children: ReactNode;
    className?: string;
    /** Extra delay before this element's reveal starts, in seconds. */
    delay?: number;
    /** Distance (px) it travels in on reveal. */
    y?: number;
    duration?: number;
}

/**
 * Scroll-triggered fade + rise, built on GSAP + ScrollTrigger.
 * Drop-in replacement for the old framer-motion version — same props,
 * same call sites, just a different engine underneath.
 */
export default function AnimatedReveal({
    children,
    className = '',
    delay = 0,
    y = 32,
    duration = 0.8,
}: AnimatedRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!ref.current) return;

            gsap.fromTo(
                ref.current,
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 88%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        },
        { scope: ref, dependencies: [delay, y, duration] }
    );

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}