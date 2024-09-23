import { Button } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import useUpdateMutation from '../../../hooks/useUpdateMutation';
import toastProvider from '../../../lib/toastProvider';
import { MutationPayload, Publication, UpdatePublicationsProps } from '../../../types/types';

const UpdatePublications = ({
    record,
    isEditingPublication,
    editingRowId,
    editingRowData,
    editingFormData,
    setEditingFormData,
    setEditingRowId,
    setIsEditingPublication,
    setEditingRowData,
}: UpdatePublicationsProps) => {
    const { getConfig } = useAuth();

    const handleEditPublicationRow = (record: Publication) => {
        setIsEditingPublication(true);
        setEditingRowData({ ...record });
        setEditingRowId(record._id || '');
    };

    const { mutateAsync } = useUpdateMutation({
        dataUrl: 'publication',
        dataType: 'publication',
        dataId: editingRowData._id
    })

    const updatePublication = async () => {
        try {
            editingFormData.append('title', editingRowData.title || '');
            editingFormData.append('description', editingRowData.description || '');
            editingFormData.append('link', editingRowData.link || '');
            editingFormData.append('type', Array.isArray(editingRowData.type) ? editingRowData.type.join(',') : editingRowData.type || '');
            editingFormData.append('theme', typeof editingRowData.theme === 'string' ? editingRowData.theme : editingRowData.theme ? JSON.stringify(editingRowData.theme) : '');
            editingFormData.append('excerpt', editingRowData.excerpt || '');
            editingFormData.append('publicationDate', editingRowData.publicationDate || '');
            editingFormData.append('publisher', typeof editingRowData.publisher === 'string' ? editingRowData.publisher : editingRowData.publisher ? JSON.stringify(editingRowData.publisher) : '');
            editingFormData.append('author', typeof editingRowData.author === 'string' ? editingRowData.author : editingRowData.author ? JSON.stringify(editingRowData.author) : '');

            const mutationPayload: MutationPayload = {
                data: editingFormData,
                config: {
                    ...getConfig(),
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            };
            await mutateAsync(mutationPayload);
            setEditingFormData(new FormData());
            setIsEditingPublication(false);
            setEditingRowId(null);
        } catch (error) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la mise à jour de la publication. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
        }

    };

    return isEditingPublication && editingRowId ? (
        <Button onClick={() => updatePublication()}>Sauvegarder</Button>
    ) : (
        <a onClick={() => handleEditPublicationRow(record)}>Éditer</a>
    );
};

export default UpdatePublications;