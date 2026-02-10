'use client';

import { Card } from '@/lib/types';
import { PokerCard } from '@/components/ui/Card';

export function HoleCards({ cards }: { cards: [Card, Card] }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <PokerCard card={cards[0]} delay={0.1} />
      <PokerCard card={cards[1]} delay={0.25} />
    </div>
  );
}
