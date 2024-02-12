import { useEffect, useState } from 'react';
import { handleGet, handlePut } from '../../api/handleCall';
import { Button, Upload, Input, Pagination, Table, message } from 'antd';
import { useQuery } from 'react-query';
import toastProvider from '../../lib/toastProvider';
import { useAuth } from '../../context/AuthContext';
import { UploadOutlined } from '@ant-design/icons';
import { ThemeApiResponse, Theme, CreateThemeProps } from '../../types/types';
import DeleteTheme from './DeleteThemes';

const GetThemes: React.FC<CreateThemeProps> = ({ refetchTrigger }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [isDeletingTheme, setIsDeletingTheme] = useState<boolean>(false);
    const [isEditingTheme, setIsEditingTheme] = useState<boolean>(false);

    const [editingRowData, setEditingRowData] = useState<Theme>({
        _id: '',
        title: '',
        description: '',
        image: '',
    });

    const { data: useQueryThemes, refetch } = useQuery(
        'get_themes',
        async () => {
            const useQueryThemes = await handleGet(
                `${BASE_URL}/api/theme`,
                getConfig(),
            );
            if (!useQueryThemes || !useQueryThemes.data) {
                toastProvider(
                    'error',
                    'Une erreur est survenue pendant la récupération des thèmes. Veuillez réessayer.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return useQueryThemes;
        },
    );
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

    const themes = (useQueryThemes?.data as ThemeApiResponse)?.theme;
    const themesPerPage = 10;
    const startIndex = (currentPage - 1) * themesPerPage;
    const endIndex = startIndex + themesPerPage;
    const currentThemes = themes?.slice(startIndex, endIndex);

    const handleEditThemeRow = (record: Theme) => {
        setIsEditingTheme(true);
        setEditingRowData({ ...record });
        setEditingRowId(record._id);
    };
    useEffect(() => {
        const fetchData = async () => {
            await refetch();
        };
        setIsDeletingTheme(false);
        fetchData();
    }, [isDeletingTheme, editingRowId, refetchTrigger, refetch]);

    const columns: any = [
        {
            title: 'Nom',
            dataIndex: 'title',
            width: '10%',
            editable: true,
            render: (text: string, record: Theme) => {
                return isEditingTheme && editingRowId === record._id ? (
                    <Input
                        onChange={(e) => {
                            setEditingRowData({
                                ...editingRowData,
                                title: e.target.value,
                            });
                        }}
                        value={editingRowData.title}
                    ></Input>
                ) : (
                    text
                );
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: '30%',
            render: (text: string, record: Theme) => {
                return isEditingTheme && editingRowId === record._id ? (
                    <Input.TextArea
                        onChange={(e) => {
                            setEditingRowData({
                                ...editingRowData,
                                description: e.target.value,
                            });
                        }}
                        value={editingRowData.description}
                    ></Input.TextArea>
                ) : (
                    text
                );
            },
        },
        {
            title: 'Image',
            dataIndex: 'image',
            width: '10%',
            render: (text: string, record: Theme) => {
                return isEditingTheme && editingRowId === record._id ? (
                    <Upload
                        onChange={(info) => {
                            if (info.file.status !== 'uploading') {
                                console.log(info.file, info.fileList);
                            }
                            if (info.file.status === 'done') {
                                message.success(
                                    `${info.file.name} file uploaded successfully`,
                                );
                            } else if (info.file.status === 'error') {
                                message.error(
                                    `${info.file.name} file upload failed.`,
                                );
                            }
                        }}
                        action="/upload/image"
                        //beforeUpload={beforeUpload}
                        //fileList={fileList}
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                ) : (
                    text
                );
            },
        },
        {
            title: 'Actions',
            width: '15%',
            render: (record: Theme) => {
                const editButton = (
                    <a onClick={() => handleEditThemeRow(record)}>Éditer</a>
                );

                const saveButton = (
                    <Button onClick={() => updateTheme()}>Sauvegarder</Button>
                );

                return (
                    <>
                        {isEditingTheme && editingRowId ? (
                            <>{saveButton}</>
                        ) : (
                            <>
                                {editButton}
                                <DeleteTheme
                                    record={record}
                                    setIsDeletingTheme={setIsDeletingTheme}
                                    editingRowId={editingRowId}
                                    setEditingRowId={setEditingRowId}
                                />
                            </>
                        )}
                    </>
                );
            },
        },
    ];

    return (
        <div style={{ width: '100%' }}>
            <h2>Mes Thèmes</h2>
            {currentThemes ? (
                <>
                    <Table
                        dataSource={currentThemes}
                        columns={columns}
                        pagination={false}
                        rowKey={(theme) => theme._id}
                        style={{ marginTop: '10px', width: '100%' }}
                    />
                    <Pagination
                        current={currentPage}
                        pageSize={themesPerPage}
                        total={themes?.length || 0}
                        onChange={(page) => setCurrentPage(page)}
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            textAlign: 'center',
                        }}
                    />
                </>
            ) : (
                <>Chargement des Thèmes...</>
            )}
        </div>
    );
};

export default GetThemes;
