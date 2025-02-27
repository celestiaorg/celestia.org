import EcosystemExplorer from "@/components/Ecosystem/EcosystemExplorer";
import HighlightedPartners from "@/components/Ecosystem/HighlightedPartners";
import TertiaryHero from "@/components/Heroes/TertiaryHero";

import meta from "@/components/Meta/Meta";
import seo from "@/data/ecosystem/seo";

export const metadata = meta(seo);

export default async function Ecosystem() {
	return (
		<>
			<TertiaryHero title={"Ecosystem"} subtitle={"Hangout with the Celestia community IRL or online."} />
			<HighlightedPartners />
			<EcosystemExplorer />
		</>
	);
}
