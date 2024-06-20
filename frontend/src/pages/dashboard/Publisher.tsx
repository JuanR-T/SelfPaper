import { ReactElement, useState } from 'react';
import GetPublisher from '../../components/dashboard/publisher/GetPublisher';

import { Layout } from 'antd';

const Publisher = (): ReactElement => {
    const [refetchTrigger, setRefetchTrigger] = useState(false);

    return (
        <Layout
            style={{ minHeight: '100vh', width: '100%', alignItems: 'center' }}
        >
            <GetPublisher
                setRefetchTrigger={setRefetchTrigger}
                refetchTrigger={refetchTrigger}
            />
        </Layout>
    );
};

export default Publisher;
