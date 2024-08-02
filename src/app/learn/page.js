import TertiaryHero from "@/components/Heroes/TertiaryHero";
import Container from "@/components/Container/Container";
import { Col, Row } from "@/macros/Grids";
import { Display, Body } from "@/macros/Copy";
import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";

import meta from "@/components/Meta/Meta";
import seo from "@/data/faq/seo";

export const metadata = meta(seo);

export default async function Learn() {
  const cardGroups = [
    {
      cards: [
        {
          title: "Begginers",
          description: "Documentation for the Celestia network.",
          url: "/learn/beginners/modular-blockchains-for-beginners",
        },
        {
          title: "Intermediate",
          description:
            "Overview of paying for blob transactions and Celestia’s fee market.",
          url: "/learn/intermediates/modular-and-monolithic-blockchains",
        },
      ],
    },
    {
      cards: [
        {
          title: "Enthusiasts",
          description:
            "Overview of paying for blob transactions and Celestia’s fee market.",
          url: "#",
        },
        {
          title: "Developers",
          description:
            "Learn how to publish and retrieve transaction data from Celestia.",
          url: "#",
        },
        {
          title: "Researchers",
          description:
            "Learn how to publish and retrieve transaction data from Celestia.",
          url: "#",
        },
      ],
    },
  ];

  return (
    <>
      <TertiaryHero
        title={"Dive into modular"}
        pageIndicator={"2-4"}
        ctaIndicator={"00"}
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
              {cardGroups.map((group, index) => (
                <div
                  className="w-full grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-4 mb-4"
                  key={`cardGroup-${index}`}
                >
                  {group.cards.map((card, index) => (
                    <VerticalTitleCard
                      key={index}
                      verticalTitle={card.title}
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
