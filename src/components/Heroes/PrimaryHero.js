import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Display } from "@/macros/Copy";
import TypeText from "@/animations/TypeText";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";

const PrimaryHero = ({ title, buttons }) => {
  return (
    <section className={`bg-white-weak relative lg:min-h-[550px]`}>
      <VideoPlayer src={"/videos/homepage-hero.mp4"} />
      <Container
        size={`lg`}
        className="relative z-10 min-h-screen md:min-h-0 pt-36 pb-16 lg:pt-96 lg:pb-40"
      >
        <div className={`w-full md:w-3/4 lg:w-7/12`}>
          {/* TODO: finish hero text animation */}
          {/* <XLHeading className={`mb-10`}>
            <TypeText message={title} />
          </XLHeading> */}
          <Display size={"lg"} className={`mb-10`}>
            {title}
          </Display>
          <div>
            {buttons.map((button, index) => (
              <Link href={button.url} key={index} className="inline-block">
                <BorderButton>{button.text}</BorderButton>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PrimaryHero;
