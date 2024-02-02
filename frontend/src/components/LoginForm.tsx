import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocalStorage } from '../lib/useLocalStorage';

const LoginForm: React.FC = () => {
    const { logIn, author } = useAuth();
    const navigate = useNavigate();
    const {getItem} = useLocalStorage();

    useEffect(() => {
        if (author && getItem("token")) {
            navigate('/dashboard');
            toast.info('Tu es déjà connecté !', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    }, []);

    if (author && getItem("token")) {
        return null;
    }
    
    const onFinish = async (values: any) => {
        if (!logIn) return null;
        logIn(values.email, values.password);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={8}>
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    className="rounded-form" // Add a class for rounded borders
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="E.g: Donkey@kong.com"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
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
                            {' '}
                            {/* Add a class for button styling */}
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default LoginForm;
