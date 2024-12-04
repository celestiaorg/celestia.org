import Container from "@/components/Container/Container";
import { Col, Row } from "@/macros/Grids";
import { Display, Body } from "@/macros/Copy";
import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";

const Whitepapers = ({ papers }) => {
  return (
    <section id={"whitepapers"} className="bg-black text-white">
      <Container size={"lg"} className={"pt-20 pb-12 lg:pt-12"} padding={false}>
        <Row className={""}>
          <Col width={60}>
            <Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-6"}>
              How developers can build on Celestia’s DA layer
            </Display>
          </Col>
          <Col width={40} className="lg:flex">
            <Body size={"md"} className={"mb-6 lg:mb-0"}>
              You can launch your chain as easily as a smart contract with
              Celestia underneath. Here’s how you can start:
            </Body>
          </Col>
        </Row>
        {/* Mobile overflow scroll layout */}
        <div className="block md:hidden">
          <Row>
            <Col width={100}>
              <div className="flex overflow-x-scroll w-auto no-scrollbar gap-4 mb-4 pr-4">
                {papers.map((paper, index) => (
                  <VerticalTitleCard
                    key={index}
                    verticalTitle={paper.topic}
                    title={paper.title}
                    description={paper.subtitle}
                    url={paper.url}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </div>
        {/* Desktop grid layout */}
        <div className="hidden md:block">
          <Row>
            <Col width={100}>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {papers.map((paper, index) => (
                  <VerticalTitleCard
                    key={index}
                    verticalTitle={paper.topic}
                    title={paper.title}
                    description={paper.subtitle}
                    url={paper.url}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Whitepapers;
