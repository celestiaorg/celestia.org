import Container from "@/components/Container/Container";
import Link from "next/link";
import XLHeading from "@/macros/Headings/XLHeading";
import Image from "next/image";
import BorderButton from "@/macros/Buttons/BorderButton";

const PrimaryHero = ({ title, buttons }) => {
  return (
    <section className={`bg-slate-100 relative`}>
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
          <XLHeading className={`mb-10`}>{title}</XLHeading>
          <div>
            {buttons.map((button, index) => (
              <Link
                href={button.url}
                key={index}
                className="inline-block text-black no-underline border-t border-black"
              >
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
