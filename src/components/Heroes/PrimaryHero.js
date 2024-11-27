import Container from "@/components/Container/Container";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Display, Body } from "@/macros/Copy";

const PrimaryHero = ({ headline, subheadline, buttons, videos }) => {
  return (
    <section
      className={`bg-white-weak relative lg:min-h-[90vh] flex flex-col-reverse md:block`}
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
      <Container size={`lg`} className="relative z-10 pt-36 lg:pt-96 lg:pb-40">
        <div className={`w-full md:w-3/4 lg:w-1/2`}>
          <Display size={"lg"} className={`mb-4`}>
            {headline}
          </Display>
          <Body size={"lg"} className={`mb-8`}>
            {subheadline}
          </Body>
          <div className="flex flex-wrap gap-4 lg:gap-10">
            {buttons.map((button, index) => (
              <BorderButton
                href={button.url}
                key={index}
                className="inline-flex"
              >
                {button.text}
              </BorderButton>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PrimaryHero;
