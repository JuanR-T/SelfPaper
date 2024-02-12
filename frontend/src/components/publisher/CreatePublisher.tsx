import React, { useState } from 'react';
import BookOutlined, { PushpinOutlined } from '@ant-design/icons';
import { handlePost } from '../../api/handleCall';
import { Input, Switch, Form, Select, Row, DatePicker, Button } from 'antd';
import '../../styles/main.css';
import toastProvider from '../../lib/toastProvider';
interface CreatePublisherFormProps {
    setRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreatePublisherForm: React.FC<CreatePublisherFormProps> = ({
    setRefetchTrigger,
}) => {
    const [servicesSwitch, setServicesSwitch] = useState(true);
    const [selectValue, setSelectValue] = useState('');
    const [servicesValue, setServicesValue] = useState<any>('');
    const [typeSwitch, setTypeSwitch] = useState(true);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const selectFieldOptions = [
        {
            value: 'journal',
            label: 'Journal',
        },
        {
            value: 'publisher',
            label: 'Editeur',
        },
        {
            value: 'podcast',
            label: 'Podcast',
        },
        {
            value: 'magazine',
            label: 'Magazine',
        },
    ];
    const onSubmit = async (values: any) => {
        await handlePost(`${BASE_URL}/api/publisher/create`, {
            title: values.title,
            description: values.description,
            services: servicesValue.split(/[\/\n]/),
            type: selectValue,
            location: values.location,
            foundedAt: values.foundedAt.toISOString(),
        });
        setRefetchTrigger(true);
        toastProvider(
            'success',
            "L'éditeur a bien été créer !",
            'bottom-left',
            'light',
        );
    };
    return (
        <Row className="login-form">
            <h1 className="h1">Ajouter un Éditeur</h1>
            <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                labelCol={{ span: 1 }}
                wrapperCol={{ span: 15 }}
                className="content"
            >
                <Form.Item
                    label={'Nom'}
                    name={'title'}
                    rules={[
                        {
                            required: true,
                            message: "Nom de l'éditeur",
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
                            message: "Description de l'éditeur",
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Slate est un magazine..." />
                </Form.Item>

                <Form.Item
                    label={'Type'}
                    name={'type'}
                    rules={[
                        {
                            required: false,
                            message: "Type de l'éditeur",
                        },
                    ]}
                    dependencies={['typeSwitch', 'selectField', 'inputField']}
                >
                    <Switch
                        checked={typeSwitch}
                        checkedChildren="Existant"
                        unCheckedChildren="Nouveau"
                        onChange={() => {
                            setTypeSwitch(!typeSwitch);
                        }}
                    />
                    <br />
                    {typeSwitch ? (
                        <Select
                            placeholder="Choisir un type"
                            options={selectFieldOptions}
                            onSelect={(value) => setSelectValue(value)}
                        />
                    ) : (
                        <Input
                            placeholder="Média en ligne..."
                            onChange={(event) =>
                                setSelectValue(event?.target.value)
                            }
                        />
                    )}
                </Form.Item>
                <Form.Item
                    label={'Adresse'}
                    name={'location'}
                    rules={[
                        {
                            required: true,
                            message: "Adresse de l'éditeur",
                        },
                    ]}
                >
                    <Input
                        prefix={<PushpinOutlined />}
                        placeholder="4 Rue Lapeyrère 75018, Paris"
                    />
                </Form.Item>
                <Form.Item
                    label={'Date de création'}
                    name={'foundedAt'}
                    rules={[
                        {
                            required: false,
                            message: "Date de création de l'éditeur",
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label={"Services de l'éditeur"}
                    name={'services'}
                    rules={[
                        {
                            required: false,
                            message: "Services de l'éditeur",
                        },
                    ]}
                >
                    <Switch
                        checked={servicesSwitch}
                        checkedChildren="Mono"
                        unCheckedChildren="Multi"
                        onChange={() => {
                            setServicesSwitch(!servicesSwitch);
                        }}
                    />
                    <br />
                    {servicesSwitch ? (
                        <Input
                            placeholder="Veuillez renseigner le(s) service(s) de l'éditeur."
                            onChange={(event) =>
                                setServicesValue(event?.target.value)
                            }
                        />
                    ) : (
                        <Input.TextArea
                            placeholder="Veuillez renseigner le(s) service(s) de l'éditeur."
                            onChange={(event) =>
                                setServicesValue(event?.target.value)
                            }
                        />
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 0 }}>
                    <Button className="submit-button" htmlType="submit">
                        Envoyer
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    );
};

export default CreatePublisherForm;
