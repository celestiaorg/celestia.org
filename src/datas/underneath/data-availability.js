export const dataAvailability = {
	title: "Removing the DA bottleneck",
	text: `
    <p>Data availability (DA) has been a core scaling bottleneck for crypto applications. So far, rollups have tried to avoid the DA bottleneck by recruiting a committee or centralized server for DA.</p>
    <p>Now, Celestia provides high data throughput that is verifiable for any user through a light node. This is possible because of data availability sampling. As the light node network grows, Celestia can scale to the data throughput needed for millions of rollups without compromising end-user security.</p>
    `,
	image: {
		src: "underneath/celestia-underneath-da-image.png",
		alt: "From monolithic to modular",
	},
	button: {
		class: "simple",
		type: "external",
		text: "Start light node",
		url: "/run-a-light-node/",
	},
};
