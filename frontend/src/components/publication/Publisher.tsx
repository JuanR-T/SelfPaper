import React, { useRef, useState } from 'react';
import type { InputRef } from 'antd';
import BookOutlined, {PushpinOutlined, CalendarOutlined} from '@ant-design/icons';
import { handlePost } from '../../api/handleCall';
import {Input, Switch, Form, Select, Col, Row, DatePicker, Button } from 'antd';

const PublisherForm: React.FC = () => {
    const inputRef = useRef<InputRef>(null);
    const [input, setInput] = useState(true);
    const sharedProps = {
        style: { width: '100%' },
        placeholder: "Veuillez renseigner le(s) service(s) de l'éditeur.",
        ref: inputRef,
    };
    const selectFieldOptions = [
        {
            value: "journal",
            label: "Journal"
        },
        {
            value: "publisher",
            label: "Editeur"
        },
        {
            value: "podcast",
            label: "Podcast"
        },
        {
            value: "magazine",
            label: "Magazine"
        }
    ];
    const onSubmit = async(values: any) => {
        handlePost(`${process.env.VITE_BASE_URL}`, (
            values.title,
            values.description,
            values.type,
            values.location,
            values.foundedAt,
            values.services
        ))
    }

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={15}>
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onSubmit}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    className="rounded-form"
                >
                    <Form.Item
                        label={"Nom"}
                        name={"title"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: "Nom de l'éditeur",
                                },
                            ]
                        }
                    >
                        <Input
                            prefix={<BookOutlined/>}
                            placeholder='Slate...'
                        />
                    </Form.Item>
                    <Form.Item
                        label={"Description"}
                        name={"description"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: "Description de l'éditeur",
                                },
                            ]
                        }
                    >
                        <Input.TextArea
                            placeholder='Slate est un magazine...'
                        />
                    </Form.Item>

                    <Form.Item
                        label={"Type"}
                        name={"type"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: "Type de l'éditeur",
                                },
                            ]
                        }
                    >
                        <Select 
                            defaultValue={selectFieldOptions[0]} 
                            options={selectFieldOptions} 
                        />
                        <Input 
                            placeholder="Média en ligne..." 
                        />
                    </Form.Item>
                    <Form.Item
                        label={"Adresse"}
                        name={"location"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: "Adresse de l'éditeur",
                                },
                            ]
                        }
                    >
                        <Input
                            prefix={<PushpinOutlined/>}
                            placeholder="4 Rue Lapeyrère 75018, Paris" 
                        />
                    </Form.Item>
                    <Form.Item
                        label={"Date de création"}
                        name={"foundedAt"}
                        rules={
                            [
                                {
                                    required: false,
                                    message: "Date de création de l'éditeur",
                                },
                            ]
                        }
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label={"Services de l'éditeur"}
                        name={"services"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: "Services de l'éditeur",
                                },
                            ]
                        }
                    >
                        <Switch
                            checked={input}
                            checkedChildren="Mono"
                            unCheckedChildren="Multi"
                            onChange={() => {
                                setInput(!input);
                            }}
                        />
                        <br/> 
                        {input ? (
                            <Input {...sharedProps} />
                        ) : (
                            <Input.TextArea {...sharedProps} />
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 14, span: 10 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="submit-button"
                        >
                            Envoyer
                        </Button>
                </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default PublisherForm;