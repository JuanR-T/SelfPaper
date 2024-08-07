import { Layout, Menu } from 'antd';
import {
    BookOutlined,
    FormOutlined,
    ContainerOutlined,
    UserOutlined,
    HomeOutlined,
    AuditOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
const { Sider, Content } = Layout;
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const { author } = useAuth();
    if (!author) {
        navigate('/login');
    }
    const tabSwitch = (key: React.Key) => {
        key ? navigate('/dashboard/' + key) : navigate('/');
    };
    return (
        <Layout style={{ minHeight: '100vh', minWidth: '100%' }}>
            <Sider width={200} theme="light">
                <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
                    <Menu.Item
                        key="publications"
                        icon={<FormOutlined />}
                        onClick={() => tabSwitch('publications')}
                    >
                        Publications
                    </Menu.Item>
                    <Menu.Item
                        key="books"
                        icon={<BookOutlined />}
                        onClick={() => tabSwitch('books')}
                    >
                        Books
                    </Menu.Item>
                    <Menu.Item
                        key="publisher"
                        icon={<AuditOutlined />}
                        onClick={() => tabSwitch('publisher')}
                    >
                        Éditeurs
                    </Menu.Item>
                    <Menu.Item
                        key="themes"
                        icon={<ContainerOutlined />}
                        onClick={() => tabSwitch('themes')}
                    >
                        Themes
                    </Menu.Item>
                    <Menu.Item
                        key="account"
                        icon={<UserOutlined />}
                        onClick={() => tabSwitch('account')}
                    >
                        Compte
                    </Menu.Item>
                    <Menu.Item
                        key="application"
                        icon={<HomeOutlined />}
                        onClick={() => tabSwitch('')}
                    >
                        Application
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ padding: '20px' }}>
                    {author ? (
                        <h1>
                            Bienvenue{' '}
                            {author?.firstName + ' ' + author?.lastName}
                        </h1>
                    ) : (
                        'Welcome to the dashboard'
                    )}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
