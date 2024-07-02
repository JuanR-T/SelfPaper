import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const MagicText = () => {
    const controls = useAnimation();

    useEffect(() => {
        const handleInView = () => {
            const element = document.getElementById('magic-text');
            if (element) {
                const top = element.getBoundingClientRect().top;
                const isInView = top < window.innerHeight;
                if (isInView) {
                    controls.start({
                        opacity: 1,
                        y: [20, -5, 0],
                        transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
                    });
                } else {
                    controls.start({ opacity: 0, y: 20 });
                }
            }
        };

        // Initial check on component mount
        handleInView();

        // Add scroll listener to check again on scroll
        window.addEventListener('scroll', handleInView);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('scroll', handleInView);
    }, [controls]);

    return (
        <div id="magic-text">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
            >
                Pour voir le reste de mes articles ainsi que mes livres vous
                pouvez cliquer sur ce lien <br />
                <a href="#" className="read-more-button">
                    Voir plus d'articles
                </a>
            </motion.h1>
        </div>
    );
};

export default MagicText;
