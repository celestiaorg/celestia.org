import TertiaryHero from "@/components/Heroes/TertiaryHero";
import ScrollText from "@/components/ScrollText/ScrollText";
import Introduction from "@/components/Introduction/Introduction";
import { Heading, Display } from "@/macros/Copy";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import ListSection from "@/components/List/Layout/ListSection";
import ListItem from "@/components/List/ListItem";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";

import meta from "@/components/Meta/Meta";
import seo from "@/data/careers/seo";

export const metadata = meta(seo);

export default async function Careers() {
  return (
    <>
      <TertiaryHero
        title={"Careers"}
        pageIndicator={"1-3"}
        buttons={[
          {
            text: "See perks",
            url: "#perks",
          },
        ]}
        blurbTitle={
          "Join Celestia to shape the future of blockchains and decentralized applications. Work with top experts in a dynamic environment."
        }
      />
      <ScrollText
        id={"what-is-celestia"}
        lightMode
        gradientText
        gradientType="secondary"
      >
        <>Make chains as</>
        <>easy to deploy</>
        <>as smart contracts</>
      </ScrollText>
      <Introduction>
        <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"p"}>
          Join our team of leading engineers, researchers and entrepreneurs in
          pioneering the first modular blockchain design.
        </Heading>
      </Introduction>
      <ListSection id={"perks"}>
        <ListSection.Header>
          <Display size={"sm"} tag={"h2"} className={"mb-6 lg:mb-10"}>
            Perks
          </Display>
        </ListSection.Header>
        <ListSection.Buttons>
          <PrimaryButton
            href={"https://jobs.lever.co/celestia/"}
            size="md"
            dark
            className={"table"}
          >
            <div
              className={
                "w-full inline-flex justify-between items-center group gap-2"
              }
            >
              <span>Current openings</span>
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
        </ListSection.Buttons>
        <ListSection.Body>
          <ListItem type={"star"}>Employment benefits</ListItem>
          <ListItem type={"star"}>4 weeks annual vacation</ListItem>
          <ListItem type={"star"}>
            Meaningful long-term compensation package
          </ListItem>
          <ListItem type={"star"}>
            Flexible and remote work environment
          </ListItem>
        </ListSection.Body>
      </ListSection>
      <div className="bg-black w-fill h-10 -mb-10 block"></div>
    </>
  );
}
