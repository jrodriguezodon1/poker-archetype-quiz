import { Archetype, ArchetypeCombo } from '@/lib/types';

export const archetypes: Record<string, Archetype> = {
  fortress: {
    id: 'fortress',
    action: 'fold',
    name: 'The Fortress',
    tagline: "Patience isn't passive — it's a loaded spring.",
    decisionMaking:
      "You don't play hands — you choose battles. While others splash chips on marginal spots, you're mentally cataloging their tendencies, waiting for the perfect moment to strike. Your fold button isn't a sign of weakness; it's a weapon. When you do enter a pot, opponents know they're in trouble.",
    riskTolerance:
      "Low variance is your friend. You'd rather make one confident, well-timed move than gamble on four coin flips. Your bankroll barely fluctuates because you refuse to put money in bad spots. Some call it nitty — you call it profitable.",
    tableInstincts:
      "You read the table before you read your cards. Position, stack sizes, player tendencies — you process it all before deciding. Your patience frustrates aggressive players because they can never get you to make a mistake. When you finally push back, they second-guess everything.",
  },
  bloodhound: {
    id: 'bloodhound',
    action: 'call',
    name: 'The Bloodhound',
    tagline: "I'll see it to believe it — and I usually don't believe it.",
    decisionMaking:
      "You're the player who always wants more information before committing. Calling is your way of keeping the story going — you want to see what your opponent does next, read another chapter before you decide. You trust your ability to navigate tricky spots post-flop more than pre-flop math.",
    riskTolerance:
      "Moderate — you're willing to put chips at risk, but only when you're getting the full picture. You don't mind paying a price to see more cards or gather more reads. Your risk isn't reckless; it's calculated curiosity. You lose some to information costs, but you make it back by catching bluffs others would fold to.",
    tableInstincts:
      "You're the human lie detector at the table. Every bet tells you something, and you're always listening. Your opponents hate playing against you because you never believe them. You'll call down with middle pair if something feels off — and you're right more often than you should be.",
  },
  shark: {
    id: 'shark',
    action: 'raise',
    name: 'The Shark',
    tagline: 'Why react when you can dictate?',
    decisionMaking:
      "You believe the best defense is a relentless offense. Raising is your default because it gives you two ways to win — they fold, or you have the best hand. You're not waiting for perfect spots; you're creating them. Every raise is a statement: this pot is mine unless you prove otherwise.",
    riskTolerance:
      "High, but calculated. You understand that aggression has a cost, but you also know it has a higher expected value than passivity. You're comfortable with big swings because you know your aggressive style prints money in the long run. Variance doesn't scare you — it excites you.",
    tableInstincts:
      "You set the tempo. When you sit down, the table dynamics shift — suddenly everyone's playing your game. Passive players tighten up further, and aggressive players have to decide if they want a war. You exploit hesitation mercilessly and never give free cards. Your opponents play worse against you because you keep them under constant pressure.",
  },
};

export const archetypeCombos: ArchetypeCombo[] = [
  {
    primary: 'fortress',
    secondary: 'bloodhound',
    name: 'The Sentinel',
    description:
      "You're a patient observer who occasionally lets curiosity override caution. You'll wait for great spots, but when something smells off, you can't resist investigating. You fold most hands but call down the ones that matter — and your timing is impeccable.",
  },
  {
    primary: 'fortress',
    secondary: 'shark',
    name: 'The Ambush Predator',
    description:
      "Silent and deadly. You wait in the tall grass for long stretches, but when you pounce, it's with maximum aggression. Your opponents never see it coming because you've been so quiet — then suddenly you're raising and re-raising with authority. The ultimate trap-setter.",
  },
  {
    primary: 'bloodhound',
    secondary: 'fortress',
    name: 'The Detective',
    description:
      "You're methodical about gathering evidence before making your case. You'll call to investigate, but you know when a hand is dead and you're disciplined enough to walk away. You solve the puzzle one street at a time and rarely reach the wrong conclusion.",
  },
  {
    primary: 'bloodhound',
    secondary: 'shark',
    name: 'The Trap Artist',
    description:
      "You lure opponents into false confidence by calling — then spring the trap when the moment is right. Your calls aren't passive; they're setups. You let aggressive players hang themselves while you wait for the perfect moment to pounce with a raise. Deceptively dangerous.",
  },
  {
    primary: 'shark',
    secondary: 'fortress',
    name: 'The Sniper',
    description:
      "Aggressive but selective. You don't spray chips around randomly — you pick your targets carefully, then attack with precision. When you raise, it's because you've identified a weakness worth exploiting. You combine the Shark's aggression with the Fortress's patience for devastating effect.",
  },
  {
    primary: 'shark',
    secondary: 'bloodhound',
    name: 'The Interrogator',
    description:
      "You raise to ask questions, then watch closely for the answers. Your aggression isn't blind — it's a tool for extracting information. Every raise is a test, and you read the response like a poker psychologist. You push opponents out of their comfort zone and exploit the information they leak.",
  },
];

export function getCombo(primary: string, secondary: string): ArchetypeCombo | undefined {
  return archetypeCombos.find((c) => c.primary === primary && c.secondary === secondary);
}
