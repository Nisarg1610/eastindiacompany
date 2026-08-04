'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
    dark?: boolean;
}

export function ThemeToggle({ dark = false }: ThemeToggleProps) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        // Reserve space so nothing shifts once the real icon mounts
        return <div className="w-9 h-9" />;
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 ${dark
                    ? 'text-cream/80 hover:text-white hover:bg-white/10'
                    : 'text-gray-800 hover:text-black hover:bg-black/5'
                }`}
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}