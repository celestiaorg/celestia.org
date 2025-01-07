import PrimaryHero from "@/components/Heroes/PrimaryHero";
import Blog from "@/components/Resources/Blog/Blog";
import AlternatingMediaRows from "@/components/AlternatingMediaRows/AlternatingMediaRows";
import { Link } from "@/micros/TertiaryPageMicors/TertiaryPageMicors";
import HomepageScrollText from "@/components/ScrollText/views/HomepageScrollText";
import ExploreCardsContainer from "@/components/Cards/ExploreCards/ExploreCardsContainer";
import ExploreCard from "@/components/Cards/ExploreCards/ExploreCard";
import EcosytemExplorer from "@/components/Ecosystem/EcosytemExplorer/EcosytemExplorer";

export default async function Home() {
	const posts = await getPosts();

	return (
		<>
			<PrimaryHero
				headline={`Build whatever`}
				subheadline={
					<>
						Celestia is the modular blockchain powering unstoppable applications with{" "}
						<span className={"whitespace-nowrap"}>full-stack</span> customizability.
					</>
				}
				buttons={[
					{ text: "Build", url: "/build" },
					{ text: "Explore", url: "#explore-celestia" },
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

			<HomepageScrollText />

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
							{ text: "Build", url: "/build", type: "secondary" },
							{ text: "Deploy", url: "/build#rollups", type: "primary" },
						],
						videoSrc: "/videos/home/CE_BLOB.mp4 ",
					},
					{
						title: "Full-stack customizability",
						body: [
							"Own your product end-to-end. Customize every layer of the stack without being locked into a single virtual-machine or framework.",
							"With Celestia underneath, deploy as your own sovereign network or launch fast with leading Ethereum rollup frameworks.",
						],
						buttons: [
							{ text: "Build modular", url: "/build", type: "secondary" },
							{ text: "Deploy", url: "/build#rollups", type: "primary" },
						],
						videoSrc: "/videos/home/CE_Under.mp4 ",
					},
					{
						title: "Onchain Abundance",
						body: [
							"Build expressive applications previously unimaginable onchain.",
							<>
								Celestia’s <Link href={"https://blog.celestia.org/roadmap/"}>roadmap</Link> has a core objective: relentlessly scale
								beyond 1 GB/s data throughput, removing crypto’s ultimate scaling bottleneck.
							</>,
						],
						buttons: [
							{
								text: "Learn Celestia",
								url: "/what-is-celestia",
								type: "secondary",
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
				/>
				<ExploreCard
					title={"Use Tia"}
					description={"Pay for blobspace, secure the network, and participate in governance"}
					url={"/what-is-tia"}
					image={"/images/app/homepage/explore-useTia.png"}
				/>
				<ExploreCard
					title={"Go modular"}
					description={"Join the community and meet us at the next modular event"}
					url={"/community"}
					image={"/images/app/homepage/explore-joinTheCommunity.png"}
				/>
			</ExploreCardsContainer>

			<EcosytemExplorer />

			{/* BLOG */}
			{posts && <Blog posts={posts} />}
		</>
	);
}

export const getPosts = async () => {
	const res = await fetch(
		"https://blog.celestia.org/ghost/api/v3/content/posts/?key=000cf34311006e070b17fffcfd&limit=6&fields=title,text,feature_image,url,excerpt,published_at&formats=plaintext"
	);
	const responseJson = await res.json();
	const posts = responseJson.posts;

	if (!posts) {
		throw new Error("Failed to fetch blog posts");
	}

	return posts;
};
