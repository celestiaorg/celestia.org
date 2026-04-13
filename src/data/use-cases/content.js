// Tab definitions
export const tabs = [
	{ id: "agentic", label: "Agentic Use Cases", color: "#4A7EA8" },
	{ id: "exchanges", label: "Exchanges", color: "#8E7C6A" },
	{ id: "novel", label: "Experimental", color: "#8B5CF6" },
];

// Hero section
export const hero = {
	heading: "Built for the blockspace demand of the agentic internet.",
	cta: { label: "Explore Agentic Use Cases", href: "#agentic-use-cases" },
	bottomText: {
		primary: "Every API call paid, every order settled, every market verifiable. 1 Tb/s of blockspace to meet that demand.",
	},
};

// Content panels per tab
export const panels = {
	agentic: {
		headline: "Every HTTP request will be an onchain transaction.",
		lead: [
			{ text: '51% of web traffic is already bots. AI crawlers hit sites 10,000× more than humans and generate zero ad revenue. Content creators, API providers, and inference platforms need a new model: charge per request, settle instantly, no accounts required.' },
			{ text: 'Coinbase and Cloudflare built ', link: { text: 'x402', url: 'https://www.x402.org/' }, textAfter: ' for exactly this — a protocol that attaches a payment to every HTTP request. Google launched A2A. Stripe and OpenAI launched ACP. ', accent: 'The protocol layer is forming. The question is what settles 500 billion paid requests per day.' },
		],
		// Row 1 = full-width 3-col card, Row 2 = side-by-side cards
		row1: {
			number: "01",
			title: "The scale of what's coming",
			body: [
				'A single AI research task can trigger 70 web crawls, 15 inference calls, and 4 database queries — each one a micropayment. Multiply across 1.3B AI agents projected by 2028 (Microsoft) and 500B+ daily paid requests within 3–5 years, and you\'re looking at ~5.8M TPS sustained as a <em>baseline</em>.',
				'For context: the highest-throughput blockchains today process low thousands of TPS. Credit card minimums ($0.10–$0.30/tx) and T+2 settlement make traditional rails structurally incompatible with micropayments.',
			],
			accentBody: 'This is a new category of demand with no existing infrastructure to serve it.',
			link: {
				type: "twitter",
				url: "https://x.com/gnovak_/status/2029739185133998307",
				author: "Graham Novak @gnovak_",
				quote: '"Cloudflare CEO @eastdakota said they\'re contemplating if they need to build an L1 because they need more throughput. They\'re expecting to need to do a billion micro-transactions per second in the next 5-10 years"',
				domain: "x.com",
			},
			href: "https://x.com/gnovak_/status/2029739185133998307",
		},
		row2: [
			{
				number: "02",
				title: "Why no one else can handle it",
				body: [
					'Tier 1 agentic payments (human prompts agent, agent pays once) work on existing chains. Tier 2 (recurring, budget-bound) stretches them. Tier 3 — continuous autonomous micropayments where every API call, crawl, and inference request triggers a settlement — breaks them.',
					'Agent swarms run continuously. They don\'t spike and retreat like DeFi trading. The chain needs to treat millions of TPS as baseline load, not a burst it can tolerate for a few minutes.',
				],
				accentBody: 'Celestia Fibre delivers 1 Tb/s of throughput: 250M to 1.25B TPS at micropayment sizes (100–500 bytes). No other chain is in the same order of magnitude.',
			},
			{
				number: "03",
				title: "What you capture by building here",
				body: [
					'At scale, fee economics become the business model. At 100M TPS and $0.0001 per transaction, annual fee revenue reaches ~$3.15B. On a shared chain, that revenue flows to someone else\'s validator set. On a sovereign chain on Celestia, you run your own sequencer and keep 100% of it.',
				],
				accentBody: 'Integration is POST and GET. No inherited execution environment, no opinionated consensus, no blockchain engineers required. Your chain, your architecture, your revenue.',
			},
		],
	},
	exchanges: {
		headline: "Onchain exchanges that trade like centralised exchanges",
		lead: [
			{ text: 'Onchain exchanges processed $8T in perpetual futures volume in 2025 — a 12x increase in two years. The DEX/CEX ratio climbed from 2% to 12% across 14 consecutive months of growth. ', accent: 'The market is moving onchain. The question is what infrastructure it moves onto.' },
			{ text: 'The current leader caps at ~200ms latency and spent $311M last year maintaining its own validator set. ', accent: 'Celestia-powered exchanges like Bullet already benchmark sub-millisecond order placement, with blockspace bandwidth to support 20,000+ orders per second per exchange — and scaling to millions with Fibre.' },
		],
		row1: {
			number: "01",
			title: "CEX-grade latency, verifiable",
			body: [
				'Bullet, a perps DEX on Celestia, benchmarks 750μs order placement for perpetuals and 500μs for spot, with 20,000+ orders per second.',
				'That\'s sub-millisecond soft confirmations at the sequencer-level, with every transaction posted to Celestia for independent verification.',
			],
			link: {
				type: "youtube",
				url: "https://www.youtube.com/watch?v=OhV7hoQJuTE&t=1227s",
				author: "Lightspeed Podcast",
				quote: 'Building the Next-Gen Perps Engine on Solana | Tristan Frizza',
				domain: "youtube.com",
			},
			href: "https://www.youtube.com/watch?v=OhV7hoQJuTE&t=1227s",
		},
		row2: [
			{
				number: "02",
				title: "Full DA unlocks products CEXs can't offer",
				body: [
					'When every order, cancel, and fill is published onchain, high-frequency trading behaviour becomes a programmable surface.',
				],
				list: [
					'resting orders earning yield',
					'AMMs layered on top of CLOBs',
					'trustless basis trades',
					'verifiable liquidation strategies',
					'institutional compliance accounts',
				],
			},
			{
				number: "03",
				title: "Scale without congestion",
				body: [
					'Market makers demand up to 40 TPS per trading pair just for quoting. A 50-pair exchange needs 1,000+ TPS for MMs alone.',
					'Add retail flow, liquidations, and funding rate settlements and you\'re consuming megabytes per second of blockspace, per market.',
				],
				accentBody: 'This level of throughput demand can only be met by Celestia.',
			},
			{
				number: "04",
				title: "Beyond crypto perps",
				body: [
					'Onchain CLOBs today trade crypto perpetuals thanks to the structural advantages: 24/7 markets, instant settlement, programmable margin, global access without intermediaries.',
					'These advantages apply equally to equities, FX, and commodities.',
				],
				accentBody: "Celestia's Fibre throughput is built for that scale.",
			},
		],
		// exchanges uses 3-col row2
		row2Cols: 3,
	},
	novel: {
		headline: "Data availability is infrastructure for more than blockchains.",
		lead: [
			{ text: 'Celestia was built to make data publicly available and verifiable at scale. While blockchains are the obvious use case, they\'re not the only one. ', accent: 'Any system that needs to broadcast, order, or verify large volumes of data without trusting a central party can use Celestia as its backbone.' },
			{ text: 'So far, one emerging architecture shows what this looks like in practice:' },
		],
		row1: {
			number: "01",
			title: "DA as a broadcast layer",
			body: [
				'Every chain today builds its own P2P gossip network to propagate messages (intents, transactions, state updates) to participants. It\'s redundant infrastructure.',
				'Midnight, a privacy-focused ZK chain, replaced it entirely: they publish intents to a namespace on Celestia and let anyone subscribe to the namespace.',
			],
			accentBody: 'Instead of building bespoke gossip infrastructure, any protocol can use Celestia as a shared, verifiable broadcast channel.',
			link: {
				type: "website",
				url: "https://midnight.network/",
				author: "midnight.network",
				quote: 'Midnight — Bringing rational privacy to blockchain. A privacy-enhancing blockchain using zero-knowledge proofs.',
				domain: "midnight.network",
			},
			href: "https://midnight.network/",
		},
		row2: [],
	},
};

