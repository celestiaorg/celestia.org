import Meta from "@/components/Meta/Meta";
import { FooterConfig } from "@/context/FooterContext";
import seo from "@/data/use-cases/seo";
import UseCasesPageClient from "@/components/UseCases/UseCasesPageClient";

export const metadata = Meta(seo);

export default function UseCases() {
	return (
		<>
			<FooterConfig showBackgroundImage={false} />
			<UseCasesPageClient />
		</>
	);
}
