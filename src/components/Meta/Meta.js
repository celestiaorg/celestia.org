const meta = (seo = {}) => {
	// Default SEO values
	const defaultSeo = {
		title: "Celestia",
		description: "Celestia is the modular blockchain powering unstoppable applications with full-stack control.",
		image: "/meta/og-image-default.jpg",
		type: "website",
		publishedTime: null,
		modifiedTime: null,
		author: "Celestia Labs",
		tags: ["blockchain", "modular blockchain", "data availability", "rollups", "Web3"],
		section: null,
		twitterHandle: "@celestia",
	};

	// Merge with provided SEO data
	const {
		title,
		description,
		image,
		type = defaultSeo.type,
		publishedTime,
		modifiedTime,
		author = defaultSeo.author,
		tags = defaultSeo.tags,
		section,
		twitterHandle = defaultSeo.twitterHandle,
		canonical,
		noindex = false,
	} = { ...defaultSeo, ...seo };

	// Build final values
	const metaTitle = title ? `${title} | ${defaultSeo.title}` : defaultSeo.title;
	const metaDescription = description || defaultSeo.description;
	const metaImage = image || defaultSeo.image;
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://celestia.org";
	const fullImageUrl = metaImage.startsWith("http") ? metaImage : `${baseUrl}${metaImage}`;

	// Generate structured data for Organization/WebSite
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${baseUrl}/#organization`,
				name: "Celestia",
				url: baseUrl,
				logo: {
					"@type": "ImageObject",
					url: `${baseUrl}/images/celestia-logo.svg`,
					width: 200,
					height: 200,
				},
				description: defaultSeo.description,
				sameAs: [
					"https://x.com/celestia",
					"https://discord.com/invite/YsnTPcSfWQ",
					"https://github.com/celestiaorg",
					"https://blog.celestia.org/",
					"https://forum.celestia.org/",
				],
			},
			{
				"@type": "WebSite",
				"@id": `${baseUrl}/#website`,
				url: baseUrl,
				name: "Celestia",
				description: defaultSeo.description,
				publisher: {
					"@id": `${baseUrl}/#organization`,
				},
				inLanguage: "en-US",
			},
		],
	};

	// Add Article schema if it's an article/blog post
	if (type === "article" && (publishedTime || modifiedTime)) {
		structuredData["@graph"].push({
			"@type": "Article",
			headline: metaTitle,
			description: metaDescription,
			image: fullImageUrl,
			author: {
				"@type": "Organization",
				name: author,
			},
			publisher: {
				"@id": `${baseUrl}/#organization`,
			},
			datePublished: publishedTime,
			dateModified: modifiedTime || publishedTime,
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": canonical || baseUrl,
			},
			articleSection: section,
			keywords: tags,
		});
	}

	return {
		title: metaTitle,
		description: metaDescription,
		keywords: tags.join(", "),
		authors: [{ name: author }],
		creator: author,
		publisher: author,
		robots: noindex ? "noindex, nofollow" : "index, follow",

		// Canonical URL
		...(canonical && { alternates: { canonical } }),

		// OpenGraph
		openGraph: {
			title: metaTitle,
			description: metaDescription,
			url: canonical || baseUrl,
			siteName: "Celestia",
			images: [
				{
					url: fullImageUrl,
					width: 1200,
					height: 630,
					alt: metaTitle,
					type: "image/jpeg",
				},
			],
			locale: "en_US",
			type: type,
			...(publishedTime && { publishedTime }),
			...(modifiedTime && { modifiedTime }),
			...(section && { section }),
			...(tags.length > 0 && { tags }),
		},

		// Twitter Card
		twitter: {
			card: "summary_large_image",
			title: metaTitle,
			description: metaDescription,
			site: twitterHandle,
			creator: twitterHandle,
			images: [fullImageUrl],
		},

		// Additional meta tags
		other: {
			// Structured Data
			"application/ld+json": JSON.stringify(structuredData),

			// Additional SEO tags
			"theme-color": "#F6F6F6",
			"msapplication-TileColor": "#F6F6F6",
			"apple-mobile-web-app-capable": "yes",
			"apple-mobile-web-app-status-bar-style": "default",
			"format-detection": "telephone=no",
		},

		// Verification tags (add your verification codes)
		verification: {
			// google: 'your-google-verification-code',
			// yandex: 'your-yandex-verification-code',
			// bing: 'your-bing-verification-code',
		},
	};
};

export default meta;
