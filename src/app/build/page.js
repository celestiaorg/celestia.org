import SecondaryHero from "@/components/Heroes/SecondaryHero";
import { frameworks } from "@/data/build/frameworks";
import { rollups } from "@/data/build/rollups";
import ProjectFilter from "@/components/ProjectFilter/ProjectFilter";
import { getFilterOptions } from "@/utils/getFilterOptions";
import GetInTouch from "@/components/CallToActions/GetInTouch";

import Container from "@/components/Container/Container";
import { Col, Row } from "@/macros/Grids";
import { Display, Body } from "@/macros/Copy";
import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";
import Meta from "@/components/Meta/Meta";
import seo from "@/data/build/seo";

export const metadata = Meta(seo);

export default async function Build() {
  const integrationRow1 = [
    {
      title: "Documentation",
      description: "Documentation for the Celestia network.",
      url: "https://docs.celestia.org/",
    },
    {
      title: "Pay for blobspace",
      description:
        "Overview of paying for blob transactions and Celestia’s fee market.",
      url: "https://docs.celestia.org/learn/paying-for-blobspace/",
    },
    {
      title: "Blob tutorial",
      description:
        "Learn how to publish and retrieve transaction data from Celestia.",
      url: "https://docs.celestia.org/developers/node-tutorial/",
    },
  ];

  const integrationRow2 = [
    {
      title: "Blobstream",
      description: "Use Celestia as the DA layer for your Ethereum L2.",
      url: "https://docs.celestia.org/developers/blobstream/",
    },
    {
      title: "Node API",
      description:
        "Use the celestia-node API to publish and retrieve transactions from Celestia.",
      url: "https://node-rpc-docs.celestia.org/?version=v0.12.0/",
    },
  ];

  return (
    <>
      <SecondaryHero
        title={"Build whatever"}
        pageIndicator={"2-4"}
        buttons={[
          {
            text: "Build",
            url: "#frameworks",
            iconDirection: "down-right",
          },
          {
            text: "Integrate",
            url: "#integration",
            iconDirection: "down-right",
          },
          {
            text: "Deploy",
            url: "#rollups",
            iconDirection: "down-right",
          },
        ]}
        videos={{
          src: {
            xl: "/videos/hero/blob-desktop_xl.mp4",
            lg: "/videos/hero/blob-desktop_lg.mp4",
            sm: "/videos/hero/blob-mobile_sm.mp4",
          },
          poster: {
            lg: "/videos/hero/blob-desktop_xl_poster.jpg",
            sm: "/videos/hero/blob-mobile_sm_poster.jpg",
          },
        }}
      />

      <ProjectFilter
        id={"frameworks"}
        title={"Choose a framework"}
        description={
          "Get started quickly by using Celestia with leading rollup frameworks."
        }
        filters={getFilterOptions(frameworks, "categories")}
        filterTarget={"categories"}
        items={frameworks}
      />
      <section id={"integration"} className="bg-black text-white">
        <Container size={"lg"} className={"py-10 lg:py-24"} padding={false}>
          <Row className={"mb-6 lg:mb-16 px-4 md:px-10"}>
            <Col width={60}>
              <Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-6"}>
                How developers can build on Celestia’s DA layer
              </Display>
            </Col>
            <Col width={40} className="lg:flex">
              <Body size={"md"} className={"mb-6 lg:mb-0"}>
                You can launch your chain as easily as a smart contract with
                Celestia underneath. Here’s how you can start:
              </Body>
            </Col>
          </Row>
          {/* Mobile overflow scroll layout */}
          <div className="block md:hidden">
            <Row>
              <Col width={100}>
                <div className="flex overflow-x-scroll w-auto no-scrollbar gap-4 mb-4 px-4 mr-4">
                  {[...integrationRow1, ...integrationRow2].map(
                    (card, index) => (
                      <VerticalTitleCard
                        key={index}
                        verticalTitle={card.title}
                        description={card.description}
                        url={card.url}
                      />
                    )
                  )}
                </div>
              </Col>
            </Row>
          </div>
          {/* Desktop grid layout */}
          <div className="hidden md:block px-4 md:px-10">
            <Row>
              <Col width={100}>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {integrationRow1.map((card, index) => (
                    <VerticalTitleCard
                      key={index}
                      verticalTitle={card.title}
                      description={card.description}
                      url={card.url}
                    />
                  ))}
                </div>
              </Col>
            </Row>
            <Row>
              <Col width={100}>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {integrationRow2.map((card, index) => (
                    <VerticalTitleCard
                      key={index}
                      verticalTitle={card.title}
                      description={card.description}
                      url={card.url}
                    />
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <ProjectFilter
        id={"rollups"}
        title={"Rollups-as-a-Service"}
        description={
          "Deploy end-to-end on managed infrastructure using a Rollup-as-a-Service provider."
        }
        filters={getFilterOptions(rollups, "categories")}
        filterTarget={"categories"}
        items={rollups}
      />

      <GetInTouch />
    </>
  );
}
