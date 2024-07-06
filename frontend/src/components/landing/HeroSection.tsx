import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

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
                        <span className="hero-subtitle">
                            Journaliste indépendante
                        </span>
                        <a href="#biography-container" className="my-10 shadow-[0_0_0_1px_#000000_inset] px-6 py-2 bg-green-800 border border-white dark:border-black dark:text-black text-white rounded-xl font-semibold transform hover:-translate-y-2 transition duration-200 hover:text-white">
                            En savoir plus
                        </a>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default HeroSection;
