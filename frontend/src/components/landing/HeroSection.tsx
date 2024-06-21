import { Typography } from 'antd';
import photoAnne from '../../assets/photo_anne.jpg';
import { useEffect, useState } from 'react';

//const { Title, Paragraph } = Typography;

const HeroSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100); // Add a slight delay to trigger the animation
    }, []);

    return (
        <div className={`hero-section ${isLoaded ? 'loaded' : ''}`}>
            <div className="hero-content">
                <h1>Anne Chirol</h1>
                <div className="hero-biography">
                    <p>Journaliste au journal Le Monde.</p>
                    <p>
                        Anne Chirol est une journaliste pigiste pour divers
                        services du journal Le Monde, elle est connue notamment
                        pour sa chronique hebdomadaire "Toi meme", dans laquelle
                        elle dépeint des archétypes sociaux issues d'internet...
                    </p>
                    <button className="read-more-button">En savoir plus</button>
                </div>
            </div>
            <div className="hero-image"></div>
        </div>
    );
};
//this goes in hero-image is needed in the end <img src={photoAnne} alt="Anne Chirol" className="journalist-portrait" />

export default HeroSection;
