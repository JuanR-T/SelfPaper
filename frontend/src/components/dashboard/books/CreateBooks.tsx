import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    message,
    Row,
    Select,
    Upload,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { handleGet, handlePost } from '../../../api/handleCall';
import { useApiContext } from '../../../context/ApiContext';
import { useAuth } from '../../../context/AuthContext';
import Capitalize from '../../../lib/capitalizeLetter';
import toastProvider from '../../../lib/toastProvider';
import { Book, Publisher, RefetchTriggerProps } from '../../../types/types';

const CreatePublication: React.FC<RefetchTriggerProps> = ({
    setRefetchTrigger,
    refetchTrigger,
    handleCancelation,
}) => {
    const { createBookMutation } = useApiContext();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig, author } = useAuth();
    const [selectThemeValue, setSelectThemeValue] = useState('');
    const [bookPublicationDateValue, setBookPublicationDateValue] =
        useState('');
    const [selectPublisherValue, setSelectPublisherValue] = useState<any>({});

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
    const convertToBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                resolve(reader.result as string);
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const uploadImage = async (file: any) => {
        const convertedFile = await convertToBase64(file);
        console.log('convertedFile', convertedFile);
        console.log('file', file);
        await handlePost(`${BASE_URL}/api/image/upload`, {
            title: file.name,
            image: convertedFile,
        });
        toastProvider(
            'success',
            "L'image a été upload avec succès.",
            'bottom-left',
            'light',
        );
    };
    const onSubmit = async (values: any) => {
        const newBook: Book = {
            title: values.title,
            description: values.description,
            link: values.link,
            bookPublicationDate: bookPublicationDateValue,
            bookAuthor: author?.id,
            bookPublisher: selectPublisherValue,
            bookImage: values.postImage,
            thumbnail: values.thumbnail,
            theme: {
                title: selectThemeValue,
                _id: '',
                description: '',
                image: ''
            },
        };
        try {
            await createBookMutation.mutateAsync(newBook as unknown as any);
            setRefetchTrigger(true);
            handleCancelation?.();
            toastProvider(
                'success',
                'Le livre a été ajouté avec succès.',
                'bottom-left',
                'light',
            );
        } catch (error) {
            console.log("create_book_error : ", error)
            toastProvider(
                'error',
                'Le livre n`a pas pu être ajouté.',
                'bottom-left',
                'light',
            );
        }
    };
    return (
        <Row className="creation-form">
            <h2>{Capitalize('Ajouter un Livre')}</h2>
            <Form
                name="creation-form"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                className="content"
            >
                <Form.Item
                    label={'Nom'}
                    name={'title'}
                    rules={[
                        {
                            required: true,
                            message: 'Nom de la publication',
                        },
                    ]}
                >
                    <Input placeholder="Almond mom..." />
                </Form.Item>
                <Form.Item
                    label={'Description'}
                    name={'description'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez inscrire une description !',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Résumé de la publication" />
                </Form.Item>
                <Form.Item label={'Lien de la publication'} name={'link'}>
                    <Input placeholder="https://www.lemonde.fr/signataires/anne-chirol/" />
                </Form.Item>
                <Form.Item
                    label={'Date de publication du livre'}
                    name={'bookPublicationDate'}
                    rules={[
                        {
                            required: true,
                            message: 'Date de publication',
                        },
                    ]}
                >
                    <DatePicker
                        onChange={(date: Dayjs | null) => {
                            if (date) {
                                const dayjsDate = dayjs(date);
                                setBookPublicationDateValue(
                                    dayjsDate.toISOString(),
                                );
                            } else {
                                setBookPublicationDateValue('');
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label={'Éditeur'}
                    name={'bookPublisher'}
                    rules={[
                        {
                            required: true,
                            message: 'Éditeur du livre',
                        },
                    ]}
                >
                    <Cascader
                        placeholder="Editeur / Service"
                        options={useQueryPublishers?.data.publisher.map(
                            (publisher: Publisher) => ({
                                value: publisher._id,
                                label: publisher.title,
                                children: publisher.services?.map(
                                    (services: any) => ({
                                        value: services,
                                        label: services,
                                    }),
                                ),
                            }),
                        )}
                        expandTrigger="hover"
                        onChange={(value) => {
                            const [_id, service] = value;
                            const selectedPublisher = { _id, service };
                            setSelectPublisherValue(selectedPublisher);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label={'Image du livre'}
                    name={'bookImage'}
                    rules={[
                        {
                            required: false,
                            message: 'bookImage',
                        },
                    ]}
                    dependencies={['typeSwitch', 'selectField', 'inputField']}
                >
                    <Upload
                        beforeUpload={(file) => {
                            uploadImage(file);
                            return false;
                        }}
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
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label={'Thumbnail'}
                    name={'thumbnail'}
                    rules={[
                        {
                            required: false,
                            message: 'thumbnail',
                        },
                    ]}
                    dependencies={['typeSwitch', 'selectField', 'inputField']}
                >
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
                </Form.Item>
                <Form.Item
                    label={'Thèmes'}
                    name={'theme'}
                    rules={[
                        {
                            required: true,
                            message: 'Thème de la publication',
                        },
                    ]}
                >
                    <Select
                        placeholder="Choisir un Thème"
                        options={useQueryThemes?.data.theme.map(
                            (item: any) => ({
                                value: item._id,
                                label: item.title,
                            }),
                        )}
                        onSelect={(value) => setSelectThemeValue(value)}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 0 }}>
                    <Button className="submit-button" htmlType="submit">
                        Ajouter
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    );
};

export default CreatePublication;
