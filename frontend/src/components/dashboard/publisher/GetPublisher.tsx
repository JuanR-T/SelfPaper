import { useEffect, useState } from 'react';
import { handleDelete, handleGet, handlePut } from '../../../api/handleCall';
import { Button, DatePicker, Input, Pagination, Popover, Table } from 'antd';
import { useQuery } from 'react-query';
import toastProvider from '../../../lib/toastProvider';
import { useAuth } from '../../../context/AuthContext';
import dayjs, { Dayjs } from 'dayjs';
import { WarningOutlined } from '@ant-design/icons';
import {
    PublisherApiResponse,
    Publisher,
    RefetchTriggerProps,
} from '../../../types/types';
//TODO clean this awfull code

const GetPublisher: React.FC<RefetchTriggerProps> = ({ refetchTrigger }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [isDeletingPublisher, setIsDeletingPublisher] =
        useState<boolean>(false);
    const [isEditingPublisher, setIsEditingPublisher] =
        useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [editingRowData, setEditingRowData] = useState<Publisher>({
        _id: '',
        title: '',
        description: '',
        type: '',
        location: '',
        founded_at: '',
        services: [],
    });
    const hide = () => {
        setEditingRowId(null);
        setOpen(false);
    };
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const { data: useQueryPublishers, refetch } = useQuery(
        'get_publishers',
        async () => {
            const useQueryPublishers = await handleGet(
                `${BASE_URL}/api/publisher`,
                getConfig(),
            );
            if (!useQueryPublishers || !useQueryPublishers.data) {
                toastProvider(
                    'error',
                    'Une erreur est survenue pendant la récupération des Éditeurs. Veuillez réessayer.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return useQueryPublishers;
        },
    );
    const updatePublisher = async () => {
        const updatedPublisher = await handlePut(
            `${BASE_URL}/api/publisher/update/${editingRowData._id}`,
            { ...editingRowData },
        );
        if (!updatedPublisher || !updatedPublisher.data) {
            toastProvider(
                'error',
                "Une erreur est survenue pendant la mise à jour de l'Éditeur. Veuillez réessayer.",
                'bottom-left',
                'colored',
            );
            return undefined;
        }
        setIsEditingPublisher(false);
        setEditingRowId(null);
        return updatedPublisher;
    };
    const deletePublisher = async (record: any) => {
        const deletedPublisher = await handleDelete(
            `${BASE_URL}/api/publisher/delete/${record._id}`,
        );
        if (!deletedPublisher || !deletedPublisher.data) {
            toastProvider(
                'error',
                "Une erreur est survenue pendant la supression de l'Éditeur. Veuillez réessayer.",
                'bottom-left',
                'colored',
            );
            return undefined;
        }
        setIsDeletingPublisher(true);
        return deletedPublisher;
    };

    const publishers = (useQueryPublishers?.data as PublisherApiResponse)
        ?.publisher;
    const publishersPerPage = 10;
    const startIndex = (currentPage - 1) * publishersPerPage;
    const endIndex = startIndex + publishersPerPage;
    const currentPublishers = publishers?.slice(startIndex, endIndex);

    const handleEditPublisherRow = (record: Publisher) => {
        setIsEditingPublisher(true);
        setEditingRowData({ ...record });
        setEditingRowId(record._id);
    };
    const handlePopoverRow = (record: Publisher) => {
        setEditingRowId(record._id);
    };
    useEffect(() => {
        const fetchData = async () => {
            await refetch();
        };
        setIsDeletingPublisher(false);
        fetchData();
    }, [isDeletingPublisher, editingRowId, refetchTrigger, refetch]);

    const columns: any = [
        {
            title: 'Nom',
            dataIndex: 'title',
            width: '10%',
            editable: true,
            render: (text: string, record: Publisher) => {
                return isEditingPublisher && editingRowId === record._id ? (
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
            render: (text: string, record: Publisher) => {
                return isEditingPublisher && editingRowId === record._id ? (
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
            title: 'Adresse',
            dataIndex: 'location',
            width: '10%',
            render: (text: string, record: Publisher) => {
                return isEditingPublisher && editingRowId === record._id ? (
                    <Input
                        onChange={(e) => {
                            setEditingRowData({
                                ...editingRowData,
                                location: e.target.value,
                            });
                        }}
                        value={editingRowData.location}
                    ></Input>
                ) : (
                    text
                );
            },
        },
        {
            title: 'Services',
            dataIndex: 'services',
            width: '10%',
            render: (text: string, record: Publisher) => {
                return isEditingPublisher && editingRowId === record._id ? (
                    <Input.TextArea
                        onChange={(e) => {
                            setEditingRowData({
                                ...editingRowData,
                                services: e.target.value.split(','),
                            });
                        }}
                        value={editingRowData.services}
                    ></Input.TextArea>
                ) : (
                    text
                );
            },
        },
        {
            title: 'Type de média',
            dataIndex: 'type',
            width: '10%',
            render: (text: string, record: Publisher) => {
                return isEditingPublisher && editingRowId === record._id ? (
                    <Input
                        onChange={(e) => {
                            setEditingRowData({
                                ...editingRowData,
                                type: e.target.value,
                            });
                        }}
                        value={editingRowData.type}
                    ></Input>
                ) : (
                    text
                );
            },
        },
        {
            title: 'Date de création',
            dataIndex: 'founded_at',
            width: '10%',
            render: (text: string, record: Publisher) => {
                return isEditingPublisher && editingRowId === record._id ? (
                    <DatePicker
                        onChange={(date: Dayjs | null) => {
                            if (date) {
                                const dayjsDate = dayjs(date);
                                setEditingRowData({
                                    ...editingRowData,
                                    founded_at: dayjsDate.toISOString(),
                                });
                            } else {
                                setEditingRowData({
                                    ...editingRowData,
                                    founded_at: '',
                                });
                            }
                        }}
                        value={dayjs(editingRowData.founded_at)}
                    />
                ) : (
                    text
                );
            },
        },
        {
            title: 'Actions',
            width: '15%',
            render: (record: Publisher) => {
                const editButton = (
                    <a onClick={() => handleEditPublisherRow(record)}>Éditer</a>
                );

                const saveButton = (
                    <Button onClick={() => updatePublisher()}>
                        Sauvegarder
                    </Button>
                );
                const deleteContent = (record: Publisher) => {
                    return (
                        <>
                            <WarningOutlined style={{ color: 'red' }} />
                            <p>
                                Êtes vous sûre de vouloir supprimer cet éditeur
                                ?{' '}
                            </p>
                            <Button onClick={hide}>Annuler</Button>
                            <Button onClick={() => deletePublisher(record)}>
                                Confirmer
                            </Button>
                        </>
                    );
                };
                const deleteButton = (
                    <Popover
                        content={deleteContent(record)}
                        title="Suppression de l'éditeur"
                        trigger="click"
                        open={editingRowId === record._id && open}
                        onOpenChange={handleOpenChange}
                    >
                        <a onClick={() => handlePopoverRow(record)}>
                            {' '}
                            Supprimer
                        </a>
                    </Popover>
                );

                return (
                    <>
                        {isEditingPublisher && editingRowId ? (
                            <>{saveButton}</>
                        ) : (
                            <>
                                {editButton}
                                {deleteButton}
                            </>
                        )}
                    </>
                );
            },
        },
    ];

    return (
        <div style={{ width: '100%' }}>
            <h2>Mes Éditeurs</h2>
            {currentPublishers ? (
                <>
                    <Table
                        dataSource={currentPublishers}
                        columns={columns}
                        pagination={false}
                        rowKey={(publisher) => publisher._id}
                        style={{ marginTop: '10px', width: '100%' }}
                    />
                    <Pagination
                        current={currentPage}
                        pageSize={publishersPerPage}
                        total={publishers?.length || 0}
                        onChange={(page) => setCurrentPage(page)}
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            textAlign: 'center',
                        }}
                    />
                </>
            ) : (
                <>Chargement des Éditeurs...</>
            )}
        </div>
    );
};

export default GetPublisher;
