import { Action } from './types';

const ACTION_CHARS: Record<Action, string> = {
  fold: 'F',
  call: 'C',
  raise: 'R',
};

const CHAR_TO_ACTION: Record<string, Action> = {
  F: 'fold',
  C: 'call',
  R: 'raise',
};

export function encodeAnswers(answers: Action[]): string {
  const raw = answers.map((a) => ACTION_CHARS[a]).join('');
  if (typeof window !== 'undefined') {
    return btoa(raw);
  }
  return Buffer.from(raw).toString('base64');
}

export function decodeAnswers(encoded: string): Action[] | null {
  try {
    let raw: string;
    if (typeof window !== 'undefined') {
      raw = atob(encoded);
    } else {
      raw = Buffer.from(encoded, 'base64').toString();
    }

    if (raw.length !== 10) return null;

    const actions: Action[] = [];
    for (const char of raw) {
      const action = CHAR_TO_ACTION[char];
      if (!action) return null;
      actions.push(action);
    }

    return actions;
  } catch {
    return null;
  }
}
