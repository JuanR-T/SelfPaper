import { ReactElement, useState } from 'react';
import GetPublications from '../../components/dashboard/publications/GetPublications';
import CreatePublication from '../../components/dashboard/publications/CreatePublications';

import { Layout } from 'antd';

const Publications = (): ReactElement => {
    const [refetchTrigger, setRefetchTrigger] = useState(false);

    return (
        <Layout
            style={{ minHeight: '100vh', width: '100%', alignItems: 'center' }}
        >
            <CreatePublication setRefetchTrigger={setRefetchTrigger} />
            <GetPublications refetchTrigger={refetchTrigger} />
        </Layout>
    );
};

export default Publications;
