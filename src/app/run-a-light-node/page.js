const heroData = {
  title: "Directly verify",
  text: "Join the network or integrate the Celestia light node.",
  buttons: [
    {
      text: "Run a node",
      class: "simple",
      type: "anchor",
      url: "start-up-a-node",
    },
    {
      text: "Integrate",
      class: "white",
      type: "anchor",
      url: "integrate",
    },
  ],
};

const joinTheNetwork = {
  title: "Join the network",
  items: [
    {
      id: 1,
      title: "Beginner",
      text: "Deploy a light node in two commands with Vimana’s on-demand hardware.",
      type: "external",
      image: "run-a-node/beginner-image.png",
      link: {
        text: "Deploy on Vimana",
        url: "https://docs.vistara.dev/guides/getting-started",
      },
    },
    {
      id: 2,
      title: "Intermediate",
      text: "Power up a light node in under 3 minutes with Docker.",
      type: "external",
      image: "run-a-node/intermediate-image.png",
      link: {
        text: "Follow the tutorial",
        url: "https://docs.celestia.org/nodes/docker-images",
      },
    },
    {
      id: 3,
      title: "Advanced",
      text: "Start a light node with the command line.",
      type: "external",
      image: "run-a-node/advanced-image.png",
      link: {
        text: "Read the guide",
        url: "https://docs.celestia.org/nodes/light-node",
      },
    },
  ],
};

const lightNode = {
  title: "Light nodes for developers",
  button: {
    text: "Start light node",
    class: "simple",
    type: "external",
    url: "https://docs.celestia.org/nodes/light-node",
  },
  description: "How developers can use a Celestia light node for their chain",
  items: [
    {
      id: 1,
      title: "Publish data",
      text: "Publish transaction data to Celestia’s DA network.",
      type: "external",
      image: "run-a-node/publish-image.png",
      link: {
        text: "Submit data to Celestia",
        url: "https://docs.celestia.org/developers/node-tutorial",
      },
    },
    {
      id: 2,
      title: "Retrieve data",
      text: "Retrieve transaction data from Celestia’s DA network.",
      type: "external",
      image: "run-a-node/retrieve-image.png",
      link: {
        text: "Retrieve data from Celestia",
        url: "https://docs.celestia.org/developers/node-tutorial#retrieving-data",
      },
    },
    {
      id: 3,
      title: "Manage Tia wallet",
      text: "Generate a Celestia wallet to store Tia and pay for publishing transaction data to Celestia.",
      type: "external",
      image: "run-a-node/manage-image.png",
      link: {
        text: "Setup wallet",
        url: "https://docs.celestia.org/developers/celestia-node-key",
      },
    },
  ],
};



export default async function RunALightNode() {

  return (
    <main className={`flex min-h-screen flex-col p-24`}>
      {/* HERO */}
      <div className={`pb-10`}>
        <h1 className={``}>{heroData.title}</h1>
        <p className={``}>{heroData.text}</p>
        {heroData.buttons.map((button, index) => (
          <a key={index} href={button.url}>{button.text}</a>
        ))}
      </div>

      <hr />

      {/* INTRO */}
      <div className={`pb-10`}>
        <h2 className={``}>What is a light node?</h2>
        <div className={"block"}>
          <p>Light nodes allow anyone to directly verify data availability and interact with Celestia without centralized gateways or RPC providers.</p>
          <p>Data availability sampling enables Celestia to securely increase throughput for rollups as new light nodes join the network over time.</p>
          <p>Each rollup on Celestia uses a light node to directly publish and retrieve transaction data.</p>
        </div>
      </div>

      {/* NETWORK */}
      <div className={`pb-10`}>
        <h2 className={``}>{joinTheNetwork.title}</h2>
        <div className={"block"}>
          {joinTheNetwork.items.map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href={item.link.url}>{item.link.text}</a>
            </div>
          ))}
        </div>
      </div>

      {/* NETWORK */}
      <div className={`pb-10`}>
        <h2 className={``}>{lightNode.title}</h2>
        <p className={``}>{lightNode.description}</p>
        <a href={lightNode.button.url}>{lightNode.button.text}</a>
        <div className={"block"}>
          {lightNode.items.map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href={item.link.url}>{item.link.text}</a>
            </div>
          ))}
        </div>
      </div>

    </main >
  );
}