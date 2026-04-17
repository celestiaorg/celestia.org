import { ANALYTICS_EVENTS } from "@/constants/analytics";

export const rollups = [
  {
    title: "AltLayer",
    categories: ["Arbitrum Orbit", "OP Stack"],
    description:
      "Network setup supporting Arbitrum Orbit, OP Stack, and Polygon with built-in FSS.",
    image: "/images/app/build/logo-altlayer.png",
    url: "https://altlayer.io/raas/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_ALTLAYER,
  },
  {
    title: "Caldera",
    categories: ["Arbitrum Orbit", "OP Stack"],
    description:
      "Easy to deploy performant and customizable Arbitrum Orbit and OP Stack rollups. Fully managed.",
    image: "/images/app/build/logo-caldera.png",
    url: "https://www.caldera.xyz/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_CALDERA,
  },
  {
    title: "Conduit",
    categories: ["Arbitrum Orbit", "OP Stack"],
    description:
      "Rollup infrastructure with no code required. Fully managed, production-grade OP Stack and Arbitrum Orbit.",
    image: "/images/app/build/logo-conduit.png",
    url: "https://conduit.xyz/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_CONDUIT,
  },
  {
    title: "Gateway",
    categories: ["OP Stack"],
    description:
      "Start your rollup with all the dev tooling you need, ready out of the box.",
    image: "/images/app/build/logo-gateway.png",
    url: "https://gateway.fm/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_GATEWAY,
  },
  {
    title: "Gelato",
    categories: ["OP Stack"],
    description:
      "Ethereum Rollup-as-a-Service Platform — production-ready L2s without the infrastructure overhead.",
    image: "/images/app/build/logo-gelato.png",
    url: "https://www.gelato.network/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_GELATO,
  },
  {
    title: "Snapchain",
    categories: ["OP Stack", "Polygon CDK"],
    description:
      "Scale your onchain game or DeFi app with real-time transactions and no compromises.",
    image: "/images/app/build/logo-snapchain.png",
    url: "https://snapchain.dev/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_SNAPCHAIN,
  },
  {
    title: "Zeeve",
    categories: ["Arbitrum Orbit", "Polygon CDK"],
    description:
      "Enterprise-grade Rollup-as-a-Service with production infrastructure for serious teams.",
    image: "/images/app/build/logo-zeeve.png",
    url: "https://www.zeeve.io/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_RAAS_ZEEVE,
  },
];
