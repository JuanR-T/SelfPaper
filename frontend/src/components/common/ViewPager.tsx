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
    const [publicationList, setPublicationList] = useState<Publication[]>([]);

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

    useEffect(() => {
        const publications = (useQueryPublications?.data as PublicationApiResponse)?.publications || [];
        setPublicationList(publications);
    }, [useQueryPublications]);

    const nextCard = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % publicationList.length);
    };

    const prevCard = () => {
        setSelectedIndex((prevIndex) =>
            (prevIndex - 1 + publicationList.length) % publicationList.length
        );
    };

    const transitions = useTransition(selectedIndex, {
        from: { opacity: 0, transform: 'scale(0.8)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(0.8)' },
        config: { tension: 250, friction: 20 },
    });

    return (
        <div className="carousel-section">
            <h1>Mes Articles</h1>
            <div className="carousel-component">
                <div className="carousel-description"></div>
                <div className="carousel-box" ref={carouselRef}>
                    {transitions((style, index) => {
                        const publication = publicationList[(index + selectedIndex) % publicationList.length];
                        return (
                            <animated.div
                                style={style}
                                className='card'
                                key={publication?._id}
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
                                <h3>{publication?.title}</h3>
                                <div className="card-excerpt">
                                    {publication?.excerpt}
                                </div>
                                <div className="card-date">
                                    Publié le {publication?.publicationDate}
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
        </div>
    );
};

export default CarouselSection;
