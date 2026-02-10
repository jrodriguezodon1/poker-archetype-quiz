'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Decorative suits */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-3xl mb-4 opacity-40 tracking-[0.3em]"
        >
          ♠ ♥ ♣ ♦
        </motion.div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream tracking-tight leading-tight">
          POKER
          <br />
          <span className="text-yellow-400">PERSONALITY</span>
          <br />
          PROFILE
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-cream/70 text-base"
        >
          10 hands. 3 choices. What does your poker instinct reveal?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Link href="/quiz">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center w-36 h-36 rounded-full border-[4px] border-dashed border-yellow-500 bg-yellow-500/15 text-yellow-400 font-serif font-bold text-lg cursor-pointer hover:bg-yellow-500/25 transition-colors"
            >
              DEAL
              <br />
              ME IN
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10"
        >
          <Link
            href="/archetypes"
            className="text-cream/40 text-sm underline underline-offset-4 hover:text-cream/60 transition-colors"
          >
            View all archetypes
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
