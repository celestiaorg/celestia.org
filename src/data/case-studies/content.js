export const categories = {
	all: { label: "All", color: null },
	payments: { label: "Payments", color: "#8E7C6A" },
	clobs: { label: "CLOBs", color: "#4A7EA8" },
	novel: { label: "Novel", color: "#8B5CF6" },
};

export const featuredCaseStudy = {
	category: "payments",
	image: "https://blog.celestia.org/content/images/size/w2000/2026/02/onchaindb.png",
	meta: "Feb 3, 2026 · 4 min read",
	title: "OnchainDB: A Case Study in Celestia's 'Everything Markets' Vision",
	description:
		"Explore how OnchainDB leverages Celestia's blockspace to power its decentralized database infrastructure, demonstrating the potential of the 'Everything Markets' vision.",
	href: "https://blog.celestia.org/onchaindb-a-case-study-in-celestias-everything-markets-vision/",
};

export const caseStudies = [
	// Payments
	{
		category: "payments",
		image: "https://blog.celestia.org/content/images/size/w2000/2026/01/vision-2.png",
		meta: "Jan 14, 2026 · 5 min read",
		title: "Celestia Vision 2.0: every market onchain",
		description:
			"A deep dive into Celestia's expanded vision for bringing every market onchain through modular blockchain infrastructure.",
		href: "https://blog.celestia.org/celestia-vision-2-every-market-onchain/",
	},
	{
		category: "payments",
		image: "https://blog.celestia.org/content/images/size/w2000/2026/01/private-blockspace.png",
		meta: "Jan 23, 2026 · 6 min read",
		title: "Introducing Celestia Private Blockspace",
		description:
			"Learn how Celestia Private Blockspace enables confidential transactions while maintaining the security of the modular stack.",
		href: "https://blog.celestia.org/introducing-celestia-private-blockspace/",
	},
	{
		category: "payments",
		image: "https://blog.celestia.org/content/images/size/w2000/2024/09/100m-series-b.png",
		meta: "Sep 23, 2024 · 3 min read",
		title: "Celestia Foundation raises $100M to accelerate the modular ecosystem",
		description:
			"The Celestia Foundation closes a $100M fundraise to accelerate the growth and development of the modular blockchain ecosystem.",
		href: "https://blog.celestia.org/celestia-foundation-raises-100m/",
	},
	// CLOBs
	{
		category: "clobs",
		image: "https://blog.celestia.org/content/images/size/w2000/2026/01/fibre.png",
		meta: "Jan 13, 2026 · 7 min read",
		title: "Introducing Fibre: 1Tb/s of blockspace",
		description:
			"Fibre represents the next evolution of Celestia's data availability layer, delivering 1 terabit per second of blockspace throughput.",
		href: "https://blog.celestia.org/introducing-fibre-1tb-s-of-blockspace/",
	},
	{
		category: "clobs",
		image: "https://blog.celestia.org/content/images/size/w2000/2026/02/layer-2-model.png",
		meta: "Feb 5, 2026 · 8 min read",
		title: "The Best Networks Will Continue Leveraging the Layer 2 Model",
		description:
			"Why the Layer 2 model remains the most scalable and sustainable architecture for high-performance blockchain networks.",
		href: "https://blog.celestia.org/the-best-networks-will-continue-leveraging-the-layer-2-model/",
	},
	{
		category: "clobs",
		image: "https://blog.celestia.org/content/images/size/w2000/2024/09/1gb-blocks.png",
		meta: "Sep 5, 2024 · 10 min read",
		title: "1 GB blocks to Build Whatever — Roadmap",
		description:
			"Celestia's roadmap to 1 GB blocks, enabling developers to build whatever they want without worrying about blockspace constraints.",
		href: "https://blog.celestia.org/1-gb-blocks-to-build-whatever/",
	},
	// Novel
	{
		category: "novel",
		image: "https://blog.celestia.org/content/images/size/w2000/2024/11/lazybridging.png",
		meta: "Nov 21, 2024 · 6 min read",
		title: "Lazybridging: the Celestia endgame",
		description:
			"Lazybridging is the Celestia endgame — enabling trustless cross-chain interoperability without the overhead of traditional bridges.",
		href: "https://blog.celestia.org/lazybridging-the-celestia-endgame/",
	},
	{
		category: "novel",
		image: "https://blog.celestia.org/content/images/size/w2000/2025/07/lazybridging-zk.png",
		meta: "Jul 29, 2025 · 5 min read",
		title: "Lazybridging in motion: native ZK interop",
		description:
			"Lazybridging comes to life with native ZK interop, bringing zero-knowledge proofs to cross-chain communication on Celestia.",
		href: "https://blog.celestia.org/lazybridging-in-motion-native-zk-interop/",
	},
	{
		category: "novel",
		image: "https://blog.celestia.org/content/images/size/w2000/2023/10/blobstream.png",
		meta: "Oct 20, 2023 · 4 min read",
		title: "Introducing Blobstream",
		description:
			"Blobstream enables Ethereum rollups to use Celestia for data availability, streaming data blobs directly to Ethereum contracts.",
		href: "https://blog.celestia.org/introducing-blobstream/",
	},
];
