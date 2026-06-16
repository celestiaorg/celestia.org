export const categories = {
	all: { label: "All" },
	payments: { label: "Payments" },
	clobs: { label: "CLOBs" },
	novel: { label: "Experimental" },
};

// Prototype .cs-cat accents — colored dot + label per category
export const catColors = {
	payments: { dot: "#3B7BA9", text: "#3B7BA9" }, // --steel-blue
	clobs: { dot: "#7C68F2", text: "#7C68F2" }, // --amethyst
	novel: { dot: "#A99C92", text: "#6C5E55" }, // --sandstone / --sandstone-text
};

export const featuredCaseStudy = {
	category: "payments",
	tag: "Payments",
	image: "https://blog.celestia.org/content/images/size/w2000/2026/02/onchaindb.png",
	date: "2026.02.03",
	meta: "Feb 3, 2026 · 4 min read",
	title: "OnchainDB: A case study in Celestia's \"Everything Markets\" vision",
	href: "https://blog.celestia.org/onchaindb-a-case-study-in-celestias-everything-markets-vision/",
};

export const caseStudies = [
	// Payments
	{
		category: "payments",
		image: "https://blog.celestia.org/content/images/2026/01/Celestia-vision-2.0-1.png",
		date: "2026.01.14",
		title: "Celestia Vision 2.0: Every market onchain",
		href: "https://blog.celestia.org/celestia-vision-2-0-every-market-onchain/",
	},
	{
		category: "payments",
		image: "https://blog.celestia.org/content/images/2026/01/Private-Blockspace.png",
		date: "2026.01.23",
		title: "Introducing Celestia private blockspace",
		href: "https://blog.celestia.org/introducing-celestia-private-blockspace-confidential-onchain-finance/",
	},
	{
		category: "payments",
		image: "https://blog.celestia.org/content/images/2024/09/raise-banner-final.png",
		date: "2024.09.23",
		title: "Celestia Foundation raises $100M to accelerate the modular ecosystem",
		href: "https://blog.celestia.org/celestia-foundation-raise/",
	},
	// CLOBs
	{
		category: "clobs",
		image: "https://blog.celestia.org/content/images/2026/01/Fibre-blockspace-1.png",
		date: "2026.01.13",
		title: "Introducing Fibre: 1Tb/s of blockspace",
		href: "https://blog.celestia.org/introducing-fibre-1tb-s-of-blockspace/",
	},
	{
		category: "clobs",
		image: "https://blog.celestia.org/content/images/2026/02/The-Best-Networks-Will-Continue-Leveraging-the-Layer-2-Model.png",
		date: "2026.02.05",
		title: "The best networks will continue leveraging the layer 2 model",
		href: "https://blog.celestia.org/the-best-networks-will-continue-leveraging-the-layer-2-model/",
	},
	{
		category: "clobs",
		image: "https://blog.celestia.org/content/images/2024/09/Celestia_Roadmap_07.jpg",
		date: "2024.09.05",
		title: "1 GB blocks to build whatever — Roadmap",
		href: "https://blog.celestia.org/roadmap/",
	},
	// Novel / Experimental
	{
		category: "novel",
		image: "https://blog.celestia.org/content/images/2024/11/Celestia_Lazybridging5.jpg",
		date: "2024.11.21",
		title: "Lazybridging: The Celestia endgame",
		href: "https://blog.celestia.org/lazybridging/",
	},
	{
		category: "novel",
		image: "https://blog.celestia.org/content/images/2025/07/Frame-1321314600.png",
		date: "2025.07.29",
		title: "Lazybridging in motion: Native ZK interop",
		href: "https://blog.celestia.org/lazybridging-demo/",
	},
	{
		category: "novel",
		image: "https://blog.celestia.org/content/images/2023/10/Celestia_Blobstream2--1-.jpg",
		date: "2023.10.20",
		title: "Introducing Blobstream: Celestia DA attestations to Ethereum",
		href: "https://blog.celestia.org/introducing-blobstream/",
	},
];
