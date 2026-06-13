import { useState, useEffect } from 'react';

interface TypingTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypingText({
  words,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 1800,
}: TypingTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[currentWordIndex];

    if (!isDeleting) {
      // Typing phase
      if (displayedText.length < fullWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(fullWord.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Full word typed, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Word cleared, switch to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] font-display font-bold">
      {displayedText}
      <span className="ml-[1px] inline-block w-[3px] h-[1.125em] translate-y-[2px] bg-[#00d4ff] animate-pulse" />
    </span>
  );
}
