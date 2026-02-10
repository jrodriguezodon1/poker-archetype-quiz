'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileDetailProps {
  title: string;
  content: string;
}

export function ProfileDetail({ title, content }: ProfileDetailProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-serif text-cream text-sm">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-cream/50 text-xs"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="px-4 pb-4 text-cream/70 text-sm leading-relaxed">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
