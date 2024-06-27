import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { handleGet } from '../../api/handleCall';
import toastProvider from '../../lib/toastProvider';
import { useAuth } from '../../context/AuthContext';
import { Publication, PublicationApiResponse } from '../../types/types';
import { FileImageOutlined } from '@ant-design/icons';

const CarouselSection = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [publicationsCarousel, setPublicationsCarousel] = useState<Publication[]>([]);
    const carouselRef = useRef<HTMLDivElement>(null);

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

    const publications = (useQueryPublications?.data as PublicationApiResponse)?.publications || [];

    useEffect(() => {
        if (publications.length > 0) {
            const prevIndex = (selectedIndex - 1 + publications.length) % publications.length;
            const nextIndex = (selectedIndex + 1) % publications.length;

            setPublicationsCarousel([
                { ...publications[prevIndex], position: 'prev' },
                { ...publications[selectedIndex], position: 'current' },
                { ...publications[nextIndex], position: 'next' },
            ]);
        }
    }, [selectedIndex, publications]);

    const nextCard = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % publications.length);
    };

    const prevCard = () => {
        setSelectedIndex((prevIndex) =>
            (prevIndex - 1 + publications.length) % publications.length
        );
    };

    const currentPublicationData = publicationsCarousel?.find(publication => publication.position === 'current');

    return (
        <div className="carousel-section">
            <h1>Mes Articles</h1>
            <div className="carousel-component">
                <div className="carousel-description">

                    {currentPublicationData ? (
                        <>
                            <h1>{currentPublicationData.title}</h1>
                            <p>{currentPublicationData.description}</p>
                            <p>{currentPublicationData.publisher.title}</p>
                            <p>{currentPublicationData.publisher.type}</p>
                            <p>{currentPublicationData.theme.title}</p>
                        </>
                    ) : ('')}

                </div>
                <div className="carousel-box" ref={carouselRef}>
                    {publicationsCarousel?.map((publicationCard) => {
                        return (
                            <div
                                style={{

                                    transform: publicationCard.position === 'current' ? 'scale(1)' : 'scale(0.8)',
                                    opacity: publicationCard.position === 'current' ? 1 : 0.7,
                                    transition: 'transform 0.5s, opacity 0.7s'
                                }}
                                className={`card ${publicationCard.position}`}
                                key={publicationCard._id}
                            >
                                <div className="card-image">
                                    <FileImageOutlined
                                        style={{
                                            fontSize: '80px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    />
                                </div>
                                <h3>{publicationCard.title}</h3>
                                <div className="card-excerpt">
                                    {publicationCard.excerpt}
                                </div>
                                <div className="card-date">
                                    Publié le {publicationCard.publicationDate}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="carousel-buttons">
                    <button className="carousel-button left" onClick={prevCard}>Previous</button>
                    <button className="carousel-button right" onClick={nextCard}>Next</button>
                </div>
            </div>
        </div >
    );
};

export default CarouselSection;
