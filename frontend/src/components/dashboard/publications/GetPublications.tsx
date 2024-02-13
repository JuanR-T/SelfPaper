import { useEffect, useState } from 'react';
import { handleGet } from '../../../api/handleCall';
import {
    Button,
    Upload,
    Input,
    Pagination,
    Table,
    message,
    Select,
    DatePicker,
} from 'antd';
import { useQuery } from 'react-query';
import toastProvider from '../../../lib/toastProvider';
import { useAuth } from '../../../context/AuthContext';
import { UploadOutlined } from '@ant-design/icons';
import {
    ThemeApiResponse,
    Publication,
    RefetchTriggerProps,
    PublicationApiResponse,
} from '../../../types/types';
import dayjs, { Dayjs } from 'dayjs';
import UpdatePublications from './UpdatePublications';
import DeletePublications from './DeletePublications';

const GetPublications: React.FC<RefetchTriggerProps> = ({ refetchTrigger }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    //TODO check if middleware fetching and caching data calls is a good idea or not (avoid doing X calls on X pages, just do it once)
    const { getConfig, author } = useAuth();
    const [selectThemeValue, setSelectThemeValue] = useState('');
    const [selectPublisherValue, setSelectPublisherValue] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [isDeletingPublication, setIsDeletingPublication] =
        useState<boolean>(false);
    const [isEditingPublication, setIsEditingPublication] =
        useState<boolean>(false);

    const [editingRowData, setEditingRowData] = useState<Publication>({
        _id: '',
        title: '',
        description: '',
        thumbnail: '',
        postImage: '',
        type: [''],
        theme: {
            _id: '',
            title: '',
            description: '',
            image: '',
        },
        excerpt: '',
        publicationDate: '',
        publisher: {
            _id: '',
            title: '',
            description: '',
            type: '',
            location: '',
            founded_at: '',
            services: [''],
        },
        author: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
        },
    });
    const { data: useQueryThemes }: any = useQuery('get_themes', async () => {
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
    });
    const { data: useQueryPublishers }: any = useQuery(
        'get_publishers',
        async () => {
            const useQueryPublishers = await handleGet(
                `${BASE_URL}/api/publisher`,
                getConfig(),
            );
            if (!useQueryPublishers || !useQueryPublishers.data) {
                toastProvider(
                    'error',
                    'Une erreur est survenue pendant la récupération des éditeurs. Veuillez réessayer.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return useQueryPublishers;
        },
    );
    const { data: useQueryPublications, refetch } = useQuery(
        'get_publications',
        async () => {
            const useQueryPublications = await handleGet(
                `${BASE_URL}/api/publication`,
                getConfig(),
            );
            if (!useQueryPublications || !useQueryPublications.data) {
                toastProvider(
                    'error',
                    'Une erreur est survenue pendant la récupération des publications. Veuillez réessayer.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return useQueryPublications;
        },
    );
    const publications = (useQueryPublications?.data as PublicationApiResponse)
        ?.publication;
    const publicationsPerPage = 10;
    const startIndex = (currentPage - 1) * publicationsPerPage;
    const endIndex = startIndex + publicationsPerPage;
    const currentPublications = publications?.slice(startIndex, endIndex);
    console.log(currentPublications, 'currentPublications');
    console.log(
        'useQueryPublishers?.data.publisher',
        useQueryPublishers?.data.publisher,
    );

    useEffect(() => {
        const fetchData = async () => {
            await refetch();
        };
        setIsDeletingPublication(false);
        fetchData();
    }, [isDeletingPublication, editingRowId, refetchTrigger, refetch]);

    const columns: any = [
        {
            title: 'Nom',
            dataIndex: 'title',
            width: '10%',
            editable: true,
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
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
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
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
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            width: '10%',
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
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
            title: 'Image',
            dataIndex: 'postImage',
            width: '10%',
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
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
            title: 'Type',
            dataIndex: 'type',
            width: '30%',
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
                    <Input.TextArea
                        onChange={(e) => {
                            setEditingRowData({
                                ...editingRowData,
                                type: [e.target.value],
                            });
                        }}
                        value={editingRowData.type}
                    ></Input.TextArea>
                ) : (
                    text
                );
            },
        },
        {
            title: 'Thème',
            dataIndex: 'theme',
            width: '30%',
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
                    <Select
                        placeholder="Choisir un type"
                        onSelect={(value) => setSelectThemeValue(value)}
                    >
                        {useQueryThemes?.data.theme.map((item: any) => (
                            <Select.Option key={item._id} value={item._id}>
                                {item.title}
                            </Select.Option>
                        ))}
                    </Select>
                ) : (
                    text
                );
            },
        },
        {
            title: 'Excerpt',
            dataIndex: 'excerpt',
            width: '10%',
            editable: true,
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
                    <Input.TextArea
                        onChange={(e) => {
                            setEditingRowData({
                                ...editingRowData,
                                excerpt: e.target.value,
                            });
                        }}
                        value={editingRowData.excerpt}
                    ></Input.TextArea>
                ) : (
                    text
                );
            },
        },
        {
            title: 'Date de publication',
            dataIndex: 'publicationDate',
            width: '10%',
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
                    <DatePicker
                        onChange={(date: Dayjs | null) => {
                            if (date) {
                                const dayjsDate = dayjs(date);
                                setEditingRowData({
                                    ...editingRowData,
                                    publicationDate: dayjsDate.toISOString(),
                                });
                            } else {
                                setEditingRowData({
                                    ...editingRowData,
                                    publicationDate: '',
                                });
                            }
                        }}
                        value={dayjs(editingRowData.publicationDate)}
                    />
                ) : (
                    text
                );
            },
        },
        {
            title: 'Éditeur',
            dataIndex: 'publisher',
            width: '30%',
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
                    <Select
                        placeholder="Choisir un éditeur"
                        onSelect={(value) => setSelectPublisherValue(value)}
                    >
                        {useQueryPublishers?.data?.publisher.map(
                            (item: any) => (
                                <Select.Option key={item._id} value={item._id}>
                                    {item.title}
                                </Select.Option>
                            ),
                        )}
                    </Select>
                ) : (
                    useQueryPublishers?.data?.publisher.map((item: any) => {
                        if (
                            record.publisher
                                .map((publi: any) => publi._id)
                                .includes(item._id)
                        ) {
                            return item.title;
                        }
                    })
                );
            },
        },
        {
            title: 'Auteur',
            dataIndex: 'author',
            width: '30%',
            render: (text: string, record: Publication) => {
                console.log('record', record);
                return isEditingPublication && editingRowId === record._id ? (
                    <Select
                        placeholder="Choisir un auteur"
                        onSelect={(value) => setSelectPublisherValue(value)}
                    >
                        {useQueryPublishers?.data?.publisher.map(
                            (item: any) => (
                                <Select.Option key={item._id} value={item._id}>
                                    {item.title}
                                </Select.Option>
                            ),
                        )}
                    </Select>
                ) : (
                    useQueryPublishers?.data?.publisher.map((item: any) => {
                        if (
                            record.publisher
                                .map((publi: any) => publi._id)
                                .includes(item._id)
                        ) {
                            return item.title;
                        }
                    })
                );
            },
        },
        {
            title: 'Actions',
            width: '15%',
            render: (record: Publication) => {
                return (
                    <>
                        <UpdatePublications
                            record={record}
                            isEditingPublication={isEditingPublication}
                            editingRowId={editingRowId}
                            editingRowData={editingRowData}
                            setIsEditingPublication={setIsEditingPublication}
                            setEditingRowId={setEditingRowId}
                            setEditingRowData={setEditingRowData}
                        />
                        <DeletePublications
                            record={record}
                            setIsDeletingPublication={setIsDeletingPublication}
                            editingRowId={editingRowId}
                            setEditingRowId={setEditingRowId}
                        />
                    </>
                );
            },
        },
    ];
    return (
        <div style={{ width: '100%' }}>
            <h2>Mes Publications</h2>
            {currentPublications ? (
                <>
                    <Table
                        dataSource={currentPublications}
                        columns={columns}
                        pagination={false}
                        rowKey={(publication) => publication._id}
                        style={{ marginTop: '10px', width: '100%' }}
                    />
                    <Pagination
                        current={currentPage}
                        pageSize={publicationsPerPage}
                        total={publications?.length || 0}
                        onChange={(page) => setCurrentPage(page)}
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            textAlign: 'center',
                        }}
                    />
                </>
            ) : (
                <>Chargement des Publications...</>
            )}
        </div>
    );
};

export default GetPublications;
