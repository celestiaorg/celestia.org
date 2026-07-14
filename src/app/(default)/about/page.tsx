import Meta from "@/components/Meta/Meta";
import { FooterConfig } from "@/context/FooterContext";
import AboutHero from "@/components/NewPages/About/AboutHero";
import AboutLeadership from "@/components/NewPages/About/AboutLeadership";
import AboutFullTeam from "@/components/NewPages/About/AboutFullTeam";
import AboutCTA from "@/components/NewPages/About/AboutCTA";

const seo = {
	title: "About",
	description:
		"Celestia builds dedicated, high-throughput chains for companies with internet-scale traffic. Meet the team behind the frameworks powering 25+ production chains.",
	canonical: "https://celestia.org/about/",
};

export const metadata = Meta(seo);

export default function AboutPage() {
	return (
		<>
			<FooterConfig showBackgroundImage={false} variant='dark' />
			<AboutHero />
			<AboutLeadership />
			<AboutFullTeam />
			<AboutCTA />
		</>
	);
}
