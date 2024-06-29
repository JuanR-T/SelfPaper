import { useEffect, useState } from 'react';
import { HeroParallax } from '../ui/HeroParallax';
import { useQuery } from 'react-query';
import { handleGet } from '../../api/handleCall';
import toastProvider from '../../lib/toastProvider';
import { PublicationApiResponse } from '../../types/types';
import { useAuth } from '../../context/AuthContext';

const HeroSection = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);
    const { data: useQueryPublications } = useQuery(
        'get_publications',
        async () => {
            const useQueryPublications = await handleGet(
                `${BASE_URL}/api/publication`,
                getConfig(),
            );
            if (!useQueryPublications || !useQueryPublications.data) {
                toastProvider(
                    'error',
                    'Une erreur est survenue pendant la récupération des publications. Veuillez réessayer.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return useQueryPublications;
        },
    );

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100); // Add a slight delay to trigger the animation
    }, []);

    const publications = (useQueryPublications?.data as PublicationApiResponse)?.publications || [];

    return (
        //<HeroParallax publications={publications} />
        <>
            <div className={`hero-section ${isLoaded ? 'loaded' : ''}`}>
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
            </div>
        </>
    );
};

export default HeroSection;