import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FlipWords } from '../ui/FlipWord';

const HeroSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100);
    }, []);

    const variants = {
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <div className="hero-mask"></div>

            <motion.div
                className={clsx('hero-section', { loaded: isLoaded })}
                initial="hidden"
                animate={isLoaded ? 'visible' : 'hidden'}
                variants={variants}
                transition={{ duration: 1 }}
            >
                <div className="hero-content">
                    <h1>Anne Chirol</h1>
                    <div className="hero-biography">
                        <span className="hero-flip-word">
                            Journaliste indépendante
                        </span>

                        <button className="read-more-button">
                            En savoir plus
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default HeroSection;
