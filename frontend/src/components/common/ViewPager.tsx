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

    const nextCard = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % publications.length);
    };

    const prevCard = () => {
        setSelectedIndex((prevIndex) =>
            (prevIndex - 1 + publications.length) % publications.length
        );
    };
    const transitions = useTransition(selectedIndex, {
        from: (item) => ({
            opacity: 0.7,
            transform: item === selectedIndex ? 'translateX(10%)' : 'translateX(-10%)',
        }),
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: (item) => ({
            opacity: 0.7,
            transform: item === selectedIndex ? 'translateX(-10%)' : 'translateX(10%)',
        }),
        config: { duration: 100, tension: 170, friction: 26 },
    });

    return (
        <div className="carousel-section">
            <h1>Mes Articles</h1>
            <div className="carousel-component">
                <div className="carousel-description"></div>
                <div className="carousel-box" ref={carouselRef}>
                    {transitions((style, index) => {
                        const prevIndex = (selectedIndex - 1 + publications?.length) % publications?.length;
                        const nextIndex = (selectedIndex + 1) % publications?.length;
                        console.log("publications", publications);
                        const publicationsCarousel = [
                            publications[prevIndex],
                            publications[selectedIndex],
                            publications[nextIndex]
                        ];
                        return (
                            publicationsCarousel?.map((publication, i) => {
                                let position = 'prev';
                                if (i === 1) position = 'current';
                                else if (i === 2) position = 'next';
                                console.log("this is i", i);
                                return (
                                    <animated.div
                                        style={{
                                            ...style,
                                            flex: '1 0 33.33%',
                                            transform: position === 'prev'
                                                ? 'translateX(-10%)'
                                                : position === 'next'
                                                    ? 'translateX(10%)'
                                                    : 'translateX(0%)'
                                        }}
                                        className={`card ${position}`}
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
                            })



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
