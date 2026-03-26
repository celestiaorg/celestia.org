import Meta from "@/components/Meta/Meta";
import CaseStudiesHero from "@/components/CaseStudies/CaseStudiesHero";
import CaseStudiesContent from "@/components/CaseStudies/CaseStudiesContent";
import CTASection from "@/components/CaseStudies/CTASection";
import { FooterConfig } from "@/context/FooterContext";
import seo from "@/data/case-studies/seo";

export const metadata = Meta(seo);

export default function CaseStudies() {
	return (
		<>
			<FooterConfig showBackgroundImage={false} />
			<CaseStudiesHero />
			<CaseStudiesContent />
			<CTASection />
		</>
	);
}
