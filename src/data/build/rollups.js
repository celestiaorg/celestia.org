import { ANALYTICS_EVENTS } from "@/constants/analytics";

export const rollups = [
  {
    title: "AltLayer",
    categories: ["Arbitrum ORBIT", "OP Stack", "Polygon CDK"],
    description:
      "We offer a versatile rollup stack including Arbitrum Orbit, OP stack, Polygon zkEVM and StarkWare.",
    image: "/images/app/build/altlayer.png",
    url: "https://altlayer.io/raas/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_ALTLAYER,
  },
  {
    title: "Caldera",
    categories: ["Arbitrum ORBIT", "OP Stack"],
    description:
      "Caldera makes it easy to launch performant, customizable Arbitrum Orbit and OP Stack rollups. No code required.",
    image: "/images/app/build/caldera.png",
    url: "https://www.caldera.xyz/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_CALDERA,
  },
  {
    title: "Conduit",
    categories: ["Arbitrum ORBIT", "OP Stack"],
    description:
      "Deploy a rollup in a few clicks, no code required. Fully-managed, production grade OP Stack and Arbitrum Orbit rollups on Ethereum.",
    image: "/images/app/build/conduit.png",
    url: "https://conduit.xyz/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_CONDUIT,
  },
  {
    title: "Gateway",
    categories: ["Polygon CDK"],
    description: "Create your own zkEVM with all the infrastructure you need.",
    image: "/images/app/build/gateway.png",
    url: "https://gateway.fm/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_GATEWAY,
  },
  {
    title: "Gelato",
    categories: ["Arbitrum ORBIT", "OP Stack", "Polygon CDK"],
    description:
      "The all-in-one Ethereum Rollup as a Service Platform. Deploy production-grade & fully-serviced L2 rollups natively integrated with tools like oracles, bridges, data indexers and Account Abstraction.",
    image: "/images/app/build/gelato.png",
    url: "https://www.gelato.network/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_GELATO,
  },
  {
    title: "Snapchain",
    categories: ["Polygon CDK"],
    description:
      "Leverage the power of ZK Rollups to scale your on-chain game or DeFi app cheaply and securely, without compromise.",
    image: "/images/app/build/snapchain.png",
    url: "https://snapchain.dev/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_SNAPCHAIN,
  },
  {
    title: "Zeeve",
    categories: ["Arbitrum ORBIT", "OP Stack", "Polygon CDK"],
    description:
      "Build, Customize, and Launch your production-grade Rollups with Zeeve’s Rollups as a Service (RaaS).",
    image: "/images/app/build/zeeve.png",
    url: "https://www.zeeve.io/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_ZEEVE,
  },
];
