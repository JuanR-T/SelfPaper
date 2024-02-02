import { Layout, Menu } from 'antd';
import {
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
const { Sider, Content } = Layout;

const Dashboard = () => {
    const { author } = useAuth();
    console.log("author it is",author);
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
                            Bienvenue {author?.firstName + " " + author?.lastName}
                        </h1>
                    ) : (
                        'Welcome to the dashboard'
                    )}
                    {/* Your dashboard content goes here */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;