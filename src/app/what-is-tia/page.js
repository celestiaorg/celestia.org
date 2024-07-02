
const heroData = {
  title: "What is Tia?",
  text: "Learn about Tia, the native token of the Celestia blockchain.",
  buttons: [
    {
      text: "Pay for Data",
      class: "simple plausible-event-name=Pay_for_Data_button-What_is_TIA-Hero_section",
      type: "external",
      url: "https://docs.celestia.org/developers/submit-data/",
    },
    {
      text: "Stake Tia",
      class: "white",
      type: "anchor",
      url: "staking-and-custody",
    }
  ],
};

const role = {
  title: "Tia's role in Celestia",
  items: [
    {
      id: 1,
      title: "Pay for blobspace",
      text: "Rollups pay to publish data to Celestia’s blobspace using Tia.",
      image: "what-is-tia/what-is-tia-role-1.png",
      links: [
        {
          text: "Create wallet with celestia-node",
          url: "https://docs.celestia.org/developers/celestia-node-key/",
          type: "external",
        },
        {
          text: "Learn more",
          url: "https://docs.celestia.org/learn/paying-for-blobspace/",
          type: "external",
        },
      ],
    },
    {
      id: 2,
      title: "Secure the network",
      text: "Users stake Tia to participate in consensus and secure Celestia.",
      image: "what-is-tia/what-is-tia-role-2.png",
      type: "external",
      links: [
        {
          text: "View documentation",
          url: "https://docs.celestia.org/learn/tia/",
          type: "external",
        },
      ],
    },
    {
      id: 3,
      title: "Gas token for rollups",
      text: "Developers can use Tia as a gas token for their rollups.",
      image: "what-is-tia/what-is-tia-role-3.png",
      type: "external",
      links: [],
    },
  ],
};

const wallets = {
  title: "Wallets",
  details: "",
  items: [
    {
      id: 1,
      title: "Keplr Wallet",
      device: ["IOS", "Android", "Desktop"],
      image: "what-is-tia/kepler-icon.jpg",
      backdropClass: "opacity-50",
      url: "https://www.keplr.app/",
      type: "external",
    },
    {
      id: 2,
      title: "Cosmostation",
      device: ["IOS", "Android", "Desktop"],
      image: "what-is-tia/cosmostation-icon.jpg",
      backdropClass: "opacity-100",
      url: "https://cosmostation.io/products/cosmostation_extension/",
      type: "external",
    },
    {
      id: 3,
      title: "Leap",
      device: ["IOS", "Android", "Desktop"],
      image: "what-is-tia/leap-icon.jpg",
      backdropClass: "opacity-100",
      url: "https://www.leapwallet.io/",
      type: "external",
    },
    {
      id: 4,
      title: "Ledger",
      device: ["IOS", "Android", "Desktop"],
      image: "what-is-tia/ledger-icon.jpg",
      backdropClass: "opacity-50",
      url: "https://www.ledger.com/",
      type: "external",
    },
  ],
};


export default async function WhatIsTia() {

  return (
    <main className={`flex min-h-screen flex-col p-24`}>
      {/* HERO */}
      <div className={`pb-10`}>
        <h1 className={``}>{heroData.title}</h1>
        <p className={``}>{heroData.text}</p>
        {heroData.buttons.map((button, index) => (
          <a key={index} href={button.url} >
            {button.text}
          </a>
        ))}
      </div>

      <hr />

      {/* ROLE */}
      <div className={`pb-10`}>
        <h2>{role.title}</h2>
        {role.items.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            {item.links.map((link, index) => (
              <a key={index} href={link.url} target='_blank' rel='noreferrer'>
                {link.text}
              </a>
            ))}
          </div>
        ))}
      </div>

      <hr />

      {/* WALLETS */}
      <div className={`pb-10`}>
        <h2>Wallets</h2>
        <p>Anyone can download a non-custodial wallet to freely control and use their Tia.</p>
        <p>
          It’s important to get familiar with basic wallet practices for safely storing and transacting with Tia
          on Celestia.
        </p>
        {wallets.items.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <p>Available on: {item.device.join(", ")}</p>
            <a href={item.url}>Download</a>
          </div>
        ))}
      </div>

    </main >
  );
}