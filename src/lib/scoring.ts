import { Action, ArchetypeId, QuizResult } from './types';

const ACTION_TO_ARCHETYPE: Record<Action, ArchetypeId> = {
  fold: 'fortress',
  call: 'bloodhound',
  raise: 'shark',
};

export function calculateResults(answers: Action[]): QuizResult {
  const foldCount = answers.filter((a) => a === 'fold').length;
  const callCount = answers.filter((a) => a === 'call').length;
  const raiseCount = answers.filter((a) => a === 'raise').length;

  const counts: Record<Action, number> = { fold: foldCount, call: callCount, raise: raiseCount };

  const primary = determinePrimary(counts, answers);
  const secondary = determineSecondary(counts, answers, primary);

  return { answers, foldCount, callCount, raiseCount, primary, secondary };
}

function determinePrimary(counts: Record<Action, number>, answers: Action[]): ArchetypeId {
  const sorted = (['fold', 'call', 'raise'] as Action[]).sort((a, b) => counts[b] - counts[a]);

  // Clear winner
  if (counts[sorted[0]] > counts[sorted[1]]) {
    return ACTION_TO_ARCHETYPE[sorted[0]];
  }

  // Tie — broken by scenario 10 answer (index 9)
  const finalAnswer = answers[9];
  if (sorted.filter((a) => counts[a] === counts[sorted[0]]).includes(finalAnswer)) {
    return ACTION_TO_ARCHETYPE[finalAnswer];
  }

  // If scenario 10 doesn't break the tie, use the first tied action
  return ACTION_TO_ARCHETYPE[sorted[0]];
}

function determineSecondary(
  counts: Record<Action, number>,
  answers: Action[],
  primary: ArchetypeId
): ArchetypeId {
  const primaryAction = Object.entries(ACTION_TO_ARCHETYPE).find(
    ([, id]) => id === primary
  )![0] as Action;

  const remaining = (['fold', 'call', 'raise'] as Action[]).filter((a) => a !== primaryAction);
  const [a, b] = remaining;

  // Clear second place
  if (counts[a] !== counts[b]) {
    return ACTION_TO_ARCHETYPE[counts[a] > counts[b] ? a : b];
  }

  // Tie for secondary — broken by earliest scenario answer among tied actions
  for (let i = 0; i < answers.length; i++) {
    if (remaining.includes(answers[i])) {
      return ACTION_TO_ARCHETYPE[answers[i]];
    }
  }

  // Fallback
  return ACTION_TO_ARCHETYPE[a];
}
