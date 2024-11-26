import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";
import Image from "next/image";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Body, Label, Display } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";

const SecondaryHero = ({
  title,
  subtitle,
  buttons,
  pageIndicator,
  tableOfContents,
  tableIndicator,
  videos,
}) => {
  return (
    <section
      className={`bg-white-weak relative lg:min-h-[80vh] flex flex-col-reverse md:block`}
    >
      {videos && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className={
            "block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-full w-full md:object-cover md:z-0"
          }
        >
          <source
            src={videos.src.xl}
            type="video/mp4"
            media="(min-width: 1024px)"
          />
          <source
            src={videos.src.lg}
            type="video/mp4"
            media="(min-width: 768px)"
          />
          <source
            src={videos.src.sm}
            type="video/mp4"
            media="(max-width: 767px)"
          />
          {videos.poster.lg && (
            <img src={videos.poster.lg} alt="" media="(min-width: 768px)" />
          )}
          {videos.poster.sm && (
            <img src={videos.poster.sm} alt="" media="(max-width: 767px)" />
          )}
        </video>
      )}

      <Container size={`lg`} className="relative z-10">
        <div
          className={"pt-36 lg:pt-56 lg:pb-20 flex flex-col lg:w-3/4 xl:w-2/3"}
        >
          <div className="row flex">
            <div className={"w-3/4 lg:w-1/2"}>
              <Display size={"md"} className={`${subtitle ? "mb-3" : "mb-10"}`}>
                {title}
              </Display>
              {subtitle && (
                <Body size="md" className={"mb-10"}>
                  {subtitle}
                </Body>
              )}
            </div>
            <div className={"w-1/4 lg:w-1/2"}>
              <Body size="sm" className={"text-right lg:text-left"}>
                {pageIndicator}
              </Body>
            </div>
          </div>
          <div className="row h-full flex-grow flex flex-col justify-between lg:flex-row-reverse">
            <div
              className={"flex md:mb-10 w-full lg:w-1/2 lg:flex-row-reverse"}
            >
              {tableOfContents && (
                <>
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
                </>
              )}
            </div>

            <div className={"w-10/12 lg:w-1/2 xl:w-5/12"}>
              {buttons?.length > 0 &&
                buttons.map((button, index) => (
                  <BorderButton
                    href={button.url}
                    key={index}
                    className="inline-flex clear-both w-full"
                    iconDirection={button.iconDirection || "down-right"}
                  >
                    {button.text}
                  </BorderButton>
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
