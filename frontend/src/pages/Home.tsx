import { Layout } from 'antd';
import React from 'react';
import BiographySection from '../components/landing/BiographySection';
import BooksSection from '../components/landing/BooksSection';
import ContentContainer from '../components/landing/Content';
import Footer from '../components/landing/Footer';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import CustomCarousel from '../components/ui/CustomCarousel';
const { Content } = Layout;

const Home: React.FC = () => {
    return (
        <Layout>
            <Content className="main-content">
                <Header />
                <HeroSection />
                <CustomCarousel />
                <BiographySection />
                <BooksSection />
                <ContentContainer />
            </Content>
            <Footer />
        </Layout>
    );
};

export default Home;
