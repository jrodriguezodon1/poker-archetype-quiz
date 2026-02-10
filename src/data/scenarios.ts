import { Scenario } from '@/lib/types';

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'The Opening Hand',
    street: 'pre-flop',
    position: 'UTG',
    holeCards: [
      { rank: 'J', suit: 'h' },
      { rank: 'T', suit: 's' },
    ],
    stack: 200,
    pot: 3,
    description:
      "First hand of the session. You're Under the Gun with J♥ T♠ — a hand with potential, but you're first to act at a full table. The table seems tight so far. Do you open this up or wait for something better?",
    actionLabels: { fold: 'Fold', call: 'Limp In', raise: 'Raise to $7' },
    tests: 'Opening tendency with a marginal hand',
  },
  {
    id: 2,
    title: 'The Squeeze',
    street: 'pre-flop',
    position: 'BTN',
    holeCards: [
      { rank: '8', suit: 'c' },
      { rank: '8', suit: 'd' },
    ],
    stack: 300,
    pot: 17,
    description:
      "A loose player opens to $6 from middle position, and a calling station flats from the cutoff. You're on the Button with pocket eights. You have position and a decent pair. The blinds are tight. Squeeze or see a flop?",
    actionLabels: { fold: 'Fold', call: 'Call $6', raise: 'Squeeze to $24' },
    tests: 'Squeeze play aggression vs. flat call',
  },
  {
    id: 3,
    title: 'The Wet Board',
    street: 'flop',
    position: 'CO',
    holeCards: [
      { rank: 'A', suit: 'h' },
      { rank: '9', suit: 'h' },
    ],
    communityCards: [
      { rank: 'K', suit: 'h' },
      { rank: '7', suit: 'h' },
      { rank: '3', suit: 'd' },
    ],
    stack: 185,
    pot: 24,
    description:
      "You raised pre-flop and got one caller. The flop comes K♥ 7♥ 3♦ — you missed the king but you have the nut flush draw with A♥ 9♥. Your opponent checks to you. You have 9 outs to the nuts and two cards to come.",
    actionLabels: { fold: 'Check Behind', call: 'Call the Clock', raise: 'Bet $18' },
    tests: 'Semi-bluff aggression with a flush draw',
  },
  {
    id: 4,
    title: 'The Overbet',
    street: 'turn',
    position: 'BB',
    holeCards: [
      { rank: 'Q', suit: 'd' },
      { rank: 'J', suit: 'd' },
    ],
    communityCards: [
      { rank: 'Q', suit: 's' },
      { rank: '8', suit: 'c' },
      { rank: '4', suit: 'h' },
      { rank: '2', suit: 's' },
    ],
    stack: 150,
    pot: 45,
    description:
      "You defended your big blind with Q♦ J♦ and hit top pair on a Q♠ 8♣ 4♥ board. You checked the flop and called a $15 bet. The turn is the 2♠. Now your opponent — a known bluffer who's been caught twice tonight — fires $40 into the $45 pot. You have top pair, decent kicker.",
    actionLabels: { fold: 'Fold', call: 'Call $40', raise: 'Raise to $100' },
    tests: 'Courage with medium hand vs. big bet from known bluffer',
  },
  {
    id: 5,
    title: 'The Multiway Limped Pot',
    street: 'flop',
    position: 'SB',
    holeCards: [
      { rank: '6', suit: 's' },
      { rank: '5', suit: 's' },
    ],
    communityCards: [
      { rank: '8', suit: 'd' },
      { rank: '7', suit: 'c' },
      { rank: 'K', suit: 's' },
    ],
    stack: 200,
    pot: 10,
    description:
      "Five players limped and you completed from the small blind with 6♠ 5♠. The flop is 8♦ 7♣ K♠ — you have an open-ended straight draw (any 4 or 9 makes it) plus a backdoor flush draw. Five opponents are in the pot. Do you lead out into the field?",
    actionLabels: { fold: 'Check', call: 'Check', raise: 'Bet $8' },
    tests: 'Leading into 5 opponents with just a draw',
  },
  {
    id: 6,
    title: 'The River Bluff Opportunity',
    street: 'river',
    position: 'BTN',
    holeCards: [
      { rank: 'A', suit: 'c' },
      { rank: '5', suit: 'c' },
    ],
    communityCards: [
      { rank: 'T', suit: 'h' },
      { rank: '6', suit: 'h' },
      { rank: '2', suit: 'd' },
      { rank: 'J', suit: 's' },
      { rank: '3', suit: 'h' },
    ],
    stack: 220,
    pot: 85,
    description:
      "You called a pre-flop raise with A♣ 5♣ on the button. The board runs out T♥ 6♥ 2♦ J♠ 3♥ — three hearts on board but you have none. Your opponent bet flop, bet turn, and now checks the river. They were clearly drawing to the flush and missed. You have ace-high — the worst made hand. But they just showed weakness.",
    actionLabels: { fold: 'Check Back', call: 'Check Back', raise: 'Bet $55' },
    tests: 'Pure bluff when opponent shows weakness (missed flush)',
  },
  {
    id: 7,
    title: 'The Cooler Setup',
    street: 'pre-flop',
    position: 'HJ',
    holeCards: [
      { rank: 'A', suit: 's' },
      { rank: 'K', suit: 's' },
    ],
    stack: 400,
    pot: 33,
    description:
      "You open to $8 with A♠ K♠ from the Hijack. The tightest player at the table — who's only shown premiums all night — 3-bets to $25 from the Cutoff. Then another solid regular cold-calls the $25 from the Button. You're 200bb deep. AK suited is a monster, but the action screams strength.",
    actionLabels: { fold: 'Fold', call: 'Call $25', raise: '4-Bet to $80' },
    tests: "AKs facing a nit's 3-bet + cold call, deep stacked",
  },
  {
    id: 8,
    title: 'The Small Pair',
    street: 'flop',
    position: 'MP',
    holeCards: [
      { rank: '4', suit: 'd' },
      { rank: '4', suit: 'c' },
    ],
    communityCards: [
      { rank: 'A', suit: 's' },
      { rank: 'K', suit: 'h' },
      { rank: 'T', suit: 'd' },
    ],
    stack: 190,
    pot: 30,
    description:
      "You called a raise with 4♦ 4♣ hoping to set mine. The flop comes A♠ K♥ T♦ — about as bad as it gets for your pocket fours. Two overcards on board, likely hitting the raiser's range hard. The pre-flop raiser bets $20 into the $30 pot. You're drawing to 2 outs at best.",
    actionLabels: { fold: 'Fold', call: 'Call $20', raise: 'Raise to $55' },
    tests: 'Letting go of a small pair on a scary board',
  },
  {
    id: 9,
    title: 'The Thin Value Spot',
    street: 'river',
    position: 'UTG+1',
    holeCards: [
      { rank: 'T', suit: 'd' },
      { rank: '9', suit: 'd' },
    ],
    communityCards: [
      { rank: 'T', suit: 's' },
      { rank: '5', suit: 'h' },
      { rank: '3', suit: 'c' },
      { rank: '8', suit: 'd' },
      { rank: '7', suit: 'd' },
    ],
    stack: 210,
    pot: 72,
    description:
      "You raised pre-flop with T♦ 9♦ and got called by a competent regular. You bet the T♠ 5♥ 3♣ flop, bet the 8♦ turn — they called both. River is 7♦, completing both the straight draw and the flush draw. You have top pair with a flush. But any 6x, J9, or 64 just got there. Do you go for thin value or play it safe?",
    actionLabels: { fold: 'Check', call: 'Check', raise: 'Bet $45' },
    tests: 'Value betting top pair on a completed board',
  },
  {
    id: 10,
    title: 'The Final Table Moment',
    street: 'pre-flop',
    position: 'BB',
    holeCards: [
      { rank: 'K', suit: 'c' },
      { rank: 'Q', suit: 'h' },
    ],
    stack: 120,
    pot: 15,
    description:
      "Last hand before you planned to leave. A player who's been on tilt — losing three big pots in a row and visibly frustrated — shoves all-in for $95 from middle position. It folds to you in the Big Blind with K♣ Q♥ and $120 behind. You've been playing solid all night. Do you trust your read that they're steaming?",
    actionLabels: { fold: 'Fold', call: 'Call $93', raise: 'Call $93' },
    tests: "KQ facing a tilted player's all-in, last hand of session",
  },
];
