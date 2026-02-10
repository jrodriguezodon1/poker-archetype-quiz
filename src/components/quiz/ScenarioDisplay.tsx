'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Scenario, Action } from '@/lib/types';
import { HoleCards } from './HoleCards';
import { CommunityCards } from './CommunityCards';
import { ContextPanel } from './ContextPanel';
import { PokerTable } from '@/components/ui/PokerTable';

interface ScenarioDisplayProps {
  scenario: Scenario;
  selectedAction: Action | null;
}

export function ScenarioDisplay({ scenario, selectedAction }: ScenarioDisplayProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scenario.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {/* Title */}
        <h2 className="text-center font-serif text-lg text-cream mb-3">
          <span className="text-yellow-400/80 text-sm">Hand {scenario.id}/10</span>
          <br />
          {scenario.title}
        </h2>

        <PokerTable>
          {/* Cards area */}
          <div className="flex flex-col items-center">
            <p className="text-xs text-cream/50 mb-2 uppercase tracking-widest">Your Hand</p>
            <HoleCards cards={scenario.holeCards} />
            {scenario.communityCards && scenario.communityCards.length > 0 && (
              <>
                <p className="text-xs text-cream/50 mt-3 mb-1 uppercase tracking-widest">Board</p>
                <CommunityCards cards={scenario.communityCards} />
              </>
            )}
          </div>
        </PokerTable>

        <ContextPanel scenario={scenario} />

        {selectedAction && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-xs text-cream/50 mt-2"
          >
            Tap an action to change, or swipe to continue
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
