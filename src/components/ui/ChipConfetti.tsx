'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHIP_COLORS = ['#c0392b', '#2980b9', '#f39c12', '#27ae60', '#8e44ad'];

interface ConfettiChip {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
  size: number;
}

export function ChipConfetti() {
  const [chips, setChips] = useState<ConfettiChip[]>([]);

  useEffect(() => {
    const generated: ConfettiChip[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CHIP_COLORS[Math.floor(Math.random() * CHIP_COLORS.length)],
      delay: Math.random() * 0.8,
      rotation: Math.random() * 720 - 360,
      size: 12 + Math.random() * 16,
    }));
    setChips(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {chips.map((chip) => (
          <motion.div
            key={chip.id}
            initial={{ y: -20, x: `${chip.x}vw`, opacity: 1, rotate: 0 }}
            animate={{
              y: '110vh',
              rotate: chip.rotation,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: chip.delay,
              ease: 'easeIn',
            }}
            className="absolute"
            style={{ left: 0, top: 0 }}
          >
            <div
              className="rounded-full border-2 border-dashed"
              style={{
                width: chip.size,
                height: chip.size,
                borderColor: chip.color,
                backgroundColor: `${chip.color}33`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
