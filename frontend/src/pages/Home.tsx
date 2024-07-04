import React from 'react';
import { Layout } from 'antd';
import HeroSection from '../components/landing/HeroSection';
const { Content } = Layout;
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import ContentContainer from '../components/landing/Content';
import BiographySection from '../components/landing/BiographySection';
import PublicationsParallax from '../components/landing/PublicationsParallax';
import CustomCarousel from '../components/ui/CustomCarousel';

const Home: React.FC = () => {
    return (
        <Layout>
            <Content className="main-content">
                <Header />
                <HeroSection />
                <CustomCarousel />
                <BiographySection />
                <PublicationsParallax />
                <ContentContainer />
            </Content>
            <Footer />
        </Layout>
    );
};

export default Home;
