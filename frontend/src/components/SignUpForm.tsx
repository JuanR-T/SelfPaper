import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    LockOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../lib/useLocalStorage';
import toastProvider from '../lib/toastProvider';

const SignUpForm: React.FC = () => {
    const navigate = useNavigate();
    const { signUp, author } = useAuth();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        if (author && getItem("token")) {
            navigate('/dashboard');
            toastProvider("info", "Tu es déjà connecté !", "top-center", "light");
        }
    }, []);

    if (author && getItem("token")) {
        return null;
    }

    //TODO check if it's ok to make a middleware of lines 19 - 37.

    const onFinish = async (values: any) => {
        if (!signUp) return;
        signUp(
            values.firstName,
            values.lastName,
            values.email,
            values.phoneNumber,
            values.password,
        );
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={8}>
                <Form
                    name="signup-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    className="rounded-form"
                >
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Ex: Buzz"
                        />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Ex: Lightyear"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please enter a valid email address!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Ex: Woody@cowboy.fr"
                        />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined />}
                            placeholder="Ex: 06.24.90.86.00"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="*****"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="submit-button"
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default SignUpForm;

