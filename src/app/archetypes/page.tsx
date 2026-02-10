'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { archetypes } from '@/data/archetypes';
import { ArchetypeCard } from '@/components/archetypes/ArchetypeCard';
import { ComboGrid } from '@/components/archetypes/ComboGrid';

export default function ArchetypesPage() {
  const archetypeList = Object.values(archetypes);

  return (
    <main className="min-h-svh px-4 py-8 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-serif text-3xl text-cream">The Archetypes</h1>
        <p className="text-cream/60 text-sm mt-2">
          Every poker player falls into one of three primary styles.
        </p>
      </motion.div>

      <div className="space-y-6">
        {archetypeList.map((archetype, i) => (
          <motion.div
            key={archetype.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <ArchetypeCard archetype={archetype} />
          </motion.div>
        ))}
      </div>

      <ComboGrid />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-center"
      >
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-yellow-500 text-gray-900 font-bold text-sm"
        >
          Discover Your Archetype
        </Link>
        <div className="mt-4">
          <Link href="/" className="text-cream/40 text-sm underline underline-offset-4">
            Back to home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
