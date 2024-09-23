import { WarningOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import useDeleteMutation from '../../../hooks/useDeleteMutation';
import toastProvider from '../../../lib/toastProvider';
import { DeletePublicationsProps, MutationPayload, Publication } from '../../../types/types';

const DeletePublications = ({
    record,
    setIsDeletingPublication,
    setEditingRowId,
    editingRowId,
}: DeletePublicationsProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const { getConfig } = useAuth();

    const handlePopoverRow = (record: Publication) => {
        setEditingRowId(record._id || '');
    };
    const hide = () => {
        setEditingRowId(null);
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const { mutateAsync } = useDeleteMutation({
        dataUrl: 'publication',
        dataType: 'publication',
        dataId: record._id
    });

    const deletePublication = async () => {
        try {
            const mutationPayload: MutationPayload = {
                config: {
                    ...getConfig(),
                },
            };
            await mutateAsync(mutationPayload);
            setIsDeletingPublication(true);
            toastProvider(
                'success',
                'La publication a bien été supprimée !',
                'bottom-left',
                'light',
            );
        } catch (error) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la suppression de la publication. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
        }
    };

    const deleteContent = () => {
        return (
            <>
                <WarningOutlined style={{ color: 'red' }} />
                <p>Êtes vous sûre de vouloir supprimer cette publication ? </p>
                <Button onClick={hide}>Annuler</Button>
                <Button onClick={() => deletePublication()}>
                    Confirmer
                </Button>
            </>
        );
    };
    return (
        <Popover
            content={deleteContent()}
            placement="left"
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