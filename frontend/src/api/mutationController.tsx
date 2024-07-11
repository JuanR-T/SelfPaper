import { UseMutationResult, useMutation } from "react-query";
import { useApiContext } from "../context/ApiContext";
import toastProvider from "../lib/toastProvider";
import { ApiDataResponse, MutationConfig, TVariables } from "../types/types";

const mutationController = <TData extends ApiDataResponse, TError>({
    method,
    url,
    successMessage,
    errorMessage,
}: MutationConfig<TData, TError>): UseMutationResult<TData, TError, TVariables<TData>, unknown> => {
    const { booksQuery } = useApiContext();

    return useMutation<TData, TError, TVariables<TData>, unknown>(
        async (variables: TVariables<TData>) => {
            const response = await method(url, variables.data, variables.config);

            if (!response || !response.data) {
                toastProvider(
                    'error',
                    errorMessage,
                    'bottom-left',
                    'colored',
                );
                throw new Error(errorMessage);
            }

            return response.data;
        },
        {
            onSuccess: () => {
                booksQuery.refetch(); // Ensure this is correctly typed in your context
                toastProvider(
                    'success',
                    successMessage,
                    'bottom-left',
                    'colored',
                );
            },
        },
    );
};

export default mutationController;