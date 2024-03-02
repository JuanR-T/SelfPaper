import { ReactElement, useState } from 'react';
import GetPublications from '../../components/dashboard/publications/GetPublications';

import { Layout } from 'antd';

const Publications = (): ReactElement => {
    const [refetchTrigger, setRefetchTrigger] = useState(false);

    return (
        <Layout
            style={{ minHeight: '100vh', width: '100%', alignItems: 'center' }}
        >
            <GetPublications
                setRefetchTrigger={setRefetchTrigger}
                refetchTrigger={refetchTrigger}
            />
        </Layout>
    );
};

export default Publications;
