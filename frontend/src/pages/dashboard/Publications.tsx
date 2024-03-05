import { ReactElement, useState } from 'react';
import GetPublications from '../../components/dashboard/publications/GetPublications';

import { Layout } from 'antd';

const Publications = (): ReactElement => {
    return (
        <Layout
            style={{ minHeight: '100vh', width: '100%', alignItems: 'center' }}
        >
            <GetPublications />
        </Layout>
    );
};

export default Publications;
