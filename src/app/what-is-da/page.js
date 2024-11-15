import SecondaryHero from "@/components/Heroes/SecondaryHero";
import ScrollText from "@/components/ScrollText/ScrollText";
import Introduction from "@/components/Introduction/Introduction";
import { Heading, Display, Body } from "@/macros/Copy";
import ScrollNavigation from "@/components/ScrollNavigation/ScrollNavigation";
import ScrollSection from "@/components/ScrollNavigation/ScrollSection";
import HeadingWithSuperscript from "@/micros/HeadingWithSuperscript/HeadingWithSuperscript";
import { Row, Col } from "@/macros/Grids";
import Image from "next/image";
import Container from "@/components/Container/Container";
import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";
import ListSection from "@/components/List/Layout/ListSection";
import ListItem from "@/components/List/ListItem";
import meta from "@/components/Meta/Meta";
import seo from "@/data/what-is-celestia/seo";

export const metadata = meta(seo);

const dalayerGroups = [
  {
    cards: [
      {
        title: "Deploy fast",
        description:
          "Deploy fast with an Ethereum L2 using leading rollup frameworks.",
        url: "/build/#build",
      },
      {
        title: "Sovereign chains.",
        description: "Transform nearly any VM into its own sovereign chains.",
        url: "/build/#build",
      },
      {
        title: "Rollups-as-a-Service",
        description:
          "One-click deployment on managed infrastructure using a Rollups-as-a-Service provider.",
        url: "/build/#deploy",
      },
    ],
  },
];

