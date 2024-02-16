import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>Anne Chirol</h1>
                <Paragraph>Journaliste au journal Le Monde.</Paragraph>
                {/* Add any additional content here, such as buttons */}
            </div>
        </div>
    );
};

export default HeroSection;
