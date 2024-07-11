import { UseMutationResult } from "react-query";
import { handlePost } from "../api/handleCall";
import mutationController from "../api/mutationController";
import { MutationProps, TVariables } from "../types/types";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const useCreateMutation = <TData, TError>({
    dataUrl,
    dataType,
}: MutationProps): UseMutationResult<TData, TError, TVariables<TData>, unknown> => {
    return mutationController<TData, TError>({
        method: handlePost,
        url: `${BASE_URL}/api/${dataUrl}/create`,
        successMessage: `${dataType} ajouté avec succès`,
        errorMessage: `Erreur lors de la création de/du : ${dataType}`,
    });
}

export default useCreateMutation;