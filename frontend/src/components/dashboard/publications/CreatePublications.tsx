import React, { useState } from 'react';
import BookOutlined, { UploadOutlined } from '@ant-design/icons';
import { handleGet, handlePost } from '../../../api/handleCall';
import {
    Input,
    Form,
    Row,
    Button,
    Upload,
    message,
    Select,
    DatePicker,
    Cascader,
} from 'antd';
import toastProvider from '../../../lib/toastProvider';
import { Publisher, RefetchTriggerProps } from '../../../types/types';
import { useQuery } from 'react-query';
import { useAuth } from '../../../context/AuthContext';
import dayjs, { Dayjs } from 'dayjs';
import Capitalize from '../../../lib/capitalizeLetter';

const CreatePublication: React.FC<RefetchTriggerProps> = ({
    setRefetchTrigger,
    refetchTrigger,
    handleCancelation,
}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig, author } = useAuth();
    const [selectThemeValue, setSelectThemeValue] = useState('');
    const [publicationDateValue, setPublicationDateValue] = useState('');
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
        await handlePost(`${BASE_URL}/api/publication/create`, {
            title: values.title,
            description: values.description,
            link: values.link,
            thumbnail: values.thumbnail,
            postImage: values.postImage,
            type: values.type,
            theme: selectThemeValue,
            excerpt: values.excerpt,
            publicationDate: publicationDateValue,
            publisher: selectPublisherValue,
            author: author?.id,
        });
        setRefetchTrigger(true);
        toastProvider(
            'success',
            'La publication a été créée avec succès.',
            'bottom-left',
            'light',
        );
        //Checking if handleCancelation undefined or not.
        handleCancelation?.();
    };
    return (
        <Row className="creation-form">
            <h2>{Capitalize('Ajouter une publication')}</h2>
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
                    label={'Post Image'}
                    name={'postImage'}
                    rules={[
                        {
                            required: false,
                            message: 'postImage',
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
                    label={'Format'}
                    name={'type'}
                    rules={[
                        {
                            required: true,
                            message: 'type de la publication',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Quel format ? Article, podcast..." />
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
                <Form.Item
                    label={'Excerpt'}
                    name={'excerpt'}
                    rules={[
                        {
                            required: true,
                            message: 'excerpt de la publication',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Excerpt de la publication" />
                </Form.Item>
                <Form.Item
                    label={'Date de publication'}
                    name={'publicationDate'}
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
                                setPublicationDateValue(
                                    dayjsDate.toISOString(),
                                );
                            } else {
                                setPublicationDateValue('');
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label={'Éditeur'}
                    name={'publisher'}
                    rules={[
                        {
                            required: true,
                            message: 'Éditeur de la publication',
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
