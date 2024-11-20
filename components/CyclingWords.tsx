"use client";
import React, { useState, useEffect } from "react";

const words = ["Fast", "Easy", "Rafi"];

const CyclingWords = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullWord = words[wordIndex];
      const shouldDelete = isDeleting && currentWord.length === 0;
      const shouldChangeWord = !isDeleting && currentWord === currentFullWord;

      if (shouldDelete) {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setTypingSpeed(150);
      } else if (shouldChangeWord) {
        if (!isPaused) {
          setIsPaused(true);
          setTypingSpeed(2000); // 2-second pause
        } else {
          setIsDeleting(true);
          setIsPaused(false);
          setTypingSpeed(100);
        }
      } else if (isDeleting) {
        setCurrentWord(currentFullWord.substring(0, currentWord.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentWord(currentFullWord.substring(0, currentWord.length + 1));
        setTypingSpeed(150);
      }
    };

    const typingTimer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimer);
  }, [currentWord, isDeleting, wordIndex, typingSpeed, isPaused]);

  return (
    <span className="inline-block min-w-[110px] text-left">
      {currentWord}
      <span className="animate-blink text-purple-400 font-mono">|</span>
    </span>
  );
};

export default CyclingWords;
