import { UseMutationResult, useMutation } from "react-query";
import dataRefetch from "../lib/dataRefetch";
import toastProvider from "../lib/toastProvider";
import { ApiDataResponse, MutationConfig, TVariables } from "../types/types";

const mutationController = <TData extends ApiDataResponse, TError>({
    method,
    url,
    successMessage,
    errorMessage,
    dataType
}: MutationConfig<TData, TError>): UseMutationResult<TData, TError, TVariables<TData>, unknown> => {

    return useMutation<TData, TError, TVariables<TData>, unknown>(
        async (variables: TVariables<TData>) => {
            console.log("variables", variables);
            const response = await method(url, variables.data, variables.config);
            console.log("this is response", response)
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
                dataRefetch(dataType)?.refetch(); // Ensure this is correctly typed in your context
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