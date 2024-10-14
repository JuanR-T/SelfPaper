import { FileImageOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Input,
    Pagination,
    Select,
    Table,
    Upload
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useApiContext } from '../../../context/ApiContext';
import { Author, Publication, Publisher } from '../../../types/types';
import ModalProvider from '../../utils/ModalProvider';
import CreatePublication from './CreatePublications';
import DeletePublications from './DeletePublications';
import UpdatePublications from './UpdatePublications';

const GetPublications: React.FC = () => {
    const { publicationQuery, imageQuery, imageByIdQuery, publisherQuery, themeQuery } =
        useApiContext();

    const [selectThemeValue, setSelectThemeValue] = useState('');
    const [selectPublisherValue, setSelectPublisherValue] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [isDeletingPublication, setIsDeletingPublication] =
        useState<boolean>(false);
    const [isEditingPublication, setIsEditingPublication] =
        useState<boolean>(false);
    const [editingRowData, setEditingRowData] = useState<Partial<Publication>>({});
    const [editingFormData, setEditingFormData] = useState<FormData>(new FormData());


    const publications = publicationQuery?.data?.data?.publications;
    console.log("publications", publications);
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
    }, [isDeletingPublication, editingRowId]);

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
                            const updatedData = { ...editingRowData, title: e.target.value };
                            setEditingRowData(updatedData);
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
                            const updatedData = { ...editingRowData, description: e.target.value };
                            setEditingRowData(updatedData);
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
                            const updatedData = { ...editingRowData, link: e.target.value };
                            setEditingRowData(updatedData);
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
                const imageSrc: any = record.thumbnail?.image;

                return isEditingPublication && editingRowId === record._id ? (
                    <Upload
                        beforeUpload={(file) => {
                            const formData = new FormData();
                            formData.append('thumbnail', file);
                            setEditingFormData(formData);
                            return false;
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                ) : (imageSrc ?
                    <img
                        src={imageSrc ? `data:image/jpeg;base64,${imageSrc}` : ''}
                        alt="Thumbnail"
                        style={{ width: '40px', height: '40px' }}
                    />
                    : <FileImageOutlined style={{ fontSize: '40px' }} />
                );
            },
        },
        {
            title: 'Image',
            dataIndex: 'postImage',
            responsive: ['sm'],
            render: (text: string, record: Publication) => {
                const imageSrc: any = record.postImage?.image;

                return isEditingPublication && editingRowId === record._id ? (
                    <Upload
                        beforeUpload={(file) => {
                            const formData = editingFormData;
                            formData.append('postImage', file);
                            setEditingFormData(formData);
                            return false;
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                ) : (imageSrc ?
                    <img
                        src={imageSrc ? `data:image/jpeg;base64,${imageSrc}` : ''}
                        alt="Thumbnail"
                        style={{ width: '40px', height: '40px' }}
                    />
                    : <FileImageOutlined style={{ fontSize: '40px' }} />
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
                            const updatedData = { ...editingRowData, type: [e.target.value] };
                            setEditingRowData(updatedData);
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
                            const updatedData = { ...editingRowData, excerpt: e.target.value };
                            setEditingRowData(updatedData);
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
                const isValidDate = editingRowData.publicationDate && dayjs(editingRowData.publicationDate).isValid();

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
                        value={isValidDate ? dayjs(editingRowData.publicationDate) : null}
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
                    record.publisherService ? record.publisher.title + ": " + record.publisherService : record.publisher.title
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
                            editingFormData={editingFormData}
                            setEditingFormData={setEditingFormData}
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