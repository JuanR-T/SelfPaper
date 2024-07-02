import { useQuery } from 'react-query';
import { handleGet } from '../../api/handleCall';
import toastProvider from '../../lib/toastProvider';
import { useAuth } from '../../context/AuthContext';
import { PublicationApiResponse } from '../../types/types';
import { Tabs } from '../ui/Tabs';
import { FileTextOutlined, TagOutlined } from '@ant-design/icons';
import {
    CardBody,
    CardContainer,
    CardItem,
} from '../../components/ui/CardThreeDimensionalEffect';
import Capitalize from '../../lib/capitalizeLetter';

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
    const latestPublications = publications.splice(-3);

    const tabs = latestPublications?.map((publication) => ({
        title: publication?.title,
        value: publication?._id,
        content: (
            <>
                <CardContainer containerClassName={'custom-carousel-container'}>
                    <CardBody className={'custom-carousel-body'}>
                        <CardItem
                            translateZ="100"
                            className="h-full justify-between flex flex-col space-x-0 > * w-full mt-4"
                        >
                            <>
                                <h2>{publication.title}</h2>
                                <h3>
                                    <TagOutlined />{' '}
                                    {' ' + publication.theme.title}
                                </h3>
                                <p>{publication.description}</p>
                                <div className="carousel-publication-origin">
                                    {Capitalize(publication.publisher[0].type) +
                                        ' '}
                                    {publication.publisher[0].title}
                                    {' : ' + publication.publisher[1].service}
                                    <span>
                                        <FileTextOutlined />{' '}
                                        {' ' + publication.type}
                                    </span>
                                </div>
                                <a
                                    className="read-more-button"
                                    target="_blank"
                                    href={publication.link}
                                >
                                    Lire l'article
                                </a>
                            </>
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                            <div className="rounded-xl group-hover/card:shadow-xl custom-carousel-image"></div>
                        </CardItem>
                    </CardBody>
                </CardContainer>
            </>
        ),
    }));
    console.log('tabs', tabs);
    return (
        <>
            <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
                {tabs.length !== 0 ? (
                    <Tabs tabs={tabs} contentClassName={''} />
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default CarouselSection;
