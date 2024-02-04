import { Layout, Menu } from 'antd';
import {
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
const { Sider, Content } = Layout;
import { useNavigate } from 'react-router-dom';
import PublisherForm from '../components/publication/Publisher';

const Dashboard = () => {
    const navigate = useNavigate();
    const { author } = useAuth();
    if (!author) {
        navigate('/login');
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={80} theme="dark">
                <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<PieChartOutlined />} />
                    <Menu.Item key="2" icon={<DesktopOutlined />} />
                    <Menu.Item key="3" icon={<ContainerOutlined />} />
                    <Menu.Item key="4" icon={<AppstoreOutlined />} />
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
                    <PublisherForm/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;