export default async function WhatIsDataAvailability() {
  const tableOfContents = {
    "Why does data availability even matter?": "#why-data-availability-matters",
    "What is data availability?": "#what-is-data-availability",
    "Data availability layers": "#data-availability-layers",
    "How developers can build on Celestia’s DA layer": "#build-on-da-layer",
  };

  return (
    <>
      <SecondaryHero
        title={"What is data availability?"}
        pageIndicator={"2-4"}
        tableOfContents={tableOfContents}
        tableIndicator={"00"}
        buttons={[
          {
            text: (
              <>
                Learn more{" "}
                <span className={"sr-only"}>about data availability</span>
              </>
            ),
            url: "#",
          },
        ]}
      />

      <ScrollText id={"what-is-celestia"} lightMode>
        <>What’s stopping crypto </>
        <>applications from </>
        <>becoming accessible </>
        <>to everyday people?</>
      </ScrollText>

      <Introduction>
        <Heading size={"md"} className={""} tag={"p"}>
          Well, it’s all because of the data availability constraint that crypto
          applications face. Data availability (DA) is a pretty misunderstood
          and unknown topic that is fundamental to blockchains. This guide is
          here to help you understand data availability, what a data
          availability layer is, and the why’s of Celestia’s DA layer. Now
          first…
        </Heading>
      </Introduction>

      <ScrollNavigation sectionDetails={tableOfContents}>
        <ScrollSection
          index={1}
          totalItems={4}
          id={"why-data-availability-matters"}
        >
          <Row className={`gap-6 lg:gap-32 mb-8 lg:mb-10`}>
            <Col width={50}>
              <HeadingWithSuperscript>
                <HeadingWithSuperscript.Heading>
                  <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"h3"}>
                    Why does data availability even matter?
                  </Heading>
                </HeadingWithSuperscript.Heading>
                <HeadingWithSuperscript.Superscript>
                  <Body size="sm" className={"text-right"}>
                    [1-4]
                  </Body>
                </HeadingWithSuperscript.Superscript>
              </HeadingWithSuperscript>
            </Col>
            <Col width={50}></Col> {/* Empty column to maintain gap */}
          </Row>
          <Row className={"lg:gap-32"}>
            <Col width={50}>
              <Body size={"md"} className={"mb-4"}>
                Web apps have massive data requirements, so cloud companies
                build vast server warehouses to process enough data. Data
                availability presents a similar scaling bottleneck for crypto
                applications on all blockchains.
              </Body>
              <Body size={"md"}>
                Especially for rollups and layer 2 blockchains, data
                availability is a significant constraint. Low DA throughput
                causes excessive fees, restricting the types of apps that
                developers can build. Overall, data availability is roughly 95%
                of the costs that rollups pay. And once DA isn’t a constraint,
                developers can unlock new monetization opportunities and new
                capabilities for building fully-onchain applications.
              </Body>
            </Col>
            <Col width={50}>
              <Heading size={"sm"} className={"mb-4"}>
                For the rest of this guide, we’ll call any chain that uses
                Celestia a rollup for simplicity.
              </Heading>
              <Body size={"md"}>
                But data availability isn’t just a resource that rollups
                consume. DA allows anyone to directly verify that a blockchain
                is running correctly. Until now, rollups have had to trust small
                committees to relieve the DA constraint. That means anyone who
                wants to interact with the rollup must rely on trusted third
                parties to access and verify the network. So, fixing the DA
                constraint with proofs instead of committees allows rollups to
                regain verifiability.
              </Body>
            </Col>
          </Row>
        </ScrollSection>
        <ScrollSection
          index={2}
          totalItems={4}
          id={"what-is-data-availability"}
        >
          <Row className={`gap-6 lg:gap-32 mb-8 lg:mb-10`}>
            <Col width={50}>
              <HeadingWithSuperscript>
                <HeadingWithSuperscript.Heading>
                  <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"h3"}>
                    What is data availability?
                  </Heading>
                </HeadingWithSuperscript.Heading>
                <HeadingWithSuperscript.Superscript>
                  <Body size="sm" className={"text-right"}>
                    [2-4]
                  </Body>
                </HeadingWithSuperscript.Superscript>
              </HeadingWithSuperscript>
            </Col>
            <Col width={50}></Col>
          </Row>
          <Row className={`gap-6 lg:gap-32 mb-8 lg:mb-10`}>
            <Col width={50}>
              <Body size={"md"} className={"mb-4"}>
                Data availability is about proving data was published to the
                network. So, when a chain produces new blocks, nodes verify DA
                by downloading all the data. Although there is a more efficient
                way to verify DA (more on this later).
              </Body>
              <Body size={"md"} className={"mb-4"}>
                Really, data availability is like streaming a sports game. DA
                lets anyone download transactions to see what happened, just
                like streaming lets anyone watch a game if they aren’t at the
                stadium.
              </Body>
              <Body size={"md"}>
                The one thing that data availability doesn’t cover is the
                long-term storage of transaction data. DA is just about
                publishing data and temporary storage.
              </Body>
            </Col>
            <Col width={50}>
              <Image
                src="/images/FPO/FPO-image.png"
                width={800}
                height={800}
                alt="FPO Image"
                className="w-full h-auto block mx-auto mb-4"
                style={{ maxWidth: 800 }}
              />
              <Body size={"md"}>
                The difference might not seem important, but DA and long-term
                data storage actually have varying security properties.
              </Body>
            </Col>
          </Row>
        </ScrollSection>
        <ScrollSection index={3} totalItems={4} id={"data-availability-layers"}>
          <Row className={`gap-6 lg:gap-32 mb-8 lg:mb-10`}>
            <Col width={50}>
              <HeadingWithSuperscript>
                <HeadingWithSuperscript.Heading>
                  <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"h3"}>
                    Data availability layers
                  </Heading>
                </HeadingWithSuperscript.Heading>
                <HeadingWithSuperscript.Superscript>
                  <Body size="sm" className={"text-right"}>
                    [3-4]
                  </Body>
                </HeadingWithSuperscript.Superscript>
              </HeadingWithSuperscript>
            </Col>
            <Col width={50}></Col>
          </Row>
          <Row className={`gap-6 lg:gap-32 mb-8 lg:mb-10`}>
            <Col width={50}>
              <Heading size={"sm"} className={"mb-4"}>
                Now there are specialized providers known as data availability
                layers (DA layers) that supply DA to other chains. Let’s look at
                two distinct types of DA layers:
              </Heading>
              <Body size={"md"} className={"mb-4"}>
                Modular blockchains are a new paradigm in blockchain design.
                Instead of one blockchain doing everything, modular blockchains
                specialize and optimize to perform a given function. This
                specialization provides breakthroughs in scalability,
                flexibility, and interoperability, enabling developers to build
                blockchain applications for mass adoption
              </Body>
            </Col>
            <Col width={50}>
              <ListItem type={"star"} lightMode>
                Data availability committees: a small, permissioned committee
                that is trusted to provide DA.
              </ListItem>
              <ListItem type={"star"} lightMode>
                DA layers: with data availability sampling (DAS): a
                decentralized network that provides DA and allows anyone to
                efficiently verify via DAS
              </ListItem>
              <Body size={"md"} className={"mb-4"}>
                And a DA layer with DAS is what Celestia is…
              </Body>
            </Col>
          </Row>
        </ScrollSection>
        <ScrollSection index={4} totalItems={4} id={"build-on-da-layer"}>
          <Row className={`gap-6 lg:gap-32 mb-8 lg:mb-10`}>
            <Col width={50}>
              <HeadingWithSuperscript>
                <HeadingWithSuperscript.Heading>
                  <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"h3"}>
                    Celestia’s DA layer
                  </Heading>
                </HeadingWithSuperscript.Heading>
                <HeadingWithSuperscript.Superscript>
                  <Body size="sm" className={"text-right"}>
                    [4-4]
                  </Body>
                </HeadingWithSuperscript.Superscript>
              </HeadingWithSuperscript>
            </Col>
            <Col width={50}></Col>
          </Row>
          <Row className={`gap-6 lg:gap-32 mb-8 lg:mb-10`}>
            <Col width={50}>
              <Heading size={"sm"} className={"mb-4"}>
                So, what does Celestia’s DA layer actually do?
              </Heading>
              <Body size={"md"} className={"mb-4"}>
                Well, Celestia provides abundant DA to address the scaling
                bottleneck. And it does this with data availability sampling
                (DAS).
              </Body>
              <Body size={"md"}>
                DAS is a new technology that enables Celestia to securely
                increase its blockspace with more users (light nodes). And the
                way rollups use Celestia is simple. All they really need to do
                is use Celestia’s DA layer to publish and temporarily access
                their transaction data.
              </Body>
            </Col>
            <Col width={50}>
              <Body size={"md"} className={"mb-4"}>
                Now, with ~95% percent lower DA costs, developers can focus on
                improving their app without the burden of high fees or
                unnecessary gas cost optimizations. Ultimately, low-cost DA
                unlocks new capabilities for developers to build fully onchain
                apps, like onchain games or generative art. See the cost savings
                for your chain with Celestia underneath.
              </Body>
              <Body size={"md"} className={"mb-4"}>
                The other important aspect of DAS is that it enables users to
                secure and directly verify Celestia. Without DAS, DA layers have
                to give up verifiability and security for higher throughput. So
                users have to trust validators or committees to ensure the chain
                is running correctly. With DAS, users can secure and directly
                verify Celestia’s DA layer with proofs instead of a trusted
                committee.
              </Body>
            </Col>
          </Row>
        </ScrollSection>
      </ScrollNavigation>
      <section
        id={"network"}
        className="bg-white-weak text-black relative z-10"
      >
        <Container size={"lg"} className={"py-10 lg:py-24"}>
          <Row className={"mb-6 lg:mb-16"}>
            <Col width={60}>
              <Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-0"}>
                How developers can build on Celestia’s DA layer
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
              {dalayerGroups.map((group, index) => (
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
      <section>
        <ListSection id={"why-celestia"}>
          <ListSection.Header>
            <Display size={"sm"} tag={"h2"} className={"mb-6 lg:mb-10"}>
              To sum
              <br />
              it all up
            </Display>
          </ListSection.Header>
          <ListSection.Body>
            <ListItem title={"Data availability "} type={"star"}>
              Data availability is a core scaling bottleneck for crypto
              applications and is the vast majority of costs that rollups and
              Layer 2s pay.
            </ListItem>
            <ListItem type={"star"} border={false}>
              Data availability is about proving that data was published by
              allowing anyone to download it for a short period of time.
            </ListItem>
            <ListItem title={"A DA layer"} type={"star"}>
              A DA layer is a blockchain that rollups and L2s publish their
              transaction data to.
            </ListItem>
            <ListItem type={"star"} border={false}>
              Celestia’s DA layer eliminates data availability as a core scaling
              bottleneck, dropping costs for developers by ~95% and enabling
              them to build fully-onchain apps.
            </ListItem>
          </ListSection.Body>
        </ListSection>
      </section>
    </>
  );
}
