import {
    LinkedinOutlined,
    SpotifyOutlined,
    TwitterOutlined,
    MailOutlined,
    InstagramOutlined,
} from '@ant-design/icons';
import clsx from 'clsx';

const Contact = ({
    isMobile
}: {
    isMobile: boolean
}) => {
    return (
        <div className={clsx("contact-section", isMobile ? "mobile" : "")}>
            <div className="socials">
                <a target="blank" href="https://www.instagram.com/annechirol/">
                    <InstagramOutlined /> {clsx(isMobile ? 'Instagram' : '')}
                </a>
                <a
                    target="blank"
                    href="https://open.spotify.com/show/7pppnKjXuYgYhJZAwhHXNE?si=7b8a5fe6c1734bcb"
                >
                    <SpotifyOutlined /> {clsx(isMobile ? 'Spotify' : '')}
                </a>
                <a target="blank" href="https://twitter.com/AnneChirol16">
                    <TwitterOutlined /> {clsx(isMobile ? 'X (Twitter)' : '')}
                </a>
                <a target="blank" href="mailto:anne.chirol@yahoo.fr">
                    <MailOutlined /> {clsx(isMobile ? 'Mail' : '')}
                </a>
                <a
                    target="blank"
                    href="https://www.linkedin.com/in/anne-chirol-b0463810a/?originalSubdomain=fr"
                >
                    <LinkedinOutlined /> {clsx(isMobile ? 'LinkedIn' : '')}
                </a>
            </div>
        </div>
    );
};

export default Contact;
