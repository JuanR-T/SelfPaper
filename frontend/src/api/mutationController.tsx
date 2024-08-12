import { useMutation } from 'react-query';
import toastProvider from '../lib/toastProvider';
import { MutationConfig } from '../types/types';

const mutationController: MutationConfig = (
    method,
    url,
    successMessage,
    errorMessage,
) => {
    return useMutation(
        async (variables) => {
            console.log('variables', variables);
            const response = await method(url, variables);
            console.log('this is mutationController res : ', response);
            if (!response || !response.data) {
                throw new Error(errorMessage);
            }
            return response.data;
        },
        {
            onSuccess: () => {
                toastProvider(
                    'success',
                    successMessage,
                    'bottom-left',
                    'colored',
                );
            },
            onError: () => {
                toastProvider('error', errorMessage, 'bottom-left', 'colored');
            },
        },
    );
};

export default mutationController;
