'use client';

import { Card as CardType } from '@/lib/types';
import { motion } from 'framer-motion';

const SUIT_SYMBOLS: Record<string, string> = {
  h: '♥',
  d: '♦',
  c: '♣',
  s: '♠',
};

const SUIT_COLORS: Record<string, string> = {
  h: 'text-red-500',
  d: 'text-red-500',
  c: 'text-gray-900',
  s: 'text-gray-900',
};

const RANK_DISPLAY: Record<string, string> = {
  T: '10',
  J: 'J',
  Q: 'Q',
  K: 'K',
  A: 'A',
};

function displayRank(rank: string): string {
  return RANK_DISPLAY[rank] || rank;
}

export function PokerCard({
  card,
  delay = 0,
  small = false,
}: {
  card: CardType;
  delay?: number;
  small?: boolean;
}) {
  const suit = SUIT_SYMBOLS[card.suit];
  const color = SUIT_COLORS[card.suit];
  const rank = displayRank(card.rank);

  return (
    <motion.div
      initial={{ y: -40, opacity: 0, rotateY: 180 }}
      animate={{ y: 0, opacity: 1, rotateY: 0 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200 }}
      className={`relative bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col items-center justify-center ${
        small ? 'w-12 h-[4.2rem] text-xs' : 'w-16 h-[5.6rem] text-sm'
      }`}
      style={{ perspective: '600px' }}
    >
      <span className={`absolute top-1 left-1.5 font-bold leading-none ${color} ${small ? 'text-[10px]' : 'text-xs'}`}>
        {rank}
        <br />
        {suit}
      </span>
      <span className={`${color} ${small ? 'text-xl' : 'text-3xl'}`}>{suit}</span>
      <span
        className={`absolute bottom-1 right-1.5 font-bold leading-none rotate-180 ${color} ${
          small ? 'text-[10px]' : 'text-xs'
        }`}
      >
        {rank}
        <br />
        {suit}
      </span>
    </motion.div>
  );
}

export function CardBack({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`rounded-lg border-2 border-gray-300 flex items-center justify-center ${
        small ? 'w-12 h-[4.2rem]' : 'w-16 h-[5.6rem]'
      }`}
      style={{
        background: 'repeating-linear-gradient(45deg, #1a5c2e, #1a5c2e 4px, #176128 4px, #176128 8px)',
      }}
    >
      <div className="w-6 h-8 rounded border border-green-300/30" />
    </div>
  );
}
