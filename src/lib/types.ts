export type Suit = 'h' | 'd' | 'c' | 's';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K';

export interface Card {
  rank: Rank;
  suit: Suit;
}

export type Street = 'pre-flop' | 'flop' | 'turn' | 'river';
export type Position = 'UTG' | 'UTG+1' | 'MP' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';
export type Action = 'fold' | 'call' | 'raise';

export interface ActionLabel {
  fold: string;
  call: string;
  raise: string;
}

export interface Scenario {
  id: number;
  title: string;
  street: Street;
  position: Position;
  holeCards: [Card, Card];
  communityCards?: Card[];
  stack: number;
  pot: number;
  description: string;
  actionLabels: ActionLabel;
  tests: string;
}

export type ArchetypeId = 'fortress' | 'bloodhound' | 'shark';

export interface Archetype {
  id: ArchetypeId;
  action: Action;
  name: string;
  tagline: string;
  decisionMaking: string;
  riskTolerance: string;
  tableInstincts: string;
}

export type ComboKey = `${ArchetypeId}-${ArchetypeId}`;

export interface ArchetypeCombo {
  primary: ArchetypeId;
  secondary: ArchetypeId;
  name: string;
  description: string;
}

export interface QuizResult {
  answers: Action[];
  foldCount: number;
  callCount: number;
  raiseCount: number;
  primary: ArchetypeId;
  secondary: ArchetypeId;
}

export interface QuizState {
  answers: (Action | null)[];
  currentScenario: number;
  isComplete: boolean;
}

export type QuizAction =
  | { type: 'ANSWER'; scenarioIndex: number; action: Action }
  | { type: 'GO_TO_SCENARIO'; index: number }
  | { type: 'NEXT_SCENARIO' }
  | { type: 'PREV_SCENARIO' }
  | { type: 'COMPLETE' }
  | { type: 'RESET' }
  | { type: 'RESTORE'; state: QuizState };
