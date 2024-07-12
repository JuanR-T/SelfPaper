import { useMutation } from "react-query";
import dataRefetch from "../lib/dataRefetch";
import toastProvider from "../lib/toastProvider";
import { MutationConfig } from "../types/types";

const mutationController: MutationConfig =
    (
        method,
        url,
        successMessage,
        errorMessage,
        dataType
    ) => {
        return useMutation(
            async (variables) => {
                console.log("this is it", method(url, variables))
                const response = await method(url, variables);
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
                console.log("this TData", response.data);
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