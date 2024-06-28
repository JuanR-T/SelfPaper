import React from 'react';
import { Layout } from 'antd';
import HeroSection from '../components/landing/HeroSection';
const { Content } = Layout;
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import ContentContainer from '../components/landing/Content';
import CustomCarousel from '../components/landing/CarouselSection';
import AnimatedBanner from '../components/landing/AnimatedBanner';

const Home: React.FC = () => {
    return (
        <Layout>
            <Content className="main-content">
                <Header />
                <HeroSection />
                <AnimatedBanner />
                <ContentContainer />
                <ContentContainer />
            </Content>
            <Footer />
        </Layout>
    );
};

export default Home;