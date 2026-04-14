export const footerLinksNew = [
  {
    column: 1,
    links: [
      { name: "Use Cases", url: "/build/" },
      { name: "Build", url: "/build/" },
      { name: "Docs", url: "https://docs.celestia.org/" },
      { name: "GitHub", url: "https://github.com/celestiaorg" },
    ],
  },
  {
    column: 2,
    links: [
      { name: "Case Studies", url: "/glossary/" },
      { name: "Blog", url: "https://blog.celestia.org/" },
      { name: "Podcast", url: "https://podcast.celestia.org/" },
    ],
  },
  {
    column: 3,
    links: [
      {
        name: "Brand",
        url: "https://company-223625.frontify.com/d/JoSwaZS4Mjpj/guidelines#/basics/logos",
      },
      { name: "Press", url: "/press/" },
      { name: "Careers", url: "/careers/" },
      { name: "Community", url: "/community/" },
    ],
  },
];

export const socialLinksNew = [
  { name: "X", url: "https://twitter.com/celestia", icon: "x" },
  {
    name: "Discord",
    url: "https://discord.com/invite/YsnTPcSfWQ",
    icon: "discord",
  },
  { name: "Telegram", url: "https://t.me/CelestiaCommunity", icon: "telegram" },
  {
    name: "Reddit",
    url: "https://www.reddit.com/r/CelestiaNetwork/",
    icon: "reddit",
  },
  { name: "GitHub", url: "https://github.com/celestiaorg", icon: "github" },
];

export const legalLinksNew = [
  { name: "Privacy Policy", url: "/privacy/" },
  { name: "Terms of Service", url: "/tos/" },
];

export const footerHeadlineNew = (
  <>
    Lean, elastic infrastructure for the most ambitious networks.
    <span style={{ display: "block", marginTop: "10px" }}>Revenue belongs to you.</span>
  </>
);

export default {
  footerLinksNew,
  socialLinksNew,
  legalLinksNew,
  footerHeadlineNew,
};
