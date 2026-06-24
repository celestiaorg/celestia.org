const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
	// `*.dev.{js,jsx,ts,tsx}` page files are only recognized as routes in
	// development. In production builds the extension isn't registered, so any
	// `page.dev.js` is ignored entirely and never built (e.g. /dev site map).
	pageExtensions:
		process.env.NODE_ENV === "development"
			? ["dev.js", "dev.jsx", "dev.ts", "dev.tsx", "js", "jsx", "ts", "tsx"]
			: ["js", "jsx", "ts", "tsx"],
	images: { unoptimized: true },
	trailingSlash: true,
	async redirects() {
		return redirects;
	},
	async headers() {
		return [
			{
				// Video files — aggressive caching (1 year, immutable)
				source: "/videos/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				// Images — aggressive caching (1 year, immutable)
				source: "/images/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				// Font files — aggressive caching (1 year, immutable)
				source: "/fonts/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
	webpack: (config, { dev, isServer }) => {
		// Enable WebAssembly
		config.experiments = {
			asyncWebAssembly: true,
			layers: true,
			topLevelAwait: true,
		};

		// Handle WASM files
		if (isServer) {
			config.output.webassemblyModuleFilename = "chunks/[modulehash].wasm";
		} else {
			config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
		}

		// Copy WASM files to the correct location
		const destinations = [
			"static/wasm/[name][ext]",
			"server/static/wasm/[name][ext]",
			"server/chunks/[name][ext]",
			".next/static/wasm/[name][ext]",
			".next/server/static/wasm/[name][ext]",
			".next/server/chunks/[name][ext]",
		];

		config.plugins.push(
			new CopyPlugin({
				patterns: destinations.map((dest) => ({
					from: "node_modules/lumina-node/**/*.wasm",
					to: dest,
					noErrorOnMissing: true,
				})),
			})
		);

		return config;
	},
};

const redirects = [
	{
		// "Build with Us" enterprise page lives at /build-with-us. Redirect the
		// old /build URL (former developer portal, also briefly this page) to it.
		source: "/build",
		destination: "/build-with-us",
		permanent: true,
	},
	{
		// Route renamed: /use-cases → /applications. Keep old inbound links
		// (bookmarks, external refs, #agentic-use-cases anchors) working.
		source: "/use-cases",
		destination: "/applications",
		permanent: true,
	},
	{
		source: "/learn/first-principles/modular-blockchains-and-first-principles/",
		destination: "/learn/beginners/modular-blockchains-and-first-principles/",
		permanent: true,
	},
	{
		source: "/learn/values-of-modular-blockchains/modular-blockchains-are-user-first/",
		destination: "/learn/beginners/modular-blockchains-are-user-first/",
		permanent: true,
	},
	{
		source: "/learn/basics-of-modular-blockchains/modular-and-monolithic-blockchains/",
		destination: "/learn/intermediates/modular-and-monolithic-blockchains/",
		permanent: true,
	},
	{
		source: "/learn/basics-of-modular-blockchains/benefits-of-modular-blockchains/",
		destination: "/learn/intermediates/benefits-of-modular-blockchains/",
		permanent: true,
	},
	{
		source: "/learn/modular-architectures/the-modular-stack/",
		destination: "/learn/intermediates/the-modular-stack/",
		permanent: true,
	},
	{
		source: "/learn/modular-software/the-differences-of-modular-software/",
		destination: "/learn/intermediates/the-differences-of-modular-software/",
		permanent: true,
	},
	{
		source: "/learn/sovereign-rollups/an-introduction/",
		destination: "/learn/intermediates/sovereign-rollups-an-introduction/",
		permanent: true,
	},
	{
		source: "/learn/sovereign-rollups/misconceptions/",
		destination: "/learn/intermediates/sovereign-rollups-misconceptions/",
		permanent: true,
	},
	{
		source: "/learn/modular-settlement-layers/settlement-in-the-modular-stack/",
		destination: "/learn/intermediates/settlement-in-the-modular-stack/",
		permanent: true,
	},
];

module.exports = nextConfig;
