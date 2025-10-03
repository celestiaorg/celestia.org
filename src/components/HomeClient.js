"use client";

import React from "react";
import AlternatingMediaRows from "@/components/AlternatingMediaRows/AlternatingMediaRows";
import AppsCarousel from "@/components/AppsCarousel/AppsCarousel";
import ExploreCard from "@/components/Cards/ExploreCards/ExploreCard";
import ExploreCardsContainer from "@/components/Cards/ExploreCards/ExploreCardsContainer";
import EcosytemExplorer from "@/components/Ecosystem/EcosytemExplorer/EcosytemExplorer";
import PrimaryHero from "@/components/Heroes/PrimaryHero";
import Blog from "@/components/Resources/Blog/Blog";
import { ANALYTICS_EVENTS } from "@/constants/analytics";
import { appItems } from "@/data/home/apps-on-celestia";
import { Link } from "@/micros/TertiaryPageMicors/TertiaryPageMicors";

export default function HomeClient() {
	const [posts, setPosts] = React.useState([]);

	React.useEffect(() => {
		// Fetch posts client-side to avoid SSR issues with Lumina
		const fetchPosts = async () => {
			try {
				const fetchedPosts = await getPosts();
				setPosts(fetchedPosts || []);
			} catch (error) {
				console.error("Failed to fetch posts:", error);
				setPosts([]);
			}
		};

		fetchPosts();
	}, []);

	return (
		<>
			<PrimaryHero
				headline={`Go bigger`}
				headlineClassName={"text-[6rem] max-w-[400px] leading-[1] tracking-normal lg:text-[8.6rem] lg:leading-[1]"}
				subheadline={
					<span className='max-w-[450px] block'>
						Celestia is the modular blockchain powering unstoppable apps with <span className={"whitespace-nowrap"}>full-stack</span>{" "}
						control.
					</span>
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
						posterSrc: "/videos/home/CE_BLOB_poster.jpg",
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
						posterSrc: "/videos/home/CE_Under_poster.jpg",
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
						posterSrc: "/videos/home/CE_ACCESS_new_poster.jpg",
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
			{posts?.length > 0 && <Blog posts={posts} />}
		</>
	);
}

const BLOG_CACHE_KEY = "celestia_blog_posts_cache";
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const getPosts = async () => {
	// Check cache first
	try {
		const cached = localStorage.getItem(BLOG_CACHE_KEY);
		if (cached) {
			const { posts, timestamp } = JSON.parse(cached);
			const age = Date.now() - timestamp;

			// Return cached data if less than 1 hour old
			if (age < CACHE_DURATION) {
				return posts;
			}
		}
	} catch {
		// Ignore cache errors
	}

	try {
		const res = await fetch(
			"https://blog.celestia.org/ghost/api/v3/content/posts/?key=000cf34311006e070b17fffcfd&limit=6&fields=title,text,feature_image,url,excerpt,published_at&formats=plaintext",
			{
				headers: {
					Accept: "application/json",
					"User-Agent": "Celestia-Website/1.0",
				},
			}
		);

		if (!res.ok) {
			// For rate limiting, try to use stale cache
			if (res.status === 429) {
				if (process.env.NODE_ENV === "development") {
					console.warn("Blog API rate limited (429) - using cached data if available");
				}
				try {
					const cached = localStorage.getItem(BLOG_CACHE_KEY);
					if (cached) {
						const { posts } = JSON.parse(cached);
						return posts; // Return stale cache on rate limit
					}
				} catch {
					// Ignore cache errors
				}
				return null;
			}

			// For unauthorized errors, we may need to update the API key
			if (res.status === 401) {
				console.warn("Blog API authentication failed - API key may need to be updated");
				return null;
			}

			// Only log detailed errors for non-auth issues in development
			if (process.env.NODE_ENV === "development") {
				console.error("Blog fetch failed:", res.status, res.statusText);
			}
			return null;
		}

		const responseJson = await res.json();
		const posts = responseJson.posts;

		if (!posts) {
			if (process.env.NODE_ENV === "development") {
				console.error("No posts found in response:", responseJson);
			}
			return null;
		}

		// Cache the posts
		try {
			localStorage.setItem(
				BLOG_CACHE_KEY,
				JSON.stringify({
					posts,
					timestamp: Date.now(),
				})
			);
		} catch {
			// Ignore cache storage errors
		}

		return posts;
	} catch (error) {
		// Only log detailed errors in development environment
		if (process.env.NODE_ENV === "development") {
			console.error("Error fetching blog posts:", error);
		}

		// Try to return cached data on network errors
		try {
			const cached = localStorage.getItem(BLOG_CACHE_KEY);
			if (cached) {
				const { posts } = JSON.parse(cached);
				return posts;
			}
		} catch {
			// Ignore cache errors
		}

		return null; // Return null instead of throwing to prevent app crashes
	}
};
