import SecondaryHero from "@/components/Heroes/SecondaryHero";
import Container from "@/components/Container/Container";
import { Col, Row } from "@/macros/Grids";
import { Display, Body } from "@/macros/Copy";
import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";
import ProjectFilter from "@/components/ProjectFilter/ProjectFilter";

import Meta from "@/components/Meta/Meta";
import seo from "@/data/what-is-tia/seo";

export const metadata = Meta(seo);

const role = {
	title: "TIA's role in Celestia",
	items: [
		{
			id: 1,
			title: "Create a wallet",
			description: "Create a wallet with celestia node.",
			url: "https://docs.celestia.org/operate/keys-wallets/celestia-app-wallet/",
		},
		{
			id: 1,
			title: "Pay for blobspace",
			description: "Rollups pay to publish data to Celestia’s blobspace using TIA.",
			url: "https://docs.celestia.org/learn/TIA/paying-for-blobspace/",
		},
		{
			id: 2,
			title: "Secure the network",
			description: "Users stake TIA to participate in consensus and secure Celestia.",
			url: "https://docs.celestia.org/learn/TIA/overview/",
		},
		{
			id: 3,
			title: "Gas token for rollups",
			description: "Developers can use TIA as a gas token for their rollups.",
			url: null,
		},
	],
};

const wallets = {
	title: "Wallets",
	details: "",
	items: [
		{
			title: "Keplr Wallet",
			categories: ["IOS", "Android", "Desktop"],
			image: "/images/app/what-is-tia/kepler-icon.jpg",
			url: "https://www.keplr.app/",
		},
		{
			title: "Cosmostation",
			categories: ["IOS", "Android", "Desktop"],
			image: "/images/app/what-is-tia/cosmostation-icon.jpg",
			url: "https://cosmostation.io/products/cosmostation_extension/",
		},
		{
			title: "Leap",
			categories: ["IOS", "Android", "Desktop"],
			image: "/images/app/what-is-tia/leap-icon.jpg",
			url: "https://www.leapwallet.io/",
		},
		{
			title: "Ledger",
			categories: ["IOS", "Android", "Desktop"],
			image: "/images/app/what-is-tia/ledger-icon.jpg",
			url: "https://www.ledger.com/",
		},
	],
};

export default async function WhatIsTia() {
	return (
		<>
			<SecondaryHero
				title={"What is TIA?"}
				subtitle={"Learn about TIA, the native token of the Celestia blockchain."}
				buttons={[
					{
						text: "Pay for Data",
						url: "https://docs.celestia.org/learn/TIA/submit-data/",
						iconDirection: "up-right",
					},
					{
						text: "Stake TIA",
						url: "/what-is-tia#projects",
						iconDirection: "down-right",
					},
				]}
				videos={{
					src: {
						xl: "/videos/hero/tia-desktop_xl.mp4",
						lg: "/videos/hero/tia-desktop_lg.mp4",
						sm: "/videos/hero/tia-mobile_sm.mp4",
					},
					poster: {
						lg: "/videos/hero/tia-desktop_xl_poster.jpg",
						sm: "/videos/hero/tia-mobile_sm_poster.jpg",
					},
				}}
			/>

			<section className='text-white bg-black'>
				<Container size={"lg"} className={"py-10 lg:py-24"}>
					<Row className={"mb-6 lg:mb-16"}>
						<Col width={60}>
							<Display size={"sm"} tag={"h2"} className={"mb-4 lg:mb-0"}>
								The role of TIA in Celestia
							</Display>
						</Col>
						<Col width={40}>
							<Body size={"md"}></Body>
						</Col>
					</Row>
					<Row>
						<Col width={100}>
							<div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4`}>
								{role.items.map((card, index) => (
									<VerticalTitleCard dark key={index} title={card.title} description={card.description} url={card.url} />
								))}
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<div id='projects'>
				<ProjectFilter
					title={"Wallets"}
					description={
						<>
							Anyone can download a non-custodial wallet to freely control and use their TIA.
							<br />
							<br />
							It’s important to get familiar with basic wallet practices for safely storing and transacting with TIA on Celestia.
						</>
					}
					items={wallets.items}
					showCategoriesOnCard
				/>
			</div>
		</>
	);
}
