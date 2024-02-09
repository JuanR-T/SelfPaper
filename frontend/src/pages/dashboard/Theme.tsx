import { Layout } from 'antd';
import { useState } from 'react';
import GetThemes from '../../components/themes/GetThemes';

const Themes = () => {
    const [refetchTrigger, setRefetchTrigger] = useState(false);

    return (
        <Layout
            style={{ minHeight: '100vh', width: '100%', alignItems: 'center' }}
        >
            <GetThemes refetchTrigger={refetchTrigger} />
        </Layout>
    );
};

export default Themes;
