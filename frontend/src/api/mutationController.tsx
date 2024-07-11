import { UseMutationResult, useMutation } from "react-query";
import { useApiContext } from "../context/ApiContext";
import toastProvider from "../lib/toastProvider";
import { MutationConfig } from "../types/types";

const mutationController = <TData, TError, TVariables>({
    method,
    url,
    successMessage,
    errorMessage,
}: MutationConfig<TData, TError, TVariables>): UseMutationResult<
    TData,
    TError,
    TVariables,
    unknown
> => {
    const { booksQuery } = useApiContext();
    return useMutation<TData, TError, TVariables, unknown>(
        async (variables: TVariables) => {
            const response = await method(url, variables);
            console.log("response createMutationController : ", response)
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
                //TODO Make this query generic
                booksQuery.refetch();
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