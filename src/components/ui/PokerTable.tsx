'use client';

import { ReactNode } from 'react';

export function PokerTable({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto max-w-lg w-full">
      {/* Wooden rail */}
      <div className="rounded-2xl p-1.5" style={{ background: 'linear-gradient(145deg, #8B6914, #5C4A1E, #8B6914)' }}>
        {/* Felt surface */}
        <div className="rounded-xl p-4 felt-surface min-h-[200px]">
          {children}
        </div>
      </div>
    </div>
  );
}
