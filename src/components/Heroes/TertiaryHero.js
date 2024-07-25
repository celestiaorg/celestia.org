import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Body, Heading, Display } from "@/macros/Copy";

const TertiaryHero = ({
  title,
  buttons,
  pageIndicator,
  ctaIndicator,
  blurbTitle,
  blurbCopy,
}) => {
  return (
    <section
      className={`bg-white-weak relative border-b border-black lg:min-h-[550px]`}
    >
      <Container size={`lg`} className="relative z-10">
        <div className={"pt-36 pb-16 lg:pt-56 lg:pb-20 lg:flex"}>
          <div className="lg:w-7/12">
            <div className="flex">
              <div className={"w-3/4 lg:w-2/3"}>
                <Display size={"sm"} className={"mb-10"}>
                  {title}
                </Display>
              </div>
              <div className={"w-1/4 lg:w-1/3"}>
                <Body size="sm" className={"text-right lg:text-left"}>
                  {pageIndicator}
                </Body>
              </div>
            </div>
            {buttons && (
              <div className={"flex mb-5"}>
                <div className={"w-2/3"}>
                  {buttons.map((button, index) => (
                    <Link
                      href={button.url}
                      key={index}
                      className="inline-block mr-5 mb-5"
                    >
                      <BorderButton iconDirection={button.iconDirection}>
                        {button.text}
                      </BorderButton>
                    </Link>
                  ))}
                </div>
                {ctaIndicator && (
                  <div className={"w-1/3"}>
                    <Body size="sm" className={"text-right lg:text-left"}>
                      [{ctaIndicator}]
                    </Body>
                  </div>
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
