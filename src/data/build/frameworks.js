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
    description:
      "Arbitrum Orbit is the ideal way to permissionlessly launch your own custom chain.",
    image: "/images/app/build/arbitrum.png",
    url: "https://docs.celestia.org/how-to-guides/arbitrum-integration",
    trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_ARB_ORBIT,
  },
  {
    title: "Dymension",
    categories: [],
    description:
      "Dymension is a home for easily deployable and lightning fast app-chains, called RollApps.",
    image: "/images/app/build/dymension.png",
    url: "https://dymension.xyz/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_DYMENSION,
  },
  {
    title: "OP Stack",
    categories: ["Ethereum"],
    description:
      "The OP Stack is a modular, open-source blueprint for highly scalable, highly interoperable blockchains of all kinds.",
    image: "/images/app/build/opstack.png",
    url: "https://stack.optimism.io/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_OP_STACK,
  },
  {
    title: "Evolve",
    categories: ["Sovereign"],
    description:
      "Evolve is the fastest way to launch a high-performance L1 with Celestia underneath.",
    image: "/images/app/build/evolve.png",
    url: "https://ev.xyz/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_ROLLKIT,
  },
  {
    title: "Sovereign SDK",
    categories: ["Sovereign"],
    description:
      "A framework for building seamlessly scalable and interoperable rollups that can run on any blockchain.",
    image: "/images/app/build/sovereign.png",
    url: "https://www.sovereign.xyz/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_SOV_SDK,
  },
];
