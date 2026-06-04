import Meta from "@/components/Meta/Meta";
import { FooterConfig } from "@/context/FooterContext";
import seo from "@/data/applications/seo";
import ApplicationsPageClient from "@/components/Applications/ApplicationsPageClient";

export const metadata = Meta(seo);

export default function Applications() {
	return (
		<>
			<FooterConfig showBackgroundImage={false} variant="dark" />
			<ApplicationsPageClient />
		</>
	);
}
