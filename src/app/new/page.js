import Meta from "@/components/Meta/Meta";
import HomepageHero from "@/components/NewHomepage/HomepageHero";
import BenefitsSection from "@/components/NewHomepage/BenefitsSection";
import MarketStackSection from "@/components/NewHomepage/MarketStackSection";
import NewsSection from "@/components/NewHomepage/NewsSection";
import { FooterConfig } from "@/context/FooterContext";

const seo = {
	title: "Celestia - The First Modular Blockchain Network",
	description: "Celestia is the first modular blockchain network that enables anyone to easily deploy their own blockchain with minimal overhead.",
};

export const metadata = Meta(seo);

export default function HomepageNew() {
	return (
		<>
			<FooterConfig showBackgroundImage={true} />
			<HomepageHero />
			<BenefitsSection />
			<MarketStackSection />
			<NewsSection />
		</>
	);
}
