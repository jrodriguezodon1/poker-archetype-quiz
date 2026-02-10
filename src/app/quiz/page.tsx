'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuiz } from '@/context/QuizContext';
import { scenarios } from '@/data/scenarios';
import { Action } from '@/lib/types';
import { encodeAnswers } from '@/lib/encoding';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ScenarioDisplay } from '@/components/quiz/ScenarioDisplay';
import { ActionBar } from '@/components/quiz/ActionBar';

export default function QuizPage() {
  const router = useRouter();
  const { state, answer, nextScenario, prevScenario, goToScenario } = useQuiz();
  const { currentScenario, answers } = state;

  const scenario = scenarios[currentScenario];
  const selectedAction = answers[currentScenario];
  const allAnswered = answers.every((a) => a !== null);

  const handleAction = useCallback(
    (action: Action) => {
      answer(currentScenario, action);

      // Auto-advance after a brief delay if not the last scenario
      if (currentScenario < scenarios.length - 1) {
        setTimeout(() => nextScenario(), 400);
      }
    },
    [answer, currentScenario, nextScenario]
  );

  const handleFinish = useCallback(() => {
    const validAnswers = answers.filter((a): a is Action => a !== null);
    const encoded = encodeAnswers(validAnswers);
    router.push(`/results?r=${encoded}`);
  }, [answers, router]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevScenario();
      if (e.key === 'ArrowRight' && selectedAction) nextScenario();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prevScenario, nextScenario, selectedAction]);

  return (
    <main className="min-h-svh flex flex-col pb-28">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-[#0a2912] to-transparent pt-2 pb-4 px-4">
        <ProgressBar
          total={scenarios.length}
          current={currentScenario}
          answers={answers}
          onDotClick={goToScenario}
        />
      </div>

      {/* Scenario content */}
      <div className="flex-1 px-4 pb-4">
        <ScenarioDisplay scenario={scenario} selectedAction={selectedAction} />
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-[#0a2912] via-[#0a2912] to-transparent pt-8">
        <div className="max-w-lg mx-auto space-y-3">
          <ActionBar
            labels={scenario.actionLabels}
            selected={selectedAction}
            onAction={handleAction}
          />

          {/* Navigation + finish */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevScenario}
              disabled={currentScenario === 0}
              className="text-cream/40 text-sm disabled:opacity-20"
            >
              ← Back
            </button>

            {allAnswered ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFinish}
                className="px-6 py-2 rounded-full bg-yellow-500 text-gray-900 font-bold text-sm"
              >
                See My Results
              </motion.button>
            ) : (
              <span className="text-cream/30 text-xs">
                {answers.filter((a) => a !== null).length}/10 answered
              </span>
            )}

            <button
              onClick={nextScenario}
              disabled={currentScenario === scenarios.length - 1 || !selectedAction}
              className="text-cream/40 text-sm disabled:opacity-20"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
