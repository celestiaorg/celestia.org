import { socialChannels } from "@/data/community/socialChannels";
import { explore } from "@/data/community/explore";
import { ecosystem } from "@/data/community/ecosystem";
import SecondaryHero from "@/components/Heroes/SecondaryHero";
import Container from "@/components/Container/Container";
import { Col, Row } from "@/macros/Grids";
import { Display, Body } from "@/macros/Copy";
import IconCard from "@/components/Cards/IconCards/IconCard";

export default async function Community() {
  // return (
  //   <main className={`flex min-h-screen flex-col p-24`}>
  //     {/* HERO */}
  //     <div className={`pb-10`}>
  //       <h1 className={``}>Celestia Community</h1>
  //       <p className={``}>Discover community hubs, discussion forums, and resources that are used by the global Celestia community.</p>
  //     </div>

  //     <hr />

  //     {/* SOCIAL CHANNELS */}
  //     <div className={`pb-10`}>
  //       <h2 className={``}>{socialChannels.title}</h2>
  //       <p>{socialChannels.description}</p>
  //       <div className={``}>
  //         {socialChannels.items.map((item, index) => (
  //           <a className={"block"} key={index} href={item.url}>
  //             <h3>{item.title}</h3>
  //             <p>{item.text}</p>
  //           </a>
  //         ))}
  //       </div>
  //     </div>

  //     <hr />

  //     {/* EXPLORE */}
  //     <div className={`pb-10`}>
  //       <h2 className={``}>{explore.title}</h2>
  //       <p>{explore.description}</p>
  //       <div className={``}>
  //         {explore.items.map((item, index) => (
  //           <a className={"block"} key={index} href={item.url}>
  //             <h3>{item.title}</h3>
  //             <p>{item.text}</p>
  //           </a>
  //         ))}
  //       </div>
  //     </div>

  //     <hr />

  //     {/* ECOSYSTEM */}
  //     <div className={`pb-10`}>
  //       <h2 className={``}>{ecosystem.title}</h2>
  //       <p>{ecosystem.description}</p>
  //       <a href={ecosystem.button.url} className={``}>{ecosystem.button.text}</a>
  //     </div>

  //   </main >
  // );

  const socialGroups = [
    {
      cards: [
        {
          icon: "twitter",
          title: "X (Twitter)",
          description: "The latest news and updates.",
          url: "https://twitter.com/CelestiaOrg/",
        },
        {
          icon: "discord",
          title: "Discord",
          description: "A hub for developers, node operators, and enthusiasts.",
          url: "https://discord.com/invite/YsnTPcSfWQ",
        },
        {
          icon: "telegram",
          title: "Telegram",
          description: "Chat with the worldwide community.",
          url: "https://t.me/CelestiaCommunity/",
        },
        {
          icon: "reddit",
          title: "Reddit",
          description: "The Celestia community on Reddit.",
          url: "https://www.reddit.com/r/CelestiaNetwork/",
        },
        {
          icon: "github",
          title: "Github",
          description: "Developer discussions and protocol contributions.",
          url: "https://github.com/celestiaorg/",
        },
        {
          icon: "forum",
          title: "Forum",
          description: "Ask questions and engage in research discussions.",
          url: "https://forum.celestia.org/",
        },
      ],
    },
  ];

  const exploreGroups = [
    {
      cards: [
        {
          icon: "youtube",
          title: "Youtube",
          description:
            "A library of tutorials, guides, and ecosystem interviews.",
          url: "https://www.youtube.com/channel/UCLlvAEzXBFZ-P3zS6BF2Bjg/",
        },
        {
          icon: "podcast",
          title: "Podcast",
          description: "Interviews and talks in audio form.",
          url: "https://podcast.celestia.org/",
        },
        {
          icon: "resources",
          title: "Resources",
          description: "A collection of videos, podcasts, and blog posts.",
          url: "/resources",
        },
        {
          icon: "blog",
          title: "Blog",
          description: "News and updates from Celestia Labs.",
          url: "https://blog.celestia.org/",
        },
      ],
    },
  ];

  const tableOfContents = {
    "Social channels": "#social",
    "Explore more": "#explore",
  };

  return (
    <>
      <SecondaryHero
        title={"Celestia Community"}
        pageIndicator={"2-4"}
        tableIndicator={"0-0"}
        buttons={[
          {
            text: (
              <>
                Learn more{" "}
                <span className={"sr-only"}>about the Celestia Community</span>
              </>
            ),
            url: "#social",
            iconDirection: "down-right",
          },
        ]}
        tableOfContents={tableOfContents}
      />

      <section id={"social"} className="bg-black text-white">
        <Container size={"lg"} className={"py-10 lg:py-24"}>
          <Row className={"mb-6 lg:mb-16"}>
            <Col width={60}>
              <Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-0"}>
                Social channels
              </Display>
            </Col>
            <Col width={40}>
              <Body size={"md"}>
                Communication channels for the community, discussions, updates,
                and news.
              </Body>
            </Col>
          </Row>
          <Row>
            <Col width={100}>
              {socialGroups.map((group, index) => (
                <div
                  className="w-full grid grid-cols-1 gap-4 mb-4"
                  key={`cardGroup-${index}`}
                >
                  {group.cards.map((card, index) => (
                    <IconCard
                      dark
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

      <section id={"explore"} className="bg-white-weak text-black">
        <Container size={"lg"} className={"py-10 lg:py-24"}>
          <Row className={"mb-6 lg:mb-16"}>
            <Col width={60}>
              <Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-0"}>
                Explore more
              </Display>
            </Col>
            <Col width={40}>
              <Body size={"md"}>Keep up with new resources and content.</Body>
            </Col>
          </Row>
          <Row>
            <Col width={100}>
              {exploreGroups.map((group, index) => (
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
      <div className="bg-black w-fill h-10 -mb-10 block"></div>
    </>
  );
}
