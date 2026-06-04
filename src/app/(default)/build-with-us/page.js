import Meta from "@/components/Meta/Meta";
import { FooterConfig } from "@/context/FooterContext";
import BwuHero from "@/components/NewPages/BuildWithUs/BwuHero";
import BwuProse from "@/components/NewPages/BuildWithUs/BwuProse";
import BwuWhy from "@/components/NewPages/BuildWithUs/BwuWhy";
import BwuIncluded from "@/components/NewPages/BuildWithUs/BwuIncluded";
import BwuCTA from "@/components/NewPages/BuildWithUs/BwuCTA";

const seo = {
	title: "Build with Us - Celestia",
	description:
		"Your blockchain. Built by us. Owned by you. Celestia partners with enterprises to design, build, and ship high-throughput custom chains.",
	canonical: "https://celestia.org/build-with-us/",
};

export const metadata = Meta(seo);

export default function BuildWithUsPage() {
	return (
		<>
			<FooterConfig showBackgroundImage={false} variant='dark' />
			<BwuHero />
			<BwuProse />
			<BwuWhy />
			<BwuIncluded />
			<BwuCTA />
		</>
	);
}
