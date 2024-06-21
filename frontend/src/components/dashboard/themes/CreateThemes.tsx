import React from 'react';
import BookOutlined, { UploadOutlined } from '@ant-design/icons';
import { handlePost } from '../../../api/handleCall';
import { Input, Form, Row, Button, Upload, message } from 'antd';
import toastProvider from '../../../lib/toastProvider';
import { RefetchTriggerProps } from '../../../types/types';

const CreateTheme: React.FC<RefetchTriggerProps> = ({
    handleCancelation,
    setRefetchTrigger,
}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const onSubmit = async (values: any) => {
        await handlePost(`${BASE_URL}/api/theme/create`, {
            title: values.title,
            description: values.description,
            image: values.image,
        });
        setRefetchTrigger(true);
        toastProvider(
            'success',
            'Le thème a été créé avec succès !',
            'bottom-left',
            'light',
        );
        handleCancelation?.();
    };
    return (
        <Row className="creation-form">
            <h1 className="h1">Ajouter un Thème</h1>
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
                            message: 'Nom du thème',
                        },
                    ]}
                >
                    <Input prefix={<BookOutlined />} placeholder="Slate..." />
                </Form.Item>
                <Form.Item
                    label={'Description'}
                    name={'description'}
                    rules={[
                        {
                            required: true,
                            message: 'Description du thème',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Résumé du thème" />
                </Form.Item>

                <Form.Item
                    label={'Image'}
                    name={'image'}
                    rules={[
                        {
                            required: false,
                            message: 'Image',
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
                <Form.Item wrapperCol={{ offset: 0 }}>
                    <Button className="submit-button" htmlType="submit">
                        Ajouter
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    );
};

export default CreateTheme;
