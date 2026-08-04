'use client';

import Image from 'next/image';
import { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type ParticleKind = 'leaf-a' | 'leaf-b' | 'almond' | 'photo';

interface ParticleConfig {
    id: string;
    kind: ParticleKind;
    src?: string;
    size: number;
    left: number; // vw, as a %
    fallDuration: number;
    fallDelay: number;
    swayDuration: number;
    swayDistance: number;
    rotateDuration: number;
    rotateDirection: 1 | -1;
    maxOpacity: number;
}

/** Real product photos — reused from the hero's floating-spice set for continuity */
const PHOTO_SOURCES = ['/nuts.jpg', '/dried-fruits.jpg', '/cardamom.jpg', '/dried-herbs.jpg'];

function buildParticles(count: number): ParticleConfig[] {
    const kinds: ParticleKind[] = ['leaf-a', 'leaf-b', 'almond', 'photo'];
    const particles: ParticleConfig[] = [];

    for (let i = 0; i < count; i++) {
        const kind = kinds[i % kinds.length];
        const isPhoto = kind === 'photo';
        particles.push({
            id: `particle-${i}`,
            kind,
            src: isPhoto ? PHOTO_SOURCES[i % PHOTO_SOURCES.length] : undefined,
            size: isPhoto ? 20 + Math.random() * 16 : 13 + Math.random() * 11,
            left: 2 + Math.random() * 96,
            fallDuration: 13 + Math.random() * 10,
            fallDelay: Math.random() * 16,
            swayDuration: 3 + Math.random() * 2.5,
            swayDistance: 18 + Math.random() * 26,
            rotateDuration: 5 + Math.random() * 7,
            rotateDirection: Math.random() > 0.5 ? 1 : -1,
            maxOpacity: isPhoto ? 0.55 + Math.random() * 0.2 : 0.3 + Math.random() * 0.3,
        });
    }
    return particles;
}

function LeafShape({ variant, color }: { variant: 'a' | 'b'; color: string }) {
    if (variant === 'a') {
        return (
            <svg viewBox="0 0 40 40" className="w-full h-full">
                <path
                    d="M20 3C29 8 34 17 30 27C26 35 14 36 8 30C3 25 2 15 8 9C12 5 16 3 20 3Z"
                    fill={color}
                    opacity={0.9}
                />
                <path d="M20 4 C18 14 18 26 21 36" stroke="rgba(0,0,0,0.15)" strokeWidth="1" fill="none" />
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 40 40" className="w-full h-full">
            <path
                d="M6 22C6 12 14 4 22 5C31 6 36 14 33 23C30 32 19 37 12 33C7 30 6 27 6 22Z"
                fill={color}
                opacity={0.9}
            />
            <path d="M8 21 C16 21 26 21 32 17" stroke="rgba(0,0,0,0.12)" strokeWidth="1" fill="none" />
        </svg>
    );
}

function AlmondShape({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 30 44" className="w-full h-full">
            <path
                d="M15 2C21 2 26 12 26 22C26 33 21 42 15 42C9 42 4 33 4 22C4 12 9 2 15 2Z"
                fill={color}
            />
            <path d="M15 4 C11 13 11 31 15 40" stroke="rgba(0,0,0,0.1)" strokeWidth="1" fill="none" />
        </svg>
    );
}

interface FallingParticlesProps {
    /** How many pieces drift down at once. Keep modest — this runs continuously. */
    count?: number;
    className?: string;
}

/**
 * Ambient background layer: leaves, almonds, and dried-fruit photo chips
 * fall from top to bottom on an endless loop, each with its own speed,
 * sway, and rotation so the effect never looks mechanical.
 *
 * Usage: place inside any `relative`-positioned section, behind the main
 * content — e.g. <FallingParticles className="z-[1]" /> right after the
 * section's background layer and before the foreground content.
 */
export default function FallingParticles({ count = 16, className = '' }: FallingParticlesProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const particles = useMemo(() => buildParticles(count), [count]);

    useGSAP(
        () => {
            const prefersReducedMotion =
                typeof window !== 'undefined' &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            const els = rootRef.current?.querySelectorAll<HTMLDivElement>('.falling-particle') ?? [];

            els.forEach((el, i) => {
                const cfg = particles[i];
                if (!cfg) return;

                if (prefersReducedMotion) {
                    // Static, gentle presence — no motion, just ambient texture.
                    gsap.set(el, { opacity: cfg.maxOpacity * 0.6, top: `${(i / els.length) * 90 + 5}%` });
                    return;
                }

                // Continuous fall: top -10vh -> 110vh, fading in then out along the way.
                const fallTl = gsap.timeline({ repeat: -1, delay: cfg.fallDelay });
                gsap.set(el, { top: '-10vh', opacity: 0 });
                fallTl
                    .to(el, { opacity: cfg.maxOpacity, duration: cfg.fallDuration * 0.12, ease: 'sine.out' }, 0)
                    .to(el, { top: '110vh', duration: cfg.fallDuration, ease: 'none' }, 0)
                    .to(el, { opacity: 0, duration: cfg.fallDuration * 0.18, ease: 'sine.in' }, cfg.fallDuration * 0.82);

                // Gentle side-to-side sway, independent of the fall.
                gsap.set(el, { x: -cfg.swayDistance / 2 });
                gsap.to(el, {
                    x: cfg.swayDistance / 2,
                    duration: cfg.swayDuration,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });

                // Continuous tumble.
                gsap.to(el, {
                    rotate: 360 * cfg.rotateDirection,
                    duration: cfg.rotateDuration,
                    repeat: -1,
                    ease: 'none',
                });
            });
        },
        { scope: rootRef, dependencies: [count] }
    );

    return (
        <div ref={rootRef} className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
            {particles.map((cfg) => (
                <div
                    key={cfg.id}
                    className="falling-particle absolute will-change-transform"
                    style={{ left: `${cfg.left}%`, width: cfg.size, height: cfg.size }}
                >
                    {cfg.kind === 'leaf-a' && <LeafShape variant="a" color="var(--color-leaf)" />}
                    {cfg.kind === 'leaf-b' && <LeafShape variant="b" color="var(--color-leaf-light)" />}
                    {cfg.kind === 'almond' && <AlmondShape color="#C99A6B" />}
                    {cfg.kind === 'photo' && cfg.src && (
                        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_4px_12px_rgba(26,18,8,0.2)] border-2 border-white/60">
                            <Image src={cfg.src} alt="" fill sizes={`${Math.round(cfg.size)}px`} className="object-cover" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}