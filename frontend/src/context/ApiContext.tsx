import { createContext, PropsWithChildren, useContext } from 'react';
import {
    useQuery,
    UseQueryResult
} from 'react-query';
import {
    handleGet
} from '../api/handleCall';
import toastProvider from '../lib/toastProvider';
import {
    ApiContextType,
    ImagesQueryResponse,
    PublicationQueryResponse,
    PublisherQueryResponse,
    ThemeQueryResponse
} from '../types/types';
import { useAuth } from './AuthContext';

const ApiContext = createContext<ApiContextType>({} as ApiContextType);

export const ApiContextProvider = ({ children }: PropsWithChildren) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();

    /** Here data queries are handled */

    const publicationsQuery: UseQueryResult<PublicationQueryResponse, Error> =
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

    const booksQuery: UseQueryResult<PublicationQueryResponse, Error> =
        useQuery('get_books', async () => {
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
        });

    const publishersQuery: UseQueryResult<PublisherQueryResponse, Error> =
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

    const themesQuery: UseQueryResult<ThemeQueryResponse, Error> =
        useQuery('get_themes', async () => {
            const response = await handleGet(
                `${BASE_URL}/api/theme`,
                getConfig(),
            );
            console.log("theme response :", response)
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
        });

    const imagesQuery: UseQueryResult<ImagesQueryResponse, Error> = useQuery(
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

    /** Here data mutations are handled */
    /** TData and TVariables are generic types
     *  TData represents the type of data that my API call will fetch or mutate.
     *  TVariables represents the type of variables or parameters I might pass to the API call.
     */

    // const deleteMutation = ({
    //     dataUrl,
    //     dataType
    // }: MutationProps) => {
    //     createMutationController({
    //         method: handleDelete,
    //         url: `${BASE_URL}/api/${dataUrl}`,
    //         successMessage: `${dataType} supprimé avec succès`,
    //         errorMessage: `Erreur lors de la suppression de/du : ${dataType}`,
    //     })
    // }

    // const createMutation: UseMutationResult<Error, ApiDataResponse, unknown> = createMutationController<
    //     ApiDataResponse,
    //     Error,
    //     Book
    // >({
    //     method: handlePost,
    //     url: `${BASE_URL}/api/books`,
    //     successMessage: 'Livre ajouté avec succès',
    //     errorMessage: "Erreur lors de l'ajout du livre.",
    // });

    // const updateBookMutation = createMutationController<
    //     ApiDataResponse,
    //     Error,
    //     void,
    //     unknown
    // >({
    //     method: handlePut,
    //     url: `${BASE_URL}/api/books`,
    //     successMessage: 'Livre mis à jour avec succès',
    //     errorMessage: 'Erreur lors de la mise à jour du livre.',
    // });

    // const deleteBookMutation = createMutationController<
    //     ApiDataResponse,
    //     Error,
    //     void,
    //     unknown
    // >({
    //     method: handleDelete,
    //     url: `${BASE_URL}/api/books`,
    //     successMessage: 'Livre supprimé avec succès',
    //     errorMessage: 'Erreur lors de la suppression du livre.',
    // });
    return (
        <ApiContext.Provider
            value={{
                publicationsQuery,
                booksQuery,
                publishersQuery,
                imagesQuery,
                themesQuery
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApiContext = () => useContext(ApiContext);
