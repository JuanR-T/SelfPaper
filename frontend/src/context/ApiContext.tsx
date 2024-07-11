import { createContext, PropsWithChildren, useContext } from 'react';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { handleDelete, handleGet, handlePost, handlePut } from '../api/handleCall';
import toastProvider from '../lib/toastProvider';
import { ApiContextType, ApiDataResponse, ImagesQueryResponse, MutationConfig, PublicationQueryResponse, PublisherQueryResponse } from '../types/types';
import { useAuth } from './AuthContext';

const ApiContext = createContext<ApiContextType>({} as ApiContextType);


export const ApiContextProvider = ({ children }: PropsWithChildren) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();

    /** Here data queries are handled */

    const publicationsQuery: UseQueryResult<PublicationQueryResponse, Error> = useQuery('get_publications', async () => {
        const response = await handleGet(`${BASE_URL}/api/publications`, getConfig());
        if (!response || !response.data) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la récupération des publications. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
            return undefined;
        }
        return response.data
    })

    const booksQuery: UseQueryResult<PublicationQueryResponse, Error> = useQuery('get_books', async () => {
        const response = await handleGet(`${BASE_URL}/api/books`, getConfig());
        if (!response || !response.data) {
            toastProvider('error', 'Erreur lors de la récupération des livres.', 'bottom-left', 'colored');
            return undefined;
        }
        return response.data;
    });

    const publishersQuery: UseQueryResult<PublisherQueryResponse, Error> = useQuery('get_publishers', async () => {
        const response = await handleGet(`${BASE_URL}/api/publisher`, getConfig());
        if (!response || !response.data) {
            toastProvider('error', 'Erreur lors de la récupération des éditeurs.', 'bottom-left', 'colored');
            return undefined;
        }
        return response.data;
    });

    const imagesQuery: UseQueryResult<ImagesQueryResponse, Error> = useQuery('get_images', async () => {
        const response = await handleGet(`${BASE_URL}/api/image`, getConfig());
        if (!response) {
            toastProvider('error', 'Erreur lors de la récupération des images.', 'bottom-left', 'colored');
            return undefined;
        }
        return response;
    });

    /** Here data mutations are handled */
    /** TData and TVariables are generic types
     *  TData represents the type of data that my API call will fetch or mutate. 
     *  TVariables represents the type of variables or parameters I might pass to the API call.
     */
    const createMutation = <TData, TError, TVariables, TContext>({
        method,
        url,
        successMessage,
        errorMessage
    }: MutationConfig<TData, TError, TVariables, TContext>): UseMutationResult<TData, TError, TVariables, TContext> => {
        return useMutation<TData, TError, TVariables, TContext>(
            async (variables: TVariables) => {
                const response = await method(url, variables);
                if (!response || !response.data) {
                    toastProvider('error', errorMessage, 'bottom-left', 'colored');
                    throw new Error(errorMessage);
                }
                return response.data;
            },
            {
                onSuccess: () => {
                    booksQuery.refetch();
                    toastProvider('success', successMessage, 'bottom-left', 'colored');
                },
            }
        );
    };

    const createBookMutation = createMutation<ApiDataResponse, Error, void, unknown>(
        {
            method: handlePost,
            url: `${BASE_URL}/api/books`,
            successMessage: 'Livre ajouté avec succès',
            errorMessage: 'Erreur lors de l\'ajout du livre.'
        }
    );

    const updateBookMutation = createMutation<ApiDataResponse, Error, void, unknown>(
        {
            method: handlePut,
            url: `${BASE_URL}/api/books`,
            successMessage: 'Livre mis à jour avec succès',
            errorMessage: 'Erreur lors de la mise à jour du livre.'
        }
    );

    const deleteBookMutation = createMutation<ApiDataResponse, Error, void, unknown>(
        {
            method: handleDelete,
            url: `${BASE_URL}/api/books`,
            successMessage: 'Livre supprimé avec succès',
            errorMessage: 'Erreur lors de la suppression du livre.'
        }
    );
    return (
        <ApiContext.Provider value={{ publicationsQuery, booksQuery, publishersQuery, imagesQuery, createBookMutation }}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApiContext = () => useContext(ApiContext);