import { Layout } from 'antd';
import GetBooks from '../../components/dashboard/books/GetBooks';

const Books = () => {
    return (
        <Layout
            style={{ minHeight: '100vh', width: '100%', alignItems: 'center' }}
        >
            <GetBooks />
        </Layout>
    );
};

export default Books;
