'use client';

import { archetypeCombos } from '@/data/archetypes';

export function ComboGrid() {
  return (
    <div className="mt-8">
      <h2 className="font-serif text-xl text-cream text-center mb-4">Hybrid Styles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {archetypeCombos.map((combo) => (
          <div
            key={`${combo.primary}-${combo.secondary}`}
            className="p-4 rounded-xl border border-white/10 bg-white/5"
          >
            <p className="text-xs text-cream/50 uppercase tracking-wider">
              {combo.primary} + {combo.secondary}
            </p>
            <h3 className="font-serif text-base text-cream mt-1">{combo.name}</h3>
            <p className="text-cream/70 text-sm leading-relaxed mt-1">{combo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
