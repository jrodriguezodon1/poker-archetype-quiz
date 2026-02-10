'use client';

import { Position } from '@/lib/types';

export function DealerButton({ position }: { position: Position }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cream">
      <span className="w-4 h-4 rounded-full bg-white text-green-900 flex items-center justify-center text-[8px] font-black">
        D
      </span>
      {position}
    </span>
  );
}
