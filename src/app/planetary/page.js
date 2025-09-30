import PlanetaryClient from "./PlanetaryClient";

import Meta from "@/components/Meta/Meta";
import seo from "@/data/mammoth/seo";

export const metadata = Meta(seo);

export default async function Planetary() {
	return <PlanetaryClient />;
}
