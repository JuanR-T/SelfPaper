import { useQuery } from 'react-query';
import { handleGet } from '../../api/handleCall';
import toastProvider from '../../lib/toastProvider';
import { useAuth } from '../../context/AuthContext';
import { Publication, PublicationApiResponse } from '../../types/types';
import { FileImageOutlined } from '@ant-design/icons';

const CardBoard = () => {
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
    const publications = (useQueryPublications?.data as PublicationApiResponse)
        ?.publications;
    return (
        <div className="cardboard-section">
            <h1>Mes Articles</h1>
            <div className="cardboard">
                {publications?.map((publication: Publication) => {
                    return (
                        <div className="card" key={publication._id}>
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
                            <h2>{publication.title}</h2>
                            <div className="card-excerpt">
                                {publication.excerpt}
                            </div>
                            <div className="card-date">
                                Publié le {publication.publicationDate}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CardBoard;
