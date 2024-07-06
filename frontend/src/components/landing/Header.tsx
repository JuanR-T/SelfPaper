import { useState, useEffect } from 'react';
import Contact from '../ui/Contact';
import Nav from '../ui/Nav';
import BurgerMenu from '../ui/BurgerMenu';

const Header = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile ? (
        <BurgerMenu isMobile={isMobile} />
    ) : (
        <div className="header">
            <Nav isMobile={isMobile} />
            <Contact isMobile={isMobile} />
        </div>
    );
};

export default Header;
