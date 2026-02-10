'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md text-center"
      >
        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto w-16 h-px bg-yellow-500/60 mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-cream/40 text-xs uppercase tracking-[0.25em] mb-6"
        >
          The Story Behind the Cards
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-serif text-3xl sm:text-4xl text-cream font-bold leading-snug"
        >
          Every great game starts
          <br />
          with a <span className="text-yellow-400">great read.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 space-y-5 text-cream/60 text-sm leading-relaxed"
        >
          <p>
            The Poker Personality Profile was born from a simple observation at the table: the way
            you play your cards says more about you than any hand you&apos;re dealt.
          </p>
          <p>
            Are you the player who waits in silence for the perfect moment to strike? The one who
            reads the room and plays the players, not just the cards? Or do you push all-in on
            instinct, trusting the chaos?
          </p>
          <p>
            Ten hands. Three choices each. That&apos;s all it takes to reveal the archetype
            that&apos;s been shaping your decisions all along.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mx-auto w-10 h-px bg-cream/20 my-10"
        />

        {/* Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-2"
        >
          <p className="text-cream/30 text-xs uppercase tracking-[0.2em]">Original concept by</p>
          <p className="font-serif text-xl text-yellow-400 font-semibold">Brandon Moran</p>
          <p className="text-cream/40 text-xs mt-1">
            The mind that saw poker not just as a game of cards,
            <br />
            but as a mirror.
          </p>
        </motion.div>

        {/* Decorative suits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 text-lg opacity-20 tracking-[0.4em]"
        >
          ♠ ♥ ♣ ♦
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-10"
        >
          <Link href="/quiz">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-8 py-3 rounded-full bg-yellow-500 text-gray-900 font-bold text-sm cursor-pointer hover:bg-yellow-400 transition-colors"
            >
              Take the Quiz
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-5"
        >
          <Link
            href="/"
            className="text-cream/30 text-sm underline underline-offset-4 hover:text-cream/50 transition-colors"
          >
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
