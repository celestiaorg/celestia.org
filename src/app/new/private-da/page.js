import Meta from "@/components/Meta/Meta";
import HeroSection from "@/components/PrivateDA/HeroSection";
import UseCasesSection from "@/components/PrivateDA/UseCasesSection";
import PrivateAccountSection from "@/components/PrivateDA/PrivateAccountSection";
import GoBiggerSection from "@/components/PrivateDA/GoBiggerSection";

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
			<PrivateAccountSection />
			<GoBiggerSection />
		</>
	);
}
