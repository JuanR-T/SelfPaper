import { UseMutationResult } from "react-query";
import { handleDelete } from "../api/handleCall";
import mutationController from "../api/mutationController";
import { MutationProps, TVariables } from "../types/types";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const useDeleteMutation = <TData, TError>({
    dataUrl,
    dataType,
    dataId,
}: MutationProps): UseMutationResult<TData, TError, TVariables<TData>, unknown> => {
    return mutationController<any, TError>({
        method: handleDelete,
        url: `${BASE_URL}/api/${dataUrl}/delete/${dataId}`,
        successMessage: `${dataType} supprimé avec succès`,
        errorMessage: `Erreur lors de la suppression de/du : ${dataType}`,
        dataType: dataType
    });
}

export default useDeleteMutation;