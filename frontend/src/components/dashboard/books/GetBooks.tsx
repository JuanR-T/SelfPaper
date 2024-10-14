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
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import { useApiContext } from '../../../context/ApiContext';
import { useAuth } from '../../../context/AuthContext';
import { Author, Book, Publisher } from '../../../types/types';
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
    const [selectThemeValue, setSelectThemeValue] = useState('');
    const [selectPublisherValue, setSelectPublisherValue] = useState('');
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [isEditingBooks, setIsEditingBooks] = useState<boolean>(false);
    const [isBookDateEdited, setIsBookDateEdited] = useState<boolean>(false);
    const [editingFormData, setEditingFormData] = useState<FormData>(new FormData());

    const booksQueryResult = bookQuery?.data?.data?.books;
    const currentBooksDisplayed = booksQueryResult?.slice(startIndex, endIndex);
    const publishers = publisherQuery?.data?.data?.publisher;

    const [editingRowData, setEditingRowData] = useState<Partial<Book>>({})

    useEffect(() => {
        bookQuery.refetch();
    }, [editingRowId]);

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
                const isValidDate = editingRowData.bookPublicationDate && dayjs(editingRowData.bookPublicationDate).isValid();
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
                        value={isValidDate ? dayjs(editingRowData.bookPublicationDate) : null}
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
        {
            title: 'Éditeur',
            dataIndex: 'bookPublisher',
            responsive: ['sm'],
            render: (text: string, record: Book) => {
                console.log("recordit", record)
                return isEditingBooks && editingRowId === record._id ? (
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
                    record.bookPublisherService ? record.bookPublisher.title + ": " + record.bookPublisherService : record.bookPublisher.title
                );
            },
        },
        {
            title: 'Image',
            dataIndex: 'postImage',
            responsive: ['sm'],
            render: (text: string, record: Book) => {
                const imageSrc: any = record.bookImage?.image;

                return isEditingBooks && editingRowId === record._id ? (
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
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            responsive: ['sm'],
            render: (text: string, record: Book) => {
                const imageSrc: any = record.thumbnail?.image;
                return isEditingBooks && editingRowId === record._id ? (
                    <Upload
                        beforeUpload={(file) => {
                            const formData = editingFormData;
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
                            isBookDateEdited={isBookDateEdited}
                            setIsBookDateEdited={setIsBookDateEdited}
                            refetch={() => bookQuery.refetch()}
                            books={booksQueryResult}
                            isEditingBooks={isEditingBooks}
                            editingRowId={editingRowId}
                            editingRowData={editingRowData}
                            editingFormData={editingFormData}
                            setEditingFormData={setEditingFormData}
                            setIsEditingBooks={setIsEditingBooks}
                            setEditingRowId={setEditingRowId}
                            setEditingRowData={setEditingRowData}
                        />

                        <DeleteBooks
                            record={record}
                            refetch={() => bookQuery.refetch()}
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
                        refetch={() => bookQuery.refetch()}
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
                        rowKey={(book: Book) => book._id || ''}
                        style={{ marginTop: '10px', width: '100%' }}
                    />
                    <Pagination
                        current={currentPage}
                        pageSize={booksPerPage}
                        total={booksQueryResult?.length || 0}
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