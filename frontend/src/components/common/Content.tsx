const ContentContainer = () => {
    return (
        <div className="content-container">
            <div className="content-description">
                <iframe
                    style={{ borderRadius: '12px' }}
                    src="https://open.spotify.com/embed/show/7pppnKjXuYgYhJZAwhHXNE?utm_source=generator&theme=0"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            </div>
            <div className="content-annex"></div>
        </div>
    );
};

export default ContentContainer;
