import Meta from "@/components/Meta/Meta";
import HomepageHero from "@/components/NewHomepage/HomepageHero";
import FibreZone from "@/components/NewHomepage/FibreZone";
import HighlightsSection from "@/components/NewHomepage/HighlightsSection";
import UseCasesSection from "@/components/NewHomepage/UseCasesSection";
import BenefitsSection from "@/components/NewHomepage/BenefitsSection";
import MarketStackSection from "@/components/NewHomepage/MarketStackSection";
import NewsSection from "@/components/NewHomepage/NewsSection";
import { FooterConfig } from "@/context/FooterContext";
import seo from "@/data/home/seo";

export const metadata = Meta(seo);

export default function Home() {
	return (
		<>
			<FooterConfig showBackgroundImage={true} />
			<HomepageHero />
			<FibreZone />
			<HighlightsSection />
			<UseCasesSection />
			<BenefitsSection />
			<MarketStackSection />
			<NewsSection />
		</>
	);
}
