import { Button } from 'antd';
import { handlePut } from '../../../api/handleCall';
import toastProvider from '../../../lib/toastProvider';
import { UpdateBooksProps, Book } from '../../../types/types';

const UpdateBooks = ({
    record,
    isEditingBooks,
    editingRowId,
    editingRowData,
    setEditingRowId,
    setIsEditingBooks,
    setEditingRowData,
}: UpdateBooksProps) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleEditBookRow = (record: Book) => {
        setIsEditingBooks(true);
        setEditingRowData({ ...record });
        setEditingRowId(record._id);
    };
    const updatePublication = async () => {
        const updatedBook = await handlePut(
            `${BASE_URL}/api/books/update/${editingRowData._id}`,
            { ...editingRowData },
        );
        if (!updatedBook || !updatedBook.data) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la mise à jour du livre. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
            return undefined;
        }
        setIsEditingBooks(false);
        setEditingRowId(null);
        return updatedBook;
    };
    return isEditingBooks && editingRowId ? (
        <Button onClick={() => updatePublication()}>Sauvegarder</Button>
    ) : (
        <a onClick={() => handleEditBookRow(record)}>Éditer</a>
    );
};

export default UpdateBooks;
