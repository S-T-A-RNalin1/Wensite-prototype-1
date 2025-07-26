import { useEffect, useState } from 'react';

interface WordPosition {
  text: string;
  top: number;
  left: number;
  color: string;
  size: number;
  animation: string;
  id: number;
  isClickable: boolean;
  clickCount: number;
}

const RandomWords = () => {
  const [words, setWords] = useState<WordPosition[]>([]);

  const wordList = [
    'dream', 'cosmic', 'neon', 'digital', 'matrix', 'infinity', 'quantum', 'stellar',
    'electric', 'cyber', 'virtual', 'plasma', 'aurora', 'nexus', 'synth', 'void',
    'echo', 'pulse', 'flux', 'zen', 'mystic', 'azure', 'crimson', 'shadow',
    'whisper', 'enigma', 'prism', 'cascade', 'velocity', 'harmony', 'resonance', 'aether',
    'illuminate', 'transcend', 'levitate', 'cascade', 'emerge', 'dissolve', 'manifest', 'evolve',
    'vibrant', 'luminous', 'ethereal', 'infinite', 'timeless', 'boundless', 'radiant', 'sublime',
    'wanderer', 'explorer', 'pioneer', 'visionary', 'architect', 'navigator', 'guardian', 'seeker',
    'metropolis', 'sanctuary', 'dimension', 'constellation', 'odyssey', 'symphony', 'rhapsody', 'paradox'
  ];

  const colors = ['word-1', 'word-2', 'word-3', 'word-4', 'word-5', 'word-6', 'word-7', 'word-8'];

  const animations = [
    'animate-pulse',
    'animate-bounce',
    'hover:animate-ping',
    'animate-spin',
    'hover:animate-pulse'
  ];

  useEffect(() => {
    const generateWords = () => {
      const newWords: WordPosition[] = [];
      const wordCount = Math.floor(Math.random() * 30) + 40; // 40-70 words

      for (let i = 0; i < wordCount; i++) {
        const word = wordList[Math.floor(Math.random() * wordList.length)];
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 2; // Fixed size of 2rem for all words
        const isClickable = Math.random() > 0.4; // 60% chance to be clickable

        newWords.push({
          text: word,
          top,
          left,
          color,
          size,
          animation: '', // No animations
          id: i,
          isClickable,
          clickCount: 0
        });
      }
      setWords(newWords);
    };

    generateWords();
    
    // Regenerate words every 10 seconds
    const interval = setInterval(generateWords, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {words.map((word) => (
        <div
          key={word.id}
          className={`absolute font-bold text-${word.color} ${
            word.isClickable 
              ? 'pointer-events-auto cursor-pointer hover:text-accent opacity-100' 
              : 'pointer-events-none cursor-default opacity-60'
          }`}
          style={{
            top: `${word.top}%`,
            left: `${word.left}%`,
            fontSize: `${word.size - (word.clickCount * 0.3)}rem`, // Decrease size by 0.3rem per click
            transform: 'translate(-50%, -50%)',
            textShadow: `0 0 20px currentColor`,
            userSelect: 'none'
          }}
          onClick={word.isClickable ? () => {
            // Increment click count and remove word after 5 clicks
            setWords(prev => prev.map(w => {
              if (w.id === word.id) {
                const newClickCount = w.clickCount + 1;
                if (newClickCount >= 5) {
                  return null; // Mark for removal
                }
                return {
                  ...w,
                  clickCount: newClickCount
                };
              }
              return w;
            }).filter(Boolean) as WordPosition[]); // Remove null values
          } : undefined}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
};

export default RandomWords;