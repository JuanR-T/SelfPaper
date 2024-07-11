import { UseMutationResult } from "react-query";
import { handlePut } from "../api/handleCall";
import mutationController from "../api/mutationController";
import { MutationProps, TVariables } from "../types/types";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const useUpdateMutation = <TData, TError>({
    dataUrl,
    dataType,
    dataId,
}: MutationProps): UseMutationResult<TData, TError, TVariables<TData>, unknown> => {
    return mutationController<any, TError>({
        method: handlePut,
        url: `${BASE_URL}/api/${dataUrl}/update/${dataId}`,
        successMessage: `${dataType} mis à jour avec succès`,
        errorMessage: `Erreur lors de la mise à jour de/du : ${dataType}`,
        dataType: dataType
    });
}

export default useUpdateMutation;