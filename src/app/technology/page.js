import TertiaryHero from "@/components/Heroes/TertiaryHero";
import TertiaryPageContainer from "@/components/Container/TertiaryPageContainer";
import {
  Heading,
  Body,
  Image,
  Section,
} from "@/micros/TertiaryPageMicors/TertiaryPageMicors";

import meta from "@/components/Meta/Meta";
import seo from "@/data/technology/seo";

export const metadata = meta(seo);

export default async function Technology() {
  const timeline = [
    {
      title: "Early web (1990s)",
      text: "Each website had its own physical server.",
      image: "column-1.png",
    },
    {
      title: "Early crypto ecosystem (2008+)",
      text: "Each dapp had its own blockchain and consensus.",
      image: "column-2.png",
    },
    {
      title: "Developing web (2000s)",
      text: "Website used shared hosting providers.",
      image: "column-3.png",
    },
    {
      title: "Developing crypto ecosystem (2014+)",
      text: "Dapps used shared smart contract blockchains.",
      image: "column-4.png",
    },
    {
      title: "Modern web (2010s)",
      text: "Websites run on virtual machines, that share physical machines.",
      image: "column-5.png",
    },
    {
      title: "Modern crypto ecosystem (2021+)",
      text: "Dapps run on app-specific chains, that share consensus layers.",
      image: "column-6.png",
    },
  ];

  return (
    <>
      <TertiaryHero
        title={"Technology"}
        blurbTitle={
          "Celestia is pioneering a new paradigm in blockchain design. A minimal, modular consensus layer for rollups."
        }
      />
      <TertiaryPageContainer>
        <TertiaryPageContainer.Body>
          <Section>
            <Heading tag={"h2"}>
              Separation of consensus and execution layers
            </Heading>
            <Body>
              Standard &ldquo;world computer&rdquo; blockchains bundle consensus
              and execution while Celestia decouples them. Celestia provides a
              pluggable consensus layer, allowing developers to deploy their own
              execution layers to run on top. This enables more customizability
              and sovereignty for applications built on Celestia.
            </Body>
          </Section>
          <Section>
            <Heading tag={"h2"}>Data availability proofs</Heading>
            <Body>
              Celestia uses a 2-dimensional reed-solomon encoding scheme to
              encode block data such that only a small sample of data is enough
              to verify with statistical certainty that the entire block has
              been published. If data is incorrectly encoded, the network is
              notified via a data availability fraud proof.
            </Body>
          </Section>
          <Section>
            <Heading tag={"h2"}>Rollups for off-chain execution</Heading>
            <Body>
              Celestia is perfectly suited for a novel scaling solution called
              rollups which push state execution off-chain and rely on a base
              chain for consensus and data availability. Optimistic rollups
              require data availability to detect fraud and zero-knowledge
              rollups require data availability to reconstruct the state of the
              chain.
            </Body>
          </Section>
          <Section>
            <Heading tag={"h2"}>
              Secure light clients for interoperability
            </Heading>
            <Body>
              Cross-chain interoperability relies on light clients which are
              typically not secure because they make an honest majority
              assumption. Light clients in Celestia do not make an honest
              majority assumption, unlocking truly secure cross-chain
              interoperability. Connecting chains will be as simple as deploying
              a smart contract.
            </Body>
          </Section>
          <Section>
            <Heading tag={"h2"}>
              Celestia is for decentralized apps what cloud computing is for the
              traditional web.
            </Heading>
            <Body>
              Web infrastructure evolved from individual servers, to shared
              hosting services and finally individual virtual machines on a
              shared server. Similarly, decentralized infrastructure is evolving
              from individual execution chains to shared execution chains and
              finally individual execution chains on a shared consensus layer.
            </Body>
            <div
              className={
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              }
            >
              {timeline.map((item, index) => {
                return (
                  <div key={index}>
                    <Image
                      src={`/images/app/technology/${item.image}`}
                      alt={""}
                      className={"mb-4 w-full max-w-44 mx-auto lg:ml-0"}
                    />
                    <Heading
                      tag={"h3"}
                      size={"sm"}
                      className={"mb-4 text-center lg:text-left"}
                    >
                      {item.title}
                    </Heading>
                    <Body className={"text-center lg:text-left"}>
                      {item.text}
                    </Body>
                  </div>
                );
              })}
            </div>
          </Section>
        </TertiaryPageContainer.Body>
      </TertiaryPageContainer>
    </>
  );
}
