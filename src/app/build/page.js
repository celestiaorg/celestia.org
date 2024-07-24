import SecondaryHero from "@/components/Heroes/SecondaryHero";
import { frameworks } from "@/data/build/frameworks";
import { rollups } from "@/data/build/rollups";
import ProjectFilter from "@/components/ProjectFilter/ProjectFilter";
import { getFilterOptions } from "@/utils/getFilterOptions";

const getStarted = [
  {
    id: 1,
    title: "Build",
    text: "Pick a rollup framework to begin building.",
    link: {
      text: "Choose",
    },
  },
  {
    id: 2,
    title: "Integrate",
    text: "Plug Celestia into your existing chain.",
    link: {
      text: "Start",
    },
  },
  {
    id: 3,
    title: "Deploy",
    text: "Explore Rollup-as-a-Service to deploy quickly.",
    link: {
      text: "Explore",
    },
  },
];

const discover = {
  title: "Developer resources",
  description: "",
  items: [
    {
      id: 1,
      title: "Celestia documentation",
      text: "Documentation for the Celestia network.",
      image: "svg/celestia-documentation.svg",
      type: "external",
      link: {
        text: "Explore",
        url: "https://docs.celestia.org/",
      },
    },
    {
      id: 2,
      title: "Pay for blobspace",
      text: "Overview of paying for blob transactions and Celestia’s fee market.",
      image: "svg/blobspace.svg",
      type: "external",
      link: {
        text: "Learn",
        url: "https://docs.celestia.org/learn/paying-for-blobspace/",
      },
    },
    {
      id: 3,
      title: "Blob tutorial",
      text: "Learn how to publish and retrieve transaction data from Celestia.",
      image: "svg/blob-tutorial.svg",
      type: "external",
      link: {
        text: "Follow",
        url: "https://docs.celestia.org/developers/node-tutorial/",
      },
    },
  ],
};

const filterCategories = {
  "Modular blockchains for beginners":
    "/learn/beginners/modular-blockchains-for-beginners",
  "The modular stack": "/learn/beginners/the-modular-stack",
  "Values of modular blockchains":
    "/learn/beginners/modular-blockchains-are-user-first",
  "First Principles":
    "/learn/beginners/modular-blockchains-and-first-principles",
};

export default async function Build() {
  const tableOfContents = {
    Build: "#frameworks",
    Integrate: "#integration",
    Deploy: "#rollups",
  };

  return (
    <>
      <SecondaryHero
        title={"Build whatever"}
        pageIndicator={"2-4"}
        tableIndicator={"0-0"}
        buttons={[
          {
            text: (
              <>
                Learn more <span className={"sr-only"}>about frameworks</span>
              </>
            ),
            url: "#frameworks",
            iconDirection: "down-right",
          },
        ]}
        tableOfContents={tableOfContents}
      />

      <ProjectFilter
        title={"Choose a framework"}
        description={
          "Get started quickly by using Celestia with leading rollup frameworks."
        }
        filters={getFilterOptions(frameworks, "category")}
        filterTarget={"category"}
        items={frameworks}
      />

      {/* GET STARTED */}
      <div className={`pb-10`}>
        <h2 className={``}>Get started</h2>
        <div className={`flex`}>
          {getStarted.map((item) => (
            <div key={`get-started-${item.id}`} className={``}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a
                className={``}
                href={`/build/#${item.title.replace(" ", "-").toLowerCase()}`}
              >
                {item.link.text}
              </a>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* BUILD */}
      <div className={`pb-10`}>
        <h2 className={``}>{discover.title}</h2>
        <p>{discover.description}</p>
        {discover.items.map((item, index) => {
          return (
            <a key={index} href={item.link.url} className={``}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </a>
          );
        })}
      </div>

      <hr />

      {/* INTEGRATION */}
      <div className={`pb-10`}>
        <h3 className={``}>Blobstream</h3>
        <p className={``}>Use Celestia as the DA layer for your Ethereum L2.</p>
        <a
          href={"https://docs.celestia.org/developers/blobstream/"}
          target="_blank"
        >
          Blobstream documentation
        </a>
      </div>
      <div className={`pb-10`}>
        <h3 className={``}>Node API</h3>
        <p className={``}>
          Use the celestia-node API to publish and retrieve transactions from
          Celestia.
        </p>
        <a
          href={"https://node-rpc-docs.celestia.org/?version=v0.12.0/"}
          target="_blank"
        >
          Node API Documentation
        </a>
      </div>

      <hr />

      {/* CONTACT */}
      <div className={`pb-10`}>
        <h4 className={``}>Explore your options</h4>
        <p className={``}>
          Contact us to find solutions for your app&apos;s needs.
        </p>
        <a
          href={"https://celestia-intake.typeform.com/interest/"}
          target="_blank"
        >
          Get In Touch
        </a>
      </div>
    </>
  );
}
