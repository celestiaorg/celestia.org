export const heroData = {
	title: "Celestia underneath",
	subtitle: "Build whatever",
	description: `
	<p>Celestia is a modular blockchain built to securely scale any ecosystem.</p>
	<h3>Modular</h3>
	<p>Celestia’s modular design easily plugs into any rollup framework or chain to provide permissionless, high-throughput data availability. With Celestia underneath, deploy an Ethereum L2 in 1-click or transform nearly any VM into your own sovereign blockchain.</p>
	<h3>Secure</h3>
	<p>Celestia provides high data throughput that is verifiable for any user through a light node. Light nodes allow anyone to directly verify data availability and interact with Celestia without centralized gateways or RPC providers.</p>
	<h3>Scale</h3>
	<p>With low-cost DA and abundant throughput, you have a blank canvas to build whatever with Celestia underneath.</p>
	`,
	image: {
		src: "underneath/celestia-underneath-hero.png",
		alt: "Celestia Underneath Hero",
	},
	cards: [
		{
			title: "Ethereum L2",
			text: "Use leading rollup frameworks to deploy an Ethereum L2.",
			button: {
				class: "external",
				type: "external",
				text: "Simply deploy",
				url: "/build?framework_category=Ethereum#build",
			},
		},
		{
			title: "Sovereign rollup",
			text: "Deploy your own customizable sovereign chain.",
			button: {
				class: "external",
				type: "external",
				text: "Build whatever",
				url: "/build/?framework_category=Sovereign#build",
			},
		},
	],
};
