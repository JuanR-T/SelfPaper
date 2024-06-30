import { useEffect, useState } from 'react';
import { color, motion } from 'framer-motion';
import clsx from 'clsx';

const HeroSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100); // Add a slight delay to trigger the animation
    }, []);

    // Define animation variants
    const variants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className={clsx('hero-section', { loaded: isLoaded })}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 1 }}
        >
            <div className="hero-content">
                <h1>Anne Chirol</h1>
                <div className="hero-biography">
                    <p>Journaliste au journal Le Monde.</p>
                    <p>
                        Anne Chirol est une journaliste pigiste pour divers
                        services du journal Le Monde, elle est connue notamment
                        pour sa chronique hebdomadaire "Toi meme", dans laquelle
                        elle dépeint des archétypes sociaux issues d'internet...
                    </p>
                    <button className="read-more-button">En savoir plus</button>
                </div>
            </div>
            <div className="hero-image"></div>
        </motion.div>
    );
};

export default HeroSection;
