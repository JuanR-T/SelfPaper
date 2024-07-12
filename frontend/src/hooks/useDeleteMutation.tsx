import { handleDelete } from "../api/handleCall";
import mutationController from "../api/mutationController";
import { MutationProps } from "../types/types";
const BASE_URL = import.meta.env.VITE_BASE_URL;

/**Custom hook to trigger react-query delete mutation */

const useDeleteMutation = ({
    dataUrl,
    dataType,
    dataId,
}: MutationProps) => {
    return mutationController(
        handleDelete,
        `${BASE_URL}/api/${dataUrl}/delete/${dataId}`,
        `${dataType} supprimé avec succès`,
        `Erreur lors de la suppression de/du : ${dataType}`,
        dataType
    );
}

export default useDeleteMutation;