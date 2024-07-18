import SecondaryHero from "@/components/Heroes/SecondaryHero";
import ScrollText from "@/components/ScrollText/ScrollText";
import Introduction from "@/components/Introduction/Introduction";
import { Heading, Display } from "@/macros/Copy";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import ListSection from "@/components/List/Layout/ListSection";
import ListItem from "@/components/List/ListItem";
import Link from "next/link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import ScrollNavigation from "@/components/ScrollNavigation/ScrollNavigation";

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
      {/* HERO */}
      <SecondaryHero
        title={"What is Celestia?"}
        pageIndicator={"2-4"}
        tableOfContents={tableOfContents}
        tableIndicator={"0-0"}
        buttons={[
          {
            text: (
              <>
                Learn more <span className={"sr-only"}>about Celestia</span>
              </>
            ),
            url: "#",
          },
        ]}
      />

      <ScrollText lightMode>
        <>Celestia is a modular</>
        <>data availability (DA)</>
        <>network that securely scales</>
        <>with the number of users,</>
        <>making it easy for anyone to launch</>
        <>their own blockchain.</>
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

      <ListSection>
        <ListSection.Header>
          <Display size={"sm"} tag={"h2"} className={"mb-6 lg:mb-10"}>
            Why Celestia?
          </Display>
        </ListSection.Header>
        <ListSection.Buttons>
          <Link href={""}>
            <PrimaryButton size="md" dark className={"table"}>
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
            </PrimaryButton>
          </Link>
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

      <ScrollNavigation>
        <section className="h-[200vh] bg-red-500">Section 1</section>
        <section className="h-screen bg-green-500">Section 2</section>
        <section className="h-screen bg-blue-500">Section 3</section>
      </ScrollNavigation>

      {/* WHAT */}
      <div className={`pb-10`}>
        <h2>What is data availability and why does it matter?</h2>
        <p>
          Data availability answers the question, has the data for this
          blockchain been published? It is critical to the security of any
          blockchain because it ensures that anyone can inspect the ledger of
          transactions and verify it.
        </p>
        <p>
          Users of a monolithic blockchain usually download all the data to
          check that it is available.
        </p>
        <p>
          As blocks get bigger, it becomes impractical for normal users to
          download all the data meaning that they can’t verify the chain.
          Modular chains solve this problem by making it possible for users to
          verify very large blocks using a technology called data availability
          sampling.
        </p>

        <h2 className="title">Now what&apos;s data availability sampling?</h2>
        <div className={"image-box--different"}>
          <div className="image-wrapper">placeholder image</div>
        </div>
        <p>
          Data availability sampling (DAS) is the new primitive that enables
          Celestia light nodes to verify DA efficiently. Instead of downloading
          all data, light nodes only download a tiny portion of each block.
        </p>
        <p>
          Importantly, DAS allows Celestia to scale with the number of users
          (light nodes). So, as the light node network grows over time, Celestia
          can scale to the data throughput needed for millions of rollups
          without compromising on security for end users.
        </p>

        <h2 className="title">And what is a modular blockchain?</h2>
        <div className={"image-box--different"}>
          <div className="image-wrapper">placeholder image</div>
        </div>
        <p>
          Modular blockchains are a new paradigm in blockchain design. Instead
          of one blockchain doing everything, modular blockchains specialize and
          optimize to perform a given function. This specialization provides
          breakthroughs in scalability, flexibility, and interoperability,
          enabling developers to build blockchain applications for mass
          adoption.
        </p>
      </div>
    </>
  );
}
