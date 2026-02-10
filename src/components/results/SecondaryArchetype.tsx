'use client';

import { motion } from 'framer-motion';
import { ArchetypeCombo } from '@/lib/types';

export function SecondaryArchetype({ combo }: { combo: ArchetypeCombo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5"
    >
      <p className="text-xs text-cream/50 uppercase tracking-widest mb-1">Your Hybrid Style</p>
      <h3 className="font-serif text-lg text-cream">{combo.name}</h3>
      <p className="text-cream/70 text-sm leading-relaxed mt-2">{combo.description}</p>
    </motion.div>
  );
}
