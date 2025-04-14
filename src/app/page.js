import AlternatingMediaRows from "@/components/AlternatingMediaRows/AlternatingMediaRows";
import AppsCarousel from "@/components/AppsCarousel/AppsCarousel";
import ExploreCard from "@/components/Cards/ExploreCards/ExploreCard";
import ExploreCardsContainer from "@/components/Cards/ExploreCards/ExploreCardsContainer";
import CommunityCarousel from "@/components/CommunityCarousel/CommunityCarousel";
import EcosytemExplorer from "@/components/Ecosystem/EcosytemExplorer/EcosytemExplorer";
import PrimaryHero from "@/components/Heroes/PrimaryHero";
import Blog from "@/components/Resources/Blog/Blog";
import { ANALYTICS_EVENTS } from "@/constants/analytics";
import { appItems } from "@/data/home/apps-on-celestia";
import { communityItems } from "@/data/home/community-items";
import { Link } from "@/micros/TertiaryPageMicors/TertiaryPageMicors";
import React from "react";

export default async function Home() {
	const posts = await getPosts();

	return (
		<>
			<PrimaryHero
				headline={`Build whatever`}
				subheadline={
					<div className='max-w-[450px]'>
						Celestia is the modular blockchain powering unstoppable applications with{" "}
						<span className={"whitespace-nowrap"}>full-stack</span> control.
					</div>
				}
				buttons={[
					{ text: "Build", url: "/build", trackEvent: ANALYTICS_EVENTS.HERO_BUILD },
					{ text: "Explore", url: "#explore-celestia", trackEvent: ANALYTICS_EVENTS.HERO_EXPLORE },
				]}
				videos={{
					src: {
						xl: "/videos/hero/ecosystem-desktop_xl.mp4",
						lg: "/videos/hero/ecosystem-desktop_lg.mp4",
						sm: "/videos/hero/ecosystem-mobile_sm.mp4",
					},
					poster: {
						lg: "/videos/hero/ecosystem-desktop_xl_poster.jpg",
						sm: "/videos/hero/ecosystem-mobile_sm_poster.jpg",
					},
				}}
			/>

			<AppsCarousel items={appItems} />

			<CommunityCarousel items={communityItems} />

			<AlternatingMediaRows
				id={"explore-celestia"}
				rows={[
					{
						title: "Unstoppable apps",
						body: [
							"Send money like a meme, craft onchain worlds, or deploy programs that outlive you.",
							"Celestia powers apps that work in every corner of the planet – unstoppable by intermediaries and verifiable from any device.",
						],
						buttons: [
							{ text: "Build", url: "/build", type: "secondary", trackEvent: ANALYTICS_EVENTS.HOMEPAGE_UNSTOPPABLE_BUILD },
							{ text: "Deploy", url: "/build#rollups", type: "primary", trackEvent: ANALYTICS_EVENTS.HOMEPAGE_UNSTOPPABLE_DEPLOY },
						],
						videoSrc: "/videos/home/CE_BLOB.mp4 ",
					},
					{
						title: "Full-stack control",
						body: [
							"Own your product end-to-end. Customize every layer of the stack without being locked into a single virtual-machine or framework.",
							"With Celestia underneath, deploy as your own sovereign network or launch fast with leading Ethereum rollup frameworks.",
						],
						buttons: [
							{ text: "Build", url: "/build", type: "secondary", trackEvent: ANALYTICS_EVENTS.HOMEPAGE_CUSTOMIZABILITY_BUILD },
							{ text: "Deploy", url: "/build#rollups", type: "primary", trackEvent: ANALYTICS_EVENTS.HOMEPAGE_CUSTOMIZABILITY_DEPLOY },
						],
						videoSrc: "/videos/home/CE_Under.mp4 ",
					},
					{
						title: "Onchain Abundance",
						body: [
							"Build expressive applications previously unimaginable onchain.",
							<React.Fragment key='roadmap-text'>
								Celestia&apos;s <Link href={"https://blog.celestia.org/roadmap/"}>roadmap</Link> has a core objective: relentlessly
								scale beyond 1 GB/s data throughput, removing crypto&apos;s ultimate scaling bottleneck.
							</React.Fragment>,
						],
						buttons: [
							{
								text: "Learn Celestia",
								url: "/what-is-celestia",
								type: "secondary",
								trackEvent: ANALYTICS_EVENTS.HOMEPAGE_ABUNDANCE_LEARN,
							},
						],
						videoSrc: "/videos/home/CE_ACCESS_new.mp4",
					},
				]}
			/>

			<ExploreCardsContainer>
				<ExploreCard
					title={"Run a light node"}
					description={"Directly verify and join the network by running a light node in two commands"}
					url={"/run-a-light-node"}
					image={"/images/app/homepage/explore-runALightNode.png"}
					trackEvent={ANALYTICS_EVENTS.HOMEPAGE_EXPLORE_RUN_NODE}
				/>
				<ExploreCard
					title={"Use TIA"}
					description={"Pay for blobspace, secure the network, and participate in governance"}
					url={"/what-is-tia"}
					image={"/images/app/homepage/explore-useTia.png"}
					trackEvent={ANALYTICS_EVENTS.HOMEPAGE_EXPLORE_TIA}
				/>
				<ExploreCard
					title={"Go modular"}
					description={"Join the community and meet us at the next modular event"}
					url={"/community"}
					image={"/images/app/homepage/explore-joinTheCommunity.png"}
					trackEvent={ANALYTICS_EVENTS.HOMEPAGE_EXPLORE_COMMUNITY}
				/>
			</ExploreCardsContainer>

			<EcosytemExplorer trackEvent={ANALYTICS_EVENTS.HOMEPAGE_ECOSYSTEM_VIEW} />

			{/* BLOG */}
			{posts && <Blog posts={posts} />}
		</>
	);
}
export const getPosts = async () => {
	try {
		const res = await fetch(
			"https://blog.celestia.org/ghost/api/v3/content/posts/?key=91c2a7dc379b796be090aeab63&limit=6&fields=title,text,feature_image,url,excerpt,published_at&formats=plaintext"
		);

		if (!res.ok) {
			console.error(`Ghost API responded with status: ${res.status}`);
			throw new Error(`Ghost API responded with status: ${res.status}`);
		}

		const responseJson = await res.json();
		const posts = responseJson.posts;

		if (!posts) {
			console.error("No posts found in response:", responseJson);
			throw new Error("Failed to fetch blog posts");
		}

		return posts;
	} catch (error) {
		console.error("Error fetching blog posts:", error);
		throw error;
	}
};
