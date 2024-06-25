import React from 'react';
import { Layout } from 'antd';
import HeroSection from '../components/landing/HeroSection';
import CardBoard from '../components/landing/CardBoard';
const { Content } = Layout;
import Header from '../components/landing/Header';
import Footer from '../components/common/Footer';
import ContentContainer from '../components/common/Content';
import CustomCarousel from '../components/common/CarouselSection';
import Viewpager from '../components/common/ViewPager';
const Home: React.FC = () => {
    return (
        <Layout>
            <Content className="main-content">
                <Header />
                <HeroSection />
                <CustomCarousel />
                <Viewpager />
                <ContentContainer />
            </Content>
            <Footer />
        </Layout>
    );
};

export default Home;
