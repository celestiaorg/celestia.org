// Sitemap generator for Celestia.org
// Self-hosted Next.js 14 compatible

export default function sitemap() {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://celestia.org";

	return [
		// Homepage
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},

		// Main pages
		{
			url: `${baseUrl}/what-is-celestia/`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/what-is-da/`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/what-is-tia/`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/ecosystem/`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/community/`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/run-a-light-node/`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/build/`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/careers/`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/press/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/past-events/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},

		// Learn section - main page
		{
			url: `${baseUrl}/learn/`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},

		// Learn - Beginners
		{
			url: `${baseUrl}/learn/beginners/modular-blockchains-for-beginners/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/learn/beginners/modular-blockchains-and-first-principles/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/learn/beginners/modular-blockchains-are-user-first/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/learn/beginners/the-modular-stack/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},

		// Learn - Intermediates
		{
			url: `${baseUrl}/learn/intermediates/modular-and-monolithic-blockchains/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/learn/intermediates/benefits-of-modular-blockchains/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/learn/intermediates/the-modular-stack/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/learn/intermediates/settlement-in-the-modular-stack/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/learn/intermediates/sovereign-rollups-an-introduction/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/learn/intermediates/sovereign-rollups-misconceptions/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/learn/intermediates/the-differences-of-modular-software/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},

		// Glossary
		{
			url: `${baseUrl}/glossary/`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},

		// Legal pages
		{
			url: `${baseUrl}/privacy/`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/tos/`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];
}
