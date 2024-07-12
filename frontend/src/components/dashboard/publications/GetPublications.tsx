import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Input,
    message,
    Pagination,
    Select,
    Table,
    Upload,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useApiContext } from '../../../context/ApiContext';
import { useAuth } from '../../../context/AuthContext';
import {
    Author,
    Publication,
    Publisher
} from '../../../types/types';
import ModalProvider from '../../utils/ModalProvider';
import CreatePublication from './CreatePublications';
import DeletePublications from './DeletePublications';
import UpdatePublications from './UpdatePublications';

const GetPublications: React.FC = () => {
    const { getConfig, author } = useAuth();
    const { publicationQuery, imageQuery, publisherQuery, themeQuery } = useApiContext();

    const [refetchTrigger, setRefetchTrigger] = useState(false);
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
        link: '',
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
            service: '',
        },
        author: {
            _id: author?._id || '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: ''
        }
    });

    const publications = publicationQuery?.data?.data?.publications;
    const publicationsPerPage = 10;
    const startIndex = (currentPage - 1) * publicationsPerPage;
    const endIndex = startIndex + publicationsPerPage;
    const currentPublications = publications?.slice(startIndex, endIndex);
    const publishers = publisherQuery?.data?.data?.publisher;

    useEffect(() => {
        const fetchData = async () => {
            await publicationQuery.refetch();
        };
        setIsDeletingPublication(false);
        fetchData();
    }, [isDeletingPublication, editingRowId, refetchTrigger]);

    const columns: any = [
        {
            title: 'Nom',
            dataIndex: 'title',
            responsive: ['sm'],
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
            responsive: ['sm'],
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
                    <p className="dashboard-formatted-content">{text}</p>
                );
            },
        },
        {
            title: 'Lien',
            dataIndex: 'link',
            responsive: ['sm'],
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
                    <Input.TextArea
                        onChange={(e) => {
                            setEditingRowData({
                                ...editingRowData,
                                link: e.target.value,
                            });
                        }}
                        value={editingRowData.link}
                    ></Input.TextArea>
                ) : (
                    <a className="formatted-link" target="_blank" href={text}>
                        {text}
                    </a>
                );
            },
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            responsive: ['sm'],
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
            responsive: ['sm'],
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
            responsive: ['sm'],
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
            responsive: ['sm'],
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
                    <Select
                        placeholder="Choisir un theme"
                        onSelect={(value) => setSelectThemeValue(value)}
                    >
                        <Select.Option
                            key={record.theme._id}
                            value={record.theme._id}
                        >
                            {record.theme.title}
                        </Select.Option>
                    </Select>
                ) : (
                    record.theme.title
                );
            },
        },
        {
            title: 'Excerpt',
            dataIndex: 'excerpt',
            editable: true,
            responsive: ['sm'],
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
                    <p className="dashboard-formatted-content">{text}</p>
                );
            },
        },
        {
            title: 'Date de publication',
            dataIndex: 'publicationDate',
            responsive: ['sm'],
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
            title: 'Éditeur / Service',
            dataIndex: 'publisher',
            responsive: ['sm'],
            render: (text: string, record: Publication) => {
                return isEditingPublication && editingRowId === record._id ? (
                    <Select
                        placeholder="Choisir un éditeur"
                        onSelect={(value) => setSelectPublisherValue(value)}
                    >
                        {publishers?.map((publisher: Publisher) => (
                            <Select.Option
                                key={publisher._id}
                                value={publisher._id}
                            >
                                {publisher.title}
                            </Select.Option>
                        ))}
                    </Select>
                ) : (
                    record.publisher.title +
                    ' / ' +
                    record.publisher.service
                );
            },
        },
        {
            title: 'Auteur',
            dataIndex: 'author',
            responsive: ['sm'],
            render: (record: Author) => {
                if (record) {
                    return record?.firstName + ' ' + record?.lastName;
                }
                return '';
            },
        },
        {
            title: 'Actions',
            responsive: ['sm'],
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
            <div>
                {imageQuery?.data?.data?.images?.map(
                    (item) => (
                        <>
                            <span>{item.title}</span>
                            <img src={item.image} alt="Image" />
                        </>
                    ),
                )}
            </div>
            <ModalProvider
                modalContent={({ handleCancelation }) => (
                    <CreatePublication
                        handleCancelation={handleCancelation}
                        refetch={publicationQuery.refetch}
                    />
                )}
                contentContext="Ajouter une publication"
            />
            {currentPublications && !publicationQuery.isRefetching ? (
                <>
                    <Table
                        dataSource={currentPublications}
                        columns={columns}
                        pagination={false}
                        rowKey={(publication) => publication._id || ''}
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
