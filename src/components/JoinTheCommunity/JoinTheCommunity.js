const CommunityItems = [
    {
        id: 1,
        title: "X",
        text: "Read the latest",
        image: "home/twitter-black.png",
        type: "external",
        url: "https://twitter.com/CelestiaOrg/",
    },
    {
        id: 2,
        title: "Discord",
        text: "Get involved",
        image: "home/discord-black.png",
        type: "external",
        url: "https://discord.com/invite/YsnTPcSfWQ",
    },
    {
        id: 3,
        title: "Github",
        text: "Build with us",
        image: "home/github-black.png",
        type: "external",
        url: "https://github.com/celestiaorg/",
    },
    {
        id: 4,
        title: "Telegram",
        text: "Join discussion",
        image: "home/telegram-black.png",
        type: "external",
        url: "https://t.me/CelestiaCommunity/",
    },
    {
        id: 5,
        title: "Forum",
        text: "Read Updates",
        image: "home/forum-black.png",
        type: "external",
        url: "https://forum.celestia.org/",
    },
    {
        id: 6,
        title: "Reddit",
        text: "See more",
        image: "home/reddit-black.png",
        type: "external",
        url: "https://www.reddit.com/r/CelestiaNetwork/",
    },
]

const JoinTheCommunity = () => {
    return (
        <div className={`pb-10`}>
            <h2 className={``}>Join the community</h2>
            <p>Join the Celestia community online or hang out at one of the grassroots Modular Meetups</p>
            {CommunityItems.map((item) => (
                <a key={`community-${item.id}`} className={``} href={item.url}>
                    <h3>{item.text}</h3>
                </a>
            ))}
        </div>
    )
}

export default JoinTheCommunity