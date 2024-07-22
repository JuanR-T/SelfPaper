import { WarningOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { useState } from 'react';
import useDeleteMutation from '../../../hooks/useDeleteMutation';
import { Book, DeleteBooksProps } from '../../../types/types';

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
    const deleteBook = async (record: Book) => {
        await mutateAsync({ data: { ...record } });
        hide();
        refetch;
    };

    const deleteContent = (record: Book) => {
        return (
            <>
                <WarningOutlined style={{ color: 'red' }} />
                <p>Êtes vous sûre de vouloir supprimer ce livre ? </p>
                <Button onClick={hide}>Annuler</Button>
                <Button onClick={() => deleteBook(record)}>Confirmer</Button>
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
