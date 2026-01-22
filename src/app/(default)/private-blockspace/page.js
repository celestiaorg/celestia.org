import Meta from "@/components/Meta/Meta";
import HeroSection from "@/components/PrivateDA/HeroSection";
import UseCasesSection from "@/components/PrivateDA/UseCasesSection";
import PrivateMarketsSection from "@/components/PrivateDA/PrivateMarketsSection";
import HowItWorksSection from "@/components/PrivateDA/HowItWorksSection";
// import HibachiSection from "@/components/PrivateDA/HibachiSection";
import BuildVerifiableSection from "@/components/PrivateDA/BuildVerifiableSection";

const seo = {
	title: "Private Blockspace - Celestia",
	description: "Post privately. Prove publicly. Private Data Availability solutions powered by Celestia.",
};

export const metadata = Meta(seo);

export default function PrivateDAPage() {
	return (
		<>
			<HeroSection />
			<UseCasesSection />
			<PrivateMarketsSection />
			<HowItWorksSection />
			{/* <HibachiSection /> */}
			<BuildVerifiableSection />
		</>
	);
}
