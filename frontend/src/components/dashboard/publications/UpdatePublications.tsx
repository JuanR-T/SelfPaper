import { Button } from 'antd';
import { handlePut } from '../../../api/handleCall';
import toastProvider from '../../../lib/toastProvider';
import { Publication, UpdatePublicationsProps } from '../../../types/types';

const UpdatePublications = ({
    record,
    isEditingPublication,
    editingRowId,
    editingRowData,
    setEditingRowId,
    setIsEditingPublication,
    setEditingRowData,
}: UpdatePublicationsProps) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleEditPublicationRow = (record: Publication) => {
        setIsEditingPublication(true);
        setEditingRowData({ ...record });
        setEditingRowId(record._id || '');
    };
    const updatePublication = async () => {
        const updatedTheme = await handlePut(
            `${BASE_URL}/api/publication/update/${editingRowData._id}`,
            { ...editingRowData },
        );
        if (!updatedTheme || !updatedTheme.data) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la mise à jour de la publication. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
            return undefined;
        }
        setIsEditingPublication(false);
        setEditingRowId(null);
        return updatedTheme;
    };
    return isEditingPublication && editingRowId ? (
        <Button onClick={() => updatePublication()}>Sauvegarder</Button>
    ) : (
        <a onClick={() => handleEditPublicationRow(record)}>Éditer</a>
    );
};

export default UpdatePublications;
