import { WarningOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import useDeleteMutation from '../../../hooks/useDeleteMutation';
import toastProvider from '../../../lib/toastProvider';
import { Book, DeleteBooksProps, MutationPayload } from '../../../types/types';

const DeleteBooks = ({
    record,
    refetch,
    setEditingRowId,
    editingRowId,
}: DeleteBooksProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const handlePopoverRow = (record: Book) => {
        setEditingRowId(record._id || '');
    };
    const { getConfig } = useAuth();
    const hide = () => {
        setEditingRowId(null);
        setOpen(false);
    };
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };
    const { mutateAsync } = useDeleteMutation({
        dataUrl: 'books',
        dataType: 'book',
        dataId: record._id,
    });
    const deleteBook = async () => {
        try {
            const mutationPayload: MutationPayload = {
                config: {
                    ...getConfig(),
                },
            };
            await mutateAsync(mutationPayload);
            refetch();
            toastProvider(
                'success',
                'Le livre a bien été supprimé !',
                'bottom-left',
                'light',
            );
        } catch (error) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la suppression du livre. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
        }
    };

    const deleteContent = () => {
        return (
            <>
                <WarningOutlined style={{ color: 'red' }} />
                <p>Êtes vous sûre de vouloir supprimer ce livre ? </p>
                <Button onClick={hide}>Annuler</Button>
                <Button onClick={() => deleteBook()}>Confirmer</Button>
            </>
        );
    };
    return (
        <Popover
            content={deleteContent()}
            placement="left"
            title="Suppression du livre"
            trigger="click"
            open={editingRowId === record._id && open}
            onOpenChange={handleOpenChange}
        >
            <a onClick={() => handlePopoverRow(record)}> Supprimer</a>
        </Popover>
    );
};

export default DeleteBooks;
