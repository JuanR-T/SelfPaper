import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { handleGet } from '../../api/handleCall';
import toastProvider from '../../lib/toastProvider';
import { useAuth } from '../../context/AuthContext';
import { Publication, PublicationApiResponse } from '../../types/types';
import { FileImageOutlined } from '@ant-design/icons';
import { useSpring, animated } from 'react-spring';

const CarouselSection = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();
    const [selectedIndex, setSelectedIndex] = useState(0);
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

    const publications = (useQueryPublications?.data as PublicationApiResponse)
        ?.publications;

    const nextCard = () => {
        publications
            ? setSelectedIndex(
                (prevIndex) => (prevIndex + 1) % publications.length,
            )
            : '';
    };

    const prevCard = () => {
        publications
            ? setSelectedIndex(
                (prevIndex) =>
                    (prevIndex - 1 + publications.length) %
                    publications.length,
            )
            : '';
    };
    useEffect(() => {
        const carousel = carouselRef.current;
        const selectedCard = carousel?.querySelector('.card.center');
        selectedCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, [selectedIndex]);

    return (
        <div className="carousel-section">
            <h1>Mes Articles</h1>
            <div className="carousel-component">
                <div className="carousel-description"></div>
                <div className="carousel-box" ref={carouselRef}>
                    {publications?.map(
                        (publication: Publication, index: number) => {
                            const isCenter = index === selectedIndex;
                            const isLeft =
                                index ===
                                (selectedIndex - 1 + publications.length) %
                                publications.length;
                            const isRight =
                                index ===
                                (selectedIndex + 1) % publications.length;

                            let className = 'card';
                            if (isCenter) className += ' center';
                            else if (isLeft) className += ' left';
                            else if (isRight) className += ' right';

                            return (
                                <div
                                    className={className}
                                    key={publication._id}
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
                                    <h3>{publication.title}</h3>
                                    <div className="card-excerpt">
                                        {publication.excerpt}
                                    </div>
                                    <div className="card-date">
                                        Publié le {publication.publicationDate}
                                    </div>
                                </div>
                            );
                        },
                    )}
                </div>
                <div className="carousel-buttons">
                    <button className="carousel-button left" onClick={prevCard}>Previous</button>
                    <button className="carousel-button right" onClick={nextCard}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default CarouselSection;
