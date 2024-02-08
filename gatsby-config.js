module.exports = {
	siteMetadata: {
		title: `The first modular blockchain network`,
		description: `Celestia is a modular consensus and data network, built to enable anyone to easily deploy their own blockchain with minimal overhead.`,
		author: `@CelestiaOrg`,
		siteUrl: `https://celestia.org`,
		// siteUrl: `https://dev.lazyledger.org`, // <-- switch to this url for OG meta previews on https://dev.lazyledger.org
		image: `/celestia-default-og-image.jpg`,
	},

	plugins: [
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sitemap",
		"gatsby-plugin-gatsby-cloud",
		"gatsby-plugin-image",
		"gatsby-plugin-sass",
		"gatsby-plugin-client-side-redirect",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: `./src/images/favicons/favicon-96x96.png`, // This path is relative to the root of the site.
				theme_color: `#fff`,
				icons: [
					{
						src: `/images/favicons/android-icon-192x192.png`,
						sizes: `192x192`,
						type: `image/png`,
					},
				],
			},
		},
		{
			resolve: "gatsby-plugin-anchor-links",
			options: {
				offset: -100,
			},
		},
		{
			resolve: `gatsby-plugin-plausible`,
			options: {
				domain: `celestia.org`,
				// https://github.com/pixelplicity/gatsby-plugin-plausible/issues/49#issuecomment-716125674
				customDomain: `plausible.celestia.org/js/plausible.js?original=`,
			},
		},
		"gatsby-plugin-mdx",
		{
			resolve: `gatsby-plugin-sharp`,
			options: {
				defaults: {
					formats: [`auto`, `webp`],
					quality: 100,
					backgroundColor: `transparent`,
					placeholder: `none`,
				},
			},
		},
		{
			resolve: `gatsby-transformer-sharp`,
			options: {
				// The option defaults to true
				checkSupportedExtensions: false,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: "./src/pages/",
			},
			__key: "pages",
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `markdown-pages`,
				path: `${__dirname}/src/pages/markdown-pages`,
			},
		},
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-robots-txt",
			options: {
				host: "https://celestia.org",
				// host: "https://dev.lazyledger.org",
				sitemap: "https://celestia.org/sitemap.xml",
				// sitemap: "https://dev.lazyledger.org/sitemap.xml",
				output: "/robots.txt",
				policy: [{ userAgent: "*", allow: "/" }],
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 1200,
							withWebp: true,
							showCaptions: true,
							quality: 100,
						},
					},
					{
						resolve: "gatsby-source-lever",
						options: {
							// Your Lever site instance name.
							site: "celestia",
							// Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
							// It can help you debug specific API Endpoints problems
							verboseOutput: true,
						},
					},
					{
						resolve: `gatsby-remark-autolink-headers`,
						options: {
							removeAccents: true,
							isIconAfterHeader: true,
							enableCustomId: true,
							offsetY: `100`,
						},
					},
				],
			},
		},
		{
			resolve: "gatsby-plugin-mailchimp",
			options: {
				endpoint: "https://celestia.us6.list-manage.com/subscribe/post?u=cde2461ba84f5279fff352829&amp;id=bb230bef69", // string; add your MC list endpoint here; see instructions below
				timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
			},
		},
	],
};
