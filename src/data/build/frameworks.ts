import { ANALYTICS_EVENTS } from "@/constants/analytics";

export const frameworks = [
  {
    title: "ABC Stack",
    categories: ["Ethereum"],
    description:
      "Build a blockchain with EVM smart contracts and guaranteed interop with all Cosmos rollups.",
    image: "/images/app/build/logo-abc-stack.png",
    url: "https://abundance.xyz/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_ABC_STACK,
  },
  {
    title: "Arbitrum Orbit",
    categories: ["Ethereum"],
    description:
      "Deploy a rollup to the Arbitrum ecosystem with customizable chain parameters.",
    image: "/images/app/build/logo-arbitrum-orbit.png",
    url: "https://docs.celestia.org/how-to-guides/arbitrum-integration",
    trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_ARB_ORBIT,
  },
  {
    title: "Dymension",
    categories: ["Sovereign"],
    description:
      "A platform for spinup deployments and lightweight full-sync chains, called RollApps.",
    image: "/images/app/build/logo-dymension.png",
    url: "https://dymension.xyz/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_DYMENSION,
  },
  {
    title: "Evolve",
    categories: ["Ethereum"],
    description:
      "The fastest way to launch a high performance chain — production ready in under 4 hours.",
    image: "/images/app/build/logo-evolve.png",
    url: "https://ev.xyz/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_ROLLKIT,
  },
  {
    title: "OP Stack",
    categories: ["Ethereum"],
    description:
      "A modular, open-source framework designed for rapidly scalable and highly adaptable blockchains.",
    image: "/images/app/build/logo-op-stack.png",
    url: "https://stack.optimism.io/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_OP_STACK,
  },
  {
    title: "Sovereign SDK",
    categories: ["Sovereign"],
    description:
      "Build sovereign rollups that run on any blockchain using a unified development interface.",
    image: "/images/app/build/logo-sovereign-sdk.png",
    url: "https://www.sovereign.xyz/",
    trackEvent: ANALYTICS_EVENTS.PORTAL_FRAMEWORK_SOV_SDK,
  },
];
