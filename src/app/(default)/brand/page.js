import Meta from "@/components/Meta/Meta";
import { FooterConfig } from "@/context/FooterContext";
import seo from "@/data/brand/seo";
import BrandPageClient from "@/components/Brand/BrandPageClient";

export const metadata = Meta(seo);

export default function BrandPage() {
	return (
		<>
			<FooterConfig showBackgroundImage={false} variant="dark" />
			<BrandPageClient />
		</>
	);
}
