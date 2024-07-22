import { Heading, Body } from "@/macros/Copy";
import Container from "@/components/Container/Container";

const ScrollSection = ({ index, children, id }) => {
  return (
    <section
      id={id}
      className={`${index % 2 === 0 ? "bg-white" : "bg-white-weak"} ${
        index > 0 ? "border-t border-black" : null
      }`}
    >
      <Container size={"lg"} className="py-12 lg:py-20">
        {children}
      </Container>
    </section>
  );
};

export default ScrollSection;
