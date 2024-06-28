import {
    LinkedinOutlined,
    FacebookOutlined,
    SpotifyOutlined,
    TwitterOutlined,
    MailOutlined,
    InstagramOutlined,
} from '@ant-design/icons';

const Contact = () => {
    return (
        <div className="contact-section">
            <div className="socials">
                <a target="blank" href="https://www.instagram.com/annechirol/">
                    <InstagramOutlined />
                </a>
                <a
                    target="blank"
                    href="https://open.spotify.com/show/7pppnKjXuYgYhJZAwhHXNE?si=7b8a5fe6c1734bcb"
                >
                    <SpotifyOutlined />
                </a>
                <a target="blank" href="https://twitter.com/AnneChirol16">
                    <TwitterOutlined />
                </a>
                <a target="blank" href="mailto:anne.chirol@yahoo.fr">
                    <MailOutlined />
                </a>
                <a
                    target="blank"
                    href="https://www.linkedin.com/in/anne-chirol-b0463810a/?originalSubdomain=fr"
                >
                    <LinkedinOutlined />
                </a>
            </div>
        </div>
    );
};

export default Contact;
