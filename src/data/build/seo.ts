import type { SeoData } from "@/data/types";

const seo: SeoData = {
	title: "Get Started",
	description: "The homepage for Celestia developers. Tutorials. Resources. Community.",
	image: "/meta/og-image-default.jpg",
	type: "website",
	canonical: "https://celestia.org/get-started/",
	tags: [
		"Celestia developers",
		"blockchain development",
		"modular blockchain",
		"rollup development",
		"developer portal",
		"blockchain tutorials",
		"Web3 development",
		"smart contracts",
		"developer resources",
	],
	section: "Developer",
	modifiedTime: new Date().toISOString(),
};

export default seo;
