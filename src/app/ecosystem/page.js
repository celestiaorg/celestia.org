import EcosystemExplorer from "@/components/Ecosystem/EcosystemExplorer";
import HighlightedPartners from "@/components/Ecosystem/HighlightedPartners";
import QuaternaryHero from "@/components/Heroes/QuaternaryHero";

import meta from "@/components/Meta/Meta";
import seo from "@/data/ecosystem/seo";

export const metadata = meta(seo);

export default async function Ecosystem() {
	return (
		<>
			<QuaternaryHero title={"Ecosystem"} subtitle={""} />
			<HighlightedPartners />
			<EcosystemExplorer />
		</>
	);
}
