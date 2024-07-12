import Container from "@/components/Container/Container";
import Link from "next/link";
import Image from "next/image";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Body, Label, Display } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";

const SecondaryHero = ({
  title,
  buttons,
  pageIndicator,
  tableOfContents,
  tableIndicator,
}) => {
  return (
    <section className={`bg-white-weak relative`}>
      <Image
        src={`/images/app/homepage/hero-desktop-temp.jpg`}
        layout={`fill`}
        objectFit={`cover`}
        alt=""
        className="z-0"
      />
      <Container size={`lg`} className="relative z-10">
        <div
          className={
            "min-h-screen md:min-h-0 pt-36 pb-16 lg:pt-56 lg:pb-20 flex flex-col lg:w-3/4 xl:w-2/3"
          }
        >
          <div className="row flex">
            <div className={"w-3/4 lg:w-1/2"}>
              <Display size={"md"} className={"mb-10"}>
                {title}
              </Display>
            </div>
            <div className={"w-1/4 lg:w-1/2"}>
              <Body size="sm" className={"text-right lg:text-left"}>
                {pageIndicator}
              </Body>
            </div>
          </div>
          <div className="row h-full flex-grow flex flex-col justify-between lg:flex-row-reverse">
            <div className={"flex mb-10 w-full lg:w-1/2 lg:flex-row-reverse"}>
              <div className={"w-3/4"}>
                <Label tag={"h2"} size={"lg"} className={"mb-6"}>
                  Table of Contents
                </Label>
                <div>
                  {Object.entries(tableOfContents).map(
                    ([key, value], index) => {
                      return (
                        <TableButton key={index} href={value}>
                          {key}
                        </TableButton>
                      );
                    }
                  )}
                </div>
              </div>
              <div className={"w-1/4"}>
                <Body size="sm" className={"text-right lg:text-left"}>
                  [{tableIndicator}]
                </Body>
              </div>
            </div>
            <div className={"w-full lg:w-1/2"}>
              {buttons.map((button, index) => (
                <Link
                  href={button.url}
                  key={index}
                  className="inline-block mr-5 mb-5"
                >
                  <BorderButton>{button.text}</BorderButton>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SecondaryHero;

const TableButton = ({ children, href }) => {
  return (
    <Link href={href} className={`flex items-center group mb-2`}>
      <Body className={`mr-1`} size={"md"}>
        {children}
      </Body>
      <Icon
        border={false}
        transparentBg
        size={"xs"}
        Icon={<div className={"block h-4 w-4"}></div>}
        hover
        HoverIcon={<ArrowLongSVG dark />}
        direction={"down-right"}
      />
    </Link>
  );
};
