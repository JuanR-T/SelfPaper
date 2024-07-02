'use client';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import Capitalize from '../../lib/capitalizeLetter';

export const FlipWords = ({
    words,
    duration = 3000,
    className,
}: {
    words: string[];
    duration?: number;
    className?: string;
}) => {
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const wordsFormatted = Capitalize(words);

    const startAnimation = useCallback(() => {
        const word =
            wordsFormatted[wordsFormatted.indexOf(currentWord) + 1] ||
            wordsFormatted[0];
        setCurrentWord(word);
        setIsAnimating(true);
    }, [currentWord, wordsFormatted]);

    useEffect(() => {
        if (!isAnimating)
            setTimeout(() => {
                startAnimation();
            }, duration);
    }, [isAnimating, duration, startAnimation]);

    return (
        <AnimatePresence
            onExitComplete={() => {
                setIsAnimating(false);
            }}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                }}
                exit={{
                    opacity: 0,
                    y: -40,
                    x: 40,
                    filter: 'blur(8px)',
                    scale: 2,
                    position: 'absolute',
                }}
                className={cn(
                    'z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100',
                    className,
                )}
                key={currentWord}
            >
                {currentWord.split('').map((letter, index) => (
                    <motion.span
                        key={currentWord + index}
                        initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                            delay: index * 0.08,
                            duration: 0.4,
                        }}
                        className="inline-block"
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};
