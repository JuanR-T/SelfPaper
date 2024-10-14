import { Button } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useAuth } from '../../../context/AuthContext';
import useUpdateMutation from '../../../hooks/useUpdateMutation';
import toastProvider from '../../../lib/toastProvider';
import { Book, MutationPayload, UpdateBooksProps } from '../../../types/types';

const UpdateBooks = ({
    refetch,
    isBookDateEdited,
    editingFormData,
    setEditingFormData,
    setIsBookDateEdited,
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
    const { getConfig } = useAuth();


    const { mutateAsync } = useUpdateMutation({
        dataUrl: 'books',
        dataType: 'book',
        dataId: editingRowData._id,
    });
    const handleEditBookRow = (record: Book) => {
        setIsEditingBooks(true);
        setEditingRowData({ ...record });
        setEditingRowId(record._id || '');
    };
    const updatePublication = async () => {
        try {
            const formattedDate = dayjs(
                editingRowData.bookPublicationDate,
                'DD MMMM YYYY',
            ).toISOString();
            editingFormData.append('title', editingRowData.title || '');
            editingFormData.append('description', editingRowData.description || '');
            editingFormData.append('link', editingRowData.link || '');
            editingFormData.append('bookPublicationDate', formattedDate || '');
            editingFormData.append('author', typeof editingRowData.bookAuthor === 'string' ? editingRowData.bookAuthor : editingRowData.bookAuthor ? JSON.stringify(editingRowData.bookAuthor) : '');
            editingFormData.append('publisher', typeof editingRowData.bookPublisher === 'string' ? editingRowData.bookPublisher : editingRowData.bookPublisher ? JSON.stringify(editingRowData.bookPublisher) : '');
            editingFormData.append('theme', typeof editingRowData.theme === 'string' ? editingRowData.theme : editingRowData.theme ? JSON.stringify(editingRowData.theme) : '');

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
            setIsEditingBooks(false);
            setEditingRowId(null);
            setIsBookDateEdited(false);
            setEditingRowData({});

        } catch (error) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la mise à jour de la publication. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
        }

    };

    return isEditingBooks && editingRowId ? (
        <Button onClick={() => updatePublication()}>Sauvegarder</Button>
    ) : (
        <a onClick={() => handleEditBookRow(record)}>Éditer</a>
    );
};

export default UpdateBooks;