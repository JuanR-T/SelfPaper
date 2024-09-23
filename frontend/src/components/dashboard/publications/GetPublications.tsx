import { UploadOutlined } from '@ant-design/icons';
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

    const [preprocessedImages, setPreprocessedImages] = useState<Record<string, string | null>>({});

    const publications = publicationQuery?.data?.data?.publications;
    const publicationsPerPage = 10;
    const startIndex = (currentPage - 1) * publicationsPerPage;
    const endIndex = startIndex + publicationsPerPage;
    const currentPublications = publications?.slice(startIndex, endIndex);
    const publishers = publisherQuery?.data?.data?.publisher;

    const preprocessImages = async (publications: Publication[]) => {
        const imagePromises = publications.flatMap(item =>
            Array.isArray(item.thumbnail) && item.thumbnail.length > 0
                ? item.thumbnail.map(id => fetchAndConvertImage(id))
                : (item.thumbnail ? [fetchAndConvertImage(item.thumbnail)] : [])
        );

        const imageResults = await Promise.all(imagePromises);
        console.log(imageResults, "imageResults")
        const imageMap = imageResults.reduce((acc, { id, src }) => ({ ...acc, [id]: src }), {});

        setPreprocessedImages(prev => ({ ...prev, ...imageMap }));
    };


    const fetchAndConvertImage = async (id: string) => {
        try {
            const response = await imageByIdQuery(id);
            console.log("response", response)
            const image = response?.data?.imageById[0]?.image;
            if (image) {
                const imageData = new Uint8Array(image.data);
                const base64Image = Buffer.from(imageData).toString('base64');
                return { id, src: `data:${image.type};base64,${base64Image}` };
            } else {
                return { id, src: null };
            }
        } catch (error) {
            console.error('Error fetching image data:', error);
            return { id, src: null };
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await publicationQuery.refetch();
        };
        if (publications) {
            preprocessImages(publications);
        }
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
                const thumbnailIds = Array.isArray(record.thumbnail) ? record.thumbnail : [record.thumbnail];
                const imageSrc = thumbnailIds.length > 0 ? preprocessedImages[thumbnailIds[0]] : null;

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
                ) : (
                    <img src={imageSrc || text} alt="Thumbnail" style={{ width: '50px', height: '50px' }} />
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
                        beforeUpload={(file) => {
                            const formData = editingFormData;
                            formData.append('postImage', file);
                            setEditingFormData(formData);
                            return false;
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                ) : (
                    <img src={text} alt="postImage" style={{ width: '50px' }} />
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
                        // Ensure `value` is passed only if it's a valid date
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
                    text
                    //record.publisher.title + ' / ' + record.publisher.service
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