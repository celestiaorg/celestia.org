import SecondaryHero from "@/components/Heroes/SecondaryHero";
import { frameworks } from "@/data/build/frameworks";
import { rollups } from "@/data/build/rollups";
import ProjectFilter from "@/components/ProjectFilter/ProjectFilter";
import { getFilterOptions } from "@/utils/getFilterOptions";
import GetInTouch from "@/components/CallToActions/GetInTouch";

import Container from "@/components/Container/Container";
import { Col, Row } from "@/macros/Grids";
import { Display } from "@/macros/Copy";
import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";
import Meta from "@/components/Meta/Meta";
import seo from "@/data/build/seo";

export const metadata = Meta(seo);

export default async function Build() {
	const integrationRow1 = [
		{
			title: "Documentation",
			description: "Documentation for the Celestia network.",
			url: "https://docs.celestia.org/",
		},
		{
			title: "Pay for blobspace",
			description: "Overview of paying for blob transactions and Celestia’s fee market.",
			url: "https://docs.celestia.org/learn/TIA/paying-for-blobspace/",
		},
		{
			title: "Blob tutorial",
			description: "Learn how to publish and retrieve transaction data from Celestia.",
			url: "https://docs.celestia.org/build/post-retrieve-blob/overview/",
		},
	];

	const integrationRow2 = [
		{
			title: "Blobstream",
			description: "Use Celestia as the DA layer for your Ethereum L2.",
			url: "https://docs.celestia.org/developers/blobstream/",
		},
		{
			title: "Node API",
			description: "Use the celestia-node API to publish and retrieve transactions from Celestia.",
			url: "https://docs.celestia.org/build/rpc/node-api/?version=v0.28.4",
		},
	];

	return (
		<>
			<SecondaryHero
				title={"Build whatever"}
				buttons={[
					{
						text: "Build",
						url: "#frameworks",
						iconDirection: "down-right",
					},
					{
						text: "Integrate",
						url: "#integration",
						iconDirection: "down-right",
					},
					{
						text: "Deploy",
						url: "#rollups",
						iconDirection: "down-right",
					},
				]}
				videos={{
					src: {
						xl: "/videos/hero/blob-desktop_xl.mp4",
						lg: "/videos/hero/blob-desktop_lg.mp4",
						sm: "/videos/hero/blob-mobile_sm.mp4",
					},
					poster: {
						lg: "/videos/hero/blob-desktop_xl_poster.jpg",
						sm: "/videos/hero/blob-mobile_sm_poster.jpg",
					},
				}}
			/>

			<ProjectFilter
				id={"frameworks"}
				title={"Choose a framework"}
				description={"Get started quickly by using Celestia with leading rollup frameworks."}
				filters={getFilterOptions(frameworks, "categories")}
				filterTarget={"categories"}
				items={frameworks}
			/>
			<section id={"integration"} className='text-white bg-black'>
				<Container size={"lg"} className={"py-10 lg:py-24"} padding={false}>
					<Row className={"mb-6 lg:mb-16 px-4 md:px-10"}>
						<Col width={60}>
							<Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-6"}>
								Developer resources
							</Display>
						</Col>
						<Col width={40} className='lg:flex'></Col>
					</Row>
					{/* Mobile overflow scroll layout */}
					<div className='block md:hidden'>
						<Row>
							<Col width={100}>
								<div className='flex w-auto gap-4 px-4 mb-4 mr-4 overflow-x-scroll no-scrollbar'>
									{[...integrationRow1, ...integrationRow2].map((card, index) => (
										<VerticalTitleCard
											dark
											key={index}
											verticalTitle={card.title}
											description={card.description}
											url={card.url}
										/>
									))}
								</div>
							</Col>
						</Row>
					</div>
					{/* Desktop grid layout */}
					<div className='hidden px-4 md:block md:px-10'>
						<Row>
							<Col width={100}>
								<div className='grid w-full grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3'>
									{integrationRow1.map((card, index) => (
										<VerticalTitleCard dark key={index} title={card.title} description={card.description} url={card.url} />
									))}
								</div>
							</Col>
						</Row>
						<Row>
							<Col width={100}>
								<div className='grid w-full grid-cols-1 gap-4 mb-4 md:grid-cols-2'>
									{integrationRow2.map((card, index) => (
										<VerticalTitleCard dark key={index} title={card.title} description={card.description} url={card.url} />
									))}
								</div>
							</Col>
						</Row>
					</div>
				</Container>
			</section>

			<ProjectFilter
				id={"rollups"}
				title={"Rollups-as-a-Service"}
				description={"Deploy end-to-end on managed infrastructure using a Rollup-as-a-Service provider."}
				filters={getFilterOptions(rollups, "categories")}
				filterTarget={"categories"}
				items={rollups}
				className='mb-10'
			/>
			{/* <GetInTouch /> */}
		</>
	);
}
