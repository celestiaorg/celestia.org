import CommunityDiscordSVG from "@/macros/SVGs/CommunityDiscordSVG";
import CommunityForumSVG from "@/macros/SVGs/CommunityForumSVG";
import CommunityGithubSVG from "@/macros/SVGs/CommunityGithubSVG";
import CommunityRedditSVG from "@/macros/SVGs/CommunityRedditSVG";
import CommunityTelegramSVG from "@/macros/SVGs/CommunityTelegramSVG";
import CommunityXSVG from "@/macros/SVGs/CommunityXSVG";

// Social Links
export const communityItems = [
	{
		id: "twitter",
		title: "X",
		description: "Read the latest",
		url: "https://twitter.com/CelestiaOrg",
		icon: <CommunityXSVG />,
		label: "Read the latest",
	},
	{
		id: "discord",
		title: "Discord",
		description: "Get involved",
		url: "https://discord.gg/celestia",
		icon: <CommunityDiscordSVG />,
		label: "Get involved",
	},
	{
		id: "reddit",
		title: "Reddit",
		description: "Ask the devs",
		url: "https://reddit.com/r/celestia",
		icon: <CommunityRedditSVG />,
		label: "Ask the devs",
	},
	{
		id: "github",
		title: "Github",
		description: "Build with us",
		url: "https://github.com/celestiaorg",
		icon: <CommunityGithubSVG />,
		label: "Build with us",
	},
	{
		id: "telegram",
		title: "Telegram",
		description: "Join discussion",
		url: "https://t.me/celestiaorg",
		icon: <CommunityTelegramSVG />,
		label: "Join discussion",
	},
	{
		id: "forum",
		title: "Forum",
		description: "Read Updates",
		url: "https://forum.celestia.org",
		icon: <CommunityForumSVG />,
		label: "Read Updates",
	},
];

// Community Carousel Event Slides
export const eventSlides = [
	{
		title: "Modular Summit 2023",
		image: "/images/app/homepage/join-the-community/community-1.jpg",
	},
	{
		title: "Modular Meetup",
		image: "/images/app/homepage/join-the-community/community-2.jpg",
	},
	{
		title: "Additional Event",
		image: "/images/app/homepage/join-the-community/community-3.jpg",
	},
];
