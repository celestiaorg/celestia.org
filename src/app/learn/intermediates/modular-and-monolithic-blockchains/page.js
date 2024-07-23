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

const ModularAndMonolithicBlockchains = () => {
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
        title: "Modular blockchains",
        id: "modular-blockchains",
      },
      {
        title: "Monolithic blockchains",
        id: "monolithic-blockchains",
      },
    ],
  };

  return (
    <TertiaryPageContainer>
      <TertiaryPageContainer.Sidebar>
        <SidebarNavigation
          title={"Modular and monolithic blockchains"}
          anchors={sidebarData}
        />
      </TertiaryPageContainer.Sidebar>
      <TertiaryPageContainer.Body>
        <Section id={"summary"}>
          <Heading tag={"h2"}>Summary</Heading>
          <ListItem type={"number"} index={"1"}>
            The first approach to building blockchains was a monolithic design
            where a single blockchain does everything.
          </ListItem>
          <ListItem type={"number"} index={"2"}>
            The idea of a modular blockchain is that it can specialize in a
            couple of functions instead of trying to do everything. Namely,
            modular blockchains decouple consensus from execution.
          </ListItem>
          <ListItem type={"number"} index={"3"}>
            The monolithic approach causes some inherent problems with scaling,
            which includes expensive hardware, limited control, and high
            overhead.
          </ListItem>
        </Section>
        <Section id={"introduction"}>
          <Heading tag={"h2"}>Introduction</Heading>
          <Body>
            Blockchain researchers have long grappled with the challenge of
            creating the optimal system. Many architectures have been tried
            whose goal was to accommodate all users on a single chain or a
            tightly coupled group of chains that live under a single network.
            This approach has proved limited and complex in scaling a system for
            billions of users. Solutions to this challenge progressed with
            sharding and layer 2 blockchains to provide additional scale to
            layer 1. The concept of splitting blockchains up into separate
            components introduced the idea that a single blockchain doesn’t need
            to do everything on its own.
          </Body>
          <Body>
            The next evolution of that concept is modular blockchains. By making
            the blockchain modular and splitting up its processes among multiple
            specialized layers, a more optimal system can be created that is
            sovereign, scalable, and secure.
          </Body>
        </Section>
        <Section id={"modular-blockchains"}>
          <Heading tag={"h2"}>Modular blockchains</Heading>

          <Body>
            The framework behind modular blockchains lies in the principle of
            modular design. A design is modular if it divides a system into
            smaller parts that can be exchanged or replaced.
          </Body>
          <Body>
            The idea of a modular blockchain is that it can specialize in a
            couple of functions instead of trying to do everything. A more
            scalable and customizable system can be created by combining
            multiple specialized blockchains.
          </Body>
          <Heading tag={"h3"} size={"sm"}>
            The functions that modular blockchains can specialize in are:
          </Heading>
          <ListItem>Execution: Process transactions.</ListItem>
          <ListItem>
            Settlement: Dispute resolution and bridge (optional).
          </ListItem>
          <ListItem>Consensus: Order transactions.</ListItem>
          <ListItem>Data availability: Ensure data is available.</ListItem>
          <Body>
            For example, <Link href={"/glossary/rollup"}>rollups</Link> are a
            type of modular blockchain that specialize in execution. This allows
            them to offload work to other specialized modular blockchains.
            Celestia is an example of a modular blockchain that provides the
            other functions that rollups depend on, like consensus and{" "}
            <Link href={"/glossary/data-availability"}>data availability</Link>.
          </Body>
          <Image
            src={
              "/images/app/learn/Intermediates/modular-and-monolithic-blockchains/Celestia_DA_Execution.jpg"
            }
            alt={""}
          />
          <Body>
            Celestia is different from previous blockchain designs, which had
            execution as core functionality. Recognizing that modularity allows
            blockchains to be created for specific purposes, there is no need
            for execution because that can be the job of a separate chain. Doing
            so enables a more efficient and scalable blockchain.
          </Body>
        </Section>
        <Section id={"monolithic-blockchains"}>
          <Heading tag={"h2"}>Monolithic blockchains</Heading>
          <Body>
            Monolithic blockchains were the first design approach to building
            blockchains. The idea being that a blockchain can do everything.
            That includes things like processing transactions, checking whether
            they’re correct, and getting nodes to agree on them. As opposed to
            modular blockchains that spread out functions over multiple
            specialized chains, monolithic blockchains do everything on a single
            blockchain.
          </Body>
          <Image
            src={
              "/images/app/learn/Intermediates/modular-and-monolithic-blockchains/Monolithic_Modular_V2_without_logo.jpg"
            }
            alt={""}
          />
          <Body>
            This monolithic approach causes some inherent problems with scaling
            while retaining the core principle of decentralization:
          </Body>

          <ListItem>
            High hardware requirements: Monolithic chains can increase the
            number of transactions they process, but it comes at a cost. That
            cost is higher hardware requirements for nodes to verify the chain.
          </ListItem>
          <ListItem>
            Bootstrapping validators: Deploying a new monolithic blockchain
            requires the overhead of bootstrapping a secure validator set and
            maintaining a consensus network.
          </ListItem>
          <ListItem>
            Limited control: Apps must follow the predetermined rules of the
            chain they deploy to. This includes the programming model, ability
            to fork, and community culture, among others.
          </ListItem>
        </Section>
      </TertiaryPageContainer.Body>
    </TertiaryPageContainer>
  );
};

export default ModularAndMonolithicBlockchains;
