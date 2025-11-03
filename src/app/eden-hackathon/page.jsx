import React from "react";
import Meta from "../../components/Meta/Meta";
import seo from "../../data/eden/seo";
import Footer from "../../components/Eden/Footer";
import Tracks from "../../components/Eden/Tracks";
import HackathonSection from "../../components/Eden/HackathonSection";
import EdenHero from "@/components/Eden/EdenHero";

export const metadata = Meta(seo);

export default async function Eden() {
	return (
		<>
			<EdenHero />
			<HackathonSection />
			<Tracks />
			<Footer />
		</>
	);
}
