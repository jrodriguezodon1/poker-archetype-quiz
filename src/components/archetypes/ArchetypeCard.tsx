'use client';

import { Archetype, ArchetypeId } from '@/lib/types';

const ARCHETYPE_EMOJI: Record<ArchetypeId, string> = {
  fortress: '\u{1F3F0}',
  bloodhound: '\u{1F43A}',
  shark: '\u{1F988}',
};

const BORDER_COLORS: Record<ArchetypeId, string> = {
  fortress: 'border-red-500/40',
  bloodhound: 'border-blue-500/40',
  shark: 'border-yellow-500/40',
};

export function ArchetypeCard({ archetype }: { archetype: Archetype }) {
  return (
    <div className={`p-5 rounded-xl border ${BORDER_COLORS[archetype.id]} bg-white/5`}>
      <div className="text-3xl mb-2">{ARCHETYPE_EMOJI[archetype.id]}</div>
      <h3 className="font-serif text-xl text-cream">{archetype.name}</h3>
      <p className="text-cream/60 text-xs uppercase tracking-wider mb-2">
        Most common action: {archetype.action}
      </p>
      <p className="text-cream/70 italic text-sm mb-3">&ldquo;{archetype.tagline}&rdquo;</p>
      <div className="space-y-3 text-sm text-cream/80">
        <div>
          <h4 className="font-semibold text-cream mb-1">Decision-Making</h4>
          <p className="leading-relaxed">{archetype.decisionMaking}</p>
        </div>
        <div>
          <h4 className="font-semibold text-cream mb-1">Risk Tolerance</h4>
          <p className="leading-relaxed">{archetype.riskTolerance}</p>
        </div>
        <div>
          <h4 className="font-semibold text-cream mb-1">Table Instincts</h4>
          <p className="leading-relaxed">{archetype.tableInstincts}</p>
        </div>
      </div>
    </div>
  );
}
