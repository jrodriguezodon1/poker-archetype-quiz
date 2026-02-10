'use client';

import { Scenario } from '@/lib/types';
import { DealerButton } from '@/components/ui/DealerButton';

export function ContextPanel({ scenario }: { scenario: Scenario }) {
  return (
    <div className="space-y-3 mt-4">
      {/* Info badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <DealerButton position={scenario.position} />
        <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-cream font-semibold">
          {scenario.street}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-green-300 font-semibold">
          Stack: ${scenario.stack}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 font-semibold">
          Pot: ${scenario.pot}
        </span>
      </div>

      {/* Description */}
      <p className="text-cream/90 text-sm leading-relaxed text-center px-2">
        {scenario.description}
      </p>
    </div>
  );
}
