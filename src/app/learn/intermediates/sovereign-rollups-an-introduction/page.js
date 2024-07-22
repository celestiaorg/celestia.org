import TertiaryPageContainer from "@/components/Container/TertiaryPageContainer";
import SidebarNavigation from "@/components/SidebarNavigation/SidebarNavigation";
import {
  Heading,
  Body,
  Image,
  ListItem,
  Section,
} from "@/micros/TertiaryPageMicors/TertiaryPageMicors";

const SovereignRollupsAnIntroduction = () => {
  const sidebarData = {
    sections: [
      {
        title: "Summary",
        id: "summary",
      },
    ],
  };

  return (
    <TertiaryPageContainer>
      <TertiaryPageContainer.Sidebar>
        <SidebarNavigation title={"First Principles"} anchors={sidebarData} />
      </TertiaryPageContainer.Sidebar>
      <TertiaryPageContainer.Body>
        <Section id={"summary"}>
          <Heading tag={"h2"}>Summary</Heading>
          <ListItem type={"number"} index={"1"}>
            Modular blockchains prioritize decentralization for network security
            by reducing the cost for users to operate nodes and verify the
            network.
          </ListItem>
          <Body>
            Learning a concept by starting at its foundation provides the best
            path to reaching proficiency. Like any concept, modular blockchains
            are no different. They come with their own set of fundamental
            concepts that require understanding to grasp the advanced material.
            By beginning with the first principles of modular blockchains, their
            purpose and goals will become easier to understand.
          </Body>
          <Image
            src={
              "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
            }
            alt={""}
          />
        </Section>
      </TertiaryPageContainer.Body>
    </TertiaryPageContainer>
  );
};

export default SovereignRollupsAnIntroduction;
