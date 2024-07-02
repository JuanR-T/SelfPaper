import { useQuery } from 'react-query';
import { handleGet } from '../../api/handleCall';
import toastProvider from '../../lib/toastProvider';
import { useAuth } from '../../context/AuthContext';
import { PublicationApiResponse } from '../../types/types';
import { HeroParallax } from '../ui/HeroParallax';
import MagicText from '../ui/MagicText';

const CarouselSection = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();

    //TODO Refacto all useQuery get_publications in order to avoid multiple calls
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

    const publications =
        (useQueryPublications?.data as PublicationApiResponse)?.publications ||
        [];
    /** TODO Change publicationType type, its array now  */
    /** Use tabs aceternity ui component to make the carousel */
    return (
        <>
            <HeroParallax publications={publications} />
            <MagicText />
        </>
    );
};

export default CarouselSection;
