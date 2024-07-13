import { handlePost } from "../api/handleCall";
import mutationController from "../api/mutationController";
import { MutationProps } from "../types/types";
const BASE_URL = import.meta.env.VITE_BASE_URL;

/** Custom hook to trigger react-query login mutation */

const useLoginMutation = ({
    dataUrl,
    dataType,
}: MutationProps) => {
    return mutationController(
        handlePost,
        `${BASE_URL}/api/${dataUrl}/login`,
        `${dataType} connecté avec succès`,
        `Erreur lors de la connexion de/du : ${dataType}`,
    );
}

export default useLoginMutation;