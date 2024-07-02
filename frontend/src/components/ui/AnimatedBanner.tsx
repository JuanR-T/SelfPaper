import { useQuery } from 'react-query';
import { handleGet } from '../../api/handleCall';
import toastProvider from '../../lib/toastProvider';
import { PublicationApiResponse } from '../../types/types';
import { useAuth } from '../../context/AuthContext';
import { InfiniteMovingCards } from './InfiniteMovingCards';

const AnimatedBanner = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();

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

    return (
        <div className="banner-container">
            <InfiniteMovingCards
                items={publications}
                direction="left"
                speed="slow"
                pauseOnHover={true}
            />
        </div>
    );
};

export default AnimatedBanner;
