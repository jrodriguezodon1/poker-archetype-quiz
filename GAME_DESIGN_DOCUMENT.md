# Daily Poker Puzzle Game -- Comprehensive Design Document

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Competitive Landscape Analysis](#competitive-landscape-analysis)
3. [Core Game Design Mechanics](#core-game-design-mechanics)
4. [Predetermined Hand Design -- Creating Interesting Decisions](#predetermined-hand-design)
5. [Scoring and Money Mechanics](#scoring-and-money-mechanics)
6. [Accessibility for Non-Poker Players](#accessibility-for-non-poker-players)
7. [The Sharing Format](#the-sharing-format)
8. [Lessons from Balatro](#lessons-from-balatro)
9. [Name and Branding](#name-and-branding)
10. [Recommended Architecture](#recommended-architecture)

---

## 1. Executive Summary

This document outlines the design for a daily poker decision game -- a "Wordle for poker" where every player faces the same 5 Texas Hold'em hands per day, starts with $100, and makes fold/call/raise decisions at each street. The game targets a 2-3 minute session with a shareable result.

The core insight from analyzing Balatro (5M+ copies sold), Pile-Up Poker (Puzzmo's breakout hit), Pokle, Pokerle, and GTO training tools is this: **the game should not try to be poker. It should use poker as a familiar language to create an accessible daily decision puzzle.**

**Key Recommendations:**
- Use a single AI "Dealer" opponent (not multiple opponents) to simplify decisions
- Fixed bet sizes with 3 choices per street (Fold / Call / Raise) -- never ask the player to choose an amount
- Score against a GTO-optimal benchmark, but display results as money won/lost (accessible) with an optional "Decision Score" (for enthusiasts)
- Always show hand rankings on screen; highlight what the player currently has
- 5 hands, each taking 20-40 seconds, for a ~2-3 minute session
- Shareable emoji grid using card suit symbols and color-coded decision quality

---

## 2. Competitive Landscape Analysis

### Existing Games in the Space

**Pokle** (poklegame.com) -- "Wordle for poker" but it is a *deduction puzzle*, not a *decision game*. You see three players' hole cards and must guess the 5 community cards using color-coded feedback (green/yellow/grey). It tests poker hand ranking knowledge, not betting strategy. This is a fundamentally different game from what we are building.

**Pokerle** (pokerle.io) -- Nearly identical to Pokle. Guess the 5-card board in 6 tries using hand ranking clues. Again, a deduction puzzle.

**Pokerdle** (pokerdle.web.app / pokerdle.com) -- Same deduction mechanic but the answer must be a strong hand (Straight+).

**Pile-Up Poker** (Puzzmo) -- A card placement puzzle where you arrange cards on a 4x4 grid to form poker hands in rows, columns, and corners. Designed by Zach Gage. Key design insights:
- Removed 2s, 3s, 4s, and 5s from the deck, making strong hands achievable and reducing decision space
- The 10th "discard hand" rewards getting all 9 hands, creating a bonus goal
- Visual outlines show valid placements, reducing cognitive load
- Designed to be "sandboxy" -- learnable by clicking around, no tutorial needed

**Poker Patience / Poker Squares** -- The classic 5x5 grid solitaire poker game dating back to 1908. Pile-Up Poker is a modern spiritual successor.

**WPT GTO Trainer** (gto.learnwpt.com) -- The closest analog to our concept. Plays solved poker hands with instant feedback on EV loss compared to GTO. Has 4 billion+ solved hands. Shows the "ideal action" after each decision. However, it is a training tool aimed at serious players -- not a casual daily game.

**GTO Wizard** (gtowizard.com) -- Similar training tool. Offers 1v1 poker battles with ELO-style ratings. Has pre-solved solutions for common spots. Scores based on EV-loss from optimal.

### The Gap We Fill

**No one has built a daily poker *decision* game.** Every existing "poker Wordle" is a deduction puzzle (guess the cards). The GTO trainers are decision games but are serious training tools, not casual daily puzzles. Pile-Up Poker uses poker hands but not actual poker gameplay. Our game occupies a unique position: **the daily decision game using real poker betting mechanics, simplified for casual play.**

---

## 3. Core Game Design Mechanics

### The 2-3 Minute Session Flow

```
START: $100 bankroll displayed prominently

HAND 1 of 5:
  [See your hole cards]
  [Optional: Fold pre-flop for $0 cost]

  FLOP comes -->  Decision: Fold / Call / Raise
  TURN comes -->  Decision: Fold / Call / Raise
  RIVER comes --> Decision: Fold / Call / Raise

  [Showdown: See opponent's cards, see result]
  [Bankroll updates]

HAND 2 of 5: ... (repeat)
...
HAND 5 of 5: ... (repeat)

END: Final bankroll shown. Share result.
```

**Time budget:** Each hand should take 20-40 seconds. 5 hands = 100-200 seconds = roughly 2-3 minutes.

### Simplification Principles (Learned from Balatro and Pile-Up Poker)

**Principle 1: Fixed bet sizes, never variable.**
The single biggest source of complexity in real poker is bet sizing. Eliminate it entirely. Every street has exactly 3 options:
- **Fold** -- surrender, lose what you have put in
- **Call** -- match the current bet (shown as a dollar amount)
- **Raise** -- a fixed raise amount (e.g., 2x the current bet)

The player never types a number or moves a slider. Three big buttons. This mirrors how Balatro stripped poker to just hand rankings -- we strip poker to just the fold/call/raise decision.

**Principle 2: Single opponent, always the same "Dealer."**
Multiple opponents create exponential complexity (position, ranges, stack sizes). A single dealer opponent removes all of that. The Dealer plays a consistent, readable style -- slightly aggressive, occasionally bluffing. This is NOT a random AI; the Dealer's cards are predetermined as part of the daily puzzle. Everyone faces the same Dealer hands.

**Principle 3: Pots are structured, not open-ended.**
Each hand starts with a fixed ante from both player and Dealer. Betting follows a predictable structure:
- **Pre-flop:** Ante of $2 each ($4 in pot). Player can fold (lose $2), call ($2 more), or raise ($4 more).
- **Flop:** Bet is $4. Fold/Call $4/Raise $8.
- **Turn:** Bet is $6. Fold/Call $6/Raise $12.
- **River:** Bet is $8. Fold/Call $8/Raise $16.

Maximum investment per hand: $2 (ante) + $4 (pre-flop raise) + $8 (flop raise) + $12 (turn raise) + $16 (river raise) = $42. With $100 across 5 hands, you cannot go broke on hand 1 but must manage your bankroll.

**Principle 4: The Dealer acts first (simplifies game tree).**
In real poker, position alternates. In our game, the Dealer always bets first -- the player always responds. This eliminates the concept of "checking" and simplifies every decision to a response. The Dealer either bets (forcing a fold/call/raise) or checks (giving a free card / allowing a bet).

**Alternative considered: The Dealer acts second.** This would introduce bluffing (you bet, Dealer may fold). This is more interesting strategically but harder for beginners. **Recommendation: V1 has the Dealer bet first. V2 could add positions.**

### Detailed Hand Flow

```
HAND 3 of 5 | Bankroll: $87

YOUR CARDS: [K♠] [Q♠]          Dealer: [??] [??]

              Pot: $4
        Dealer bets $2

   [FOLD -$2]  [CALL $2]  [RAISE $4]
                              ^
                        Player taps CALL

--- FLOP: [J♠] [10♠] [3♥] ---

   YOUR HAND: Flush draw + straight draw
   (Label shown: "Open-Ended Straight Flush Draw")

              Pot: $8
        Dealer bets $4

   [FOLD -$4]  [CALL $4]  [RAISE $8]

--- TURN: [2♦] ---

   YOUR HAND: Still drawing
   (Label shown: "King High")

              Pot: $16
        Dealer bets $6

   [FOLD -$10]  [CALL $6]  [RAISE $12]

--- RIVER: [A♠] ---

   YOUR HAND: Ace-High Flush!
   (Label shown: "Flush, Ace High" with celebration)

              Pot: $28
        Dealer bets $8

   [FOLD -$16]  [CALL $8]  [RAISE $16]

--- SHOWDOWN ---
   Dealer shows: [A♥] [J♥]  (Two Pair, Aces and Jacks)
   You win with: Flush, Ace High!
   Pot won: $60
```

---

## 4. Predetermined Hand Design -- Creating Interesting Decisions

### What Makes a Poker Decision Interesting?

Based on analysis of poker training tools (SplitSuit's "10 Tough Poker Hands," WPT GTO Trainer scenarios, GTO Wizard spot libraries), the most engaging decisions share these properties:

**Category 1: Medium-strength hands in ambiguous spots.**
Not the nuts, not nothing. You have something -- but is it enough? Examples:
- Second pair on a coordinated board
- Top pair with a weak kicker
- An overpair when a flush completes

**Category 2: Draws with uncertain odds.**
You have a draw but the price to continue is high. Do you chase it? Examples:
- Flush draw facing a large bet
- Open-ended straight draw on a paired board
- Gutshot straight draw with overcards

**Category 3: Bluff-catching situations.**
The Dealer could be bluffing or could have it. Your hand can only beat a bluff. Examples:
- You have Ace-high and the Dealer bets big on the river
- The Dealer triple-barrels and you have middle pair

**Category 4: Value vs. protection decisions.**
You have a good hand -- but should you raise for value or call to keep bluffs in? Examples:
- You flop a set but the board has flush and straight draws
- You have the nut flush but the board pairs on the river

### The 5-Hand Daily Arc

The 5 hands should follow a dramatic arc, not be random:

```
Hand 1: WARM-UP     -- Straightforward decision. Clear fold or clear value hand.
                       Builds confidence. "I know poker."

Hand 2: DRAW CHASE  -- An exciting drawing hand. Will you hit?
                       Introduces risk/reward tension.

Hand 3: TRAP         -- A hand that looks good but is actually behind.
                       Tests discipline. The "right" play is to fold.

Hand 4: HERO CALL   -- A marginal hand where the Dealer might be bluffing.
                       Tests courage. High variance decision.

Hand 5: THE CLOSER  -- A big hand, big pot, dramatic river.
                       The "final boss." Maximum stakes feeling.
```

This arc creates a narrative. Hand 3 (the trap) is the key skill-tester -- most casual players will lose money here. Hand 5 (the closer) creates the memorable moment players will talk about.

### Hand Curation Process

Hands should be pre-computed and curated (not randomly generated). For each daily set:

1. **Generate candidate hands** using a poker hand database or Monte Carlo simulation
2. **Filter for interesting flop textures:** Wet boards (draws possible), paired boards, monotone boards
3. **Ensure each hand has a clear GTO-optimal line** but where the second-best option is close in EV
4. **Verify the arc** -- each hand fills a different role in the 5-hand narrative
5. **Playtest** -- run through the 5 hands in under 3 minutes

### Example Daily Hand Set

| Hand | Hole Cards | Board | Dealer Has | Interesting Because |
|------|-----------|-------|-----------|-------------------|
| 1 | A♠ K♦ | Q♣ J♠ 4♥ / 8♦ / 10♣ | 9♠ 9♦ | You flop a gutshot, hit the straight on river. Reward for patience. |
| 2 | 8♥ 7♥ | 6♥ K♥ 2♣ / J♠ / 3♥ | A♣ K♣ | Flush draw hits on river. Did you pay to see it? |
| 3 | K♣ Q♣ | K♥ 10♠ 5♦ / 10♣ / 7♠ | 10♦ 5♠ | You flop top pair but Dealer has trip tens by turn. Trap hand. |
| 4 | J♦ J♣ | A♠ 8♣ 3♦ / 6♠ / 2♥ | 7♠ 6♣ | Dealer pairs 6 on turn, bluffs river. Do you call with Jacks? |
| 5 | Q♥ Q♠ | Q♦ 9♠ 7♣ / 5♦ / 9♥ | A♠ 9♣ | You flop a set, Dealer rivers trip 9s. Big pot, you have the best hand. |

---

## 5. Scoring and Money Mechanics

### Primary Scoring: Dollar Bankroll

The player starts with **$100** and ends with some amount. This is the primary, visible, accessible score. Everyone understands "I ended with $142" vs. "I ended with $73."

**Why dollars work:**
- Universal understanding -- no explanation needed
- Creates genuine tension -- "I only have $61 going into hand 5"
- Natural comparison -- "I got $138, what did you get?"
- Bankroll management becomes an implicit skill -- going broke on hand 3 means you cannot play aggressively on hand 5

### Secondary Scoring: Decision Score (Optional, for Enthusiasts)

Behind the scenes, every decision has a GTO-optimal action computed by a solver. The player's **Decision Score** measures how close they played to optimal:

```
Decision Score: 92/100

Hand 1: Optimal (Call, Call, Raise)     +20/20
Hand 2: Optimal (Call, Call, Call)       +20/20
Hand 3: Mistake (Called, should Fold)    +12/20
Hand 4: Optimal (Call, Call, Call)       +20/20
Hand 5: Optimal (Call, Raise, Raise)    +20/20
```

**Why both scores?**
- Dollars reward results (including luck). A player who makes the "wrong" call but gets lucky still profits. This is fun and accessible.
- Decision Score rewards process. A player who makes the "right" fold but would have hit their draw gets credit. This satisfies poker enthusiasts.
- The tension between the two creates conversation: "I got $145 but only a 72 decision score -- I got lucky!"

### Pot Structure Options (Recommendation: Option B)

**Option A: Fixed pots, no bankroll management.**
Each hand is independent. You can win/lose a fixed amount per hand. Bankroll is just additive. Simple but removes bankroll tension.

**Option B: Escalating pots with bankroll management (RECOMMENDED).**
Hands escalate in stakes:
- Hand 1: $2/$4 blinds (max risk: ~$20)
- Hand 2: $3/$6 blinds (max risk: ~$30)
- Hand 3: $4/$8 blinds (max risk: ~$40)
- Hand 4: $5/$10 blinds (max risk: ~$50)
- Hand 5: $6/$12 blinds (max risk: ~$60)

This creates a natural arc where hand 5 matters most. If you lost money early, you might need to gamble on hand 5. If you built a stack, you can play conservatively. This mirrors tournament poker dynamics.

**Option C: All-in or fold simplified.**
Each hand is a single decision: go all-in or fold. Pots are predetermined. The simplest possible version -- good for V0 prototyping but may be too simple for retention.

### The Dealer (AI Opponent)

**The Dealer should NOT be trying to win.** The Dealer is a puzzle element, not an adversary. The Dealer's actions are predetermined each day -- everyone faces the same Dealer bets. Think of the Dealer like the board in Wordle: it is the challenge, not a competitor.

Dealer behavior per hand is scripted:
```
Hand 3 Dealer Script:
  Pre-flop: Bet (always)
  Flop: Bet $4 (has trip draw)
  Turn: Bet $6 (has trips now)
  River: Bet $8 (value betting)
```

The player does NOT know the Dealer's script in advance. The Dealer's bet sizes give information (just like in real poker), but the Dealer always follows the same script regardless of the player's actions. This is the key simplification: **the game tree has no branching on the Dealer's side.**

Exception: If the player raises, the Dealer always calls (never re-raises, never folds to a raise). This prevents the player from "bluffing" the Dealer (which would be confusing) while still rewarding raises with bigger pots when you have the best hand.

---

## 6. Accessibility for Non-Poker Players

### Lessons from Balatro

Balatro sold 5 million copies to an audience that largely does not play poker. LocalThunk (the developer) explicitly described poker as "an onboarding tool, a coat of paint" rather than the core mechanic. Key lessons:

1. **Most people already know hand rankings** (or at least the basics: pair, flush, straight). Balatro uses this existing knowledge as a foundation and builds on top of it. Our game should do the same -- assume partial knowledge, fill in gaps contextually.

2. **Poker vocabulary creates "psychological comfort."** Words like "blinds," "flop," "river" sound sophisticated and interesting. They make the player feel like they are doing something skilled, even before they understand the strategy. LocalThunk said: "There's a contingent of people more willing to interface with a game if it's talking about blinds, discards, and all these words."

3. **Balatro keeps hand rankings always visible on screen.** When you select cards, the left panel shows what hand you are about to play. Our game should do the same -- always show the player what hand they currently have.

4. **Balatro strips out everything hard about poker** -- no bluffing, no reading opponents, no bet sizing, no position play. What remains is the satisfying core: making hands and scoring points. Our game should similarly strip poker to its satisfying core: **seeing cards, evaluating your hand, deciding to commit or bail.**

### Lessons from Pile-Up Poker

Zach Gage's design principles for Pile-Up Poker are directly relevant:

1. **Remove low cards to reduce complexity.** Pile-Up uses a deck without 2s, 3s, 4s, or 5s. We should consider whether our hands feature cleaner board textures (no 2-2-7 rainbow flops that confuse newcomers).

2. **Make the game learnable by playing, not by reading.** Gage wanted players to "show up and just click around and find their way." Our game should be playable without reading a single rule. The three buttons (Fold/Call/Raise) should be self-explanatory.

3. **Celebrate good hands visually.** When a player makes a flush, it should feel GREAT -- animation, color, sound. This teaches hand rankings through positive reinforcement.

### In-Game Contextual Teaching

**Never show a tutorial screen.** Instead, embed teaching into the interface:

**Always-visible hand indicator:**
```
YOUR HAND
---------
[K♠] [Q♠]

Board: [J♠] [10♠] [3♥]

Current: King High
Drawing to: Straight (need A or 9)
Drawing to: Flush (need any ♠)
```

This tells the player:
- What they have NOW (King High)
- What they COULD make (Straight or Flush)
- What they NEED (specific cards)

This is the most powerful teaching tool possible. It turns every hand into a lesson without being didactic.

**Hand strength meter:**
```
HAND STRENGTH
[====------] Medium

  Royal Flush  ........  Strongest
  Straight Flush .......
  Four of a Kind .......
  Full House  ..........
  Flush  ...............
  Straight  ............
  Three of a Kind ......
  Two Pair  ............
> One Pair  ............ <-- YOU ARE HERE
  High Card  ...........  Weakest
```

This vertical ranking is always visible (collapsed by default, expandable). It teaches the hierarchy through context. Balatro does exactly this -- you learn that a Flush beats a Straight by seeing them ranked on screen.

**Contextual tooltips on first play:**
- First time you see a flush draw: "You have 4 spades. One more spade on the next card makes a Flush!"
- First time you fold: "Smart fold! You saved $X for later hands."
- First time you lose: "The Dealer had a better hand. You lost $X from the pot."

These appear only once (not every game) and are brief, positive, and encouraging.

### The "I Don't Know Poker" Onramp

For a player who has truly never played poker:

**Hand 1 is always beginner-friendly.** The first hand of every day should be a clear situation -- you have a good hand, the Dealer has a worse one, and calling/raising is obviously right. The player wins money on hand 1, feels good, and wants to continue.

**The game can be played as pure gambling.** A player who doesn't understand any strategy can still play by randomly choosing fold/call/raise. They will get a score. They will learn over time which decisions work. This is the Balatro lesson: the game doesn't REQUIRE understanding, it REWARDS it.

---

## 7. The Sharing Format

### Design Principles for Sharing

From analyzing Wordle, Connections, and Strands sharing formats:

1. **Spoiler-free:** Must not reveal the cards, the board, or the optimal decisions
2. **Narrative:** Each symbol should tell a mini-story of that hand
3. **Compact:** Must fit in a tweet/text message (under 280 characters)
4. **Visually distinctive:** Must be immediately recognizable as "that poker game"
5. **Conversation-starting:** Should provoke "how did you get THAT?" reactions

### Recommended Sharing Format

```
♠️ Daily Poker #47 ♠️

Hand 1: ✅✅✅ | +$18
Hand 2: ✅✅❌ | -$12
Hand 3: ✅🟡❌ | -$24
Hand 4: ✅✅✅ | +$36
Hand 5: ✅🟡✅ | +$22

Final: $140 | Score: 78/100
```

**What each symbol means:**
- ✅ Green check = Optimal decision at that street
- 🟡 Yellow circle = Suboptimal but reasonable decision (small EV loss)
- ❌ Red X = Significant mistake (large EV loss)
- Each hand shows 3 symbols for the 3 streets (flop/turn/river), or fewer if you folded early

**Why this works:**
- The green/yellow/red language is immediately familiar from Wordle
- You can see someone's decision quality without knowing the cards
- The dollar amounts add a second dimension of storytelling
- A player with all greens but -$12 reveals they made correct decisions but got unlucky (inviting conversation)
- A player with reds but +$36 reveals they got lucky despite bad play (inviting ribbing)

### Alternative Format: Card Suit Emojis

```
♠️♥️ Poker Daily #47

🃏 ♠️♠️♠️ | W +$18
🃏 ♠️♠️♦️ | L -$12
🃏 ♠️♥️♦️ | L -$24
🃏 ♠️♠️♠️ | W +$36
🃏 ♠️♥️♠️ | W +$22

💰 $140 | 🎯 78/100
```

Here ♠️ = optimal, ♥️ = suboptimal, ♦️ = mistake. This is more poker-themed but less immediately readable.

### Compact One-Line Format (for Twitter/SMS)

```
♠️ #47: ✅✅✅|✅✅❌|✅🟡❌|✅✅✅|✅🟡✅ = $140 (78)
```

### Story-Mode Format (for longer sharing)

```
♠️ Daily Poker #47 ♠️

🏆 Hand 1: Flopped a straight. Easy money.
😤 Hand 2: Chased a flush, missed.
🪤 Hand 3: Fell into the trap. Should've folded the turn.
🎰 Hand 4: Hero called the bluff!
🔥 Hand 5: Set over set. HUGE pot.

💰 $140 | 🎯 78/100
```

This version is more fun to read but reveals more about the hands. Could be an opt-in "detailed share" mode.

---

## 8. Lessons from Balatro

### Balatro: By the Numbers

- **Developer:** LocalThunk (solo developer, IT worker from Saskatchewan)
- **Release:** February 2024
- **Sales:** 5 million+ copies by January 2025 ($1M revenue in first 8 hours)
- **Awards:** Game of the Year (Game Developers Choice Awards), Best Independent Game + Best Debut Indie Game + Best Mobile Game (The Game Awards 2024), Golden Joystick Breakthrough Award
- **First solo-developed game nominated for Game of the Year** at The Game Awards

### What Made Balatro Work

**1. Poker as a Trojan horse for depth.**
LocalThunk (who does not play poker) chose poker not for its gameplay but for its *cultural legibility*. "Poker would be a really good thematic tie-in that a lot of people could use as a launching point to understand some of the mechanics." The actual mechanical inspiration was Big Two, a Cantonese card game. Poker's vocabulary (blinds, flop, river) created familiarity; the actual system was something entirely new.

**Lesson for our game:** Use poker vocabulary and visuals to create comfort, but do not feel bound to replicate poker perfectly. Our simplified betting system, single Dealer opponent, and scripted Dealer actions are all "un-poker" choices that serve the game.

**2. Visible multiplication creates excitement.**
In Balatro, a basic pair might score 20 points, but with the right Jokers, it scores 20,000. The math is transparent and addictive -- you watch the numbers multiply in real time. This "power fantasy through math" is the core dopamine loop.

**Lesson for our game:** Make pot sizes and winnings feel dramatic. When the player wins a big pot on hand 5, show the numbers counting up. When they make the correct raise, show how much MORE they won compared to just calling. Make the math visible and satisfying.

**3. Runs are short enough to replay, long enough to care.**
Balatro runs last 20-40 minutes -- the "sweet spot for roguelikes." Our daily game at 2-3 minutes is even shorter, which is ideal for a daily puzzle. The key is that each session must feel complete: a beginning (hand 1), rising action (hands 2-3), climax (hand 4-5), and resolution (final score).

**4. The "one more" loop through variation.**
Balatro's Jokers create billions of possible combinations, ensuring no two runs feel the same. For our daily game, variation comes from the different hand/board combinations. With 5 new hands every day, the game stays fresh indefinitely. But we can add a "practice mode" with random hands for players who want to play more than once a day.

**5. Stripping poker to its satisfying core.**
Balatro removed: bluffing, bet sizing, opponent reading, position play, bankroll management, pot odds calculation, and multi-way pots. What remained: making poker hands and watching them score. Our game should similarly identify the satisfying core of poker *decisions* and remove everything else.

**The satisfying core we preserve:** "I see my cards. I see the board developing. I decide whether to commit or bail. I feel smart when I'm right." Everything else (exact bet sizes, multiple opponents, pot odds math) is stripped away.

---

## 9. Name and Branding

### Competitive Name Analysis

| Name | Status | Notes |
|------|--------|-------|
| Pokle | TAKEN | poklegame.com -- active daily poker deduction puzzle |
| Pokerle | TAKEN | pokerle.io -- active daily poker deduction puzzle |
| Pokerdle | TAKEN | pokerdle.web.app and pokerdle.com -- active |
| Casinole | FOR SALE | casinole.com listed at EUR 500,000 -- too expensive, also casino association is broader than poker |
| Flopzilla | TAKEN | flopzilla.com -- existing poker analysis software |

### Name Recommendations

**Tier 1: Strong Recommendations**

1. **Holdle** (hold + -le, from "Hold'em")
   - Immediately communicates "poker daily game"
   - Easy to spell and say
   - Check: holdle.com availability would need verification
   - Variations: holdle.io, playholdle.com

2. **Ante Up** (the poker term for putting money in)
   - Not a -dle name, which is refreshing now that the Wordle trend is mature
   - Strong brand identity, action-oriented
   - Very memorable and conversation-friendly
   - Variations: anteup.game, playanteup.com, dailyanteup.com

3. **The Daily Flop**
   - Descriptive, easy to understand
   - "Flop" is the most dramatic moment in Hold'em
   - Works well as a newspaper-style title
   - Variations: dailyflop.com, thedailyflop.com

4. **Floppy** (casual, friendly name referencing "the flop")
   - Approachable, non-intimidating
   - Memorable and fun to say
   - Appeals to casual audience
   - Variations: playfloppy.com, floppy.game

**Tier 2: Worth Considering**

5. **Pottle** (pot + -le)
   - Poker "pot" reference + Wordle format
   - Short and catchy

6. **Dealdle** (deal + -le)
   - References card dealing
   - Slightly awkward to say out loud

7. **Riverdle** (river + -le)
   - References the "river" card (final community card)
   - Poker-specific but may be too niche for casual audience

8. **Bluffdle** (bluff + -le)
   - Fun, references poker's most exciting concept
   - Even though our game doesn't have bluffing per se, the word is evocative

9. **Showdown**
   - Strong, dramatic poker term
   - Not a -dle name
   - Easy to understand even for non-poker players

10. **All In**
    - Universally understood poker phrase
    - Works as a brand: "Have you played All In today?"
    - Variations: allin.game, dailyallin.com, playallin.com

**Tier 3: Creative / Unusual**

11. **Fold or Gold** -- Describes the core mechanic. Rhymes.
12. **Five Streets** -- References the 5 hands and poker "streets."
13. **The Nuts** -- Poker slang for the best hand. Risky but memorable.
14. **Pocket** -- From "pocket cards" (hole cards). Clean, short.
15. **Kicker** -- The extra card in poker. Fun word.

### Naming Recommendation

**Primary recommendation: "Holdle"** -- it is the most natural poker-Wordle fusion, immediately communicates the concept, and is easy to share ("Did you play Holdle today?"). It references Hold'em specifically, which is the exact variant we are building.

**Runner-up: "Ante Up"** -- stronger brand identity, works better if you want to eventually expand beyond the -dle naming convention, and is more approachable to non-poker players who might not know what "Hold'em" means.

---

## 10. Recommended Architecture

### Technical Stack for a Daily Puzzle Game

**Daily puzzle delivery:**
- Each day's puzzle (5 hands with all cards, Dealer actions, and GTO solutions) is a single JSON object
- Generated and curated in advance (at least 30 days ahead)
- Served as static content -- no server-side game logic needed during play
- All game logic runs client-side in the browser

**Puzzle data structure (per day):**
```json
{
  "day": 47,
  "date": "2026-02-10",
  "hands": [
    {
      "playerCards": ["Ks", "Qs"],
      "dealerCards": ["9s", "9d"],
      "board": ["Qc", "Js", "4h", "8d", "Tc"],
      "dealerActions": {
        "preflop": "bet",
        "flop": "bet",
        "turn": "check",
        "river": "bet"
      },
      "betSizes": {
        "preflop": 2,
        "flop": 4,
        "turn": 0,
        "river": 8
      },
      "optimalLine": ["call", "call", "call", "raise"],
      "optimalEV": 18.5,
      "handType": "warmup",
      "difficulty": 1
    }
  ]
}
```

**Anti-cheat consideration:** The puzzle JSON should NOT be delivered in its entirety at page load (players could inspect it). Instead:
- Deliver each hand's hidden information (Dealer cards, future board cards) only after the player completes that hand
- Or encrypt the puzzle data client-side and decrypt street-by-street as the player progresses
- Or use a simple server API that accepts decisions and returns the next street

**Frontend:**
- React or vanilla JS -- minimal framework needed
- Card animations using CSS transforms
- Mobile-first responsive design (most daily game plays happen on phones)
- Local storage for streak tracking, history, and statistics

**Backend (minimal):**
- Static JSON hosting (S3/Cloudflare) for daily puzzles
- Optional: lightweight API for leaderboards and share tracking
- Optional: authentication for streak persistence across devices

### Puzzle Generation Pipeline

```
1. Monte Carlo hand generator
   --> Generates thousands of candidate hands

2. Interest filter
   --> Filters for hands with close EV between fold/call/raise
   --> Ensures variety of hand types (draws, traps, value, bluffs)

3. GTO solver (simplified)
   --> Computes optimal action for each street
   --> Computes EV for each possible action
   --> Flags hands where the decision is "interesting" (EV gap < 5BB)

4. Arc curator (human or AI-assisted)
   --> Selects 5 hands that form a narrative arc
   --> Ensures difficulty progression
   --> Verifies 2-3 minute total play time

5. Publish
   --> Generates daily JSON
   --> Schedules for target date
```

---

## Appendix A: Risk Assessment

| Risk | Mitigation |
|------|-----------|
| "Too much like real poker" -- intimidates casual players | Strip complexity: 3 buttons, single opponent, always-visible hand info |
| "Too simple" -- bores poker players | Decision Score provides depth; hand curation creates genuinely tough spots |
| "Just luck" -- no skill expression | GTO scoring proves skill; 5-hand sample reduces variance vs. single hand |
| "Same every day" -- gets stale | 5 new hands daily; impossible to memorize; 2.6M possible Hold'em boards |
| "No social hook" -- doesn't spread | Sharing format designed for conversation; dollar score is universally comparable |
| "Bankroll management too complex" | Fixed bet structure means bankroll impact is bounded and predictable |

## Appendix B: Monetization Notes (Future)

- **Free daily puzzle + ads** (Wordle model before NYT acquisition)
- **Premium features:** Unlimited practice hands, detailed GTO analysis, hand history, statistics
- **"Poker Pass"** subscription: Past puzzles, detailed strategy breakdowns, leaderboards
- **No pay-to-win mechanics** -- the daily puzzle must always be free and identical for all players

## Appendix C: V1 Launch Checklist

- [ ] 5-hand daily puzzle with predetermined cards and Dealer actions
- [ ] 3-button interface (Fold / Call / Raise) with dollar amounts shown
- [ ] Always-visible hand strength indicator with draw outs
- [ ] Bankroll tracking across 5 hands starting at $100
- [ ] End-of-game summary with dollar total and decision score
- [ ] Shareable emoji result (copy to clipboard)
- [ ] Mobile-responsive design
- [ ] 30 days of pre-curated puzzles
- [ ] Streak tracking (localStorage)
- [ ] No account required

---

*Document generated: February 10, 2026*
*Based on research into: Balatro, Pile-Up Poker (Puzzmo), Pokle, Pokerle, Pokerdle, WPT GTO Trainer, GTO Wizard, Wordle, NYT Connections, Poker Patience/Poker Squares*
