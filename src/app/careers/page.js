import SecondaryHero from "@/components/Heroes/SecondaryHero";
import TertiaryHero from "@/components/Heroes/TertiaryHero";
import ScrollText from "@/components/ScrollText/ScrollText";
import Introduction from "@/components/Introduction/Introduction";
import { Heading, Display, Body } from "@/macros/Copy";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import ListSection from "@/components/List/Layout/ListSection";
import ListItem from "@/components/List/ListItem";
import Link from "next/link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import ScrollNavigation from "@/components/ScrollNavigation/ScrollNavigation";
import ScrollSection from "@/components/ScrollNavigation/ScrollSection";
import HeadingWithSuperscript from "@/micros/HeadingWithSuperscript/HeadingWithSuperscript";
import { Row, Col } from "@/macros/Grids";
import Image from "next/image";

const content = {
  title: "Careers",
  subtitle:
    "We’re on a mission to change the way that blockchains and decentralized applications are built—making them more secure, sovereign and scalable.",
  text: "Join our team of leading engineers, researchers and entrepreneurs in pioneering the first modular blockchain design.",
  button: {
    text: "Current openings",
    url: "",
  },
  perks: {
    title: "Perks",
    perks: [
      {
        title: "Employment benefits",
        image: "careers/careers-1.svg",
      },
      {
        title: "4 weeks annual vacation",
        image: "careers/careers-2.svg",
      },
      {
        title: "Meaningful long-term compensation package",
        image: "careers/careers-3.svg",
      },
      {
        title: "Flexible and remote work environment",
        image: "careers/careers-4.svg",
      },
    ],
  },
};

export default async function Careers() {
  return (
    <>
      <TertiaryHero
        title={"What is Celestia?"}
        pageIndicator={"2-4"}
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
      <ScrollText id={"what-is-celestia"} lightMode>
        <>We’re on a mission to</>
        <>change the way that</>
        <>blockchains and decentralized </>
        <>applications are built—</>
        <>making them more secure,</>
        <>sovereign and scalable.</>
      </ScrollText>
      <Introduction>
        <Heading size={"md"} className={"mb-4 lg:mb-6"} tag={"p"}>
          Join our team of leading engineers, researchers and entrepreneurs in
          pioneering the first modular blockchain design.
        </Heading>
      </Introduction>
      <ListSection id={"why-celestia"}>
        <ListSection.Header>
          <Display size={"sm"} tag={"h2"} className={"mb-6 lg:mb-10"}>
            Perks
          </Display>
        </ListSection.Header>
        <ListSection.Buttons>
          <Link href={"https://jobs.lever.co/celestia/"}>
            <PrimaryButton size="md" dark className={"table"}>
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
          </Link>
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
