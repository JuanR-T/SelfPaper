import React from 'react';
import { Layout } from 'antd';
import HeroSection from '../components/landing/HeroSection';
import CardBoard from '../components/landing/CardBoard';
const { Content } = Layout;
import Header from '../components/landing/Header';
import Footer from '../components/common/Footer';
import ContentContainer from '../components/common/Content';

const Home: React.FC = () => {
    return (
        <Layout>
            <Content className="main-content">
                <Header />
                <HeroSection />
                <CardBoard />
                <ContentContainer />
            </Content>
            <Footer />
        </Layout>
    );
};

export default Home;
