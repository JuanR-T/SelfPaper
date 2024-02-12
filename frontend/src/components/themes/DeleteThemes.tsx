import { Button, Popover } from 'antd';
import { handleDelete } from '../../api/handleCall';
import toastProvider from '../../lib/toastProvider';
import { WarningOutlined } from '@ant-design/icons';
import { Theme } from '../../types/types';
import { useState } from 'react';
import { DeleteThemeProps } from '../../types/types';

const DeleteTheme = ({
    record,
    setIsDeletingTheme,
    setEditingRowId,
    editingRowId,
}: DeleteThemeProps) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [open, setOpen] = useState<boolean>(false);

    const handlePopoverRow = (record: Theme) => {
        setEditingRowId(record._id);
    };
    const hide = () => {
        setEditingRowId(null);
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const deleteTheme = async (record: any) => {
        const deletedTheme = await handleDelete(
            `${BASE_URL}/api/theme/delete/${record._id}`,
        );
        if (!deletedTheme || !deletedTheme.data) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la suppression du thème. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
            return undefined;
        }
        setIsDeletingTheme(true);
        toastProvider(
            'success',
            'Le thème a bien été supprimé !',
            'bottom-left',
            'light',
        );
        return deletedTheme;
    };
    const deleteContent = (record: Theme) => {
        return (
            <>
                <WarningOutlined style={{ color: 'red' }} />
                <p>Êtes vous sûre de vouloir supprimer ce theme ? </p>
                <Button onClick={hide}>Annuler</Button>
                <Button onClick={() => deleteTheme(record)}>Confirmer</Button>
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

export default DeleteTheme;
