'use client';

import { motion, HTMLMotionProps } from 'framer-motion';

type ChipVariant = 'red' | 'blue' | 'gold' | 'green';

const CHIP_COLORS: Record<ChipVariant, string> = {
  red: 'border-red-500 text-red-500',
  blue: 'border-blue-500 text-blue-500',
  gold: 'border-yellow-500 text-yellow-500',
  green: 'border-green-400 text-green-400',
};

const CHIP_BG: Record<ChipVariant, string> = {
  red: 'bg-red-500/10',
  blue: 'bg-blue-500/10',
  gold: 'bg-yellow-500/10',
  green: 'bg-green-500/10',
};

interface ChipProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ChipVariant;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Chip({ variant = 'green', size = 'md', children, className = '', ...props }: ChipProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-full border-[3px] border-dashed font-bold flex items-center justify-center ${CHIP_COLORS[variant]} ${CHIP_BG[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
