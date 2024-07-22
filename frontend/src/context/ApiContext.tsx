import { createContext, PropsWithChildren, useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { handleGet } from '../api/handleCall';
import toastProvider from '../lib/toastProvider';
import {
    ApiContextType,
    BooksQueryResponse,
    ImagesQueryResponse,
    PublicationQueryResponse,
    PublisherQueryResponse,
    ThemeQueryResponse,
} from '../types/types';
import { useAuth } from './AuthContext';

const ApiContext = createContext<ApiContextType>({} as ApiContextType);

export const ApiContextProvider = ({ children }: PropsWithChildren) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();

    /** Here data queries are handled */

    const publicationQuery: UseQueryResult<PublicationQueryResponse, Error> =
        useQuery('get_publications', async () => {
            const response = await handleGet(
                `${BASE_URL}/api/publication`,
                getConfig(),
            );
            if (!response || !response.data) {
                toastProvider(
                    'error',
                    'Une erreur est survenue pendant la récupération des publications. Veuillez réessayer.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return response.data;
        });

    const bookQuery: UseQueryResult<BooksQueryResponse, Error> = useQuery(
        'get_books',
        async () => {
            const response = await handleGet(
                `${BASE_URL}/api/books`,
                getConfig(),
            );
            if (!response || !response.data) {
                toastProvider(
                    'error',
                    'Erreur lors de la récupération des livres.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return response.data;
        },
    );

    const publisherQuery: UseQueryResult<PublisherQueryResponse, Error> =
        useQuery('get_publishers', async () => {
            const response = await handleGet(
                `${BASE_URL}/api/publisher`,
                getConfig(),
            );
            if (!response || !response.data) {
                toastProvider(
                    'error',
                    'Erreur lors de la récupération des éditeurs.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return response.data;
        });

    const themeQuery: UseQueryResult<ThemeQueryResponse, Error> = useQuery(
        'get_themes',
        async () => {
            const response = await handleGet(
                `${BASE_URL}/api/theme`,
                getConfig(),
            );
            if (!response || !response.data) {
                toastProvider(
                    'error',
                    'Erreur lors de la récupération des thèmes.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return response.data;
        },
    );

    const imageQuery: UseQueryResult<ImagesQueryResponse, Error> = useQuery(
        'get_images',
        async () => {
            const response = await handleGet(
                `${BASE_URL}/api/image`,
                getConfig(),
            );
            if (!response) {
                toastProvider(
                    'error',
                    'Erreur lors de la récupération des images.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return response;
        },
    );

    return (
        <ApiContext.Provider
            value={{
                publicationQuery,
                bookQuery,
                publisherQuery,
                imageQuery,
                themeQuery,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApiContext = () => useContext(ApiContext);
