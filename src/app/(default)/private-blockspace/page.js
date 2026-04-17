import Meta from "@/components/Meta/Meta";
import { FooterConfig } from "@/context/FooterContext";
import HeroSection from "@/components/PrivateDA/HeroSection";
import FeaturesSection from "@/components/PrivateDA/FeaturesSection";
import ProofSection from "@/components/PrivateDA/ProofSection";
import HowItWorksSection from "@/components/PrivateDA/HowItWorksSection";
import CtaSection from "@/components/PrivateDA/CtaSection";

const seo = {
	title: "Private Blockspace - Celestia",
	description: "Confidential onchain markets with publicly verifiable guarantees.",
};

export const metadata = Meta(seo);

export default function PrivateDAPage() {
	return (
		<>
			<FooterConfig showBackgroundImage={false} variant='dark' />
			<HeroSection />
			<FeaturesSection />
			<ProofSection />
			<HowItWorksSection />
			<CtaSection />
		</>
	);
}
