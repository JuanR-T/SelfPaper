const ContentContainer = () => {
    return (
        <div className="content-container">
            <h1>Mes podcasts</h1>
            <div className="content-annex"></div>
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
        </div>
    );
};

export default ContentContainer;
