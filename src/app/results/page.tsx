'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { decodeAnswers } from '@/lib/encoding';
import { calculateResults } from '@/lib/scoring';
import { archetypes, getCombo } from '@/data/archetypes';
import { ArchetypeBadge } from '@/components/results/ArchetypeBadge';
import { ScoreBreakdown } from '@/components/results/ScoreBreakdown';
import { ProfileDetail } from '@/components/results/ProfileDetail';
import { SecondaryArchetype } from '@/components/results/SecondaryArchetype';
import { ShareButton } from '@/components/results/ShareButton';
import { ChipConfetti } from '@/components/ui/ChipConfetti';

function ResultsContent() {
  const searchParams = useSearchParams();
  const encoded = searchParams.get('r');
  const name = searchParams.get('n') || '';
  const isOwn = searchParams.get('own') === '1';

  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (encoded) {
      const params = new URLSearchParams({ r: encoded });
      if (name) params.set('n', name);
      setShareUrl(`${window.location.origin}/results?${params.toString()}`);
    }
  }, [encoded, name]);

  if (!encoded) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-2xl text-cream mb-4">No Results Found</h1>
        <p className="text-cream/60 mb-6">Take the quiz first to see your poker personality!</p>
        <Link
          href="/quiz"
          className="px-6 py-3 rounded-full bg-yellow-500 text-gray-900 font-bold"
        >
          Start Quiz
        </Link>
      </div>
    );
  }

  const answers = decodeAnswers(encoded);
  if (!answers) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-2xl text-cream mb-4">Invalid Results</h1>
        <p className="text-cream/60 mb-6">This results link seems to be broken.</p>
        <Link
          href="/quiz"
          className="px-6 py-3 rounded-full bg-yellow-500 text-gray-900 font-bold"
        >
          Take the Quiz
        </Link>
      </div>
    );
  }

  const result = calculateResults(answers);
  const primaryArchetype = archetypes[result.primary];
  const combo = getCombo(result.primary, result.secondary);

  const headerLabel = isOwn
    ? 'Your Poker Archetype'
    : name
      ? `${name}\u2019s Poker Archetype`
      : 'Their Poker Archetype';

  return (
    <main className="min-h-svh px-4 py-8 max-w-lg mx-auto">
      {isOwn && <ChipConfetti />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-2"
      >
        <p className="text-cream/50 text-xs uppercase tracking-widest">{headerLabel}</p>
      </motion.div>

      <ArchetypeBadge
        name={primaryArchetype.name}
        tagline={primaryArchetype.tagline}
        archetypeId={primaryArchetype.id}
      />

      <ScoreBreakdown
        foldCount={result.foldCount}
        callCount={result.callCount}
        raiseCount={result.raiseCount}
      />

      {combo && <SecondaryArchetype combo={combo} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 space-y-2"
      >
        <ProfileDetail title="Decision-Making Style" content={primaryArchetype.decisionMaking} />
        <ProfileDetail title="Risk Tolerance" content={primaryArchetype.riskTolerance} />
        <ProfileDetail title="Table Instincts" content={primaryArchetype.tableInstincts} />
      </motion.div>

      {isOwn ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 space-y-3"
        >
          <ShareButton
            url={shareUrl}
            archetypeName={primaryArchetype.name}
            name={name || undefined}
          />

          <div className="flex gap-3">
            <Link
              href="/quiz"
              className="flex-1 py-3 rounded-xl border border-white/10 text-cream/60 text-center text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Retake Quiz
            </Link>
            <Link
              href="/archetypes"
              className="flex-1 py-3 rounded-xl border border-white/10 text-cream/60 text-center text-sm font-medium hover:bg-white/5 transition-colors"
            >
              All Archetypes
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 text-center space-y-4"
        >
          <p className="text-cream/60 font-serif text-lg">
            {name ? `Think you can beat ${name}?` : 'Think you can do better?'}
          </p>

          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block w-full py-4 rounded-2xl bg-yellow-500 text-gray-900 font-bold text-base cursor-pointer hover:bg-yellow-400 transition-colors"
            >
              Discover YOUR Poker Personality
            </motion.div>
          </Link>

          <Link
            href="/archetypes"
            className="inline-block text-cream/40 text-sm underline underline-offset-4 hover:text-cream/60 transition-colors"
          >
            View all archetypes
          </Link>
        </motion.div>
      )}
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-svh flex items-center justify-center">
          <div className="text-cream/50">Loading results...</div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
