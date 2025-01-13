import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Body, Heading, Display } from "@/macros/Copy";

const TertiaryHero = ({
  title,
  buttons,
  ctaIndicator,
  blurbTitle,
  blurbCopy,
}) => {
  return (
    <section
      className={`bg-white-weak relative border-b border-black lg:min-h-[750px]`}
    >
      <Container size={`lg`} className="relative z-10">
        <div className={"pt-36 pb-24 lg:pt-56 lg:pb-32 lg:flex"}>
          <div className="lg:w-7/12">
            <div className="flex">
              <div className={"w-full"}>
                <Display size={"sm"} className={"mb-10"}>
                  {title}
                </Display>
              </div>
            </div>
            {buttons && (
              <div className={"flex mb-5"}>
                <div className={"w-full md:w-2/3 pr-6"}>
                  {buttons.map((button, index) => (
                    <BorderButton
                      href={button.url}
                      key={index}
                      className={`inline-flex clear-both ${
                        buttons.length > 1 ? "w-full" : ""
                      }`}
                      iconDirection={button.iconDirection}
                    >
                      {button.text}
                    </BorderButton>
                  ))}
                </div>
                {ctaIndicator ? (
                  <div className={"w-1/3"}>
                    <Body size="sm" className={"text-right lg:text-left"}>
                      [{ctaIndicator}]
                    </Body>
                  </div>
                ) : (
                  <div className="lg:w-2/3"></div>
                )}
              </div>
            )}
          </div>
          <div className="lg:w-5/12">
            <Heading tag={"h2"} size={"md"} className={"mb-2 lg:mb-6"}>
              {blurbTitle}
            </Heading>
            {blurbCopy && <Body size="md">{blurbCopy}</Body>}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TertiaryHero;
