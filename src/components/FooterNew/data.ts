interface FooterLink {
	name: string;
	url: string;
}

interface FooterColumn {
	column: number;
	links: FooterLink[];
}

interface SocialLink {
	name: string;
	url: string;
	icon: string;
}

export const footerLinksNew: FooterColumn[] = [
  {
    column: 1,
    links: [
      { name: "Build with Us", url: "/build-with-us/" },
      { name: "Fibre Blockspace ↗", url: "https://blog.celestia.org/introducing-fibre-1tb-s-of-blockspace/" },
      { name: "Private Blockspace", url: "/private-blockspace/" },
      { name: "Applications", url: "/applications/" },
    ],
  },
  {
    column: 2,
    links: [
      { name: "Get Started", url: "/get-started/" },
      { name: "Agent Skill ↗", url: "https://docs.celestia.org/SKILL.md" },
      { name: "Docs ↗", url: "https://docs.celestia.org/" },
      { name: "Blog ↗", url: "https://blog.celestia.org/" },
    ],
  },
  {
    column: 3,
    links: [
      { name: "About Us", url: "/about/" },
      { name: "Get in Touch", url: "/contact/" },
      { name: "Open Roles ↗", url: "https://jobs.lever.co/celestia/" },
      { name: "Brand", url: "/brand/" },
    ],
  },
];

export const socialLinksNew: SocialLink[] = [
  { name: "X", url: "https://x.com/celestia", icon: "x" },
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
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/celestiaorg/",
    icon: "linkedin",
  },
];

export const legalLinksNew: FooterLink[] = [
  { name: "Privacy Policy", url: "/privacy/" },
  { name: "Terms of Service", url: "/tos/" },
];

export const footerHeadlineNew: string =
  "Scalable, custom blockchain infrastructure for the most ambitious applications.";

export default {
  footerLinksNew,
  socialLinksNew,
  legalLinksNew,
  footerHeadlineNew,
};
