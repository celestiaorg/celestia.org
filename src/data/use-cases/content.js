// Tab definitions
export const tabs = [
  { id: "agentic", label: "Agentic Payments", color: "#4A7EA8" },
  { id: "exchanges", label: "Exchanges", color: "#A89480" },
  { id: "novel", label: "Experimental", color: "#A88DE6" },
];

// Hero section
export const hero = {
  heading: "Every API call paid, every order processed, every market verifiable.",
  cta: { label: "Explore Agentic Payments", href: "#agentic-use-cases" },
  bottomText: {
    primary: "1 Tb/s of blockspace\nto meet that demand.",
  },
};

// Content panels per tab
export const panels = {
  agentic: {
    headline: "Every HTTP request will be an onchain transaction.",
    lead: [
      { text: "AI crawlers hit sites 10,000× more than humans and generate zero ad revenue. Content creators, API providers, and inference platforms need a new model: charge per request, settle instantly, no accounts required." },
      { text: "The onchain protocol layer is forming:" },
    ],
    leadList: [
      { text: 'Coinbase and Cloudflare built ', link: { text: 'x402', url: 'https://www.x402.org/' }, textAfter: ': a protocol that attaches a payment to every HTTP request' },
      { text: 'Tempo and Stripe launched the Machine Payments Protocol (MPP): a specification for agents and services to coordinate payments programmatically' },
    ],
    leadFooter: { text: 'The question is: ', accent: 'what infrastructure can actually process hundreds of billions of paid requests per day?' },
    row1: {
      number: "01",
      title: "The scale of what's coming",
      body: [
        "A single AI research task can trigger 70+ web crawls, inference calls, and database queries — each one a micropayment. Scale that to a projected 1.3B agents (Microsoft, 2028) and you get 500B+ daily paid requests, or ~5.8M sustained TPS.",
      ],
      accentBody: "Today's fastest chains do low thousands.",
      quote: {
        text: 'Cloudflare CEO said they\'re contemplating building an L1 because they need more throughput — expecting',
        highlight: '1B microtransactions per second',
        textAfter: ' in the next 5-10 years.',
        author: 'Graham Novak',
        handle: '@gnovak_',
        url: 'https://x.com/gnovak_/status/2029739185133998307',
      },
    },
    row2: [
      {
        number: "02",
        title: "Why no one else can handle it",
        body: [
          "Existing chains handle simple agent-pays-once flows.",
          "Continuous autonomous micropayments (where every API call, crawl, and inference triggers a settlement) break them. AI agents need millions of TPS as baseline load.",
        ],
        accentBody: "Celestia Fibre delivers 250M to 1.25B TPS at micropayment sizes.",
      },
      {
        number: "03",
        title: "The risk of not building on Celestia",
        body: [
          "On a shared chain, not only do your transaction fees subsidise someone else's validator set, but even your roadmap depends on their priorities.",
          "When you choose Celestia, you own the chain's architecture, the sequencer, and 100% of fee revenue. Your only cost is the blockspace you actually use.",
        ],
        linkNote: { text: "Read more about the benefits of outsourcing blockspace to a DA layer →", url: "#" },
      },
    ],
  },
  exchanges: {
    headline: "Onchain exchanges that trade like centralised exchanges",
    lead: [
      { text: "Onchain exchanges processed $8T in perpetual futures volume in 2025, a 12x increase in two years, and the DEX/CEX ratio climbed from 2% to 12% across 14 consecutive months. The market is moving onchain." },
      { text: 'The current leading onchain exchange caps at ~200ms latency and spent $311M last year maintaining its validator set. ', accent: 'Bullet, built on Celestia, benchmarks sub-millisecond order placement and 20,000+ orders per second, scaling to millions with Fibre.' },
    ],
    row1: {
      number: "01",
      title: "The market is outgrowing its infrastructure",
      body: [
        "$8T in onchain perpetual futures volume in 2025, 12x in two years, DEX/CEX ratio up from 2% to 12%. But current onchain infra caps out:",
      ],
      list: [
        "~200ms latency ceilings",
        "Market makers needing 1,000+ TPS just to quote 50 pairs",
        "$311M/year to maintain a validator set",
      ],
      accentBody: "Bullet, built on Celestia, benchmarks sub-millisecond order placement and 20,000+ orders per second, scaling to millions with Fibre.",
      latency: true,
      youtubeLink: {
        url: "https://www.youtube.com/watch?v=OhV7hoQJuTE&t=1227s",
        author: "Lightspeed Podcast",
        quote: "Building the Next-Gen Perps Engine on Solana | Tristan Frizza",
        domain: "youtube.com",
      },
    },
    row2: [
      {
        number: "02",
        title: "Full orderbook data availability changes what's possible",
        body: [
          "Publishing every order, cancel, and fill onchain (not just state diffs) creates a programmable surface CEXs can't replicate: resting orders earning yield, composable structured products, verifiable liquidations, institutional compliance.",
          "Layer on Celestia Private Blockspace for encrypted state with public proofs, and you can serve counterparties who need confidentiality with auditability.",
        ],
      },
      {
        number: "03",
        title: "Beyond crypto perpetuals",
        body: [
          "24/7 markets, programmable margin, global access — these apply to equities, FX, commodities. As exchanges expand into traditional assets, throughput requirements multiply by orders of magnitude.",
        ],
        accentBody: "Fibre handles that.",
      },
    ],
  },
  novel: {
    headline: "Data availability is infrastructure for more than blockchains.",
    lead: [
      { text: "Celestia was built to make data publicly available and verifiable at scale. While blockchains are the obvious use case, they're not the only one. ", accent: "Any system that needs to broadcast, order, or verify large volumes of data without trusting a central party can use Celestia as its backbone." },
      { text: "So far, one emerging architecture shows what this looks like in practice:" },
    ],
    row1: {
      number: "01",
      title: "DA as a broadcast layer",
      body: [
        "Every chain today builds its own P2P gossip network to propagate messages (intents, transactions, state updates) to participants. It's redundant infrastructure.",
        "Midnight, a privacy-focused ZK chain, replaced it entirely: they publish intents to a namespace on Celestia and let anyone subscribe to the namespace.",
      ],
      accentBody: "Instead of building bespoke gossip infrastructure, any protocol can use Celestia as a shared, verifiable broadcast channel.",
      link: {
        type: "website",
        url: "https://midnight.network/",
        author: "midnight.network",
        quote: "Midnight — Bringing rational privacy to blockchain. A privacy-enhancing blockchain using zero-knowledge proofs.",
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
    title: "Why Celestia for agentic payments?",
    points: [
      { bold: "Throughput.", description: "1 Tb/s via Fibre — 250M to 1.25B TPS at micropayment sizes. The only infrastructure in the throughput class this economy demands." },
      { bold: "Fee capture.", description: "Sovereign chains on Celestia keep 100% of sequencer revenue. At 100M TPS and $0.0001/tx, that's ~$3.15B/year in fee revenue that stays with you." },
      { bold: "Sub-millisecond settlement.", description: "Sovereign chains on Celestia can achieve sequencer-level confirmations in under a millisecond. Agent micropayments settle at HTTP speed, so the payment never becomes the bottleneck." },
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
      { bold: "Programmable onchain finance.", description: "Posting full orderbook data unlocks institutional features: verifiable execution quality, insurable liquidations, composable structured products." },
    ],
    ctas: {
      primary: { label: "Read the research", href: "/build/" },
      outline: { label: "Talk to us", href: "/contact/" },
    },
  },
  novel: {
    title: "Why Celestia?",
    points: [
      { bold: "Verifiable broadcast at 1 Tb/s.", description: "Any system that needs censorship-resistant, publicly verifiable data propagation can use Celestia instead of building its own network from scratch." },
    ],
    ctas: {
      primary: { label: "Read the research", href: "/build/" },
      outline: { label: "Talk to us", href: "/contact/" },
    },
  },
};
