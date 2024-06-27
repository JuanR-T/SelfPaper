import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { handleGet } from '../../api/handleCall';
import toastProvider from '../../lib/toastProvider';
import { useAuth } from '../../context/AuthContext';
import { Publication, PublicationApiResponse } from '../../types/types';
import { FileImageOutlined } from '@ant-design/icons';
import { useTransition, animated } from 'react-spring';

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
    }, [selectedIndex]);

    const nextCard = () => {
        setPublicationsCarousel([]);
        setSelectedIndex((prevIndex) => (prevIndex + 1) % publications.length);
    };

    const prevCard = () => {
        setPublicationsCarousel([]);
        setSelectedIndex((prevIndex) =>
            (prevIndex - 1 + publications.length) % publications.length
        );
    };

    const transitions = useTransition(publicationsCarousel, {
        from: {
            opacity: 0.7,
            transition: 'transform 2s, opacity 0.5s'
        },
        enter: {
            opacity: 1,
            transition: 'transform 0.5s, opacity 1s'
        },
        leave: {
            opacity: 0.7,
            transition: 'transform 2s, opacity 0.7s'
        },
        config: { duration: 400, tension: 200, friction: 30 },
        keys: publication => publication._id // Ensure that the transitions identify each item correctly
    });

    return (
        <div className="carousel-section">
            <h1>Mes Articles</h1>
            <div className="carousel-component">
                <div className="carousel-description"></div>
                <div className="carousel-box" ref={carouselRef}>
                    {transitions((style, item) => {
                        return (
                            <animated.div
                                style={{
                                    ...style,
                                    transform: item.position === 'current' ? 'scale(1)' : 'scale(0.8)',
                                    opacity: item.position === 'current' ? 1 : 0.7,
                                    transition: 'transform 0.5s, opacity 0.7s'
                                }}
                                className={`card ${item.position}`}
                                key={item._id}
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
                                <h3>{item.title}</h3>
                                <div className="card-excerpt">
                                    {item.excerpt}
                                </div>
                                <div className="card-date">
                                    Publié le {item.publicationDate}
                                </div>
                            </animated.div>
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
