function Footer() {
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };
    const current_year = new Date().getFullYear()

    return (
        <div className="footer">
            <p className="footer-copy-right">&copy;{current_year} JotH: PlayMaker &nbsp;</p>
            <img
                title="https://discord.gg/hVfTNEZG9p"
                onClick={() => openInNewTab("https://discord.gg/hVfTNEZG9p")}
                cursor
                className="social-icon pointer"
                src="https://i.imgur.com/TVbM9Jg.png"
                alt="discord">
            </img>

            <img
                title="https://www.instagram.com/jothplaymaker/"
                onClick={() => openInNewTab("https://www.instagram.com/jothplaymaker/")}
                className="social-icon pointer"
                src="https://i.imgur.com/WstHvlw.png"
                alt="instagram">
            </img>

            <img
                title="hhttps://www.twitch.tv/playmakersccg"
                onClick={() => openInNewTab("https://www.twitch.tv/playmakersccg")}
                className="social-icon pointer"
                src="https://i.imgur.com/QJUUtwL.png"
                alt="twitch">
            </img>

            <img
                title="https://www.youtube.com/channel/UCGyH2iJdgKFnm2vEdoZ88Og?ref=jothplaymaker.com"
                onClick={() => openInNewTab("https://www.youtube.com/channel/UCGyH2iJdgKFnm2vEdoZ88Og?ref=jothplaymaker.com")}
                className="social-icon pointer"
                src="https://i.imgur.com/Qk0npzS.png"
                alt="youtube">
            </img>
        </div>
    );
}

export default Footer;
