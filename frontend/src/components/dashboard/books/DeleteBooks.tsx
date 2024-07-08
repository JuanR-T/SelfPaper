import { Button, Popover } from 'antd';
import { useState } from 'react';
import { handleDelete } from '../../../api/handleCall';
import toastProvider from '../../../lib/toastProvider';
import { WarningOutlined } from '@ant-design/icons';
import { Book, DeleteBooksProps, Publication } from '../../../types/types';

const DeleteBooks = ({
    record,
    setIsDeletingBooks,
    setEditingRowId,
    editingRowId,
}: DeleteBooksProps) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [open, setOpen] = useState<boolean>(false);

    const handlePopoverRow = (record: Book) => {
        setEditingRowId(record._id);
    };
    const hide = () => {
        setEditingRowId(null);
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const deleteBook = async (record: Book) => {
        const deletedBook = await handleDelete(
            `${BASE_URL}/api/books/delete/${record._id}`,
        );
        if (!deletedBook || !deletedBook.data) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la suppression du livre. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
            return undefined;
        }
        setIsDeletingBooks(true);
        toastProvider(
            'success',
            'Le Livre a bien été supprimé !',
            'bottom-left',
            'light',
        );
        return deletedBook;
    };

    const deleteContent = (record: Book) => {
        return (
            <>
                <WarningOutlined style={{ color: 'red' }} />
                <p>Êtes vous sûre de vouloir supprimer ce livre ? </p>
                <Button onClick={hide}>Annuler</Button>
                <Button onClick={() => deleteBook(record)}>
                    Confirmer
                </Button>
            </>
        );
    };
    return (
        <Popover
            content={deleteContent(record)}
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
