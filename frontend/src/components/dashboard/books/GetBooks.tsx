import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { handleGet } from '../../../api/handleCall'
import { useAuth } from '../../../context/AuthContext';
import toastProvider from '../../../lib/toastProvider';
import { Author, BooksApiResponse, ImagesApiResponse, PublisherApiResponse } from '../../../types/types';
import { Input, Upload, message, Button, Select, DatePicker, Table, Pagination } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import ModalProvider from '../../utils/ModalProvider';
import CreatePublication from '../publications/CreatePublications';
import { UploadOutlined } from '@ant-design/icons';
import { Book } from '../../../types/types';
import DeleteBooks from './DeleteBooks';
import UpdateBooks from './UpdateBooks';
import CreateBooks from './CreateBooks';
const GetBooks = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig, author } = useAuth();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const booksPerPage = 10;
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const [refetchTrigger, setRefetchTrigger] = useState(false);
    const [selectThemeValue, setSelectThemeValue] = useState('');
    const [selectPublisherValue, setSelectPublisherValue] = useState('');
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [isDeletingBooks, setIsDeletingBooks] =
        useState<boolean>(false);
    const [isEditingBooks, setIsEditingBooks] =
        useState<boolean>(false);
    const [editingRowData, setEditingRowData] = useState<Book>({
        _id: '',
        title: '',
        description: '',
        link: '',
        bookPublicationDate: '',
        bookAuthor: author?.id,
        bookPublisher: {
            _id: '',
            title: '',
            description: '',
            type: '',
            location: '',
            founded_at: '',
            services: [''],
            service: '',
        },
        bookImage: '',
        thumbnail: '',
        theme: {
            _id: '',
            title: '',
            description: '',
            image: '',
        },
    });
    const { data: useQueryBooks, refetch }: any = useQuery(
        'get_books',
        async () => {
            const useQueryBooksRequest = await handleGet(
                `${BASE_URL}/api/books`,
                getConfig(),
            );
            console.log("useQueryBooksRequest", useQueryBooksRequest)
            if (!useQueryBooksRequest || !useQueryBooksRequest.data) {
                toastProvider(
                    'error',
                    'Une erreur est survenue pendant la récupération des livres. Veuillez réessayer.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return useQueryBooksRequest?.data;
        }
    )
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
    const { data: useQueryImages } = useQuery('get_images', async () => {
        const useQueryImages = await handleGet(
            `${BASE_URL}/api/image`,
            getConfig(),
        );
        if (!useQueryImages) {
            toastProvider(
                'error',
                'Une erreur est survenue pendant la récupération des images. Veuillez réessayer.',
                'bottom-left',
                'colored',
            );
            return undefined;
        }
        return useQueryImages;
    });
    const books = (useQueryBooks as BooksApiResponse)?.books;
    console.log("books", books);
    const currentBooksDisplayed = books?.slice(startIndex, endIndex);
    console.log("currentBooksDisplayed", currentBooksDisplayed);
    const publishers = (useQueryPublishers as PublisherApiResponse)?.publisher;
    console.log("publishers", publishers)
    console.log("books", books);

    useEffect(() => {
        const fetchData = async () => {
            await refetch();
        };
        setIsDeletingBooks(false);
        fetchData();
    }, [isDeletingBooks, editingRowId, refetchTrigger, refetch]);

    const columns: any = [
        {
            title: 'Nom',
            dataIndex: 'title',
            responsive: ['sm'],
            editable: true,
            render: (text: string, record: Book) => {
                return isEditingBooks && editingRowId === record._id ? (
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
            render: (text: string, record: Book) => {
                return isEditingBooks && editingRowId === record._id ? (
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
            render: (text: string, record: Book) => {
                return isEditingBooks && editingRowId === record._id ? (
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
            title: 'Date de publication',
            dataIndex: 'bookPublicationDate',
            responsive: ['sm'],
            render: (text: string, record: Book) => {
                return isEditingBooks && editingRowId === record._id ? (
                    <DatePicker
                        onChange={(date: Dayjs | null) => {
                            if (date) {
                                const dayjsDate = dayjs(date);
                                setEditingRowData({
                                    ...editingRowData,
                                    bookPublicationDate: dayjsDate.toISOString(),
                                });
                            } else {
                                setEditingRowData({
                                    ...editingRowData,
                                    bookPublicationDate: '',
                                });
                            }
                        }}
                        value={dayjs(editingRowData.bookPublicationDate)}
                    />
                ) : (
                    text
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
        // {
        //     title: 'Éditeur / Service',
        //     dataIndex: 'publisher',
        //     responsive: ['sm'],
        //     render: (text: string, record: Book) => {
        //         return isEditingBooks && editingRowId === record._id ? (
        //             <Select
        //                 placeholder="Choisir un éditeur"
        //                 onSelect={(value) => setSelectPublisherValue(value)}
        //             >
        //                 {publishers?.map((publisher: any) => (
        //                     <Select.Option
        //                         key={publisher._id}
        //                         value={publisher._id}
        //                     >
        //                         {publisher.title}
        //                     </Select.Option>
        //                 ))}
        //             </Select>
        //         ) : (
        //             record.bookPublisher[0].title +
        //             ' / ' +
        //             record.bookPublisher[1].service
        //         );
        //     },
        // },
        {
            title: 'Image',
            dataIndex: 'postImage',
            responsive: ['sm'],
            render: (text: string, record: Book) => {
                return isEditingBooks && editingRowId === record._id ? (
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
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            responsive: ['sm'],
            render: (text: string, record: Book) => {
                return isEditingBooks && editingRowId === record._id ? (
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
            title: 'Thème',
            dataIndex: 'theme',
            responsive: ['sm'],
            render: (text: string, record: Book) => {
                return isEditingBooks && editingRowId === record._id ? (
                    <Select
                        placeholder="Choisir un type"
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
            title: 'Actions',
            responsive: ['sm'],
            render: (record: Book) => {
                return (
                    <>
                        <UpdateBooks
                            record={record}
                            isEditingBooks={isEditingBooks}
                            editingRowId={editingRowId}
                            editingRowData={editingRowData}
                            setIsEditingBooks={setIsEditingBooks}
                            setEditingRowId={setEditingRowId}
                            setEditingRowData={setEditingRowData}
                        />

                        <DeleteBooks
                            record={record}
                            setIsDeletingBooks={setIsDeletingBooks}
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
            <h2>Mes Livres</h2>
            <ModalProvider
                modalContent={({ handleCancelation }) => (
                    <CreateBooks
                        handleCancelation={handleCancelation}
                        refetchTrigger={refetchTrigger}
                        setRefetchTrigger={setRefetchTrigger}
                    />
                )}
                contentContext="Ajouter un Livre"
            />
            {currentBooksDisplayed ? (
                <>
                    <Table
                        dataSource={currentBooksDisplayed}
                        columns={columns}
                        pagination={false}
                        rowKey={(publication) => publication._id}
                        style={{ marginTop: '10px', width: '100%' }}
                    />
                    <Pagination
                        current={currentPage}
                        pageSize={booksPerPage}
                        total={books?.length || 0}
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
    )
}

export default GetBooks