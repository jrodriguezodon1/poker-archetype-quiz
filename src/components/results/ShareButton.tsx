'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ShareButtonProps {
  url: string;
  archetypeName?: string;
  name?: string;
}

export function ShareButton({ url, archetypeName, name }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareTitle = name && archetypeName
      ? `${name} is ${archetypeName}!`
      : archetypeName
        ? `I'm ${archetypeName}!`
        : 'My Poker Personality';

    const shareText = name
      ? `${name} is ${archetypeName || 'a poker natural'}! Take the quiz to find YOUR poker personality.`
      : `Check out my poker archetype — ${archetypeName || 'what\'s yours'}?`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url,
        });
        return;
      } catch {
        // User cancelled or share failed, fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-cream font-bold text-sm hover:bg-white/20 transition-colors"
    >
      {copied ? 'Link Copied!' : 'Share Your Results'}
    </motion.button>
  );
}
