import { ANALYTICS_EVENTS } from "@/constants/analytics";

export const frameworks = [
	{
		title: "ABC Stack",
		categories: ["Sovereign"],
		description: "The first Gigagas stack for EVM Sovereign Rollups.",
		image: "/images/app/build/ABC.png",
		url: "https://www.abundance.xyz/",
		trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_ABC_STACK,
	},
	{
		title: "Arbitrum Orbit",
		categories: ["Ethereum"],
		description: "Arbitrum Orbit is the ideal way to permissionlessly launch your own custom chain.",
		image: "/images/app/build/arbitrum.png",
		url: "https://docs.celestia.org/developers/arbitrum-integration",
		trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_ARB_ORBIT,
	},
	{
		title: "Dymension",
		categories: [],
		description: "Dymension is a home for easily deployable and lightning fast app-chains, called RollApps.",
		image: "/images/app/build/dymension.png",
		url: "https://dymension.xyz/",
		trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_DYMENSION,
	},
	{
		title: "OP Stack",
		categories: ["Ethereum"],
		description: "The OP Stack is a modular, open-source blueprint for highly scalable, highly interoperable blockchains of all kinds.",
		image: "/images/app/build/opstack.png",
		url: "https://stack.optimism.io/",
		trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_OP_STACK,
	},
	{
		title: "Rollkit",
		categories: ["Sovereign"],
		description: "Rollkit is a rollup framework that gives developers the freedom to deploy rollups throughout the modular stack.",
		image: "/images/app/build/rollkit.png",
		url: "https://rollkit.dev/",
		trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_ROLLKIT,
	},
	{
		title: "Sovereign SDK",
		categories: ["Sovereign"],
		description: "A framework for building seamlessly scalable and interoperable rollups that can run on any blockchain.",
		image: "/images/app/build/sovereign.png",
		url: "https://www.sovereign.xyz/",
		trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_SOV_SDK,
	},
];
