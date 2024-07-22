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

const TheModularStack = () => {
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
        title: "The Modular Blockchain Stack",
        id: "the-modular-blockchain-stack",
      },
      {
        title: "Layer 1 and 2",
        id: "layer-1-and-2",
      },
      {
        title: "Execution, settlement, and data availability",
        id: "execution-settlement-and-data-availability",
      },
      {
        title: "Execution and data availability",
        id: "execution-and-data-availability",
      },
    ],
  };

  return (
    <TertiaryPageContainer>
      <TertiaryPageContainer.Sidebar>
        <SidebarNavigation title={"The modular stack"} anchors={sidebarData} />
      </TertiaryPageContainer.Sidebar>
      <TertiaryPageContainer.Body>
        <Section id={"summary"}>
          <Heading tag={"h2"}>Summary</Heading>
          <ListItem type={"number"} index={"1"}>
            Naive modular stacks were initially introduced with layer 2s,
            providing scalability to a monolithic layer 1 blockchain.
          </ListItem>
          <ListItem type={"number"} index={"2"}>
            Optimized modular stacks split the functions across multiple
            specialized blockchains. These modular stacks can take multiple
            forms to serve varying goals.
          </ListItem>
          <ListItem type={"number"} index={"3"}>
            A modular stack can also use three layers, where an execution layer
            sits atop a settlement layer with an underlying data availability
            layer. This stack can introduce other desireable features, like
            bridging and liquidity.
          </ListItem>
        </Section>
        <Section id={"introduction"}>
          <Heading tag={"h2"}>Introduction</Heading>
          <Body>
            A new paradigm is emerging in which modular blockchains are enabling
            new chains to be constructed in ways that were not previously
            possible. Because of this, the design possibilities are vast for
            both the individual blockchain and the modular stack it is a part
            of. Different types of modular blockchains can work in a
            collaborative manner, varying by purpose and architecture.
          </Body>
        </Section>
        <Section id={"the-modular-blockchain-stack"}>
          <Heading tag={"h2"}>The Modular Blockchain Stack</Heading>
          <Body>
            The four functions that modular blockchains can consist of are
            execution, settlement, consensus, and data availability.
          </Body>
          <ListItem>
            Execution: The environment where applications live and state changes
            are executed.
          </ListItem>
          <ListItem>
            Settlement: An optional hub for execution layers to verify proofs,
            resolve fraud disputes, and bridge between other execution layers.
          </ListItem>
          <ListItem>
            Consensus: Agreement on the order of transactions.
          </ListItem>
          <ListItem>
            Data availability: Verification that transaction data is available
            to download.
          </ListItem>
          <Body>
            It is typical for layers within a modular stack to provide more than
            one function, as in many cases it is impractical to have one without
            another. For example, a modular blockchain that specializes in data
            availability also requires consensus to order the data, otherwise
            the history of the data can’t be determined.
          </Body>
        </Section>
        <Section id={"layer-1-and-2"}>
          <Heading tag={"h2"}>Layer 1 and 2</Heading>
          <Body>
            Naive modular stacks were initially constructed to provide
            scalability to a monolithic layer 1. In this stack, layer 1 provides
            all key functions—including execution—while layer 2 specializes only
            in execution.
          </Body>
          <Image
            src={
              "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
            }
            alt={""}
          />
          <Body>
            The most prominent type of layer 2 is a rollup, which provides an
            environment for applications to be deployed to, and for transactions
            to be processed that interact with those applications. Layer 1
            supports the rollup by allowing it to publish its blocks, which at
            minimum ensures that the transaction data in the block is ordered
            and available. Since layer 1 also has execution capabilities, it can
            ensure the validity of transactions if the layer 2 requires.
            Additionally, the layer 1 can also act as a hub to connect layer 2s,
            allowing them to bridge tokens and liquidity between them.
          </Body>
          <Body>
            Essentially, the layer 1 is a monolithic chain that receives
            additional scale from layer 2. In most cases, the capacity of layer
            2 is also dependent on layer 1s capacity. As a result, this
            implementation of a layer 1 & layer 2 stack is suboptimal for
            scalability.
          </Body>
        </Section>
        <Section id={"execution-settlement-and-data-availability"}>
          <Heading tag={"h2"}>
            Execution, settlement, and data availability
          </Heading>
          <Body>
            To optimize more of the benefits that a modular blockchain stack can
            provide, the functions can be decoupled across specialized modular
            blockchains.
          </Body>
          <Image
            src={
              "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
            }
            alt={""}
          />
          <Body>
            The execution layer sits at the top of the stack and plays the same
            role as layer 2 in the previous stack. Modular stacks beyond layer 1
            and 2 are more flexible in their construction, requiring more
            specific naming that is coherent with the functionality that each
            layer provides.
          </Body>
          <Body>
            The settlement layer is unique to that of regular layer 1s that
            provide settlement because it decouples the settlement functionality
            from the rest of the functions. The result is an execution chain
            that can be used specifically for settlement, enabling a{" "}
            <Link href={"/glossary/trust-minimized-bridge"}>
              trust-minimized bridge
            </Link>{" "}
            between the execution and settlement layer and providing a way by
            which execution layers can bridge between each other.
          </Body>
          <Body>
            The execution layer may choose to publish its full blocks to the
            settlement layer, after which the settlement layer will build its
            own blocks that include transactions from the execution layer and
            publish the transaction data to the consensus and data availability
            layer. This is only one of multiple ways that the settlement layer
            could function within the modular stack.
          </Body>
          <Body>
            At the bottom of this construction is the consensus and data
            availability layer. As the name suggests, it only provides consensus
            over the order of transactions and verifies that their data is
            available. Because there is no execution functionality, only
            transaction data is published by the settlement layer rather than
            the contents of the entire block.
          </Body>
        </Section>
        <Section id={"execution-and-data-availability"}>
          <Heading tag={"h2"}>Execution and data availability</Heading>
          <Body>
            In the previous two modular stacks, the execution layer solely
            focused on execution and off-loaded the remaining functions to other
            layers. However, because modular blockchains are flexible in the
            purposes they can provide, an execution layer isn’t only limited to
            only posting its blocks to a settlement layer. For example, a
            modular stack can be created that involves no settlement layer, only
            an execution layer on top of a consensus and data availability
            layer.
          </Body>
          <Image
            src={
              "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
            }
            alt={""}
          />
          <Body>
            Under this modular stack, the execution layer would be sovereign
            such that it has the ability to{" "}
            <Link href={"/glossary/fork"}>fork</Link>, and for its nodes to
            determine which execution rules are canonical. If the execution
            layer is a rollup and requires{" "}
            <Link href={"/glossary/state-transition-fraud-proof"}>
              fraud proofs
            </Link>{" "}
            or <Link href={"/glossary/validity-proof"}>validity proofs</Link> to
            be verified, they can be distributed through the rollup&apos;s
            peer-to-peer layer rather than published to a settlement layer.
            Validity proofs would be distributed with each block, and fraud
            proofs only during{" "}
            <Link href={"/glossary/dispute-resolution"}>disputes</Link>.
          </Body>
        </Section>
      </TertiaryPageContainer.Body>
    </TertiaryPageContainer>
  );
};

export default TheModularStack;
