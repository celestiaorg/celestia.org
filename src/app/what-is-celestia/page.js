import SecondaryHero from "@/components/Heroes/SecondaryHero";
import ScrollText from "@/components/ScrollText/ScrollText";
import Introduction from "@/components/Introduction/Introduction";
import { Heading, Display, Body } from "@/macros/Copy";
import SecondaryButton from "@/macros/Buttons/SecondaryButton";
import ListSection from "@/components/List/Layout/ListSection";
import ListItem from "@/components/List/ListItem";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import ScrollNavigation from "@/components/ScrollNavigation/ScrollNavigation";
import ScrollSection from "@/components/ScrollNavigation/ScrollSection";
import HeadingWithSuperscript from "@/micros/HeadingWithSuperscript/HeadingWithSuperscript";
import { Row, Col } from "@/macros/Grids";
import Image from "next/image";
import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";

import meta from "@/components/Meta/Meta";
import seo from "@/data/what-is-celestia/seo";
import Container from "@/components/Container/Container";

export const metadata = meta(seo);

export default async function WhatIsCelestia() {
  const tableOfContents = {
    "What is Celestia?": "#what-is-celestia",
    "Why Celestia?": "#why-celestia",
    "What is data availability?": "#what-is-data-availability",
    "What's data availability sampling?": "#data-availability-sampling",
    "What is a modular blockchain?": "#modular-blockchain",
  };

  return (
    <>
      <SecondaryHero
        title={"What is Celestia?"}
        pageIndicator={"1-4"}
        tableOfContents={tableOfContents}
        tableIndicator={"00"}
        videos={{
          src: {
            xl: "/videos/hero/ecosystem-desktop_xl.mp4",
            lg: "/videos/hero/ecosystem-desktop_lg.mp4",
            sm: "/videos/hero/ecosystem-mobile_sm.mp4",
          },
          poster: {
            lg: "/videos/hero/ecosystem-desktop_xl_poster.jpg",
            sm: "/videos/hero/ecosystem-mobile_sm_poster.jpg",
          },
        }}
      />

      <ScrollText
        id={"what-is-celestia"}
        lightMode
        gradientText
        gradientType="secondary"
      >
        <>Celestia is the modular</>
        <>blockchain powering</>
        <>unstoppable applications</>
        <>with full stack</>
        <>customizability.</>
      </ScrollText>

      <Introduction>
        <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"p"}>
          Rollups and L2s use Celestia as a network for publishing and making
          transaction data available for anyone to download. For them, Celestia
          provides high-throughput DA that can be verified easily with a light
          node.
        </Heading>
        <Heading size={"md"} className={""} tag={"p"}>
          And by making the blockchain stack modular, anyone can launch their
          own blockchain without needing a validator set.
        </Heading>
      </Introduction>

      <ListSection id={"why-celestia"}>
        <ListSection.Header>
          <Display size={"sm"} tag={"h2"} className={"mb-6 lg:mb-10"}>
            Why Celestia?
          </Display>
        </ListSection.Header>
        <ListSection.Buttons>
          <SecondaryButton
            href={"/build"}
            size="md"
            dark
            className={"table"}
            noBorder
          >
            <div
              className={
                "w-full inline-flex justify-between items-center group gap-2"
              }
            >
              <span>Build whatever</span>
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
          </SecondaryButton>
        </ListSection.Buttons>
        <ListSection.Body>
          <ListItem title={"Deploy fast"} type={"star"}>
            Deploy your own customizable blockchain as easily as a smart
            contract.
          </ListItem>
          <ListItem title={"Use any VM"} type={"star"}>
            Transform nearly any virtual machine into your own sovereign chain.
          </ListItem>
          <ListItem title={"Access abundant throughput"} type={"star"}>
            Unlock dynamic throughput that scales with the number of users.
          </ListItem>
        </ListSection.Body>
      </ListSection>

      <ScrollNavigation
        sectionDetails={Object.fromEntries(
          Object.entries(tableOfContents).slice(-3)
        )}
      >
        <ScrollSection index={0} id={"what-is-data-availability"} canCopyLink>
          <Row className={`lg:gap-6 mb-8 lg:mb-10`}>
            <Col width={50}>
              <HeadingWithSuperscript>
                <HeadingWithSuperscript.Heading>
                  <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"h3"}>
                    What is data availability and why does it matter?
                  </Heading>
                </HeadingWithSuperscript.Heading>
                <HeadingWithSuperscript.Superscript>
                  <Body size="sm" className={"text-right lg:text-left"}>
                    [1-3]
                  </Body>
                </HeadingWithSuperscript.Superscript>
              </HeadingWithSuperscript>
            </Col>
            <Col width={50}></Col> {/* Empty column to maintain gap */}
          </Row>
          <Row className={"gap-6"} align>
            <Col width={50}>
              <Image
                src="/images/FPO/FPO-image.png"
                width={800}
                height={800}
                alt="FPO Image"
                className="w-full h-auto block mx-auto mb-8"
                style={{ maxWidth: 800 }}
              />
            </Col>
            <Col width={50}>
              <Body size={"md"} className={"mb-4"}>
                Data availability answers the question, has the data for this
                blockchain been published? It is critical to the security of any
                blockchain because it ensures that anyone can inspect the ledger
                of transactions and verify it.
              </Body>
              <Body size={"md"} className={"mb-4"}>
                Users of a monolithic blockchain usually download all the data
                to check that it is available.
              </Body>
              <Body size={"md"}>
                As blocks get bigger, it becomes impractical for normal users to
                download all the data meaning that they can’t verify the chain.
                Modular chains solve this problem by making it possible for
                users to verify very large blocks using a technology called data
                availability sampling.
              </Body>
            </Col>
          </Row>
        </ScrollSection>
        <ScrollSection index={1} id={"data-availability-sampling"} canCopyLink>
          <Row className={`lg:gap-6 mb-8 lg:mb-10`}>
            <Col width={50}>
              <HeadingWithSuperscript>
                <HeadingWithSuperscript.Heading>
                  <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"h3"}>
                    Now what&apos;s data availability sampling?
                  </Heading>
                </HeadingWithSuperscript.Heading>
                <HeadingWithSuperscript.Superscript>
                  <Body size="sm" className={"text-right lg:text-left"}>
                    [2-3]
                  </Body>
                </HeadingWithSuperscript.Superscript>
              </HeadingWithSuperscript>
            </Col>
            <Col width={50}>
              <Body size={"md"} className={"mb-4"}>
                Data availability sampling (DAS) is the new primitive that
                enables Celestia light nodes to verify DA efficiently. Instead
                of downloading all data, light nodes only download a tiny
                portion of each block.
              </Body>
              <Body size={"md"} className={"mb-4"}>
                Importantly, DAS allows Celestia to scale with the number of
                users (light nodes). So, as the light node network grows over
                time, Celestia can scale to the data throughput needed for
                millions of rollups without compromising on security for end
                users.
              </Body>
            </Col>
          </Row>
          <Row className={"gap-6"}>
            <Col width={100}>
              <Image
                src="/images/FPO/FPO-image.png"
                width={800}
                height={800}
                alt="FPO Image"
                className="w-full h-auto block mx-auto"
                style={{ maxWidth: 800 }}
              />
            </Col>
          </Row>
        </ScrollSection>
        <ScrollSection index={2} id={"modular-blockchain"} canCopyLink>
          <Row className={`lg:gap-6 mb-8 lg:mb-10`}>
            <Col width={50}>
              <HeadingWithSuperscript>
                <HeadingWithSuperscript.Heading>
                  <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"h3"}>
                    And what is a modular blockchain?
                  </Heading>
                </HeadingWithSuperscript.Heading>
                <HeadingWithSuperscript.Superscript>
                  <Body size="sm" className={"text-right lg:text-left"}>
                    [3-3]
                  </Body>
                </HeadingWithSuperscript.Superscript>
              </HeadingWithSuperscript>
            </Col>
            <Col width={50}>
              <Body size={"md"} className={"mb-4"}>
                Modular blockchains are a new paradigm in blockchain design.
                Instead of one blockchain doing everything, modular blockchains
                specialize and optimize to perform a given function. This
                specialization provides breakthroughs in scalability,
                flexibility, and interoperability, enabling developers to build
                blockchain applications for mass adoption
              </Body>
            </Col>
          </Row>
          <Row className={"gap-6"}>
            <Col width={50}></Col> {/* Empty column to maintain gap */}
            <Col width={50}>
              <Image
                src="/images/FPO/FPO-image.png"
                width={800}
                height={800}
                alt="FPO Image"
                className="w-full h-auto block mx-auto"
                style={{ maxWidth: 800 }}
              />
            </Col>
          </Row>
        </ScrollSection>
      </ScrollNavigation>

      <section
        id={"start-using-celestia"}
        className="bg-black text-white relative z-10"
      >
        <Container size={"lg"} className={"py-10 lg:py-24"}>
          <Row className={"mb-6 lg:mb-16"}>
            <Col width={60}>
              <Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-0"}>
                Start using Celestia
              </Display>
            </Col>
            <Col width={40}></Col>
          </Row>
          <Row>
            <Col width={100}>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <VerticalTitleCard
                  verticalTitle={"Enthusiasts"}
                  description={
                    "Overview of paying for blob transactions and Celestia’s fee market."
                  }
                  dark
                  url={"/build"}
                />
                <VerticalTitleCard
                  verticalTitle={"Developers"}
                  description={
                    "Learn how to publish and retrieve transaction data from Celestia."
                  }
                  dark={true}
                  url={"/#explore-celestia"}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="bg-black w-fill h-10 -mb-10 block"></div>
    </>
  );
}
