import GetInTouch from "@/components/CallToActions/GetInTouch";
import IconCard from "@/components/Cards/IconCards/IconCard";
import Container from "@/components/Container/Container";
import TertiaryHero from "@/components/Heroes/TertiaryHero";
import { Display } from "@/macros/Copy";
import { Row, Col } from "@/macros/Grids";
// import GetInTouch from "@/components/CallToActions/GetInTouch";

import Meta from "@/components/Meta/Meta";
import seo from "@/data/press/seo";

export const metadata = Meta(seo);

export default async function Press() {
	const quickLinksGroups = [
		{
			cards: [
				{
					icon: "forum",
					title: "Branding",
					url: "https://company-223625.frontify.com/d/JoSwaZS4Mjpj/guidelines/",
				},
				{
					icon: "blog",
					title: "News",
					url: "https://blog.celestia.org/",
				},
				{
					icon: "social",
					title: "Social",
					url: "/community",
				},
				{
					icon: "email",
					title: "Enquiries",
					url: "mailto:press@celestia.org",
				},
			],
		},
	];
	return (
		<>
			<TertiaryHero title={"Press & Media"} blurbTitle={"Find branding, news, social channels, and press contacts"} />
			<section id={"explore"} className='bg-white text-black'>
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
								<div className='w-full grid grid-cols-1 gap-4 mb-4' key={`cardGroup-${index}`}>
									{group.cards.map((card, index) => (
										<IconCard key={index} title={card.title} url={card.url} icon={card.icon} />
									))}
								</div>
							))}
						</Col>
					</Row>
				</Container>
			</section>
			{/* <GetInTouch /> */}
		</>
	);
}
