import { useAuth } from '../../context/AuthContext';
import Contact from '../ui/Contact';

const Footer = () => {
    const { author } = useAuth();

    return (
        <div className="footer-section">
            <Contact />
            {author?.firstName} {author?.lastName} ©{new Date().getFullYear()}{' '}
            Created by JuanR-T
        </div>
    );
};

export default Footer;
