import Meta from "@/components/Meta/Meta";
import { FooterConfig } from "@/context/FooterContext";
import { HeaderConfig } from "@/context/HeaderContext";
import AboutHero from "@/components/NewPages/About/AboutHero";
import AboutLeadership from "@/components/NewPages/About/AboutLeadership";
import AboutFullTeam from "@/components/NewPages/About/AboutFullTeam";
import AboutCTA from "@/components/NewPages/About/AboutCTA";

const seo = {
	title: "About - Celestia",
	description:
		"Celestia builds dedicated, high-throughput chains for companies with internet-scale traffic. Meet the team behind the frameworks powering 100+ production chains.",
};

export const metadata = Meta(seo);

export default function AboutPage() {
	return (
		<>
			<HeaderConfig theme='light' />
			<FooterConfig showBackgroundImage={false} variant='dark' />
			<AboutHero />
			<AboutLeadership />
			<AboutFullTeam />
			<AboutCTA />
		</>
	);
}
