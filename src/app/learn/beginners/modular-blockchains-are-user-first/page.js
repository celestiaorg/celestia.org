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

import meta from "@/components/Meta/Meta";

export const metadata = meta({
  title: "Modular blockchains are user-first",
  description:
    "Blockchains are a social movement as much as they are a technology. Without values, blockchains would be no better than web2 tech companies. Here are the values that modular blockchains aim for.",
});

const ModularBlockchainsAreUserFirst = () => {
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
        title: "Users are first-class citizens",
        id: "users-are-first-class-citizens",
      },
      {
        title: "Modularism, not maximalism",
        id: "modularism-not-maximalism",
      },
      {
        title: "Sovereign communities",
        id: "sovereign-communities",
      },
    ],
  };

  return (
    <TertiaryPageContainer>
      <TertiaryPageContainer.Sidebar>
        <SidebarNavigation
          title={"Values of modular blockchains"}
          anchors={sidebarData}
        />
      </TertiaryPageContainer.Sidebar>
      <TertiaryPageContainer.Body>
        <Section id={"summary"}>
          <Heading tag={"h2"}>Summary</Heading>
          <ListItem type={"number"} index={"1"}>
            Modular blockchains make users first class citizens by enabling them
            to directly verify the blockchain.
          </ListItem>
          <ListItem type={"number"} index={"2"}>
            Modularism, not maximalism: building blockchain infrastructure
            should be collaborative, not competitive.
          </ListItem>
          <ListItem type={"number"} index={"3"}>
            Modular blockchains enable communities to become sovereign, enabling
            them to self-organize independently.
          </ListItem>
        </Section>
        <Section id={"introduction"}>
          <Heading tag={"h2"}>Introduction</Heading>
          <Body>
            Blockchains are a social movement as much as they are a technology.
            They help communities of people independently organize and carry out
            their goals. Of course, this means that blockchains themselves need
            to stand for certain values. Without values, blockchains would be no
            better than web2 tech companies. Here are the values that modular
            blockchains aim for.
          </Body>
        </Section>
        <Section id={"users-are-first-class-citizens"}>
          <Heading tag={"h2"}>Users are first-class citizens</Heading>
          <Body>
            The point of open blockchains is that they are verifiable. Anybody
            should be able to run a node and personally verify that the network
            is operating correctly. While{" "}
            <Link href={"/glossary/validator"}>validators</Link> are responsible
            for processing transactions, the users who run nodes make sure that
            validators are behaving correctly. If a validator decides to act
            negatively, users can verify the behavior and punish it accordingly
            - through on-chain penalties like{" "}
            <Link href={"/glossary/slashing"}>slashing</Link> or socially
            through forking.
          </Body>
          <Body>
            Since blockchains depend on users running nodes to keep the network
            secure, modular blockchains aim to minimize the cost of running a
            node. If running a node is too expensive, not many users will be
            able to afford it. This reduces the security of the chain, which
            could make it easier to attack.
          </Body>
          <Body>
            {" "}
            With new innovations like{" "}
            <Link href={"/glossary/state-transition-fraud-proof/"}>
              fraud
            </Link>{" "}
            or <Link href={"/glossary/validity-proof"}>validity proofs</Link>{" "}
            and{" "}
            <Link href={"/glossary/data-availability-sampling"}>
              data availability sampling
            </Link>
            , users can run a low-cost node that has the same security as a more
            expensive full node. By keeping the cost low for users to run nodes,
            they can personally verify and participate as first-class citizens
            of the network.
          </Body>
        </Section>
        <Section id={"modularism-not-maximalism"}>
          <Heading tag={"h2"}>Modularism, not maximalism</Heading>
          <Body>Back to the game…</Body>
          <Body>
            Most effort spent building blockchains has gone towards new L1s. The
            problem is that each new L1 creates its own walled-off ecosystem
            that competes with every other L1. This leads to maximalism as they
            all fight to bring in new users to their ecosystem.
          </Body>
          <Body>
            Modular blockchains create a collaborative environment with many
            connected chains. Each new user that a modular blockchain brings in
            creates value for the whole modular ecosystem, not just a single L1.
            Modular blockchains collaborate while monolithic L1s compete.
          </Body>
          <Image
            src={
              "/images/app/learn/beginners/modular-blockchains-are-user-first/Monolithic_Modular_Aproach_V2_No_Logo.jpg"
            }
            alt={""}
          />
          <Body>
            The other benefit of collaboration is that developers can reuse and
            build on existing modular blockchains. This allows them to mix and
            match the components they need instead of building an entirely new
            L1 whose tech is limited to a single chain.
          </Body>
        </Section>
        <Section id={"sovereign-communities"}>
          <Heading tag={"h2"}>Sovereign communities</Heading>
          <Body>
            Blockchains enable sovereignty by allowing groups of people to
            organize in a shared setting without requiring a trusted
            intermediary. Modular blockchains, in particular, give communities
            the option of sovereignty. With{" "}
            <Link href={"/glossary/sovereign-rollup"}>sovereign rollups</Link>,
            communities can own a chain that is independent.
          </Body>
          <Body>
            If part of the community has different goals from the rest of the
            group and wants to pursue their own vision, they can fork the
            sovereign rollup and organize it around their community and mission.
            Sovereignty provides complete flexibility and freedom to the
            community.
          </Body>
          <Body>
            If the community does not require sovereignty, they can
            alternatively choose to use a chain that is shared by many other
            distinct communities. The flexibility of choice over sovereignty is
            completely up to the communities choice, aided by modular
            blockchains.
          </Body>
        </Section>
      </TertiaryPageContainer.Body>
    </TertiaryPageContainer>
  );
};

export default ModularBlockchainsAreUserFirst;
