import Container from "@/components/Container/Container";
import { Row, Col } from "@/macros/Grids";
import { Heading, Body } from "@/macros/Copy";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import Image from "next/image";

const GetInTouch = () => {
  return (
    <Container size={"xl"} className="mb-10">
      <div className={"bg-purple text-white rounded-xl"}>
        <Row>
          <Col width={40} className="py-10 px-8 lg:px-10">
            <Heading size={"lg"} className={"mb-3"} tag={"h3"}>
              Explore your
              <br />
              options
            </Heading>
            <Body size={"md"} className={"mb-10"}>
              Contact us to find solutions for your app&apos;s needs.
            </Body>
            <PrimaryButton
              href={"https://celestia-intake.typeform.com/interest/"}
              className={"table bg-white"}
              size={"lg"}
              lightMode
            >
              Get In Touch
            </PrimaryButton>
          </Col>
          <Col width={60} className="relative min-h-56">
            <Image
              src={"/images/components/callToActions/getInTouch-mobile.png"}
              alt={""}
              className={"w-full object-cover object-top lg:hidden"}
              fill
              unoptimized
            />
            <Image
              src={"/images/components/callToActions/getInTouch-desktop.png"}
              alt={""}
              className={"w-full object-cover object-left hidden lg:block"}
              fill
              unoptimized
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default GetInTouch;
