import TertiaryHero from "@/components/Heroes/TertiaryHero";
import Container from "@/components/Container/Container";
import { Col, Row } from "@/macros/Grids";
import { Display } from "@/macros/Copy";
import IconCard from "@/components/Cards/IconCards/IconCard";
import GetInTouch from "@/components/CallToActions/GetInTouch";

import meta from "@/components/Meta/Meta";
import seo from "@/data/press/seo";

export const metadata = meta(seo);

export default async function Press() {
  const quickLinksGroups = [
    {
      cards: [
        {
          icon: "forum",
          title: "Branding",
          description:
            "The key brand resources and fundamentals to get started with our brand. Find logos, colors and typography specs.",
          url: "https://company-223625.frontify.com/d/JoSwaZS4Mjpj/guidelines/",
        },
        {
          icon: "blog",
          title: "News",
          description:
            "Power up a light node in under 3 mStay updated with our latest news! Explore our blog and discover insightful articles, updates, and stories.inutes with Docker.",
          url: "https://blog.celestia.org/",
        },
        {
          icon: "social",
          title: "Social",
          description: "A collection of videos, podcasts, and blog posts.",
          url: "/community",
        },
        {
          icon: "email",
          title: "Enquiries",
          description:
            "Do you need further assistance? Feel free to reach out via email and share your needs with us. We're here to help!",
          url: "mailto:press@celestia.org",
        },
      ],
    },
  ];
  return (
    <>
      <TertiaryHero
        title={"Press & Media"}
        pageIndicator={"2-4"}
        blurbTitle={"Find branding, news, social channels, and press contacts"}
      />
      <section id={"explore"} className="bg-white text-black">
        <Container size={"md"} className={"py-10 lg:py-24"}>
          <Row className={"mb-6 lg:mb-16"}>
            <Col width={100}>
              <Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-0"}>
                Quick links
              </Display>
            </Col>
          </Row>
          <Row>
            <Col width={100}>
              {quickLinksGroups.map((group, index) => (
                <div
                  className="w-full grid grid-cols-1 gap-4 mb-4"
                  key={`cardGroup-${index}`}
                >
                  {group.cards.map((card, index) => (
                    <IconCard
                      key={index}
                      title={card.title}
                      description={card.description}
                      url={card.url}
                      icon={card.icon}
                    />
                  ))}
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
      <GetInTouch />
    </>
  );
}
