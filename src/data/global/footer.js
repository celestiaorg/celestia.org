import XTwitterSVG from "@/macros/SVGs/XTwitterSVG";
import DiscordSVG from "@/macros/SVGs/DiscordSVG";
import TelegramSVG from "@/macros/SVGs/TelegramSVG";
import RedditSVG from "@/macros/SVGs/RedditSVG";
import GithubSVG from "@/macros/SVGs/GithubSVG";
import ForumSVG from "@/macros/SVGs/ForumSVG";

const footerData = () => {
	const columns = [
		{
			links: [
				{
					title: "Build",
					url: "/build",
				},
				{
					title: "Docs",
					url: "https://docs.celestia.org/",
				},
				{
					title: "GitHub",
					url: "https://github.com/celestiaorg",
				},
				{
					title: "FAQ",
					url: "/faq",
				},
			],
		},
		{
			links: [
				{
					title: "Glossary",
					url: "/glossary",
				},
				{
					title: "Blog",
					url: "https://blog.celestia.org/",
				},
				{
					title: "Podcast",
					url: "https://podcast.celestia.org/",
				},
			],
		},
		{
			links: [
				{
					title: "Brand",
					url: "https://company-223625.frontify.com/d/JoSwaZS4Mjpj/guidelines?#/basics/logos",
				},
				{
					title: "Press",
					url: "/press",
				},
				{
					title: "Careers",
					url: "/careers",
				},
				{
					title: "Follow us",
					url: "/community",
				},
			],
		},
		{
			links: [
				{
					title: "X (Twitter)",
					url: "https://x.com/celestia",
					icon: XTwitterSVG
				},
				{
					title: "Discord",
					url: "https://discord.com/invite/YsnTPcSfWQ",
					icon: DiscordSVG
				},
				{
					title: "Telegram",
					url: "https://t.me/CelestiaCommunity/",
					icon: TelegramSVG
				},
				{
					title: "Reddit",
					url: "https://www.reddit.com/r/CelestiaNetwork/",
					icon: RedditSVG
				},
				{
					title: "GitHub",
					url: "https://github.com/celestiaorg/",
					icon: GithubSVG
				},
				{
					title: "Forum",
					url: "https://forum.celestia.org/",
					icon: ForumSVG
				}
			]
		}
	];

	return columns;
};

export default footerData;
