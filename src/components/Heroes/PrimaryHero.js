import Container from "@/components/Container/Container";
import Link from "next/link";
import Image from "next/image";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Display } from "@/macros/Copy";
import TypeText from "@/animations/TypeText";

const PrimaryHero = ({ title, buttons }) => {
  return (
    <section className={`bg-white-weak relative`}>
      <Image
        src={`/images/app/homepage/hero-desktop-temp.jpg`}
        layout={`fill`}
        objectFit={`cover`}
        alt=""
        className="z-0"
      />
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
