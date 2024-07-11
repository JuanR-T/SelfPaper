import { UseMutationResult } from "react-query";
import { handlePost } from "../api/handleCall";
import mutationController from "../api/mutationController";
import { MutationProps } from "../types/types";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const useCreateMutation = <ApiDataResponse, TVariables>({
    dataUrl,
    dataType,
}: MutationProps): UseMutationResult<ApiDataResponse, Error, TVariables, unknown> => {
    return mutationController<ApiDataResponse, Error, TVariables>({
        method: handlePost,
        url: `${BASE_URL}/api/${dataUrl}/create`,
        successMessage: `${dataType} ajouté avec succès`,
        errorMessage: `Erreur lors de la création de/du : ${dataType}`,
    });
}

export default useCreateMutation;