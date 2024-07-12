import { handlePut } from "../api/handleCall";
import mutationController from "../api/mutationController";
import { MutationProps } from "../types/types";
const BASE_URL = import.meta.env.VITE_BASE_URL;

/**Custom hook to trigger react-query update mutation */

const useUpdateMutation = ({
    dataUrl,
    dataType,
    dataId,
}: MutationProps) => {
    return mutationController(
        handlePut,
        `${BASE_URL}/api/${dataUrl}/update/${dataId}`,
        `${dataType} mis à jour avec succès`,
        `Erreur lors de la mise à jour de/du : ${dataType}`,
        dataType
    );
}

export default useUpdateMutation;