import { handlePost } from "../api/handleCall";
import mutationController from "../api/mutationController";
import { MutationProps } from "../types/types";
const BASE_URL = import.meta.env.VITE_BASE_URL;

/**Custom hook to trigger react-query create mutation */

const useCreateMutation = ({
    dataUrl,
    dataType,
}: MutationProps) => {
    return mutationController(
        handlePost,
        `${BASE_URL}/api/${dataUrl}/create`,
        `${dataType} ajouté avec succès`,
        `Erreur lors de la création de/du : ${dataType}`,
    );
}

export default useCreateMutation;