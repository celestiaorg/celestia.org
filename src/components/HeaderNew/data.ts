// Navigation structure ported from the Celestia prototype: four dropdowns
// (Products, Solutions, Learn, Company) + a "Get in Touch" CTA. External links
// (docs/blog/jobs) automatically get a ↗ glyph via isInternalLink in the nav
// renderers, so labels here stay clean.

export interface NavSubItem {
	name: string;
	url: string;
}

export interface NavDropdownItem {
	name: string;
	type: "dropdown";
	items: NavSubItem[];
	url?: never;
}

export interface NavLinkItem {
	name: string;
	type: "link";
	url: string;
	items?: never;
}

export type NavMenuItem = NavDropdownItem | NavLinkItem;

const MenuDataNew: NavMenuItem[] = [
	{
		name: "Products",
		type: "dropdown",
		items: [
			{
				// Canonical short label (index's "Fibre Blockspace" was the lone outlier).
				name: "Fibre",
				url: "https://blog.celestia.org/introducing-fibre-1tb-s-of-blockspace/",
			},
			{
				name: "Private Blockspace",
				url: "/private-blockspace/",
			},
		],
	},
	{
		name: "Solutions",
		type: "dropdown",
		items: [
			{
				name: "Dedicated Blockchain Development",
				url: "/build-with-us/",
			},
		],
	},
	{
		name: "Learn",
		type: "dropdown",
		items: [
			{
				name: "Applications",
				url: "/applications/",
			},
			{
				name: "Get Started",
				url: "/get-started/",
			},
			{
				name: "Agent Skill",
				url: "https://docs.celestia.org/SKILL.md",
			},
			{
				name: "Docs",
				url: "https://docs.celestia.org/",
			},
			{
				name: "Blog",
				url: "https://blog.celestia.org/",
			},
		],
	},
	{
		name: "Company",
		type: "dropdown",
		items: [
			{
				name: "About Us",
				url: "/about/",
			},
			{
				name: "Open Roles",
				url: "https://jobs.lever.co/celestia/",
			},
		],
	},
	{
		name: "Get in Touch",
		type: "link",
		url: "/contact/",
	},
];

export default MenuDataNew;
