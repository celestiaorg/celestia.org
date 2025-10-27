import EcosystemPage from "@/components/CallToActions/EcosystemPage";
import IconCard from "@/components/Cards/IconCards/IconCard";
import Container from "@/components/Container/Container";
import SecondaryHero from "@/components/Heroes/SecondaryHero";
import { Body, Display } from "@/macros/Copy";
import { Col, Row } from "@/macros/Grids";

import Meta from "@/components/Meta/Meta";
import seo from "@/data/community/seo";

export const metadata = Meta(seo);

export default async function Community() {
	const socialGroups = [
		{
			cards: [
				{
					icon: "twitter",
					title: "X (Twitter)",
					description: "The latest news and updates.",
					url: "https://x.com/celestia",
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
					description: "A library of tutorials, guides, and ecosystem interviews.",
					url: "https://www.youtube.com/channel/UCLlvAEzXBFZ-P3zS6BF2Bjg/",
				},
				{
					icon: "podcast",
					title: "Podcast",
					description: "Interviews and talks in audio form.",
					url: "https://podcast.celestia.org/",
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
				subtitle={"Discover community hubs, discussion forums, and resources that are used by the global Celestia community."}
				videos={{
					src: {
						xl: "/videos/hero/mod-desktop_xl.mp4",
						lg: "/videos/hero/mod-desktop_lg.mp4",
						sm: "/videos/hero/mod-mobile_sm.mp4",
					},
					poster: {
						lg: "/videos/hero/mod-desktop_xl_poster.jpg",
						sm: "/videos/hero/mod-mobile_sm_poster.jpg",
					},
				}}
			/>
			<section id={"social"} className='text-white bg-black'>
				<Container size={"md"} className={"py-10 lg:py-24"}>
					<Row className={"mb-6 lg:mb-16"}>
						<Col width={60}>
							<Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-0"}>
								Social channels
							</Display>
						</Col>
						<Col width={40}>
							<Body size={"md"}>Communication channels for the community, discussions, updates, and news.</Body>
						</Col>
					</Row>
					<Row>
						<Col width={100}>
							{socialGroups.map((group, index) => (
								<div className='grid w-full grid-cols-1 gap-4 mb-4' key={`cardGroup-${index}`}>
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
			<section id={"explore"} className='text-black bg-white'>
				<Container size={"md"} className={"py-10 lg:py-24"}>
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
								<div className='grid w-full grid-cols-1 gap-4 mb-4' key={`cardGroup-${index}`}>
									{group.cards.map((card, index) => (
										<IconCard key={index} title={card.title} description={card.description} url={card.url} icon={card.icon} />
									))}
								</div>
							))}
						</Col>
					</Row>
				</Container>
			</section>
			<EcosystemPage />
		</>
	);
}
