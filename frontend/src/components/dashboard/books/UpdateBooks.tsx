import { Button } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useUpdateMutation from '../../../hooks/useUpdateMutation';
import { Book, UpdateBooksProps } from '../../../types/types';

const UpdateBooks = ({
    refetch,
    isBookDateEdited,
    setIsBookDateEdited,
    bookInitialState,
    record,
    isEditingBooks,
    editingRowId,
    editingRowData,
    setEditingRowId,
    setIsEditingBooks,
    setEditingRowData,
}: UpdateBooksProps) => {
    dayjs.extend(customParseFormat);
    dayjs.locale('fr');

    const { mutateAsync } = useUpdateMutation(
        {
            dataUrl: 'books',
            dataType: 'book',
            dataId: editingRowData._id
        }
    );
    const handleEditBookRow = (record: Book) => {
        setIsEditingBooks(true);
        setEditingRowData({ ...record });
        setEditingRowId(record._id || '');
    };
    const updatePublication = async () => {
        const formattedDate = dayjs(
            editingRowData.bookPublicationDate,
            'DD MMMM YYYY',
        ).toISOString();
        const editedBook = {
            ...editingRowData,
            bookPublicationDate: formattedDate,
        };
        await mutateAsync({ data: { ...editedBook } });

        refetch;
        setIsEditingBooks(false);
        setEditingRowId(null);
        setEditingRowData(bookInitialState);
        setIsBookDateEdited(false);
    };

    return isEditingBooks && editingRowId ? (
        <Button onClick={() => updatePublication()}>Sauvegarder</Button>
    ) : (
        <a onClick={() => handleEditBookRow(record)}>Éditer</a>
    );
};

export default UpdateBooks;