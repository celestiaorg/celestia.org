import Container from "@/components/Container/Container";
import { Heading, Body } from "@/macros/Copy";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

const GetInTouch = () => {
  return (
    <Container size={"xl"} className="mb-10">
      <div className={"bg-white-weak py-10 px-8 lg:px-10 rounded-xl"}>
        <Heading size={"lg"} className={"mb-3"} tag={"h3"}>
          Get in touch
        </Heading>
        <Body size={"md"} className={"mb-10"}>
          Contact us to find solutions for your app&apos;s needs.
        </Body>
        <PrimaryButton
          href={"https://celestia-intake.typeform.com/interest/"}
          className={"table"}
          size={"lg"}
        >
          Get In Touch
        </PrimaryButton>
      </div>
    </Container>
  );
};

export default GetInTouch;
