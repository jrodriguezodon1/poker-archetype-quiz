'use client';

import { motion } from 'framer-motion';
import { Action } from '@/lib/types';

const ACTION_STYLES: Record<Action, { bg: string; border: string; text: string }> = {
  fold: {
    bg: 'bg-red-600 hover:bg-red-700',
    border: 'border-red-400',
    text: 'text-white',
  },
  call: {
    bg: 'bg-blue-600 hover:bg-blue-700',
    border: 'border-blue-400',
    text: 'text-white',
  },
  raise: {
    bg: 'bg-yellow-500 hover:bg-yellow-600',
    border: 'border-yellow-300',
    text: 'text-gray-900',
  },
};

interface ActionButtonProps {
  action: Action;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function ActionButton({ action, label, selected, disabled, onClick }: ActionButtonProps) {
  const styles = ACTION_STYLES[action];

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 py-3 px-2 rounded-xl font-bold text-sm uppercase tracking-wide border-2 transition-all ${
        styles.bg
      } ${styles.text} ${
        selected ? `${styles.border} ring-2 ring-white/50 scale-105` : 'border-transparent'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {label}
    </motion.button>
  );
}
