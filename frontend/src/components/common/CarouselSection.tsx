import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { handleGet } from '../../api/handleCall';
import toastProvider from '../../lib/toastProvider';
import { useAuth } from '../../context/AuthContext';
import { Publication, PublicationApiResponse } from '../../types/types';
import { FileImageOutlined } from '@ant-design/icons';
import { useSpring, animated } from 'react-spring';
//just use react spring https://react-spring-carousel.emilianobucci.com/docs/use-spring-carousel/multiple-items
const CarouselSection = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();
    const [selectedIndex, setSelectedIndex] = useState(1);
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

        const carousel = carouselRef.current;
        const selectedCard = carousel?.querySelector('.card.center');
        selectedCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, [useQueryPublications]);

    const nextCard = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % publicationList.length);
    };

    const prevCard = () => {
        setSelectedIndex((prevIndex) =>
            (prevIndex - 1 + publicationList.length) % publicationList.length
        );
    };
    const centerIndex = selectedIndex % publicationList.length;
    const springProps = useSpring({
        transform: `translateX(-${selectedIndex * 100}%)`,
    });
    return (
        <div className="carousel-section">
            <h1>Mes Articles</h1>
            <div className="carousel-component">
                <div className="carousel-description"></div>
                <div className="carousel-box" ref={carouselRef}>
                    {publicationList.slice(selectedIndex, selectedIndex + 3).map((publication: Publication, index: number) => {
                        const adjustedIndex = (index % publicationList.length) - 1;
                        console.log("adjustedIndex", adjustedIndex)
                        console.log("publicationList", publicationList);
                        console.log("selectedIndex", selectedIndex)
                        //const adjustedIndex = index % publicationList.length;
                        console.log("index", index)
                        // Determine classes based on index positions
                        console.log("publicationList[selectedIndex]", publicationList[selectedIndex])
                        let className = 'card';
                        // if (adjustedIndex === 0) {
                        //     className += ' center';
                        // } else if (adjustedIndex === 1 || adjustedIndex === publicationList.length - 1) {
                        //     className += ' left';
                        // } else if (adjustedIndex === 2 || adjustedIndex === publicationList.length - 2) {
                        //     className += ' right';
                        // }

                        return (
                            <animated.div
                                style={springProps}
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
                            </animated.div>
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
