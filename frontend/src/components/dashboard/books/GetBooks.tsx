import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Input,
    Pagination,
    Select,
    Table,
    Upload,
    message,
} from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import { useApiContext } from '../../../context/ApiContext';
import { useAuth } from '../../../context/AuthContext';
import { Author, Book } from '../../../types/types';
import ModalProvider from '../../utils/ModalProvider';
import CreateBooks from './CreateBooks';
import DeleteBooks from './DeleteBooks';
import UpdateBooks from './UpdateBooks';
const GetBooks = () => {
    dayjs.extend(customParseFormat);
    dayjs.locale('fr');
    const { bookQuery, publisherQuery, imageQuery } = useApiContext();
    const { author } = useAuth();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const booksPerPage = 10;
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const [refetchTrigger, setRefetchTrigger] = useState(false);
    const [selectThemeValue, setSelectThemeValue] = useState('');
    const [selectPublisherValue, setSelectPublisherValue] = useState('');
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [isDeletingBooks, setIsDeletingBooks] = useState<boolean>(false);
    const [isEditingBooks, setIsEditingBooks] = useState<boolean>(false);
    const [isBookDateEdited, setIsBookDateEdited] = useState<boolean>(false);

    const currentBooksDisplayed = bookQuery?.data?.books?.slice(
        startIndex,
        endIndex,
    );
    const bookInitialState = {
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
    };
    const [editingRowData, setEditingRowData] =
        useState<Book>(bookInitialState);

    const editingBookPublicationDate = (date: any | null) => {
        setIsBookDateEdited(true);
        setEditingRowData({
            ...editingRowData,
            bookPublicationDate: dayjs(date, 'DD MMMM YYYY'),
        });
    };
    useEffect(() => {
        const fetchData = async () => {
            await bookQuery.refetch();
        };
        setIsDeletingBooks(false);
        fetchData();
    }, [isDeletingBooks, editingRowId, refetchTrigger]);

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
                const formattedBookPublicationDate = dayjs(
                    record?.bookPublicationDate,
                    'DD MMMM YYYY',
                );
                return isEditingBooks && editingRowId === record._id ? (
                    <DatePicker
                        onChange={editingBookPublicationDate}
                        value={
                            isBookDateEdited
                                ? editingRowData.bookPublicationDate
                                : formattedBookPublicationDate
                        }
                    />
                ) : (
                    record.bookPublicationDate
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
            title: 'Éditeur',
            dataIndex: 'bookPublisher',
            responsive: ['sm'],
            render: (text: string, record: Book) => {
                return isEditingBooks && editingRowId === record._id ? (
                    <Select
                        placeholder="Choisir un éditeur"
                        onSelect={(value) => setSelectPublisherValue(value)}
                    >
                        {publisherQuery?.data?.publisher?.map(
                            (publisher: any) => (
                                <Select.Option
                                    key={publisher._id}
                                    value={publisher._id}
                                >
                                    {publisher.title}
                                </Select.Option>
                            ),
                        )}
                    </Select>
                ) : (
                    record.bookPublisher[0].title
                );
            },
        },
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
                            bookInitialState={bookInitialState}
                            isBookDateEdited={isBookDateEdited}
                            setIsBookDateEdited={setIsBookDateEdited}
                            refetch={bookQuery.refetch}
                            books={bookQuery?.data?.books}
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
                        total={bookQuery?.data?.books?.length || 0}
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

export default GetBooks;
