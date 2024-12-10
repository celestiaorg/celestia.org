import TertiaryHero from "@/components/Heroes/TertiaryHero";
import Container from "@/components/Container/Container";
import { Col, Row } from "@/macros/Grids";
import { Display, Body } from "@/macros/Copy";
import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";

import meta from "@/components/Meta/Meta";
import seo from "@/data/learn/seo";

export const metadata = meta(seo);

export default async function Learn() {
  const cardGroups = [
    {
      cards: [
        {
          title: "Beginners",
          description:
            "Discover how modular blockchains are changing the way we think of and build decentralized applications.",
          url: "/learn/beginners/modular-blockchains-for-beginners",
        },
        {
          title: "Intermediate",
          description:
            "Learn about modular blockchain basics, architectures, software, sovereign rollups and more.",
          url: "/learn/intermediates/modular-and-monolithic-blockchains",
        },
      ],
    },
    {
      cards: [
        {
          title: "Developers",
          description:
            "Start here for in-depth information on TIA, running a node, quickstart guides, and more.",
          url: "https://docs.celestia.org/learn/how-celestia-works/overview",
        },
        {
          title: "Enthusiasts",
          description:
            "Learn about the differences between modular and monolithic blockchains.",
          url: "/learn/intermediates/modular-and-monolithic-blockchains",
        },
        {
          title: "Researchers",
          description:
            "Understand sovereign rollups and how they differ from smart contract rollups.",
          url: "/learn/intermediates/sovereign-rollups-an-introduction",
        },
      ],
    },
  ];

  return (
    <>
      <TertiaryHero
        title={"Dive into modular"}
        buttons={[
          {
            text: "Suggest an edit",
            url: "https://github.com/celestiaorg/celestia.org",
            iconDirection: "up-right",
          },
        ]}
        blurbTitle={"Modular blockchains are amazing, right?"}
        blurbCopy={
          <>
            You’ve probably heard something along those lines. Maybe from a
            friend or someone on twitter. Now you’re trying to figure out what a
            modular blockchain is. Well, this page is for you.
            <br />
            <br />
            Whether you’re a developer, researcher, or a blockchain enthusiast,
            Learn Modular was made to help anyone easily understand modular
            blockchains.
          </>
        }
      />

      <section className="bg-black text-white">
        <Container size={"lg"} className={"py-10 lg:py-24"}>
          <Row className={"mb-6 lg:mb-16"}>
            <Col width={60}>
              <Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-0"}>
                So, where should you start?
              </Display>
            </Col>
            <Col width={40}>
              <Body size={"md"}>
                You can launch your chain as easily as a smart contract with
                Celestia underneath. Here’s how you can start:
              </Body>
            </Col>
          </Row>
          <Row>
            <Col width={100}>
              {cardGroups.map((group, index) => {
                const lgGroupClass =
                  group.cards.length === 3 ? "lg:grid-cols-3" : "";
                return (
                  <div
                    className={`w-full grid grid-cols-1 md:grid-cols-2 ${lgGroupClass} gap-4 mb-4`}
                    key={`cardGroup-${index}`}
                  >
                    {group.cards.map((card, index) => (
                      <VerticalTitleCard
                        dark
                        key={index}
                        verticalTitle={card.title}
                        description={card.description}
                        url={card.url}
                      />
                    ))}
                  </div>
                );
              })}
            </Col>
          </Row>
        </Container>
      </section>
      <div className="bg-black w-fill h-10 -mb-10 block"></div>
    </>
  );
}
