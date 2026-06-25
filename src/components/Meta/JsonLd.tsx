import { getSiteUrl } from "@/utils/siteUrl";

// Site-wide structured data (Organization + WebSite), rendered as a valid
// <script type="application/ld+json"> element. Previously this was emitted via
// Next's `metadata.other` field, which produced an invalid
// <meta name="application/ld+json"> tag that search engines ignore. Rendering an
// actual script tag is the only format Google/Schema parsers read.
const JsonLd = () => {
	const baseUrl = getSiteUrl();

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
				description:
					"Celestia is the modular blockchain powering unstoppable applications with full-stack control.",
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
				description:
					"Celestia is the modular blockchain powering unstoppable applications with full-stack control.",
				publisher: {
					"@id": `${baseUrl}/#organization`,
				},
				inLanguage: "en-US",
			},
		],
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
};

export default JsonLd;
