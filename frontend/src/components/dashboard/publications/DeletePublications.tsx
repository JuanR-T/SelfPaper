import { Button, Popover } from 'antd';
import { useState } from 'react';
import { handleDelete } from '../../../api/handleCall';
import toastProvider from '../../../lib/toastProvider';
import { WarningOutlined } from '@ant-design/icons';
import { DeletePublicationsProps, Publication } from '../../../types/types';

const DeletePublications = ({
    record,
    setIsDeletingPublication,
    setEditingRowId,
    editingRowId,
}: DeletePublicationsProps) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [open, setOpen] = useState<boolean>(false);

    const handlePopoverRow = (record: Publication) => {
        setEditingRowId(record._id);
    };
    const hide = () => {
        setEditingRowId(null);
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const deletePublication = async (record: any) => {
        const deletedPublication = await handleDelete(
            `${BASE_URL}/api/publication/delete/${record._id}`,
        );
        if (!deletedPublication || !deletedPublication.data) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la suppression de la publication. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
            return undefined;
        }
        setIsDeletingPublication(true);
        toastProvider(
            'success',
            'La publication a bien été supprimée !',
            'bottom-left',
            'light',
        );
        return deletedPublication;
    };
    const deleteContent = (record: Publication) => {
        return (
            <>
                <WarningOutlined style={{ color: 'red' }} />
                <p>Êtes vous sûre de vouloir supprimer cette publication ? </p>
                <Button onClick={hide}>Annuler</Button>
                <Button onClick={() => deletePublication(record)}>
                    Confirmer
                </Button>
            </>
        );
    };
    return (
        <Popover
            content={deleteContent(record)}
            title="Suppression de l'éditeur"
            trigger="click"
            open={editingRowId === record._id && open}
            onOpenChange={handleOpenChange}
        >
            <a onClick={() => handlePopoverRow(record)}> Supprimer</a>
        </Popover>
    );
};

export default DeletePublications;
