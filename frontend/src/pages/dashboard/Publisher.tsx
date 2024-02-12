import { ReactElement, useState } from 'react';
import CreatePublisherForm from '../../components/publisher/CreatePublisher';
import GetPublisher from '../../components/publisher/GetPublisher';

import { Layout } from 'antd';

const Publisher = (): ReactElement => {
    const [refetchTrigger, setRefetchTrigger] = useState(false);

    return (
        <Layout
            style={{ minHeight: '100vh', width: '100%', alignItems: 'center' }}
        >
            <CreatePublisherForm setRefetchTrigger={setRefetchTrigger} />
            <GetPublisher refetchTrigger={refetchTrigger} />
        </Layout>
    );
};

export default Publisher;
