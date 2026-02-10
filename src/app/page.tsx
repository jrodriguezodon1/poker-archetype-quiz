'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleStart = () => {
    const trimmed = name.trim();
    if (trimmed) {
      sessionStorage.setItem('poker-personality-name', trimmed);
    } else {
      sessionStorage.removeItem('poker-personality-name');
    }
    router.push('/quiz');
  };

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
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="Your name (optional)"
            maxLength={30}
            className="w-48 bg-transparent border-b-2 border-cream/30 text-cream text-center text-sm py-2 placeholder:text-cream/30 focus:border-yellow-400 focus:outline-none transition-colors"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="inline-flex items-center justify-center w-36 h-36 rounded-full border-[4px] border-dashed border-yellow-500 bg-yellow-500/15 text-yellow-400 font-serif font-bold text-lg cursor-pointer hover:bg-yellow-500/25 transition-colors"
          >
            DEAL
            <br />
            ME IN
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <Link
            href="/archetypes"
            className="text-cream/40 text-sm underline underline-offset-4 hover:text-cream/60 transition-colors"
          >
            View all archetypes
          </Link>
          <Link
            href="/about"
            className="text-cream/25 text-xs hover:text-cream/40 transition-colors"
          >
            A <span className="underline underline-offset-2">Brandon Moran</span> original
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
