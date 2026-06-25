import Meta from "@/components/Meta/Meta";
import { FooterConfig } from "@/context/FooterContext";
import seo from "@/data/case-studies/seo";
import CaseStudiesPageClient from "@/components/CaseStudies/CaseStudiesPageClient";
import CTASection from "@/components/CaseStudies/CTASection";

export const metadata = Meta(seo);

export default function CaseStudies() {
	return (
		<>
			<FooterConfig showBackgroundImage={false} variant="light" />
			<CaseStudiesPageClient />
			<CTASection />
		</>
	);
}
