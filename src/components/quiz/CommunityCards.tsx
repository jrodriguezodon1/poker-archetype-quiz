'use client';

import { Card } from '@/lib/types';
import { PokerCard } from '@/components/ui/Card';

export function CommunityCards({ cards }: { cards: Card[] }) {
  if (cards.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 mt-3">
      {cards.map((card, i) => (
        <PokerCard key={i} card={card} delay={0.3 + i * 0.1} small />
      ))}
    </div>
  );
}
