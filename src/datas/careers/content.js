import perkAnimation1 from "../../images/illustrations/career-1/data.json";
import perkAnimation2 from "../../images/illustrations/career-2/data.json";
import perkAnimation3 from "../../images/illustrations/career-3/data.json";
import perkAnimation4 from "../../images/illustrations/career-4/data.json";

export const content = {
	title: "Careers",
	subtitle:
		"We’re on a mission to change the way that blockchains and decentralized applications are built—making them more secure, sovereign and scalable.",
	text: "Join our team of leading engineers, researchers and entrepreneurs in pioneering the first modular blockchain design.",
	button: {
		text: "Current openings",
		url: "https://jobs.lever.co/celestia/",
	},
	perks: {
		title: "Perks",
		perks: [
			{
				title: "Employment benefits",
				image: "careers/careers-1.svg",
				animation: perkAnimation1,
			},
			{
				title: "4 weeks annual vacation",
				image: "careers/careers-2.svg",
				animation: perkAnimation2,
			},
			{
				title: "Meaningful long-term compensation package",
				image: "careers/careers-3.svg",
				animation: perkAnimation3,
			},
			{
				title: "Flexible and remote work environment",
				image: "careers/careers-4.svg",
				animation: perkAnimation4,
			},
		],
	},
};

export const FooterBoxes = [
	{
		title: "Join our growing ecosystem",
		text: "View job openings and career opportunities in our ecosystem.",
		button: {
			text: "Current openings",
			href: "https://celestia.pallet.com/jobs",
			id: "career",
			type: "simple",
		},
	},
	{
		title: "Build on testnet",
		text: "Join a growing modular ecosystem of developers building on testnet.",
		button: {
			text: "Get started",
			href: "https://docs.celestia.org/",
			id: "operator",
			type: "simple",
		},
	},
];
