import { Button } from 'antd';
import { handlePut } from '../../api/handleCall';
import toastProvider from '../../lib/toastProvider';
import { Theme, UpdateThemeProps } from '../../types/types';

const UpdateThemes = ({
    record,
    isEditingTheme,
    editingRowId,
    editingRowData,
    setEditingRowId,
    setIsEditingTheme,
    setEditingRowData,
}: UpdateThemeProps) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleEditThemeRow = (record: Theme) => {
        setIsEditingTheme(true);
        setEditingRowData({ ...record });
        setEditingRowId(record._id);
    };
    const updateTheme = async () => {
        const updatedTheme = await handlePut(
            `${BASE_URL}/api/theme/update/${editingRowData._id}`,
            { ...editingRowData },
        );
        if (!updatedTheme || !updatedTheme.data) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la mise à jour du thème. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
            return undefined;
        }
        setIsEditingTheme(false);
        setEditingRowId(null);
        return updatedTheme;
    };

    return isEditingTheme && editingRowId ? (
        <Button onClick={() => updateTheme()}>Sauvegarder</Button>
    ) : (
        <a onClick={() => handleEditThemeRow(record)}>Éditer</a>
    );
};

export default UpdateThemes;
