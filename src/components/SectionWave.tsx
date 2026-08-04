interface SectionWaveProps {
    /** Fill color — should match the background of the section that comes NEXT */
    fill: string;
    /** Curve shape, for variety between transitions (default 1) */
    variant?: 1 | 2 | 3;
    className?: string;
}

const PATHS: Record<number, string> = {
    1: 'M0,64 C160,10 320,118 480,78 C640,38 800,110 960,66 C1120,22 1280,90 1440,58 L1440,120 L0,120 Z',
    2: 'M0,70 C240,110 480,10 720,55 C960,100 1200,20 1440,65 L1440,120 L0,120 Z',
    3: 'M0,50 C180,105 360,5 540,55 C720,105 900,15 1080,60 C1260,105 1350,75 1440,95 L1440,120 L0,120 Z',
};

export default function SectionWave({ fill, variant = 1, className = '' }: SectionWaveProps) {
    return (
        <div
            className={`absolute inset-x-0 bottom-0 z-20 pointer-events-none select-none overflow-hidden ${className}`}
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                className="block w-full h-[56px] sm:h-[90px] lg:h-[110px]"
            >
                <path d={PATHS[variant]} fill={fill} />
            </svg>
        </div>
    );
}