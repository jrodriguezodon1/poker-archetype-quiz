'use client';

import { motion } from 'framer-motion';
import { Action } from '@/lib/types';

const ACTION_COLORS: Record<Action, string> = {
  fold: 'bg-red-500',
  call: 'bg-blue-500',
  raise: 'bg-yellow-500',
};

interface ProgressBarProps {
  total: number;
  current: number;
  answers: (Action | null)[];
  onDotClick: (index: number) => void;
}

export function ProgressBar({ total, current, answers, onDotClick }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-3">
      {Array.from({ length: total }, (_, i) => {
        const answered = answers[i] !== null;
        const isCurrent = i === current;

        return (
          <motion.button
            key={i}
            onClick={() => onDotClick(i)}
            whileTap={{ scale: 0.8 }}
            className={`relative w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center text-[10px] font-bold ${
              isCurrent
                ? 'border-white bg-white/20 text-white scale-110'
                : answered
                ? `${ACTION_COLORS[answers[i]!]} border-transparent text-white`
                : 'border-gray-500 bg-transparent text-gray-500'
            }`}
          >
            {answered ? answers[i]![0].toUpperCase() : i + 1}
            {isCurrent && (
              <motion.div
                layoutId="progress-indicator"
                className="absolute inset-0 rounded-full border-2 border-white"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
