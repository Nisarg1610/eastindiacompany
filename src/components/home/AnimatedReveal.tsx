'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type AnimatedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedReveal({
  children,
  className = '',
  delay = 0,
}: AnimatedRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}
