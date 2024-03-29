import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import HeroSection from '../components/landing/HeroSection';
import CardBoard from '../components/landing/CardBoard';
import { useAuth } from '../context/AuthContext';
const { Content } = Layout;
import Header from '../components/landing/Header';
import Footer from '../components/common/Footer';
import ContentContainer from '../components/common/Content';

const Home: React.FC = () => {
    return (
        <Layout>
            <Header />
            <Content>
                <HeroSection />
                <CardBoard />
                <ContentContainer />
            </Content>
            <Footer />
        </Layout>
    );
};

export default Home;