// WhyCelestia section per tab
export const whyCelestia = {
	agentic: {
		title: "Why Celestia for agentic use cases?",
		points: [
			{ bold: "Throughput.", description: "1 Tb/s via Fibre — 250M to 1.25B TPS at micropayment sizes. The only infrastructure in the throughput class this economy demands." },
			{ bold: "Fee capture.", description: "Sovereign chains on Celestia keep 100% of sequencer revenue. At 100M TPS and $0.0001/tx, that's ~$3.15B/year in fee revenue that stays with you." },
			{ bold: "Lean operation.", description: "POST/GET API. Single sequencer. Build the chain your product needs, nothing more." },
		],
		ctas: {
			primary: { label: "Read the research", href: "/build/" },
			outline: { label: "Talk to us", href: "/contact/" },
		},
	},
	exchanges: {
		title: "Why Celestia for exchanges?",
		points: [
			{ bold: "No blockspace throughput bottlenecks.", description: "Solana's blockspace caps exchanges at 7,800 orders/second. Celestia can handle 20,000, with Fibre blockspace pushing that number into the billions. Your exchange will never have to compete with others for blockspace." },
			{ bold: "100% of trading fees stay with you.", description: "Hyperliquid spent $311M in token issuance in 2025 just to maintain its validator set. A sovereign chain on Celestia eliminates that overhead entirely — you get the same architectural control, and every dollar of trading fee revenue stays with you." },
			{ bold: "Lean sequencer, full verifiability.", description: "By outsourcing blockspace to Celestia, you can run a single sequencer for maximum speed." },
			{ bold: "Programmable onchain finance.", description: "Posting full orderbook data unlocks institutional features: verifiable execution quality, insurable liquidations, composable structured products." },
			{ bold: "Trade privately, with integrity.", description: "Celestia Private Blockspace keeps balances, positions, and order flow encrypted while regulators and counterparties verify integrity without seeing the data." },
		],
		ctas: {
			primary: { label: "Read the Bullet case study", href: "/case-studies/" },
			outline: { label: "Build with us", href: "/contact/" },
		},
	},
	novel: {
		title: "Why Celestia?",
		points: [
			{ bold: "Verifiable broadcast at 1 Tb/s.", description: "Any system that needs censorship-resistant, publicly verifiable data propagation can use Celestia instead of building its own network from scratch." },
		],
		ctas: {
			primary: { label: "Read more about what's possible with Fibre", href: "/build/" },
			outline: { label: "Build with us", href: "/contact/" },
		},
	},
};
