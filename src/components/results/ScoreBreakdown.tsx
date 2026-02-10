'use client';

import { motion } from 'framer-motion';

interface ScoreBreakdownProps {
  foldCount: number;
  callCount: number;
  raiseCount: number;
}

export function ScoreBreakdown({ foldCount, callCount, raiseCount }: ScoreBreakdownProps) {
  const total = 10;

  const bars = [
    { label: 'Fold', count: foldCount, color: 'bg-red-500', textColor: 'text-red-400' },
    { label: 'Call', count: callCount, color: 'bg-blue-500', textColor: 'text-blue-400' },
    { label: 'Raise', count: raiseCount, color: 'bg-yellow-500', textColor: 'text-yellow-400' },
  ];

  return (
    <div className="space-y-3 mt-6">
      <h3 className="font-serif text-lg text-cream text-center">Your Decisions</h3>
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex items-center gap-3">
          <span className={`text-sm font-bold w-12 text-right ${bar.textColor}`}>{bar.label}</span>
          <div className="flex-1 h-6 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(bar.count / total) * 100}%` }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: 'easeOut' }}
              className={`h-full ${bar.color} rounded-full flex items-center justify-end pr-2`}
            >
              {bar.count > 0 && (
                <span className="text-xs font-bold text-white">{bar.count}</span>
              )}
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}
