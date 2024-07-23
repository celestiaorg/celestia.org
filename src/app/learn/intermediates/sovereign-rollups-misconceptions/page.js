import TertiaryPageContainer from "@/components/Container/TertiaryPageContainer";
import SidebarNavigation from "@/components/SidebarNavigation/SidebarNavigation";
import {
  Heading,
  Body,
  Image,
  ListItem,
  Section,
  Link,
} from "@/micros/TertiaryPageMicors/TertiaryPageMicors";

const SovereignRollupsMisconceptions = () => {
  const sidebarData = {
    sections: [
      {
        title: "Summary",
        id: "summary",
      },
      {
        title: "Introduction",
        id: "introduction",
      },
      {
        title: "Sovereign rollups don’t inherit security of the DA layer",
        id: "sovereign-rollups-dont-inherit-security-of-the-DA-layer",
      },
      {
        title: "Sovereign rollups lack bridging options",
        id: "Sovereign-rollups-lack-bridging-options",
      },
      {
        title: "Sovereign rollups need a settlement layer",
        id: "sovereign-rollups-need-a-settlement-layer",
      },
    ],
  };

  return (
    <TertiaryPageContainer>
      <TertiaryPageContainer.Sidebar>
        <SidebarNavigation
          title={"Misconceptions of sovereign rollups"}
          anchors={sidebarData}
        />
      </TertiaryPageContainer.Sidebar>
      <TertiaryPageContainer.Body>
        <Section id={"summary"}>
          <Heading tag={"h2"}>Summary</Heading>
          <ListItem type={"number"} index={"1"}>
            Sovereign rollups inherit multiple aspects of security from the DA
            layer, such as <Link href={"/glossary/liveness/"}>liveness</Link>,{" "}
            <Link href={"/glossary/safety/"}>safety</Link>, re-org resistance,
            and censorship resistance.
          </ListItem>
          <ListItem type={"number"} index={"2"}>
            Sovereign rollups can have a bridge to the DA layer. The design
            space for bridging between sovereign rollups is wide.
          </ListItem>
          <ListItem type={"number"} index={"3"}>
            Sovereign rollups don’t need a settlement layer because they{" "}
            <Link
              href={"/learn/intermediates/sovereign-rollups-an-introduction"}
            >
              do their own settlement
            </Link>
            .
          </ListItem>
        </Section>
        <Section id={"introduction"}>
          <Heading tag={"h2"}>Introduction</Heading>
          <Body>
            Sovereign rollups combine features from multiple different
            blockchain designs. The unique design can create misconceptions
            about sovereign rollups, such as how they work, what security they
            have, or what kinds of features are possible.
          </Body>
          <Body>
            We’re going to explore and answer some of those misconceptions.
          </Body>
        </Section>
        <Section id={"sovereign-rollups-dont-inherit-security-of-the-DA-layer"}>
          <Heading tag={"h2"}>
            Sovereign rollups don’t inherit security of the DA layer
          </Heading>
          <Body>
            Security covers multiple aspects. Sovereign rollups do inherit
            multiple aspects of security from the DA layer.
          </Body>
          <Heading tag={"h3"} size={"sm"}>
            Data availability
          </Heading>
          <Body>
            The most obvious security feature that sovereign rollups inherit
            from DA layers is{" "}
            <Link href={"/glossary/data-availability/"}>data availability</Link>
            . The two key properties that data availability provides are:
          </Body>
          <ListItem>
            <Link href={"/glossary/liveness/"}>Liveness</Link>: The blockchain
            is making progress.
          </ListItem>
          <ListItem>
            <Link href={"/glossary/safety/"}>Safety</Link>: Invalid transactions
            get rejected.
          </ListItem>
          <Body>
            ZK sovereign rollups use{" "}
            <Link href={"/glossary/validity-proof/"}>validity proofs</Link> to
            prove that all their transactions are correct - this covers the
            safety aspect. What data availability guarantees in this case is
            liveness. Without data availability, a ZK sovereign rollup can’t
            finalize new blocks, causing the chain to halt. Transactions can
            continue to successfully finalize in blocks so long as the sovereign
            rollup nodes can read and write data to the DA layer.
          </Body>
          <Body>
            For an optimistic sovereign rollup,{" "}
            <Link href={"/glossary/state-transition-fraud-proof/"}>
              fraud proofs
            </Link>{" "}
            are used to prove if any transactions are invalid. All transaction
            data for a block is necessary for fraud proofs to work. That means
            without data availability, invalid transactions can’t get rejected.
            Therefore, optimistic sovereign rollups inherit security for
            liveness and safety guarantees from the DA layer.
          </Body>
          <Heading tag={"h3"} size={"sm"}>
            Re-org resistance & consensus
          </Heading>
          <Body>
            Another element of security that sovereign rollups inherit is re-org
            resistance. A re-org attack occurs when a fork changes the
            blockchain’s history. The history change may remove transactions
            that were finalized or transactions that were in the process of
            finalizing.
          </Body>
          <Image
            src={
              "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
            }
            alt={""}
          />
          <Body>
            Sovereign rollups are protected against re-org attacks because their
            transactions receive consensus from the DA layer. The DA layer
            provides consensus to sovereign rollup transactions by ordering and
            finalizing them on the DA layer.
          </Body>
          <Body>
            Once sovereign rollup transactions get finalized on the DA layer,
            they will stay finalized as long as the DA layer doesn’t experience
            a re-org. Therefore, sovereign rollups inherit resistance from
            re-org attacks and consensus from the DA layer.
          </Body>
          <Heading tag={"h3"} size={"sm"}>
            Censorship resistance
          </Heading>
          <Body>
            Optionally, sovereign rollups can also inherit censorship resistance
            from the DA layer. Censorship resistance is a property that
            sovereign rollups may want to inherit from the DA layer because it
            can help protect users against malicious or centralized sequencers
            from censoring their transactions.
          </Body>
          <Body>
            There’s two main ways censorship resistance can come from the DA
            layer:
          </Body>
          <ListItem>
            No sequencers: Users have their transactions sent directly to the DA
            layer. The DA layer is responsible for including finalizing each
            individual transaction. Now, the sovereign rollup inherits
            censorship resistance from the DA layer.
          </ListItem>
          <ListItem>
            Sequencers: User transactions are published in a block to the DA
            layer. If the sequencer tries to censor a user, they can send a
            special inbox transaction directly to the DA layer. The inbox
            transaction would let users get their transactions included in the
            rollup chain even if a sequencer was censoring.
          </ListItem>
        </Section>
        <Section id={"Sovereign-rollups-lack-bridging-options"}>
          <Heading tag={"h2"}>Sovereign rollups lack bridging options</Heading>
          <Body>
            The native bridges of smart contract rollups have{" "}
            <Link href={"/glossary/trust-minimized-bridge/"}>
              trust-minimized
            </Link>{" "}
            security because the settlement layer verifies the rollup’s entire
            block. Sovereign rollups can’t bridge to the DA layer if it doesn’t
            verify its transactions, right?
          </Body>
          <Body>
            Sovereign rollups can have a bridge with their DA layer. If the DA
            layer supports smart contracts, the bridge can be trust-minimized,
            although the bridge may require governance for the rollup to
            preserve sovereignty. If there is no smart contract support, like
            with Celestia, then the bridge would require stronger trust
            assumptions.
          </Body>
          <Body>
            Importantly, sovereign rollups can have bridges between each other.
            These bridges can be trust-minimized if both sovereign rollups use
            the same DA layer and have fraud or validity proofs. This is
            possible through light clients that verify proofs of bridged
            transactions.
          </Body>
          <Image
            src={
              "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
            }
            alt={""}
          />
          <Body>
            The design space is broad, with{" "}
            <Link href={"https://blog.celestia.org/sovereign-rollup-chains/"}>
              many possible solutions
            </Link>{" "}
            for secure bridging between sovereign rollups.
          </Body>
        </Section>
        <Section id={"sovereign-rollups-need-a-settlement-layer"}>
          <Heading tag={"h2"}>
            Sovereign rollups need a settlement layer
          </Heading>
          <Body>
            Smart contract rollups on Ethereum need a settlement layer. Isn’t
            that also true for sovereign rollups?
          </Body>
          <Body>
            Sovereign rollups do not need a settlement layer because they{" "}
            <Link
              href={
                "/learn/intermediates/settlement-in-the-modular-stack#settlement-layers"
              }
            >
              transaction verification
            </Link>
            . Sovereign rollups don’t use the DA layer to verify their
            transactions. Verification is done by the sovereign rollup nodes
            instead.
          </Body>
          <Image
            src={
              "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
            }
            alt={""}
          />
          <Body>
            This means sovereign rollups can use a blockchain as a DA layer even
            if it doesn't support smart contracts like Celestia.
          </Body>
          <Body>
            Now, imagine a developer who wants to build a smart contract rollup
            on a DA layer that doesn't support smart contracts. They can deploy
            their smart contract rollup on an existing sovereign rollup. The
            sovereign rollup acts as the{" "}
            <Link
              href={
                "/learn/intermediates/settlement-in-the-modular-stack#settlement-in-the-modular-stack"
              }
            >
              settlement layer
            </Link>
            , with a native bridge connection and proof verification.
          </Body>
          <Image
            src={
              "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
            }
            alt={""}
          />
          <Body>
            These possibilities allow DA layers, even minimal ones like
            Celestia, to support a wide variation of rollups and other
            blockchain designs.
          </Body>
        </Section>
      </TertiaryPageContainer.Body>
    </TertiaryPageContainer>
  );
};

export default SovereignRollupsMisconceptions;
