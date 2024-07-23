import SecondaryHero from "@/components/Heroes/SecondaryHero";
import Introduction from "@/components/Introduction/Introduction";
import Container from "@/components/Container/Container";
import { Col, Row } from "@/macros/Grids";
import { Display, Body, Heading } from "@/macros/Copy";
import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import Link from "next/link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";

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
  const networkGroups = [
    {
      cards: [
        {
          title: "Beginner",
          description:
            "Deploy a light node in two commands with Vimana’s on-demand hardware.",
          url: "https://docs.vistara.dev/guides/getting-started",
        },
        {
          title: "Intermediate",
          description: "Power up a light node in under 3 minutes with Docker.",
          url: "https://docs.celestia.org/nodes/docker-images",
        },
        {
          title: "Advanced",
          description: "Start a light node with the command line.",
          url: "https://docs.celestia.org/nodes/light-node",
        },
      ],
    },
  ];

  const developerGroups = [
    {
      cards: [
        {
          title: "Publish data",
          description: "Publish transaction data to Celestia’s DA network.",
          url: "https://docs.celestia.org/developers/node-tutorial",
        },
        {
          title: "Retrieve data",
          description: "Retrieve transaction data from Celestia’s DA network.",
          url: "https://docs.celestia.org/developers/node-tutorial#retrieving-data",
        },
        {
          title: "Manage Tia wallet",
          description:
            "Generate a Celestia wallet to store Tia and pay for publishing transaction data to Celestia.",
          url: "https://docs.celestia.org/developers/celestia-node-key",
        },
      ],
    },
  ];

  const tableOfContents = {
    "What is a light node?": "#What-is-a-light-node",
    "Join the network": "#network",
    "Light nodes for developers": "#developers",
  };

  return (
    <>
      <SecondaryHero
        title={"Directly verify"}
        pageIndicator={"2-4"}
        tableIndicator={"0-0"}
        buttons={[
          {
            text: (
              <>
                Learn more{" "}
                <span className={"sr-only"}>about running a light node</span>
              </>
            ),
            url: "https://github.com/celestiaorg/celestia.org",
            iconDirection: "down-right",
          },
        ]}
        tableOfContents={tableOfContents}
      />

      <Introduction id={"What-is-a-light-node"} className={"pt-10 lg:pt-20"}>
        <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"p"}>
          What is a light node...
        </Heading>
        <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"p"}>
          Light nodes allow anyone to directly verify data availability and
          interact with Celestia without centralized gateways or RPC providers.
        </Heading>
        <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"p"}>
          Data availability sampling enables Celestia to securely increase
          throughput for rollups as new light nodes join the network over time.
        </Heading>
        <Heading size={"md"} className={""} tag={"p"}>
          Each rollup on Celestia uses a light node to directly publish and
          retrieve transaction data.
        </Heading>
      </Introduction>

      <section id={"network"} className="bg-white-weak text-black">
        <Container size={"lg"} className={"py-10 lg:py-24"}>
          <Row className={"mb-6 lg:mb-16"}>
            <Col size={6}>
              <Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-0"}>
                Join the network
              </Display>
            </Col>
            <Col size={6}>
              <Body size={"md"}>
                You can launch your chain as easily as a smart contract with
                Celestia underneath. Here’s how you can start:
              </Body>
            </Col>
          </Row>
          <Row>
            <Col size={12}>
              {networkGroups.map((group, index) => (
                <div
                  className="w-full grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-4 mb-4"
                  key={`cardGroup-${index}`}
                >
                  {group.cards.map((card, index) => (
                    <VerticalTitleCard
                      key={index}
                      title={card.title}
                      description={card.description}
                      url={card.url}
                    />
                  ))}
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      <section id={"develoers"} className="bg-black text-white">
        <Container size={"lg"} className={"py-10 lg:py-24"}>
          <Row className={"mb-6 lg:mb-16"}>
            <Col size={6}>
              <Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-6"}>
                Light nodes for developers
              </Display>
              <Body size={"md"} className={"mb-6 lg:mb-0"}>
                How developers can use a Celestia light node for their chain
              </Body>
            </Col>
            <Col size={6} className="lg:flex">
              <Link
                href={"https://docs.celestia.org/nodes/light-node"}
                className={"lg:mr-0 lg:ml-auto block"}
              >
                <PrimaryButton size="md" dark className={"table"}>
                  <div
                    className={
                      "w-full inline-flex justify-between items-center group gap-2"
                    }
                  >
                    <span>Start light node</span>
                    <Icon
                      Icon={<ArrowLongSVG dark />}
                      hover
                      HoverIcon={<ArrowLongSVG dark />}
                      className={`flex-grow-0`}
                      direction="up-right"
                      border={false}
                      size={"xs"}
                      transparentBg
                    />
                  </div>
                </PrimaryButton>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col size={12}>
              {developerGroups.map((group, index) => (
                <div
                  className="w-full grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-4 mb-4"
                  key={`cardGroup-${index}`}
                >
                  {group.cards.map((card, index) => (
                    <VerticalTitleCard
                      dark
                      key={index}
                      title={card.title}
                      description={card.description}
                      url={card.url}
                    />
                  ))}
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
      <div className="bg-black w-fill h-10 -mb-10 block"></div>
    </>
  );
}
