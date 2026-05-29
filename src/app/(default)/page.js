import Meta from "@/components/Meta/Meta";
import HomepageHero from "@/components/NewHomepage/HomepageHero";
import ProofPoints from "@/components/NewHomepage/ProofPoints";
import InvestorsSection from "@/components/NewHomepage/InvestorsSection";
import EcosystemSection from "@/components/NewHomepage/EcosystemSection";
import UseCasesSection from "@/components/NewHomepage/UseCasesSection";
import BenefitsSection from "@/components/NewHomepage/BenefitsSection";
import TeamSection from "@/components/NewHomepage/TeamSection";
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
			<ProofPoints />
			<InvestorsSection />
			<EcosystemSection />
			<UseCasesSection />
			<BenefitsSection />
			<TeamSection />
			<MarketStackSection />
			<NewsSection />
		</>
	);
}
