'use client';

import { motion } from 'framer-motion';
import { ArchetypeId } from '@/lib/types';

const ARCHETYPE_EMOJI: Record<ArchetypeId, string> = {
  fortress: '\u{1F3F0}',
  bloodhound: '\u{1F43A}',
  shark: '\u{1F988}',
};

const ARCHETYPE_BORDER: Record<ArchetypeId, string> = {
  fortress: 'border-red-500/50',
  bloodhound: 'border-blue-500/50',
  shark: 'border-yellow-500/50',
};

interface ArchetypeBadgeProps {
  name: string;
  tagline: string;
  archetypeId: ArchetypeId;
}

export function ArchetypeBadge({ name, tagline, archetypeId }: ArchetypeBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      className={`text-center p-6 rounded-2xl border-2 ${ARCHETYPE_BORDER[archetypeId]} bg-white/5 backdrop-blur-sm`}
    >
      <div className="text-5xl mb-3">{ARCHETYPE_EMOJI[archetypeId]}</div>
      <h2 className="font-serif text-2xl text-cream mb-2">{name}</h2>
      <p className="text-cream/70 italic text-sm">&ldquo;{tagline}&rdquo;</p>
    </motion.div>
  );
}
